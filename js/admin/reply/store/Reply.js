/*global Ext */

Ext.define("WeiXin.store.Reply", {
    extend: "Ext.data.Store",
    model: "WeiXin.model.Reply",
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/admin/getWeixinAutoReplyList',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});


//end file