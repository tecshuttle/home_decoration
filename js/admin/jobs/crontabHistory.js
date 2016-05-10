/*global Ext, Ijobs, window, document, printMsg, reset, console, getUserName */

var listStore;
var listGrid;
var datefield1, datefield2, application;

Ext.onReady(function () {
    application = new Ijobs.common.ux.AppComboBox({
        id: 'cmbApplication',
        triggerAction: "all",
        editable: true,
        jqueryMode: "local",
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
    
    var toolkit = Ext.ijobs.common.Kit;
    var data = typeDef.cronresultType;
    data.splice(0,0,{"value":-1,"label":"全部"});
    //将启动结果select转换成extjs中的combo
    new Ext.form.ComboBox({
        triggerAction: 'all',
        editable: false,
        id: 'startResult',
        hiddenId: 'startResult',
        transform: 'startResult',
        width: 135,
        queryMode: 'local',
        valueField: 'value',
        displayField: 'label',
        store: Ext.create('Ext.data.JsonStore', {
            fields: ['value', 'label'],
            data: data,
            proxy: {
            	type: 'memory'/*,
            	data: typeDef.cronresultType*/
            }
        }),
        value: -1,
        forceSelection: true
    });

    datefield1 = new Ijobs.common.ux.DateField({
        renderTo: 'startTimeFromDiv',
        id: 'startTimeFrom',
        width: 164,
        format: "Y-m-d"
    });

    datefield2 = new Ijobs.common.ux.DateField({
        renderTo: 'startTimeToDiv',
        id: 'startTimeTo',
        width: 164,
        format: "Y-m-d"
    });

    new Ijobs.common.ux.UserChooser({
        id: 'starter',
        renderTo: 'divStarter'
    });

    listStore = Ext.create('Ext.data.JsonStore', {
        pageSize: 20,
        fields: ["id", "crontabId", "cronDesc", "taskExecuteId", "applicationId", "applicationName", "cronExpression",
            "starter", "startTime", "taskInstanceId", "taskIName", "startResult", "errorMsg"],
        proxy: {
            type: 'ajax',
            url : './jobs/crontabTaskAction!getCrontabHistoryList.action',            
            reader: {
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
            {header: "作业实例", dataIndex: 'taskIName',
                renderer: function (value, cellMeta, record) {
                    if (record.data['taskInstanceId'] == 'deleted') {
                        return '未关联实例';
                    } else {
                        return value;
                    }
                }
            },
            {header: "开发商", dataIndex: 'applicationName'},
            {header: "任务描述", dataIndex: 'cronDesc', hidden: false},
            {header: "定时表达式", dataIndex: 'cronExpression'},
            {header: "启动结果", dataIndex: 'startResult', width: 80,
                renderer: function (value, cellMeta, record) {
                    return toolkit.getStateByType(toolkit.STATE_TYPE.CRONRESULT_TYPE, value);
                }
            },
            {header: "启动信息", dataIndex: "errorMsg", id: 'errorMsg'},
            {header: "启动人", dataIndex: 'starter', width: 50},
            {header: "触发时间", dataIndex: 'startTime'}


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
        }),
        listeners: {
            render: function (grid) {
                var store = grid.getStore(),
                    view = grid.getView(),
                    tipColumns = ['errorMsg'],//需要给多个单元格加上tip，只需要cm中配置id属性，在此新增对应的id即可
                    delegates = [];

                Ext.each(tipColumns, function (col) {
                    delegates.push('.x-grid3-col-' + col);
                });

                delegates = Ext.String.format('div:any({0})', delegates.join('|'));

                new Ext.ToolTip({
                    target: view.mainBody,
                    delegate: delegates,
                    trackMouse: true,
                    renderTo: document.body,
                    listeners: {
                        beforeshow: function updateTipBody(tip) {
                            var rowIndex = view.findRowIndex(tip.triggerElement),
                                tips;
                            Ext.each(tipColumns, function (val) {
                                if (tip.triggerElement.className.indexOf(val) !== -1) {
                                    tips = store.getAt(rowIndex).get(val);
                                    if (!Ext.isEmpty(tips)) {
                                        tip.body.dom.innerHTML = tips;
                                    }
                                    return false;
                                }
                            });

                        }
                    }
                });
            }
        }
    });
    
    listGrid.render('listDIV');
    
    var kit = Ext.ijobs.common.Kit;
    kit.toggleCollapse();
    kit.bindPagingKeys(listGrid);
});

function search() {
    var startResult = Ext.getCmp("startResult").value;
    startResult = startResult === null ? 0 : startResult;
    startResult = startResult >= 0 ? startResult : '';

    var params = {};
    params['termMap.cronDesc'] = document.getElementById("cronDesc").value;
    params['termMap.taskIName'] = document.getElementById("taskIName").value;
    params['termMap.startResult'] = startResult;
    params['termMap.applicationId'] = application.getValue();
    params['termMap.starter'] = getUserName("starter");
    params['termMap.startTimeFrom'] = datefield1.getRawValue();
    params['termMap.startTimeTo'] = datefield2.getRawValue();

    var proxy = listStore.getProxy();
    Ext.apply(proxy.extraParams, params);

    listStore.load();
}

function searchReset(domId) {
    reset(domId);
    Ext.getCmp("startResult").setValue(-1);
    Ext.getCmp('cmbApplication').setValue(-1);
}

//end file