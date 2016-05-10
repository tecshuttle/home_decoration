Ext.ns('Tomtalk');

Tomtalk.IdcUI = Ext.extend(Ext.Panel, {
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            border: false,
            style: 'padding:20px 20px 0',
            layout: 'anchor'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.IdcUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;
        me.items = [
            {
                xtype: 'button',
                id: this.id + '_add',
                text: '新增文章'
            },
            me._addForm(),
            me._queryPanel(),
            me._grid()
        ];

        Tomtalk.IdcUI.superclass.initComponent.call(me);
    },

    _addForm: function () {
        var me = this,
            queryPanel;

        queryPanel = new Ext.form.Panel({
            id: this.id + '_add_form',
            title: '增加文章',
            hidden: true,
            bodyStyle: 'padding: 10px;',
            collapsible: true,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '标题',
                            allowBlank: false,
                            anchor: '50%',
                            name: 'title',
                            emptyText: '请输入…'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '简介',
                            anchor: '50%',
                            name: 'desc',
                            emptyText: '请输入…'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '封面图',
                            anchor: '50%',
                            name: 'cover',
                            emptyText: '请输入…'
                        },
                        {
                            xtype: 'textarea',
                            anchor: '100%',
                            fieldLabel: '内容',
                            name: 'content',
                            allowBlank: false,
                            emptyText: '请输入…'
                        },
                        {
                            xtype: 'button',
                            id: this.id + '_save',
                            width: 100,
                            text: '保存'
                        },
                        {
                            xtype: 'button',
                            id: this.id + '_return',
                            width: 100,
                            text: '返回'
                        }
                    ]
                }
            ]
        });

        return queryPanel;
    },

    _queryPanel: function () {
        var me = this,
            queryPanel;

        queryPanel = new Ext.form.FieldSet({
            xtype: 'fieldset',
            id: this.id + '_query',
            title: '查询条件',
            style: 'margin-top:10px;',
            collapsible: true,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'ID',
                            id: this.id + '_id',
                            columnWidth: 0.25,
                            emptyText: '请输入…'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'IDC名称',
                            id: this.id + '_name',
                            columnWidth: 0.25,
                            emptyText: '请输入…'
                        },
                        {
                            xtype: 'button',
                            id: this.id + '_btn_query',
                            columnWidth: 0.25,
                            width: 100,
                            text: '查询'
                        },
                        {
                            xtype: 'button',
                            id: this.id + '_btn_reset',
                            columnWidth: 0.25,
                            width: 100,
                            text: '重置'
                        }
                    ]
                }
            ]
        });

        return queryPanel;
    },

    _grid: function () {
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            pageSize: 20,
            fields: ['id', 'title', 'type', 'desc', 'cover', 'content'],
            proxy: {
                type: 'ajax',
                url: '/article/getList',
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                }
            }
        });

        var grid = new Ext.grid.GridPanel({
            id: this.id + '_grid',
            title: '我被授权的作业',
            header: false,
            columnLines: true,
            store: store,
            columns: [
                {
                    header: "Title", dataIndex: 'title'
                },
                {
                    header: "Type", dataIndex: 'type'
                },
                {
                    header: "Description", dataIndex: 'desc'
                },
                {
                    header: "Cover Image", dataIndex: 'cover'
                },
                {
                    header: "Content", dataIndex: 'content'
                },
                {
                    header: "操作",
                    dataIndex: 'id',
                    align: 'left',
                    xtype: 'actioncolumn',
                    name: 'opertation',
                    items: [
                        {
                            icon: '/images/icons/cog_edit.png',
                            name: 'edit',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Terminate " + rec.get('title'));
                            }
                        }
                    ]
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                store: store,
                displayInfo: true,
                beforePageText: '页',
                afterPageText: '/ {0}',
                displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
                emptyMsg: "没有记录"
            },
            forceFit: true,
            viewConfig: {
                stripeRows: true,
                enableRowBody: true,
                showPreview: true
            }
        });

        return grid;
    }
});

Tomtalk.IdcAction = Ext.extend(Tomtalk.IdcUI, {
    constructor: function (config) {
        Tomtalk.IdcAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.IdcAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            addBtn: Ext.getCmp(this.id + '_add'),
            saveBtn: Ext.getCmp(this.id + '_save'),
            returnBtn: Ext.getCmp(this.id + '_return'),
            grid: Ext.getCmp(this.id + '_grid'),
            addForm: Ext.getCmp(this.id + '_add_form'),
            queryForm: Ext.getCmp(this.id + '_query'),
            id: Ext.getCmp(this.id + '_id'),
            name: Ext.getCmp(this.id + '_name'),
            query: Ext.getCmp(this.id + '_btn_query'),
            reset: Ext.getCmp(this.id + '_btn_reset')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.IdcAction.superclass.initEvents.call(me);

        this.on('boxready', me._afterrender, me);

        $c.addBtn.on('click', me._showAddForm, me);
        $c.returnBtn.on('click', me._returnGrid, me);
        $c.saveBtn.on('click', me._saveArticle, me);

        $c.query.on('click', me._query, me);
        $c.reset.on('click', me._reset, me);
    },

    _afterrender: function () {
        var $c = this.COMPONENTS;
    },

    _showAddForm: function () {
        var $c = this.COMPONENTS;

        $c.addBtn.hide();
        $c.grid.hide();
        $c.queryForm.hide();

        $c.addForm.show();
    },

    _returnGrid: function () {
        var $c = this.COMPONENTS;

        $c.addBtn.show();
        $c.grid.show();
        $c.queryForm.show();

        $c.addForm.hide();
        $c.addForm.getForm().reset();
    },

    _saveArticle: function () {
        var me = this;
        var $c = this.COMPONENTS;
        var addForm = $c.addForm.getForm();
        if (!addForm.isValid()) {
            return false;
        }

        var values = addForm.getValues();
        //console.log(values);

        Ext.Ajax.request({
            url: '/article/save',
            params: values,
            success: function (res) {
                var result = Ext.decode(res.responseText);
                //console.log(result);

                if (result.success) {
                    me._returnGrid();
                    //me._reset();
                    me.COMPONENTS.grid.getStore().reload();
                } else {
                    alert('See error info by console.');
                    console.log(result);
                }
            }
        });
    },

    _query: function () {
        var params = {
            id: this.COMPONENTS.id.getValue(),
            name: this.COMPONENTS.name.getValue()
        };

        var store = this.COMPONENTS.grid.getStore();
        var proxy = store.getProxy();

        Ext.apply(proxy.extraParams, params);

        store.load();
    },

    _reset: function () {
        this.COMPONENTS.addForm.getForm().reset();
    }
})
;

Tomtalk.Idc = Tomtalk.IdcAction;

Ext.onReady(function () {
    new Tomtalk.Idc({
        renderTo: Ext.getBody()
    });
});