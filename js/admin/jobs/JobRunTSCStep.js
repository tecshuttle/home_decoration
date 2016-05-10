Ext.ns('Ext.ijobs.job.JobRun');

/**
 * TSC步骤详情页面
 * 
 * @class Ext.ijobs.job.JobRunTSCStepUI
 * @extends Ext.Container
 */
Ext.ijobs.job.JobRunTSCStepUI = Ext.extend(Ext.Panel, {
	requires : ['Ext.ux.data.PagingMemoryProxy'],
    constructor : function(config) {
        config = Ext.apply({
            id : 'JobRunTSCStepPanel',
            border : false,
            toolkit : Ext.ijobs.common.Kit,
            layout : 'vbox',
            IPPageSize : 100,
            layoutConfig : {
                align : 'stretch',
                pack : 'start'
            }
        }, config);
        Ext.ijobs.job.JobRunTSCStepUI.superclass.constructor.call(this, config);
    },
    initComponent : function() {
        this.items = [this._createStepInfoPanel(), this._createStepResultPanel()];
        Ext.ijobs.job.JobRunTSCStepUI.superclass.initComponent.call(this);        
    },
    _createStepInfoPanel : function(){
    	var panel = {
	    		extend : 'Ext.Panel', 
	    		border : false,
	            height : 120,
	            layout : {
	            	type : 'table',
	            	columns : 4,
	            	tableAttrs: {
	                    style: {
	                        width: '100%'
	                    }
	                }
	            },
	            items : [{
	            	tdAttrs : {
	            		style: {
	                        width: '170px'
	                    }
	                },
	            	width : 170,
	            	labelWidth : 85,
	            	xtype : 'displayfield',
	            	id : 'txeStepId',
	                fieldLabel : '步骤Id'
	            },{
	            	tdAttrs : {
	            		style: {
	                        width: '170px'
	                    }
	                },
	            	xtype : 'displayfield',
	            	id : 'txeStepSuccessIpnum',
	            	width : 170,
	                fieldLabel : '成功IP数量'
	            },{
	            	tdAttrs : {
	            		style: {
	                        width: '200px'
	                    }
	                },
	            	width : 200,
	            	id : 'txtStepStartTime',
	            	labelWidth : 55,
	            	xtype : 'displayfield',
	                fieldLabel : '开始时间'
	            },{
	            	tdAttrs : {
	                    valign : 'top'
	                },
	                xtype : 'container',
	                anchor : '80%',	            	
	            	border : true,
	            	rowspan: 4,            	    	
	            	items : [{
	            		width : '100%',
	            		//minWidth : 600,
	            		xtype : 'progressbar',
	                    text : '准备执行',
	                    id : 'stepProgressBar',
	                    cls : 'center-align'
	            	},{
                        layout : {
                            type : 'table',
                            columns : 6
                        },
                        id: 'detailBtnPanel',
                        style : 'padding-top:5px',
                        height : 50,
                        defaults : {
                            style : 'margin-right:10px',
                            hideMode : 'display'
                        },
                        xtype : 'container',
                        items : [{
                                    xtype : 'button',
                                    id : 'detailRestartStepBtn',
                                    text : '步骤失败IP重做',
                                    hidden : true,
                                    cls : 'opera btn_main long'
                                }, {
                                    xtype : 'button',
                                    id : 'detailIgnoreErrorBtn',
                                    text : '忽略错误',
                                    hidden : true,
                                    cls : 'opera btn_main long'
                                }, {
                                    xtype : 'button',
                                    id : 'detailRunStepBtn',
                                    text : '执行',
                                    hidden : true,
                                    cls : 'opera btn_main long'
                                }, {
                                    xtype : 'button',
                                    id : 'detailJumpStepBtn',
                                    text : '跳过',
                                    hidden : true,
                                    cls : 'opera btn_main long'
                                }, {
                                    xtype : 'button',
                                    id : 'detailForceStopStepBtn',
                                    text : '强制终止步骤',
                                    hidden : true,
                                    cls : 'opera btn_main long'
                                }, {
                                    xtype : 'button',
                                    id : 'detailNextStepBtn',
                                    cls : 'opera btn_main long',
                                    hidden : true,
                                    text : '进入下一步骤'
                                }]
                    }]           	
	            },{
	            	width : 170,
	            	labelWidth : 85,
	            	id : 'txeStepTsyscId',
	            	xtype : 'displayfield',
	            	fieldLabel : 'TSCId'
	            },{
	            	width : 170,
	            	id : 'txeStepFailIpnum',
	            	xtype : 'displayfield',
	            	fieldLabel : '失败IP数量'
	            },{
	            	width : 200,
	            	id : 'txtStepEndTime',
	            	labelWidth : 55,
	            	xtype : 'displayfield',
	            	fieldLabel : '结束时间'
	            },{
	            	width : 170,
	            	labelWidth : 85,
	            	xtype : 'displayfield',
	            	id : 'txtStepStarter',
	            	fieldLabel : '执行人'
	            },{
	            	width : 170,
	            	xtype : 'displayfield',
	            	id : 'txeStepBadIpnum',
	            	fieldLabel : 'Agent异常IP数量'
	            },{
	            	width : 200,
	            	id : 'txtStepTotalTime',
	            	xtype : 'displayfield',
	            	labelWidth : 55,
	            	fieldLabel : '总耗时'
	            },{
	            	width : 170,
	            	labelWidth : 85,
	            	id : 'txeStepTotalIpnum',
	            	xtype : 'displayfield',
	            	fieldLabel : '总执行IP数量'
	            },{
	            	width : 170,
	            	id : 'lastSuccessIPNum',
	            	xtype : 'displayfield',
	            	fieldLabel : '之前成功IP数量',
	            	colspan: 2
	            },{
	            	xtype : 'panel',
	            	border : false,
	            	colspan: 4,
	            	items : [{
	            		xtype : 'radiogroup',
	                    id : 'rdoLog',
	                    hideLabel: true,                            
	                    items : [{
	                        name: 'rdoLog',
	                        width : 100,
	                        inputValue : true,
	                        boxLabel: '用户脚本输出' 
	                    },{
	                        name: 'rdoLog',
	                        width : 100,
	                        inputValue : false,
	                        boxLabel : '完整日志'
	                    },{
	                    	xtype : 'button',                    	
	                    	cls : 'opera btn_sec',
	                    	text : '<i class="icon-file icon-white"></i>&nbsp;导出所选类型日志',
	                    	handler : this._exportLog.bind(this)
	                    }]
	            	}]
	
	            }]
    	};
    	return panel;
    },
    _createStepResultPanel : function(){
    	return {
    		layout : 'hbox',
            border : false,
            width : '100%',
            flex : 1,
            layoutConfig : {
                align : 'stretch',
                pack : 'start'
            },
            items : [{
                id : 'stepAnalyseResultPanel',
                width : 200,
                border : false,
                autoScroll : true

            }, {
            	flex : 1,
            	layout : 'vbox',
            	border :false,
            	layoutConfig : {
	                align : 'stretch',
	                pack : 'start'
	            },
            	items :[
            	        {
            	        	height : 28,
                			layout : {
                                type : 'hbox',
                                align : 'middle'
                            },
                			border :false,
                			bodyStyle: 'padding-bottom:5px;',
            	        	items : [/*{
					            		width : 50,
					            		border :false,
					            		html:'IP搜索:',
					            		bodyStyle: 'padding-right:10px;padding-top:3px;'
					            	},*/{
	                                    id : 'searchIPTxt',
	                                    xtype : 'textfield',
	                                    emptyText : '请输入搜索条件或ip...',
	                                    value : ''
	                                },{
                                        style: 'margin-left:10px;',
                                        xtype : 'button',
                                        cls : 'opera btn_sec',
                                        id : 'searchIPBtn',
                                        text : 'IP过滤'
                                    },{
                                        style: 'margin-left:10px;',
                                        xtype : 'button',
                                        id : 'searchLogBtn',
                                        cls : 'opera btn_sec',
                                        text : '日志搜索',
                                        handler : this._searchLog.createDelegate(this)
                                    },{
                            			id : 'txtLogTime',
                            			border :false,                            			
                            			style : 'padding-left:5px;margin-top: 3px;',
                            			html:''
        	                    	}]
            	        },
            	        {
            	        	layout : 'hbox',
            	            border : false,
            	            width : '100%',
            	            flex : 1,
            	            layoutConfig : {
            	                align : 'stretch',
            	                pack : 'start'
            	            },
            	            items : [{
            	            	width : 290,
            	            	layout : 'vbox',
                            	border :false,
                            	layoutConfig : {
        			                align : 'stretch',
        			                pack : 'start'
        			            },
            	            	items :[this._createStepIPGridPanel()]
            	            	},{
        	                    	flex : 1,
        	                    	layout : 'vbox',
        	                    	border :false,
        	                    	layoutConfig : {
        				                align : 'stretch',
        				                pack : 'start'
        				            },
        	                    	items :[{
        			                        xtype : 'textarea',
        			                        id : 'txtLogContent',
        			                        border : true,
        			                        flex : 1
        			                    }
        	                    	]}
            	            ]
            	        }
            	]
            }]
    	};
    },

    _createStepIPGridPanel : function() {
        var _this = this;
        /*var store = new Ext.data.Store({
            proxy : new Ext.data.PagingMemoryProxy({
                "data" : [],
                "totalCount" : 0
            }),
            // 隐含创建reader
            reader : new Ext.data.JsonReader({
                idProperty : 'id',
                root : 'data',
                totalProperty : 'totalCount',
                fields : [{
                            name : 'id'
                        }, {
                            name : 'ip'
                        }, {
                            name : 'ipType'
                        }, {
                            name : 'logCount'
                        }, {
                            name : 'totalTime'
                        }]
            })
        });*/
        
        /*Ext.define('User', {
            extend: 'Ext.data.Model',
            fields: [ { name : 'id' }, { name : 'ip' }, { name : 'ipType' }, { name : 'logCount' }, { name : 'totalTime' } ]
        });*/
        
        var store = Ext.create('Ext.data.Store', {
            pageSize : this.IPPageSize,
            //model: 'User',
            fields : [ { name : 'id' }, { name : 'ip' }, { name : 'ipType' }, { name : 'logCount' }, { name : 'totalTime' } ],
	        proxy: {
	            type: 'pagingmemory',
	            enablePaging: true,
	            reader: {
	                type: 'json',
	                totalProperty : 'totalCount',
	                root: 'data'
	            }
	        }
        });
        

        var sm = new Ext.selection.RowModel({
            mode: 'SINGLE'
        });
        var cm = new Ext.grid.ColumnModel({
            defaults : {
                sortable : false,
                align : 'center',
                menuDisabled : true
            },
            columns : [{
                        header : "IP",
                        dataIndex : "ipType",
                        renderer : function(value, cellMeta, record) {
                            if (value == 2) {
                                return record.get('ip') + ' 辅';
                            } else if (value == 3) {
                                return record.get('ip') + ' 系';
                            } else {
                                return record.get('ip');
                            }
                        }
                    }, {
                        header : "条数",
                        dataIndex : "logCount",
                        width : 40
                    }, {
                        header : "时间",
                        dataIndex : "totalTime",
                        width : 40
                    }]
        });
        var pagingToolbar = new Ext.PagingToolbar({
                pageSize : this.IPPageSize,
                store : store,
                displayInfo : false,
                beforePageText : '',
                afterPageText : '/ {0}',
                buttons :[{
                        xtype : 'button',
			            text: '复制全部IP',
			            tooltip: '复制全部IP',
			            scope: this,
			            plugins: {
	                        ptype: 'zeroclipboard',
	                        onCopyComplete : function(client,opt){
	                            if (!Ext.isEmpty(opt.text)) {
	                                parent.Frame.insertMsg('IP列表已拷贝到剪切板中',1);
	                            }
	                        },
	                        targetFunc: function (button, state) {	                        	
                                if (Ext.isArray(_this.IPDataArray) && _this.IPDataArray.length > 0) {
                                    var arr = new Array();
                                    for (var i = 0,l = _this.IPDataArray.length; i < l; i++) {
                                        record = _this.IPDataArray[i];
                                        if (record.isJobIP) {
                                            arr.push(record.ip);
                                        }
                                    }                                    
                                    return arr.join("\r\n");
	                            }
	                        }
	                    }
			    }],
		        listeners : {
	            	beforechange : function(t, params){
	            		/*if(!_this._searchByIp){
	            			return;
	            		}
	            		var searchText = _this.findById('searchIPTxt').getValue();
	            		
	            		if(Ext.isEmpty(searchText)){
	            			return;
	            		}
	            		params = Ext.apply({
	            			filterCol : 'ip',
	                        filter: searchText
	            		}, params);                		
	            		store.load({
							params : params
						});
	            		return false;*/
	            	}
	            }
            });
        pagingToolbar.down('#refresh').hide();
        var stepIPGrid = new Ext.grid.GridPanel({ 
        	flex : 1,
            style : 'padding-right: 10px;',
            id : 'stepIPGrid',
            sm : sm,
            cm : cm,
            stripeRows : true,
            frame : false,
            store : store,
            forceFit : true,            
            columnLines : true,
            bbar : pagingToolbar
        });
        
        return stepIPGrid;
    },

    /**
     * 创建步骤日志按钮
     * 
     * @return {}
     */
    _createStepLogContentBtn : function(state) {
        var txt = '失败参考';
        if (state == 3) {  // 执行成功的时候，失败参数为灰色
            txt = '<font style="color:#B3B7B6;">' + txt + '</font>';
        } 
        var btn = new Ext.Button({
        	enableToggle : true,
            toggleGroup : 'stepAnalyseBtnGroup',
            width : 175,
            text : txt,
            tooltip : '点击查看步骤总日志',
            style : 'margin-bottom: 6px;'
        });
        return btn;
    }
});

Ext.ijobs.job.JobRunTSCStepAction = Ext.extend(Ext.ijobs.job.JobRunTSCStepUI, {
    constructor : function(config) {
        Ext.ijobs.job.JobRunTSCStepAction.superclass.constructor.call(this, config);
    },
    initComponent : function() {
        Ext.ijobs.job.JobRunTSCStepAction.superclass.initComponent.call(this);
        Ext.apply(this.COMPONENTS, {
            'txeStepId' : this.findById('txeStepId'),
            'txeStepTsyscId' : this.findById('txeStepTsyscId'),
            'txeStepTotalIpnum' : this.findById('txeStepTotalIpnum'),
            'txeStepSuccessIpnum' : this.findById('txeStepSuccessIpnum'),
            'txeStepFailIpnum' : this.findById('txeStepFailIpnum'),
            'txeStepBadIpnum' : this.findById('txeStepBadIpnum'),
            'lastSuccessIPNum' : this.findById('lastSuccessIPNum'),
            'txtStepStarter' : this.findById('txtStepStarter'),
            'txtStepStartTime' : this.findById('txtStepStartTime'),
            'txtStepEndTime' : this.findById('txtStepEndTime'),
            'txtStepTotalTime' : this.findById('txtStepTotalTime'),
            'restartStepBtn' : this.findById('detailRestartStepBtn'),
            'ignoreErrorBtn' : this.findById('detailIgnoreErrorBtn'),
            'runStepBtn' : this.findById('detailRunStepBtn'),
            'jumpStepBtn' : this.findById('detailJumpStepBtn'),
            'forceStopStepBtn' : this.findById('detailForceStopStepBtn'),
            'nextStepBtn' : this.findById('detailNextStepBtn'),
            'stepProgressBar' : this.findById('stepProgressBar'),
            'stepAnalyseResultPanel' : this.findById('stepAnalyseResultPanel'),
            'stepIPGrid' : this.findById('stepIPGrid'),
            'rdoLog' : this.findById('rdoLog'),
            'txtLogTime' : this.findById('txtLogTime'),
            'txtLogContent' : this.findById('txtLogContent'),            
            'searchIPTxt' : this.findById('searchIPTxt'),
            'searchIPBtn' : this.findById('searchIPBtn')
        });
    },
    initEvents : function() {
    	Ext.ijobs.job.JobRunTSCStepAction.superclass.initEvents.call(this);
        this.addListener('beforedestroy', this._event_beforedestroy, this);
        this.COMPONENTS.restartStepBtn.on('click', this._event_restartStep, this);
        this.COMPONENTS.ignoreErrorBtn.on('click', this._event_ignoreError, this);
        this.COMPONENTS.runStepBtn.on('click', this._event_runStep, this);
        this.COMPONENTS.jumpStepBtn.on('click', this._event_jumpStep, this);
        this.COMPONENTS.forceStopStepBtn.on('click', this._event_forceStopStep, this);
        this.COMPONENTS.nextStepBtn.on('click', this._event_nextStep, this);
        this.COMPONENTS.stepIPGrid.addListener('rowclick', this._event_stepIPGridRowClick, this);
        this.COMPONENTS.searchIPBtn.on('click', this._event_searchIP, this);
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

    /**
     * 组件销毁前触发的事件
     */
    _event_beforedestroy : function() {
        this.taskRunner.stopAll();
        this._maskPanel(false);
    },
    
    /**
     * 搜索IP
     */
    _event_searchIP : function() {
    	var searchText = this.COMPONENTS.searchIPTxt.getValue(),
    		store = this.COMPONENTS.stepIPGrid.getStore();
    	if (searchText == '') {
    		
    		store.clearFilter(true);
    		store.loadPage(1);
    		this.IPDataArray = this.allIpData;
    	} else {
    		store.clearFilter(true);
    		var regExp = new RegExp(searchText + ".*", "i");
    		store.filter("ip", regExp);
    		store.loadPage(1);
    		ip = new Array();
    		this.allIpData.filter(function(data,index){
    			if(regExp.test(data.ip)){
    				ip.push(data);
    			};
    			//return regExp.test(data.ip);
    		});
    		this.IPDataArray = ip;
    		
    		this._searchByIp = true;
    		this._searchByLog = false;
    	}
    	
    },

    /**
     * 重新执行本步骤
     */
    _event_restartStep : function() {
        this._doAjaxRequest('./jobs/restartTaskIStep.action');
        this.taskRunner.stopAll();
        Ext.getCmp('JobRunUI')._delayedReInit();
        Ext.getCmp('StepDetailInfoWindow')._delayedRetryExecStep();
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
     * IP表格的点击
     */
    _event_stepIPGridRowClick : function(grid, record,rowIndex, e) {    
    	
        this._maskPanel(true, '日志拉取中...');
        this.COMPONENTS.txtLogTime.update('');        
        this.COMPONENTS.txtLogContent.setRawValue('');
        var oThis = this;
        Ext.Ajax.request({
        	//timeout : 120*1000,
            url : './jobs/jobRunAction!getLogContentByIP.action',
            success : function(response, opts) {
            	var result = Ext.decode(response.responseText, true);
            	if (Ext.isString(result.logContent)) {
            		oThis.COMPONENTS.txtLogTime.update({html:"日志开始时间: " + result.startTime + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日志结束时间: " + result.endTime});
                	oThis.COMPONENTS.txtLogContent.setRawValue(result.logContent);
            	}
                oThis._maskPanel(false);
            },
            failure : function(response, opts) {
                printMsg('AJAX请求发生异常，请刷新页面后重试。异常代码:' + response.status, 2);
                oThis._maskPanel(false);
            },
            params : {
                "appID" : oThis.jobApplicationId,
                "creater" : oThis.jobStarter,
                'stepIPExecResultId' : (Ext.isNumber(record.get('id')) ? record.get('id') : 0),
                'userLogOnly' : oThis.COMPONENTS.rdoLog.getValue().rdoLog,   
                'ip' : record.get('ip'),
                'stepId' : oThis.stepInstanceDetails.id,
                'retryCount' : oThis.stepInstanceDetails.retryCount,
                'running' : (oThis.stepInstanceDetails.state == 2 || 
                        oThis.stepInstanceDetails.state == 10 )
            }
        });        
    },

    /**
     * 加载IP数据
     */
    _loadIPData : function(params) {
    	var me = this;
    	this._maskPanel(true,'IP数据加载中...');
        Ext.Ajax.request({
            url : './jobs/jobRunAction!getIPListByResultType.action',
            success : function(response, opts) {
                var result = Ext.decode(response.responseText, true);
                me.allIpData = result.data;
                me.IPDataArray = result.data;
                me.COMPONENTS.searchIPTxt.setValue('');
                me._searchByIp = false;
                var store = me.COMPONENTS.stepIPGrid.getStore();        
                store.clearFilter(true);
                store.proxy.data = result; // PagingMemoryProxy() 一次性读取数据                
                store.loadPage(1);
                this._maskPanel(false);
            },
            failure : function(response, opts) {
                printMsg('AJAX请求发生异常，请刷新页面后重试。异常代码:' + response.status, 2);
                this._maskPanel(false);
            },
            params : params,
            scope : this
        });
    },
    /**
     * 步骤日志按钮点击
     * 
     * @param {} btn
     */
    _event_stepLogContentBtnClick : function(btn) {
        this._maskPanel(true, '日志拉取中...');
        this.COMPONENTS.stepIPGrid.getStore().removeAll();
        this.IPDataArray = null;
        this.COMPONENTS.txtLogTime.update('');
        this.COMPONENTS.txtLogContent.setRawValue('');
        var oThis = this;
        Ext.Ajax.request({
            url : './jobs/jobRunAction!getStepLogContent.action',
            success : function(response, opts) {
                oThis.COMPONENTS.txtLogContent.setRawValue(response.responseText);
                oThis._maskPanel(false);
            },
            failure : function(response, opts) {
                printMsg('AJAX请求发生异常，请刷新页面后重试。异常代码:' + response.status, 2);
                oThis._maskPanel(false);
            },
            params : {
                "appID" : oThis.jobApplicationId,
                "creater" : oThis.jobStarter,
                'stepId' : oThis.stepInstanceDetails.id,
                'retryCount' : oThis.stepInstanceDetails.retryCount
            }
        });
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
     * 导出日志
     */
    _exportLog : function(){
    	var me = this;
    	//userLogOnly   //根据界面上用户的选择,用户脚本输出为true，完整日志为false
    	
    	Ext.getCmp('StepDetailInfoWindow').getEl().mask('后台处理中');
    	var rdoLog = me.COMPONENTS.rdoLog.getValue();
    	if(Ext.isEmpty(rdoLog)){
    		Ext.getCmp('StepDetailInfoWindow').getEl().unmask();
    		return;
    	}
    	var params = {
    		userLogOnly : rdoLog.rdoLog,
    		jobInstanceId : me.jobInstanceId,
        	stepInstanceId : me.stepInstanceDetails.id,
        	retryCount : me.stepInstanceDetails.retryCount
    	};

    	    
    	Ext.Ajax.request({
        	timeout : 600*1000,//10分钟超时
        	params : params,
            url : './jobs/exportIPLogs.action',
            success : function(response, opts) {
            	Ext.getCmp('StepDetailInfoWindow').getEl().unmask();
	            var	result = Ext.decode(response.responseText),
	        		success = result.hasOwnProperty('msgType') && result.msgType==1;
	            
	            if (result.showInConsole) {
	                printMsg(result.message, result.msgType);
	            }
	            
	            if (success){
	            	if(result.uri){
	            		//直接用window.location.href会中断其他的ajax请求导致登出，换 用iframe方式
	            		var dh = Ext.DomHelper,
	            			iframeId = '_down_file_iframe',
	            			iframe = '';
	            			
	            			iframe = Ext.getDom(iframeId);
	            			if(iframe){
	            				iframe.src = result.uri;
	            			}else{
	            				iframe = '<iframe src="'+result.uri+'" target="_blank" id="'+iframeId+'"></iframe>';
	            				dh.append(Ext.getBody(),iframe);
	            			}	            		
	            		//window.location.href = result.uri;
	            	}
	            }
            },
            failure : function(response, opts) {
            	me._maskPanel();
                printMsg('AJAX请求发生异常，请刷新页面后重试。异常代码:' + response.status, 2);                
            }
    	});
    },
    /**
     * 搜索日志
     */
    _searchLog : function(){
    	
    	var me = this,
    		searchText =me.COMPONENTS.searchIPTxt.getValue(),
    		store = me.COMPONENTS.stepIPGrid.getStore(),
    		keyWord = searchText.trim();
    	
    	if(Ext.isEmpty(searchText)){
    		printMsg('请输入搜索条件', 2);
    		return false;
    	}
    	var params = {
    			'stepId' : me.stepInstanceDetails.id,
    			'retryCount' : me.stepInstanceDetails.retryCount,
    			'keyWord' : keyWord
    	};
    	me._maskPanel(true,'IP数据加载中...');
    	Ext.Ajax.request({
        	params : params,
            url : './jobs/jobRunAction!getAllIPListByContentSearch.action',
            success : function(response, opts) {            	
            	var	result = Ext.decode(response.responseText),
                	success = result.hasOwnProperty('data') && result.data.length>0;
            
                	me._maskPanel(false);
                	
	            if (result.showInConsole) {
	                printMsg(result.message, result.msgType);
	            }
	            if(result.totalCount == 0){
	            	printMsg('无相关日志', 2);
	            	return false;
	            }
	            if (success){
	            	me._searchByIp = false;
	            	me._searchByLog = true;
	            	me.allIpData = result.data;
	            	me.IPDataArray = result.data;
	            	var ResultPanel = me.COMPONENTS.stepAnalyseResultPanel,
	            		btnId = '_searchDataBtn';
	            	ResultPanel.remove(btnId);
	            	var btn = new Ext.Button({
                        width : 175,
                        text : '搜索结果('+ result.totalCount +')',
                        tooltip : '关键词：' + keyWord + ' 的搜索结果',
                        itemId : btnId,
                        enableToggle : true,
                        toggleGroup : 'stepAnalyseBtnGroup',
                        listeners : {
                            click : function() {
                            	me.allIpData = result.data;
                            	me.IPDataArray = result.data;
                            	me.COMPONENTS.txtLogTime.update('');
                                me.COMPONENTS.txtLogContent.setRawValue('');
                            	store.proxy.data = {
            				            'totalCount': result.totalCount,
            				            'data':result.data                        
            	                    };
            	                store.reload();          	
                            }                       	
                        }
                    });
	            	me.COMPONENTS.stepAnalyseResultPanel.add(btn);
//	            	Ext.ButtonToggleMgr.register(btn);
	            	me.COMPONENTS.stepAnalyseResultPanel.doLayout();
	            	btn.toggle(true);
	            	btn.fireEvent('click');	            	
	            }                    
            },
            failure : function(response, opts) {
                printMsg('AJAX请求发生异常，请刷新页面后重试。异常代码:' + response.status, 2);                
            }
            
        });
    	
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
                    if (this.stepInstanceDetails.state != 2 && this.stepInstanceDetails.state != 10) {
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
        	//timeout : 120*1000,
            url : './jobs/getStepDetails.action',
            //url : 'js/test_date/getStepDetails.action.txt',
            
            success : function(response, opts) {
            	try  {
	                var result = Ext.decode(response.responseText, true);
	                oThis.setViewData(result);         
	                Ext.ijobs.common.Kit.transButtons();
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
     * 隐藏按钮
     */
    _hideBtn : function(){
    	return;
    	this.COMPONENTS.restartStepBtn.hide();
        this.COMPONENTS.ignoreErrorBtn.hide();
        this.COMPONENTS.runStepBtn.hide();
        this.COMPONENTS.jumpStepBtn.hide();
        this.COMPONENTS.forceStopStepBtn.hide();
        this.COMPONENTS.nextStepBtn.hide();
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
        //逻辑修改：只有在接口返回btnList数据时才刷新按钮区域
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
            if (btnList.indexOf(6) >= 0) {

            }
            if (btnList.indexOf(7) >= 0) {
                this.COMPONENTS.forceStopStepBtn.show();
            }
            if (btnList.indexOf(8) >= 0) {
                this.COMPONENTS.nextStepBtn.show();
            }
            this.findById('detailBtnPanel').doLayout();
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
        		var oldMD5 = this.stepDetailsMD5;   //旧MD5
        		this.stepDetailsMD5 = data.stepDetailsMD5; //页面信息MD5码
        		if (oldMD5 == this.stepDetailsMD5) {
        			return; //MD5没变，直接返回
        		}
        	}        	
            if (Ext.isObject(data.stepInstanceDetails)) { // 需要刷新步骤详情          	
                this.stepInstanceDetails = data.stepInstanceDetails;
                var isStepExeScript = this.stepInstanceDetails.type === typeDef.stepType[1].value;
	            this.COMPONENTS.rdoLog.items.items[0].setValue(isStepExeScript);
	            this.COMPONENTS.rdoLog.items.items[1].setValue(!isStepExeScript);
                
                this.COMPONENTS.txeStepId.setRawValue(this.stepInstanceDetails.id);
                if (Ext.isNumber(this.stepInstanceDetails.tsyscId)) {
                    this.COMPONENTS.txeStepTsyscId.setRawValue(this.stepInstanceDetails.tsyscId);
                }
                if (Ext.isNumber(this.stepInstanceDetails.runIPNum) && this.stepInstanceDetails.runIPNum > 0) {
                    this.COMPONENTS.txeStepTotalIpnum.setRawValue(this.stepInstanceDetails.runIPNum + '(' + this.stepInstanceDetails.totalIPNum + ')');
                } else {
                    this.COMPONENTS.txeStepTotalIpnum.setRawValue(this.stepInstanceDetails.totalIPNum);
                }
                this.COMPONENTS.txeStepSuccessIpnum.setRawValue(this.stepInstanceDetails.successIPNum);
                this.COMPONENTS.lastSuccessIPNum.setRawValue(this.stepInstanceDetails.lastSuccessIPNum);
                if (Ext.isNumber(this.stepInstanceDetails.failIPNum) && this.stepInstanceDetails.failIPNum > 0) {
                    this.COMPONENTS.txeStepFailIpnum.setRawValue('<font color="red">' + this.stepInstanceDetails.failIPNum + '</font>');
                } else {
                    this.COMPONENTS.txeStepFailIpnum.setRawValue(this.stepInstanceDetails.failIPNum);
                }
                if (Ext.isNumber(this.stepInstanceDetails.badIPNum) && this.stepInstanceDetails.badIPNum > 0) {
                    this.COMPONENTS.txeStepBadIpnum.setRawValue('<font color="red">' + this.stepInstanceDetails.badIPNum + '</font>');
                } else {
                    this.COMPONENTS.txeStepBadIpnum.setRawValue(this.stepInstanceDetails.badIPNum);
                }
                this.COMPONENTS.txtStepStarter.setRawValue(this.stepInstanceDetails.operator);
                this.COMPONENTS.txtStepStartTime.setRawValue(this.stepInstanceDetails.startTime);
                this.COMPONENTS.txtStepEndTime.setRawValue(this.stepInstanceDetails.endTime);
                this.COMPONENTS.txtStepTotalTime.setRawValue(this.stepInstanceDetails.totalTime);
                
                
                //如果启动人为当前用户，按状态显示按钮，如果非当前用户，隐藏按钮
                if (this.jobStarter === parent.Frame.getCurUser()) {
                	if (Ext.isArray(this.stepInstanceDetails.btnList)){
                		this._hideBtn();
                		this._disableBtn(this.stepInstanceDetails.btnList);
                	}
                } else {
                	this._hideBtn();
                }
                //如果是步骤执行历史 ，隐藏按钮
                if(this.stepInstanceDetails.retryCount!=this.retryCount){
                	this._hideBtn();
                }
            }

            if (Ext.isArray(data.stepAnalyseResult)) {
                this.COMPONENTS.stepAnalyseResultPanel.removeAll();
                if (this.stepInstanceDetails.state == 3 || this.stepInstanceDetails.state == 4 || this.stepInstanceDetails.state == 6 || this.stepInstanceDetails.state == 11 || this.stepInstanceDetails.state == 12) {
                    var btn = this._createStepLogContentBtn(this.stepInstanceDetails.state);
                    this.COMPONENTS.stepAnalyseResultPanel.add(btn);
                    btn.addListener('click', this._event_stepLogContentBtnClick, this);
                }
                var oThis = this;
                Ext.each(data.stepAnalyseResult, function(item) {
                    var btnText = (item.btnText + '(' + item.typeCount + ')');
                    if (item.typeId > 0) {
                        btnText = '<font color="red">' + btnText + '</font>';
                    }
                    this.COMPONENTS.stepAnalyseResultPanel.add(new Ext.Button({
                        width : 175,
                        text : btnText,
                        tooltip : (item.typeName + '(' + item.typeCount + ') ' + (Ext.isString(item.typeTipMsg) ? ('<br>' + item.typeTipMsg) : '')),
                        style : 'margin-bottom: 6px;',
                        typeName : item.typeName,
                        typeId : item.typeId,
                        enableToggle : true,
                        toggleGroup : 'stepAnalyseBtnGroup',
                        handler : function() {
                        	oThis.COMPONENTS.txtLogTime.update('');
                            oThis.COMPONENTS.txtLogContent.setRawValue('');
                            oThis._loadIPData({
                                'stepId' : oThis.stepInstanceDetails.id,
                                'retryCount' : oThis.stepInstanceDetails.retryCount,
                                'resultTypeId' : this.typeId,
                                'resultTypeName' : this.typeName,
                                'running' : (oThis.stepInstanceDetails.state == 2 || 
                                             oThis.stepInstanceDetails.state == 10 )
                            });
                        }
                    }));
                }, this);
                this.COMPONENTS.stepAnalyseResultPanel.doLayout();                
            }
            
            if (Ext.isNumber(data.progress)) {
                var me = this,
                    getProgressText = function(v){
                    var text = '{0}',
                        stateText = me.toolkit.getStateByType(me.toolkit.STATE_TYPE.RUN_STATUS, me.stepInstanceDetails.state);
	                if (me.stepInstanceDetails.isPullLogTimeOut) {
	                    stateText = stateText + "(长时间未拉取到日志，自动终止)";
	                }	                
	                if (me.stepInstanceDetails.isSysStop) {
	                    stateText = stateText + "(系统强制终止)";
	                }
                    if (v === 0) {
                        text = Ext.String.format(text,stateText);
                    }else if (v <= 10){
                        text = Ext.String.format(text,stateText);
                    }else if (v > 10 && v <= 90){
                        text = Ext.String.format(text,stateText);
                    }else if (v > 90 && v<100){
                        text = Ext.String.format(text,stateText);
                    }else{
                        text = Ext.String.format(text,stateText);
                    }
                    return text;
                };

                this.COMPONENTS.stepProgressBar.updateProgress(data.progress/100,getProgressText(data.progress));
            }
            
        }
    }
});
