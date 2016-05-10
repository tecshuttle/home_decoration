var articleStore = Ext.create('Ext.data.Store', {
    pageSize: 20,
    fields: ['id', 'name', 'is_draft', 'code', 'desc', 'cover', 'content', 'download', 'is_hot', 'tag', 'mtime', 'ctime', 'keywords', 'picture_gallery'],
    proxy: {
        type: 'ajax',
        url: '/articles/getList',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },
    autoLoad: true
});

Ext.define('MyApp.view.main.Articlegrid', {
    extend: 'Ext.grid.GridPanel',
    id: 'article_grid',
    //title: '文章列表',
    xtype: 'articlegrid',
    plugins: [new Ext.grid.plugin.CellEditing({
        clicksToEdit: 1
    })],
    requires: [],
    COMPONENTS: {},
    frame: false,
    columnLines: true,
    store: articleStore,
    columns: [
        {
            header: "ID", dataIndex: 'id', width: 70
        },
        {
            header: "名称", dataIndex: 'name', width: 400
        },
        {
            header: "首页推荐", dataIndex: 'is_hot',
            renderer: function (v, b, rec) {
                if (v == 0) {
                    return 'NO';
                }

                if (rec.data.tag == null || rec.data.tag.trim() == '') {
                    return '标签未设';
                }

                return rec.data.tag;
            }
        },
        {
            header: '发布状态',
            dataIndex: 'is_draft',
            width: 130,
            renderer: function (v) {
                return (v == '0' ? '发布' : '不发布');
            },
            editor: new Ext.form.field.ComboBox({
                typeAhead: true,
                triggerAction: 'all',
                store: [
                    ['0', '发布'],
                    ['1', '不发布']
                ],
                listeners: {
                    change: function (thisCmb, newValue, oldValue) {
                        console.log(thisCmb.up().up().up().selection.data.id, newValue, oldValue);

                        var id = thisCmb.up().up().up().selection.data.id;

                        $.post("/articles/save", {
                            id: id,
                            is_draft: newValue
                        }, function (result) {
                            //console.log(result);
                        }, 'json');

                        thisCmb.up().up().up().getStore().reload();

                    }
                }
            })
        },
        {
            header: "简介", dataIndex: 'desc', hidden: true
        },
        {
            header: "SEO Keywords", dataIndex: 'keywords', hidden: true
        },
        {
            header: "封面图片", dataIndex: 'cover', hidden: true
        },
        {
            header: "生成时间", dataIndex: 'ctime',
            renderer: function (v) {
                var date = new Date(v * 1000);
                return moment(date).format('YYYY-MM-DD');
            }
        },
        {
            header: "最后编辑时间", dataIndex: 'mtime',
            renderer: function (v) {
                var date = new Date(v * 1000);
                return moment(date).format('YYYY-MM-DD');
            }
        },
        {
            header: "操作",
            dataIndex: 'id',
            xtype: 'actioncolumn',
            name: 'opertation',
            menuDisabled: true,
            sortable: false,
            width: 130,
            items: [
                {
                    glyph: '编辑',
                    handler: function (grid, rowIndex, colIndex) {
                        var record = grid.getStore().getAt(rowIndex);
                        grid.up()._edit(record); //alert("Terminate " + rec.get('title'));
                    }
                },
                {
                    glyph: '删除',
                    handler: function (grid, rowIndex, colIndex) {
                        var record = grid.getStore().getAt(rowIndex);

                        Ext.MessageBox.confirm('操作', '真的要删除文件吗?', function (btn, text) {
                            if (btn === 'yes') {
                                grid.up()._delete(record.get('id'));
                            }
                        }, this);
                    }
                }
            ]
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: articleStore,
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
    },
    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;


        Ext.apply(this.COMPONENTS, {
            typeTree: Ext.getCmp('type_tree'),
            panelWest: Ext.getCmp('panel_west'),
            typeInfoForm: Ext.getCmp('type_info_form'),
            articleForm: Ext.getCmp('article_form'),
            grid: Ext.getCmp('article_grid')
        });

        /*
         $c.saveBtn.on('click', me._saveTypeInfo, me);
         $c.addBtn.on('click', me._showArticleForm, me);
         */
    },

    _showArticleForm: function () {
        var $c = this.COMPONENTS;

        $c.grid.hide();
        $c.panelWest.hide();
        $c.typeInfoForm.hide();
        $c.articleForm.show();
    },


    _edit: function (record) {
        var me = this;
        var form = this.COMPONENTS.articleForm.getForm();

        me._showArticleForm();

        record.data.ctime = new Date(record.data.ctime * 1000);
        record.data.content_markdown = record.data.content;
        form.setValues(record.data);

        var $c = this.COMPONENTS;
        var KE = $c.typeInfoForm.KE;

        if (KE) {
            KE.data("kendoEditor").value(record.data.content);
        } else {
            $c.typeInfoForm.KE = $("#kendoeditor-inputEl").kendoEditor(ke_config);
        }
    },

    _delete: function (id) {
        var me = this;

        Ext.Ajax.request({
            url: '/articles/delete',
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

//end file