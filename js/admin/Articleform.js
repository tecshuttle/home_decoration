Ext.define('MyApp.view.main.Articleform', {
    extend: 'Ext.form.Panel',
    id: 'article_form',
    title: '文章编辑',
    hidden: true,
    xtype: 'articleform',
    frame: false,
    bodyStyle: 'padding: 10px;',
    autoScroll: true,
    //collapsible: true,
    constructor: function (config) {
        var me = this;
        config = Ext.apply({}, config);
        me.COMPONENTS = {};

        MyApp.view.main.Articleform.superclass.constructor.call(me, config);
    },
    initComponent: function () {
        var me = this;

        this.items = [
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
                layout: 'hbox',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '标题',
                        allowBlank: false,
                        flex: 1,
                        margin: '0 10 0 0',
                        name: 'name',
                        emptyText: '请输入…'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'URL短名',
                        flex: 1,
                        name: 'code',
                        emptyText: '请输入…'
                    }
                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        flex: 1,
                        margin: '0 10 0 0',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: '封面图',
                                name: 'cover',
                                flex: 1,
                                emptyText: '直接输入图片URL或上传文件(尺寸107*107)，文件类型：gif | jpg | png'
                            },
                            {
                                xtype: 'filefield',
                                id: 'product_cover',
                                buttonOnly: true,
                                hideLabel: true,
                                width: 100,
                                name: 'product_cover',
                                buttonText: '上传文件'
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'SEO Keywords',
                        flex: 1,
                        name: 'keywords',
                        emptyText: '请输入…'
                    }
                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: '首页推荐',
                        defaultType: 'radiofield',
                        layout: 'hbox',
                        flex: 1,
                        margin: '0 10 0 0',
                        items: [
                            {
                                boxLabel: '是',
                                name: 'is_hot',
                                margin: '0 20 0 0',
                                inputValue: '1'
                            },
                            {
                                boxLabel: '不是',
                                name: 'is_hot',
                                inputValue: '0'
                            }
                        ]

                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '推荐标签',
                        flex: 1,
                        name: 'tag',
                        emptyText: '请输入…'
                    }
                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'datefield',
                        fieldLabel: '生成日期',
                        flex: 1,
                        name: 'ctime',
                        format: 'Y-m-d',
                        margin: '0 10 0 0',
                        value: new Date(),
                        emptyText: '格式: 2015-12-30'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '页面浏览数',
                        flex: 1,
                        name: 'pv',
                        emptyText: '请输入…'
                    }
                ]
            },
            {
                xtype: 'textarea',
                fieldLabel: '简介',
                anchor: '100%',
                name: 'desc',
                emptyText: '请输入…'
            },
            {
                xtype: 'textarea',
                anchor: '100%',
                id: 'kendoeditor',
                height: 500,
                fieldLabel: '内容',
                name: 'content',
                //allowBlank: false,
                emptyText: '请输入…'
            },
            {
                xtype: 'button',
                text: '保存',
                id: this.id + '_save',
                width: 100
            },
            {
                xtype: 'button',
                text: '返回',
                id: this.id + '_return',
                style: 'margin-left: 50px;',
                width: 100
            }
        ];

        MyApp.view.main.Articleform.superclass.initComponent.call(me);
    },
    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Ext.apply(this.COMPONENTS, {
            panelWest: Ext.getCmp('panel_west'),
            typeInfoForm: Ext.getCmp('type_info_form'),
            grid: Ext.getCmp('article_grid'),

            //radioHtml: Ext.getCmp(this.id + 'radio_html'),
            //radioMarkdown: Ext.getCmp(this.id + 'radio_markdown'),
            //editorHtml: Ext.getCmp('editor_html'),
            //editorMarkdown: Ext.getCmp('editor_markdown'),

            kendoeditor: Ext.getCmp('kendoeditor'),

            saveBtn: Ext.getCmp(this.id + '_save'),
            returnBtn: Ext.getCmp(this.id + '_return')
        });

        this.on('boxready', me._afterrender, me);

        //$c.radioHtml.on('change', me._editor_radio, me);

        $c.saveBtn.on('click', me._save, me);
        $c.returnBtn.on('click', me._return, me);
    },

    _afterrender: function () {
        var $c = this.COMPONENTS;

    },

    _return: function () {
        this.getForm().reset();
        this.hide();

        var $c = this.COMPONENTS;

        $c.panelWest.show();
        $c.typeInfoForm.show();
        $c.grid.show();
        $c.grid.getStore().reload();
    },

    _save: function () {
        var me = this;
        var form = me;
        var $c = this.COMPONENTS;

        var type_id = $c.typeInfoForm.getValues().id;

        //从父组件取分类信息，没有则默认分类为0
        if (type_id === 0) {
            Ext.Msg.alert('error', '请选择' + (me.module == 'products' ? '产品' : '文章'), +'分类');
            return false;
        }

        me.down('hidden[name=type_id]').setValue(type_id);

        if (form.isValid()) {
            form.getForm().submit({
                url: '/articles/save',//后台处理的页面
                waitMsg: 'hard work to saving ...',
                submitEmptyText: false,
                success: function (fp, o) {
                    var result = Ext.decode(o.response.responseText);

                    if (result.success) {
                        me._return();
                    } else {
                        alert('See error info by console.');
                        console.log(result);
                    }
                }
            });
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


//end file