/*global Ext */

Ext.define("WeiXin.store.Menu", {
    extend: "Ext.data.TreeStore",
    model: "WeiXin.model.Menu",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/admin/getMenuData',
        reader: {
            type: 'json'
        }
    },
    root: {
        text: '菜单',
        id: 'root',
        expanded: true
    }
});

//end file