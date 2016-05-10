Ext.ns('Tomtalk');

Tomtalk.IdcUI = Ext.extend(Ext.Viewport, {
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            border: false,
            style: 'padding:10px;background-color: white;',
            layout: 'border'
        }, config);

        me.COMPONENTS = {};

        me.lang = {
            products: '产品',
            articles: '文章',
            gallery: '图片'
        };

        Tomtalk.IdcUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;
        me.items = [
            me._typeTree(),
            me._centerPanel()
        ];

        Tomtalk.IdcUI.superclass.initComponent.call(me);
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
            width: 300,
            height: 300,
            //border: false,
            store: store,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            text: '添加同级',
                            name: 'sibling',
                            disabled: true,
                            id: this.id + '_add_sibling_type'
                        },
                        {
                            text: '添加下级',
                            name: 'children',
                            disabled: true,
                            id: this.id + '_add_children_type'
                        },
                        {
                            text: '删除',
                            name: 'delete',
                            disabled: true,
                            id: this.id + '_delete_type'
                        }
                    ]
                }
            ]
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
        var items = [
            me._galleryGrid(),
            me._galleryForm(),
            me._galleryBatch()
        ];

        var center = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'fit',
            border: false,
            items: items
        });

        return center;
    },

    _galleryGrid: function () {
        var grid = Ext.create('Tomtalk.gallery.Grid', {
            module: this.module,
            id: this.id + '_gridList'
        });

        return grid;
    },

    _productForm: function () {
        var form = Ext.create('Tomtalk.product.EditForm', {
            module: this.module,
            hidden: true
        });

        this.COMPONENTS.productForm = form;

        return form;
    },

    _galleryForm: function () {
        var form = Ext.create('Tomtalk.gallery.EditForm', {
            module: this.module,
            hidden: true
        });

        this.COMPONENTS.productForm = form;

        return  form;
    },

    _galleryBatch: function () {
        var batch = Ext.create('Tomtalk.gallery.Batch', {
            module: this.module,
            hidden: true
        });

        this.COMPONENTS.galleryBatch = batch;

        return  batch;
    }
});

Tomtalk.IdcAction = Ext.extend(Tomtalk.IdcUI, {
    constructor: function (config) {
        Tomtalk.IdcAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.IdcAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            typeTree: Ext.getCmp(this.id + '_type_tree'),
            addSiblingType: Ext.getCmp(this.id + '_add_sibling_type'),
            addChildrenType: Ext.getCmp(this.id + '_add_children_type'),
            deleteType: Ext.getCmp(this.id + '_delete_type'),

            addBtn: Ext.getCmp(this.id + '_add'),
            saveBtn: Ext.getCmp(this.id + '_save'),
            grid: Ext.getCmp(this.id + '_gridList'),
            typeInfoForm: Ext.getCmp(this.id + '_type_info_form'),
            typeInfoSaveBtn: Ext.getCmp(this.id + '_type_info_save'),
            btnProductForm: Ext.getCmp(this.id + '_btn_product_form'),
            btnGalleryBatchAdd: Ext.getCmp(this.id + '_btn_gallery_batch_add'),

            query: Ext.getCmp(this.id + '_btn_query'),
            reset: Ext.getCmp(this.id + '_btn_reset')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.IdcAction.superclass.initEvents.call(me);

        $c.typeTree.on('itemclick', me._treeItemClick, me);
        //$c.addSiblingType.on('click', me._addType, me);
        //$c.addChildrenType.on('click', me._addType, me);
        //$c.deleteType.on('click', me._deleteType, me);
    },

    _afterrender: function () {
        var $c = this.COMPONENTS;
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
                me.COMPONENTS.typeTree.getStore().reload();
            }
        });
    },

    _deleteType: function (btn) {
        var me = this;
        //var culTypeID = this.COMPONENTS.typeInfoForm.getForm().getValues().id;

        //加载分类信息
        Ext.Ajax.request({
            url: '/admin/deleteType',
            params: {
                id: me.type_id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.COMPONENTS.typeTree.getStore().reload();
            }
        });
    },

    _treeItemClick: function (tree, record, item, index, e, eOpts) {
        var me = this;
        var $c = me.COMPONENTS;
        //激活按钮
        $c.addSiblingType.setDisabled(false);
        $c.addChildrenType.setDisabled(false);
        $c.deleteType.enable();
        $c.grid.COMPONENTS.uploadBtn.enable();

        me.type_id = record.raw.id;

        me._returnGrid();


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

    _setValueTypeInfo: function (values) {
        var $c = this.COMPONENTS;
        //$c.typeInfoForm.getForm().setValues(values);
    },

    _isSelectedType: function () {
        return true;

        var form = this.COMPONENTS.typeInfoForm;
        var values = form.getForm().getValues();

        if (values.id == 0) {
            Ext.Msg.alert('提示', '请先选择一个分类!');
            return false;
        } else {
            return true;
        }
    },

    _saveTypeInfo: function () {
        var me = this;

        if (!me._isSelectedType()) {
            return false;
        }

        var form = this.COMPONENTS.typeInfoForm;
        var values = form.getForm().getValues();

        form.disable();

        Ext.Ajax.request({
            url: '/admin/saveTypeInfo',
            params: values,
            success: function (res) {
                form.enable();
                me.COMPONENTS.typeTree.getStore().reload();
            }
        });
    },

    _showProductForm: function () {
        var me = this;

        if (!me._isSelectedType()) {
            return false;
        }

        var $c = this.COMPONENTS;

        $c.grid.hide();
        //$c.typeInfoForm.hide();
        $c.productForm.show();
    },

    _showGalleryBatchPanel: function () {
        var me = this;

        if (!me._isSelectedType()) {
            return false;
        }

        //var form = this.COMPONENTS.typeInfoForm;
        //var values = form.getForm().getValues();

        var $c = this.COMPONENTS;

        $c.grid.hide();
        //$c.typeInfoForm.hide();
        $c.galleryBatch.show();

        $('#fileupload').fileupload({
            dataType: 'json',
            add: function (e, data) {
                data.submit();
            },
            done: function (e, data) {
                $.each(data.result.files, function (index, file) {
                    $('<p/>').text(file.name).appendTo($('#uploads_msg'));
                });

                //me.doLayout();
            },
            formData: [
                {
                    name: 'type_id',
                    value: me.type_id
                }
            ],
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .bar').css('width', progress + '%');
            }
        });
    },

    __showAddForm: function () {
        var $c = this.COMPONENTS;

        $c.addBtn.hide();
        $c.grid.hide();
        $c.typeInfoForm.hide();

        $c.addForm.show();
    },

    _returnGrid: function () {
        var $c = this.COMPONENTS;

        $c.grid.show();
        //$c.typeInfoForm.show();
        $c.productForm.hide();
        if ($c.galleryBatch) {
            $c.galleryBatch.hide();
        }
    },

    _returnFrom: function () {
        var $c = this.COMPONENTS;

        $c.productForm.hide();

        $c.grid.show();
        $c.grid.getStore().reload();
        //$c.typeInfoForm.show();
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
    },

    _edit: function (record) {
        var me = this;
        var form = this.COMPONENTS.productForm.getForm();

        me._showProductForm();

        //console.log(record)

        record.data.ctime = new Date(record.data.ctime * 1000);
        form.setValues(record.data);
    },

    _delete: function (id) {
        var me = this;

        Ext.Ajax.request({
            url: '/' + me.module + '/delete',
            params: {
                id: id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.COMPONENTS.grid.getStore().reload();
            }
        });
    },

    _clone: function (id) {
        var me = this;

        Ext.Ajax.request({
            url: '/' + me.module + '/clone_from_id',
            params: {
                id: id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);
                me.COMPONENTS.grid.getStore().reload();
            }
        });
    }
});

Tomtalk.Idc = Tomtalk.IdcAction;


Ext.onReady(function () {
    new Tomtalk.Idc({
        module: 'gallery',
        renderTo: Ext.getBody()
    });
});

//end file