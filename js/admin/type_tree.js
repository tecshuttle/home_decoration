Ext.ns('Tomtalk');

Tomtalk.typeTreeUI = Ext.extend(Ext.Panel, {
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            border: false,
            width: 300,
            layout: 'fit'
        }, config);

        me.lang = {
            products: '产品',
            articles: '文章',
            gallery: '图片'
        };

        me.COMPONENTS = {};

        Tomtalk.typeTreeUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;
        me.items = [
            me._tree(),
            me._form()
        ];

        Tomtalk.typeTreeUI.superclass.initComponent.call(me);
    },

    _tree: function () {
        var me = this;

        var store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/admin/' + me.module + '_tree'
            }
        });

        var tree = Ext.create('Ext.tree.Panel', {
            id: this.id + '_tree',
            rootVisible: false,
            useArrows: true,
            title: me.lang[me.module],
            store: store,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    id: this.id + '_toolbar',
                    dock: 'top',
                    //hidden: true,
                    disabled: true,
                    items: [
                        {
                            text: '添加同级',
                            name: 'sibling',
                            id: this.id + '_add_sibling'
                        },
                        {
                            text: '添加下级',
                            name: 'children',
                            id: this.id + '_add_children'
                        },
                        {
                            text: '删除',
                            name: 'delete',
                            id: this.id + '_delete'
                        },
                        {
                            text: '编辑',
                            name: 'edit',
                            id: this.id + '_edit'
                        },
                        {
                            text: ' +内容',
                            id: this.id + '_add_content'
                        }
                    ]
                }
            ]
        });

        return tree;
    },

    _form: function () {
        var me = this;

        var form = new Ext.form.Panel({
            id: this.id + '_form',
            title: me.lang[me.module] + '分类信息',
            hidden: true,
            bodyStyle: 'padding: 10px;',
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                emptyText: '',
                labelWidth: 40
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '名称',
                    name: 'name'
                },

                {
                    xtype: 'textfield',
                    fieldLabel: '封面',
                    name: 'cover'
                },

                {
                    xtype: 'numberfield',
                    fieldLabel: '排序',
                    name: 'weight'
                },
                {
                    xtype: 'textarea',
                    fieldLabel: '说明',
                    name: 'desc'
                },
                {
                    xtype: 'button',
                    id: this.id + '_save',
                    margin: '0 0 10 0',
                    text: '保存'
                },
                {
                    xtype: 'button',
                    id: this.id + '_cancel',
                    margin: '0 0 10 0',
                    text: '取消'
                }
            ]
        });

        return form;
    }
});

Tomtalk.typeTreeAction = Ext.extend(Tomtalk.typeTreeUI, {
    constructor: function (config) {
        Tomtalk.typeTreeAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.typeTreeAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            //tree及其按钮
            tree: Ext.getCmp(this.id + '_tree'),
            toolbar: Ext.getCmp(this.id + '_toolbar'),
            addSibling: Ext.getCmp(this.id + '_add_sibling'),
            addChildren: Ext.getCmp(this.id + '_add_children'),
            delete: Ext.getCmp(this.id + '_delete'),
            edit: Ext.getCmp(this.id + '_edit'),
            addContent: Ext.getCmp(this.id + '_add_content'),

            //form及其按钮
            form: Ext.getCmp(this.id + '_form'),
            save: Ext.getCmp(this.id + '_save'),
            cancel: Ext.getCmp(this.id + '_cancel')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.typeTreeAction.superclass.initEvents.call(me);
        //tree按钮事件
        $c.tree.on('itemclick', me._treeItemClick, me);
        $c.addSibling.on('click', me._add, me);
        $c.addChildren.on('click', me._add, me);
        $c.delete.on('click', me._delete, me);
        $c.edit.on('click', me._edit, me);
        $c.addContent.on('click', me._add_content, me);

        //form按钮事件
        $c.save.on('click', me._save, me);
        $c.cancel.on('click', me._return, me);
    },

    _add: function (btn) {
        var me = this;
        var type = btn.name;
        var parent = me.up().up();

        var culTypeID = me.COMPONENTS.form.getForm().getValues().id;

        if (culTypeID == 0) {
            Ext.Msg.alert('提示', '请先选择一个分类!');
            return false;
        }

        var name = prompt("新分类名：", "");
        name = name.trim();

        if (name == '') {
            Ext.Msg.alert('提示', '分类名不能为空!');
            return false;
        }

        var module = {
            articles: 0,
            products: 1,
            downloads: 2,
            gallery: 3
        };

        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/addType',
            params: {
                module: module[me.module],
                type: type,
                name: name,
                id: culTypeID
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.reload();
            }
        });
    },

    _delete: function (btn) {
        var me = this;
        var parent = me.up().up();
        var culTypeID = me.COMPONENTS.form.getForm().getValues().id;

        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/deleteType',
            params: {
                id: culTypeID
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.reload();
            }
        });
    },

    _add_content: function () {
        this.up().up()._showEditForm();
    },

    _treeItemClick: function (tree, record, item, index, e, eOpts) {
        var me = this;

        me.COMPONENTS.toolbar.enable();

        var parent = me.up().up();
        parent._returnGrid();

        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/getTypeInfo',
            params: {
                id: record.raw.id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.setValue(result);
            }
        });

        //加载产品列表
        var store = parent.COMPONENTS.grid.getStore();
        var proxy = store.getProxy();
        Ext.apply(proxy.extraParams, {
            type_id: record.raw.id
        });

        store.reload();
    },

    _edit: function () {
        this.COMPONENTS.tree.hide();
        this.COMPONENTS.form.show();
    },

    _save: function () {
        var me = this;
        var values = me.COMPONENTS.form.getForm().getValues();

        Ext.Ajax.request({
            url: '/admin/saveTypeInfo',
            params: values,
            success: function (res) {
                me.reload();
            }
        });

        me._return();
    },

    _return: function () {
        this.COMPONENTS.form.hide();
        this.COMPONENTS.tree.show();
    },

    setValue: function (values) {
        this.COMPONENTS.form.getForm().setValues(values);
    },

    //重新加载数据
    reload: function () {
        this.COMPONENTS.tree.getStore().reload();
    }
});

Tomtalk.typeTree = Tomtalk.typeTreeAction;

//end file