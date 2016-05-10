Ext.ns('Tomtalk');

Ext.define('Tomtalk.gallery.GridUI', {extend: 'Ext.Panel',
    autoScroll: true,
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            bodyStyle: 'padding:6px;'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.gallery.GridUI.superclass.constructor.call(me, config);
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
                    text: '添加到文章',
                    disabled: true,
                    id: this.id + '_upload'
                },
                {
                    xtype: 'tbtext',
                    id: this.id + '_num_selected',
                    text: ''
                }
            ]
        };

        Tomtalk.gallery.GridUI.superclass.initComponent.call(me);
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
            proxy: {
                type: 'ajax',
                url: '/gallery/getList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
        //store.load();

        var grid = Ext.create('Ext.view.View', {
            store: store,
            id: 'images-view',
            tpl: [
                '<tpl for=".">',
                '<div class="thumb-wrap" id="{name:stripTags}">',
                '<div class="thumb"><img width=100 src="/uploads/{download}" title="{name:htmlEncode}"></div>',
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
                Ext.create('Ext.ux.DataView.DragSelector', { }),
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

Ext.define('Tomtalk.gallery.GridAction', {extend: 'Tomtalk.gallery.GridUI',
    constructor: function (config) {
        Tomtalk.gallery.GridAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.gallery.GridAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            grid: Ext.getCmp('images-view'),
            uploadBtn: Ext.getCmp(this.id + '_upload'),
            delBtn: Ext.getCmp(this.id + '_btn_del'),
            tips: Ext.getCmp(this.id + '_num_selected')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.gallery.GridAction.superclass.initEvents.call(me);

        $c.uploadBtn.on('click', me._upload, me);
        $c.grid.on('selectionchange', me._selectionchange, me);
    },

    _selectionchange: function (dv, nodes) {
        var me = this;
        var $c = this.COMPONENTS;

        if (nodes.length === 0) {
            $c.uploadBtn.setDisabled(true);
            $c.tips.setData('');
        } else {
            $c.uploadBtn.enable();
            $c.tips.setData('已选择 ' + nodes.length + ' 张图片');
        }
    },

    //取图库的store
    getStore: function () {
        return this.COMPONENTS.grid.getStore();
    },

    _upload: function () {
        var recs = this.COMPONENTS.grid.getSelectionModel().getSelection();
        var editor = this.editor;
        var imgs = '';

        for (var k in recs) {
            imgs += '<img src="/uploads/' + recs[k].data.download + '"/>';
        }

        editor.exec("inserthtml", { value: imgs });

        this.up().up().destroy();
    }
});

Tomtalk.gallery.Grid = Tomtalk.gallery.GridAction;

//end file