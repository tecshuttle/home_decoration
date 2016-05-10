Ext.ns('Tomtalk.grid');

var scroll_img_store = Ext.create('Ext.data.Store', {
    fields: ['type_id', 'name'],
    data: [
        [0, '首页'],
        [225, '荣归'],
        [223, '旅行那些事儿'],
        [227, '天下足球'],
        [233, '我是铁杆']
    ]
});

Ext.define('Tomtalk.grid.FormUI', {
    extend: 'Ext.form.Panel',
    autoScroll: true,
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            title: '编辑',
            bodyStyle: 'padding:10px;',
            layout: 'anchor'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.grid.FormUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;

        if (me.module === 'tag') {
            me.items = [
                {
                    xtype: 'hiddenfield',
                    name: 'id',
                    value: 0
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '主题名称',
                    anchor: '50%',
                    name: 'name',
                    emptyText: '请输入…'
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: '显示顺序',
                    anchor: '50%',
                    name: 'order',
                    emptyText: '请输入…'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '说明',
                    anchor: '50%',
                    name: 'desc',
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
        } else if (me.module === 'scroll_img') {
            me.items = [
                {
                    xtype: 'hiddenfield',
                    name: 'id',
                    value: 0
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '名称',
                            flex: 1,
                            margin: '0 10 0 0',
                            name: 'name',
                            emptyText: '请输入…'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '所属模块',
                            flex: 1,
                            name: 'type_id',
                            emptyText: '请输入…',
                            displayField: 'name',
                            valueField: 'type_id',
                            store: scroll_img_store,
                            minChars: 0,
                            queryMode: 'local',
                            typeAhead: true
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
                                    fieldLabel: '图片',
                                    name: 'img',
                                    flex: 1,
                                    emptyText: '示例: /uploads/14201863264972.jpg'
                                },
                                {
                                    xtype: 'filefield',
                                    buttonOnly: true,
                                    hideLabel: true,
                                    width: 74,
                                    name: 'file_img',
                                    buttonText: '上传文件'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '跳转URL',
                            flex: 1,
                            name: 'url',
                            emptyText: '请输入…'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: '显示顺序',
                            flex: 1,
                            name: 'order',
                            margin: '0 10 0 0',
                            emptyText: '请输入…'
                        },
                        {
                            xtype: 'displayfield',
                            flex: 1,
                            value: ''
                        }
                    ]
                },
                {
                    xtype: 'textarea',
                    fieldLabel: '文字说明',
                    anchor: '100%',
                    name: 'desc',
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
        } else {
            me.items = [
                {
                    xtype: 'hiddenfield',
                    name: 'id',
                    value: 0
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '名称',
                            flex: 1,
                            name: 'name',
                            margin: '0 10 0 0',
                            emptyText: '请输入…'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '说明',
                            flex: 1,
                            name: 'desc',
                            emptyText: '请输入…'
                        }
                    ]
                },
                {
                    xtype: 'textarea',
                    fieldLabel: '内容',
                    anchor: '100%',
                    id: 'kendoeditor',
                    height: 600,
                    name: 'value',
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
        }


        Tomtalk.grid.FormUI.superclass.initComponent.call(me);
    }
});

Ext.define('Tomtalk.grid.FormAction', {
    extend: 'Tomtalk.grid.FormUI',
    constructor: function (config) {
        Tomtalk.grid.FormAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.grid.FormAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            saveBtn: Ext.getCmp(this.id + '_save'),
            returnBtn: Ext.getCmp(this.id + '_return')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.grid.FormAction.superclass.initEvents.call(me);

        $c.saveBtn.on('click', me._save, me);
        $c.returnBtn.on('click', me._return, me);
    },

    _return: function () {
        this.getForm().reset();

        if (this.up()) {
            this.up()._returnFrom();
        }
    },

    _save: function () {
        var me = this;
        var form = me;

        if (form.isValid()) {
            form.getForm().submit({
                url: '/' + me.up().module + '/save',//后台处理的页面
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

Tomtalk.grid.Form = Tomtalk.grid.FormAction;

//end file