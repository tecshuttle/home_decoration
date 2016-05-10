/*Ext.ns('Ext.ijobs.job.JobRun');

Ext.applyIf(Array.prototype, {	
	filter : function(filter, that opt) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++) {
            if (i in this && filter.call(that, v= this[i], i, this)) {
                other.push(v);
            }
        }
        return other;
    }
});*/

/**
 * 作业执行页面
 * 
 * @class Ext.ijobs.job.JobRunUI
 * @extends Ext.Container
 */
//Ext.QuickTips.init();
Ext.define('Ext.ijobs.job.JobRunUI', {
	extend : 'Ext.Panel', 
    constructor : function(config) {
        config = Ext.apply({
            border : false,
            id : 'JobRunUI',
            bodyStyle : 'padding : 15px;',
            toolkit : Ext.ijobs.common.Kit,
            layout : 'form'
        }, config);
        /*Ext.ijobs.job.JobRunUI.superclass.constructor.call(this, config);*/
        this.callParent(arguments);
    },
    COMPONENTS : {},
    initComponent : function() {
        this.items = [
            this._createJobNamePanel(), 
            this._createJobInfoPanel(), 
            this._createJobStepInfoPanel()
        ];
        this.callParent(arguments);
    },

    /**
     * 创建作业名称 与 查看作业实例按钮的面板
     * 
     * @return {}
     */
    _createJobNamePanel : function() {
        return {
        	
            height : 25,
            layout : 'column',
            border : false,            
            items : [{
            			columnWidth : 1,
                        flex : 1,
                        layout : 'column',
                        border : false,
                        items : [{
                                    id : 'txtTaskName',
                                    xtype : 'label',
                                    style : 'font-size:16pt;'
                                }, {
                                	xtype : 'container',
                                	style : 'padding-left:20px;padding-top: 6px;',
                                	items : [{
                                		id : 'txtStarter',
                                		//labelStyle : 'font-size:14px;',
                                        xtype : 'displayfield',
                                        labelWidth : 50,
                                        fieldLabel : '启动人',
                                	}]
           
                                }]
                    }, {                        
                        width : 240,
                        border : false,
                        items : [{
                        	id : 'viewJobInstanceBtn',
                        	width : 130,
                            xtype : 'button',
                        	cls : 'opera btn_main long',
                            text : '<i class="icon-file icon-white"></i>&nbsp;查看作业实例'
                        }]
                        
                    }]
        };
    },

    /**
     * 创建作业相关信息的面板
     * 
     * @return {}
     */
    _createJobInfoPanel : function() {
    	var me = this;
    	var panel = new Ext.Panel({
            border : false,
            bodyStyle : 'padding-left : 1px;padding-top : 5px;',
            //height : 110,
            autoHeight :true,
            layout : 'column',
            items : [{
            	columnWidth : 1,
            	border : false,
            	items : [{
            		xtype : 'panel',
            		border : false,
            		width : 500,
            		layout : {
                		type : 'table',
                		columns: 2
                	},
                	defaults : {
                		xtype : 'displayfield',
                		labelWidth : 55
                	},
                	items : [{
                		id : 'txtApplicationName',
                		width : 220,
                		fieldLabel : '开发商'
                	},{
                		id : 'txtStartTime',
                		fieldLabel : '开始时间'
                	},{
                		id : 'txtTotalTime',
                		fieldLabel : '总耗时'
                	},{
                		id : 'txtEndTime',
                		fieldLabel : '结束时间'
                	},{
                		id : 'txtApplicationDes',
                		fieldLabel : '作业备注',
                		colspan: 2
                	}]
            			
            	}],
            	
            },{
                width : 300,
                layout : 'form',
                border : false,
                labelWidth : 100,
                items : [{
                            height : 40,
                            border : false
                        }, {
                            id : 'txtStateName',
                            xtype : 'displayfield',
                            fieldLabel : '作业状态',
                            labelStyle : 'font-size:16pt;',
                            fieldStyle : 'font-size:16pt;'
                        }]
                }, {
                    width : 270,
                    xtype : 'container',
                    //height : 40,
                    layout : {
                        type : 'form',
                        align : 'middle'
                    },
                    style : 'padding-left: 30px' ,
                    items : [{
                        id : 'restartJobBtn',
                        width : 130,
                        xtype : 'button',
                        text : '从头执行',
                        hidden : true,
                        cls : 'opera btn_main'                                
                    },{
                        id : 'stopJobBtn',
                        xtype : 'button',
                        width : 130,
                        text : '提前结束',
                        hidden : true,
                        //style : 'margin-left: 25px',
                        cls : 'opera btn_main'                            
                    }]
            }]
        });
        this.COMPONENTS.jobInfoPanel = panel ;
    	return panel; 
    },

    /**
     * 创建步骤信息面板
     */
    _createJobStepInfoPanel : function() {
        return {
            flex : 1,
            layout : 'column',
            columnWidth : 1, 
            border : false,
            items : [
                 this._createJobStepGridPanel(), 
                 this._createJobControlButtonPanel()
            ]
        };
    },

    /**
     * 创建步骤列表面板
     */
    _createJobStepGridPanel : function() {
        var oThis = this;
        var toolkit = oThis.toolkit;
        var store = new Ext.data.JsonStore({
            fields : ["id", "tsyscId", "retryCount", "idx", "name", "badIPNum", "totalIPNum", "startTime", "endTime", "totalTime", "state", "stepType", "operator", "btnList"]
        });
        /*var sm = new Ext.grid.RowSelectionModel({
            singleSelect : true
        });*/        
        var stepGrid = new Ext.grid.GridPanel({
        	columnWidth : 1,
            id : 'stepGrid',
            //sm : sm,
            style : 'padding-top:5px',
            columns : [{
                header : "id",
                dataIndex : "id",
                hidden : true,
                width : 20
            }, {
                header : "TSCId",
                dataIndex : "tsyscId",
                hidden : true,
                width : 20
            }, {
                header : "retryCount",
                dataIndex : "retryCount",
                hidden : true,
                width : 20
            }, {
                header : "序号",
                dataIndex : "idx",
                align : 'center',
                width : 20
            }, {
                header : "步骤名称",
                dataIndex : "name"
            }, {
                header : "JobIP数(检测失败/总)",
                dataIndex : "badIPNum",
                align : 'center',
                width : 35,
                renderer : function(value, cellMeta, record, rowIndex, colIndex, store) {
                    var jobIPNum = record.get('totalIPNum');
                    if (!Ext.isNumber(jobIPNum)) {
                        jobIPNum = 0;
                    }
                    var badIPNum = Ext.isNumber(value) ? value : 0;
                    if (badIPNum > 0) {
                        return '<font color="red">' + badIPNum + '</font>' + '/' + jobIPNum;
                    } else {
                        return badIPNum + '/' + jobIPNum;
                    }
                }
            }, {
                header : "步骤耗时",
                dataIndex : "totalTime",
                align : 'center',
                width : 30
            }, {
                header : "步骤执行人",
                dataIndex : "operator",
                align : 'center',
                width : 30
            }, {
                header : "状态",
                dataIndex : "state",
                align : 'center',
                width : 30,
                renderer : function(value, cellMeta, record, rowIndex, colIndex, store) {
                    return toolkit.getStateByType(toolkit.STATE_TYPE.RUN_STATUS, value);
                }
            }],         
            stripeRows : false,
            frame : false,
            store : store,
            forceFit : true,
            viewConfig : {
                getRowClass : function(record, rowIndex, rp, ds) {
                    if (record.get('id') == oThis.jobInstance.currentStepId) {
                        return 'x-grid-row-setp-current';
                    }
                    var rowClass = '';
                    switch (record.get('state')) {
                        case 5 :// 跳过
                            rowClass = 'x-grid-row-selected;x-grid-row-setp-skip';
                            break;
                        case 6 :// 忽略错误
                            rowClass = 'x-grid-row-selected;x-grid-row-setp-Ignore';
                            break;
                        case 4 :// 执行失败
                            rowClass = 'x-grid-row-selected;x-grid-row-setp-fail';
                            break;
                        default :
                            break;
                    }
                    return rowClass;
                }
            },
            columnLines : true
        });
        this.COMPONENTS.jobStepGridPanel = stepGrid; 
        return stepGrid;
    },
    
    /**
     * 创建作业控制按钮面板
     */
    _createJobControlButtonPanel : function() {
        return {
            width : 270,
            border : false,
            layout : 'form',
            defaults : {
            	style : 'margin-top: 5px;',
            	xtype : 'button',
            	hidden : true,
            	cls : 'opera btn_main',
                minWidth  : 130
            },
            style : 'padding-left: 30px;',
            items : [{
                        id : 'restartStepBtn',
                        text : '<font>　步骤重做　</font>'
                    }, {
                        id : 'ignoreErrorBtn',                     
                        text : '<font>　忽略错误　</font>'                        
                    }, {
                        id : 'runStepBtn',
                        text : '<font>　　执行　　</font>'                        
                    }, {
                        id : 'jumpStepBtn',
                        text : '<font>　　跳过　　</font>'
                    }, {
                        id : 'forceStopStepBtn',
                        text : '<font>强制终止步骤</font>'
                    }, {
                        id : 'nextStepBtn',
                        text : '<font>进入下一步骤</font>'
                    }]
        };
    },

    /**
     * 创建步骤详情页面
     */
    _createStepDetailInfoWindow : function(record) {
        if (!this.stepDetailInfoWindow) {
            this.stepDetailInfoWindow =  Ext.create('Ext.ijobs.job.StepDetailInfoWindow', {
                jobInstanceId : this.jobInstanceId,
                jobApplicationId : this.jobInstance.applicationId,
                jobStarter : this.jobInstance.starter
            });
        }

        this.stepDetailInfoWindow.showStep(record);
        //this.toolkit.transButtons();
    }
});

/**
 * 作业执行页面事件
 * 
 * @class Ext.ijobs.job.JobRunAction
 * @extends Ext.ijobs.job.JobRunUI
 */
Ext.define('Ext.ijobs.job.JobRunAction', {
	extend : 'Ext.ijobs.job.JobRunUI',
    constructor : function(config) {
    	this.callParent(arguments);
    },
    initComponent : function() {
    	this.callParent(arguments);        
        Ext.apply(this.COMPONENTS, {
            'stepGrid' : this.findById('stepGrid'),
            'viewJobInstanceBtn' : this.findById('viewJobInstanceBtn'),
            'restartJobBtn' : this.findById('restartJobBtn'),
            'stopJobBtn' : this.findById('stopJobBtn'),
            'restartStepBtn' : this.findById('restartStepBtn'),
            'ignoreErrorBtn' : this.findById('ignoreErrorBtn'),
            'runStepBtn' : this.findById('runStepBtn'),
            'jumpStepBtn' : this.findById('jumpStepBtn'),
            'forceStopStepBtn' : this.findById('forceStopStepBtn'),
            'nextStepBtn' : this.findById('nextStepBtn'),
            'txtTaskName' : this.findById('txtTaskName'),
            'txtApplicationName' : this.findById('txtApplicationName'),
            'txtStartTime' : this.findById('txtStartTime'),
            'txtEndTime' : this.findById('txtEndTime'),
            'txtTotalTime' : this.findById('txtTotalTime'),
            'txtStarter' : this.findById('txtStarter'),
            'txtStateName' : this.findById('txtStateName'),
            'txtApplicationDes' : this.findById('txtApplicationDes')
        });
        
    },
    initEvents : function() {
    	this.callParent(arguments);
        this.COMPONENTS.viewJobInstanceBtn.on('click', this._event_viewJobInstance, this);
        this.COMPONENTS.restartJobBtn.on('click', this._event_restartJob, this);
        this.COMPONENTS.stopJobBtn.on('click', this._event_stopJob, this);
        this.COMPONENTS.restartStepBtn.on('click', this._event_restartStep, this);
        this.COMPONENTS.ignoreErrorBtn.on('click', this._event_ignoreError, this);
        this.COMPONENTS.runStepBtn.on('click', this._event_runStep, this);
        this.COMPONENTS.jumpStepBtn.on('click', this._event_jumpStep, this);
        this.COMPONENTS.forceStopStepBtn.on('click', this._event_forceStopStep, this);
        this.COMPONENTS.nextStepBtn.on('click', this._event_nextStep, this);
        this.COMPONENTS.stepGrid.addListener('rowclick', this._event_stepGridRowClick, this);
        this.COMPONENTS.stepGrid.getStore().addListener('load', this._event_stepStoreLoad, this); 
        //this._delayedReInit();
    },
    
    lastRefreshTime : 0, //最后一次刷新时间
	
    refreshing : false , //页面刷新中，控制当有一个请求在执行时，不会发起新的页面刷新请求
    
    taskRunner : new Ext.util.TaskRunner(), // 定时器

    /**
     * 是否遮罩面板
     */
    _maskPanel : function(isMask) {
        if (isMask) {
            this.getEl().mask('后台处理中...');
        } else {
            this.getEl().unmask();
        }
    },

    /**
     * 查看作业实例
     */
    _event_viewJobInstance : function() {   
    	openNewTab('./jobs/jobInstanceView.jsp?jobInstanceId=' + this.jobInstance.id, '查看实例【' + this.jobInstance.name + '】');    	
    },

    /**
     * 统一的后台Ajax请求发送方法
     * 
     * @param {} url
     */
    _doAjaxRequest : function(url) {
        this._maskPanel(true);
        this._disableBtn();
        var othis = this;
        Ext.Ajax.request({
            url : url,
            success : function(response, opts) {
                printMsg('后台处理成功', 1);
                othis._maskPanel(false);
            },
            failure : function(response, opts) {
                printMsg('AJAX请求发生异常，请刷新页面后重试。异常代码:' + response.status, 2);
                othis._maskPanel(false);
            },
            params : {
                "appID" : othis.jobInstance.applicationId,
                "creater" : othis.jobInstance.starter,
                "jobInstanceId" : othis.jobInstance.id,
                "stepInstanceId" : othis.jobInstance.currentStepId
            }
        });
    },

    /**
     * 从头执行本作业
     */
    _event_restartJob : function() {

    	this._doAjaxRequest('./jobs/restartTaskIFromBegin.action');
        this._delayedReInit();
    },

    /**
     * 提前结束本作业
     */
    _event_stopJob : function() {
        this._doAjaxRequest('./jobs/stopTaskI.action');
        this._delayedReInit();
    },

    /**
     * 重新执行本步骤
     */
    _event_restartStep : function() {
        this._doAjaxRequest('./jobs/restartTaskIStep.action');
        this._delayedReInit();
    },

    /**
     * 忽略错误
     */
    _event_ignoreError : function() {
        this._doAjaxRequest('./jobs/obmitError.action');
        this._delayedReInit();
    },

    /**
     * 开始执行步骤
     */
    _event_runStep : function() {
        if (4 == this.currentStepType) {
            // 文本步骤
            this._event_runStepForTextStep();
        } else {
            this._doAjaxRequest('./jobs/startTaskIStep.action');
            this._delayedReInit();
        }
    },

    /**
     * 文本步骤的执行
     */
    _event_runStepForTextStep : function() {
        var win = new Ext.ijobs.job.JobRunTextWindowAction({
        	jobInstanceId : this.jobInstanceId,
            currentStepId : this.jobInstance.currentStepId,
            currentStepRetryCount : this.currentStepRetryCount
        });
        win.show(this);
    },

    /**
     * 跳过步骤
     */
    _event_jumpStep : function() {
        this._doAjaxRequest('./jobs/jumpTaskIStep.action');
        this._delayedReInit();
    },

    /**
     * 强制终止步骤
     */
    _event_forceStopStep : function() {
        this._doAjaxRequest('./jobs/forceStopJobStep.action');
        this._delayedReInit();
    },

    /**
     * 进入下一步
     */
    _event_nextStep : function() {
        this._doAjaxRequest('./jobs/nextJobStep.action');
        this._delayedReInit();
    },

    /**
     * 步骤列表点击事件
     * 
     * @param {} grid
     * @param {} rowIndex
     * @param {} e
     */
    _event_stepGridRowClick : function(grid, rec, item, rowIndex ) {
        this._createStepDetailInfoWindow(rec);
    },
	
    /**
     * 步骤数据加载事件
     */
    _event_stepStoreLoad : function() {
    	var view = this.COMPONENTS.stepGrid.getView();
    	view.focusRow.defer(30,view,[this.jobInstance.currentStepIndex]);              
    },
    /**
     * 延时重新初始化
     */
    _delayedReInit : function(deferTime) {
        var deferTimeT = (Ext.isNumber(deferTime) ? deferTime : 1500);
        this.taskRunner.stopAll();
        this._disableBtn();
        this.initViewData.defer(deferTimeT, this, [this.jobInstanceId]);
    },

    /**
     * 初始化执行页面数据
     */
    initViewData : function(jobInstanceId) {
    	
        this.taskRunner.stopAll();
        this.jobInstance = null;
        this.jobRunPageRefreshTask = null;
        this.jobInstanceId = jobInstanceId;
        // 启动执行页面的初始化
        this._refreshJobRunView({
            initReq : true,
            jobInstanceId : jobInstanceId
        });
        // 启动执行页面的定时调度
        this.jobRunPageRefreshTask = {
            run : function() {
                if (this.jobInstance) {
                    // 作业执行中或者强制终止中时，才刷新后台请求。
                    if (this.jobInstance.state != 2 && this.jobInstance.state != 10) {
                        this.taskRunner.stopAll();
                        return;
                    }
                    if (!this.refreshing) {
                    	this.refreshing = true;
	                    this._refreshJobRunView({
	                        jobInstanceId : this.jobInstance.id,
	                        jobState : this.jobInstance.state,
	                        stepInstanceId : this.jobInstance.currentStepId,
	                        stepState : this.currentStepState
	                    });
                    }
                }
            },
            interval : 2500, // 刷新间隔2.5秒
            scope : this
        };
        this.taskRunner.start(this.jobRunPageRefreshTask);
    },

    /**
     * 刷新作业执行页面
     */
    _refreshJobRunView : function(params) {
        var oThis = this;
        Ext.Ajax.request({
            url : './jobs/getTaskExePage.action',
            //url : 'js/test_date/getTaskExePage.action.txt',
            success : function(response, opts) {
            	try  {
                	var result = Ext.decode(response.responseText, true);
                	oThis.setViewData(result);
            	} catch(e) {            		
            	}
                oThis.refreshing = false;
            },
            failure : function(response, opts) {
                printMsg('AJAX请求发生异常，请刷新页面后重试。异常代码:' + response.status, 2);
                oThis.refreshing = false;
            },
            params : params
        });
    },

    /**
     * 根据参数禁用属性
     */
    _disableBtn : function(btnList) {
        /**
         * EXESTEP((short)0,       "执行"), SKIPSTEP((short)1,      "跳过"), REDOSTEP((short)2,      "重新执行本步骤"),
         * IGNOREERROR((short)3,   "忽略错误"), STOPJOB((short)4,       "提前结束作业"), RESTARTJOB((short)5,    "从头执行本作业"),
         * FORCESKIPSTEP((short)6, "强行跳过步骤"), FORCESTOP((short)7,     "强制终止"), NEXTSTEP((short)8,      "进入下一步")
         */
        this.COMPONENTS.restartJobBtn.hide();
        this.COMPONENTS.stopJobBtn.hide();
        this.COMPONENTS.restartStepBtn.hide();
        this.COMPONENTS.ignoreErrorBtn.hide();
        this.COMPONENTS.runStepBtn.hide();
        this.COMPONENTS.jumpStepBtn.hide();
        this.COMPONENTS.forceStopStepBtn.hide();
        this.COMPONENTS.nextStepBtn.hide();
        if (Ext.isArray(btnList)) {
            if (btnList.indexOf(0) >= 0) {
                this.COMPONENTS.runStepBtn.show();
            }
            if (btnList.indexOf(1) >= 0) {
                this.COMPONENTS.jumpStepBtn.show();
            }
            if (btnList.indexOf(2) >= 0) {
                this.COMPONENTS.restartStepBtn.show();
            }
            if (btnList.indexOf(3) >= 0) {
                this.COMPONENTS.ignoreErrorBtn.show();
            }
            if (btnList.indexOf(4) >= 0) {
                this.COMPONENTS.stopJobBtn.show();
            }
            if (btnList.indexOf(5) >= 0) {   
                this.COMPONENTS.restartJobBtn.show();
            }
            if (btnList.indexOf(6) >= 0) {

            }
            if (btnList.indexOf(7) >= 0) {
                this.COMPONENTS.forceStopStepBtn.show();
            }
            if (btnList.indexOf(8) >= 0) {
                this.COMPONENTS.nextStepBtn.show();
            }
        }
    },

    /**
     * 设置界面的显示数据
     * 
     * @param {} data
     */
    setViewData : function(data) {

        if (Ext.isObject(data)) { // 需要刷新数据
        	if (this.lastRefreshTime < data.reqTime && data.isNeedRefresh) {
        		
        		this.lastRefreshTime = data.reqTime;
	            this.currentStepState = null;
	            this.currentStepType = null;
	            this._disableBtn();
	            if (Ext.isObject(data.jobInstance)) {
	                this.jobInstance = data.jobInstance;
	                this.COMPONENTS.txtTaskName.setText(this.jobInstance.name);
	                this.COMPONENTS.txtApplicationName.setRawValue(this.jobInstance.applicationName);
	                this.COMPONENTS.txtStartTime.setRawValue(this.jobInstance.startTime);
	                this.COMPONENTS.txtEndTime.setRawValue(this.jobInstance.endTime);
	                this.COMPONENTS.txtTotalTime.setRawValue(this.jobInstance.totalTime);
	                this.COMPONENTS.txtApplicationDes.setRawValue(Ext.value(this.jobInstance.des,'无'));
	                this.COMPONENTS.txtStarter.setValue(this.jobInstance.starter);
	                this.COMPONENTS.txtStateName.setRawValue(this.toolkit.getStateByType(this.toolkit.STATE_TYPE.RUN_STATUS, this.jobInstance.state));
	                this.doLayout();//防止备注太长，设置完值后刷新页面
	            }
	            if (Ext.isArray(data.stepInstanceList)) {
	            	var store = this.COMPONENTS.stepGrid.getStore();
	                store.loadData(data.stepInstanceList); 
	                this.COMPONENTS.stepGrid.doLayout();
	                var record = store.getById(this.jobInstance.currentStepId);

	                if (record) {
	                    this.currentStepState = record.get('state');
	                    this.currentStepType = record.get('stepType');
	                    this.currentStepRetryCount = record.get('retryCount');
	                    this._disableBtn(record.get('btnList'));
	                }
	            }
	        }
        }
    }
});