Ext.onReady(function () {

    var fields = ['id', 'surname', 'name', 'job_title', 'company', 'tel', 'email'];
    var columns = [
        {
            header: "ID", dataIndex: 'id'
        },
        {
            header: "Surname", dataIndex: 'surname'
        },
        {
            header: "Name", dataIndex: 'name'
        },
        {
            header: "Job Title", dataIndex: 'job_title'
        },
        {
            header: "Company", dataIndex: 'company'
        },
        {
            header: "Tel", dataIndex: 'tel'
        },
        {
            header: "Email", dataIndex: 'email'
        }
    ];

    new Tomtalk.Idc({
        module: 'subscriptions',
        fields: fields,
        columns: columns,
        renderTo: Ext.getBody()
    });
});

//end file