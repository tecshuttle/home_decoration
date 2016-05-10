/*global Ext, Ijobs, window, document, printMsg, top, reset, console */

var queryResultGrid = null;
var queryResultStore = null;

Ext.onReady(function () {
    var startTime = new Ijobs.common.ux.DateField({
        renderTo: "startTimeFromDiv",
        id: "startTime",
        width: 164,
        format: "Y-m-d"
    });

    var endTime = new Ijobs.common.ux.DateField({
        renderTo: "endTimeFromDiv",
        id: "endTime",
        width: 164,
        format: "Y-m-d"
    });

    new Ijobs.common.ux.UserChooser({
        id: 'search_creater',
        renderTo: 'divSearch_creater'
    });

    txt = new Ext.form.TextField({
        id: 'txtGroupAuthName',
        anchor: '40%',
        renderTo: 'divGroupAuthName'
    });
    searchtxt = new Ext.form.TextField({
        id: 'searchtxtGroupAuthName',
        anchor: '40%',
        renderTo: 'searchGroupAuthName'
    });

    store = Ext.create('Ext.data.JsonStore', {
        fields: ['id', 'applicationName'],
        proxy: {
            type: 'ajax',
            url: './jobs/groupAuthAction!getApplicationList.action',
            reader: {
                root: 'data'
            }
        }
    });

    cmb = new Ijobs.common.ux.ComboBox({
        id: 'cmbApplication',
        emptyText: '请选择开发商',
        anchor: '40%',
        store: store,
        queryMode: 'local',
        triggerAction: 'all',
        valueField: 'id',
        displayField: 'applicationName'
    });
    
    searchcmb = new Ijobs.common.ux.ComboBox({
        id: 'searchcmbApplication',
        emptyText: '请选择开发商',
        anchor: '40%',
        store: Ext.create('Ext.data.JsonStore', {
            fields: ['id', 'applicationName'],
            proxy: {
                type: 'ajax',
                url: './jobs/groupAuthAction!getApplicationList.action',
                reader: {
                    root: 'data'
                }
            }
        }),
        queryMode: 'local',
        triggerAction: 'all',
        valueField: 'id',
        displayField: 'applicationName'
    });

    queryResultStore = Ext.create('Ext.data.JsonStore', {
        pageSize: 20,
        fields: ['id', 'name', 'creater', {name: 'formatCreateTime', type: 'date', mapping: 'createTime.time', dateFormat: 'time'}, 'applicationName', 'applicationId'],
        proxy: {
            type: 'ajax',
            url: './jobs/groupAuthAction!getGroupAtuhList.action',
            extraParams: {
                start: 0,
                limit: 20
            },
            reader: {
                root: 'data',
                totalProperty: 'totalCount',
                idProperty: 'id'
            }
        }
    });

    //var mask = new Ext.LoadMask(Ext.getBody(), {msg: "数据加载中，请等待..."});

    queryResultGrid = new Ext.grid.GridPanel({
        title: '组授权列表',
        header: false,
        columnLines: true,
        store: queryResultStore,
        columns: [
            {
                header: "组授权名称",
                dataIndex: 'name',
                align: 'left',
                renderer: function (value, cellMeta, record) {
                    var str = "<a href=\"javaScript:getGroupAuthInfo('" + record.get('id') + "','" + record.data['applicationId'] + "','" + record.data['creater'] + "')\"> " + record.data['name'] + "</a>";
                    return str;
                }
            },
            {
                header: "创建人",
                dataIndex: 'creater',
                align: 'left'
            },
            {
                header: "开发商",
                dataIndex: 'applicationName',
                align: 'left'
            },
            {
                header: "创建时间",
                dataIndex: 'formatCreateTime',
                align: 'left',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            },
            {
                header: "操作",
                dataIndex: 'id',
                renderer: function (value, cellMeta, record) {
                    var str = "<a href=\"javaScript:deleteGroupAuth('" + record.get('id') + "','" + record.data['applicationId'] + "','" + record.data['creater'] + "')\">删除</a>";
                    return str;
                }
            }
        ],
        forceFit: true,
        viewConfig: {
            trackMouseOver: true,
            stripeRows: true
        },
        bbar: new Ext.PagingToolbar({
            store: queryResultStore,
            displayInfo: true,
            beforePageText: '页',
            afterPageText: '/ {0}',
            displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
            emptyMsg: "没有记录"
        })
    });

    queryResultGrid.render('queryResultDiv');
    //queryResultGrid.getStore().load();

    cmb.render('appcmb');
    cmb.getStore().load();
    searchcmb.render('searchappcmb');
    searchcmb.getStore().load();

    var kit = Ext.ijobs.common.Kit;
    kit.toggleCollapse();
    kit.bindEnterEven(Ext.select('.searchTr'), searchGroupAuth);
});

var authWin;
var groupId;
var appID;
var creater;

var groupAuthResultStore = Ext.create('Ext.data.JsonStore', {
    pageSize: 10,
    fields: ['id', 'NAME', 'creater', 'groupName', 'applicationId'],
    proxy: {
        type: 'ajax',
        url: './jobs/groupAuthAction!getGroupAtuhInfo.action',
        extraParams: {
            start: 0,
            limit: 10
        },
        reader: {
            root: 'data',
            totalProperty: 'totalCount',
            idProperty: 'id'
        }
    }
});

var groupAuthResultGrid = new Ext.grid.GridPanel({
    title: '组授权人员列表',
    header: false,
    store: groupAuthResultStore,
    //loadMask: {
    //    msg: '正在加载数据，请稍等…'
    //},
    columns: [
        {
            header: "姓名",
            dataIndex: 'NAME',
            align: 'left'
        },
        {
            header: "创建人",
            dataIndex: 'creater',
            align: 'left'
        },
        {
            header: "组授权名称",
            dataIndex: 'groupName',
            align: 'left'
        },
        {
            header: "操作",
            dataIndex: 'id',
            renderer: function (value, cellMeta, record) {
                var str = "<a href=\"javaScript:deleteGroupUserAuth('" + record.data['id'] + "','" + record.data['applicationId'] + "','" + record.data['creater'] + "')\">删除</a>";
                return str;
            }
        }
    ],
    forceFit: true,
    viewConfig: {
        trackOver: true,
        stripeRows: true
    },
    tbar: [
        {
            xtype: 'tbtext',
            text: '姓名:'
        },
        {
            id: 'userchooser',
            chooserType: 1,
            xtype: 'userchooser'
        },
        {
            text: '加入组授权',
            icon: "./images/add.gif",
            handler: function (item) {
                var name = getUserName('userchooser');
                Ext.Ajax.request({
                    url: "./jobs/groupAuthAction!addGroupUserAuth.action",
                    success: function (xmlHttp) {
                        if (-1 !== xmlHttp.responseText.indexOf("success")) {
                            var store = groupAuthResultGrid.getStore(),
                                proxy = store.getProxy();
                            proxy.extraParams.groupId = groupId;
                            store.load();
                            parent.Frame.insertMsg("添加组授权人员成功", 1);
                        } else if (-1 !== xmlHttp.responseText.indexOf("noRoleUser")) {
                            parent.Frame.insertMsg("组授权人员未在角色系统注册，添加失败", 2);
                        } else if (-1 !== xmlHttp.responseText.indexOf("rolefalse")) {
                            parent.Frame.insertMsg('对不起，您没有该操作权限', 2);
                        } else {
                            parent.Frame.insertMsg("添加组授权人员失败", 2);
                        }
                    },
                    failure: function () {
                    },
                    method: 'POST',
                    params: {
                        'groupId': groupId,
                        'name': name,
                        'appID': appID,
                        'creater': creater
                    }
                });
            }
        }
    ],
    bbar: new Ext.PagingToolbar({
        store: groupAuthResultStore,
        displayInfo: true,
        beforePageText: '页',
        afterPageText: '/ {0}',
        displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
        emptyMsg: "没有记录"
    })
});

function deleteGroupUserAuth(id, appID, creater) {
    Ext.MessageBox.buttonText.yes = "是";
    Ext.MessageBox.buttonText.no = "否";
    Ext.MessageBox.confirm("请确认", "是否真的要删除指定的内容", function (button, text) {
        if (button === "yes") {
            Ext.Ajax.request({
                url: "./jobs/groupAuthAction!deleteGroupUserAuth.action",
                success: function (xmlHttp) {
                    if (xmlHttp.responseText.indexOf("success") == -1) {
                        parent.Frame.insertMsg("删除失败，请联系管理员。\n" + xmlHttp.responseText, 2);
                    } else if (-1 !== xmlHttp.responseText.indexOf("rolefalse")) {
                        parent.Frame.insertMsg('对不起，您没有该操作权限', 2);
                    } else {
                        parent.Frame.insertMsg("删除成功");
                    }
                    var store = groupAuthResultGrid.getStore(),
                        proxy = store.getProxy();
                    proxy.extraParams['groupId'] = groupId;
                    store.load();
                },
                failure: function () {
                },
                method: 'POST',
                params: {
                    'id': id,
                    'appID': appID,
                    'creater': creater
                }
            });
        }
    });
}

function deleteGroupAuth(id, appid, creater) {
    Ext.MessageBox.buttonText.yes = "是";
    Ext.MessageBox.buttonText.no = "否";
    Ext.MessageBox.confirm("请确认", "是否真的要删除指定的内容", function (button, text) {
        if (button === "yes") {
            Ext.Ajax.request({
                url: "./jobs/groupAuthAction!deleteGroupAuth.action",
                success: function (xmlHttp) {
                    if (xmlHttp.responseText.indexOf("success") == -1) {
                        parent.Frame.insertMsg("删除失败，请联系管理员。\n" + xmlHttp.responseText, 2);
                    } else if (-1 !== xmlHttp.responseText.indexOf("rolefalse")) {
                        parent.Frame.insertMsg('对不起，您没有该操作权限', 2);
                    } else {
                        parent.Frame.insertMsg("删除成功");
                    }
                    var proxy = queryResultStore.getProxy().extraParams;
                    proxy.extraParams = Ext.apply(proxy.extraParams, {
                        applicationId: cmb.getValue()
                    });

                    queryResultGrid.getStore().load();
                },
                failure: function () {
                },
                method: 'POST',
                params: {
                    'id': id,
                    'appID': appid,
                    'creater': creater
                }
            });
        }
    });
}

function addGroupAuth() {
    if (txt.getValue() === "") {
        parent.Frame.insertMsg("请填写组授权名称！\n", 2);
        return;
    }
    if (cmb.getValue() === "") {
        parent.Frame.insertMsg("请选择组授权开发商！\n", 2);
        return;
    }
    Ext.Ajax.request({
        url: "./jobs/groupAuthAction!addGroupAuth.action",
        success: function (xmlHttp) {
            if (xmlHttp.responseText.indexOf("success") != -1) {
                parent.Frame.insertMsg("添加成功");
            } else if (-1 !== xmlHttp.responseText.indexOf("rolefalse")) {
                parent.Frame.insertMsg('对不起，您没有该操作权限', 2);
            } else {
                parent.Frame.insertMsg("添加失败。\n" + xmlHttp.responseText, 2);
            }
        },
        failure: function () {
        },
        method: 'POST',
        params: {
            'groupAuthName': txt.getValue(),
            'applicationId': cmb.getValue(),
            'appID': cmb.getValue()
        }
    });
}

function searchGroupAuth() {
    var proxy = queryResultStore.getProxy();

    proxy.extraParams.groupAuthName = searchtxt.getValue();
    proxy.extraParams.applicationId = searchcmb.getValue();
    proxy.extraParams.creater = getUserName("search_creater");
    proxy.extraParams.startTime = Ext.getCmp('startTime').getRawValue();
    proxy.extraParams.endTime = Ext.getCmp('endTime').getRawValue();

    queryResultStore.load();
}

function resetGroupAuth(domID) {
    searchcmb.value = "";
    reset(domID);
}

function getGroupAuthInfo(id, applicationId, owner) {
    if (!authWin) {
        authWin = new Ext.Window({
            title: '组授权信息',
            layout: 'fit',
            width: 500,
            height: 300,
            closeAction: 'hide',
            plain: true,
            items: [groupAuthResultGrid]
        }).show();
    } else {
        authWin.show();
    }

    groupId = id;
    appID = applicationId;
    creater = owner;
    groupAuthResultGrid.getStore().getProxy().extraParams.groupId = id;
    groupAuthResultGrid.getStore().load();
}

//end file