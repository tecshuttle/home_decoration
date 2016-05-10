/*global Ext */

Ext.define("Log.store.Func", {
    extend: "Ext.data.Store",
    model: "Log.model.Func",
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