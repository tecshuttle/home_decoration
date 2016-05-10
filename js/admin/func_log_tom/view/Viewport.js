Ext.define("Log.view.Viewport", {
    extend: "Ext.container.Viewport",
    layout: 'fit',
    style: 'background-color: white;',
    items: {
        xtype: "container",
        items: [
            {
                xtype: 'funcform'
            },
            {
                xtype: 'funcgrid'
            }
        ]
    }
});

//end file