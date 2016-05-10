/*global Ext, console */

Ext.define("WeiXin.view.reply.Grid", {
    extend: "Ext.grid.Panel",
    alias: 'widget.replygrid',
    store: "Reply",
    margin: 10,
    forceFit: true,
    columnLines: true,
    initComponent: function () {
        this.columns = [
            { text: 'ID', dataIndex: 'ID', hidden: true },
            { text: '响应事件', dataIndex: 'NAME', width: '20%',
                renderer: function (value, cellMeta, record) {
                    var v = value.split('_');
                    var txt = '';
                    if (v[1] === 'txt') {
                        txt = '客户发送文字';
                    } else {
                        txt = '微信事件';
                    }

                    return txt;
                }
            },
            { text: '事件内容', dataIndex: 'NAME', width: '20%',
                renderer: function (value, cellMeta, record) {
                    var v = value.split('_');
                    var txt = v[2];
                    if (v[1] === 'txt') {
                        if (!v[2]) {
                            txt = '默认回复';
                        }
                    } else {
                        txt = v[2] + (v[3] ? ' - ' + v[3] : '');

                        if (v[2] === 'subscribe') {
                            txt = '用户关注微信';
                        }

                        if (v[2] === 'CLICK') {
                            txt = '点击菜单项：' + v[3];
                        }
                    }

                    return txt;
                }
            },
            { text: '回复内容', dataIndex: 'VALUE', width: '40%',
                renderer: function (value, cellMeta, record) {
                    var v = JSON.parse(value);
                    var txt = '';
                    console.log(v);
                    if (v.type === 'txt') {
                        txt = '回复文字：' + v.data;
                    } else {
                        var i = 1;
                        txt = '回复图文：';
                        Ext.each(v.data, function (article) {
                            txt += '<a href="' + article.url + '">' + article.title + '</a> ';
                            i = i + 1;
                        });
                    }

                    return txt;
                }
            },
            { text: '描述', dataIndex: 'DESC', width: '30%' },
            {
                header: "操作",
                dataIndex: 'ID',
                width: '10%',
                xtype: 'linkcolumn',
                items: [
                    {
                        text: '编辑',
                        handler: function (grid, rowIndex, colIndex) {
                            this.up('grid').fireEvent('edit', grid, rowIndex, colIndex);
                        }
                    },
                    {
                        text: '删除',
                        handler: function (grid, rowIndex, colIndex) {
                            this.up('grid').fireEvent('remove', grid, rowIndex, colIndex);
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    },
    tbar: [
        {
            xtype: 'button',
            action: 'add',
            text: '新增'
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: 'Reply',
        displayInfo: true,
        beforePageText: '页',
        afterPageText: '/ {0}',
        displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
        emptyMsg: "没有记录"
    }
});

//end file