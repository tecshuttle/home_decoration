var store = Ext.create('Ext.data.TreeStore', {
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/admin/articles_tree'
    }
});

Ext.define('MyApp.view.main.Articletree', {
    extend: 'Ext.tree.Panel',
    xtype: 'articletree',
    requires: [],
    id: 'type_tree',
    rootVisible: false,
    frame: false,
    border: false,
    bodyBorder: false,
    useArrows: true,
    store: store,
    COMPONENTS: {},
    tbar: [
        {
            text: '添加同级',
            name: 'sibling',
            id: 'type_tree_add_sibling_type'
        },
        {
            text: '添加下级',
            name: 'children',
            id: 'type_tree_add_children_type'
        },
        {
            text: '删除',
            name: 'delete',
            id: 'type_tree_delete_type'
        }
    ],
    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Ext.apply(this.COMPONENTS, {
            typeTree: Ext.getCmp('type_tree'),
            typeInfoForm: Ext.getCmp('type_info_form'),
            grid: Ext.getCmp('article_grid'),
            addSiblingType: Ext.getCmp('type_tree_add_sibling_type'),
            addChildrenType: Ext.getCmp('type_tree_add_children_type'),
            deleteType: Ext.getCmp('type_tree_delete_type'),
        });

        me.on('itemclick', me._treeItemClick, me);
        $c.addSiblingType.on('click', me._addType, me);
        $c.addChildrenType.on('click', me._addType, me);
        $c.deleteType.on('click', me._deleteType, me);
    },

    _treeItemClick: function (tree, record, item, index, e, eOpts) {
        var me = this;

        //me._returnGrid();

        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/getTypeInfo',
            params: {
                id: record.raw.id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me._setValueTypeInfo(result);
            }
        });


        //加载产品列表
        var store = me.COMPONENTS.grid.getStore();
        var proxy = store.getProxy();
        Ext.apply(proxy.extraParams, {
            type_id: record.raw.id
        });

        store.reload();
    },

    _showProductForm: function () {
        console.log('ok');
    },

    _deleteType: function (btn) {
        var me = this;
        var culTypeID = this.COMPONENTS.typeInfoForm.getForm().getValues().id;

        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/deleteType',
            params: {
                id: culTypeID
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.COMPONENTS.typeTree.getStore().reload();
            }
        });
    },

    _addType: function (btn) {
        var me = this;
        var type = btn.name;
        var culTypeID = this.COMPONENTS.typeInfoForm.getForm().getValues().id;

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


        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/addType',
            params: {
                module: 'articles',
                type: type,
                name: name,
                id: culTypeID
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.COMPONENTS.typeTree.getStore().reload();
            }
        });
    },

    _setValueTypeInfo: function (values) {
        var $c = this.COMPONENTS;
        $c.typeInfoForm.getForm().setValues(values);
    }

});

//end file