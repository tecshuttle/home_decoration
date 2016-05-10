Ext.ns('Tomtalk');

Tomtalk.IdcUI = Ext.extend(Ext.Panel, {
    KE: false,
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            style: 'padding:10px;background-color: white;',
            border: false
        }, config);

        me.COMPONENTS = {};

        Tomtalk.IdcUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;
        me.items = [
            me._grid()
        ];

        if (me.module == 'site_settings') {
            me.items.push(
                Ext.create('Tomtalk.grid.Form', {
                    id: me.id + '_form',
                    hidden: true
                })
            );
        }

        if (me.module == 'tag') {
            me.items.push(
                Ext.create('Tomtalk.grid.Form', {
                    id: me.id + '_form',
                    module: me.module,
                    hidden: true
                })
            );
        }

        if (me.module == 'scroll_img') {
            me.items.push(
                Ext.create('Tomtalk.grid.Form', {
                    id: me.id + '_form',
                    module: me.module,
                    hidden: true
                })
            );
        }

        if (me.module == 'admins') {
            me.items.push(
                Ext.create('Tomtalk.grid.AccountForm', {
                    id: me.id + '_form',
                    hidden: true
                })
            );
        }

        Tomtalk.IdcUI.superclass.initComponent.call(me);
    },

    _grid: function () {
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

        var linkcolumn = [];

        if (me.module == 'admins') {
            linkcolumn.push({
                glyph: '编辑',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    me._edit(rec);
                }
            });
        }

        if (me.module == 'tag') {
            linkcolumn.push({
                glyph: '编辑',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    me._edit(rec);
                }
            });
        }

        if (me.module == 'scroll_img') {
            linkcolumn.push({
                glyph: '编辑',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    me._edit(rec);
                }
            });
        }

        if (me.module == 'site_settings') {
            linkcolumn.push({
                glyph: '编辑',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    me._edit(rec);
                }
            });
        } else {
            linkcolumn.push({
                glyph: '删除',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    me._delete(rec.get('id'));
                }
            });
        }

        me.columns.push({
            header: "操作",
            dataIndex: 'id',
            align: 'left',
            xtype: 'actioncolumn',
            name: 'opertation',
            items: linkcolumn
        });

        var grid = new Ext.grid.GridPanel({
            id: this.id + '_grid',
            title: '我被授权的作业',
            header: false,
            columnLines: true,
            store: store,
            columns: me.columns,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            text: '新建',
                            id: this.id + '_add'
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
            form: Ext.getCmp(this.id + '_form'),
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
        $c.addBtn.on('click', me._add, me);
    },

    _afterrender: function () {
        var $c = this.COMPONENTS;
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
                me.COMPONENTS.grid.getStore().reload();
            }
        });
    },

    _add: function () {
        var $c = this.COMPONENTS;

        $c.grid.hide();
        $c.form.getForm().reset();
        $c.form.show();

        if (this.module === 'site_settings') {
            var KE = this.KE;

            if (KE) {
                KE.data("kendoEditor").value('');
            } else {
                this.KE = $("#kendoeditor-inputEl").kendoEditor(ke_config);
            }
        }


    },

    _edit: function (rec) {
        var $c = this.COMPONENTS;

        $c.grid.hide();
        $c.form.getForm().setValues(rec.data);
        $c.form.show();

        if (this.module === 'site_settings') {
            var KE = this.KE;

            if (KE) {
                KE.data("kendoEditor").value(rec.data.value);
            } else {
                this.KE = $("#kendoeditor-inputEl").kendoEditor(ke_config);
            }
        }
    },

    _returnFrom: function () {
        var $c = this.COMPONENTS;

        $c.form.hide();

        $c.grid.show();
        $c.grid.getStore().reload();
    }
});

Tomtalk.Idc = Tomtalk.IdcAction;

//end file