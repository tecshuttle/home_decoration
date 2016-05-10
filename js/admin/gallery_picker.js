Ext.ns('Tomtalk');

Tomtalk.gallery.PickerUI = Ext.extend(Ext.Window, {
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            border: false,
            //style: 'background-color: #ced9e7;',
            //style: 'background-color: white;',
            layout: 'border'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.gallery.PickerUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;
        me.items = [
            me._typeTree(),
            me._centerPanel()
        ];

        Tomtalk.gallery.PickerUI.superclass.initComponent.call(me);
    },

    _typeTree: function () {
        var me = this;

        var store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/admin/' + me.module + '_tree'
            }
        });

        var tree = {
            xtype: 'treepanel',
            id: this.id + '_type_tree',
            rootVisible: false,
            useArrows: true,
            width: 220,
            height: 300,
            store: store
        };

        var panel = new Ext.form.Panel({
            region: 'west',
            layout: 'fit',
            border: false,
            style: 'margin-right: 10px;',
            items: tree
        });

        return panel;
    },

    _centerPanel: function () {
        var me = this;

        var center = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'fit',
            border: false,
            items: [
                Ext.create('Tomtalk.gallery.Grid', {
                    module: this.module,
                    editor: this.editor,
                    id: this.id + '_gridList'
                })
            ]
        });

        return center;
    }
});

Tomtalk.gallery.PickerAction = Ext.extend(Tomtalk.gallery.PickerUI, {
    constructor: function (config) {
        Tomtalk.gallery.PickerAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.gallery.PickerAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            typeTree: Ext.getCmp(this.id + '_type_tree'),
            grid: Ext.getCmp(this.id + '_gridList')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.gallery.PickerAction.superclass.initEvents.call(me);

        $c.typeTree.on('itemclick', me._treeItemClick, me);
    },

    _treeItemClick: function (tree, record, item, index, e, eOpts) {
        var me = this;
        var $c = me.COMPONENTS;

        me.type_id = record.raw.id;

        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/getTypeInfo',
            params: {
                id: record.raw.id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                //me._setValueTypeInfo(result);
            }
        });

        //加载产品列表
        var store = me.COMPONENTS.grid.getStore();
        var proxy = store.getProxy();
        Ext.apply(proxy.extraParams, {
            type_id: record.raw.id
        });

        store.reload();
    }
});

Tomtalk.gallery.Picker = Tomtalk.gallery.PickerAction;


/*
Ext.onReady(function () {
    var win = new Tomtalk.Idc({
        title: '选择图片',
        module: 'gallery',
        width : 930,
        height : 600,
        modal : true
    });

    win.show();
});

*/
//end file