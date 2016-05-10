/*global Ext, console */

Ext.define('WeiXin.controller.Reply', {
    extend: 'Ext.app.Controller',
    stores: ['Reply'],
    models: ['Reply'],
    views: ['Viewport', 'reply.Grid', 'reply.Form'],
    refs: [
        {
            ref: 'grid',
            selector: 'replygrid'
        }
    ],

    init: function () {
        this.control({
            'viewport > replygrid': {
                edit: this.edit,
                remove: this.remove
            },
            'replygrid button[action=add]': {
                click: this.add
            },
            'replyform button[action=save]': {
                click: this.save
            },
            'replyform radiogroup[action=ReceiveMsg]': {
                change: this.onReceiveMsgType
            },
            'replyform radiogroup[action=ReplyMsg]': {
                change: this.onReplyMsgType
            }
        });
    },

    add: function (grid, record) {
        var win = Ext.widget("replyform");
        win.show();
    },

    edit: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        var win = Ext.widget("replyform");
        win.down("form").loadRecord(rec);
        win.setValue(rec.data);
        win.show();
    },
    onReceiveMsgType: function (radio, newValue, oldValue, eOpts) {
        var keyword = radio.up().down('textfield[action=keyword]');
        var event_name = radio.up().down('textfield[action=event_name]');
        var event_key = radio.up().down('textfield[action=event_key]');

        if (newValue.ReceiveMsgType === 'txt') {
            keyword.show();
            event_name.hide();
            event_key.hide();
        }

        if (newValue.ReceiveMsgType === 'event') {
            keyword.hide();
            event_name.show();
            event_key.show();
        }
    },

    onReplyMsgType: function (radio, newValue, oldValue, eOpts) {
        var txt_content = radio.up().down('textfield[action=txt_content]');
        var articles_content = radio.up().down('textarea[action=articles_content]');

        if (newValue.ReplyMsgType === 'txt') {
            articles_content.hide();
            txt_content.show();
        }

        if (newValue.ReplyMsgType === 'articles') {
            txt_content.hide();
            articles_content.show();
        }
    },

    remove: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Ajax.request({
            url: '/admin/weixin_remove',
            params: {
                ID: rec.get('ID')
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);

                if (result.success) {
                    grid.getStore().reload();
                } else {
                    console.log(result);
                }
            }
        });
    },

    save: function (btn) {
        var win = btn.up("window"),
            form = win.down("form"),
            data = win.getValue(),
            grid = this.getGrid();


        if (!form.isValid()) {
            return false;
        }

        if (data.ID === '0') {
            delete data.ID;
        }

        win.close();

        Ext.Ajax.request({
            url: '/admin/weixin_save',
            params: data,
            success: function (res) {
                var result = Ext.decode(res.responseText);

                if (result.success) {
                    grid.getStore().reload();
                } else {
                    console.log(result);
                }
            }
        });
    }
});

//end file