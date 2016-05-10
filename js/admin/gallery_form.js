Ext.ns('Tomtalk.gallery');

Ext.define('Tomtalk.gallery.EditFormUI', {extend: 'Ext.form.Panel',
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            title: '图片编辑',
            bodyStyle: 'padding:10px;',
            layout: 'anchor'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.gallery.EditFormUI.superclass.constructor.call(me, config);
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
                xtype: 'displayfield',
                fieldLabel: '图片URL',
                anchor: '50%',
                name: 'download',
                renderer: function (v) {
                    return 'http://' + window.location.host + '/uploads/' + v;
                }
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: '标题',
                anchor: '100%',
                layout: 'hbox',
                style: 'margin-bottom:5px;',
                items: [
                    {
                        xtype: 'textfield',
                        hideLabel: true,
                        allowBlank: false,
                        width: '50%',
                        name: 'name',
                        emptyText: '请输入…'
                    },
                    {
                        xtype: 'button',
                        text: '保存',
                        style: 'margin-left: 30px;',
                        id: this.id + '_save',
                        width: 70
                    },
                    {
                        xtype: 'button',
                        text: '返回',
                        id: this.id + '_return',
                        style: 'margin-left: 30px;',
                        width: 70
                    },
                    {
                        xtype: 'button',
                        text: '删除',
                        id: this.id + '_delete',
                        style: 'margin-left: 30px;',
                        width: 70
                    }
                ]
            },
            {
                xtype: 'datefield',
                fieldLabel: '生成时间',
                anchor: '50%',
                name: 'ctime',
                format: 'Y-m-d',
                value: new Date(),
                emptyText: '请输入…'
            },
            {
                xtype: 'filefield',
                fieldLabel: '上传图片',
                id: 'file',
                anchor: '50%',
                name: 'userfile',
                emptyText: 'Select a file',
                buttonText: 'file'
            },
            {
                xtype: 'textarea',
                fieldLabel: '简介',
                anchor: '50%',
                name: 'desc',
                emptyText: '请输入…'
            }
        ]
        ;

        Tomtalk.gallery.EditFormUI.superclass.initComponent.call(me);
    }
});

Ext.define('Tomtalk.gallery.EditFormAction', {extend: 'Tomtalk.gallery.EditFormUI',
    constructor: function (config) {
        Tomtalk.gallery.EditFormAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.gallery.EditFormAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            saveBtn: Ext.getCmp(this.id + '_save'),
            returnBtn: Ext.getCmp(this.id + '_return'),
            deleteBtn: Ext.getCmp(this.id + '_delete')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.gallery.EditFormAction.superclass.initEvents.call(me);

        $c.saveBtn.on('click', me._save, me);
        $c.returnBtn.on('click', me._return, me);
        $c.deleteBtn.on('click', me._delete, me);
    },

    _return: function () {
        this.getForm().reset();

        if (this.up().up()) {
            this.up().up()._returnFrom('galleryForm');
        }
    },

    _save: function () {
        var me = this;
        var form = me;

        var type_id = me.up().up().COMPONENTS.typeInfoForm.getValues().id;

        //从父组件取分类信息，没有则默认分类为0
        if (type_id === 0) {
            Ext.Msg.alert('error', '请选择图片分类');
            return false;
        }

        me.down('hidden[name=type_id]').setValue(type_id);

        if (form.isValid()) {
            form.getForm().submit({
                url: '/' + me.up().up().module + '/save',//后台处理的页面
                waitMsg: 'Uploading your photo...',
                submitEmptyText: false,
                success: function (fp, o) {
                    //console.log(res);

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

    _delete: function () {
        var me = this;
        var form = me;

        var id = me.down('hidden[name=id]').getValue();

        Ext.Ajax.request({
            url: '/' + me.module + '/delete',
            params: {
                id: id
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);

                me._return();
            }
        });
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

Tomtalk.gallery.EditForm = Tomtalk.gallery.EditFormAction;

//end file