var taskTypeSelect = Ext.create('Ijobs.common.ux.ComboBox', {
	triggerAction: "all",
	width : 165,
    editable : true,
    mode : 'local',
    store: Ext.create('Ext.data.JsonStore', {
        data : [{label : '全部',value:-1}].concat(typeDef.jobType),        
        fields: ["label", "value"]
    }),
    displayField: "label",
    valueField: "value",
	value: -1
});
var datefield1,datefield2,datefield3,datefield14,application;
var errorTypeSelect;
Ext.onReady(function() {
	var onReady = false;
	errorTypeSelect = Ext.create('Ijobs.common.ux.ComboBox', {
		triggerAction: "all",
		typeAhead: true,
		editable: true,
		width : 165,
		mode: "local",
		store: Ext.create('Ext.data.JsonStore', {
			root : 'data',
			autoLoad : true,
			fields: ["errorInfoTypeId", "errorInfoTypeName"],
			url : './admin/errorTransformAction!getErrorTransCombox.action',
			listeners : {
				load : function(store,records,opts){
					errorTypeSelect.setValue(-1);
				}
			}
		}),
		valueField: "errorInfoTypeId",
		displayField: "errorInfoTypeName",
		renderTo: 'errorTypeDiv'
	});	
	var kit = Ext.ijobs.common.Kit;
	Ext.create('Ijobs.common.ux.ComboBox', {
	    triggerAction: 'all',
	    editable  : false,
        mode : 'local',
        store : Ext.create('Ext.data.JsonStore', {
            data : [{value:'-1',label:'全部'}].concat(typeDef.runStatus),
            fields :['value','label']
        }),
	    hiddenId : 'state',
        hiddenName : 'state',
        id : 'combState',
	    renderTo:'div_state',
	    valueField: "value",
	    displayField: "label",
        value : '-1',
	    width:135,
	    forceSelection:true
	});
	Ext.create('Ijobs.common.ux.ComboBox', {
        triggerAction: 'all',
        editable  : false,
        mode : 'local',
        store : Ext.create('Ext.data.JsonStore', {
            data : [{value:'-1',label:'全部'}].concat(typeDef.runStatus),
            fields :['value','label']
        }),
        hiddenId : 'stepState',
        hiddenName : 'stepState',
        id : 'combStepState',
        renderTo:'div_stepState',
        valueField: "value",
        displayField: "label",
        value : '-1',
        width:135,
        forceSelection:true
    });    
	
    application = Ext.create('Ijobs.common.ux.AppComboBox', {
            id : 'cmbApplication',
            triggerAction: "all",
            editable: true,
            mode: "local",
            showMore : true,
            renderTo : 'applicationId',
            store: Ext.create('Ext.data.JsonStore', {
                autoLoad : true,
                url : './common/getAllApplicationList.action',
                autoDestroy: true,
                fields: ["id", "applicationName"],
                listeners : {
                    load : function(store,records){
                    	//var rec = new store.recordType({'id':-1,'applicationName':'请选择业务名'});
                    	var rec = {'id':-1,'applicationName':'请选择开发商'};
                        store.add([rec]);
                        store.sort('id');
                        application.setValue(-1);
                        onReady = true;
                    }
                }
            }),
            valueField: "id",
            displayField: "applicationName"
        });

	taskTypeSelect.render("addTaskT_taskT_taskType");
	
	taskTListStore = Ext.create('Ext.data.JsonStore', {
		root : 'data',
		totalProperty: 'totalCount',
		idProperty : 'id',
		//remoteSort: true,
		fields : ["id", "name", "applicationName","taskType", "state", "starter", "totalTime", "startTime", "endTime", "taskName", "taskTId", "taskTName"],
		proxy : {
			type : 'ajax',
			getMethod: function(){
				return 'POST';
			},
			url : './jobs/taskIAction!getTaskIExeHistoryList.action'
		}
	});	
	taskTListGrid = Ext.create('Ext.grid.GridPanel', {
		trackMouseOver : true,
		stripeRows : true,
		autoHeight : true,
//		frame : true,
		header : false,
		title : '查询结果',
		loadMask : {
			msg : '查询中...'
		},
		store : taskTListStore,
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: true		        
		    },
			columns : [
				{header : "taskTId", dataIndex : 'taskTId', hidden : true},
				{header : "id", dataIndex : 'id', hidden : true},
				{header : "模版名称", dataIndex : 'taskTName', hidden : false,
					renderer : function(value, cellMeta, record) {
						if(record.data['taskTId'] == 'deleted'){
							return '模版已被删除';
						}else{
							return "<a href=\"javascript:openNewTab('./jobs/jobTemplateMain.jsp?jobTemplateId="
							+ record.data['taskTId']
							+ "','查看模版【"
							+ record.data['taskTName']
							+ "】')\">"
							+ record.data['taskTName'] + "</a>";
						}
						}
						},
				{header : "作业名", dataIndex : 'name', width : 200,
					renderer : function(value, cellMeta, record) {
						return "<a href=\"javascript:openNewTab('./jobs/jobInstanceView.jsp?jobInstanceId="
						+ record.data['id']
						+ "','查看实例【"
						+ record.data['name']
						+ "】')\">"
						+ record.data['name'] + "</a>";
					}
				},
				{header : "开发商", dataIndex : 'applicationName', width : 60},				
				{header : "作业类型", dataIndex : 'taskType', width : 55,
	                renderer : function(value, cellMeta, record) {
	                    return kit.getStateByType(kit.STATE_TYPE.JOB_TYPE,parseInt(value));
	                }},			
				{header : "当前状态", dataIndex : 'state', width : 50,
					renderer : function(value, cellMeta, record) {
						return kit.getStateByType(kit.STATE_TYPE.RUN_STATUS,parseInt(value));
					}
				},
				{header : "开始时间", dataIndex : 'startTime'},
				{header : "结束时间", dataIndex : 'endTime'},
				{header : "总耗时", dataIndex : "totalTime", width : 40},
				{header : "启动人", dataIndex : 'starter', width : 50},
				{header : "操作", dataIndex : 'action', width : 70,sortable: false,
					renderer : function(value, cellMeta, record) {
						return	"<a href=\"javascript:openNewTab('./jobs/jobRun.jsp?jobInstanceId="
							+ record.data['id']
							+ "','执行作业【"
							+ record.data['name']
							+ "】')\">查看执行详情</a>&nbsp;&nbsp;&nbsp;";
						}
				}
			]
		}),
		clicksToEdit : 1,
		columnLines : true,
		viewConfig: {
            enableRowBody:true,
            showPreview:true
        },
        forceFit:true,
		bbar: {
			xtype : 'pagingtoolbar',
			pageSize: 20,
			store: taskTListStore,
			displayInfo: true,
			beforePageText : '页',
	        afterPageText : '/ {0}',
			displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
			emptyMsg: "没有记录",
            items :['-','←、→方向键可翻页']
		}
	});
	taskTListGrid.render('taskTListDIV');
	datefield1 = Ext.create('Ijobs.common.ux.DateField', {
		renderTo: 'dateStartTimeFrom',
		id : 'startTimeFrom',
		width : 164,
		format : "Y-m-d"
	});
		
	datefield2 = Ext.create('Ijobs.common.ux.DateField', {
		renderTo: 'dateStartTimeto',
		id : 'startTimeto',
		width : 164,
		format : "Y-m-d"
	});
	
	datefield3 = Ext.create('Ijobs.common.ux.DateField', {
		renderTo: 'dateEndTimeFrom',
		id : 'endTimeFrom',
		width : 164,
		format : "Y-m-d"
	});
		
	datefield4 = Ext.create('Ijobs.common.ux.DateField', {
		renderTo: 'dateEndTimeto',
		id : 'endTimeto',
		width : 164,
		format : "Y-m-d"
	});
	Ext.create('Ijobs.ux.UserChooser', {
        id : 'starter',
        value : parent.Frame ? parent.Frame.getCurUser() : Frame.getCurUser(),//默认为当前登录人
        renderTo : 'divStarter'
    });
	Ext.create('Ijobs.ux.UserChooser', {
        id : 'operator',
        renderTo : 'divOperator'
    });    
	kit.toggleCollapse();
    kit.bindPagingKeys(taskTListGrid);
    kit.bindEnterEven(Ext.get('searchTaskIsTable'),searchForTaskIs);
    
    /**
     * 增加搜索条件 ID
     */
    var idTypeSelect = Ext.create('Ijobs.common.ux.ComboBox', {
    	triggerAction: "all",
        width : 124,
        //columnWidth: .5,
        height : 22,
        id : 'idTypeSelect',
        editable : false,
        mode : 'local', 
    	store: Ext.create('Ext.data.JsonStore',{
            data : [
                    {label : '作业实例ID',value : 'jobInstanceId'},
                    {label : 'TSCID',value : 'tscId'}
            ],        
    		fields: ["label", "value"]
    	}),
        displayField: "label",
        valueField: "value",
        value : 'tscId'
    });    
    tf = Ext.create('Ext.form.TextField', {
    	id:'idParam',    	
    	columnWidth: .5,
    	border : false,
    	allowBlank : true,
    	blankText : '请输入选择的ID'
    });    
    Ext.create('Ext.panel.Panel', {
        width: 320,
        height : 25,
        autoHeight: true,
        layout:'column',
        border : false,
        items: [{
    		width: 130,
    		height : 25,
    		style : 'margin-top: -3px;',
    		border : false,
    		items : [idTypeSelect]
    	},tf],
        renderTo: 'idParams'
    });
    /*暂时屏蔽//“执行 IP” 输入框 , 可输入多个IP，最多50个IP，传参名称 jobIps，多个IP以","分割        
    Ext.create('Ext.form.field.TextArea',{
    	name : 'jobIps',
    	id : 'jobIps',
    	autoScroll : true,
    	grow : true,
        growMin : 25,
        growMax : 100,
        emptyText : '请输入IP，多个IP请以“回车”分隔',
    	renderTo: 'div_jobIps'
    });
    //"Caller IP"输入框，可输入多个IP，最多50个IP，传参名称 callerIps，多个IP以","分割
    Ext.create('Ext.form.field.TextArea',{
    	name : 'callerIps',
    	id : 'callerIps',
    	autoScroll : true,
    	grow : true,
        growMin : 25,
        growMax : 100,
        emptyText : '请输入IP，多个IP请以“回车”分隔',
    	renderTo: 'div_callerIps'
    });
    //“耗时大于(s)”  输入框，数字, 传参名称 totalTime  
    Ext.create('Ext.form.field.Number',{
    	name : 'totalTime',
    	id : 'totalTime',
    	minValue: 0,
    	renderTo: 'div_totalTime'
    });
    //"蓝鲸AppId"       输入框，任意字符，限制100个字符，传参名称 bkAppId
    Ext.create('Ext.form.field.Text',{
    	name : 'bkAppId',
    	id : 'bkAppId',
    	maxLength : 100,
    	renderTo: 'div_bkAppId'
    });*/
    //
  //页面加载完成后提交查询
    var task = {
    	    run: function(){    	    	
    	    	if(onReady){
    	        	searchForTaskIs();
    	        	Ext.TaskManager.stop(task);
    	        }
    	    },
    	    interval: 500//0.5秒查询一次页面是否加载完毕
    	};
    Ext.TaskManager.start(task);
    
    
});

function searchForTaskIs() {
	
	taskTListStore.baseParams = {};
	var proxy = taskTListStore.getProxy();	
	proxy.extraParams['applicationId'] = application.getValue();	
	proxy.extraParams['taskIName'] = Ext.getDom("taskIName").value;
	proxy.extraParams['taskType'] = taskTypeSelect.value;
	proxy.extraParams['state'] = Ext.getCmp('combState').getValue();//Ext.getDom("state").value;
	proxy.extraParams['starter'] = getUserName("starter");
	proxy.extraParams['startTime1'] = datefield1.getRawValue();
	proxy.extraParams['startTime2'] = datefield2.getRawValue();
	proxy.extraParams['endTime1'] = datefield3.getRawValue();
	proxy.extraParams['endTime2'] = datefield4.getRawValue();
	proxy.extraParams['stepName'] = Ext.getDom("stepName").value;
	proxy.extraParams['stepState'] = Ext.getCmp("combStepState").getValue();
	proxy.extraParams['operator'] = getUserName("operator");
	proxy.extraParams['errorType'] = errorTypeSelect.value;
	/*暂时屏蔽var callerIps = Ext.getCmp('callerIps').getValue();
	var jobIps = Ext.getCmp('jobIps').getValue();
	var validator = Ext.form.VTypes;
	var ips = [],errorIPs=[];
	if(jobIps){
		Ext.each(Ext.unique(jobIps.split(/^\s\s+|\s+/g)),function(ip){
	        !validator.IPAddress(ip) ? errorIPs.push(ip) : ips.push(ip);
	    });         
	    if( errorIPs.length>0 ){
	        printMsg('不合法的IP：'+errorIPs.join('、'),2);
	        return false;
	    } else {
	    	if(ips.length > 50){
	    		printMsg('执行 IP最多输入50个IP',2);
		        return false;
	    	}
	    	jobIps = ips.join(",");
	    }
	}
	ips = [];
	errorIPs=[];
	if(callerIps){
		Ext.each(Ext.unique(callerIps.split(/^\s\s+|\s+/g)),function(ip){
	        !validator.IPAddress(ip) ? errorIPs.push(ip) : ips.push(ip);
	    });         
	    if( errorIPs.length>0 ){
	        printMsg('不合法的IP：'+errorIPs.join('、'),2);
	        return false;
	    } else {
	    	if(ips.length > 50){
	    		printMsg('Caller IP最多输入50个IP',2);
		        return false;
	    	}
	    	callerIps = ips.join(",");
	    }
	}
	var bkAppId = Ext.getCmp('bkAppId').getValue();	
	if(bkAppId.length>100){
		printMsg('蓝鲸AppId最多输入100个字符',2);
		return false;
	}
	proxy.extraParams['bkAppId'] = bkAppId; 
	proxy.extraParams['jobIps'] = jobIps; 
	proxy.extraParams['callerIps'] = callerIps; 
	proxy.extraParams['totalTime'] = Ext.getCmp('totalTime').getValue();*/
	
	var idTypes = new Array('jobInstanceId', 'tscId'),
		idTypeCmp = Ext.getCmp('idTypeSelect'),
		idCmp = Ext.getCmp('idParam'),
		idType = idTypeCmp.getValue(),
		id = idCmp.getValue();

	Ext.each(idTypes, function(type){
		id = id.trim();
		if(type === idType){
			proxy.extraParams[type] = Ext.value(id, -1);
		}else{
			proxy.extraParams[type] = -1;
		}
	});
	taskTListStore.load();
}

function exprotExcel() {
	var applicationId = application.getValue();
	var taskIName = Ext.getDom("taskIName").value;
	var taskType = taskTypeSelect.value;
	var state = Ext.getCmp('combState').value;
	var starter = getUserName("starter");
	var startTime1 = datefield1.getRawValue();
	var startTime2 = datefield2.getRawValue();
	var endTime1 = datefield3.getRawValue();
	var endTime2 = datefield4.getRawValue();
	var stepName = Ext.getDom("stepName").value;
	var stepState = Ext.getCmp("combStepState").value;
	var operator = getUserName("operator");
	var errorType = errorTypeSelect.value;	
	window.location.href = '../common/exportExcelAction!doDownLoad.action?exportType=2&applicationId='+application.getValue()+
	"&taskIName="+taskIName+
	"&taskType="+taskType+
	"&state="+state+
	"&starter="+starter+
	"&startTime1="+startTime1+
	"&startTime2="+startTime2+
	"&endTime1="+endTime1+
	"&endTime2="+endTime2+
	"&stepName="+stepName+
	"&stepState="+stepState+
	"&operator="+operator+
	"&errorType="+errorType;
}
function taskIListReset(domId) {
	reset(domId);
    Ext.getCmp('cmbApplication').setValue(-1);
	taskTypeSelect.setValue(-1);
	errorTypeSelect.setValue(-1);
	/*暂时屏蔽Ext.getCmp('jobIps').setValue('');
	Ext.getCmp('callerIps').setValue('');*/
}

function delTaskI(taskIId) {
	Ext.Ajax.request( {
		url : "./jobs/deleteTaskI.action",
		success : function(xmlHttp) {
			if (xmlHttp.responseText.indexOf("success") == -1) {
				
			}
			taskTListStore.load();
		},
		failure : function() {
		},
		method : 'POST',
		params : {
			'taskI.id' : taskIId
		}
	});
}