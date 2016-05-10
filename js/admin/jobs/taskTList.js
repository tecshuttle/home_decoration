/*global Ext, Ijobs, window, document, printMsg, console, top, reset, openNewTab, setInterval, getSelect */
/*global searchForTaskTs, typeDef */

var Timer;
var taskTListStore;
var taskTListGrid;
var params;
var proxy;

var taskTypeSelect = new Ijobs.ux.ComboBox({
    triggerAction: "all",
    width: 164,
    editable: true,
    queryMode: 'local',
    store: Ext.create('Ext.data.JsonStore', {
        fields: ["label", "value"],
        proxy: {
        	type: 'memory',
        	data: [
                   {label: '全部', value: -1}
               ].concat(typeDef.jobType)
        }
    }),
    displayField: "label",
    valueField: "value",
    value: -1
});

Ext.onReady(function () {
    var kit = Ext.ijobs.common.Kit;

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

    new Ijobs.ux.UserChooser({
        id: 'creater',
        renderTo: 'divCreater'
    });

    kit.bindEnterEven(Ext.get('searchTaskTsTable'), searchForTaskTs);

    taskTypeSelect.render('addTaskT_taskT_taskType');

    var application = new Ijobs.common.ux.AppComboBox({
        id: 'cmbApplication',
        triggerAction: "all",
        editable: true,
        queryMode: "local",
        showMore: true,
        renderTo: 'applicationId',
        store: Ext.create('Ext.data.JsonStore', {
            autoLoad: true,
            autoDestroy: true,
            fields: ["id", "applicationName"],
            proxy: {
            	type: 'ajax',
            	url: './common/getAllApplicationList.action'            	
            },
            listeners: {
                load: function (store, records) {
                    store.add([
                        {'id': -1, 'applicationName': '请选择开发商'}
                    ]);
                    store.sort('id');
                    application.setValue(-1);
                }
            }
        }),
        valueField: "id",
        displayField: "applicationName"
    });

    taskTListStore = Ext.create('Ext.data.Store', {
        pageSize: 20,
        fields: [ "id", "name", "creater", "applicationName", "taskType", "createTime", "stepCount", "lastModifyUser", "lastModifyTime", "applicationId", "des"],
        proxy: {
            type: 'ajax',
            url: './jobs/taskTAction!getTaskTList.action',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        }
    });

    taskTListGrid = new Ext.grid.GridPanel({
        frame: false,
        title: '查询结果',
        header: false,
        store: taskTListStore,
        columnLines: true,        
        columns: [
            {header: "id", dataIndex: 'id', sortable: true, hidden: true},
            {header: "applicationId", dataIndex: 'applicationId', hidden: true},
            {header: "作业名", dataIndex: 'name',
                renderer: function (value, cellMeta, record) {
                    return "<a href=\"javascript:getTaskTMainPage(" +
                        record.data.id +
                        ",'" +
                        record.data.name +
                        "')\">" +
                        record.data.name + "</a> ";
                }},
            {header: "开发商", dataIndex: 'applicationName'},
            {header: "作业类型", dataIndex: 'taskType',
                renderer: function (value, cellMeta, record) {
                    return kit.getStateByType(kit.STATE_TYPE.JOB_TYPE, parseInt(value, 10));
                }},
            {header: "备注", dataIndex: "des", width: 140, id: '_des'},
            {header: "步骤数量", dataIndex: 'stepCount'},
            {header: "创建人", dataIndex: 'creater'},
            {header: "创建时间", dataIndex: 'createTime'},
            {header: "最后修改人", dataIndex: 'lastModifyUser'},
            {header: "最后修改时间", dataIndex: 'lastModifyTime'},
            {header: "操作", dataIndex: 'action', sortable: false,
                renderer: function (value, cellMeta, record) {
                    return "<a href=\"javaScript:addTaskT2Favorites('"
                        + record.data.id + "','"
                        + record.data.applicationId + "','"
                        + record.data.creater + "')\">收藏作业</a>";
                }}
        ],  
        clicksToEdit: 1,
        forceFit: true,
        viewConfig: {
        	stripeRows: true,
        	trackOver: true,
            enableRowBody: true,
            showPreview: true
        },
        bbar: new Ext.PagingToolbar({
            store: taskTListStore,
            displayInfo: true,
            beforePageText: '页',
            afterPageText: '/ {0}',
            displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
            emptyMsg: "没有记录",
            items: ['-', '←、→方向键可翻页']
        })
    });

    taskTListGrid.on('afterrender', function (grid) {
    });

    //给des加上悬停提示
    taskTListGrid.on('render', function (grid) {
        var store = grid.getStore();  // Capture the Store.  
        var view = grid.getView();    // Capture the GridView.  
        grid.tip = new Ext.ToolTip({
            target: view.mainBody,    // The overall target element.  
            delegate: '.x-grid3-col-_des', // 有这个类的元素才会显示提示  
            trackMouse: true,         // Moving within the row should not hide the tip.  
            renderTo: document.body,  // Render immediately so that tip.body can be  
            //  referenced prior to the first show.
            listeners: {              // Change content dynamically depending on which element  
                //  triggered the show.
                beforeshow: function updateTipBody(tip) {
                    var rowIndex = view.findRowIndex(tip.triggerElement);
                    var des = store.getAt(rowIndex).get('des');
                    if (Ext.isEmpty(des)) {
                        return false;
                    }
                    tip.body.dom.innerHTML = store.getAt(rowIndex).get('des');
                }
            }
        });
    });

    taskTListGrid.render('taskTListDIV');

    kit.toggleCollapse();
    kit.bindPagingKeys(taskTListGrid);

    /**
     * 增加搜索条件 ID
     */
    new Ijobs.ux.ComboBox({
        triggerAction: "all",
        width: 164,
        id: 'idTypeSelect',
        editable: true,
        renderTo: 'idTypeSelect',
        queryMode: 'local',
        store: Ext.create('Ext.data.JsonStore', {
            fields: ["label", "value"],
            data: [
                   {label: '作业模版ID', value: 'jobTemplateId'},
                   {label: '作业执行态ID', value: 'jobCustomId'},
                   {label: '作业执行态步骤ID', value: 'stepCustomId'}
               ]
        }),
        
        displayField: "label",
        valueField: "value",
        value: 'jobTemplateId'
    });

    new Ext.form.TextField({
        id: 'idParam',
        border: false,
        renderTo: 'idParams',
        allowBlank: true,
        blankText: '请输入选择的ID'
    });
});

function addTaskI(taskTId, taskTName) {
    openNewTab("./jobs/addTaskI.action?jobTemplateId=" + taskTId, "查看作业【" + taskTName + "】");
}

function getTaskTMainPage(taskTId, taskTName) {
    parent.Frame.createNewTab(
        "./jobs/jobTemplateMain.jsp?jobTemplateId=" + taskTId,
        "jobTemplate_" + taskTId,
        "作业【" + taskTName + "】主页"
    );
}

function checkTemplate(taskTId, taskTName) {
    Ext.Ajax.request({
        url: "./jobs/checkTemplate.action",
        success: function (xmlHttp) {
            var resJsonObj = Ext.decode(xmlHttp.responseText);
            if (resJsonObj.result < 0) {
                printMsg(resJsonObj.errInfo, 2);
            } else {
                openNewTab("./jobs/addTaskI.action?jobTemplateId=" + taskTId,
                    "查看作业【" + taskTName + "】");
            }
        },
        failure: function () {
        },
        method: 'POST',
        params: {
            'jobTemplateId': taskTId
        }
    });
}

function delTaskT(taskTId, appID, creater) {
    Ext.MessageBox.buttonText.yes = "是";
    Ext.MessageBox.buttonText.no = "否";
    Ext.MessageBox.confirm("请确认", "是否真的要删除指定的内容", function (button, text) {
        if (button === "yes") {
            Ext.Ajax.request({
                url: "./jobs/deleteTaskT.action",
                success: function (xmlHttp) {
                    if (xmlHttp.responseText.indexOf("成功") === -1) {
                        printMsg("删除失败", 2);
                    } else {
                        printMsg("成功删除作业模板及相关联的执行态作业", 1);
                    }
                    taskTListStore.load({
                        params: params
                    });
                },
                failure: function (xmlHttp) {
                },
                method: 'POST',
                params: {
                    'jobTemplateId': taskTId,
                    'appID': appID,
                    'creater': creater
                }
            });
        }
    });
}
function addTaskT2Favorites(taskTId, appID, creater) {
    Ext.Ajax.request({
        url: "./personal/userFavoritesAction!favoritesAdd.action",
        method: 'POST',
        params: {
            'favoriteId': taskTId,
            'favoriteType': 1,
            'appID': appID,
            'creater': creater
        },
        success: function (xmlHttp) {
            if (xmlHttp.responseText.indexOf("success") === -1) {
                printMsg("收藏失败", 2);
            } else {
                printMsg("收藏成功", 1);
            }
        },
        failure: function () {
        }

    });
}

function generateTaskI(taskTId) {
    Ext.Ajax.request({
        url: "./jobs/addTaskI.action",
        success: function (xmlHttp) {
            taskTListStore.load();
        },
        failure: function () {
        },
        method: 'POST',
        params: {
            'jobTemplateId': taskTId
        }
    });
}

function GetSelecTimeOut() {
    if (null !== Ext.getDom("selectAppDiv") && null !== Ext.getDom("selectStepDiv")) {
        getSelect("selectAppDiv", "selecetAppList.jsp");
        getSelect("selectStepDiv", "selecetStepType.jsp");
    }
}

function LoadSelect() {
    Timer = setInterval(GetSelecTimeOut, 1000);
}

function searchForTaskTs() {
    var extraParams = {};

    extraParams.applicationId = Ext.getCmp('cmbApplication').getValue();
    extraParams.stepName = Ext.getDom("stepName").value;
    extraParams.taskTName = document.getElementsByName("taskName")[0].value;
    extraParams.creater = Ext.getCmp('creater').getValue();
    extraParams.startTime = Ext.getCmp("createTimeStart").getValue();
    extraParams.endTime = Ext.getCmp("createTimeEnd").getValue();
    extraParams.taskType = taskTypeSelect.value;

    var idTypes = ['jobTemplateId', 'jobCustomId', 'stepCustomId'],
        idTypeCmp = Ext.getCmp('idTypeSelect'),
        idCmp = Ext.getCmp('idParam'),
        idType = idTypeCmp.getValue(),
        id = idCmp.getValue();

    Ext.each(idTypes, function (type) {
        id = id.trim();
        if (type === idType) {
            extraParams[type] = Ext.value(id, -1);
        } else {
            extraParams[type] = -1;
        }
    });

    params = extraParams;

    var proxy = taskTListStore.getProxy();

    Ext.apply(proxy.extraParams, params);

    taskTListStore.load();
}

function exportExcel() {
    var applicationId = Ext.getCmp('cmbApplication').getValue();
    var stepName = Ext.getDom("stepName").value;
    var taskTName = document.getElementsByName("taskName")[0].value;
    var creater = Ext.getCmp('creater').getValue();
    var startTime = Ext.getCmp("createTimeStart").getValue();
    var endTime = Ext.getCmp("createTimeEnd").getValue();
    var taskType = taskTypeSelect.value;

    window.location.href = '../common/exportExcelAction!doDownLoad.action?exportType=1'
        + '&applicationId=' + applicationId
        + "&stepName=" + stepName + "&taskTName=" + taskTName
        + "&creater=" + creater
        + "&startTime=" + startTime + "&endTime=" + endTime
        + "&taskType=" + taskType;
}

function taskTListReset(domId) {
    reset(domId);
    Ext.getCmp('cmbApplication').setValue(-1);
    taskTypeSelect.setValue(-1);
}

//end file