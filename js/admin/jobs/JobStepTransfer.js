/**
 * 分发文件
 * @author v_jfdong
 * @description 分发文件组件
 * @requires 
 */
Ext.ns('Ext.ijobs.job.step');
/**
 * 分发文件步骤
 * @class Ext.ijobs.job.step.JobStepTransferUI
 * @extends Ext.FormPanel
 */
Ext.define('Ext.ijobs.job.step.JobStepTransferUI', {extend: 'Ext.FormPanel',	
    constructor : function(config){
        config = Ext.apply({
            border : false,
            toolkit :  Ext.ijobs.common.Kit,
            frame : false,
            autoHeight : config.initData.module==="INSTANCE",
            fileUpload: true,
            bodyStyle:'padding:15px 5px 0 20px',
            defaultType : 'textfield',
            defaults :{
                msgTarget : 'under',
                anchor : '90%'
            },
            autoScroll : true
        },config);
       Ext.ijobs.job.step.JobStepTransferUI.superclass.constructor.call(this,config);        
    },
    initComponent : function(){
        var isReadOnly = false;//组件是否只读，true/false:只读/可写
        var isDisplay = false;//组件是否隐藏，true/false:隐藏/显示
        var isDisabled = false; //组件是否禁用,true/false:禁用/启用
        var txtStepOperaReadOnly = false;//执行人组件,true/false:只读/可写
        var ipGridReadOnly = false;//ipGrid组件,true/false:只读/可写
        var txtCommandReadOnly = false; //前置、后置命令,true/false:只读/可写
        var txtTargetFilePathReadOnly = false;//分发文件,true/false:只读/可写
        var txtSpeedLimitReadOnly = false;//限速,true/false:只读/可写
        var hideScriptAddition = false;//ipGrid组件中的cc脚本统一附加内容,true/false:隐藏/显示
        
        if (this.initData.module==="INSTANCE") {
            isReadOnly = true;
            isDisplay = true;
            isDisabled = true;
            txtStepOperaReadOnly = true;
            ipGridReadOnly = true;
            txtCommandReadOnly = true;
            txtTargetFilePathReadOnly = true;
            txtSpeedLimitReadOnly = true;
            hideScriptAddition = false;
        } else if (this.initData.module==="CUSTOM") {
            isReadOnly = true;
            isDisplay = false;
            isDisabled = false;
            txtStepOperaReadOnly = false;
            ipGridReadOnly = false;
            txtCommandReadOnly = false;
            txtTargetFilePathReadOnly = false;
            txtSpeedLimitReadOnly = false;
            hideScriptAddition = false;
        } else if (this.initData.module==="TEMPLATE") {
            isReadOnly = false;
            isDisplay = false;
            isDisabled = false;
            txtStepOperaReadOnly = false;
            ipGridReadOnly = false;
            txtCommandReadOnly = false;
            txtTargetFilePathReadOnly = false;
            txtSpeedLimitReadOnly = false;
            hideScriptAddition = true;
        }
        
        this.fileList = this.initData ? (this.initData.sendFileList || []) : [];//分发文件列表
        this.items = [{
            id : this.id+'_txtStepName',
            name : 'txtStepName',
            fieldLabel : '步骤名称',
            emptyText : '请输入步骤名称',
            readOnly  : isReadOnly,
            validator : function(value){
                if (isReadOnly) {
                    return true;
                }                
                if(value.trim().length===0){
                    return "步骤名称不允许为空";
                }
                return true;
            },
            value : this.initData ? (this.initData.name || undefined) : undefined
        },{
            id : this.id+'_txtStepDesc',
            name : 'txtStepDesc',
            fieldLabel : '步骤描述',
            xtype : 'textarea',
            autoScroll : true,
            emptyText : isReadOnly ? '' : '请输入步骤描述',
            readOnly  : isReadOnly,
            validator : function(value){
                if (isReadOnly) {
                    return true;
                }                 
                if(value.trim().length===0){
                    return "步骤描述不允许为空";
                }
                return true;
            },             
            value : this.initData ? (this.initData.description || undefined) : undefined
        },{
            id : this.id+'_txtStepOpera',
            name : 'txtStepOpera',
            xtype : 'userchooser',
            fieldLabel : '步骤执行人',
            readOnly : txtStepOperaReadOnly,
            hidden : (this.initData.exeType!==typeDef.exeType[2].value),
            emptyText : '留空时本步骤执行时无需人工干预',
            validator : function(value){
                value = value.trim();
                if (txtStepOperaReadOnly) {
                    return true;
                }
                var idx = value.lastIndexOf(';');
                if(idx!==value.length-1){
                    value+=';';
                    idx = value.lastIndexOf(';');
                }
                if(idx!==-1){
                    value = value.substring(0,idx);
                    var users = value.split(';');
                    if(users.length!==1){
                        return "只能有一位步骤执行人";
                    }
                }
                return true;
            },            
            value : this.initData.operator
        },{
            id : this.id+'_txtBeforeComm',
            name : 'txtBeforeComm',
            fieldLabel : '前置命令',
            xtype : 'textarea',
            autoScroll : true,
            maxLength : 1000,
            readOnly : txtCommandReadOnly,
            emptyText : txtCommandReadOnly ? '' : '前置命令将在JobIP上执行，无则不填',
            value : this.initData ? (this.initData.beforeComm || undefined) : undefined
        },{
            id : this.id+'_txtAfterComm',
            name : 'txtAfterComm',
            fieldLabel : '后置命令',
            xtype : 'textarea',
            autoScroll : true,
            maxLength : 1000,
            readOnly : txtCommandReadOnly,
            emptyText : txtCommandReadOnly ? '' : '后置命令将在JobIP上执行，无则不填',
            value : this.initData ? (this.initData.afterComm || undefined) : undefined
        },{
            id : this.id+'_txtSpeedLimit',
            name : 'txtSpeedLimit',
            vtype : 'Number',
            sideText : '涉及windows专区或微小分布IDC时建议限速(0表示不限速)',
            allowBlank : false,
            readOnly : txtSpeedLimitReadOnly,
            blankText : '限速不允许为空！',
            fieldLabel : '限速（KBps）',
            value : Ext.value(this.initData.speedLimit,defaultSpeedLimit || 10000)
        },this._createSourceFilePanel(isDisplay),{
            id : this.id+'_txtTargetFilePath',
            name : 'txtTargetFilePath',
            readOnly : txtTargetFilePathReadOnly,
            sideText : '如果该路径不存在，系统将自动创建该路径。&lt;br&gt;允许使用作为文件传输目的地址的路径为：&lt;br&gt;&nbsp;&nbsp;&nbsp;&nbsp;linux服务器：/usr, /data,/tmp,/home,/data1,/data2,/data3,/data4,/opt。&lt;br&gt;&nbsp;&nbsp;&nbsp;&nbsp;windows服务器：除了C:/WINDOWS/system32之外的所有目录',
            emptyText : '请填写分发的路径',
            fieldLabel : '分发至',
            validator : function(value){
                if(txtTargetFilePathReadOnly){
                    return true;
                }
                value = value.trim();
                if(value.length===0){
                    return "分发至路径不允许为空";
                }             
                return Ext.ijobs.common.Kit.validPath(value);
            },
            value : this.initData ? (this.initData.sendFileDir || undefined) : undefined
        },{            
            xtype : 'fieldcontainer',
	    	hideEmptyLabel : false,
	    	items : [{
	    		id : this.id+'_chkUseIPGrid',
	    		name : 'chkUseIPGrid',
	            xtype : 'checkbox',
	            disabled : isDisabled,
	            checked : !this.initData.isUseJobConfigIp,
	            boxLabel: '本步骤使用如下JobIP取代全程JobIP'
	    	}]            
        },{
            id : this.id+'_stepHost',
            xtype : 'ip-grid',
            border : false,
            fieldLabel : 'JobIP',
            readOnly : ipGridReadOnly,
            scriptAddition : this.scriptAddition,
            applicationId : this.applicationId,
            hosts : this.initData ? (this.initData.ipGridData || []) : [],//主机数据
            scriptInputType : this.initData.ipGetType,//IP录入方式
            scriptParams : this.initData.ccScriptParam,//cc脚本参数
            scriptId : this.initData.ccScriptId,//默认选中cc脚本
            scriptList : this.initData.ccScriptList,//cc脚本列表            
            hidden : !!this.initData.isUseJobConfigIp
        },{
            xtype : 'ijobscombo',
            id : this.id+'_cmbCommonAccount',
            name : 'cmbCommonAccount',
            hidden : !!this.initData.isUseJobConfigIp,
            fieldLabel : '常用账户',
            readOnly : ipGridReadOnly,
            emptyText : '请选择常用账户',
            mode : 'local',
            //editable : false,                        
            store : new Ext.data.JsonStore({
                data : [],
                fields : ["id","name","accountName","isLDAPUser"]
            }),
            valueField: 'id',
            displayField: 'name',
            value : ''
        }];
        this.buttons =[{
            text : '<i class="icon-ok icon-white"></i>&nbsp;保存步骤',
            cls : 'opera btn_main long',
            hidden : isDisplay,
            ref : '../btnSaveStep',
            listeners : {
            	boxready : function(btn){
                    var ct = btn.findParentByType('toolbar').container;
                    ct.setStyle({
                        "background-color" : "#FFF"
                    });
                }
            }
        },{
            text : '<i class="icon-share-alt icon-white"></i>&nbsp;返回',
            cls : 'opera btn_query',
            style : 'margin :0 135 0 0',
            hidden : isDisplay,
            handler : function(btn,scope){
                var win = btn.findParentByType('window');
                if(Ext.type(win)==="object"){
                    win.hide();
                }
            }
        }];
        Ext.ijobs.job.step.JobStepTransferUI.superclass.initComponent.call(this);
    },
    _createSourceFilePanel : function(isDisplay) {
        var panel = new Ext.form.FieldContainer({
            id : 'sourceFilePanel',
            defaults :{
                anchor : '100%'
            },            
            layout: 'anchor',
            fieldLabel : '待分发文件',
            border : false,
            items : [
                this._createFileFromPanel(isDisplay),
                this._createLocalFilePanel(isDisplay),
                this._createRemoteFilePanel(),
                this._createFileListPanel(isDisplay)
            ]
        });
        return panel;
    },
    _createFileFromPanel : function(isDisplay){
        var panel = new Ext.Panel({
            border : false,
            hidden : isDisplay,
            layout : 'column',
            items : [{
                columnWidth : .4,
                xtype : 'radiogroup',
                id : 'rdoSourceFile',
                width : 260,
                hidden: true,
                items: [                
                    //{boxLabel: '本地文件',id:'rdoLocalFile', name: 'sourceFile',inputValue : 0},
                    {boxLabel: '远程文件',id:'rdoRemoteFile', name: 'sourceFile', inputValue: 1, checked: true}
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
    _createLocalFilePanel : function(isDisplay){
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
            hidden : isDisplay,
            anchor : '100%',
            id : 'localFilePanel',
            layout : 'column',
            padding : '5 0 5 0',
            hidden: true,
            //autoShow : true,
            items : [{
                layout : 'form',
                border : false,
//                fileUpload: true,
                columnWidth : .8,
                items :[{
                    xtype : 'fileuploadfield',
                    id : 'localFile',
                    hideLabel : true,
                    anchor : '100%',
                    name : 'upload',
                    buttonText : '浏览…',
                    emptyText: '请选择一个文件'
                }]
            },hboxPanel]
            
        });
        return panel;
    
    },
    _createRemoteFilePanel : function(){
        var store = new Ext.data.JsonStore({
            data : [],
            fields : ["id","name","accountName","isLDAPUser"]
        });
        var cmb = new Ext.form.ComboBox({
            id : 'cmbRemoteCommonAccount',
            fieldLabel : '常用账户',
            emptyText : '请选择账户',
            store : store,            
            anchor : '100%',
            mode : 'local',
            typeAhead: true,
            //editable : false,
            triggerAction: 'all',
            valueField: 'id',
            displayField: 'name',
            value : ''
        });
        var panel = new Ext.Panel({
            id : 'remoteFilePanel',
            border : false,
            //hidden : true,
            layout : 'form',
            defaults :{
                msgTarget : 'under',
                anchor : '90%'
            },
            items : [{
                xtype : 'textfield',
                id : 'txtRemoteIP',
                fieldLabel : 'IP',
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
//                hideLabel : true,
                style : 'color:red',
                value  : '使用正则表达式匹配文件总大小大于2G时，请慎用正则表达式，可能使步骤执行时间增加数倍！'                    
            },cmb],
            buttonAlign : 'right',
            buttons : [{
                text : '<i class="icon-white icon-plus"></i>&nbsp;添加',
                cls : 'opera btn_sec',
                ref : '../btnAddRemoteFile'
            },{
                text : '<i class="icon-white icon-pencil"></i>&nbsp;修改',
                tooltip : '请双击列表中的文件修改',
                cls : 'opera btn_sec',
                ref : '../btnEditRemoteFile'
            }]
        });
        
        return panel;
    },
    _createFileListPanel : function(isDisplay){
        var panel = Ext.create('Ext.Panel', {
            id : 'fileListPanel',
            layout : 'form',
            border : false,
            items :[{
                xtype : 'multiselectfield',
                id : 'msTransferFileList',
                hideLabel : true,
                autoWidth : true,
                height : 100,
                msgTarget : 'under',
                store :new Ext.data.JsonStore({
                    data : this.fileList,
                    fields : [{
                        name : 'value',
                        convert : function(v,record){
                            return Ext.encode({
                                isLocal : record.raw['isLocal'],
				                ip : record.raw['ip'],
				                user : record.raw['user'],
				                userAccountId :record.raw['userAccountId'],
				                fileName : record.raw['fileName']                               
                            });
                        }
                    },{
                        name : "text",
                        convert : function(v, record) {
                        	
                            var isLocal = record.raw['isLocal'];
                            var fileName = record.raw['fileName'];
                            return isLocal===true ? '本地文件　'+fileName : '远程文件　'+ fileName +'　IP:'+record.raw['ip'] +'　user:' + record.raw['user'];
                    }}]
                }),
                displayField: 'text',
                valueField: 'value'
            }],            
            buttons:[{
                    id : 'btnRemove',
                    text : '<i class="icon-white icon-trash"></i>&nbsp;删除选中',
                    cls : 'opera btn_sec long',
                    hidden : isDisplay,
                    ref : '../btnRemove'
                },{
                    id : 'btnRemoveAll',
                    cls : 'opera btn_sec',
                    text : '<i class="icon-white icon-remove"></i>&nbsp;清空',
                    hidden : isDisplay,
                    ref : '../btnRemoveAll'
                }]
        });
        return panel;
    }    
});
/**
 * 分发文件步骤事件
 * @class Ext.ijobs.job.step.JobStepTransferAction
 * @extends Ext.ijobs.job.step.JobStepTransferUI
 */
Ext.define('Ext.ijobs.job.step.JobStepTransferAction', {extend: 'Ext.ijobs.job.step.JobStepTransferUI',
	alias: 'widget.step-transfer',
    constructor : function(config){
        Ext.ijobs.job.step.JobStepTransferAction.superclass.constructor.call(this,config);        
    },
    initComponent : function(){
        Ext.ijobs.job.step.JobStepTransferAction.superclass.initComponent.call(this);
        this.modifyFileIndex = null;
        var remoteFilePanel = this.findById('remoteFilePanel');
        var sourceFilePanel = this.findById('sourceFilePanel');
        Ext.apply(this.COMPONENTS,{
            msTransferFileList : this.findById('msTransferFileList'),
            cmbCommonAccount : this.findById(this.id + "_cmbCommonAccount"),
            remoteFilePanel : remoteFilePanel,
            sourceFilePanel : sourceFilePanel,
            cmbRemoteCommonAccount : remoteFilePanel.findById('cmbRemoteCommonAccount')
        });
    },
    initEvents : function(){
        Ext.ijobs.job.step.JobStepTransferAction.superclass.initEvents.call(this);
        this.findById(this.id+'_chkUseIPGrid').on('check',this._onChecked,this);
        this.findById('rdoSourceFile').on('change',this._doChange,this);

        this.down('button[ref*=btnSaveStep]').on('click',this._saveStep,this);
        this.COMPONENTS.remoteFilePanel.down('button[ref*=btnAddRemoteFile]').on('click',this._addRemoteFile,this);
        this.COMPONENTS.remoteFilePanel.down('button[ref*=btnEditRemoteFile]').on('click',this._editRemoteFile,this);
        this.COMPONENTS.sourceFilePanel.down('button[ref*=btnLocalFile]').on('click',this._addLocalFile,this);
        
        this.COMPONENTS.msTransferFileList.boundList.on('itemdblclick',this._setRemoteFile,this);
        //this.COMPONENTS.msTransferFileList.on('itemdblclick',this._setRemoteFile,this);
        
        Ext.getCmp('btnRemove').on('click',this._remove,this);
        Ext.getCmp('btnRemoveAll').on('click',this._removeAll,this); 
        this.COMPONENTS.cmbCommonAccount.getStore().on('datachanged',this._onCommonAccountLoad,this);
        this.COMPONENTS.cmbCommonAccount.on('boxready',this._initCommonAccount,this);
        this.COMPONENTS.cmbRemoteCommonAccount.getStore().on('datachanged',this._onRemoteCommonAccountLoad,this);
        this.COMPONENTS.cmbRemoteCommonAccount.on('boxready',this._initCommonAccount,this);        
    },
    _editRemoteFile : function(btnEditRemoteFile,e){
        var txtRemoteIP = this.findById('txtRemoteIP');
        var txtFileList = this.findById('txtFileList');
        var cmbCommonAccount = this.findById("cmbRemoteCommonAccount");
        var selectFileList = this.COMPONENTS.msTransferFileList;
        var view = selectFileList.view;
        var store = selectFileList.getStore();
        if (Ext.isEmpty(txtRemoteIP.getValue()) || Ext.isEmpty(txtFileList.getValue())) {
            return ;
        }
        if (this.modifyFileIndex===null) {
        	
            printMsg("请双击列表中的文件修改", 1);
            return;
        }
        if(txtRemoteIP.isValid() && txtFileList.isValid()){
            var files = Ext.unique(txtFileList.getValue()
                        .trim()
                        .split(/\n/g));
            var fileList = [];                       
            for ( var i = 0,len = files.length; i < len; i++) {
                if(files[i].trim().length!==0){
	                var remoteFileInfo = {
	                    isLocal : false,
	                    ip : txtRemoteIP.getValue(),
	                    user : cmbCommonAccount.getRawValue(),
	                    userAccountId :cmbCommonAccount.getValue(),
	                    fileName : files[i]
	                };
	                fileList.push(remoteFileInfo);
                }
            }
            store.removeAt(this.modifyFileIndex);
            this.fileList.splice(this.modifyFileIndex,1);
            this.modifyFileIndex = null;
            if (this._isFileExist(fileList)) {
                return;
            }
            Ext.each(fileList,function(file){
                this.fileList.push(file);
            },this);
            this._appendFiles();
            txtRemoteIP.reset();
            txtFileList.reset();
            cmbCommonAccount.reset();
        }        
    },
    _setRemoteFile : function(vw, index, node, e){
        var rec = vw.getSelectedRecords()[0];
        var file = Ext.decode(rec.get('value'));
        var isLocal  = file.isLocal;
        this._isFileExist();
        if (!isLocal) {
            this.modifyFileIndex = index;
            this.findById('rdoSourceFile').setValue({sourceFile:1});
	        var txtRemoteIP = this.findById('txtRemoteIP');
	        var txtFileList = this.findById('txtFileList');
	        var cmbCommonAccount = this.findById("cmbRemoteCommonAccount");
            
            (function(){//延时设置组件的内容，防止远程文件面板还没有显示就已经设置了值，导致txtFileList高度过高问题
                cmbCommonAccount.setValue(file.userAccountId);
                txtRemoteIP.setValue(file.ip);
                txtFileList.setValue(file.fileName);
            }).defer(250);
        }
    },
    COMPONENTS : {},
    _onRemoteCommonAccountLoad : function(store){
    	var records = store.data.items;
        this._setDefaultAccount(this.COMPONENTS.cmbRemoteCommonAccount,records,this.initData.userAccountId);
    },      
    _onCommonAccountLoad : function(store){
    	var records = store.data.items;
        this._setDefaultAccount(this.COMPONENTS.cmbCommonAccount,records,this.initData.userAccountId);
    },    
    _initCommonAccount : function(cmb){
        cmb.getStore().loadData(this.initData.userAccountList);
    },    
    /**
     * 当账户列表没有选中值时，默认选中isLDAPUser为true的账户
     * @param {Componment} cmbAccount 账户下列列表
     * @param {Record} accounts   账户数据
     */
    _setDefaultAccount : function(cmbAccount,accounts,defaultVal){
        var adminUser = [];
        var generalUser = [];
        if (accounts.length===0) {
            cmbAccount.clearValue();
            return;
        }
        if(!Ext.isEmpty(cmbAccount.getValue())){
            return;
        }
        if(defaultVal){
            cmbAccount.setValue(defaultVal);
            return;
        }
        Ext.each(accounts,function(record){
            record.get('isLDAPUser') ? adminUser.push(record.get('id')) : generalUser.push(record.get('id'));
        });
        if (adminUser.length!==0) {
            cmbAccount.setValue(adminUser[0]);
            return;
        }
        if (generalUser.length!==0) {
            cmbAccount.setValue(generalUser[0]);            
        }  
    },     
    _validFileList : function(){
        if (this.fileList.length===0) {
            this.COMPONENTS.msTransferFileList.markInvalid('分发文件列表不允许为空！');
            return false;
        }
        return true;
    },
    /**
     * 删除选中的记录
     */
    _remove : function(){
        var selectFileList = this.COMPONENTS.msTransferFileList;
        var selected = selectFileList.getSelected();
        var store = selectFileList.getStore();
        var me = this;
	    Ext.each(selected,function(record){
        	var index = store.indexOf(record);
        	store.remove(record);
        	me.fileList.splice(index,1);
        });
    },
    /**
     * 删除所有记录
     */
    _removeAll: function(){
        var selectFileList = this.COMPONENTS.msTransferFileList;
        var store = selectFileList.getStore();
        store.removeAll();
        this.fileList = [];        
    },    
    /**
     * 新增文件至列表
     */
    _appendFiles : function(){
        var msTransferFileList = this.COMPONENTS.msTransferFileList;        
        var store = msTransferFileList.getStore();
        
        store.loadData(this.fileList);
        msTransferFileList.clearInvalid();
    },
    /**
     * 判断文件是否存在
     * @param {Array} files 新增的文件列表
     * @return {Boolean} true/false：文件存在/文件不存在
     */
    _isFileExist : function(files){
        var fileList = {};
        var fileExist = [];
        Ext.each(this.fileList,function(file){
            if (file.isLocal) {
                fileList[file.fileName] = file.fileName;
            }else {
                fileList[file.fileName+'_'+file.ip] = file.fileName;
            }
        });
        Ext.each(files,function(file){
            if (file.isLocal) {
                if(fileList.hasOwnProperty(file.fileName)){
                    fileExist.push(file.fileName);
                }
            }else {
                if(fileList.hasOwnProperty(file.fileName+'_'+file.ip)){
                    fileExist.push(file.fileName);
                }
            }
        });
        if (fileExist.length>0) {
            printMsg("文件【"+fileExist.join("、")+"】已存在", 2);
            return true;
        }
        return false;
    },
    /**
     * 添加本地文件
     */
    _addLocalFile : function(){
        var localFileForm= this.getForm();//this.findById('localFilePanel').findByType('form')[0].getForm();
        var txtLocalFile = Ext.getCmp("localFile");
        var localFilePath = txtLocalFile.getValue();
        var _this = this;
        var localFile = null;
        if (localFilePath === '') { 
            return;
        }
        localFile = {
            isLocal : true,
            fileName : localFilePath            
        };
        if(this._isFileExist([localFile])){
            return;
        }
        localFileForm.submit({
            clientValidation : false,
            url: './common/doUpload.action',
            waitMsg: '上传中…',
            success: function(form, action){
                var file = action.result.data[0];
                if (file.state !== 0) {
                    parent.Frame.insertMsg("上传失败：" + file.reason, 2);
                    return;
                }
                txtLocalFile.reset();
                _this.fileList.push(localFile);
                _this._appendFiles();
                parent.Frame.insertMsg("上传成功", 1);
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Failure', 'Ajax communication failed');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                       Ext.Msg.alert('Failure', action.result.msg);
                       break;
               }
            }
        });
    },    
    /**
     * 添加远程文件
     */
    _addRemoteFile : function(btnRemoteFile,event){
        var txtRemoteIP = this.findById('txtRemoteIP');
        var txtFileList = this.findById('txtFileList');
        var cmbCommonAccount = this.findById("cmbRemoteCommonAccount");
        var selectFileList = this.COMPONENTS.msTransferFileList;
        var view = selectFileList.view;
        var store = selectFileList.getStore();
        
        if (Ext.isEmpty(txtRemoteIP.getValue()) || Ext.isEmpty(txtFileList.getValue())) {
            return ;
        }
        if(txtRemoteIP.isValid() && txtFileList.isValid()){
	        var files = Ext.unique(txtFileList.getValue().trim()
	                    .split(/\n/g));
            var fileList = [];                       
	        for ( var i = 0,len = files.length; i < len; i++) {
                if(files[i].trim().length!==0){
		            var remoteFileInfo = {
		                isLocal : false,
		                ip : txtRemoteIP.getValue(),
		                user : cmbCommonAccount.getRawValue(),
		                userAccountId :cmbCommonAccount.getValue(),
		                fileName : files[i]
		            };
	                fileList.push(remoteFileInfo);
                }
	        }
            if (this._isFileExist(fileList)) {
                return;
            }

            Ext.each(fileList,function(file){
                this.fileList.push(file);
            },this);
            this._appendFiles();            
        }
    },    
    /**
     * 文件来源单选change事件，隐藏显示相关控件
     * @param {} radiogroup
     * @param {} rdoChecked
     */
    _doChange : function(radiogroup,rdoChecked){
        if(parseInt(rdoChecked.sourceFile,10)===0){
            Ext.getCmp('localFilePanel').show();
            Ext.getCmp('remoteFilePanel').hide();
        }else{
            Ext.getCmp('localFilePanel').hide();
            Ext.getCmp('remoteFilePanel').show().doLayout();
        }
        
    },    
    _onChecked : function(checkbox,isChecked){
        var stepHost = this.get(this.id + '_stepHost');
        var cmbCommonAccount = this.get(this.id + '_cmbCommonAccount');
        if(isChecked){
            stepHost.show();
            stepHost.doLayout();
            cmbCommonAccount.show();
            this.toolkit.transButtons();
        }else{
            stepHost.hide();
           cmbCommonAccount.hide();
        }
    },    
    /**
     * 保存步骤信息
     */
    _saveStep : function(btnSaveStep){
        var form = this.getForm();
        if(form.isValid() && this._validFileList()){
            this.getEl().mask('正在保存…');
            var fields = form.getFieldValues(); 
            var isUseJobConfigIp = !fields["chkUseIPGrid"];
            var stepHost = this.findById(this.id+'_stepHost');
            
            var params ={
                "appID":this.applicationId,
                "creater":this.creater,                
                exeType: this.initData.exeType,
                stepType: this.initData.stepType,
                name: fields["txtStepName"],
                description: fields["txtStepDesc"],
                operator: fields["txtStepOpera"],
                isUseJobConfigIp: isUseJobConfigIp,
                ipDataId: this.initData.ipDataId,
                beforeComm: fields['txtBeforeComm'],
                afterComm: fields['txtAfterComm'],
                speedLimit: fields["txtSpeedLimit"],
                sendFileDir: fields["txtTargetFilePath"],
                sendFileList: Ext.encode(this.fileList)
            };
            
            
            Ext.copyTo(params,
                this.initData,
                (this.initData.module==="TEMPLATE") ? ['jobTemplateId','stepTemplateId'] : ['jobCustomId','stepCustomId']);            
            
            if(!isUseJobConfigIp){
                var ipList = [];
                Ext.each(stepHost.getHosts(),function(host){
                    ipList.push(host.ip);
                });
                if (parseInt(fields["script"],10)===typeDef.ipGetType[0].value) {
                    Ext.apply(params,{
                        'ccScriptId' : fields[this.id+"_stepHost_hideScript"],
                        'ccScriptParam' : fields[this.id+"_stepHost_txtParams"]
                    });
                }                 
                Ext.apply(params,{
                    ipGetType: fields["script"],
                    ipList: ipList.join(","),
                    userAccountId:fields["cmbCommonAccount"]
                });
            }
            
            //console.log(fields); 
            console.log(params); //return false;
            
            btnSaveStep.disable();
            Ext.Ajax.request({
                url: (this.initData.module==="TEMPLATE") ? "./jobs/updateStepTemplate.action" : "./jobs/updateStepCustom.action",
                scope : this,
                method: "POST",
                params: params,               
                success: function(response,opts) {
                    if (this.toolkit.hasPermission(response)) {
	                    printMsg("分发文件步骤 【"+fields["txtStepName"]+"】保存成功",1);
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

//Ext.reg('step-transfer', 'Ext.ijobs.job.step.JobStepTransferAction');

//end file