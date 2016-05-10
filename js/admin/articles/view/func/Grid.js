/*global Ext, console */

Ext.define("Tiegan.view.func.Grid", {
    extend: "Ext.grid.Panel",
    alias: 'widget.funcgrid',
    store: "Func",
    region: 'center',
    margin: 10,
    forceFit: true,
    columnLines: true,
    initComponent: function () {
        this.columns = [
            { text: 'ID', dataIndex: 'LOG_ID', hidden: true },
            { text: '调用接口', dataIndex: 'FUNC', width: '20%' },
            { text: '请求参数', dataIndex: 'PARAMS', width: '30%',
                renderer: function (value, cellMeta, record) {
                    if (record.data.FUNC === 'send_mail()') {
                        var mail = JSON.parse(record.data.PARAMS);
                        return mail.email + ' - ' + mail.subject;
                    }

                    return value;
                }
            },
            { text: '返回结果', dataIndex: 'RETURN', width: '30%',
                renderer: function (value, cellMeta, record) {
                    if (value.length > 1000) {
                        return html_encode(value).substr(0, 200);
                    } else {
                        return value;
                    }
                }
            },
            { text: '调用时间', dataIndex: 'CALL_TIME', width: '15%',
                renderer: function (value, cellMeta, record) {
                    var time = new Date(value * 1000);
                    return moment(time).format('YYYY-M-D H:mm:ss');
                }
            },
            { text: '耗时/秒', dataIndex: 'RUN_TIME', width: '10%' }
        ];

        this.callParent(arguments);
    },

    listeners: {
        itemclick: {
            fn: function (me, record, item, index, e, eOpts) {
                var win = Ext.widget("detailwin");
                win.setValue(record.data);
                win.show();
            }
        }
    },

    bbar: {
        xtype: 'pagingtoolbar',
        store: 'Func',
        displayInfo: true,
        beforePageText: '页',
        afterPageText: '/ {0}',
        displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
        emptyMsg: "没有记录"
    }
});

//end file