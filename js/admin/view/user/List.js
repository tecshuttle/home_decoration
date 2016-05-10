/*global Ext, console */

Ext.define("WeiXin.view.user.List", {
    extend: "Ext.grid.Panel",
    alias: 'widget.userlist',
    store: "User",
    margin: 10,
    forceFit: true,
    columnLines: true,
    initComponent: function () {
        this.columns = [
            { text: 'ID', dataIndex: 'ID', hidden: true },
            { text: '名称', dataIndex: 'NAME', width: '20%'  },
            { text: '值', dataIndex: 'VALUE', width: '40%'},
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
        store: 'User',
        displayInfo: true,
        beforePageText: '页',
        afterPageText: '/ {0}',
        displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
        emptyMsg: "没有记录"
    }
});

//end file