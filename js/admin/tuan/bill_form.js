Ext.ns('Tomtalk');

Ext.define('Tomtalk.FormUI', {
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

        Tomtalk.FormUI.superclass.constructor.call(me, config);
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


        Tomtalk.FormUI.superclass.initComponent.call(me);
    }
});

Ext.define('Tomtalk.FormAction', {
    extend: 'Tomtalk.FormUI',
    constructor: function (config) {
        Tomtalk.FormAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.FormAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            saveBtn: Ext.getCmp(this.id + '_save'),
            returnBtn: Ext.getCmp(this.id + '_return')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.FormAction.superclass.initEvents.call(me);

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
                url: '/admin/save',//后台处理的页面
                submitEmptyText: false,
                params: {
                    module: me.up().module
                },
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

Tomtalk.Form = Tomtalk.FormAction;

//end file