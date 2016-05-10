Ext.ns('Color.admin');


/*  START 器材编辑表单  */
Ext.define('Color.admin.SizeFormUI', {extend: 'Ext.form.Panel',
    title: '规格编辑',
    bodyStyle: 'padding:10px;',
    layout: 'anchor',
    COMPONENTS: {},
    initComponent: function () {
        var me = this;

        me.items = [
            {
                xtype: 'hiddenfield',
                name: 'id',
                value: 0
            },
            {
                xtype: 'hiddenfield',
                name: 'pid'
            },
            {
                xtype: 'textfield',
                fieldLabel: '一级分类',
                allowBlank: false,
                anchor: '50%',
                name: 'class_a',
                emptyText: '请输入…'
            },
            {
                xtype: 'textfield',
                fieldLabel: '二级分类',
                anchor: '50%',
                name: 'class_b',
                emptyText: '请输入…'
            },
            {
                xtype: 'textfield',
                fieldLabel: '价格',
                anchor: '50%',
                name: 'price',
                emptyText: '请输入…'
            },
            {
                xtype: 'textfield',
                fieldLabel: '数量',
                anchor: '50%',
                name: 'stock',
                emptyText: '请输入…'
            }
        ];

        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
                        text: '保存',
                        width: 100,
                        id: this.id + '_save'
                    },
                    {
                        text: '返回',
                        style: 'margin-left: 50px;',
                        width: 100,
                        id: this.id + '_return'
                    }
                ]
            }
        ];

        Color.admin.SizeFormUI.superclass.initComponent.call(me);
    }
});

Ext.define('Color.admin.SizeFormAction', {extend: 'Color.admin.SizeFormUI',
    constructor: function (config) {
        Color.admin.SizeFormAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Color.admin.SizeFormAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            saveBtn: Ext.getCmp(this.id + '_save'),
            returnBtn: Ext.getCmp(this.id + '_return')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Color.admin.SizeFormAction.superclass.initEvents.call(me);

        $c.saveBtn.on('click', me._save, me);
        $c.returnBtn.on('click', me._return, me);
    },

    _return: function () {
        var me = this;

        me.getForm().reset();

        var $c = me.up().up().COMPONENTS;

        me.hide();

        $c.sizeGrid.show();
        $c.sizeGrid.getStore().reload();
    },

    _save: function () {
        var me = this;
        var form = me;

        if (form.isValid()) {
            form.getForm().submit({
                url: '/equipments/size_save',//后台处理的页面
                waitMsg: '保存数据……',
                submitEmptyText: false,
                success: function (fp, o) {
                    //console.log(res);
                    var result = Ext.decode(o.response.responseText);

                    if (result.success) {
                        me._return();
                    } else {
                        alert('See error info by console.');
                    }
                }
            });
        }
    }
});

Color.admin.SizeForm = Color.admin.SizeFormAction;

/*  END 器材编辑表单  */


/*  START 器材列表  */

var sizeStore = Ext.create('Ext.data.Store', {
    pageSize: 20,
    fields: ['id', 'pid', 'name', 'class_a', 'class_b', 'price', 'stock', 'ctime', 'mtime'],
    proxy: {
        type: 'ajax',
        url: '/equipments/getSizeList',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});

Ext.define('Color.admin.SizeGridUI', {
    extend: 'Ext.grid.GridPanel',
    id: this.id + '_size_grid',
    title: '编辑产品规格',
    columnLines: true,
    store: sizeStore,
    COMPONENTS: {},
    initComponent: function () {
        var me = this;

        me.columns = [
            {
                header: "ID", dataIndex: 'id', hidden: true
            },
            {
                header: "一级分类", dataIndex: 'class_a'
            },
            {
                header: "二级分类", dataIndex: 'class_b'
            },
            {
                header: "价格", dataIndex: 'price'
            },
            {
                header: "库存", dataIndex: 'stock'
            },
            {
                header: "操作",
                dataIndex: 'id',
                align: 'center',
                width: 130,
                xtype: 'actioncolumn',
                name: 'opertation',
                items: [
                    {
                        glyph: '编辑',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            me._edit(record); //alert("Terminate " + rec.get('title'));
                        }
                    },
                    {
                        glyph: '删除',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            me._delete(record.get('id'));
                        }
                    }
                ]
            }
        ];

        me.dockedItems = [
            {
                xtype: 'toolbar',
                items: [
                    {
                        text: '返回',
                        width: 100,
                        id: this.id + '_return'
                    },
                    {
                        text: '新建规格',
                        width: 100,
                        id: this.id + '_add'
                    }
                ]
            }
        ];

        Color.admin.SizeGridUI.superclass.initComponent.call(me);
    },

    bbar: {
        xtype: 'pagingtoolbar',
        store: sizeStore,
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


Ext.define('Color.admin.SizeGridAction', {extend: 'Color.admin.SizeGridUI',
    constructor: function (config) {
        Color.admin.SizeGridAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Color.admin.SizeGridAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            returnBtn: Ext.getCmp(this.id + '_return'),
            addBtn: Ext.getCmp(this.id + '_add')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Color.admin.SizeGridAction.superclass.initEvents.call(me);

        $c.returnBtn.on('click', me._return, me);
        $c.addBtn.on('click', me._showForm, me);
    },

    _return: function () {
        var me = this;
        var $c = me.up().up().COMPONENTS;

        me.hide();
        $c.sizeForm.hide();
        $c.grid.show();
        $c.grid.getStore().reload();
    },

    _showForm: function () {
        var me = this;
        var $c = me.up().up().COMPONENTS;

        me.hide();
        $c.sizeForm.show();

        //设置pid
        var proxy = $c.sizeGrid.getStore().getProxy();
        var sizeForm = $c.sizeForm.getForm();

        sizeForm.setValues({
            pid: proxy.extraParams['pid']
        });
    },

    _edit: function (record) {
        var me = this;

        var form = me.up().up().COMPONENTS.sizeForm.getForm();

        me._showForm();

        //record.raw.ctime = new Date(record.raw.ctime * 1000);
        form.setValues(record.data);
    },

    _delete: function (id) {
        var me = this;

        Ext.Ajax.request({
            url: '/equipments/size_delete',
            params: {
                id: id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.getStore().reload();
            }
        });
    }

});

Color.admin.SizeGrid = Color.admin.SizeGridAction;

/*  END 器材列表  */

//end file