Ext.ns('Ext.ijobs.task.TempFilesTransferUI');

Ext.define('Ext.ijobs.task.TempFilesTransferUI', {extend: 'Ext.form.FormPanel',
    _fileList :  [],//文件列表
    constructor: function(config) {
        config = Ext.apply({
            toolkit :  Ext.ijobs.common.Kit,
            border : false,
            itemCls : 'col_bor',
            style : 'margin:20px 20px 0',
            fileUpload: true,
            defaults :{
                msgTarget : 'under'
            }             
        }, config);
       Ext.ijobs.task.TempFilesTransferUI.superclass.constructor.call(this, config);

    },
    initComponent : function(){
        this.items = [
            this._createJobNameField(),
            this._createApplicationCombox(),
            this._createSourceFilePanel(),
            this._createIPListPanel(),
            this._createAccountCombox()
        ];
        this.buttonAlign = 'left';
        this.buttons =this._createButtons();
        Ext.ijobs.task.TempFilesTransferUI.superclass.initComponent.call(this);    
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
    			border :false,
    			style : 'padding-top:2px;',
    			html : '一次性分发文件'
    		},{
    			width : 410,
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
    _createApplicationCombox : function(){
        var store = Ext.create('Ext.data.JsonStore', {
        	proxy: {
        		type: 'ajax',
        		url : './common/getAllApplicationList.action'
        	},
            fields: [
                'id',
                'applicationName',
                'applicationId',
                'appType'
            ]
        });
        
        var cmb = new Ijobs.common.ux.AppComboBox({
            id : 'cmbApplication',
            fieldLabel : '开发商',
            emptyText : '请选择开发商',
            allowBlank : false,
            defaultApp : parseInt(appid,10), 
            anchor : '50%',
            store : store,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'applicationName'
        });

        return cmb;
    },
    
    _createSourceFilePanel : function() {
        var panel = new Ext.form.FieldContainer({
            id : 'sourceFilePanel',
            anchor : '60%',
            layout: 'anchor',
            loadMask :{
                msg : '正在执行操作，请稍等…'
            },
            fieldLabel : '源文件',
            border : false,
            items : [
                this._createFileFromPanel(),
                this._createLocalFilePanel(),
                this._createRemoteFilePanel(),
                this._createFileListPanel()
            ]
        });
        return panel;
    },

    _createLocalFilePanel : function(){
        var file = new Ext.form.FileUploadField({
            columnWidth : .8,
            id : 'localFile',
            name : 'upload',
            buttonText : '浏览…'
        });
        var hboxPanel = new Ext.Panel({
                id : 'importLocalFilePanel',
                columnWidth : .2,
                border : false,
                autoShow : true,
                xtype : 'panel',
                layout : 'hbox',
                layoutConfig: {
                    padding:'0 0 0 5',
                    align:'middle'
                },
                defaults:{margins:'0 5 0 0'},        
                items:[{
                    text: '<i class="icon-file icon-white"></i>&nbsp;导入',
                    id : 'btnImportFile',
                    xtype : 'button',
                    cls : 'opera btn_sec',
                    height : 25,
                    ref : '../../btnLocalFile'
                }]            
            
        });
        var panel = new Ext.Panel({
            border : false,
            anchor : '100%',
            hidden : true,
            id : 'localFilePanel',
            layout : 'column',
            padding : '5 0 5 0',
            autoShow : true,
            items : [file,hboxPanel]
        });
        return panel;
    
    },
    _createRemoteFilePanel : function(){
        var store = Ext.create('Ext.data.JsonStore', {
        	proxy: {
        		type: 'ajax',
        		url : './jobs/getUserAccountsByApp.action',
    			extraParams : {
                    'userAccount.application.id' : -1
                }
        	},
            fields : [
                'id',
                'accountName',
                'application',
                'accountAlias',
                'accountPassWord',
                'isLDAPUser',
                {
                    name:"accountAliasSelect",
                    convert:function(v,record){
                    	var d = record.data;
                        return d.accountName !=='undefined' 
                            ? d.accountAlias+ " 账号:"+d.accountName
                            : d.accountAlias;
                        }
                }
            ],
            autoLoad : true
        });
        
        var cmb = new Ijobs.ux.ComboBox({
            id : 'cmbCommonAccount',
            fieldLabel : '常用账户',
            store : store,            
            anchor : '100%',
            queryMode : 'local',
            typeAhead: true,
            editable : true,
            triggerAction: 'all',
            valueField: 'id',
            displayField: 'accountAliasSelect'
        });
        
        var panel = new Ext.Panel({
            id : 'remoteFilePanel',
            border : false,
            //hidden : true,
            layout : 'anchor',
            defaults :{
                msgTarget : 'under'
            },             
            items : [{
                xtype : 'textfield',
                id : 'txtRemoteIP',
                fieldLabel : 'IP',
                anchor : '100%',
                vtype : 'IPAddress',
                emptyText : '请输入IP地址'
            },{
                xtype : 'textarea',
                grow : true,
                growMin : 25,
                growMax :400,
                id : 'txtFileList',
                fieldLabel : '文件列表',
                autoScroll : true,
                anchor : '90%',
                sideText : '文件名中支持正则表达式写法以匹配多个文件，文件名前需加【REGEX:】前缀。如：/tmp/REGEX:abc[A-Z,a-z,0-9,+,-,_]{0,50}.tgz&lt;br&gt;如需分发文件目录，文件名请以‘/’或‘\\’结束',
                emptyText : '请输入文件名，多个文件请以“回车”分隔',
                validator : function(value){
                    var files = value.trim().split(/\n/g);
                    var errorFiles = [];
                    var result = '';
                    for ( var i = 0,len = files.length; i < len; i++) {
                        result = Ext.ijobs.common.Kit.validPath(files[i]);
                        if(typeof result==='string'){
                            if(files[i].trim().length!==0){
                                errorFiles.push("【"+ files[i] +"】"+result);
                            }
                        }
                    }
                    if(errorFiles.length!==0){
                        return errorFiles.join("、");
                    }
                    return true;
                }
            },{
                xtype : 'displayfield',
                hideLabel : true,
                style : 'color:red',
                value  : '使用正则表达式匹配文件总大小大于2G时，请慎用正则表达式，可能使步骤执行时间增加数倍！'            
            },cmb],
            buttonAlign : 'right',
            buttons : [{
                text : '<i class="icon-white icon-plus"></i>&nbsp;添加',
                cls : 'opera btn_sec',
                ref : '../btnAddRemoteFile'
            }]
        });
        
        return panel;
    },
    _createFileFromPanel : function(){
        var panel = new Ext.Panel({
            border : false,
            layout : 'column',
            items : [{
                columnWidth : .4,
                xtype : 'radiogroup',
                id : 'rdoSourceFile',
                hidden: true,
                items: [                
                    //{boxLabel: '本地文件', name: 'sourceFile',inputValue : 0},
                    {boxLabel: '远程文件', name: 'sourceFile', inputValue: 1, checked: true}
                ]        
            },{
                columnWidth : .6,
                tag : 'label',
                hidden: true,
                border : false,
                html : '注意：本地文件上传会有同名文件覆盖风险<a class="infos" data-qtip="系统将自动完成：压缩-&gt;传输-&gt;解压-&gt;校验"></a>',
                style : 'margin: 5 0 0 0;color:#FF0000'
            }]
        });
        return panel;
    },    
    _createFileListPanel : function(){
        

        
        var panel = new Ext.Panel({
            id : 'fileListPanel',
            border : false,
            items : [{
                xtype : 'panel',
                border : false,
                items :[{
	                xtype : 'multiselect',
	                id : 'msFileList',
	                width : 490,
	                minHeight : 100,
	                store :Ext.create('Ext.data.JsonStore', {
	                	proxy: {
	                		type: 'memory',
	                		data : this._fileList
	                	},
	                    fields : ['value','text']
	                }),
	                displayField: 'text',
	                valueField: 'value',
                }],
                buttons:[{
                        id : 'btnRemove',
                        text : '删除选中',
                        ref : '../btnRemove'
                    },{
                        id : 'btnRemoveAll',
                        text : '清空',
                        ref : '../btnRemoveAll'
                    }]
            },{
                xtype : 'container',
                layout : 'anchor',
	            defaults :{
	                msgTarget : 'under'
                },                 
                padding : '5 0 5 0',
                border : false,
                items :[{
                    id : 'txtTargetFilePath',
                    xtype : 'textfield',
                    allowBlank : false,
                    anchor : '90%',
                    width : 500,
                    sideText : '如果该路径不存在，系统将自动创建该路径。&lt;br&gt;允许使用作为文件传输目的地址的路径为：&lt;br&gt;&nbsp;&nbsp;&nbsp;&nbsp;linux服务器：/usr, /data,/tmp,/home,/data1,/data2,/data3,/data4,/opt。&lt;br&gt;&nbsp;&nbsp;&nbsp;&nbsp;windows服务器：除了C:\\WINDOWS\\system32之外的所有目录',
                    emptyText : '请填写分发的路径',
                    fieldLabel : '分发至',
		            validator : function(value){
		                value = value.trim();
		                if(value.length===0){
		                    return "分发至路径不允许为空";
		                }             
		                return Ext.ijobs.common.Kit.validPath(value);
		            }                    
                },{
                    id : 'txtSpeedLimit',
                    xtype : 'textfield',
                    anchor : '90%',
                    vtype : 'Number',
                    sideText : '涉及windows专区或微小分布IDC时建议限速(0表示不限速)',
                    allowBlank : false,
                    fieldLabel : '限速（KBps）',
                    value : defaultSpeedLimit || 10000
                }]
            }]
        });
        return panel;
    },

    _createIPListPanel : function(){
        var ipList = new Ijobs.common.ux.IPGridPanel({
            id : 'ipListPanel',
            anchor : '80%',
            hideScriptAddition : true,
            applicationId : this.applicationId,//所属业务
            pageSize : 10,//分页数
            hosts : [],//主机IP
            border :false,
            fieldLabel : 'JobIP'
        });
        return ipList;
    },
    _createAccountCombox : function(){
        var store = Ext.create('Ext.data.JsonStore', {
        	proxy: {
        		type: 'ajax',
                url : './jobs/getUserAccountsByApp.action',
                baseParams : {
                    'userAccount.application.id' : -1
                }
        	},
            fields : [
                'id',
                'accountName',
                'application',
                'accountAlias',
                'accountPassWord',
                'isLDAPUser',
                {
                    name:"accountAliasSelect",
                    convert:function(v,record){
                    	var d = record.data;
                        return d.accountName !=='undefined' 
                            ? d.accountAlias+ " 账号:"+d.accountName
                            : d.accountAlias;
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
            editable : true,
            triggerAction: 'all',
            valueField: 'id',
            displayField: 'accountAliasSelect'
        });
        return cmb;
    },
    _createButtons : function(){
        return [{
            text : '<i class="icon-white icon-ok"></i>&nbsp;开始传输',
            style : 'margin :0 0 0 93px',
            cls : 'opera btn_main long',
            ref : '../btnTransfer'
        }];
        
    }
    
});

//end file