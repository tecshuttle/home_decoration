Ext.define('MyApp.overrides.grid.column.Action', {
    override: 'Ext.grid.column.Action',

    // overridden to implement
    defaultRenderer: function (v, meta, record, rowIdx, colIdx, store, view) {
        var me = this,
            prefix = Ext.baseCSSPrefix,
            scope = me.origScope || me,
            items = me.items,
            len = items.length,
            i = 0,
            item, ret, disabled, tooltip, glyph, glyphParts, glyphFontFamily;

        // Allow a configured renderer to create initial value (And set the other values in the "metadata" argument!)
        // Assign a new variable here, since if we modify "v" it will also modify the arguments collection, meaning
        // we will pass an incorrect value to getClass/getTip
        ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';

        meta.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';
        for (; i < len; i++) {
            item = items[i];

            disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || scope, view, rowIdx, colIdx, item, record) : false);
            tooltip = disabled ? null : (item.tooltip || (item.getTip ? item.getTip.apply(item.scope || scope, arguments) : null));
            glyph = item.glyph;

            // Only process the item action setup once.
            if (!item.hasActionConfiguration) {

                // Apply our documented default to all items
                item.stopSelection = me.stopSelection;
                item.disable = Ext.Function.bind(me.disableAction, me, [i], 0);
                item.enable = Ext.Function.bind(me.enableAction, me, [i], 0);
                item.hasActionConfiguration = true;
            }

            if (glyph) {
                if (typeof glyph === 'string') {
                    glyphParts = glyph.split('@');
                    glyph = glyphParts[0];
                    glyphFontFamily = glyphParts[1];
                } else {
                    glyphFontFamily = Ext._glyphFontFamily;
                }

                /*
                 ret += '<span role="button" title="' + (item.altText || me.altText) + '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-glyph ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
                 ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
                 ' style="font-family:' + glyphFontFamily + '"' +
                 (tooltip ? ' data-qtip="' + tooltip + '"' : '') + '>&#' + glyph + ';</span>';
                 */

                ret += '<span role="button" title="' + (item.altText || me.altText) + '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-glyph ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
                    ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
                    (tooltip ? ' data-qtip="' + tooltip + '"' : '') + '>' + glyph + '</span>';
            } else {
                ret += '<img role="button" alt="' + (item.altText || me.altText) + '" src="' + (item.icon || Ext.BLANK_IMAGE_URL) +
                    '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
                    ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
                    (tooltip ? ' data-qtip="' + tooltip + '"' : '') + ' />';
            }
        }
        return ret;
    }
});


Ext.ns('Color.admin');

/*  END 器材编辑表单  */


/*  START 器材列表  */

var store = Ext.create('Ext.data.Store', {
    pageSize: 20,
    fields: [
        'id', 'type_id', 'code', 'name', 'desc', 'order',
        'relative', 'cover', 'content', 'download', 'is_hot',
        'ctime', 'keywords', 'picture_gallery'
    ],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/equipments/getList',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});

Ext.define('Color.admin.GridUI', {
    extend: 'Ext.grid.GridPanel',
    id: this.id + '_gridList',
    //title: '产品列表',
    columnLines: true,
    ke: {
        service_list: false,
        schedule: false,
        seat_position: false,
        hotel_condition: false,
        trip_recommend: false
    },
    store: store,
    COMPONENTS: {},
    initComponent: function () {
        var me = this;

        me.columns = [
            {
                header: "ID", dataIndex: 'id', hidden: true
            },
            {
                header: "显示顺序", dataIndex: 'order', width: 80
            },
            {
                header: "类型", dataIndex: 'type_id', width: 80,
                renderer: function (v) {
                    return (v == 0 ? '球队' : '出游团');
                }
            },
            {
                header: "产品名称", dataIndex: 'name', width: 350
            },
            {
                header: "规格数", dataIndex: 'classes', hidden: true
            },
            {
                header: "总库存数", dataIndex: 'stock', hidden: true,
                renderer: function (v) {
                    return (v == null ? 0 : v);
                }
            },
            {
                header: "最后编辑时间", dataIndex: 'mtime', width: 150,
                renderer: function (v) {
                    var date = new Date(v * 1000);
                    return moment(date).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                header: "操作",
                dataIndex: 'id',
                align: 'center',
                width: 170,
                xtype: 'actioncolumn',
                name: 'opertation',
                items: [
                    {
                        glyph: '编辑',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            me._edit(record);
                        }
                    },
                    {
                        glyph: '图库',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            me._gallery(record);
                        }
                    },
                    {
                        glyph: '规格',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            me._editSize(record);
                        }
                    },
                    {
                        glyph: '删除',
                        handler: function (grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);

                            Ext.MessageBox.confirm('操作', '真的要删除产品吗?', function (btn, text) {
                                if (btn === 'yes') {
                                    me._delete(record.get('id'));
                                }
                            }, this);
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
                        text: '新增球队',
                        id: this.id + '_add'
                    },
                    {
                        text: '新增出游团',
                        id: this.id + '_add_tour'
                    }
                ]
            }
        ];

        Color.admin.GridUI.superclass.initComponent.call(me);
    },

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


Ext.define('Color.admin.GridAction', {
    extend: 'Color.admin.GridUI',
    constructor: function (config) {
        Color.admin.GridAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Color.admin.GridAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            addBtn: Ext.getCmp(this.id + '_add'),
            addTourBtn: Ext.getCmp(this.id + '_add_tour')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Color.admin.GridAction.superclass.initEvents.call(me);

        $c.addBtn.on('click', me._showForm, me);
        $c.addTourBtn.on('click', me._showTourForm, me);
    },

    _showForm: function () {
        var me = this;
        var $c = me.up().up().COMPONENTS;

        $c.grid.hide();
        $c.productForm.show();
        $c.productForm._switch_panel('team');

        me._set_ke_config();
    },

    _showTourForm: function () {
        var me = this;
        var $c = me.up().up().COMPONENTS;

        $c.grid.hide();
        $c.productForm.show();
        $c.productForm._switch_panel('tour');

        me._set_ke_config();
    },

    _set_ke_config: function () {
        var me = this;

        if (me.ke.service_list) {
            me.ke.service_list.data("kendoEditor").value('');
        } else {
            me.ke.service_list = $("#service_list-inputEl").kendoEditor(ke_config);
        }

        if (me.ke.seat_position) {
            me.ke.seat_position.data("kendoEditor").value('');
        } else {
            me.ke.seat_position = $("#seat_position-inputEl").kendoEditor(ke_config);
        }

        if (me.ke.schedule) {
            me.ke.schedule.data("kendoEditor").value('');
        } else {
            me.ke.schedule = $("#schedule-inputEl").kendoEditor(ke_config);
        }

        if (me.ke.hotel_condition) {
            me.ke.hotel_condition.data("kendoEditor").value('');
        } else {
            me.ke.hotel_condition = $("#hotel_condition-inputEl").kendoEditor(ke_config);
        }

        if (me.ke.trip_recommend) {
            me.ke.trip_recommend.data("kendoEditor").value('');
        } else {
            me.ke.trip_recommend = $("#trip_recommend-inputEl").kendoEditor(ke_config);
        }
    },

    _edit: function (record) {
        var me = this;
        var productForm = me.up().up().COMPONENTS.productForm;
        var form = me.up().up().COMPONENTS.productForm.getForm();

        me._showForm();

        record.data['tag_id[]'] = record.data.tag_id.split(','); //给tag赋值，转一下格式

        if (record.data.type_id == 0) {
            productForm._switch_panel('team');
        } else {
            productForm._switch_panel('tour');
        }

        form.setValues(record.data);

        if (me.ke.service_list) {
            me.ke.service_list.data("kendoEditor").value(record.data.service_list);
        } else {
            ke_config.value = record.data.service_list;
            me.ke.service_list = $("#service_list-inputEl").kendoEditor(ke_config);
        }

        if (me.ke.schedule) {
            me.ke.schedule.data("kendoEditor").value(record.data.schedule);
        } else {
            ke_config.value = record.data.schedule;
            me.ke.schedule = $("#schedule-inputEl").kendoEditor(ke_config);
        }

        if (me.ke.seat_position) {
            me.ke.seat_position.data("kendoEditor").value(record.data.seat_position);
        } else {
            ke_config.value = record.data.seat_position;
            me.ke.seat_position = $("#seat_position-inputEl").kendoEditor(ke_config);
        }

        if (me.ke.hotel_condition) {
            me.ke.hotel_condition.data("kendoEditor").value(record.data.hotel_condition);
        } else {
            ke_config.value = record.data.hotel_condition;
            me.ke.hotel_condition = $("#hotel_condition-inputEl").kendoEditor(ke_config);
        }

        if (me.ke.trip_recommend) {
            me.ke.trip_recommend.data("kendoEditor").value(record.data.trip_recommend);
        } else {
            ke_config.value = record.data.trip_recommend;
            me.ke.trip_recommend = $("#trip_recommend-inputEl").kendoEditor(ke_config);
        }
    },

    _editSize: function (record) {
        var me = this;
        me._showSizeGrid(record.id);
    },

    _gallery: function (record) {
        var win = new Tomtalk.equipments.Gallery({
            title: '产品图库',
            width: 955,
            height: 600,
            product_id: record.id,
            modal: true
        });

        win.show();
    },

    _showSizeForm: function () {
        var me = this;
        var $c = me.up().up().COMPONENTS;

        $c.grid.hide();
        $c.sizeForm.show();
    },

    _showSizeGrid: function (pid) {
        var me = this;
        var $c = me.up().up().COMPONENTS;

        $c.grid.hide();
        $c.sizeGrid.show();

        //加载产品规格
        var proxy = $c.sizeGrid.getStore().getProxy();
        proxy.extraParams['pid'] = pid;

        $c.sizeGrid.getStore().reload();
    },

    _delete: function (id) {
        var me = this;

        Ext.Ajax.request({
            url: '/equipments/delete',
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

Color.admin.Grid = Color.admin.GridAction;

/*  END 器材列表  */


Color.ViewportUI = Ext.extend(Ext.Viewport, {
    style: 'padding:10px;background-color: white;',
    COMPONENTS: {},
    layout: 'fit',
    initComponent: function () {
        var me = this;
        me.items = [
            me._centerPanel()
        ];

        Color.ViewportUI.superclass.initComponent.call(me);
    },

    _centerPanel: function () {
        return Ext.create('Ext.panel.Panel', {
            autoScroll: true,
            border: false,
            //layout: 'fit',
            items: [
                this._productForm(),
                this._gridList(),
                this._sizeForm(),
                this._sizeGrid()
            ]
        });
    },

    _gridList: function () {
        var grid = Ext.create('Color.admin.Grid');
        this.COMPONENTS.grid = grid;

        return grid;
    },

    _productForm: function () {
        var form = Ext.create('Color.admin.EditForm', {
            hidden: true
        });

        this.COMPONENTS.productForm = form;

        return form;
    },

    _sizeGrid: function () {
        var grid = Ext.create('Color.admin.SizeGrid', {
            hidden: true
        });

        this.COMPONENTS.sizeGrid = grid;

        return grid;
    },

    _sizeForm: function () {
        var form = Ext.create('Color.admin.SizeForm', {
            hidden: true
        });

        this.COMPONENTS.sizeForm = form;

        return form;
    }
});

Color.ViewportAction = Ext.extend(Color.ViewportUI, {
    constructor: function (config) {
        Color.ViewportAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Color.ViewportAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            //addBtn: Ext.getCmp(this.id + '_add'),
            //saveBtn: Ext.getCmp(this.id + '_save'),
            //grid: Ext.getCmp(this.id + '_gridList'),
            //btnProductForm: Ext.getCmp(this.id + '_btn_product_form')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Color.ViewportAction.superclass.initEvents.call(me);

        //$c.addBtn.on('click', me._showProductForm, me);
    },

    _afterrender: function () {
        var $c = this.COMPONENTS;
    },


    _returnGrid: function () {
        var $c = this.COMPONENTS;

        $c.grid.show();
        $c.productForm.hide();
    },

    _returnFrom: function () {
        var $c = this.COMPONENTS;

        $c.productForm.hide();
        $c.grid.show();
        $c.grid.getStore().reload();
    },

    _reset: function () {
        this.COMPONENTS.addForm.getForm().reset();
    }
});

Color.Viewport = Color.ViewportAction;

Ext.onReady(function () {
    new Color.Viewport({
        renderTo: Ext.getBody()
    });
});

//end file