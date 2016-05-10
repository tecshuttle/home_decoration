/*global Ext */

Ext.define("Log.store.ComboFunc", {
    extend: "Ext.data.Store",
    model: "Log.model.ComboFunc",
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/admin_api/getFuncName',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});


//end file