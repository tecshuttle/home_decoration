/*global Ext, Ijobs, window, document, printMsg, reset, console, getUserName, setInterval, openNewTab, setInterval */

var Timer;
var userAccountListStore;
var userAccountListGrid;
var params, application;

function searchForUserAccountList() {
    var extraParams = {};

    extraParams.applicationId = application.getValue();
    extraParams.accountAlias = Ext.getDom("accountAlias").value;
    extraParams.accountName = document.getElementsByName("accountName")[0].value;
    extraParams.lastModifyUser = getUserName("lastModifyUser");
    extraParams.createTimeStart = Ext.getCmp("createTimeStart").value;
    extraParams.createTimeEnd = Ext.getCmp("createTimeEnd").value;
    extraParams.lastModifyTimeStart = Ext.getCmp("lastModifyTimeStart").value;
    extraParams.lastModifyTimeEnd = Ext.getCmp("lastModifyTimeEnd").value;
    extraParams.isLDAPUser = Ext.getCmp("isLDAPUser").value;

    params = extraParams;

    var proxy = userAccountListStore.getProxy();
    Ext.apply(proxy.extraParams, extraParams);

    userAccountListStore.load();
}

Ext.onReady(function () {
    application = new Ijobs.common.ux.AppComboBox({
        id: 'cmbApplication',
        triggerAction: "all",
        editable: true,
        queryMode: "local",
        showMore: true,
        renderTo: 'applicationId',
        store: Ext.create('Ext.data.JsonStore', {
            autoLoad: true,
            proxy: {
            	type: 'ajax',
            	url: './common/getAllApplicationList.action'
            	
            },
            autoDestroy: true,
            fields: ["id", "applicationName"],
            listeners: {
                load: function (store, records) {
                    var rec = {'id': -1, 'applicationName': '请选择开发商'};
                    store.add([rec]);
                    store.sort('id');
                    application.setValue(-1);
                }
            }
        }),
        valueField: "id",
        displayField: "applicationName"
    });

    //将同步账号select转换成extjs中的combo
    new Ext.form.ComboBox({
        triggerAction: 'all',
        editable: false,
        id: 'isLDAPUser',
        hiddenId: 'isLDAPUser',
        transform: 'isLDAPUser',
        width: 135,
        forceSelection: true
    });

    new Ijobs.common.ux.DateField({
        id: "createTimeStart",
        renderTo: "createTimeStartDiv",
        width: 164,
        format: "Y-m-d"
    });

    new Ijobs.common.ux.DateField({
        id: "createTimeEnd",
        renderTo: "createTimeEndDiv",
        width: 164,
        format: "Y-m-d"
    });

    new Ijobs.common.ux.DateField({
        id: "lastModifyTimeStart",
        renderTo: "lastModifyTimeStartDiv",
        width: 164,
        format: "Y-m-d"
    });

    new Ijobs.common.ux.DateField({
        id: "lastModifyTimeEnd",
        renderTo: "lastModifyTimeEndDiv",
        width: 164,
        format: "Y-m-d"
    });

    new Ijobs.common.ux.UserChooser({
        id: 'lastModifyUser',
        renderTo: 'divLastModifyUser'
    });

    userAccountListStore = Ext.create('Ext.data.JsonStore', {
    	pageSize: 20,
        fields: [
            "id", "accountAlias", "accountName", "lastModifyUser", 
            {name : "application",
            	convert: function(v){
            		if(Ext.isEmpty(v)){
            			return ' ';
            		}else{
            			return v;
            		}
            	}
            },
            "isLDAPUser",
            {name: 'createTime', type: 'date', mapping: 'createTime.time', dateFormat: 'time'},
            {name: 'lastModifyTime', type: 'date', mapping: 'lastModifyTime.time', dateFormat: 'time'}
        ],
        proxy: {
        	type: 'ajax',
            url: './jobs/searchForUserAccountList.action',
        	reader: {
        		root: 'data',
                idProperty: 'id',
                totalProperty: 'totalCount'
        	}
        }
    });

    userAccountListGrid = new Ext.grid.GridPanel({
        frame: false,
        header: false,
        title: '查询结果',
        store: userAccountListStore,
        columnLines: true,
        columns: [
            {header: "id", dataIndex: 'id', hidden: true},
            {
                header: "账户别名",
                dataIndex: 'accountAlias',
                renderer: function (value, cellMeta, record) {
                    return "<a href=\"javascript:getUserAccountInfo("
                        + record.data.id
                        + ",'"
                        + record.data.accountAlias
                        + "')\">"
                        + record.data.accountAlias + "</a> ";
                }
            },
            {
                header: "开发商",
                dataIndex: 'application',
                renderer: function (value, cellMeta, record) {
                    return value.applicationName;
                }
            },
            {header: "账户名称", dataIndex: 'accountName', width: 50},
            {
                header: "创建时间",
                dataIndex: 'createTime',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            },
            {
                header: "是否同步账户",
                dataIndex: 'isLDAPUser',
                hidden: true,
                width: 50,
                renderer: function (value, cellMeta, record) {
                    return (value === true ? "是" : "否");
                }
            },
            {header: "最后修改人", dataIndex: 'lastModifyUser', width: 50},
            {
                header: "最后修改时间",
                dataIndex: 'lastModifyTime',
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            },
            {
                header: "操作",
                dataIndex: 'action',
                sortable: false,
                renderer: function (value, cellMeta, record) {
                    return "<a href=\"javaScript:deleteUserAccount('"
                        + record.data.id + "'," + record.data.application.id + ")\">删除账户</a>";
                }
            }
        ],
        clicksToEdit: 1,
        forceFit: true,
        viewConfig: {
        	trackOver: true,
            stripeRows: true,
            enableRowBody: true,
            showPreview: true
        },
        bbar: new Ext.PagingToolbar({
            store: userAccountListStore,
            displayInfo: true,
            beforePageText: '页',
            afterPageText: '/ {0}',
            displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
            emptyMsg: "没有记录",
            items: ['-', '←、→方向键可翻页']
        })
    });

    userAccountListGrid.render('userAccountListDIV');
    var kit = Ext.ijobs.common.Kit;
    kit.toggleCollapse();
    kit.bindPagingKeys(userAccountListGrid);
    kit.bindEnterEven(Ext.get('searchUserAccountListTable'), searchForUserAccountList);
});

function addTaskI(taskTId, taskTName) {
    openNewTab("./jobs/addTaskI.action?taskT.id=" + taskTId, "查看作业【" + taskTName + "】");
}

function getUserAccountInfo(userAccountID, userAccountAlias) {
    console.log(userAccountID, userAccountAlias);
    openNewTab("./jobs/getUserAccountInfo.action?userAccount.id=" + userAccountID, "账户【" + userAccountAlias + "】");
}

function deleteUserAccount(userAccountID, appID) {
    Ext.MessageBox.buttonText.yes = "是";
    Ext.MessageBox.buttonText.no = "否";

    Ext.MessageBox.confirm("请确认", "是否真的要删除指定的内容", function (button, text) {
        if (button === "yes") {
            Ext.Ajax.request({
                url: "./jobs/deleteUserAccount.action",
                method: 'POST',
                params: {
                    'userAccount.id': userAccountID,
                    'appID': appID
                },
                success: function (xmlHttp) {
                    if (Ext.ijobs.common.Kit.hasPermission(xmlHttp)) {

                        if (xmlHttp.responseText.indexOf("success") === -1) {
                            var result = Ext.decode(xmlHttp.responseText);
                            printMsg(result.data.result);
                            return;
                        }

                        printMsg("成功删除账户", 1);
                        userAccountListStore.load({
                            params: params
                        });
                    }
                },
                failure: function () {
                }
            });
        }
    });
}
function generateTaskI(taskTId) {
    Ext.Ajax.request({
        url: "./jobs/addTaskI.action",
        success: function (xmlHttp) {
            /*if (xmlHttp.responseText.indexOf("成功") == -1) {

             } else {

             }*/
            userAccountListStore.load();
        },
        failure: function () {
        },
        method: 'POST',
        params: {
            'taskT.id': taskTId
        }
    });
}

function GetSelecTimeOut() {
    if (null != Ext.getDom("selectAppDiv")
        && null != Ext.getDom("selectStepDiv")) {
        getSelect("selectAppDiv", "selecetAppList.jsp");
        getSelect("selectStepDiv", "selecetStepType.jsp");
    }
}

function LoadSelect() {
    Timer = setInterval(GetSelecTimeOut, 1000);
}

function userAccountListReset() {
    reset('searchUserAccountListTable');
    Ext.getCmp('cmbApplication').setValue(-1);
}

//end file
