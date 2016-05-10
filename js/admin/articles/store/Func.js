/*global Ext */

Ext.define("Tiegan.store.Func", {
    extend: "Ext.data.Store",
    model: "Tiegan.model.Func",
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/admin_api/getFuncLog',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});


//end file