/*global Ext, Ijobs, window, document, printMsg, reset, console, getUserName, typeDef, top */

/**
 * 执行步骤
 * @author v_jfdong
 * @description 执行步骤组件
 * @requires common/common.js,common/utils.js,common/UserChooser.js,common/IPGridPanel.js,
 */
Ext.ns('Ext.ijobs.job.step');
/**
 * 执行脚本步骤界面
 * @class Ext.ijobs.job.step.JobStepExeScriptUI
 * @extends Ext.FormPanel
 */
Ext.define('Ext.ijobs.job.step.JobStepExeScriptUI', {extend: 'Ext.FormPanel', 
	
    constructor: function (config) {
        config = Ext.apply({
            border: false,
            frame: false,
            autoHeight: config.initData.module === "INSTANCE",
            toolkit: Ext.ijobs.common.Kit,
            bodyStyle: 'padding:15px 5px 0 20px',
            defaultType: 'textfield',
            defaults: {
                msgTarget: 'under',
                anchor: '90%'
            },
            autoScroll: true
        }, config);
        this.COMPONENTS = {};
        Ext.ijobs.job.step.JobStepExeScriptUI.superclass.constructor.call(this, config);
    },
    initComponent: function () {
        var isReadOnly = false;//组件是否只读，true/false:只读/可写
        var isDisplay = false;//组件是否隐藏，true/false:隐藏/显示
        var isDisabled = false; //组件是否禁用,true/false:禁用/启用
        var txtStepOperaReadOnly = false;//执行人组件,true/false:只读/可写
        var ipGridReadOnly = false;//ipGrid组件,true/false:只读/可写
        var cmbStepScriptReadOnly = false;//步骤脚本组件,true/false:只读/可写
        var cmbStepScriptVersionReadOnly = false;//脚本版本是否只读
        var txtStepScriptParamReadOnly = false;//入口参数,true/false:只读/可写
        var hideScriptAddition = false;//ipGrid组件中的cc脚本统一附加内容,true/false:隐藏/显示
        var timeoutReadOnly = false;//执行超时是否只读，true/false:只读/可写
        if (this.initData.module === "INSTANCE") {
            isReadOnly = true;
            isDisplay = true;
            isDisabled = true;
            txtStepOperaReadOnly = true;
            ipGridReadOnly = true;
            cmbStepScriptReadOnly = true;
            txtStepScriptParamReadOnly = true;
            cmbStepScriptVersionReadOnly = true;
            hideScriptAddition = false;
            timeoutReadOnly = true;
        } else if (this.initData.module === "CUSTOM") {
            isReadOnly = true;
            isDisplay = false;
            isDisabled = false;
            txtStepOperaReadOnly = false;
            ipGridReadOnly = false;
            cmbStepScriptReadOnly = true;
            txtStepScriptParamReadOnly = false;
            cmbStepScriptVersionReadOnly = false;
            hideScriptAddition = false;
        } else if (this.initData.module === "TEMPLATE") {
            isReadOnly = false;
            isDisplay = false;
            isDisabled = false;
            txtStepOperaReadOnly = false;
            ipGridReadOnly = false;
            cmbStepScriptReadOnly = false;
            cmbStepScriptVersionReadOnly = false;
            txtStepScriptParamReadOnly = false;
            hideScriptAddition = true;
        }
        var me = this;
        this.items = [
            {
                id: this.id + '_txtStepName',
                name: 'txtStepName',
                fieldLabel: '步骤名称',
                readOnly: isReadOnly,
                emptyText: '请输入步骤名称',
                validator: function (value) {
                    if (isReadOnly) {
                        return true;
                    }
                    if (value.trim().length === 0) {
                        return "步骤名称不允许为空";
                    }
                    return true;
                },
                value: this.initData.name || undefined
            },
            {
                id: this.id + '_txtStepDesc',
                name: 'txtStepDesc',
                fieldLabel: '步骤描述',
                xtype: 'textarea',
                autoScroll: true,
                readOnly: isReadOnly,
                emptyText: isReadOnly ? '' : '请输入步骤描述',
                validator: function (value) {
                    if (isReadOnly) {
                        return true;
                    }

                    if (value.trim().length === 0) {
                        return "步骤描述不允许为空";
                    }

                    return true;
                },
                value: this.initData.description || undefined
            },
            {
                id: this.id + '_txtStepOpera',
                name: 'txtStepOpera',
                xtype: 'userchooser',
                fieldLabel: '步骤执行人',
                readOnly: txtStepOperaReadOnly,
                hidden: (this.initData.exeType !== typeDef.exeType[2].value),
                emptyText: '留空时本步骤执行时无需人工干预',
                validator: function (value) {
                    value = value.trim();
                    if (txtStepOperaReadOnly) {
                        return true;
                    }
                    var idx = value.lastIndexOf(';');
                    if (idx !== value.length - 1) {
                        value += ';';
                        idx = value.lastIndexOf(';');
                    }
                    if (idx !== -1) {
                        value = value.substring(0, idx);
                        var users = value.split(';');
                        if (users.length !== 1) {
                            return "只能有一位步骤执行人";
                        }
                    }
                    return true;
                },
                value: this.initData.operator
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: '步骤脚本',
                border: false,
                padding: '5 0 5 0',
                layout: 'column',
                hidden: this.initData.module === "INSTANCE",
                items: [
                    {
                        columnWidth: 0.6,
                        border: false,
                        layout: 'form',
                        items: {
                            xtype: 'compositefield',
                            itemId: this.id + '_cpsStepScript',
                            hideLabel: true,
                            msgTarget: 'under',
                            anchor: '95%',
                            items: [
                                {
                                    xtype: 'ijobscombo',
                                    id: this.id + '_cmbStepScript',
                                    fieldLabel: '提示',
                                    emptyText: '请选择步骤',
                                    flex: 1,
                                    triggerAction: 'all',
                                    mode: "local",
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ["nameMD5", "name"],
                                        autoLoad: this.initData.module !== "INSTANCE",
                                        proxy: {
                                            type: 'ajax',
                                            url: './components/scriptsAction!getJobScriptListByJobTemplate.action',
                                            extraParams: {
                                                applicationId: this.applicationId,
                                                jobTemplateId: this.initData.jobTemplateId
                                            },
                                            reader: {
                                                type: 'json',
                                                root: 'data'
                                            }
                                        }
                                    }),
                                    valueField: "nameMD5",
                                    displayField: "name",
                                    readOnly: cmbStepScriptReadOnly,
                                    value: this.initData.nameMD5,
                                    validator: function (value) {
                                        if (isReadOnly) {
                                            return true;
                                        }
                                        value = this.getValue();
                                        if (Ext.isEmpty(value) || value === -1) {
                                            return "请选择步骤脚本";
                                        }
                                        return true;
                                    }
                                },
                                {
                                    xtype: 'ijobscombo',
                                    id: this.id + '_cmbStepScriptVersion',
                                    fieldLabel: '提示',
                                    emptyText: '请选择版本',
                                    flex: 1,
                                    triggerAction: 'all',
                                    mode: "local",
                                    store: Ext.create('Ext.data.JsonStore', {
                                        fields: ["nameMD5", "name", "scriptId", "tag", "version", 'isStandard', {
                                            name: 'vertag',
                                            convert: function (v, rec) {
                                                return Ext.String.format('{0}　{1}', rec.data.version, rec.data.tag);
                                            }
                                        }],
                                        proxy: {
                                        	type: 'ajax',
                                            url: './components/scriptsAction!getVersionsByJobTemplate.action',
                                        	reader: {
                                        		root: 'data'
                                        	}
                                        }
                                    }),
                                    valueField: "scriptId",
                                    displayField: "vertag",
                                    readOnly: cmbStepScriptVersionReadOnly,
                                    value: this.initData.scriptId,
                                    valueNotFoundText: Ext.value(this.initData.version, '请选择版本'),
                                    validator: function (value) {
                                        if (isReadOnly) {
                                            return true;
                                        }
                                        value = this.getValue();
                                        if (Ext.isEmpty(value) || value === -1) {
                                            this.clearValue();
                                            return '请选择版本';
                                        }
                                        return true;
                                    }
                                }
                            ]
                        }
                    },
                    {
                        columnWidth: 0.4,
                        border: false,
                        items: [
                            {
                                xtype: 'buttongroup',
                                border: false,
                                frame: false,
                                hidden: cmbStepScriptReadOnly,
                                defaults: {
                                    width: 80
                                },
                                items: [
                                    {
                                        text: '<i class="icon-white icon-list"></i>&nbsp;查看',
                                        tooltip: '可在打开的“脚本主页”查看该脚本',
                                        cls: 'opera btn_sec',
                                        id: this.id + '_btnEditScript',
                                        ref: '../../../btnEditScript'
                                    },
                                    {
                                        text: '<i class="icon-white icon-plus"></i>&nbsp;新建',
                                        cls: 'opera btn_sec',
                                        id: this.id + '_btnNewScript',
                                        ref: '../../../btnNewScript'
                                    },
                                    {
                                        text: '<i class="icon-white icon-refresh"></i>&nbsp;刷新',
                                        cls: 'opera btn_sec',
                                        id: this.id + '_btnRefreshScript',
                                        ref: '../../../btnRefreshScript'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'displayfield',
                fieldLabel: '步骤脚本',
                hidden: this.initData.module !== "INSTANCE",
                value: this.initData.scriptName
            },
            {
                xtype: 'displayfield',
                fieldLabel: '脚本版本',
                hidden: this.initData.module !== "INSTANCE",
                value: this.initData.version
            },
            {
                xtype: 'displayfield',
                fieldLabel: '脚本Tag',
                hidden: this.initData.module !== "INSTANCE",
                value: this.initData.tag
            },
            {
                id: this.id + '_txtStepScriptDesc',
                name: 'txtStepScriptDesc',
                xtype: 'textarea',
                fieldLabel: '脚本描述',
                emptyText: isReadOnly ? '' : '请选择一个步骤脚本',
                autoScroll: true,
                readOnly: true,
                value: this.initData.scriptDescription
            },
            {
                id: this.id + '_txtStepScript',
                name: 'txtStepScript',
                xtype: 'codemirror',
                fieldLabel: '脚本内容',
                readOnly: true,
                grow: true,
                height : 400,
                mode: 'text/x-sh',
                autoScroll: true,
                value: this.initData.scriptText,
                emptyText: isReadOnly ? '' : '请选择一个步骤脚本',
                validator: function (value) {
                    if (isReadOnly) {
                        return true;
                    }
                    if (value.trim().length === 0) {
                        return "脚本内容不允许为空，请先选择一个步骤脚本";
                    }
                    return true;
                }
            },
            {
                id: this.id + '_timeout',
                name: 'timeout',
                itemId: 'timeout',
                readOnly: timeoutReadOnly,
                xtype: 'numberfield',
                fieldLabel: '执行超时时间(秒)',
                emptyText: timeoutReadOnly ? '' : '请输入秒数，不填或0表示不超时',
                minValue: 0,
                maxValue: 259200,
                maxText: '该输入项的最大值是{0} (3天)',
                value: this.initData.timeout
            },
            {
                xtype: 'displayfield',
                id: this.id + '_dfStepParamType',
                fieldLabel: '传参形式',
                value: this.toolkit.getStateByType(this.toolkit.STATE_TYPE.PARAM_TYPE, this.initData.paramType)
            },
            {
                id: this.id + '_txtStepScriptParam',
                name: 'txtStepScriptParam',
                xtype: 'textfield',
                fieldLabel: '入口参数',
                readOnly: txtStepScriptParamReadOnly,
                hidden: this.initData.paramType !== typeDef.paramType[0].value,
                maxLength: 1000,
                emptyText: isReadOnly ? '' : '请填写入口参数，无则不填',
                value: this.initData.inletParam
            },
            {
                xtype : 'fieldcontainer',
    	    	hideEmptyLabel : false,
    	    	items : [{
    	    		id: this.id + '_chkUseIPGrid',
    	    		name: 'chkUseIPGrid',
    	            xtype : 'checkbox',
    	            disabled : isDisabled,
    	            checked : !this.initData.isUseJobConfigIp,
    	            boxLabel: '本步骤使用如下JobIP取代全程JobIP'
    	    	}]
            },
            {
                id: this.id + '_stepHost',
                xtype: 'ip-grid',
                border: false,
                fieldLabel: 'JobIP',
                readOnly: ipGridReadOnly,
                hideScriptAddition: hideScriptAddition,
                scriptAddition: this.scriptAddition,
                applicationId: this.applicationId,
                hosts: this.initData ? (this.initData.ipGridData || []) : [],//主机数据
                scriptInputType: this.initData.ipGetType,//IP录入方式
                scriptParams: this.initData.ccScriptParam,//cc脚本参数
                scriptId: this.initData.ccScriptId,//默认选中cc脚本
                scriptList: this.initData.ccScriptList,//cc脚本列表
                hidden: !!this.initData.isUseJobConfigIp
            },
            {
                xtype: 'ijobscombo',
                id: this.id + '_cmbCommonAccount',
                name: 'cmbCommonAccount',
                hidden: !!this.initData.isUseJobConfigIp,
                fieldLabel: '常用账户',
                emptyText: '请选择常用账户',
                mode: 'local',
                readOnly: ipGridReadOnly,
                //editable : false,
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ["id", "name", "accountName", "isLDAPUser"],
                	proxy: {
                		type: 'memory',
                		data: []
                	}
                }),
                valueField: 'id',
                displayField: 'name',
                value: ''
            }
        ];
        this.buttons = [
            {
                hidden: isDisplay,
                text: '<i class="icon-ok icon-white"></i>&nbsp;保存步骤',
                cls: 'opera btn_main long',
                ref: '../btnSaveStep',
                listeners: {
                    afterrender: function (btn) {
                        var ct = btn.findParentByType('toolbar').container;
                        ct.setStyle({
                            "background-color": "#FFF"
                        });
                    }
                }
            },
            {
                text: '<i class="icon-share-alt icon-white"></i>&nbsp;返回',
                cls: 'opera btn_query',
                style: 'margin :0 135 0 0',
                hidden: isDisplay,
                handler: function (btn, scope) {
                    var win = btn.findParentByType('window');
                    if (Ext.type(win) === "object") {
                        win.hide();
                    }
                }
            }
        ];
        Ext.ijobs.job.step.JobStepExeScriptUI.superclass.initComponent.call(this);
    }
});
/**
 * 步骤执行脚本事件
 * @class Ext.ijobs.job.step.JobStepExeScriptAction
 * @extends Ext.ijobs.job.step.JobStepExeScriptUI
 */
Ext.define('Ext.ijobs.job.step.JobStepExeScriptAction', {extend: 'Ext.ijobs.job.step.JobStepExeScriptUI', 
	alias: 'widget.step-exe-script',
	
    constructor: function (config) {
        Ext.ijobs.job.step.JobStepExeScriptAction.superclass.constructor.call(this, config);
    },
    initComponent: function () {
        Ext.ijobs.job.step.JobStepExeScriptAction.superclass.initComponent.call(this);
        var cpsStepScript = this.findById(this.id + '_cpsStepScript');
        Ext.apply(this.COMPONENTS, {
            cmbStepScript: cpsStepScript.items.items[0],
            cmbStepScriptVersion: cpsStepScript.items.items[1],
            txtStepScriptParam: this.findById(this.id + "_txtStepScriptParam"),
            cmbCommonAccount: this.findById(this.id + "_cmbCommonAccount")
        });
    },
    initEvents: function () {
        var cmbStepScript = this.COMPONENTS.cmbStepScript,
            cmbStepScriptStore = cmbStepScript.getStore(),
            cmbStepScriptVersion = this.COMPONENTS.cmbStepScriptVersion,
            cmbStepScriptVerStore = cmbStepScriptVersion.getStore();

        Ext.ijobs.job.step.JobStepExeScriptAction.superclass.initEvents.call(this);
        this.findById(this.id + '_chkUseIPGrid').on('check', this._onChecked, this);

        this.down('button[ref*=btnSaveStep]').on('click', this._saveStep, this);
        this.down('button[ref*=btnEditScript]').on('click', this._editScript, this);
        this.down('button[ref*=btnNewScript]').on('click', this._newScript, this);
        this.down('button[ref*=btnRefreshScript]').on('click', this._refreshScript, this);

        this.COMPONENTS.cmbCommonAccount.getStore().on('datachanged', this._onCommonAccountLoad, this);
        this.COMPONENTS.cmbCommonAccount.on('boxready', this._initCommonAccount, this);

        cmbStepScript.on('select', this._onScriptChange, this);
        cmbStepScriptStore.on('datachanged', this._onStepScriptListLoad, this);
        cmbStepScriptVersion.on('select', this._onScriptVerChange, this);
        cmbStepScriptVerStore.on('datachanged', this._onScriptVerListLoad, this);

    },

    _onChecked: function (checkbox, isChecked) {
        var stepHost = this.get(this.id + '_stepHost');
        var cmbCommonAccount = this.get(this.id + '_cmbCommonAccount');
        if (isChecked) {
            stepHost.show().doLayout();
            cmbCommonAccount.show();
            this.toolkit.transButtons();
        } else {
            stepHost.hide();
            cmbCommonAccount.hide();
        }
    },
    
    _onCommonAccountLoad: function (store) {
    	var records = store.data.items;
        this._setDefaultAccount(this.COMPONENTS.cmbCommonAccount, records, this.initData.userAccountId);
    },
    
    _initCommonAccount: function (cmb) {
        cmb.getStore().loadData(this.initData.userAccountList);
    },
    /**
     * 当账户列表没有选中值时，默认选中isLDAPUser为true的账户
     * @param {Componment} cmbAccount 账户下列列表
     * @param {Record} accounts   账户数据
     */
    _setDefaultAccount: function (cmbAccount, accounts, defaultVal) {
        var adminUser = [];
        var generalUser = [];
        if (accounts.length === 0) {
            cmbAccount.clearValue();
            return;
        }
        if (!Ext.isEmpty(cmbAccount.getValue())) {
            return;
        }
        if (defaultVal) {
            cmbAccount.setValue(defaultVal);
            return;
        }

        Ext.each(accounts, function (record) {
            if (record.get('isLDAPUser')) {
                adminUser.push(record.get('id'));
            } else {
                generalUser.push(record.get('id'));
            }
        });

        if (adminUser.length !== 0) {
            cmbAccount.setValue(adminUser[0]);
            return;
        }
        if (generalUser.length !== 0) {
            cmbAccount.setValue(generalUser[0]);
        }
    },
    /**
     * 根据指定脚本版本加载脚本内容
     * @param {} combo
     * @param {} record
     * @param {} index
     */
    _onScriptVerChange: function (combo, record, index) {

        if (Ext.isEmpty(combo.getValue()) || -1 === combo.getValue()) {
            return;
        }
        var txtStepScript = this.findById(this.id + '_txtStepScript'),
            txtStepScriptDesc = this.findById(this.id + '_txtStepScriptDesc'),
            dfStepParamType = this.findById(this.id + '_dfStepParamType'),
            txtStepScriptParam = this.findById(this.id + '_txtStepScriptParam');

        Ext.Ajax.request({
            url: './jobs/getChangeExeScriptContent.action',
            params: {
                scriptId: combo.getValue()
            },
            scope: this,
            success: function (response, opts) {
                var txtStepScriptParam = this.COMPONENTS.txtStepScriptParam,
                    result = Ext.decode(response.responseText);

                txtStepScript.setValue(Ext.value(result.scriptText, ''));
                txtStepScriptDesc.setValue(result.scriptDescription);
                dfStepParamType.setValue(this.toolkit.getStateByType(this.toolkit.STATE_TYPE.PARAM_TYPE, result.paramType));
                this.initData.paramType = result.paramType;

                if (result.paramType === typeDef.paramType[0].value) {
                    txtStepScriptParam.show();
                } else {
                    txtStepScriptParam.hide();
                }

                txtStepScriptParam.setValue(result.inletParam);
            },
            failure: function (response, opts) {
                Ext.msg.alert('信息', '错误代码：' + response.status + '\n错误描述：' + response.statusText);
            }
        });
    },

    _onScriptVerListLoad: function (store) {
    	var records = store.data.items;
        var me = this,
            cmbStepScriptVersion = me.COMPONENTS.cmbStepScriptVersion,
            selectedValue = me.initData.scriptId;

        cmbStepScriptVersion.clearValue();
        Ext.each(records, function (record) {
            if (record.get('scriptId') === selectedValue) {
                cmbStepScriptVersion.setValue(selectedValue);
                delete this.initData.scriptId;
                return false;
            }
        }, me);
    },
    /**
     * 编辑脚本列表数据时，自动选中保存过的值，触发select事件，加载相应的版本列表
     * @param {} store
     * @param {} records
     * @param {} index
     */
    _onStepScriptListLoad: function (store) {
    	var records = store.data.items;
        var me = this,
            cmbStepScript = me.COMPONENTS.cmbStepScript,
            cmbStepScriptVersion = me.COMPONENTS.cmbStepScriptVersion,
            selectedValue = me.initData.nameMD5;

        Ext.each(records, function (record) {
            if (record.get('nameMD5') === selectedValue) {
                cmbStepScriptVersion.getStore().load({
                    params: {
                        nameMD5: record.get('nameMD5'),
                        jobTemplateId: this.initData.jobTemplateId
                    }
                });
                cmbStepScript.setValue(selectedValue);
                return false;
            }
        }, me);
    },
    /**
     * 加载脚本版本列表
     * @param {} combo
     * @param {} record
     * @param {} index
     */
    _onScriptChange: function (combo, record, index) {
        var me = this,
            params = {
                nameMD5: record[0].data.nameMD5,
                jobTemplateId: me.initData.jobTemplateId
            },
            cmbStepScriptVersion = me.COMPONENTS.cmbStepScriptVersion,
            scriptVerStore = cmbStepScriptVersion.getStore();


        scriptVerStore.load({
            params: params
        });
    },
    /**
     * 编辑脚本
     */
    _editScript: function () {
        var cmbStepScriptVersion = this.COMPONENTS.cmbStepScriptVersion,
            cmbStepScriptVersionStore = cmbStepScriptVersion.getStore(),
            index = 0,
            record,
            name,
            isStandard;

        if (cmbStepScriptVersion.isValid()) {
            index = cmbStepScriptVersionStore.find('scriptId', cmbStepScriptVersion.getValue());
            record = cmbStepScriptVersionStore.getAt(index);

            if (record) {
                name = record.get('name');
                isStandard = record.get('isStandard');

                if (isStandard) {
                    printMsg('该脚本为标准脚本，不允许查看和编辑，只能编辑普通作业脚本。', 2);
                    return;
                }

                parent.Frame.createNewTab(
                    Ext.String.format(
                        './components/scriptMain.jsp?name={0}&id={1}&isStandard={2}',
                        name,
                        record.get('scriptId'),
                        isStandard ? 1 : 0
                    ),
                    name,
                    Ext.String.format('{0}【{1}】主页', isStandard ? '标准脚本' : '脚本', name)
                );
            }
        }
    },
    /**
     * 新建脚本
     */
    _newScript: function () {
        parent.Frame.createNewTab('./components/scriptEdit.jsp?isStandard=0&applicationId=' + this.applicationId, Math.random(), '新建作业脚本');
    },
    /**
     * 刷新脚本下拉框
     */
    _refreshScript: function () {
        console.log('sc');

        var me = this,
            cmbStepScript = me.COMPONENTS.cmbStepScript,
            cmbStepScriptVersion = me.COMPONENTS.cmbStepScriptVersion;

        cmbStepScript.clearValue();
        cmbStepScriptVersion.clearValue();
        cmbStepScript.getStore().load();
    },
    /**
     * 保存步骤信息
     */
    _saveStep: function (btnSaveStep) {
        var form = this.getForm(),
            cmbStepScriptVersion = this.COMPONENTS.cmbStepScriptVersion;

        if (form.isValid()) {
            this.getEl().mask('正在保存…');
            var stepHost = this.findById(this.id + '_stepHost');
            var fields = form.getFieldValues();
            var isUseJobConfigIp = !fields["chkUseIPGrid"];
            var timeout = fields["timeout"];

            if (Ext.isEmpty(timeout)) {
                timeout = 0;
            }
            if (!Ext.isNumber(timeout)) {
                parent.Frame.insertMsg('执行超时时间只能为秒数！', 2);
                return;
            }
            if (timeout < 0 || timeout > 259200) {
                parent.Frame.insertMsg('执行超时时间只能为0到259200秒之间！', 2);
                return;
            }
            var params = {
                "appID": this.applicationId,
                "creater": this.creater,
                timeout: timeout,//执行超时时间
                exeType: this.initData.exeType,
                stepType: this.initData.stepType,
                name: fields["txtStepName"],
                description: fields["txtStepDesc"],
                operator: fields["txtStepOpera"],
                isUseJobConfigIp: isUseJobConfigIp,
                ipDataId: this.initData.ipDataId,
                scriptId: cmbStepScriptVersion.getValue(),
                scriptDescription: fields["txtStepScriptDesc"],
                scriptText: fields["txtStepScript"],
                paramType: this.initData.paramType,
                inletParam: fields["txtStepScriptParam"]
            };
            
            Ext.copyTo(params,
                this.initData,
                (this.initData.module === "TEMPLATE") ? ['jobTemplateId', 'stepTemplateId'] : ['jobCustomId', 'stepCustomId']);
            if (!isUseJobConfigIp) {
                var ipList = [];
                Ext.each(stepHost.getHosts(), function (host) {
                    ipList.push(host.ip);
                });
                if (parseInt(fields["script"], 10) === typeDef.ipGetType[0].value) {
                    Ext.apply(params, {
                        'ccScriptId': fields[this.id + "_stepHost_hideScript"],
                        'ccScriptParam': fields[this.id + "_stepHost_txtParams"]
                    });
                }
                Ext.apply(params, {
                    ipGetType: fields["script"],
                    ipList: ipList.join(","),
                    userAccountId: fields["cmbCommonAccount"]
                });
            }
            
            //console.log(fields);console.log(params);
            //return false;
            
            btnSaveStep.disable();
            Ext.Ajax.request({
                url: (this.initData.module === "TEMPLATE") ? "./jobs/updateStepTemplate.action" : "./jobs/updateStepCustom.action",
                scope: this,
                method: "POST",
                params: params,
                success: function (response, opts) {
                    if (this.toolkit.hasPermission(response)) {
                        printMsg("执行脚本 【" + fields["txtStepName"] + "】保存成功", 1);
                        this.initData.pubicConfigPanel.refreshStepList();
                        this.initData.pubicConfigPanel.alreadyBatchGetIp = stepHost.isGetJobIPByCCScript();
                    }
                    btnSaveStep.enable();
                    this.getEl().unmask();
                }

            });
        }
    }
});

//end file