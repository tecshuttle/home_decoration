Ext.ns('Tomtalk');

Ext.define('Tomtalk.gridUI', {
    extend: 'Ext.grid.GridPanel',

    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            title: '编辑',
            //bodyStyle: 'padding:10px;',

            layout: 'anchor',
            header: false,
            columnLines: true,
            columns: [
                {
                    header: "显示顺序", dataIndex: 'order'
                },
                {
                    header: "名称", dataIndex: 'name'
                },
                {
                    header: "说明", dataIndex: 'desc'
                },
                {
                    header: "最后修改时间", dataIndex: 'mtime',
                    renderer: function (v) {
                        var date = new Date(v * 1000);
                        return moment(date).format('YYYY-MM-DD');
                    }
                },
                {
                    header: "操作",
                    dataIndex: 'id',
                    align: 'left',
                    xtype: 'actioncolumn',
                    name: 'opertation',
                    items: [{
                        glyph: '编辑',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            me._edit(rec);
                        }
                    },
                        {
                            glyph: '删除',
                            handler: function (grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                me._delete(rec.get('id'));
                            }
                        }

                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            text: '新建',
                            ref: 'add',
                            id: this.id + '_add'
                        }
                    ]
                }
            ],

            forceFit: true,
            viewConfig: {
                stripeRows: true,
                enableRowBody: true,
                showPreview: true
            }
        }, config);

        me.COMPONENTS = {};

        Tomtalk.gridUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            pageSize: 20,
            fields: me.fields,
            proxy: {
                type: 'ajax',
                url: '/admin/getList',
                extraParams: {
                    module: me.module
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                }
            }
        });

        me.store = store;
        me.bbar = {
            xtype: 'pagingtoolbar',
            store: store,
            displayInfo: true,
            beforePageText: '页',
            afterPageText: '/ {0}',
            displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
            emptyMsg: "没有记录"
        };


        Tomtalk.gridUI.superclass.initComponent.call(me);
    }
});

Ext.define('Tomtalk.gridAction', {
    extend: 'Tomtalk.gridUI',
    constructor: function (config) {
        Tomtalk.gridAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.gridAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            //addBtn: Ext.getCmp(this.id + '_add'),
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.gridAction.superclass.initEvents.call(me);

        me.down('button[ref*=add]').on('click', me._add, me);
        //$c.saveBtn.on('click', me._save, me);
    },

    _return: function () {
        this.getForm().reset();

        if (this.up()) {
            this.up()._returnFrom();
        }
    },

    _delete: function (id) {
        var me = this;

        Ext.Ajax.request({
            url: '/admin/gridDelete',
            params: {
                module: me.module,
                id: id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.up().COMPONENTS.grid.getStore().reload();
            }
        });
    },

    _add: function () {
        var $c = this.up().COMPONENTS;

        $c.grid.hide();
        $c.form.getForm().reset();
        $c.form.show();
    },

    _edit: function (rec) {
        var $c = this.up().COMPONENTS;

        $c.grid.hide();
        $c.form.getForm().setValues(rec.data);
        $c.form.show();
    }
});

Tomtalk.grid = Tomtalk.gridAction;

//end file