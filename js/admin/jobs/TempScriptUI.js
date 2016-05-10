/**
 * 临时脚本界面
 * 
 * @description
 * @author v_jfdong
 * @requires ext/ux/ux-all.js
 */
Ext.ns('Ext.ijobs.task');

Ext.define('Ext.ijobs.task.TempScriptUI', {extend: 'Ext.FormPanel', 
    constructor : function(config) {
        config = Ext.apply({
            toolkit :  Ext.ijobs.common.Kit,
            autoHeight : true,
            border : false,
            itemCls : 'col_bor',
            fileUpload: true,
            errorReader : Ext.create('Ext.data.reader.Json',{
                getResponseData : function(response) {
			        return {success : true};                                 
                }
            }),
            style : 'padding:20px 20px 0px'
            
            }, config);
        Ext.ijobs.task.TempScriptUI.superclass.constructor.call(this, config);
    },
    initComponent : function() {
        this.items = [
            this._createJobNameField(),          
            this._createApplicationCombox(),
            this._createScriptFromRadio(),
            this._createSelectScriptPanel(),
            this._createLocalScriptPanel(),
            this._createScriptTypeRadio(),
            this._createScriptTextArea(),
            this._createScriptTimeoutField(),
            this._createScriptArgusText(),
            this._createIPListPanel(), this._createAccountCombox()];
        this.buttonAlign = 'left';
        this.buttons = this._createButtons();
        Ext.ijobs.task.TempScriptUI.superclass.initComponent.call(this);
    },
    _createJobNameField : function(){
    	var panel = new Ext.Panel({
    		layout : 'column',    		
    		style : 'margin-bottom: 5px;border-bottom: 1px solid #E8E8E8;',
    		border :false,
    		items : [{
    			width : 105,
    			xtype : 'box',
    			border :false,
    			html : '作业名称:'
    		},{
    			width : 90,
    			xtype : 'box',
    			style : 'padding-top:2px;',
    			border :false,
    			html : '一次性执行脚本'
    		},{
    			width : 420,
    			anchor : '50%',
    			style : "margin-bottom: 1px;",
    			xtype : 'textfield',
        		itemId : 'name',
        		maxLength : 20,
            	emptyText : '请输入作业名称。非必填项，填写后方便在执行历史里搜索'
    		}]
    	});
    	return panel;
    },
    _createScriptTimeoutField : function(){
    	var field = new Ext.form.NumberField({
        		anchor : '30%',
        		itemId : 'timeout',
            	fieldLabel : '执行超时时间(秒)',
            	emptyText : '请输入秒数，不填或0表示不超时',            	
            	minValue : 0,
            	maxValue : 259200,
            	msgTarget :'under',
            	maxText : '该输入项的最大值是{0} (3天)'            	
        });
    	return field;
    },
    _createScriptTypeRadio : function() {
        var rg = new Ext.form.RadioGroup({
            id : 'rdoScriptType',
            fieldLabel : '脚本类型',                            
            width : 300,
            items : [{
                boxLabel : 'shell',
                width : 100,
                name : 'scriptType',
                inputValue : 1,
                checked : true
            }, {
                boxLabel : 'bat',
                width : 150,
                name : 'scriptType',
                inputValue : 2
            }, {
                boxLabel : 'perl',
                width : 150,
                name : 'scriptType',
                inputValue : 3
            }, {
                boxLabel : 'python',
                width : 150,
                name : 'scriptType',
                inputValue : 4
            }]
        });
        return rg;
    },
    _createApplicationCombox : function() {
        var _this = this;
        var store = Ext.create('Ext.data.JsonStore', {
            fields : ['id', 'applicationName', 'applicationId', 'appType'],
            proxy: {
            	type: 'ajax',
            	url : './common/getAllApplicationList.action'
            }
        });
        var cmb = new Ijobs.common.ux.AppComboBox({
            id : 'cmbApplication',
            fieldLabel : '开发商',
            emptyText : '请选择开发商',
            anchor : '50%',
            allowBlank : false,
            defaultApp : parseInt(appid,10),
            store : store,
            queryMode : 'local',
            valueField : 'id',
            displayField : 'applicationName',
            listeners : {
            	change : function(combox){
            		var ipListPanel = Ext.getCmp('ipListPanel');
            		if(ipListPanel){
            			ipListPanel.applicationId = combox.getValue();
            		}
            	}
            }
        });
        return cmb;
    },
    _createSelectScriptPanel : function() {
        var cmbScriptName = new Ijobs.ux.ComboBox({
            id : 'cmbScript',
            columnWidth : .39,
            fieldLabel : '脚本名称',
            queryMode : 'local',
            triggerAction : 'all',
            valueField : 'nameMD5',
            displayField : 'name',
            emptyText : '请选择脚本',
            store : Ext.create('Ext.data.JsonStore', {
            	proxy: {
            		type: 'ajax',
            		url : "./components/scriptsAction!getJobScriptListByApp.action",
        			reader: {
                		root : "data"
                	}
            	},
                method : "POST",
                autoDestroy : true,
                fields : ["nameMD5","name"]
            })
        });
        var cmbScriptVersion = new Ijobs.ux.ComboBox({
            id : 'cmbScriptVersion',
            columnWidth : .39,
            style : 'padding:0 0 0 5;',
            fieldLabel : '脚本版本',
            queryMode : 'local',
            triggerAction : 'all',
            valueField : 'scriptId',
            displayField : 'vertag',
            emptyText : '请选择版本',
            store : Ext.create('Ext.data.JsonStore', {
            	proxy: {
            		type: 'ajax',
            		url : "./components/scriptsAction!getVersionsByApp.action",
            		extraParams : {
                        state : 5    
                    },
            		reader: {
            			root : "data"
            		}
            	},
                method : "POST",
                autoDestroy : true,
                fields : ["nameMD5","name","scriptId","tag","version",{
                    name : 'vertag',
                    convert : function(v,rec){
                        return Ext.String.format('{0}　{1}',rec.data.version,Ext.value(rec.tag,'')); 
                    }
                }]
            })
        });        
        var panel = new Ext.Panel({
            id : 'selectScriptPanel',
            border : false,
            anchor : '63%',
            layout : 'column',
            fieldLabel : ' ',
            labelSeparator : '',
            items : [
                cmbScriptName,{
                    columnWidth:0.02,
                    xtype:'container',
                    html:'&nbsp;'
                },cmbScriptVersion, {
                columnWidth : .2,
                border : false,
                layout : 'hbox',
                layoutConfig : {
                    padding : '0 0 0 5',
                    align : 'middle'
                },
                defaults : {
                    margins : '0 5 0 0'
                },
                items : [{
                    text : '拷贝',
                    cls : 'opera btn_sec',
                    height : 25,
                    xtype : 'button',
                    ref : '../btnCopyScript'
                }]
            }]
        });
        return panel;
    },
    
    _createLocalScriptPanel : function() {
        var file = new Ext.form.FileUploadField({
            columnWidth : .8,
            id : 'scriptFile',
            name : 'upload',
            buttonText : '浏览…'
        });
        var hboxPanel = new Ext.Panel({
            id : 'importScriptPanel',
            columnWidth : .2,
            border : false,
            autoShow : true,
            xtype : 'panel',
            layout : 'hbox',
            layoutConfig : {
                padding : '0 0 0 5',
                align : 'middle'
            },
            defaults : {
                margins : '0 5 0 0'
            },
            items : [{
                text : '导入',
                cls : 'opera btn_sec',
                id : 'btnImportScrpt',
                height : 25,
                xtype : 'button',
                ref : 'btnImportScript'
            }]
        });
        var panel = new Ext.form.FieldContainer({
            border : false,
            anchor : '63%',
            id : 'localScriptPanel',
            layout : 'column',
            padding : '5 0 5 0',            
            autoShow : true,
            fieldLabel : ' ',
            labelSeparator : '',
            items : [file, hboxPanel]
        });
        return panel;
    },
    _createScriptFromRadio : function() {
        var rg = new Ext.form.RadioGroup({
            id : 'rdoScriptFrom',
            fieldLabel : '请输入脚本',
            width : 400,
            items : [{
                boxLabel : '手工录入',
                width : 100,
                name : 'scriptFrom',
                inputValue : 1,
                checked : true
            }, {
                boxLabel : '从已有脚本拷贝',
                width : 150,
                name : 'scriptFrom',
                inputValue : 0
            }, {
                boxLabel : '本地脚本',
                width : 150,
                name : 'scriptFrom',
                inputValue : 2
            }]
        });
        return rg;
    },
    _createScriptTextArea : function() {

        var ta = new /*Ext.form.field.TextArea({*/Ext.ux.form.field.CodeMirror({
            id : 'txtScriptCode',
		    mode: 'text/x-sh',
		    width : '100%',
            theme : 'erlang-dark',
            allowBlank : false,
            height : 400,
//            grow : true,
//            growMin : 200,
//            growMax : 400,
//            autoScroll : true,
            emptyText : '请输入脚本代码',
            addons : [{
                jsFiles : ['selection/active-line.js'],
                styleActiveLine : true
            }]
        });
        
        return {
        	xtype : 'fieldcontainer',  
            fieldLabel : ' ',
            labelSeparator : '',
            anchor : '80%',
        	items : [ta]
        };
    },
    _createScriptArgusText : function() {
        /*var txt = new Ext.form.TextField({
            id : 'txtScriptArgus',
            anchor : '50%',
            fieldLabel : '脚本入口参数'
        });*/
        var txt = new Ijobs.ux.ParamInput({
        	id : 'txtScriptArgus',
        	anchor : '50%',
        	fieldLabel : '脚本入口参数',
        	dataName : '__scriptParams'
        });
        
        return txt;
    },
    _createIPListPanel : function() {
        var ipList = new Ijobs.ux.IPGridPanel({
            id : 'ipListPanel',
            anchor : '80%',
            fixed : true,
            hideScriptAddition : true,
            applicationId : this.applicationId,// 所属业务
            pageSize : 10,// 分页数
            hosts : [],// 主机IP
            fieldLabel : 'JobIP',
            border : false
            
        });
        return ipList;        
    },
    _createAccountCombox : function() {
        var store = Ext.create('Ext.data.JsonStore', {
        	proxy: {
        		type: 'ajax',
        		url : './jobs/getUserAccountsByApp.action',
        		extraParams : {
        			'userAccount.application.id' : -1
        		}
        	},
            fields : ['id', 'accountName', 'application', 'accountAlias', 'accountPassWord',
	            'isLDAPUser', {
	                name : "accountAliasSelect",
	                convert : function(v, record) {
	                    return record.data.accountName !== 'undefined' ? record.data.accountAlias + " 账号:" + record.data.accountName : record.data.accountAlias;
	                }
	            }
            ]
        });
        
        var cmb = new Ijobs.ux.ComboBox({
            id : 'cmbAccount',
            fieldLabel : '执行帐户',
            store : store,
            anchor : '50%',
            queryMode : 'local',
            editable : false,
            triggerAction : 'all',
            valueField : 'id',
            displayField : 'accountAliasSelect'
        });
        
        return cmb;
    },
    
    _createButtons : function() {
        return [{
            text : '<i class="icon-ok icon-white"></i>&nbsp;执行脚本',
            cls : 'opera btn_main long',
            style : 'margin :0 0 0 93px',
            ref : '../btnExecute'
        }];
    }
});

//end file