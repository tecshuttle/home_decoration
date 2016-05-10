/*global Ext, Ijobs, window, document, printMsg, reset, console, getUserName, typeDef, top */

/**
 * 作业模板编辑页面事件
 * @class Ext.ijobs.job.JobTemplateEditAction
 * @extends Ext.ijobs.job.JobTemplateEditUI
 */
Ext.define('Ext.ijobs.job.JobTemplateEditAction', {extend: 'Ext.ijobs.job.JobTemplateEditUI', 
    constructor: function (config) {
        Ext.ijobs.job.JobTemplateEditAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Ext.ijobs.job.JobTemplateEditAction.superclass.initComponent.call(this);
        Ext.apply(this.COMPONENTS, {
            'stepEditPanel': this.findById('stepEditPanel'),
            'stepGrid': this.findById('stepGrid')
        });
    },

    initEvents: function () {
        Ext.ijobs.job.JobTemplateEditAction.superclass.initEvents.call(this);
        
        this.findById('btnSaveJobInfo').on('click', this._saveJobInfo, this);
        Ext.each(this.stepTypeMenus.items.items, function (menu) {
            var _this = this;
            menu.on('click', function (btn, event) {
                var stepIndex = Ext.value(_this.stepTypeMenus.offset, -1);
                _this._addStep(btn.stepType, stepIndex);
                delete _this.stepTypeMenus.offset;
            });
        }, this);
        this.findById('btnJobPublicConfig').on('click', this._showJobPublicConfig, this);
        this.on('boxready', this._onPageAfterRender, this);
        
        this.COMPONENTS.stepGrid.on('afterrender', this._bindStepGridDD, this);
    },
    
    COMPONENTS: {},
    /**
     * 步骤类型
     */
    STEP_TYPE: {
        /**
         * 未定义
         */
        UNDEFINED: typeDef.stepType[0].value,
        /**
         *执行脚本
         */
        EXE_SCRIPT: typeDef.stepType[1].value,
        /**
         *分发文件
         */
        DISPATCH_FILE: typeDef.stepType[2].value,
        /**
         * 拉取文件
         */
        PULL_FILE: typeDef.stepType[3].value,
        /**
         * 文件步骤
         */
        TEXT_STEP: typeDef.stepType[4].value

    },
    
    _showJobPublicConfig: function () {
        this._createJobPublicConfigPanel().show();
        this.toolkit.transButtons();
    },

    /**
     * 全程设置
     * @return {}
     */
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
                        hideScriptAddition: true,
                        applicationId: this.initData.applicationId,//所属业务
                        pageSize: 10,//分页数
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
                        name: 'cmbCommonAccount',
                        fieldLabel: '常用账户',
                        emptyText : '请选择常用账户',
                        queryMode: 'local',
                        editable: false,
                        store: Ext.create('Ext.data.JsonStore', {
                            fields: ["id", "name", "accountName", "isLDAPUser"],
                            data: this.initData.userAccountList,
                            proxy: {
                            	type: 'memory'
                            }
                        }),
                        valueField: 'id',
                        displayField: 'name',
                        value: this.initData.userAccountId
                    },
                    {
                        xtype: 'panel',
                        border: false,
                        hideLabel: true,
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

            this._pubWin = Ext.create('Ext.window.Window', {
                frame: false,
                frameHeader: false,
                header: false,
                border: false,
                closable: false,
                modal: true,
                maximized: true,
                layout: 'fit',
                closeAction: 'hide',
                style: {
                	border: 0,
                	borderStyle: 'none',
                	padding: 0,
                	'border-radius': 0
                },
                items: form
            });
        }

        return this._pubWin;
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
        
        if (!form.isValid()) {
            return;
        }
        
        Ext.each(panel.findById('ipListPanel').getHosts(), function (host) {
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
            'jobTemplateId': this.initData.jobTemplateId,
            'exeType': fields.exeType,
            'ipDataId': this.initData.ipDataId,
            'ipGetType': fields.script,
            'userAccountId': fields.cmbCommonAccount,
            "appID": this.initData.applicationId,
            "creater": this.initData.creater
        });

        btnSaveJobPublicConfig.disable();

        Ext.Ajax.request({
            url: "./jobs/updateTaskTParms.action",
            scope: this,
            method: "POST",
            params: params,
            success: function (response, opts) {
            	var result = Ext.decode(response.responseText);
                if (result.showInConsole) {
                    printMsg(result.message, result.msgType);
                } 
                btnSaveJobPublicConfig.enable();
            }

        });
    },

    /**
     * 作业主页
     */
    _gotoJobMain: function () {
        var path = document.location.href;
        var params = Ext.urlDecode(path.substring(path.indexOf('?') + 1, path.length));
        parent.Frame.createNewTab(params.url, params.pageID, params.title);
    },

    /**
     * 保存作业信息
     */
    _saveJobInfo: function () {
        var _this = this;
        var txtTaskName = Ext.getCmp('txtTaskName').getValue().trim();
        var des = Ext.getCmp('des').getValue().trim();
        var cmbTaskType = Ext.getCmp('cmbTaskType');
        var body = Ext.getBody();
        this._validJobName(txtTaskName, function () {
            body.mask('正在保存…');
            Ext.Ajax.request({
                url: "./jobs/updateTaskT.action",
                scope: this,
                success: function (response, opts) {
                    if (_this.toolkit.hasPermission(response)) {
                        if (response.responseText.indexOf("成功") === -1) {
                            printMsg("保存作业失败", 2);
                        } else {
                            printMsg("保存作业成功", 1);
                        }
                    }
                    body.unmask();
                },
                method: "POST",
                params: {
                    "model": "taskT",
                    "jobTemplateId": _this.initData.jobTemplateId,
                    "name": txtTaskName,
                    "des": des,
                    "jobType": cmbTaskType.getValue(),
                    "appID": _this.initData.applicationId,
                    "creater": _this.initData.creater
                }
            });
        });

    },

    /**
     * 验证步骤名称
     * @param {string} jobName 步骤名称
     * @param {function} callback 验证结束后的回调
     */
    _validJobName: function (jobName, callback) {
        Ext.Ajax.request({
            url: './common/updateName.action',
            params: {
                "taskIid": this.initData.jobTemplateId,
                "name": jobName,
                "model": 'taskT'
            },
            success: function (response, opts) {
                var result = Ext.decode(response.responseText);
                if (result.showInConsole) {
                    parent.Frame.insertMsg(result.message, result.msgType);
                } else {
                    if (Ext.isFunction(callback)) {
                        callback();
                    }
                }
            }
        });
    },
    
    _onPageAfterRender: function (panel) {
    	this._loadStepList();
        this.toolkit.transButtons();
    },
    
    /**
     * 暴露给其它组件调用刷新步骤的方法
     */
    refreshStepList: function () {
        this._loadStepList();
    },

    /**
     * 刷新步骤表格
     */
    _loadStepList: function () {
        var _stepGrid = this.COMPONENTS.stepGrid;
        var _newStore = Ext.create('Ext.data.Store', {
            autoLoad: true,
            fields: ["id", "jobTemplateId", "name", "stepType", "idx", "operator"],
            proxy: {
                type: 'ajax',
                url: "./jobs/getStepTaskTBaseList.action",
                extraParams: {
                    "jobTemplateId": this.initData.jobTemplateId
                },
                reader: {
                    type: 'json',
                    root: "stepTemplateList"
                }
            }
        });

        _stepGrid.reconfigure(_newStore);
    },

    /**
     * 表格鼠标拖拽（待优化）
     * @param {} grid
     */
    _bindStepGridDD: function (grid) {
    	console.log('aa');
    	
        grid.enableDragDrop = true;
        grid.ddGroup = 'step-grid-dd';
        grid.ddText = '移动至该行';

        var _this = this;
        var ddrow = new Ext.dd.DropTarget(grid.getView().mainBody, {
            ddGroup: 'step-grid-dd',
            notifyDrop: function (dd, e, data) {
                var sm = grid.getSelectionModel();
                var store = grid.getStore();
                var rows = sm.getSelections();
                var cindex = dd.getDragData(e).rowIndex;

                if (sm.hasSelection()) {
                    Ext.each(rows, function (record) {
                        store.remove(record);
                        store.insert(cindex, record);
                    });
                    var stepIdList = [];
                    store.each(function (item) {
                        stepIdList.push(item.id);
                    });

                    Ext.Ajax.request({
                        url: './jobs/updateTaskT.action',
                        params: {
                            "model": "taskT",
                            "jobTemplateId": _this.initData.jobTemplateId,
                            "stepIdList": stepIdList.join(','),
                            "appID": _this.initData.applicationId,
                            "creater": _this.initData.creater
                        },
                        success: function (response, opts) {
                            if (_this.toolkit.hasPermission(response)) {
                                _this._loadStepList();
                                sm.selectRecords(rows);
                            } else {
                                _this._loadStepList();
                            }
                        },
                        failure: function (response, opts) {
                            printMsg('移动步骤时出现异常！异常代码:' + response.status);
                        }
                    });

                }
            }
        });


    },

    /**
     * 移动步骤
     * @param {int} stepID 步骤ID
     * @param {int} offset 移动方向，上移(1)/下移(0)
     */
    _moveStep: function (stepID, offset) {
        var _this = this;
        var _isMoveUp = offset === 1;
        var _isMoveDown = offset === 0;
        var _stepGrid = this.COMPONENTS.stepGrid;
        var _store = _stepGrid.getStore();
        var _sm = _stepGrid.getSelectionModel();//行选择模型
        var _curIndex = _store.indexOfId(stepID);//当前选择前的索引
        var _record = _store.getById(stepID);//当前选中的记录
        var _stepIdList = [];//所有记录排列顺序

        if ((!_sm.hasPrevious() && _isMoveUp) || (!_sm.hasNext() && _isMoveDown)) {
            return;
        }
        _store.remove(_record);
        _store.insert(_isMoveUp ? _curIndex - 1 : _curIndex + 1, _record);
        _store.each(function (record) {
            _stepIdList.push(record.id);
        });

        Ext.Ajax.request({
            url: './jobs/updateTaskT.action',
            params: {
                "model": "taskT",
                "jobTemplateId": this.initData.jobTemplateId,
                "stepIdList": _stepIdList.join(','),
                "appID": this.initData.applicationId,
                "creater": this.initData.creater
            },
            scope: this,
            success: function (response, opts) {
                if (_this.toolkit.hasPermission(response)) {
                    if (response.responseText.indexOf("成功") === -1) {
                        printMsg((_isMoveUp ? "上移" : "下移") + "步骤【" + id + "】失败", 1);
                    } else {
                        _this._loadStepList();
                        _sm.selectRecords([_record]);
                    }
                } else {
                    _this._loadStepList();
                }
            },
            failure: function (response, opts) {
                printMsg('移动步骤时出现异常！异常代码:' + response.status);
            }
        });
    },

    /**
     * 下移步骤
     * @param {int} stepID 步骤ID
     */
    _movedownStep: function (stepID) {
        this._moveStep(stepID, 0);
    },

    /**
     * 上移步骤
     * @param {int} stepID 步骤ID
     */
    _moveupStep: function (stepID) {
        this._moveStep(stepID, 1);
    },

    /**
     * 删除步骤
     * @param {int} stepID 步骤ID
     */
    _removeStep: function (stepID) {

        Ext.Ajax.request({
            scope: this,
            url: "./jobs/removeStepTaskTBase.action",
            success: function (response, opts) {
                if (this.toolkit.hasPermission(response)) {
                    this._loadStepList();
                }
            },
            method: "POST",
            params: {
                "stepTemplateId": stepID,
                "appID": this.initData.applicationId,
                "creater": this.initData.creater
            }
        });
    },
    /**
     * 新增步骤
     */
    _chooseStepType: function () {
        var _stepGrid = this.COMPONENTS.stepGrid;
        var _store = _stepGrid.getStore();
        var _rowNum = _store.getTotalCount();
        if (_rowNum >= 200) {
            printMsg('步骤已达上限，最多允许200个步骤。', 2);
            return;
        }

        this._getStepTypeWin().show();
        return;
        /*Ext.Ajax.request({
         scope: this,
         url: "./jobs/addStepTaskTBase.action",
         success: function (request, opts) {
         if (response.responseText.indexOf("rolefalse") !== -1) {
         printMsg("对不起，您没有该操作权限", 2);
         return;
         }
         this._loadStepList();
         },
         method: "POST",
         params: {
         "jobTemplateId": this.initData.jobTemplateId,
         "appID": this.initData.applicationId,
         "creater": this.initData.creater
         }
         });*/
    },

    _showStepTypeEditPanel: function (stepType, stepInitData) {
        var _stepEditPanel = this.COMPONENTS.stepEditPanel;
        var stepComponent = null,
            stepWindow = null;

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
            "appID": this.initData.applicationId,
            "creater": this.initData.creater
        });

        stepWindow = this._createJobTemplateWindow();
        stepWindow.show();
        stepWindow.removeAll();
        
        stepWindow.add(stepComponent);
        stepWindow.add(new Ext.ijobs.job.step.JobStepTextAction(stepComponent));

        stepWindow.doLayout();
        
        this.toolkit.transButtons();
    },
    _createJobTemplateWindow: function () {
        if (!this._jobTempWin) {
            this._jobTempWin = new Ext.Window({
                border: false,
                header: false,
                style: {
                	border: 0,
                    borderStyle: 'none',
                    padding: 0,
                    'border-radius': 0
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
                     
                        Ext.defer((function () {
                            el.unmask();
                        }), 1000);
                    }
                }
            });
        }
        
        return this._jobTempWin;
    },
    
    /**
     * 编辑步骤信息
     * @param {int} stepID 步骤id
     * @param {int} stepType 步骤类型
     * @param {string} stepName 步骤名称
     */
    _editStep: function (stepID, stepType, stepName) {
        var _stepEditPanel = this.COMPONENTS.stepEditPanel;
        var requestURL = '';
        var stepComponent = null;
        var initData = null;

        switch (stepType) {
            case this.STEP_TYPE.UNDEFINED:
                break;
            case this.STEP_TYPE.EXE_SCRIPT:
                initData = {
                    id: 1024,
                    jobTemplateId: 123,
                    exeType: 2,
                    stepType: 1,
                    name: "step1",
                    description: "this is step1",
                    operator: "vanliu",
                    isUseJobConfigIp: false,
                    ipDataId: 1111,
                    ipGetType: 1,
                    ccScriptId: 24,
                    ccScriptList: [
                        {id: 1, name: "cc脚本1"},
                        {id: 24, name: "cc脚本2"}
                    ],
                    ccScriptParam: " abcdf ",
                    ipGridData: [
                        {ip: "10.10.10.111", isAgentOk: true, IP2Long: 12123232, InnerIP1: "10.10.10.111"},
                        {ip: "10.10.10.112", isAgentOk: false, IP2Long: 12123232, InnerIP1: "10.10.10.112"}
                    ],
                    userAccountId: 101,
                    userAccountList: [
                        {id: 1, name: "账户A"},
                        {id: 101, name: "账户B"}
                    ],
                    scriptId: 24,
                    scriptDescription: "脚本描述信息",
                    scriptText: "#!bash/dlflewofdslf foefwel",
                    scriptList: [
                        {id: 1, name: "脚本1"},
                        {id: 24, name: "脚本2"}
                    ],
                    paramType: 1,
                    inletParam: "script params"
                };
                break;
            case this.STEP_TYPE.DISPATCH_FILE:
                initData = {
                    id: 1024,
                    jobTemplateId: 123,
                    exeType: 2,
                    stepType: 2,
                    name: "step1",
                    description: "this is step1",
                    operator: "vanliu",
                    isUseJobConfigIp: false,
                    ipDataId: 1111,
                    ipGetType: 1,
                    ccScriptId: 24,
                    ccScriptList: [
                        {id: 1, name: "cc脚本1"},
                        {id: 24, name: "cc脚本2"}
                    ],
                    ccScriptParam: " abcdf ",
                    ipGridData: [
                        {ip: "10.10.10.111", isAgentOk: true, IP2Long: 12123232, InnerIP1: "10.10.10.111"},
                        {ip: "10.10.10.112", isAgentOk: false, IP2Long: 12123232, InnerIP1: "10.10.10.112"}
                    ],
                    userAccountId: 101,
                    userAccountList: [
                        {id: 1, name: "账户A"},
                        {id: 101, name: "账户B"}
                    ],
                    beforeComm: "echo 'abc'",
                    afterComm: "echo 'exit'",
                    speedLimit: 1000,
                    sendFileDir: "/tmp/test/",
                    sendFileList: [
                        {isLocal: true, fileName: "abc.txt", user: "root", ip: "", userAccountId: -1},
                        {isLocal: false, fileName: "/cygdrive/d/tmp/test.txt", ip: "172.24.60.14", user: "administrator", userAccountId: 1598}
                    ]
                };
                break;
            case this.STEP_TYPE.PULL_FILE:
                initData = {
                    id: 1024,
                    jobTemplateId: 123,
                    exeType: 2,
                    stepType: 3,
                    name: "step1",
                    description: "this is step1",
                    operator: "vanliu",
                    isUseJobConfigIp: false,
                    ipDataId: 1111,
                    ipGetType: 1,
                    ccScriptId: 24,
                    ccScriptList: [
                        {id: 1, name: "cc脚本1"},
                        {id: 24, name: "cc脚本2"}
                    ],
                    ccScriptParam: " abcdf ",
                    ipGridData: [
                        {ip: "10.10.10.111", isAgentOk: true, IP2Long: 12123232, InnerIP1: "10.10.10.111"},
                        {ip: "10.10.10.112", isAgentOk: false, IP2Long: 12123232, InnerIP1: "10.10.10.112"}
                    ],
                    userAccountId: 101,
                    userAccountList: [
                        {id: 1, name: "账户A"},
                        {id: 101, name: "账户B"}
                    ],
                    beforeComm: "echo 'abc'",
                    afterComm: "echo 'exit'",
                    speedLimit: 1000,
                    pullFileDest: {ip: "10.10.10.111", destFileDir: "/tmp/test/", userAccountId: 103},
                    pullFileList: ["/data/rtools/core_*.tar", "/data/rtools/core_[a-zA-Z0-9]*.tar", "/tmp/job.20111226"]
                };
                break;
            case this.STEP_TYPE.TEXT_STEP:
                initData = {
                    id: 1024,
                    jobTemplateId: 123,
                    exeType: 2,
                    stepType: 4,
                    name: "step1",
                    description: "this is step1"
                };
                break;
            default :
                break;
        }
        
        Ext.apply(initData, {
            pubicConfigPanel: this
        });
        
        Ext.Ajax.request({
            scope: this,
            url: "./jobs/getStepTemplateContent.action",
            method: "POST",
            params: {
                "jobTemplateId": this.initData.jobTemplateId,
                "stepTemplateId": stepID,
                "stepType": stepType,
                "appID": this.initData.applicationId,
                "creater": this.initData.creater
            },
            success: function (response, opts) {
                if (this.toolkit.hasPermission(response)) {
                    var initData = Ext.decode(response.responseText);
                    initData = Ext.apply(initData, {
                        pubicConfigPanel: this,
                        module: 'TEMPLATE',
                        stepTemplateId: initData.id
                    });
                    delete initData.id;
                    this._showStepTypeEditPanel(stepType, initData);
                }
            }
        });
    },
    
    _addStep: function (stepType, stepIndex) {
        var _stepGrid = this.COMPONENTS.stepGrid;
        var _store = _stepGrid.getStore();
        var _rowNum = _store.getTotalCount();
        if (_rowNum >= 200) {
            printMsg('步骤已达上限，最多允许200个步骤。', 2);
            return;
        }
        var _this = this;
        Ext.Ajax.request({
            url: './jobs/addStepTaskTBase.action',
            params: {
                "jobTemplateId": _this.initData.jobTemplateId,
                "stepType": stepType,
                "addAfterStepIndex": stepIndex,
                "appID": _this.initData.applicationId,
                "creater": _this.initData.creater
            },
            success: function (response, opts) {
                if (_this.toolkit.hasPermission(response)) {
                    _this._loadStepList();
                }
            }
        });
        /*        var _this = this;
         var stepTypeWin = Ext.getCmp('stepTypeWin');
         var rd = stepTypeWin.findByType('radiogroup')[0];
         if(rd.isValid()){
         Ext.Ajax.request({
         url : './jobs/addStepTaskTBase.action',
         params :{
         "jobTemplateId": _this.initData.jobTemplateId,
         "stepType" : rd.getValue().getGroupValue(),
         "appID":_this.initData.applicationId,
         "creater":_this.initData.creater
         },
         success : function(response,opts){
         _this._loadStepList();
         _this._stepTypeWin.hide();
         }
         });
         }*/

    },
    _getStepTypeWin: function () {
        if (!this._stepTypeWin) {
            /*this._stepTypeWin = new Ext.Window({
             title : '请选择步骤类型',
             layout : 'border',
             bodyStyle :'padding : 5px',
             modal: true,
             //            shim:true,
             buttonAlign:"center",
             width:600,
             height:600,
             resizable:false,
             //                maximized : true,
             //          constrain:true,
             //          constrainHeader:true,
             minimizable : false,
             maximizable : false,
             plain:true,
             //            footer:true,
             closable:true,
             closeAction : 'hide',
             fbar: new Ext.Toolbar({
             items: [{
             text : '确定'
             },{
             text:'取消',
             scope : this,
             handler : function(){
             this._stepTypeWin.hide();
             }
             }],
             enableOverflow: false
             }),
             items :[{
             region : 'north',
             autoHeight : true,
             border : false,
             items :{
             xtype : 'form',
             border : false,
             bodyStyle: 'padding: 5px',
             autoHeight : true,
             items :[{
             xtype : 'ux-combo',
             id : 'cmbStepType',
             fieldLabel : '步骤类型',
             emptyText : '请选择…',
             mode : 'local',
             editable : false,
             store : new Ext.data.JsonStore({
             data : typeDef.stepType.remove(typeDef.stepType[0]),
             fields : ["value","label"]
             }),
             valueField: 'value',
             displayField: 'label',
             listeners : {
             select  : {
             fn : this._onStepTypeChange,
             scope : this
             }
             }
             }]
             }
             },{
             region : 'center',
             layout : 'fit',
             border : false,
             id : 'stepEditArae'
             }]
             });       */

            var rbItems = [];
            var _this = this;
            Ext.each(typeDef.stepType, function (stepType) {
                if (stepType.value !== _this.STEP_TYPE.UNDEFINED) {
                    rbItems.push({
                        boxLabel: stepType.label,
                        name: 'rbStepType',
                        inputValue: stepType.value
                    });
                }
            });
            this._stepTypeWin = new Ext.Window({
                title: '请选择步骤类型',
                id: 'stepTypeWin',
                layout: 'fit',
                bodyStyle: 'padding : 5px',
                modal: true,
                //            shim:true,
                buttonAlign: "center",
                width: 400,
                height: 100,
                resizable: false,
                //          constrain:true,
                //          constrainHeader:true,
                minimizable: false,
                maximizable: false,
//                plain:true,
                //            footer:true,
                closable: true,
                closeAction: 'hide',
                fbar: new Ext.Toolbar({
                    items: [
                        {
                            text: '确定',
                            scope: this,
                            handler: this._addStep
                        },
                        {
                            text: '取消',
                            scope: this,
                            handler: function () {
                                this._stepTypeWin.hide();
                            }
                        }
                    ],
                    enableOverflow: false
                }),
                items: [
                    {
                        xtype: 'radiogroup',
                        allowBlank: false,
                        blankText: '请选择一项步骤类型！',
                        hideLabel: true,
                        items: rbItems
                    }
                ]
            });
        }

        this._stepTypeWin.findByType('radiogroup')[0].reset();

        return this._stepTypeWin;
    }
});

//end file
