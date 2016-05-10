/*global Ext, Ijobs, window, document, printMsg, reset, console, getUserName */

Ext.ns('Ext.ijobs.job.JobTemplateEditUI');

/**
 * 作业模板编辑界面
 * @class Ext.ijobs.job.JobTemplateEditUI
 * @extends Ext.Container
 */
Ext.define('Ext.ijobs.job.JobTemplateEditUI', {extend: 'Ext.Panel', 
    stepTypeMenus: new Ext.menu.Menu({
        items: [
            {
                id: 'btnAddExeScript',
                stepType: typeDef.stepType[1].value,
                text: '执行脚本'
            },
            {
                id: 'btnAddDispatchFiles',
                stepType: typeDef.stepType[2].value,
                text: '分发文件'
            },
            {
                id: 'btnAddPullFiles',
                stepType: typeDef.stepType[3].value,
                text: '拉取文件'
            },
            {
                id: 'btnAddText',
                stepType: typeDef.stepType[4].value,
                text: '文本步骤'
            }
        ]

    }),
    constructor: function (config) {
        config = Ext.apply({
            border: false,
            toolkit: Ext.ijobs.common.Kit,
            bodyStyle: 'padding: 30px;',
            autoScroll: true//,
//            defaults :{
//                anchor : '95%'
//            }         
        }, config);
        Ext.ijobs.job.JobTemplateEditUI.superclass.constructor.call(this, config);
    },
    initComponent: function () {
        this.items = [
            this._createJobBaseInfoPanel(),
            this._createJobStepInfoGrid()
        ];
        Ext.ijobs.job.JobTemplateEditUI.superclass.initComponent.call(this);
    },


    /**
     * 创建执行步骤列表
     * @return {}
     */
    _createJobStepInfoGrid: function () {

        var _initData = this.initData;
        var _this = this;
        var toolkit = _this.toolkit;
        var store = Ext.create('Ext.data.JsonStore', {
            fields: ["id", "jobTemplateId", "name", "stepType", "idx", "operator"],
            proxy: {
            	type: 'memory',
            	data: _initData.stepTemplateList
            }
        });

        var stepGrid = new Ext.grid.GridPanel({
            id: 'stepGrid',
            selModel: Ext.create('Ext.selection.RowModel',{
            	model: 'MULTI'
            }),
            columns: [
                      {header: "id", dataIndex: "id", hidden: true, sortable: false},
                      {header: "jobTemplateId", dataIndex: "jobTemplateId", hidden: true, sortable: false},
                      {header: "步骤顺序", dataIndex: "idx", sortable: false,
                          renderer: function (value, cellMeta, record, rowIndex, colIndex, store) {
                              return "第" + (rowIndex + 1) + "步";
                          }
                      },
                      {
                          header: "步骤名",
                          dataIndex: "name",
                          sortable: false,
                          xtype: 'linkcolumn',
                          items: [
                              {
                                  handler: function (grid, rowIndex, colIndex) {
                                      var record = grid.getStore().getAt(rowIndex);
                                      _this._editStep(record.data.id, record.get("stepType"), record.get("name"));
                                  }
                              }
                          ]
                      },
                      {header: "步骤类型", dataIndex: "stepType", sortable: false,
                          renderer: function (value, cellMeta, record, rowIndex, colIndex, store) {
                              return toolkit.getStateByType(toolkit.STATE_TYPE.STEP_TYPE, value);
                          }
                      },
                      {header: "执行人", dataIndex: "operator"},
                      {
                          header: "操作",
                          xtype: 'linkcolumn',
                          dataIndex: "action",
                          sortable: false,
                          items: [
                              /*{
                               text : '向前新增',
                               scope : this,
                               handler: function(grid, rowIndex, colIndex,btn,e) {
                               e.preventDefault();
                               var record = grid.getStore().getAt(rowIndex);
                               _this.stepTypeMenus.offset = 0;
                               _this.stepTypeMenus.stepID = record.id
                               _this.stepTypeMenus.showAt(e.getXY());
                               }
                               },*/{
                                  text: '增加步骤',
                                  handler: function (grid, rowIndex, colIndex, btn, e) {
                                      e.preventDefault();
                                      var record = grid.getStore().getAt(rowIndex);
                                      _this.stepTypeMenus.offset = record.get('idx');
                                      _this.stepTypeMenus.showAt(e.getXY());
                                  }
                              },
                              {spacer: true},
                              {
                                  text: '删除',
                                  handler: function (grid, rowIndex, colIndex, a, b) {
                                      var record = grid.getStore().getAt(rowIndex);
                                      _this._removeStep(record.data.id);
                                  }
                              }/*,{
                               text : '上移',
                               handler: function(grid, rowIndex, colIndex) {
                               var record = grid.getStore().getAt(rowIndex);
                               _this._moveupStep(record.id);
                               }
                               },{
                               text : '下移',
                               handler: function(grid, rowIndex, colIndex) {
                               var record = grid.getStore().getAt(rowIndex);
                               _this._movedownStep(record.id);
                               }
                               }*/
                          ]
                      }
                  ],
            style: 'padding: 0 0 20px 0;',
            viewConfig: {
            	stripeRows: true,
                plugins: {
                    ptype: 'gridviewdragdrop'
                },
                listeners: {
                    drop: function () {
                        var sm = stepGrid.getSelectionModel();
                        var store = stepGrid.getStore();
                        var rows = sm.getSelection();

                        if (sm.hasSelection()) {
                            var stepIdList = [];
                            store.each(function (item) {
                                stepIdList.push(item.data.id);
                            });

                            Ext.Ajax.request({
                                url: './jobs/updateTaskT.action',
                                params: {
                                    "model": "taskT",
                                    "jobTemplateId": _this.initData.jobTemplateId,
                                    "stepIdList": stepIdList.join(','),
                                    "appID": _this.initData.applicationId,
                                    "creater": _this.initData.creater
                                },
                                success: function (response, opts) {
                                    if (_this.toolkit.hasPermission(response)) {
                                        _this._loadStepList();
                                        sm.select(rows);
                                    } else {
                                        _this._loadStepList();
                                    }
                                },
                                failure: function (response, opts) {
                                    printMsg('移动步骤时出现异常！异常代码:' + response.status);
                                }
                            });
                        }
                    }
                }
            },
            ddGroup: 'step-grid-dd',
            ddText: '移动至该行',
            frame: false,
            store: store,
            //buttonAlign: "left",
            bbar: [
                {
                    xtype: 'tbtext',
                    text: '支持多步骤拖拽的顺序调整方式。',
                    style: 'font-size:14px'
                },
                {xtype: 'tbspacer', width: 340},
                {
                    text: "增加步骤",
                    ref: '../btnAddStep',
                    tooltip: "新增步骤到当前作业",
                    icon: "./images/add.gif",
                    scope: this,
                    menu: this.stepTypeMenus
                }
            ],
            forceFit: true,
            columnLines: true
        });

        return stepGrid;
    },
    _createJobBaseInfoPanel : function(){
    	var panel = Ext.create('Ext.panel.Panel', {
    		layout : {
    			type : 'table',
    			columns: 3,
    			tableAttrs: {
    				cellspacing: 5    		
    	        }
    		},
    		border : false,
    		items : [{
    			labelWidth: 70,
				width: 700,
				id: 'txtTaskName',
			    xtype: 'textfield',
			    height: 25,
			    fieldLabel: '作业名称',
			    value: this.initData.name
    		},{
    			xtype: 'displayfield',
                hideLabel: true,
                rowspan: 4,
                tdAttrs :{
                	valign : 'top',
                	style : 'padding-top:2px;'
                },
                value: this.initData.creater
    		},{	
    			tdAttrs :{
    				width : '100%',
    				align : 'right',
                	valign : 'top'
                },
                defaults:{margin:'0 0 5 0'},
                border : false,
                layout : {
                	type : 'vbox',
                	padding:'5'
                },
                items : [{
                	xtype: 'button',                    
                    id: 'btnSaveJobInfo',
                    cls: 'opera btn_main long',
                    text: '<i class="icon-ok icon-white"></i>&nbsp;保存作业'
                },{
                	xtype: 'button',
                	stype : 'margin-top:10px;',
                    id: 'btnJobPublicConfig',
                    cls: 'opera btn_sec long',
                    text: '<i class="icon-white icon-pencil"></i>&nbsp;全程设定'
                }],
    			rowspan: 4
    				
    		},{
    			fieldLabel: '开发商',
                width: 300,
                labelWidth: 70,
                id: 'txtTaskApplicaton',
                xtype: 'textfield',
                readOnly: true,
                value: this.initData.applicationName
    		},{
    			id: 'cmbTaskType',
                xtype: 'ijobscombo',
                queryMode: 'local',
                root: '',
                labelWidth: 70,
                width: 300,
                editable: false,
                triggerAction: 'all',
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ["isSystemType", "value", "label"],
                    data: typeDef.jobType.filter(function (value, index, arr) {
                        return value.isSystemType === false;
                    }),
                    proxy: {
                    	type: 'memory'
                    }
                }),
                valueField: "value",
                displayField: "label",
                fieldLabel: '作业类型',
                value: this.initData.jobType
    		},{
    			labelWidth: 70,
			    fieldLabel: '备注',
			    id: 'des',
			    width: 700,
			    xtype: 'textarea',
			    emptyText: '请输入作业备注',
			    value: this.initData.des
    		}]
    	});
    	return panel;
    }
});

//end file