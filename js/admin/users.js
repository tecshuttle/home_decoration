Ext.onReady(function () {
    var fields = ['id', 'email', 'password', 'first_name', 'last_name', 'gender', 'tel', 'mobile', 'address', 'company_website'];
    var columns = [
        {
            header: "ID", dataIndex: 'id'
        },
        {
            header: "Email", dataIndex: 'email'
        },
        {
            header: "密码", dataIndex: 'password'
        },
        {
            header: "First Name", dataIndex: 'first_name'
        },
        {
            header: "Last Name", dataIndex: 'last_name'
        },
        {
            header: "性别", dataIndex: 'gender'
        },
        {
            header: "座机电话", dataIndex: 'tel'
        },
        {
            header: "手机", dataIndex: 'mobile'
        },
        {
            header: "地址", dataIndex: 'address'
        },
        {
            header: "公司网址", dataIndex: 'company_website'
        }
    ];

    new Tomtalk.Idc({
        module: 'users',
        fields: fields,
        columns: columns,
        renderTo: Ext.getBody()
    });
});

//end file