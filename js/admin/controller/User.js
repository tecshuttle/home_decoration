/*global Ext, console */

Ext.define('WeiXin.controller.User', {
    extend: 'Ext.app.Controller',
    stores: ['User'],
    models: ['User'],
    views: ['Viewport', 'user.List', 'user.Edit'],
    refs: [
        {
            ref: 'grid',
            selector: 'userlist'
        }
    ],

    init: function () {
        this.control({
            'viewport > userlist': {
                edit: this.edit,
                remove: this.remove
            },
            'userlist button[action=add]': {
                click: this.add
            },
            'useredit button[action=save]': {
                click: this.save
            }
        });
    },

    add: function (grid, record) {
        var win = Ext.widget("useredit");
        win.show();
    },

    edit: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        var win = Ext.widget("useredit");
        win.down("form").loadRecord(rec);
        win.show();
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
            data = form.getValues(),
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