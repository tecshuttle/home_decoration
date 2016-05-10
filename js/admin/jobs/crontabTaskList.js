/*global Ext, Ijobs, window, document, printMsg, reset, console, getUserName */

Ext.QuickTips.init();

var listStore, listGrid;
var datefield1, datefield2, application, editCrontabWin;

function search() {
    var params = {};
    params['termMap.cronDesc'] = document.getElementById("cronDesc").value;
    params['termMap.state'] = Ext.getCmp("state").value;
    params['termMap.taskIName'] = document.getElementById("taskIName").value;
    params['termMap.applicationId'] = application.getValue();
    params['termMap.starter'] = getUserName("starter");
    params['termMap.creater'] = getUserName("creater");
    params['termMap.createTimeFrom'] = datefield1.getRawValue();
    params['termMap.createTimeTo'] = datefield2.getRawValue();

    var proxy = listStore.getProxy();
    Ext.apply(proxy.extraParams, params);

    listStore.load();
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
            fields: ["id", "applicationName"],
            proxy: {
            	type: 'ajax',
            	url: './common/getAllApplicationList.action'
        	},
            autoDestroy: true,
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

    //将任务状态select转换成extjs中的combo
    new Ext.form.ComboBox({
        triggerAction: 'all',
        editable: false,
        id: 'state',
        hiddenId: 'state',
        transform: 'state',
        width: 135,
        forceSelection: true
    });

    datefield1 = new Ijobs.common.ux.DateField({
        renderTo: 'createTimeFromDiv',
        id: 'createTimeFrom',
        width: 164,
        format: "Y-m-d"
    });

    datefield2 = new Ijobs.common.ux.DateField({
        renderTo: 'createTimeToDiv',
        id: 'createTimeTo',
        width: 164,
        format: "Y-m-d"
    });

    new Ijobs.ux.UserChooser({
        id: 'starter',
        renderTo: 'divStarter'
    });

    new Ijobs.ux.UserChooser({
        id: 'creater',
        renderTo: 'divCreater'
    });

    listStore = Ext.create('Ext.data.Store', {
        pageSize: 20,
        fields: ["id", "cronDesc", "taskExecuteId", "taskTId", "taskTName", "taskExecuteId", "taskIName",
            "applicationName", "cronExpression", "ccParam", "state", "starter", "creater", "createTime",
            "applicationId", 'isNocNotice', 'backUpNotifier'],
        proxy: {
            type: 'ajax',
            url : './jobs/crontabTaskAction!getCrontabTaskList.action',              
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        }
    });

    listGrid = new Ext.grid.GridPanel({
        frame: false,
        header: false,
        title: '查询结果',
        store: listStore,
        columns: [
            {header: "id", dataIndex: 'id', hidden: true},
            {header: "模版", dataIndex: 'taskTName', hidden: false,
                renderer: function (value, cellMeta, record) {
                    if (record.data['taskTId'] == 'deleted') {
                        return '模版已被删除';
                    } else {
                        return "<a href=\"javascript:openNewTab('./jobs/jobTemplateMain.jsp?jobTemplateId="
                            + record.data['taskTId']
                            + "','查看模版【"
                            + record.data['taskTName']
                            + "】')\">"
                            + record.data['taskTName'] + "</a>";
                    }
                }
            },
            {header: "执行态", dataIndex: 'taskIName',
                renderer: function (value, cellMeta, record) {
                    if (record.data['taskExecuteId'] == 'deleted') {
                        return '执行态已被删除';
                    } else {
                        return "<a href=\"javascript:openNewTab('./jobs/jobCustomEdit.jsp?jobCustomId="
                            + record.data['taskExecuteId']
                            + "','编辑执行态【"
                            + record.data['taskIName']
                            + "】')\">"
                            + record.data['taskIName'] + "</a>";
                    }
                }
            },
            {header: "开发商", dataIndex: 'applicationName'},
            {header: "定时表达式", dataIndex: 'cronExpression'},
            {header: "CC入口参数", dataIndex: "ccParam", hidden: true/*Ext.value(hideCCScript, false)*/},
            {header: "当前状态", dataIndex: 'state', width: 50,
                renderer: function (value, cellMeta, record) {
                    if (value == 1 || value == 2) {
                        return "已启动";
                    } else if (value == 3) {
                        return "已完成";
                    } else if (value == 4 || value == 5) {
                        return "已暂停";
                    }
                }
            },
            {header: "任务描述", dataIndex: 'cronDesc', hidden: false},
            {header: "启动人", dataIndex: 'starter', width: 50},
            {header: "创建人", dataIndex: 'creater', width: 50},
            {header: "创建时间", dataIndex: 'createTime'},
            {header: "操作", dataIndex: 'state', sortable: false,
                renderer: function (value, cellMeta, record, idx) {
                    var operators = [],
                        lnkModify = "<a href='javascript:return false;'><span onclick='toEditCrontab(\"" + idx + "\"," + record.data['applicationId'] + ",\"" + record.data['creater'] + "\");return false;'>修改</span></a>&nbsp;&nbsp;",
                        lnkRemove = "<a href='javascript:return false;'><span onclick='deleteCrontab(\"" + record.data.id + "\"," + record.data['applicationId'] + ",\"" + record.data['creater'] + "\");return false;'>删除</span></a>&nbsp;&nbsp;&nbsp;&nbsp;",
                        lnkPause = "<a href='javascript:return false;'><span onclick='pauseCrontab(\"" + record.data.id + "\"," + record.data['applicationId'] + ",\"" + record.data['creater'] + "\");return false;'>暂停</span></a>&nbsp;&nbsp;",
                        lnkStart = "<a href='javascript:return false;'><span onclick='startCrontab(\"" + record.data.id + "\"," + record.data['applicationId'] + ",\"" + record.data['creater'] + "\");return false;'>启动</span></a>&nbsp;&nbsp;";
                    
                    if (record.get('taskExecuteId') == 'deleted'){
                        operators.push(lnkRemove);
                    } else if(value == 1 || value == 2){
                        operators.push(lnkModify);
                        operators.push(lnkRemove);
                        operators.push(lnkPause);
                    } else if (value == 4 || value == 5) {
                        operators.push(lnkModify)
                        operators.push(lnkRemove)
                        operators.push(lnkStart);
                    } else {
                        operators.push(lnkModify)
                        operators.push(lnkRemove);                        
                    }
                    return operators.join('');
                }
            }
        ],
        clicksToEdit: 1,
        columnLines: true,
        forceFit: true,
        viewConfig: {
        	trackOver: true,
            stripeRows: true,
            enableRowBody: true,
            showPreview: true
        },
        bbar: new Ext.PagingToolbar({
            store: listStore,
            displayInfo: true,
            beforePageText: '页',
            afterPageText: '/ {0}',
            displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
            emptyMsg: "没有记录",
            items: ['-', '←、→方向键可翻页']
        })
    });
    
    listGrid.render('listDIV');
    var kit = Ext.ijobs.common.Kit;
    kit.toggleCollapse();
    kit.bindPagingKeys(listGrid);
    kit.bindEnterEven(Ext.get('searchTable'), search);
});


function searchReset(domId) {
    reset(domId);
    document.getElementById("state").value = -1;
    Ext.getCmp('cmbApplication').setValue(-1);
}

function _createFormPanel(record) {
    var form = Ext.create('Ext.form.Panel', {
        frame: false,
        fieldDefaults:{
        	labelWidth: 75
        },
        defaults: {
            width: 400,
            msgTarget: 'under'
        },
        id: '_timingTaskForm',
        defaultType: 'textfield',
        bodyStyle: 'padding:10px 10px 0',
        border: false,
        items: [
            {
                //id: 'cronExpression',
                name: 'cronExpression',
                sideText: '<table style=\'font:11\'><tr><td>字段域</td><td>允许的值</td><td>允许的字符</td></tr><tr><td>秒</td><td>0-59</td><td>, - * /</td></tr><tr><td>分</td><td>0-59</td><td>, - * /</td></tr><tr><td>小时</td><td>0-23</td><td>, - * /</td></tr><tr><td>日期</td><td>1-31</td><td>, - * ? / L W C</td></tr><tr><td>月份</td><td>1-12或JAN-DEC</td><td>, - * /</td></tr><tr><td>星期</td><td>1-7或SUN-SAT</td><td>, - * ? / L C #</td></tr><tr><td>年(可选)</td><td>留空 1970-2099</td><td>, - * /</td></tr></table><FONT color=#800080>注意:日期和星期必须有一个为?问号</FONT><br>例：<br>\'0 0 12 * * ?\' 表示每天中午12点触发<br>\'0 0/5 14,18 * * ?\'在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发<br>详细说明请登录KM中ijob说明板块查看',
                fieldLabel: '定时规则',
                emptyText: '请输入定时规则',
                validator: function (value) {
                    var ack = true;

                    if (value.trim().length === 0) {
                        ack = "定时规则不允许为空";
                    } else if (/^\*/.test(value.trim())) {
                        ack = "为防止误操作,系统暂时不允许在秒域上使用*字符";
                    }

                    return ack;
                }
            },
            {
                xtype: 'displayfield',
                style: 'margin-left: 80px;font-size:11px;',
                value: '1-7或SUN-SAT代表星期，其中1代表周日SUN'
            },
            {
                id: 'CronDesc',
                name: 'cronDesc',
                itemId: 'CronDesc',
                fieldLabel: '任务描述',
                emptyText: '请输入任务描述',
                validator: function (value) {
                    if (value.trim().length === 0) {
                        return "任务描述不允许为空";
                    }
                    return true;
                }
            },
            {
                xtype: 'userchooser',
                itemId: 'set_starter',
                name: 'set_starter',
                id: 'set_starter',
                fieldLabel: '启动人',
                msgTarget: 'under',
                validator: function (value) {
                    value = value.trim();
                    if (value.length === 0) {
                        return "请指定定时作业的启动人！";
                    }
                    if (value.split(';').length > 1) {
                        return "任务只能设置一个启动人!";
                    }
                    return true;
                }
            },
            {
                xtype: 'displayfield',
                width: 400,
                fieldStyle: {color: 'red'},
                value: '重要提醒：对于一次性的定时调度规则，请务必加上年份。'
            },
            {
                //id: 'id',
                name: 'id',
                hidden: true
            },
            {
            	//id: 'applicationId',
                name: 'applicationId',
                hidden: true
            },
            {
                //id: 'creater',
                name: 'creater',
                hidden: true
            }
        ]
    });

    return form;
}


function svae() {
    var formPanel = Ext.getCmp('_timingTaskForm');
    var form = formPanel.getForm();

    if (form.isValid()) {
        var params = form.getFieldValues();
        params.appID = params.applicationId;
        params.crontabId = params.id;
        params.starter = params.set_starter;
        params.CronDesc = params.cronDesc;
        
        Ext.Ajax.request({
            url: "./jobs/crontabTaskAction!updateCrontabTask.action",
            method: 'POST',
            params: params,
            success: function (response, opts) {
                if (response.responseText.indexOf("success") === -1) {
                	printMsg(response.responseText, 2);
                } else {
                    printMsg("保存成功", 1);
                    listStore.load();
                    editCrontabWin.hide();
                }
            }
        });
    }
}


function toEditCrontab(crontabId, appID, creater) {
	var record = listStore.getAt(crontabId);
	
    if (!editCrontabWin) {
        editCrontabWin = new Ext.Window({
            closeAction: 'hide',
            title: '修改定时任务',
            applyTo: 'editCrontab-win',
            layout: 'fit',
            width: 500,
            autoRender: true,
            height: 240,
            modal: true,
            plain: true,
            items: [_createFormPanel(record)],
            buttons: [
                {
                    text: '保存',
                    handler: function () {
                        svae();
                    }
                },
                {
                    text: '关闭',
                    handler: function () {
                        editCrontabWin.hide();
                    }
                }
            ]
        });
    }

    var formPanel = editCrontabWin.findById('_timingTaskForm'),
        form = formPanel.getForm();

    record.data.set_starter = record.data.starter;
    form.setValues(record.data);

    editCrontabWin.setVisible(true);
}

Ext.MessageBox.buttonText.yes = "是";
Ext.MessageBox.buttonText.no = "否";

function startCrontab(crontabId, appID, creater) {
    Ext.MessageBox.confirm("请确认", "您确定要启动该任务吗？", function (button, text) {
        if (button === "yes") {
            Ext.Ajax.request({
                url: "./jobs/crontabTaskAction!start.action",
                success: function (xmlHttp) {
                    if (Ext.ijobs.common.Kit.hasPermission(xmlHttp)) {
                        if (xmlHttp.responseText.indexOf("success") === -1) {
                            if (xmlHttp.responseText.indexOf("作业不存在") !== -1) {
                                printMsg(xmlHttp.responseText.trim(), 2);
                            } else {
                                printMsg("启动失败", 2);
                            }
                        } else {
                            printMsg("启动成功", 1);
                        }
                        listStore.load();
                    }
                },
                failure: function () {
                },
                method: 'POST',
                params: {
                    'crontabId': crontabId,
                    'appID': appID,
                    'starter': getUserName("starter"),
                    'creater': creater
                }
            });
        }
    });
}

function pauseCrontab(crontabId, appID, creater) {
    Ext.MessageBox.confirm("请确认", "您确定要暂停该任务吗？", function (button, text) {
        if (button === "yes") {
            Ext.Ajax.request({
                url: "./jobs/crontabTaskAction!pause.action",
                success: function (xmlHttp) {
                    if (Ext.ijobs.common.Kit.hasPermission(xmlHttp)) {
                        if (xmlHttp.responseText.indexOf("success") === -1) {
                            printMsg("暂停失败", 2);
                        } else {
                            printMsg("暂停成功", 1);
                        }
                        listStore.load();
                    }
                },
                failure: function () {
                },
                method: 'POST',
                params: {
                    'crontabId': crontabId,
                    'appID': appID,
                    'starter': getUserName("starter"),
                    'creater': creater
                }
            });
        }
    });
}

function deleteCrontab(crontabId, appID, creater) {
    Ext.MessageBox.confirm("请确认", "您确定要删除该任务吗？", function (button, text) {
        if (button === "yes") {
            Ext.Ajax.request({
                url: "./jobs/crontabTaskAction!delete.action",
                success: function (xmlHttp) {
                    if (Ext.ijobs.common.Kit.hasPermission(xmlHttp)) {
                        if (xmlHttp.responseText.indexOf("success") === -1) {
                            printMsg("删除失败", 2);
                        } else {
                            printMsg("删除成功", 1);
                        }
                        listStore.load();
                    }

                },
                failure: function () {
                },
                method: 'POST',
                params: {
                    'crontabId': crontabId,
                    'appID': appID,
                    'starter': getUserName("starter"),
                    'creater': creater
                }
            });
        }
    });
}

//end file