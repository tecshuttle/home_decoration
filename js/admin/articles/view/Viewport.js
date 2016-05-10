Ext.define("Tiegan.view.Viewport", {
    extend: "Ext.Viewport",
    layout: 'border',
    style: 'background-color: white;',
    items: [
        {
            xtype: 'typetree'
        },
        {
            xtype: 'funcgrid'
        }
    ]
});

//end file