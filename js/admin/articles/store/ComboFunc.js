/*global Ext */

Ext.define("Tiegan.store.ComboFunc", {
    extend: "Ext.data.Store",
    model: "Tiegan.model.ComboFunc",
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