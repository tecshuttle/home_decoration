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

        var tree = Ext.create('Ext.tree.Panel', {
            id: this.id + '_type_tree',
            rootVisible: false,
            useArrows: true,
            title: me.lang[me.module],
            width: 300,
            height: 300,
            store: store,
            tbar: [
                {
                    text: '添加同级',
                    name: 'sibling',
                    id: this.id + '_add_sibling_type'
                },
                {
                    text: '添加下级',
                    name: 'children',
                    id: this.id + '_add_children_type'
                },
                {
                    text: '删除',
                    name: 'delete',
                    id: this.id + '_delete_type'
                }
            ]

        });

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
        var items = '';

        if (me.module == 'gallery') {
            items = [
                this._typeInfoPanel(),
                this._galleryGrid(),
                this._galleryForm(),
                this._galleryBatch()
            ];
        } else {
            items = [
                this._typeInfoPanel(),
                this._gridList(),
                this._productForm()
            ];
        }

        var center = Ext.create('Ext.panel.Panel', {
            region: 'center',
            autoScroll: true,
            border: false,
            items: items
        });

        return center;
    },

    _typeInfoPanel: function () {
        var me = this;

        var queryPanel = new Ext.form.Panel({
            id: this.id + '_type_info_form',
            title: me.lang[me.module] + '分类信息',
            bodyStyle: 'padding: 10px;',
            style: 'margin-bottom: 10px;',
            collapsible: true,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'table',
                        columns: 2,
                        tableAttrs: {
                            style: {
                                width: '100%'
                            }
                        }
                    },
                    defaults: {frame: true, margin: '2px'},
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'id',
                            value: 0
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '名称',
                            name: 'name',
                            width: 400,
                            emptyText: ''
                        },
                        {
                            xtype: 'button',
                            id: this.id + '_type_info_save',
                            width: 100,
                            text: '保存'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '封面图',
                            width: 400,
                            name: 'cover',
                            emptyText: ''
                        },
                        {
                            xtype: 'button',
                            id: this.id + '_btn_product_form',
                            width: 100,
                            text: '增加所属' + me.lang[me.module]
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: '排序权重',
                            width: 400,
                            colspan: me.module == 'gallery' ? 1 : 2,
                            name: 'weight',
                            emptyText: ''
                        },
                        {
                            xtype: 'button',
                            id: this.id + '_btn_gallery_batch_add',
                            width: 100,
                            hidden: me.module == 'gallery' ? false : true,
                            text: '批量增加图片'
                        },
                        {
                            xtype: 'textarea',
                            colspan: 2,
                            width: 600,
                            fieldLabel: '说明',
                            name: 'desc',
                            emptyText: ''
                        }
                    ]
                }
            ]
        });

        return queryPanel;
    },

    _gridList: function () {
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            pageSize: 20,
            fields: ['id', 'name', 'desc', 'cover', 'content', 'download', 'is_hot', 'ctime', 'keywords', 'picture_gallery'],
            proxy: {
                type: 'ajax',
                url: '/' + me.module + '/getList',
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                }
            }
        });

        var grid = Ext.create('Ext.grid.GridPanel', {
            id: this.id + '_gridList',
            header: false,
            columnLines: true,
            store: store,
            columns: [
                {
                    header: "ID", dataIndex: 'id'
                },
                {
                    header: "名称", dataIndex: 'name'
                },
                {
                    header: "简介", dataIndex: 'desc'
                },
                {
                    header: "SEO Keywords", dataIndex: 'keywords'
                },
                {
                    header: "封面图片", dataIndex: 'cover'
                },
                {
                    header: "首页推荐", dataIndex: 'is_hot',
                    renderer: function (v) {
                        return (v == 1 ? '是' : '不是');

                    }
                },
                {
                    header: "建立时间", dataIndex: 'ctime',
                    renderer: function (v) {
                        return new Date(v * 1000).format('yyyy-MM-dd hh:mm:ss');

                    }
                },

                {
                    header: "下载", dataIndex: 'download'
                },
                {
                    header: "操作",
                    dataIndex: 'id',
                    align: 'left',
                    xtype: 'linkcolumn',
                    name: 'opertation',
                    items: [
                        {
                            text: '编辑',
                            handler: function (grid, rowIndex, colIndex) {
                                var record = grid.getStore().getAt(rowIndex);
                                me._edit(record); //alert("Terminate " + rec.get('title'));
                            }
                        },
                        {
                            text: '克隆',
                            hidden: (me.module == 'products' ? false : true),
                            handler: function (grid, rowIndex, colIndex) {
                                var record = grid.getStore().getAt(rowIndex);
                                me._clone(record.get('id'));
                            }
                        },
                        {
                            text: '删除',
                            handler: function (grid, rowIndex, colIndex) {
                                var record = grid.getStore().getAt(rowIndex);
                                me._delete(record.get('id'));
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
        $c.addSiblingType.on('click', me._addType, me);
        $c.addChildrenType.on('click', me._addType, me);
        $c.deleteType.on('click', me._deleteType, me);

        $c.btnProductForm.on('click', me._showProductForm, me);
        $c.btnGalleryBatchAdd.on('click', me._showGalleryBatchPanel, me);
        $c.typeInfoSaveBtn.on('click', me._saveTypeInfo, me);
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

    _treeItemClick: function (tree, record, item, index, e, eOpts) {
        var me = this;

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
        $c.typeInfoForm.getForm().setValues(values);
    },

    _isSelectedType: function () {
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
        $c.typeInfoForm.hide();
        $c.productForm.show();
    },

    _showGalleryBatchPanel: function () {
        var me = this;

        if (!me._isSelectedType()) {
            return false;
        }

        var form = this.COMPONENTS.typeInfoForm;
        var values = form.getForm().getValues();

        var $c = this.COMPONENTS;

        $c.grid.hide();
        $c.typeInfoForm.hide();
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

                me.doLayout();
            },
            formData: [
                {
                    name: 'type_id',
                    value: values.id
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
        $c.typeInfoForm.show();
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
        $c.typeInfoForm.show();

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

        record.raw.ctime = new Date(record.raw.ctime * 1000);
        form.setValues(record.raw);
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

//end file