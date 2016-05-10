Ext.onReady(function () {
    var fields = ['id', 'email', 'requirement', 'specs'];
    var columns = [
        {
            header: "ID", dataIndex: 'id'
        },
        {
            header: "Email", dataIndex: 'email'
        },
        {
            header: "User product specs", dataIndex: 'specs',
            renderer: function (v) {
                if (Ext.String.trim(v) == '') {
                    return '';
                }

                var obj = JSON.parse(v);
                var html = '';

                for (var i in obj) {
                    html += i + ' : ' + obj[i] + '<br/>';
                }

                return html;
            }
        },
        {
            header: "Custom-designed Requirements", dataIndex: 'requirement'
        }
    ];

    new Tomtalk.Idc({
        module: 'rfq_requirement',
        fields: fields,
        columns: columns,
        renderTo: Ext.getBody()
    });
});

//end file