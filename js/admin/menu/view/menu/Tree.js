/*global Ext, console */

Ext.define("WeiXin.view.menu.Tree", {
    extend: "Ext.tree.Panel",
    alias: "widget.menutree",
    region: 'west',
    width: 300,
    margin: '10, 20, 10, 10',
    rootVisible: true,
    useArrows: true,
    store: 'Menu',
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop'
        }
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            action: 'toolbar',
            border: false,
            frame: false,
            dock: 'top',
            //disabled: true,
            items: [
                {
                    text: '添加下级',
                    disabled: true,
                    action: 'add_children'
                },
                {
                    text: '删除',
                    disabled: true,
                    action: 'delete'
                },
                {
                    text: '更新微信菜单',
                    action: 'update'
                }
            ]
        }
    ]
});


//end file