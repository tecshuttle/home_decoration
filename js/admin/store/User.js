/*global Ext */

Ext.define("WeiXin.store.User", {
    extend: "Ext.data.Store",
    model: "WeiXin.model.User",
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/admin/getWeixinList',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});


//end file