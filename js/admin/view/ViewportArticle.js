Ext.define("Tiegan.view.ViewportArticle", {
    extend: "Ext.container.Viewport",
    layout: "fit",
    style: 'background-color: white;',
    items: {
        xtype: "articlelist"
    }
});

//end file