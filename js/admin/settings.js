Ext.onReady(function () {
    var fields = ['id', 'name', 'desc', 'value'];
    var columns = [
        {
            header: "ID", dataIndex: 'id', hidden: true
        },
        {
            header: "名称", dataIndex: 'name'
        },
        {
            header: "说明", dataIndex: 'desc'
        },
        {
            header: "内容", dataIndex: 'value',
            renderer: function (v) {
                if (v.length > 40) {
                    return '内容过多，不显示。';
                } else {
                    return v;
                }
            }
        }
    ];


    new Ext.Viewport({
        renderTo: Ext.getBody(),
        layout: 'fit',
        style: 'background-color: white;',
        items: [
            new Tomtalk.Idc({
                module: 'site_settings',
                fields: fields,
                columns: columns
            })
        ]
    });
});

//end file