/*global Ext, console */

Ext.define('Tiegan.controller.Articles', {
    extend: 'Ext.app.Controller',
    stores: ['Func', 'ComboFunc', 'Tree'],
    views: ['Viewport', 'func.Tree', 'func.Grid', 'func.Form', 'func.DetailWin'],
    refs: [
        {
            ref: 'grid',
            selector: 'funcgrid'
        }
    ],

    init: function () {
        this.control({
            'viewport > funcgrid': {
                edit: this.edit
            },
            'funcform button[action=search]': {
                click: this.search
            },
            'funcform button[action=filter_reset]': {
                click: this.filter_reset
            }
        });
    },

    search: function (btn) {
        var store = btn.up('form').up().up().down('grid').getStore();
        var proxy = store.getProxy();

        Ext.apply(proxy.extraParams, btn.up("form").up().getValue());

        store.load();
    },

    filter_reset: function (btn) {
        btn.up("form").up().resetValue();

        this.search(btn);
    }
});

//end file