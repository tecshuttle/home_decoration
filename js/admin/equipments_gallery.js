Ext.ns('Tomtalk');

/************************ 图库显示dataview *************************/
Ext.define('Tomtalk.equipment.gallery.GridUI', {
    extend: 'Ext.Panel',
    autoScroll: true,
    //border: false,
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            bodyStyle: 'padding:10px;'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.equipment.gallery.GridUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;

        me.items = [
            me._grid()
        ];

        this.tbar = {
            items: [
                {
                    xtype: 'button',
                    text: '上传图片',
                    id: this.id + '_upload'
                },
                {
                    xtype: 'button',
                    text: '向前排序',
                    disabled: true,
                    id: this.id + '_btn_front'
                },
                {
                    xtype: 'button',
                    text: '向后排序',
                    disabled: true,
                    id: this.id + '_btn_back'
                },
                {
                    xtype: 'button',
                    text: '删除',
                    disabled: true,
                    id: this.id + '_btn_del'
                },
                {
                    xtype: 'tbtext',
                    id: this.id + '_num_selected',
                    text: ''
                }
            ]
        };


        Tomtalk.equipment.gallery.GridUI.superclass.initComponent.call(me);
    },

    _grid: function () {
        ImageModel = Ext.define('ImageModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'name'},
                {name: 'url'},
                {name: 'download'},
                {name: 'size', type: 'float'},
                {name: 'lastmod', type: 'date', dateFormat: 'timestamp'}
            ]
        });

        var store = Ext.create('Ext.data.Store', {
            model: 'ImageModel',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/equipments/getGalleryList',
                extraParams: {
                    pid: this.product_id
                },
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        var grid = Ext.create('Ext.view.View', {
            store: store,
            id: 'images-view',
            tpl: [
                '<tpl for=".">',
                '<div class="thumb-wrap" id="{name:stripTags}">',
                '<div class="thumb"><img width=100 src="/uploads/thumbnail/{download}" title="{name:htmlEncode}"></div>',
                '<span class="x-editable">{shortName:htmlEncode}</span>',
                '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
            autoScroll: true,
            //height: 310,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images to display',
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {}),
                Ext.create('Ext.ux.DataView.LabelEditor', {
                    dataIndex: 'name',
                    listeners: {
                        click: {
                            element: 'el', //bind to the underlying el property on the panel
                            fn: function () {
                                //console.log('click el');
                            }
                        },
                        complete: {
                            fn: function (obj, value, startValue, eOpts) {
                                $.post("/gallery/update", {
                                    id: obj.activeRecord.id,
                                    name: value
                                }, function (result) {
                                    console.log(result);
                                }, 'json')
                            }
                        }

                    }
                })
            ],
            prepareData: function (data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 18),
                    sizeString: Ext.util.Format.fileSize(data.size),
                    dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
                });
                return data;
            }
        });

        this.COMPONENTS.grid = grid;

        return grid;
    }
});

Ext.define('Tomtalk.equipment.gallery.GridAction', {
    extend: 'Tomtalk.equipment.gallery.GridUI',
    constructor: function (config) {
        Tomtalk.equipment.gallery.GridAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.equipment.gallery.GridAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            grid: Ext.getCmp('images-view'),
            uploadBtn: Ext.getCmp(this.id + '_upload'),
            frontBtn: Ext.getCmp(this.id + '_btn_front'),
            backBtn: Ext.getCmp(this.id + '_btn_back'),
            delBtn: Ext.getCmp(this.id + '_btn_del'),
            tips: Ext.getCmp(this.id + '_num_selected')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.equipment.gallery.GridAction.superclass.initEvents.call(me);

        $c.uploadBtn.on('click', me._upload, me);
        $c.frontBtn.on('click', me._move_front, me);
        $c.backBtn.on('click', me._move_back, me);
        $c.delBtn.on('click', me._del, me);

        $c.grid.on('selectionchange', me._selectionchange, me);
    },

    _selectionchange: function (dv, nodes) {
        var me = this;
        var $c = this.COMPONENTS;


        if (nodes.length === 0) {
            $c.frontBtn.setDisabled(true);
            $c.backBtn.setDisabled(true);
            $c.delBtn.setDisabled(true);
            $c.tips.setData('');
        } else {
            $c.frontBtn.enable();
            $c.backBtn.enable();
            $c.delBtn.enable();
            $c.tips.setData('已选择 ' + nodes.length + ' 张图片');
        }
    },

    //取图库的store
    getStore: function () {
        return this.COMPONENTS.grid.getStore();
    },

    _move_front: function () {
        this._move(-1);
    },

    _move_back: function () {
        this._move(2);
    },

    _move: function (direct) {
        var $c = this.COMPONENTS;
        var store = $c.grid.getStore();

        var recs = $c.grid.getSelectionModel().getSelection();
        var rec = store.getByInternalId(recs[0].internalId);

        var index = store.indexOf(rec) + direct;

        if (index < 0) {
            return;
        }

        store.insert(index, rec); //向前或向后移动位置

        //保守排序
        $.post("/equipments/orderGalleryByids", {
            ids: store.getData().getValues('id')
        }, function (result) {
            console.log(result);
        }, 'json')
    },

    _del: function () {
        var $c = this.COMPONENTS;
        var nodes = $c.grid.getSelectedNodes();

        $.each(nodes, function (i, node) {
            Ext.get(node.id).destroy();
        });

        var recs = $c.grid.getSelectionModel().getSelection();

        var ids = [];
        $.each(recs, function (i, rec) {
            ids.push(rec.id);
        });

        $.post("/equipments/deleteGalleryByids", {
            ids: ids.join(',')
        }, function (result) {
            console.log(result);
        }, 'json')
    },

    _upload: function () {
        this.up().up()._showGalleryBatchPanel();
    },

    _select: function (grid, rec, opt) {
        this.up().up()._edit(rec);
    }

});

Tomtalk.equipment.gallery.Grid = Tomtalk.equipment.gallery.GridAction;


/*********************** 图库上传 ****************************/
Ext.define('Tomtalk.equipments.gallery.BatchUI', {
    extend: 'Ext.form.Panel',
    layout: 'vbox',
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            //title: '批量上传图片',
            bodyStyle: 'padding:10px;'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.equipments.gallery.BatchUI.superclass.constructor.call(me, config);
    },

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
                name: 'type_id',
                value: 0
            },
            {
                xtype: 'fieldcontainer',
                style: 'margin-bottom:5px;',
                html: '<input id="fileupload" type="file" name="files[]" data-url="/equipments/batch_submit" multiple>'
            },
            {
                xtype: 'fieldcontainer',
                style: 'margin-bottom:5px;',
                html: '<div id="progress"><div class="bar" style="width: 0%;height: 18px; background: green;"></div></div>'
            },
            {
                xtype: 'fieldcontainer',
                style: 'margin-bottom:5px;',
                html: '<div id="uploads_msg"></div>'
            },
            {
                xtype: 'button',
                text: '返回',
                id: this.id + '_return',
                style: 'margin-top: 2em;',
                width: 70
            }
        ];

        Tomtalk.equipments.gallery.BatchUI.superclass.initComponent.call(me);
    }
});

Ext.define('Tomtalk.equipments.gallery.BatchAction', {
    extend: 'Tomtalk.equipments.gallery.BatchUI',
    constructor: function (config) {
        Tomtalk.equipments.gallery.BatchAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.equipments.gallery.BatchAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            returnBtn: Ext.getCmp(this.id + '_return')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.equipments.gallery.BatchAction.superclass.initEvents.call(me);
        $c.returnBtn.on('click', me._return, me);
    },

    _return: function () {
        //重置面板显示
        $('#uploads_msg').html('');
        $('#progress .bar').css('width', '0%');

        this.getForm().reset();
        this.hide();

        if (this.up().up()) {
            this.up().up()._returnGrid();
        }
    },

    _getValue: function () {
        var me = this;
        var $c = this.COMPONENTS;
        var addForm = me.getForm();
        if (!addForm.isValid()) {
            return false;
        }

        return addForm.getValues();
    }
});

Tomtalk.equipments.gallery.Batch = Tomtalk.equipments.gallery.BatchAction;


Tomtalk.equipments.GalleryUI = Ext.extend(Ext.Window, {
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            border: false,
            style: 'padding:10px;background-color: white;',
            layout: 'border'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.equipments.GalleryUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;
        me.items = [
            me._centerPanel()
        ];

        Tomtalk.equipments.GalleryUI.superclass.initComponent.call(me);
    },


    _centerPanel: function () {
        var me = this;
        var items = [
            me._galleryGrid(),
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
        var grid = Ext.create('Tomtalk.equipment.gallery.Grid', {
            module: this.module,
            product_id: this.product_id,
            id: this.id + '_gridList'
        });

        return grid;
    },

    _galleryBatch: function () {
        var batch = Ext.create('Tomtalk.equipments.gallery.Batch', {
            module: this.module,
            hidden: true
        });

        this.COMPONENTS.galleryBatch = batch;

        return batch;
    }
});

Tomtalk.equipments.GalleryAction = Ext.extend(Tomtalk.equipments.GalleryUI, {
    constructor: function (config) {
        Tomtalk.equipments.GalleryAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.equipments.GalleryAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
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

        Tomtalk.equipments.GalleryAction.superclass.initEvents.call(me);

        //$c.typeTree.on('itemclick', me._treeItemClick, me);
    },

    _afterrender: function () {
        var $c = this.COMPONENTS;
    },

    _showProductForm: function () {
        var me = this;

        if (!me._isSelectedType()) {
            return false;
        }

        var $c = this.COMPONENTS;

        $c.grid.hide();
        $c.productForm.show();
    },

    _showGalleryBatchPanel: function () {
        var me = this;

        var $c = this.COMPONENTS;

        $c.grid.hide();
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

                me._returnGrid();
            },
            formData: [
                {
                    name: 'product_id',
                    value: me.product_id
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

        if ($c.galleryBatch) {
            $c.galleryBatch.hide();
        }

        $c.grid.getStore().reload();
    },

    _returnFrom: function () {
        var $c = this.COMPONENTS;

        $c.productForm.hide();

        $c.grid.show();
        $c.grid.getStore().reload();
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
    }
});

Tomtalk.equipments.Gallery = Tomtalk.equipments.GalleryAction;

//end file