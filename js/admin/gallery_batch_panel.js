Ext.ns('Tomtalk.gallery');

Ext.define('Tomtalk.gallery.BatchUI', {extend: 'Ext.form.Panel',
    layout: 'vbox',
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            title: '批量上传图片',
            bodyStyle: 'padding:10px;'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.gallery.BatchUI.superclass.constructor.call(me, config);
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
                html: '<input id="fileupload" type="file" name="files[]" data-url="/gallery/batch_submit" multiple>'
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

        Tomtalk.gallery.BatchUI.superclass.initComponent.call(me);
    }
});

Ext.define('Tomtalk.gallery.BatchAction', {extend: 'Tomtalk.gallery.BatchUI',
    constructor: function (config) {
        Tomtalk.gallery.BatchAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.gallery.BatchAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            returnBtn: Ext.getCmp(this.id + '_return')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.gallery.BatchAction.superclass.initEvents.call(me);
        $c.returnBtn.on('click', me._return, me);
    },

    _return: function () {
        //重置面板显示
        $('#uploads_msg').html('');
        $('#progress .bar').css('width', '0%');

        this.getForm().reset();
        this.hide();

        if (this.up().up()) {
            this.up().up()._returnFrom('galleryForm');
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

Tomtalk.gallery.Batch = Tomtalk.gallery.BatchAction;

//end file