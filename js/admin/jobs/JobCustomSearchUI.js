/*global Ext, Ijobs, window, document, printMsg, console */

Ext.ns('Ext.ijobs.job.jobCustomSearchUI');

Ext.define('Ext.ijobs.job.jobCustomSearchUI', {extend: 'Ext.Panel', 
    constructor: function (config) {
        config = Ext.apply({
            toolkit: Ext.ijobs.common.Kit,
            border: false,
            itemCls: 'col_bor',
            style : 'padding:5px 15px',
            COMPONENTS: {}
        }, config);
        Ext.ijobs.job.jobCustomSearchUI.superclass.constructor.call(this, config);
    },
    initComponent: function () {
        var me = this;
        me.items = [me._createQuery(), me._createList()];
        Ext.ijobs.job.jobCustomSearchUI.superclass.initComponent.call(this);
    },

    _createList: function () {
        var me = this,
            grid;

        var store = Ext.create('Ext.data.Store', {
            pageSize: 20,
            fields: ["id", "taskTName", "taskTId", "name", "creater", "createTime", "des", "applicationName", "applicationId", "lastModifyUser", "lastModifyTime"],
            proxy: {
                type: 'ajax',
                url: './jobs/taskIAction!getTaskIList.action',                
                reader: {
                    type: 'json',
                    root: "data",
                    totalProperty: 'totalCount'
                }
            }
        });

        grid = new Ext.grid.GridPanel({
            //style: 'margin : 20px 0 0 0 ',
            header: false,
            title: "查询结果",
            loadMask: true,
            store: store,
            columnLines: true,
            columns: [
                 {header: "ID", dataIndex: "id", hidden: true},
                 {
                     header: "执行态名称",
                     dataIndex: "name",
                     width: 140,
                     xtype: 'linkcolumn',
                     items: [
                         {
                             handler: me._viewJobCustom.bind(me)
                         }
                     ]
                 },
                 {
                     header: "所属作业模板名称",
                     dataIndex: "taskTName",
                     renderer: function (value, col, record) {
                         var taskId = record.get('taskTId'),
                             taskName = record.get('taskTName');

                         if (value === 'null') {
                             value = '模版已删除';
                         } else {
                             value = '<a href="javascript:void(0)" onclick="viewJobTemplate(\'' + taskId + '\',\'' + taskName + '\')" class="x-link-col-a x-link-col-0  ">' + value + '</a>';
                         }
                         return value;
                     }
                 },
                 {header: "备注", dataIndex: "des", width: 140, id: '_des'},
                 {header: "开发商", dataIndex: "applicationName", width: 140},
                 {header: "创建人", dataIndex: "creater", width: 120},
                 {header: "创建时间", dataIndex: "createTime", width: 140},
                 {header: "最后修改人", dataIndex: "lastModifyUser", width: 120},
                 {header: "最后修改时间", dataIndex: "lastModifyTime", width: 140}
             ],
            forceFit: true,
            viewConfig: {
            	trackOver: true,
                stripeRows: true,
                enableRowBody: true,
                showPreview: true
            },
            bbar: new Ext.PagingToolbar({
                store: store,
                displayInfo: true,
                beforePageText: '页',
                afterPageText: '/ {0}',
                displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
                emptyMsg: "没有记录",
                items: ['-', '←、→方向键可翻页']
            })
        });

        //给des加上悬停提示
        grid.on('render', function (grid) {
            var store = grid.getStore();
            var view = grid.getView();

            grid.tip = new Ext.ToolTip({
                target: view.mainBody,
                delegate: '.x-grid3-col-_des', // 有这个类的元素才会显示提示
                trackMouse: true,
                renderTo: document.body,
                listeners: {
                    beforeshow: function updateTipBody(tip) {
                        var rowIndex = view.findRowIndex(tip.triggerElement);
                        var des = store.getAt(rowIndex).get('des');
                        if (Ext.isEmpty(des)) {
                            return false;
                        }
                        tip.body.dom.innerHTML = des;
                    }
                }
            });

        });

        me.COMPONENTS.gridPanel = grid;
        return grid;
    },
    _createQuery: function () {
        var me = this,
            formPanel;

        formPanel = new Ext.FormPanel({
            border: false,
            items: [
                {
                    xtype: 'fieldset',
                    title: '查询条件',
                    defaults: {
                        border: false
                    },
                    collapsible: true,
                    items: [
                        {
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            defaults: {
                                border: false,
                                margins: '5 30 0 5',
                                labelWidth: 60
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            xtype: 'app-combo',
                                            itemId: 'cmbApplication',
                                            fieldLabel: '开发商',
                                            labelWidth: 60,
                                            triggerAction: "all",
                                            editable: true,
                                            name: 'applicationId',
                                            hiddenName: 'applicationId',
                                            queryMode: "local",
                                            showMore: true,
                                            store: Ext.create('Ext.data.JsonStore', {
                                                autoLoad: true,
                                                autoDestroy: true,
                                                fields: ["id", "applicationName"],
                                                proxy: {
                                                	type: 'ajax',
                                                	url: './common/getAllApplicationList.action'
                                                },
                                                listeners: {
                                                    load: function (store, records) {
                                                        var cmbApplication = formPanel.findById('cmbApplication');
                                                        store.add([
                                                            {'id': -1, 'applicationName': '请选择开发商'}
                                                        ]);
                                                        store.sort('id');
                                                        cmbApplication.setValue(-1);
                                                    }
                                                }
                                            }),
                                            valueField: "id",
                                            displayField: "applicationName",
                                            value: -1
                                        }
                                    ]

                                },
                                {
                                    labelWidth: 80,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'taskIName',
                                            name: 'taskIName',
                                            emptyText: '请输入…',
                                            fieldLabel: '执行态名称'
                                        }
                                    ]
                                },
                                {
                                    labelWidth: 100,
                                    items: [
                                        {
                                            xtype: 'userchooser',
                                            id: 'creater',
                                            name: 'creater',
                                            itemId: 'creater',
                                            emptyText: '请输入…',
                                            fieldLabel: '执行态创建人'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            labelWidth: 60,
                            fieldLabel: '创建时间',
                            layout: 'hbox',
                            defaults: {
                            	margins: '5 30 0 5',
                                hideLabel: true
                            },
                            items: [
                                {
                                    xtype: 'ijobsdatefield',
                                    width: 143,
                                    name: 'startTime1',
                                    editable: false,
                                    fieldLabel: '开始时间',
                                    emptyText: '开始时间',
                                    format: 'Y-m-d'
                                },
                                {
                                    width: 50,
                                    xtype: 'box',
                                    style: 'text-align: center;',
                                    html: '至'
                                },
                                {
                                    xtype: 'ijobsdatefield',
                                    width: 143,
                                    name: 'endTime1',
                                    editable: false,
                                    fieldLabel: '结束时间',
                                    emptyText: '结束时间',
                                    format: 'Y-m-d'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '更多条件',
                    style: 'margin:10px 0 0 0;',
                    collapsed: true,
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    defaults: {
                        border: false,
                        margins: '5 30 0 5',
                        labelWidth: 60
                    },
                    listeners: {
                        expand: function (p) {
                            p.doLayout();
                        }
                    },
                    collapsible: true,
                    items: [
                        {
                            labelWidth: 80,
                            width: 270,
                            items: [
                                {
                                    xtype: 'userchooser',
                                    id : 'lastModifyUser',
                                    name : 'lastModifyUser',
                                    labelWidth: 80,
                                    emptyText: '请输入…',
                                    fieldLabel: '最后修改人'
                                }
                            ]
                        },
                        {

                            labelWidth: 80,
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '最后修改时间',
                                    layout: 'hbox',
                                    defaults: {
                                        hideLabel: true,
                                        width: 140
                                    },
                                    items: [
                                        {
                                            xtype: 'ijobsdatefield',
                                            name: 'startTime2',
                                            labelWidth: 143,
                                            editable: false,
                                            fieldLabel: '开始时间',
                                            emptyText: '开始时间',
                                            format: 'Y-m-d'
                                        },
                                        {
                                            width: 50,
                                            xtype: 'box',
                                            style: 'text-align: center;',
                                            html: '至'
                                        },
                                        {
                                            xtype: 'ijobsdatefield',
                                            name: 'endTime2',
                                            labelWidth: 143,
                                            editable: false,
                                            fieldLabel: '结束时间',
                                            emptyText: '结束时间',
                                            format: 'Y-m-d'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    cls: 'opera btn_main',
                    text: '<i class="icon-search icon-white"></i>&nbsp;查询',
                    ref: '../btnQuery'
                },
                {
                    cls: 'opera btn_sec',
                    text: '<i class="icon-repeat icon-white"></i>&nbsp;重置',
                    ref: '../btnReset'
                }
            ],
            listeners: {
                afterrender: function (formPanel) {
                    //Ext.ijobs.common.Kit.bindEnterEven(formPanel.getEl(), me._query.createDelegate(me));
                }
            }
        });

        me.COMPONENTS.formPanel = formPanel;
        return formPanel;
    }
});

//end file