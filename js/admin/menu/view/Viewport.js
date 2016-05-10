Ext.define("WeiXin.view.Viewport", {
    extend: "Ext.Viewport",
    layout: "border",
    style: 'background-color: white;',
    items: [
        {
            xtype: 'menutree'
        },
        {
            xtype: "menuform"
        }
    ]
});

//end file