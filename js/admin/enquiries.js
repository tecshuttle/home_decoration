Ext.onReady(function () {
    var fields = ['id', 'email', 'product_ids'];
    var columns = [
        {
            header: "ID", dataIndex: 'id'
        },
        {
            header: "Email", dataIndex: 'email'
        },
        {
            header: "产品列表", dataIndex: 'product_ids',
            renderer: function (v) {
                if (Ext.String.trim(v) == '') {
                    return '';
                }

                var data = JSON.parse(v);

                var ids = data.ids;
                var name = data.name;

                var html = '';

                Ext.each(ids, function (id, idx) {
                    html += '<a href="/products/detail?id=' + ids[idx] + '" target="_blank">' + name[idx] + '</a><br />';
                });

                return html;
            }
        }
    ];

    new Tomtalk.Idc({
        module: 'enquiries',
        fields: fields,
        columns: columns,
        renderTo: Ext.getBody()
    });
});