Ext.ns('Tomtalk.grid');

Ext.define('Tomtalk.grid.FormUI', {extend: 'Ext.window.Window',
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            title: '后台登入',
            width: 500,
            height: 170,
            autoShow: true,
            closable: false,
            layout: 'fit'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.grid.FormUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;

        me.items = [
            {
                xtype: 'form',
                layout: 'anchor',
                bodyStyle: 'padding: 20px;',
                id: this.id + '_form',
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '用户名',
                        anchor: '100%',
                        name: 'name',
                        emptyText: '请输入…'
                    },
                    {
                        xtype: 'textfield',
                        inputType: 'password',
                        fieldLabel: '密码',
                        anchor: '100%',
                        name: 'password',
                        emptyText: '请输入…'
                    },
                    {
                        xtype: 'button',
                        text: '登入',
                        id: this.id + '_save',
                        style: 'margin-left: 104px;margin-top: 20px;',
                        width: 100
                    }
                ]
            }
        ];

        Tomtalk.grid.FormUI.superclass.initComponent.call(me);
    }
})
;

Ext.define('Tomtalk.grid.FormAction', {extend: 'Tomtalk.grid.FormUI',
    constructor: function (config) {
        Tomtalk.grid.FormAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.grid.FormAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            form: Ext.getCmp(this.id + '_form'),
            saveBtn: Ext.getCmp(this.id + '_save'),
            returnBtn: Ext.getCmp(this.id + '_return')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.grid.FormAction.superclass.initEvents.call(me);

        $c.saveBtn.on('click', me._save, me);
        //$c.returnBtn.on('click', me._return, me);
    },

    _return: function () {
        this.getForm().reset();

        if (this.up()) {
            this.up()._returnFrom();
        }
    },

    _save: function () {
        var me = this;
        var form = this.COMPONENTS.form;

        if (form.isValid()) {
            form.getForm().submit({
                url: '/admin/login2', //后台处理的页面
                submitEmptyText: false,
                success: function (fp, o) {
                    var result = Ext.decode(o.response.responseText);

                    if (result.success) {
                        window.location = '/admin/';
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

Ext.onReady(function () {
    new Tomtalk.grid.Form({
        renderTo: Ext.getBody()
    });
});

//end file