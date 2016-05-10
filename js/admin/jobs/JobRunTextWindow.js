Ext.ns('Ext.ijobs.job.JobRun');

/**
 * Text弹出框
 * 
 * @class Ext.ijobs.job.JobRunTextStepUI
 * @extends Ext.Container
 */
Ext.ijobs.job.JobRunTextWindowUI = Ext.extend(Ext.Window, {
    constructor : function(config) {
        config = Ext.apply({
            title : '确认',
            layout : 'fit',
            width : 600,
            height : 400,
            modal : true,
            closeAction : 'close',
            plain : true
        }, config);
        Ext.ijobs.job.JobRunTextWindowUI.superclass.constructor.call(this, config);
    },
    initComponent : function() {
        this.items = [this._createStepTextPanel()];
        this.buttons = [{
                    id : 'TextStepWindowBtnOK',
                    text : '了解'
                }, {
                    id : 'TextStepWindowBtnCancel',
                    text : '取消'
                }]
        Ext.ijobs.job.JobRunTextWindowUI.superclass.initComponent.call(this);
    },

    _createStepTextPanel : function() {
        return {
            id : 'textStepDescTextPanel',
            frame : true,
            autoScroll : true
        };
    }
});

Ext.ijobs.job.JobRunTextWindowAction = Ext.extend(Ext.ijobs.job.JobRunTextWindowUI, {
    constructor : function(config) {
        Ext.ijobs.job.JobRunTextWindowAction.superclass.constructor.call(this, config);
    },
    initComponent : function() {
        Ext.ijobs.job.JobRunTextWindowAction.superclass.initComponent.call(this);
        Ext.apply(this.COMPONENTS, {
            'textStepDescTextPanel' : this.findById('textStepDescTextPanel'),
            'TextStepWindowBtnOK' : Ext.getCmp('TextStepWindowBtnOK'),
            'TextStepWindowBtnCancel' : Ext.getCmp('TextStepWindowBtnCancel')
        });
    },
    initEvents : function() {
        Ext.ijobs.job.JobRunTextWindowAction.superclass.initEvents.call(this);
        this.addListener('beforeshow', this._event_beforeshow, this);
        this.COMPONENTS.TextStepWindowBtnOK.on('click', this._event_TextStepWindowBtnOK, this);
        this.COMPONENTS.TextStepWindowBtnCancel.on('click', this._event_TextStepWindowBtnCancel, this);
    },

    COMPONENTS : {},

  	_event_beforeshow : function() {
  		Ext.Ajax.request({
            url : './jobs/getStepDetails.action',
            success : function(response, opts) {
                try {
	                var result = Ext.decode(response.responseText, true);
	                this.COMPONENTS.textStepDescTextPanel.update('<pre style="font: normal 12px 微软雅黑,宋体,sans-serif,Arial;">' + result.stepInstanceDetails.description + '</pre>');
                } catch(e) {
            	}
            },
            failure : function(response, opts) {
                printMsg('AJAX请求发生异常，请刷新页面后重试。异常代码:' + response.status, 2);
            },
            params : {
                initReq : true,
                jobInstanceId : this.jobInstanceId,
                stepInstanceId : this.currentStepId,
                retryCount : this.currentStepRetryCount
            },
            scope : this
        });
  	},
  	
  	_event_TextStepWindowBtnOK : function() {
  		Ext.getCmp('JobRunUI')._doAjaxRequest('./jobs/startTaskIStep.action');
        Ext.getCmp('JobRunUI')._delayedReInit();
  		this.close();
  	},
  	
  	_event_TextStepWindowBtnCancel : function() {
  		this.close();
  	}
});
