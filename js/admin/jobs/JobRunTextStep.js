Ext.ns('Ext.ijobs.job.JobRun');

/**
 * Text步骤详情页面
 * 
 * @class Ext.ijobs.job.JobRunTextStepUI
 * @extends Ext.Container
 */
Ext.ijobs.job.JobRunTextStepUI = Ext.extend(Ext.Panel, {
    constructor : function(config) {
        config = Ext.apply({
            id : 'JobRunTextStepPanel',
            border : false,
            toolkit : Ext.ijobs.common.Kit,
            layout : 'vbox',
            layoutConfig : {
                align : 'stretch',
                pack : 'start'
            }
        }, config);
        Ext.ijobs.job.JobRunTextStepUI.superclass.constructor.call(this, config);
    },
    initComponent : function() {
        this.items = [this._createStepInfoPanel()];
        Ext.ijobs.job.JobRunTextStepUI.superclass.initComponent.call(this);
    },
    _createStepInfoPanel : function() {
        return {
            id : 'StepInfoPanel',
            width : 150,
            layout : 'form',
            border : false,
            labelWidth : 100,
            itemCls : 'x-instance-form-item',
            items : [{
                        id : 'TextStep_txtStepStarter',
                        xtype : 'displayfield',
                        fieldLabel : '执行人',
                        value : '',
                        style : 'padding-top: 3px;'
                    }, {
                        id : 'TextStep_txtStepStartTime',
                        xtype : 'displayfield',
                        fieldLabel : '开始时间',
                        value : '',
                        style : 'padding-top: 3px;'
                    }, {
                        id : 'TextStep_txtStepEndTime',
                        xtype : 'displayfield',
                        fieldLabel : '结束时间',
                        value : '',
                        style : 'padding-top: 3px;'
                    }, {
                        id : 'TextStep_txtStepTotalTime',
                        xtype : 'displayfield',
                        fieldLabel : '总耗时',
                        value : '',
                        style : 'padding-top: 3px;'
                    }, {
                        id : 'TextStep_txtStepDescription',
                        xtype : 'panel',
                        layout : 'fit',
                        frame : true,
                        autoScroll : true,
                        width : 800,
                        height : 280,
                        style : 'padding-top: 3px;'
                    }
            ],
            buttonAlign : 'left',
            buttons : [{
                        width : 100,
                        xtype : 'button',
                        id : 'TextStep_detailRunStepBtn',
                        text : '执行',
                        hidden : true
                    }, {
                        width : 100,
                        xtype : 'button',
                        id : 'TextStep_detailJumpStepBtn',
                        text : '跳过',
                        hidden : true
                    }]
        };
    }
});

Ext.ijobs.job.JobRunTextStepAction = Ext.extend(Ext.ijobs.job.JobRunTextStepUI, {
    constructor : function(config) {
        Ext.ijobs.job.JobRunTextStepAction.superclass.constructor.call(this, config);
    },
    initComponent : function() {
        Ext.ijobs.job.JobRunTextStepAction.superclass.initComponent.call(this);
        Ext.apply(this.COMPONENTS, {
            'StepInfoPanel' : this.findById('StepInfoPanel'),
            'txtStepStarter' : this.findById('TextStep_txtStepStarter'),
            'txtStepStartTime' : this.findById('TextStep_txtStepStartTime'),
            'txtStepEndTime' : this.findById('TextStep_txtStepEndTime'),
            'txtStepTotalTime' : this.findById('TextStep_txtStepTotalTime'),
            'txtStepDescription' : this.findById('TextStep_txtStepDescription'),
            'runStepBtn' : Ext.getCmp('TextStep_detailRunStepBtn'),
            'jumpStepBtn' : Ext.getCmp('TextStep_detailJumpStepBtn')
        });
    },
    initEvents : function() {
        Ext.ijobs.job.JobRunTextStepAction.superclass.initEvents.call(this);
        this.addListener('beforedestroy', this._event_beforedestroy, this);
        this.COMPONENTS.runStepBtn.on('click', this._event_runStep, this);
        this.COMPONENTS.jumpStepBtn.on('click', this._event_jumpStep, this);
    },

    COMPONENTS : {},
    
    lastRefreshTime : 0, //最后一次刷新时间
    
    stepDetailsMD5 : "initMD5", //页面信息MD5码
    
    refreshing : false , //页面刷新中，控制当有一个请求在执行时，不会发起新的页面刷新请求

    taskRunner : new Ext.util.TaskRunner(), // 定时器

    /**
     * 是否遮罩面板
     */
    _maskPanel : function(isMask, text) {
        if (isMask) {
            if (Ext.isString(text)) {
                t = text;
            } else {
                t = '后台处理中...';
            }
            Ext.getCmp('stepDetailPanel').getEl().mask(t);
        } else {
            Ext.getCmp('stepDetailPanel').getEl().unmask();
        }
    },

    /**
     * 统一的后台Ajax请求发送方法
     * 
     * @param {} url
     * @param {} addRetryCount 增加重试次数
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
                "appID" : othis.jobApplicationId,
                "creater" : othis.jobStarter,
                "jobInstanceId" : othis.jobInstanceId,
                "stepInstanceId" : othis.stepInstanceDetails.id
            }
        });
    },

    _event_beforedestroy : function() {
        this.taskRunner.stopAll();
        this._maskPanel(false);
    },

    /**
     * 开始执行步骤
     */
    _event_runStep : function() {
        this._doAjaxRequest('./jobs/startTaskIStep.action');
        this._delayedReInit();
    },

    /**
     * 跳过步骤
     */
    _event_jumpStep : function() {
        this._doAjaxRequest('./jobs/jumpTaskIStep.action');
        this._delayedReInit();
    },

    /**
     * 延时重新刷新
     */
    _delayedReInit : function() {
        Ext.getCmp('JobRunUI')._delayedReInit();
        this.taskRunner.stopAll();
        this.initViewData.defer(1500, this, [this.stepInstanceDetails.id, this.stepInstanceDetails.retryCount]);
    },

    /**
     * 初始化页面数据
     */
    initViewData : function(stepInstanceId, retryCount) {
        this.taskRunner.stopAll();
        this.stepInstanceDetails = null;
        this.stepDetailPageRefreshTask = null;
        // 启动执行页面的初始化
        this._refreshStepDetailView({
            initReq : true,
            jobInstanceId : this.jobInstanceId,
            stepInstanceId : stepInstanceId,
            retryCount : retryCount
        });
        // 启动执行页面的定时调度
        this.stepDetailPageRefreshTask = {
            run : function() {
                if (this.stepInstanceDetails) {
                    if (this.stepInstanceDetails.state != 2) {
                        this.taskRunner.stopAll();
                        return;
                    }
                    if (!this.refreshing) {
                    	this.refreshing = true;
	                    this._refreshStepDetailView({
	                        jobInstanceId : this.jobInstanceId,
	                        stepInstanceId : this.stepInstanceDetails.id,
	                        retryCount : this.stepInstanceDetails.retryCount,
	                        stepState : this.stepInstanceDetails.state,
	                        stepDetailsMD5 : this.stepDetailsMD5
	                    });
                    }
                }
            },
            interval : 2500, // 刷新间隔2.5秒
            scope : this
        };
        this.taskRunner.start(this.stepDetailPageRefreshTask);
    },

    /**
     * 刷新步骤详情页面
     */
    _refreshStepDetailView : function(params) {
        var oThis = this;
        Ext.Ajax.request({
            url : './jobs/getStepDetails.action',
            //url : 'js/test_date/getStepDetails.action.txt',
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
        this.COMPONENTS.runStepBtn.hide();
        this.COMPONENTS.jumpStepBtn.hide();
        if (Ext.isArray(btnList)) {
            if (btnList.indexOf(0) >= 0) {
                this.COMPONENTS.runStepBtn.show();
            }
            if (btnList.indexOf(1) >= 0) {
                this.COMPONENTS.jumpStepBtn.show();
            }
        }
    },

    /**
     * 设置界面的显示数据
     * 
     * @param {} data
     */
    setViewData : function(data) {
        if (Ext.isObject(data) && this.lastRefreshTime < data.reqTime ) { // 需要刷新数据
        	this.lastRefreshTime = data.reqTime;
        	if (Ext.isString(data.stepDetailsMD5)) {
        		this.stepDetailsMD5 = data.stepDetailsMD5; //页面信息MD5码
        	}
            if (Ext.isObject(data.stepInstanceDetails)) { // 需要刷新步骤详情
                this.stepInstanceDetails = data.stepInstanceDetails;
                this.COMPONENTS.txtStepStarter.setRawValue(this.stepInstanceDetails.operator);
                this.COMPONENTS.txtStepStartTime.setRawValue(this.stepInstanceDetails.startTime);
                this.COMPONENTS.txtStepEndTime.setRawValue(this.stepInstanceDetails.endTime);
                this.COMPONENTS.txtStepTotalTime.setRawValue(this.stepInstanceDetails.totalTime);
                this.COMPONENTS.txtStepDescription.update('<pre style="font: normal 12px 微软雅黑,宋体,sans-serif,Arial;">' + this.stepInstanceDetails.description + '</pre>');
                this._disableBtn(this.stepInstanceDetails.btnList);
            }
        }
    }
});
