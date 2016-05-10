Ext.onReady(function () {

    var fields = ['id', 'email', 'name', 'desc', 'date', 'no', 'po', 'pn', 'qty', 'price', 'delivery_date', 'remarks'];
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
            header: "PO", dataIndex: 'po'
        },
        {
            header: "PN", dataIndex: 'pn'
        },
        {
            header: "Qty", dataIndex: 'qty'
        },
        {
            header: "Price", dataIndex: 'price'
        },
        {
            header: "Delivery Date", dataIndex: 'delivery_date'
        },
        {
            header: "Remarks", dataIndex: 'remarks'
        }
    ];

    new Tomtalk.Idc({
        module: 'sample_request',
        fields: fields,
        columns: columns,
        renderTo: Ext.getBody()
    });
});

//end file