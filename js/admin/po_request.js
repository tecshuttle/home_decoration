Ext.onReady(function () {

    var fields = ['id', 'email', 'name', 'desc', 'date', 'no', 'pn', 'qty', 'delivery_date', 'remarks'];
    var columns = [
        {
            header: "ID", dataIndex: 'id'
        },
        {
            header: "Name", dataIndex: 'name'
        },
        {
            header: "Description", dataIndex: 'desc'
        },
        {
            header: "Date", dataIndex: 'date'
        },
        {
            header: "No", dataIndex: 'no'
        },
        {
            header: "Email", dataIndex: 'email'
        },
        {
            header: "PN", dataIndex: 'pn'
        },
        {
            header: "Qty", dataIndex: 'qty'
        },
        {
            header: "Delivery Date", dataIndex: 'delivery_date'
        },
        {
            header: "Remarks", dataIndex: 'remarks'
        }
    ];

    new Tomtalk.Idc({
        module: 'po_request',
        fields: fields,
        columns: columns,
        renderTo: Ext.getBody()
    });
});

//end file