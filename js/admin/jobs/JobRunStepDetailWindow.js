/**
 * 步骤执行详情页面
 * 
 * @class Ext.ijobs.job.StepDetailInfoWindow
 * @extends Ext.Window
 */
Ext.define('Ext.ijobs.job.StepDetailInfoWindow',{
	extend:'Ext.Window', 
    constructor : function(config) {
        config = Ext.apply({
            frame : false,
            closable : false,
            id : 'StepDetailInfoWindow',
            toolkit : Ext.ijobs.common.Kit,
            resizable : false,
            draggable : false,
            maximized : true,
            closeAction : 'hide',
            border : false,
            plan : true,
            modal : true,
            bodyStyle: 'background-color: #ffffff; padding: 10px;',
            style : {
            	border: 0,
            	borderStyle: 'none',
            	padding : 0,
            	'border-radius': 0
            },
            layout: {
                type: 'vbox',
                pack : 'start',
                align: 'stretch'
            }
            /*layoutConfig : {
                align : 'stretch',
                pack : 'start'
            }*/
        }, config);
        this.callParent(arguments);
    },
    initComponent : function() {
        this.items = [this._createNavigation(),this._createStepTitleInfoPanel(), this._createStepDetailPanel()];
        this.callParent(arguments);
        Ext.apply(this.COMPONENTS, {
            'txtStepName' : this.findById('txtStepName'),
            'txtStepTypeName' : this.findById('txtStepTypeName'),
            'stepDetailPanel' : this.findById('stepDetailPanel'),
            'stepRetryCountPanel' : this.findById('stepRetryCountPanel'),
            'stepNavigation' : this.findById('stepNavigation'),
            'stepTitleInfoPanel' : this.findById('stepTitleInfoPanel')
        });
    },
    afterRender : function(){
    	this.callParent(arguments);
        //this.toolkit.transButtons();
    },
    initEvents : function() {
    	this.callParent(arguments);
        this.addListener('hide', this._event_hideFun, this)
        this.findById('returnJobPageBtn').on('click', this._event_returnJobPage, this);
        this.findById('preStepDetailPageBtn').on('click', this._event_preStepDetailPage, this);
        this.findById('nextStepDetailPageBtn').on('click', this._event_nextStepDetailPage, this);
    },
    COMPONENTS : {},

    curViewStepInstance : {}, // 当前显示的步骤信息

    /**
     * 创建步骤详情窗口导航条
     * 
     * @return {}
     */
    _createNavigation : function() {
        return {
            id : 'stepNavigation',
            border : false,
            height : 40,
            layout : {
                type : 'hbox',
                align : 'middle'
            },
            items : [{
                        id : 'returnJobPageBtn',
                        xtype : 'button',
                        text : '<i class="icon-share-alt icon-white"></i>&nbsp;返回',
                        cls : 'opera btn_sec long',
                        style : 'margin-left: 10px;'
                    }, {
                        id : 'preStepDetailPageBtn',
                        xtype : 'button',
                        text : '<i class="icon-arrow-up icon-white"></i>&nbsp;上',
                        cls : 'opera btn_sec long',                        
                        style : 'margin-left: 10px;'
                    }, {
                        id : 'nextStepDetailPageBtn',
                        xtype : 'button',
                        text : '<i class="icon-arrow-down icon-white"></i>&nbsp;下',
                        cls : 'opera btn_sec long',
                        style : 'margin-left: 10px;'
                    }]
        };
    },

    /**
     * 创建步骤名称 执行次数导航条
     * 
     * @return {}
     */
    _createStepTitleInfoPanel : function() {
        return {
            id : 'stepTitleInfoPanel',
            border : false,
            height : 37,
            layout : 'column',
            items : [{
                        autoWidth : true,
                        id : 'txtStepName',
                        xtype : 'label',
                        text : '',
                        style : 'padding-top: 7px;padding-left: 10px;font-size:16pt;'
                    }, {
                        autoWidth : true,
                        id : 'txtStepTypeName',
                        xtype : 'label',
                        text : '',
                        style : 'padding-left:20px;padding-top: 15px;'
                    }, {
                        id : 'stepRetryCountPanel',
                        columnWidth : .99,
                        layout : 'column',
                        border : false
                    }]
        };
    },

    /**
     * 创建步骤详情面板
     * 
     * @return {}
     */
    _createStepDetailPanel : function() {
        return new Ext.Panel({
            flex : 1,
            id : 'stepDetailPanel',
            bodyStyle : 'padding-left:10px;padding-right:10px;padding-bottom:10px;',
            border : false,
            layout: {
                type: 'vbox',
                pack : 'start',
                align: 'stretch'
            }
        });
    },

    /**
     * 创建步骤的重试按钮
     */
    _createStepRetryCountBtn : function(retryCount) {    	
        var oThis = this;
        for (var index = 0; index <= retryCount; index++) {
            this.COMPONENTS.stepRetryCountPanel.add({
                width : 30,
                xtype : 'button',
                text : (index + 1),
                retryCount : index,
                tooltip : '第' + (index + 1) + '次执行',
                style : 'margin-top: 10px;margin-left: 10px;',
                handler : function() {
                    oThis.COMPONENTS.stepRetryCountPanel.items.each(function() {
                        this.removeClass('x-btn-default-small-pressed');
                    });
                    this.getEl().addClass('x-btn-default-small-pressed');
                    oThis._changeStepUI(this.retryCount);
                }
            });
        }
        this.COMPONENTS.stepRetryCountPanel.items.last().addClass('x-btn-default-small-pressed');
        this.COMPONENTS.stepTitleInfoPanel.doLayout();
    },

    /**
     * 延时重试步骤
     */
    _delayedRetryExecStep : function() {
        this._retryExecStep.defer(1500, this);
    },

    /**
     * 重新执行步骤
     * 
     * @param {} retryCount
     */
    _retryExecStep : function() {
        this.curViewStepInstance.retryCount = this.curViewStepInstance.retryCount + 1;
        var newRetryCount = this.curViewStepInstance.retryCount;
        this.COMPONENTS.stepRetryCountPanel.items.last().removeClass('x-btn-default-small-pressed');
        var oThis = this;
        this.COMPONENTS.stepRetryCountPanel.add({
            width : 30,
            xtype : 'button',
            text : (newRetryCount + 1),
            retryCount : newRetryCount,
            tooltip : '第' + (newRetryCount + 1) + '次执行',
            style : 'margin-top: 10px;margin-left: 10px;',
            handler : function() {
                oThis.COMPONENTS.stepRetryCountPanel.items.each(function() {
                    this.removeClass('x-btn-default-small-pressed');
                });
                this.getEl().addClass('x-btn-default-small-pressed');
                oThis._changeStepUI(this.retryCount);
            }
        });
        this.COMPONENTS.stepRetryCountPanel.items.last().addClass('x-btn-default-small-pressed');
        this.COMPONENTS.stepTitleInfoPanel.doLayout();
        this._changeStepUI(newRetryCount);
    },

    /**
     * 窗口隐藏事件回调方法
     */
    _event_hideFun : function() {
        this.curViewStepInstance = {};
        this.COMPONENTS.txtStepName.setText('');
        this.COMPONENTS.stepDetailPanel.removeAll();
        this.COMPONENTS.stepRetryCountPanel.removeAll();
    },

    /**
     * 返回按钮事件
     */
    _event_returnJobPage : function() {
        this.hide();
    },

    /**
     * 跳转到前一个步骤
     */
    _event_preStepDetailPage : function() {
        var stepGrid = Ext.getCmp('stepGrid');
        var store = stepGrid.getStore();
        //var index = stepGrid.getStore().indexOfId(this.curViewStepInstance.id);
        var index = this.curViewStepInstance.idx;
        /*if (index > 0) {
            var record = stepGrid.getStore().getAt(index - 1);
            this._changeViewRecord(record);
        } else */if (index == 1) {
            printMsg("已是第一个步骤", 2);
        } else {
            //var curIdx = (this.curViewStepInstance.idx > 2 ? this.curViewStepInstance.idx - 2 : 0);
        	var curIdx = index-2; 
            var record = stepGrid.getStore().getAt(curIdx);
            if (Ext.isObject(record)) {
                this._changeViewRecord(record);
            }
        }
    },

    /**
     * 跳转到后一个步骤
     */
    _event_nextStepDetailPage : function() {
        var stepGrid = Ext.getCmp('stepGrid');
        //var index = stepGrid.getStore().indexOfId(this.curViewStepInstance.id);
        var store = stepGrid.getStore();
        var index = this.curViewStepInstance.idx;
        if (index == store.getCount()) {
        	printMsg("已是最后一个步骤", 2);
        } else {
            //var curIdx = (this.curViewStepInstance.idx < stepGrid.getStore().getTotalCount() ? this.curViewStepInstance.idx : (stepGrid.getStore().getTotalCount() - 1));
        	var curIdx = index;
            var record = stepGrid.getStore().getAt(curIdx);
            if (Ext.isObject(record)) {
                this._changeViewRecord(record);
            }
        }
    },

    showStep : function(record) {    	
        this._changeViewRecord(record);
        this.show();
    },

    _changeViewRecord : function(record) {
    	
        this.curViewStepInstance = {
            'id' : record.get('id'),
            'name' : record.get('name'),
            'retryCount' : record.get('retryCount'),
            'idx' : record.get('idx'),
            'stepType' : record.get('stepType')
        };
        this.COMPONENTS.txtStepName.setText('');
        this.COMPONENTS.txtStepTypeName.setText('');
        this.COMPONENTS.stepRetryCountPanel.removeAll();
        this.COMPONENTS.txtStepName.setText(this.curViewStepInstance.idx + ' ' + this.curViewStepInstance.name);
        this.COMPONENTS.txtStepTypeName.setText(this.toolkit.getStateByType(this.toolkit.STATE_TYPE.STEP_TYPE, this.curViewStepInstance.stepType));
        this._createStepRetryCountBtn(this.curViewStepInstance.retryCount);
        this._changeStepUI(this.curViewStepInstance.retryCount);
    },

    _changeStepUI : function(retryCount) {
    	
        this.COMPONENTS.stepDetailPanel.removeAll();
        var stepUI = null;        
        if (4 == this.curViewStepInstance.stepType) {
            stepUI = new Ext.ijobs.job.JobRunTextStepAction({
                jobInstanceId : this.jobInstanceId,
                jobApplicationId : this.jobApplicationId,
                jobStarter : this.jobStarter,
                retryCount : this.curViewStepInstance.retryCount,//增加重试总数让详细页面判断是否为历史步骤
                flex : 1
            });
        } else {
            stepUI = new Ext.ijobs.job.JobRunTSCStepAction({
                jobInstanceId : this.jobInstanceId,
                jobApplicationId : this.jobApplicationId,
                jobStarter : this.jobStarter,
                retryCount : this.curViewStepInstance.retryCount,//增加重试总数让详细页面判断是否为历史步骤
                flex : 1
            });
        }
        stepUI.initViewData(this.curViewStepInstance.id, retryCount);
        this.COMPONENTS.stepDetailPanel.add(stepUI);
        this.COMPONENTS.stepDetailPanel.doLayout();
    }
});
