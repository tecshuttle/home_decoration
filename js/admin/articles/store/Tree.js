/*global Ext */

Ext.define("Tiegan.store.Tree", {
    extend: "Ext.data.TreeStore",
    model: "Tiegan.model.Tree",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/admin/articles_tree',
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