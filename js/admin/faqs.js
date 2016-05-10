Ext.onReady(function () {

    var fields = ['id', 'name', 'job_title', 'company', 'tel', 'email','question'];
    var columns = [
        {
            header: "ID", dataIndex: 'id'
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
        },
        {
            header: "Question", dataIndex: 'question'
        }
    ];

    new Tomtalk.Idc({
        module: 'faqs',
        fields: fields,
        columns: columns,
        renderTo: Ext.getBody()
    });
});