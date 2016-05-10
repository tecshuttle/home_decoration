Ext.onReady(function () {
    var fields = ['id', 'name', 'order', 'desc', 'mtime'];
    var columns = [
        {
            header: "显示顺序", dataIndex: 'order'
        },
        {
            header: "主题名称", dataIndex: 'name'
        },
        {
            header: "说明", dataIndex: 'desc'
        },
        {
            header: "最后修改时间", dataIndex: 'mtime',
            renderer: function (v) {
                var date = new Date(v * 1000);
                return moment(date).format('YYYY-MM-DD');
            }
        }
    ];


    new Ext.Viewport({
        renderTo: Ext.getBody(),
        layout: 'fit',
        style: 'background-color: white;',
        items: [
            new Tomtalk.Idc({
                module: 'tag',
                fields: fields,
                columns: columns
            })
        ]
    });
});

//end file