/*global Ext, Ijobs, window, document, printMsg, reset, console, getUserName */

/**
 * 作业模板编辑页面事件
 * @class Ext.ijobs.job.JobTemplateEditAction
 * @extends Ext.ijobs.job.JobTemplateEditUI
 */
Ext.ijobs.job.JobCustomEditAction = Ext.extend(Ext.ijobs.job.JobCustomEditUI, {
    constructor: function (config) {
        Ext.ijobs.job.JobCustomEditAction.superclass.constructor.call(this, config);

        this.alreadyBatchGetIp = false;
    },
    initComponent: function () {
        Ext.ijobs.job.JobCustomEditAction.superclass.initComponent.call(this);
        Ext.apply(this.COMPONENTS, {
            'stepGrid': this.get('stepGrid')
        });

    },
    initEvents: function () {
        Ext.ijobs.job.JobCustomEditAction.superclass.initEvents.call(this);
        var stepGrid = this.COMPONENTS.stepGrid;
        var stepGridView = stepGrid.getView();
        var stepGridStore = stepGrid.getStore();
        this.findById('btnSaveCutstom').on('click', this._saveCutstomInfo, this);
//        this.findById('btnCopyCutstom').on('click',this._copyCustom,this);
//        this.findById('btnRemoveCutstom').on('click',this._removeCutstom,this);
        this.findById('btnBatchGetHosts').on('click', this._batchGetHosts, this);
        this.findById('btnStart').on('click', this._start, this);
        this.findById('btnTimingStart').on('click', this._timingStart, this);
        stepGrid.on('boxready',this._onStepGridRender,this);
        
        stepGrid.getSelectionModel().on('select',function(sm,record,rowIndex){
        	this._toggleSelectedCss(true,sm,rowIndex,record);
         },this);
         stepGrid.getSelectionModel().on('deselect',function(sm,record,rowIndex){
        	 this._toggleSelectedCss(false,sm,rowIndex,record);
         },this);
         
        this.findById('btnJobPublicConfig').on('click', this._showJobPublicConfig, this);
    },
    COMPONENTS: {},
    _showJobPublicConfig: function () {

        var configPanel = this._createJobPublicConfigPanel(),
            ipListPanel = null, ccParam = null;

        configPanel.show();
        if (this.pubCfgIPData) {
            ccParam = Ext.value(Ext.getCmp('txtCCParam').getValue(), "无");
            ipListPanel = configPanel.findById('ipListPanel');
            ipListPanel.setHosts(this.pubCfgIPData);
            ipListPanel.updateScriptAddition(ccParam);
            this.initData.unityCcParam = ccParam;
            delete this.pubCfgIPData;
        }
        this.toolkit.transButtons();
    },
    _createJobPublicConfigPanel: function () {
        if (!this._pubWin) {
            var form = new Ext.FormPanel({
                id: 'jobPublicConfigFormPanel',
                border: false,
                autoScroll: true,
                bodyStyle: 'padding:15px 5px 0 20px',
                defaults: {
                    anchor: '90%'
                },
                items: [
                    {
                        id: 'rdoExeType',
                        name: 'rdoExeType',
                        xtype: 'radiogroup',
                        fieldLabel: '执行模式',
                        anchor: '42%',
                        items: [
                            {boxLabel: '无人模式', name: 'exeType', inputValue: 0, checked: this.initData.exeType === 0},
                            {boxLabel: '单步模式', name: 'exeType', inputValue: 1, checked: this.initData.exeType === 1},
                            {boxLabel: '混合模式（推荐）', width: 160, name: 'exeType', inputValue: 2, checked: this.initData.exeType === 2}
                        ]
                    },
                    {
                        xtype: 'ip-grid',
                        id: 'ipListPanel',
                        applicationId: this.initData.applicationId,//所属业务
                        pageSize: 10,//分页数
                        scriptAddition: this.initData.unityCcParam,
                        hosts: this.initData.ipGridData || [],//主机IP
                        scriptInputType: this.initData.ipGetType || 0,
                        scriptParams: this.initData.ccScriptParam || '',
                        scriptList: this.initData.ccScriptList || [],
                        scriptId: this.initData.ccScriptId,
                        border: false,
                        fieldLabel: 'JobIP'
                    },
                    {
                        xtype: 'ijobscombo',
                        anchor: '30%',
                        id: 'cmbCommonAccount',
                        fieldLabel: '常用账户',
                        mode: 'local',
                        //editable: false,
                        store: new Ext.data.JsonStore({
                            data: this.initData.userAccountList,
                            fields: ["id", "name", "accountName", "isLDAPUser"]
                        }),
                        valueField: 'id',
                        displayField: 'name',
                        value: this.initData.userAccountId
                    },
                    {
                        hideLabel: true,
                        xtype: 'panel',
                        border: false,
                        buttons: [
                            {
                                text: '<i class="icon-white icon-ok"></i>&nbsp;保存全程设置',
                                cls: 'opera btn_main long',
                                ref: '../btnSaveJobPublicConfig',
                                handler: this._saveJobPublicConfig,
                                scope: this
                            },
                            {
                                text: '<i class="icon-white icon-share-alt"></i>&nbsp;返回',
                                cls: 'opera btn_query',
                                handler: function (btn, scope) {
                                    var win = btn.findParentByType('window');
                                    if (Ext.type(win) === "object") {
                                        win.hide();
                                    }
                                }
                            }
                        ]
                    }
                ]
            });
            this.COMPONENTS.jobPublicConfigFormPanel = form;
            this._pubWin = new Ext.Window({
            	border: false,
                header: false,
                style: {
                	border: 0,
                	borderStyle: 'none',
                	padding:0,
                	'border-radus': 0
                },
                closable: false,
                modal: true,
//                autoScroll : true,
                maximized: true,
                layout: 'fit',
                closeAction: 'hide',
                items: form
            });
        }
        return this._pubWin;
    },
    _toggleSelectedCss: function (selected, sm, rowIndex, record) {
        var unchecked = 'x-grid-row-step-unchecked';
        var checked = 'x-grid3-row-selected';
        var view = this.COMPONENTS.stepGrid.getView();
        if (selected) {
        	view.removeRowCls( rowIndex, unchecked );
        	view.addRowCls( rowIndex, checked );
        } else {
        	view.removeRowCls( rowIndex, checked );        	
        	view.addRowCls( rowIndex, unchecked );
        }
    },
    /**
     * 初始选中行
     * @param {} grid
     */
    _onStepGridRender: function (grid) {
        var sm = grid.getSelectionModel();
        grid.getStore().each(function (record, index) {
            if (record.get('isExec')) {
                sm.select(index, true);
            }
        });
    },
    /**
     * 批量获取IP
     */
    _batchGetHosts: function (btn, e, callback) {
        var _loadmask = new Ext.LoadMask(this.el, {
            msg: "正在批量获取IP，请耐心等待……",
            removeMask: true
        });
        
        var txtCCParam = this.findById('txtCCParam').getValue();
        var stepGrid = this.COMPONENTS.stepGrid;
        var sm = stepGrid.getSelectionModel();
        
        _loadmask.show();
        
        Ext.Ajax.request({
            url: "./jobs/batchGetConfigIP.action",
            scope: this,
            timeout: 360 * 1000,
            params: {
                'jobCustomId': this.initData.jobCustomId,
                'unityCcParam': txtCCParam,
                "appID": this.initData.applicationId,
                "creater": this.initData.creater
            },
            success: function (response, opts) {
                if (this.toolkit.hasPermission(response)) {
                    if (response.responseText.indexOf('出错') === -1) {
                        var result = Ext.decode(response.responseText);
                        this.alreadyBatchGetIp = result.isBatchGetIpDone;
                        this.pubCfgIPData = result.ipGridData.data;
                        this._loadStepList();
                        this.initData.unityCcParam = txtCCParam;
                        if (Ext.isFunction(callback)) {
                            callback();
                        }
                    } else {
                        printMsg("步骤【" + record.get('name') + "】批量获取IP失败", 2);
                    }
                }
                
                _loadmask.hide();
            }
        });
    },
    
    /**
     * 立即执行
     */
    _start: function (btnStart, e) {
        var _this = this;
        var stepGrid = _this.COMPONENTS.stepGrid;
        var sm = stepGrid.getSelectionModel();
        var selectSteps = sm.getSelections();
        var ccSteps = [];
        
        var txtTaskName = Ext.getCmp('txtTaskName').getValue().trim();
        
        if (selectSteps.length === 0) {
            printMsg("请勾选需要执行的步骤", 2);
            return;
        }
        Ext.each(selectSteps, function (step) {
            if (step.get('ipGetType') === typeDef.ipGetType[0].value) {
                ccSteps.push(step.id);
            }
        });
        var _run = function () {
            btnStart.disable();
            Ext.Ajax.request({
                url: "./jobs/checkJobCustom.action",
                method: "POST",
                params: {
                    "jobCustomId": _this.initData.jobCustomId
                },
                success: function (response, opts) {
                    var result = Ext.decode(response.responseText);
                    if (result.isGood) {
                        Ext.Ajax.request({
                            url: "./jobs/copyAndExecute.action",
                            method: 'POST',
                            scope: this,
                            params: {
                                "jobCustomId": _this.initData.jobCustomId,
                                "appID": _this.initData.applicationId,
                                "creater": _this.initData.creater
                            },
                            success: function (response) {
                                if (_this.toolkit.hasPermission(response)) {
                                    var result = Ext.decode(response.responseText);
                                    var url = './jobs/jobRun.jsp?jobInstanceId=' + result.jobInstanceId;
                                    var activeTabId = parent.Frame.getActiveTab().id;
                                    openNewTab(url, "执行作业【" + txtTaskName + "】");
                                    parent.Frame.closeTab(activeTabId);
                                }
                                btnStart.enable();
                            }
                        });

                    } else {
                        printMsg(result.errInfo, 2);
                        btnStart.enable();
                    }
                }
            });
        };
        if (this.alreadyBatchGetIp || ccSteps.length === 0) {
            _run();
        } else {
            Ext.MessageBox.show({
                title: '确认',
                msg: 'JobIP可能不是最新,是否继续执行？',
                buttons: {ok: '继续', cancel: '取消'},
                icon: Ext.MessageBox.QUESTION,
                fn: function (buttonId, text, options) {
                    if (buttonId === 'ok') {
                        _run();
                    }
                }
            });
        }
    },
    
    /**
     * 定时执行
     */
    _timingStart: function () {
        var taskWin = new Ext.ijobs.job.TimingTaskWindow({
            title: '新增定时任务',
//            ccParamVal : 'ccparam test',
//            cronExpressionVal : 'dddd',
//            cronDescVal : 'aaaaa',
            taskID: this.initData.jobCustomId,
            applicationID: this.initData.applicationId,
            creater: this.initData.creater
        });
        
        taskWin.show();
    },
    
    /**
     * 保存全程设置信息
     */
    _saveJobPublicConfig: function (btnSaveJobPublicConfig, e) {
        var panel = this.COMPONENTS.jobPublicConfigFormPanel;
        var form = panel.getForm();
        var fields = form.getFieldValues();
        var ipList = [];
        var params = {};
        var ipListPanel = panel.findById('ipListPanel');
        var userAccountId = panel.findById('cmbCommonAccount').getValue();

        if (!form.isValid()) {
            return;
        }

        Ext.each(ipListPanel.getHosts(), function (host) {
            ipList.push(host.ip);
        });

        if (parseInt(fields.script, 10) === typeDef.ipGetType[0].value) {
            Ext.apply(params, {
                'ccScriptId': fields.ipListPanel_hideScript,
                'ccScriptParam': fields.ipListPanel_txtParams
            });
        }

        Ext.apply(params, {
            'ipList': ipList.join(","),
            'jobCustomId': this.initData.jobCustomId,
            'exeType': fields.exeType,
            'ipDataId': this.initData.ipDataId,
            'ipGetType': fields.script,
            'userAccountId': userAccountId,
            "appID": this.initData.applicationId,
            "creater": this.initData.creater
        });
        btnSaveJobPublicConfig.disable();
        Ext.Ajax.request({
            url: "./jobs/updateTaskIParms.action",
            scope: this,
            method: "POST",
            params: params,
            success: function (response, opts) {
                if (this.toolkit.hasPermission(response)) {
                    var result = response.responseText.replace(/^\s+|\s+$/g, '');
                    this._loadStepList();
                    this.alreadyBatchGetIp = ipListPanel.isGetJobIPByCCScript();
                }
                btnSaveJobPublicConfig.enable();
            }

        });
    },
    /**
     * 删除执行态
     */
    _removeCutstom: function (btnRemoveCutstom) {
        var _this = this;
        Ext.MessageBox.confirm("请确认", "您确定要删除该执行态吗?", function (button, text) {
            if (button === "yes") {
                btnRemoveCutstom.disable();
                Ext.Ajax.request({
                    url: "./jobs/deleteTaskIs.action",
                    method: "POST",
                    params: {
                        "jobCustomId": _this.initData.jobCustomId,
                        "jobCustomIdList": _this.initData.jobCustomId,
                        "appID": _this.initData.applicationId,
                        "creater": _this.initData.creater
                    },
                    success: function (response, opts) {
                        if (_this.toolkit.hasPermission(response)) {
                            if (response.responseText.indexOf("html") !== -1) {
                                printMsg("删除执行态失败", 2);
                            } else {
                                printMsg("删除执行态成功", 1);
                                parent.Frame.closeTab(parent.Frame.getActiveTab().id);
                            }
                        }
                        btnRemoveCutstom.enable();
                    }
                });
            }
        });
    },
    /**
     * 复制执行态
     */
    _copyCustom: function (btnCopyCutstom) {
        var _this = this;
        btnCopyCutstom.disable();
        Ext.Ajax.request({
            url: "./jobs/copyTaskI.action",
            method: "POST",
            params: {
                "jobCustomId": this.initData.jobCustomId,
                "jobCustomIdList": this.initData.jobCustomId,
                "appID": this.initData.applicationId,
                "creater": this.initData.creater
            },
            success: function (response, opts) {
                if (_this.toolkit.hasPermission(response)) {
                    if (response.responseText.indexOf('html') === -1) {
                        printMsg("复制成功", 1);
                        var resJsonObj = Ext.decode(response.responseText);
                        if (resJsonObj.data && resJsonObj.data.length > 0) {
                            parent.Frame.createNewTab('./jobs/getTaskIPage.action?taskI.id=' + resJsonObj.data[0].id, Math.random(), "编辑执行态【" + resJsonObj.data[0].name + "】");
                        }
                    } else {
                        printMsg("复制失败", 2);
                    }
                }
                btnCopyCutstom.enable();
            }
        });
    },

    /**
     * 保存执行态信息
     */
    _saveCutstomInfo: function (btnSaveCutstom) {
        var _this = this;
        var txtTaskName = Ext.getCmp('txtTaskName').value.trim();
        var des = Ext.getCmp('des').getValue().trim();
        var txtCCParam = Ext.getCmp('txtCCParam').getValue();
        var stepGrid = this.COMPONENTS.stepGrid;
        var sm = stepGrid.getSelectionModel();
        var selectSteps = sm.getSelection();
        var selectedStepsID = [];
        if (selectSteps.length === 0) {
            printMsg("请勾选默认执行的步骤", 2);
            return;
        }

        Ext.each(selectSteps, function (step) {
            selectedStepsID.push(step.data.id);
        });

        btnSaveCutstom.disable();

        Ext.Ajax.request({
            url: "./jobs/updateNameAndExecuteSteps.action",
            scope: this,
            success: function (response, opts) {
                if (_this.toolkit.hasPermission(response)) {
                    if (Ext.isObject(this.COMPONENTS.jobPublicConfigFormPanel)) {
                        var ipListPanel = this.COMPONENTS.jobPublicConfigFormPanel.findById('ipListPanel');
                        ipListPanel.updateScriptAddition(txtCCParam);
                    }
                    _this.initData.unityCcParam = txtCCParam;
                    _this._loadStepList();
                }
                btnSaveCutstom.enable();
            },
            method: "POST",
            params: {
                "jobCustomId": _this.initData.jobCustomId,
                "name": txtTaskName,
                "des": des,
                "unityCcParam": txtCCParam,
                "checkedStepIdList": selectedStepsID.join(","),
                "appID": _this.initData.applicationId,
                "creater": _this.initData.creater
            }
        });

    },
    /**
     * 页面渲染后改变按钮样式
     * @param {} panel
     */
    _onPageAfterRender: function (panel) {
        this.toolkit.transButtons();
    },
    /**
     * 因为后台数据不统一，刷新步骤表格都用此方法
     */
    _loadStepList: function () {
        var _stepGrid = this.COMPONENTS.stepGrid;
        
        var _newStore = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ["id", "isExec", "jobCustomId", "ipFalseCount", "ipCount", "isUseJobConfigIp", "ipGetType", "name", "stepType", "idx", "operator"],
            proxy: {
            	type: 'ajax',
            	url: "./jobs/getStepTaskIBaseList.action",
            	extraParams: {
                    "jobCustomId": this.initData.jobCustomId
                },
            	reader: {
            		type: 'json',
            		idProperty: "id",
            		root: "stepCustomList"
                }
            },
            listeners: {
                load: function (store, records, opts) {
                    _stepGrid.fireEvent('boxready', _stepGrid);
                }
            }
        });
        
        _stepGrid.reconfigure(_newStore, this.stepGrid_cm);
    },
    
    refreshStepList: function () {
        this._loadStepList();
    },
    
    _showStepTypeEditPanel: function (stepType, stepInitData) {
        var _stepEditPanel = this.COMPONENTS.stepEditPanel;
        var stepComponent = null,
            stepWindow = null,
            me = this;

        switch (stepType) {
            case this.STEP_TYPE.UNDEFINED:
                break;
            case this.STEP_TYPE.EXE_SCRIPT:
                stepComponent = {
                    xtype: 'step-exe-script',
                    applicationId: this.initData.applicationId,
                    initData: stepInitData
                };
                break;
            case this.STEP_TYPE.DISPATCH_FILE:
                stepComponent = {
                    xtype: 'step-transfer',
                    applicationId: this.initData.applicationId,
                    initData: stepInitData
                };
                break;
            case this.STEP_TYPE.PULL_FILE:
                stepComponent = {
                    xtype: 'step-pull',
                    applicationId: this.initData.applicationId,
                    initData: stepInitData
                };
                break;
            case this.STEP_TYPE.TEXT_STEP:
                stepComponent = {
                    xtype: 'step-text',
                    applicationId: this.initData.applicationId,
                    initData: stepInitData
                };
                break;
            default :
                break;
        }

        Ext.apply(stepComponent, {
            "scriptAddition": this.initData.unityCcParam,
            "appID": this.initData.applicationId,
            "creater": this.initData.creater
        });
        stepWindow = this._createJobCustomWindow();
        stepWindow.show();
        stepWindow.removeAll();
        stepWindow.add(stepComponent);
        //stepWindow.add(new Ext.ijobs.job.step.JobStepTextAction(stepComponent));
        stepWindow.doLayout();

        this._onPageAfterRender();
    },
    _createJobCustomWindow: function () {
        if (!this._jobCustomWin) {
            this._jobCustomWin = new Ext.Window({
                border: false,
                header: false,
                style: {
                	border: 0,
                	borderStyle: 'none',
                	padding:0,
                	'border-radus': 0
                },
                closable: false,
                modal: true,
                maximized: true,
                layout: 'fit',
                closeAction: 'hide',
                listeners: {
                    beforeadd: function (ct, cmp, index) {
                        var el = ct.getEl();
                        el.mask('正在加载步骤信息……');
                        (function () {
                            el.unmask();
                        }).defer(1000);
                    }
                }
            });
        }
        return this._jobCustomWin;
    },
    /**
     * 编辑步骤信息
     * @param {int} stepID 步骤id
     * @param {int} stepType 步骤类型
     * @param {string} stepName 步骤名称
     */
    _editStep: function (stepID, stepType, stepName) {
        var initData = null;
        Ext.Ajax.request({
            scope: this,
            url: "./jobs/getStepCustomContent.action",
            //url: "js/test_date/getStepCustomContent.action.txt",
            method: "POST",
            params: {
                "jobCustomId": this.initData.jobCustomId,
                "stepCustomId": stepID,
                "stepType": stepType,
                "appID": this.initData.applicationId,
                "creater": this.initData.creater
            },
            success: function (response, opts) {
                initData = Ext.decode(response.responseText);
                initData = Ext.apply(initData, {
                    pubicConfigPanel: this,
                    module: 'CUSTOM',
                    stepCustomId: initData.id
                });
                delete initData.id;
                this._showStepTypeEditPanel(stepType, initData);
            }
        });
    }
});