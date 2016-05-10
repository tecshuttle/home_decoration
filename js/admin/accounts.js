Ext.onReady(function () {
    var fields = ['id', 'name', 'password'];
    var columns = [
        {
            header: "ID", dataIndex: 'id', hidden: true
        },
        {
            header: "登入名", dataIndex: 'name'
        },
        {
            header: "密码", dataIndex: 'password'
        }
    ];


    new Ext.Viewport({
        renderTo: Ext.getBody(),
        layout: 'fit',
        style: 'background-color: white;',
        items: [
            new Tomtalk.Idc({
                module: 'admins',
                fields: fields,
                columns: columns
            })
        ]
    });
});

//end file