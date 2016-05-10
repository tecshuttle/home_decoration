Ext.onReady(function () {
    new Ext.Viewport({
        renderTo: Ext.getBody(),
        layout: 'fit',
        style: 'padding:10px;background-color: white;',
        items: [
            {
                border: false,
                bodyBorder:false,
                xtype: 'layout-border-doc'
            }
        ]
    });
});

//end file