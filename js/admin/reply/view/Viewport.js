Ext.define("WeiXin.view.Viewport", {
    extend: "Ext.container.Viewport",
    layout: "fit",
    style: 'background-color: white;',
    items: {
        xtype: "replygrid"
    }
});

//end file