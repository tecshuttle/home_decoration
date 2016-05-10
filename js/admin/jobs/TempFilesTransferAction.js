Ext.ns('Ext.ijobs.task.TempFilesTransferAction');

Ext.define('Ext.ijobs.task.TempFilesTransferAction', {extend: 'Ext.ijobs.task.TempFilesTransferUI',
    constructor: function(config) {
        
        Ext.ijobs.task.TempFilesTransferAction.superclass.constructor.call(this, config);
    },
    initComponent : function(){
        Ext.ijobs.task.TempFilesTransferAction.superclass.initComponent.call(this);
        
        var ipList  = this.getComponent('ipListPanel');
        Ext.apply(this.COMPONENTS,{
            'panelIPList' : ipList,
            'rdoSourceFile' :this.findById('rdoSourceFile'),
            'panelSourceFile' : this.findById('sourceFilePanel'),
            'cmbApplication' : this.getComponent('cmbApplication'),
            'cmbScript' : ipList.findById('ipListPanel_cmbScript'),
            'cmbAccount' : this.getComponent('cmbAccount'),
            'cmbCommonAccount' : this.findById('cmbCommonAccount'),
            'selectFileList' : Ext.getCmp('msFileList')
        });
    },
    /**
     * 绑定事件
     */
    initEvents : function(){
        Ext.ijobs.task.TempFilesTransferAction.superclass.initEvents.call(this);
        var c =this.COMPONENTS;
        c.rdoSourceFile.on('change',this._doChange,this);
        c.cmbApplication.on('change',this._onApplicationChange,this);
        c.panelSourceFile.down('button[ref*=btnLocalFile]').on('click',this._addLocalFile,this);
        c.panelSourceFile.findById('remoteFilePanel').down('button[ref*=btnAddRemoteFile]').on('click',this._addRemoteFile,this);
        
        c.cmbAccount.getStore().on('load',this._onAccountLoad,this);
        c.cmbCommonAccount.getStore().on('load',this._onCommonAccountLoad,this);
        c.cmbScript.getStore().on('load',this._onScriptLoad,this);
        this.down('button[ref*=btnTransfer]').on('click',this._doTransfer,this);
//        this.on('afterrender',this._onAfterRender,this)
        Ext.getCmp('btnRemove').on('click',this._remove,this);
        Ext.getCmp('btnRemoveAll').on('click',this._removeAll,this);
        
        c.cmbApplication.getStore().load();
    },
    COMPONENTS : {},
    /**
     * 文件来源单选change事件，隐藏显示相关控件
     * @param {} radiogroup
     * @param {} rdoChecked
     */
    _doChange : function(radiogroup,rdoChecked){  

        if(rdoChecked.sourceFile===0){
            Ext.getCmp('localFilePanel').show();
            Ext.getCmp('remoteFilePanel').hide();
        }else{
            Ext.getCmp('localFilePanel').hide();
            Ext.getCmp('remoteFilePanel').show();
        }
        
    },

    /**
     * 加载用户账号数据，并设置初始值，默认选中管理员账户
     * @param {} store
     * @param {} record
     * @param {} opts
     */
    _onAccountLoad: function(store, records, opts) {
        var cmbAccount = this.COMPONENTS.cmbAccount;
        var adminUser = [];
        var generalUser = [];
        if (records.length === 0) {
            cmbAccount.clearValue();
            return;
        }        
        Ext.each(records,function(record){
            var user = record.data;
            user.isLDAPUser ? adminUser.push(user.id) : generalUser.push(user.id);
        });
        if (adminUser.length!==0) {
            cmbAccount.setValue(adminUser[0]);
            return;
        }
        if (generalUser.length!==0) {
            cmbAccount.setValue(generalUser[0]);            
        }        
    },
    /**
     * 加载常用账号数据，并设置初始值，默认选中第一项
     * @param {} store
     * @param {} record
     * @param {} opts
     */
    _onCommonAccountLoad : function(store,records,opts){
        var cmbCommonAccount =this.COMPONENTS.cmbCommonAccount;
        var adminUser = [];
        var generalUser = [];
        if (records.length===0) {
            cmbCommonAccount.clearValue();
            return;
        }
        Ext.each(records,function(record){
            var user = record.data;
            user.isLDAPUser ? adminUser.push(user.id) : generalUser.push(user.id);
        });
        if (adminUser.length!==0) {
            cmbCommonAccount.setValue(adminUser[0]);
            return;
        }
        if (generalUser.length!==0) {
            cmbCommonAccount.setValue(generalUser[0]);            
        }  
    },
    /**
     * 加载CC脚本数据，并设置初始值，默认选中第一项
     * @param {} store
     * @param {} record
     * @param {} opts
     */
    _onScriptLoad : function(store,record,opts){
        var cmbScript =this.COMPONENTS.cmbScript;
        if (record.length===0) {
            cmbScript.clearValue();
            return;
        }
        var f = record[0].data.id;
        cmbScript.setValue(f);
    },
    /**
     * 当所属业务发生变化，cc脚本、作业脚本、用户账户都需要重新加载
     * @param {} cmb
     */
    _onApplicationChange : function(cmb){
        var cmbAccount =this.COMPONENTS.cmbAccount;
        var cmbScript = this.COMPONENTS.cmbScript;
        var cmbCommonAccount = this.COMPONENTS.cmbCommonAccount;
        cmbScript.getStore().load({
            params : {
                'applicationId' : cmb.getValue()
            }
        });
        cmbAccount.getStore().load({
            params : {
                'userAccount.application.id' : cmb.getValue()
            }
        });
        cmbCommonAccount.getStore().load({
            params : {
                'userAccount.application.id' : cmb.getValue()
            }
        });
    },
    /**
     * 新增文件至列表

     */
    _appendFiles : function(){
        var msFileList = Ext.getCmp("msFileList");
        var store = msFileList.getStore();
        store.loadData(this._fileList);
    },
    /**
     * 添加本地文件
     */
    _addLocalFile : function(){
        var txtLocalFile = Ext.getCmp("localFile");
        var localFilePath = txtLocalFile.getValue();
        var _this = this;
        if (localFilePath === '') { 
            return;
        }
        localFileForm = this.getForm();
        localFileForm.submit({
            clientValidation : false,
            url: './common/doUpload.action',
            waitMsg: '上传中…',
            success: function(form, action){
            	
            	var result = action.result.data[0];
                if (result.state !== 0) {
                    //parent.Frame.insertMsg("上传失败：" + result.reason, 1);
                    return;
                }
                result.isLocal = true;
                txtLocalFile.reset();
                
                //parent.Frame.insertMsg("上传成功", 1);
                _this._fileList.push({
                    value : result,
                    text : '本地文件　'+localFilePath
                });
                _this._appendFiles();
                
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
    _addRemoteFile : function(){
        var txtRemoteIP = this.findById('txtRemoteIP');
        var txtFileList = this.findById('txtFileList');
        var cmbCommonAccount = this.COMPONENTS.cmbCommonAccount;
        var validator = Ext.form.VTypes;
        var _this = this;
        if (Ext.isEmpty(txtRemoteIP.getValue()) || Ext.isEmpty(txtFileList.getValue())) {
            return ;
        }
        if(!validator.IPAddress(txtRemoteIP.getValue())){
            parent.Frame.insertMsg("IP[" + txtRemoteIP.getValue() + "]不合法！", 2);
            return;
        }
        if(txtFileList.isValid()){
	        var files = Ext.unique(txtFileList.getValue()
	                    .trim()
	                    .split(/\n/g));
            var commonAccoutStore = cmbCommonAccount.getStore();
	        for ( var i = 0,len = files.length; i < len; i++) {
	            if (files[i].trim().length!==0) {
		            var remoteFileInfo = {
		                isLocal : false,
		                ip : txtRemoteIP.getValue(),
		                user : commonAccoutStore.getById(cmbCommonAccount.getValue()).get('accountName'),
		                accountAliasSelect : cmbCommonAccount.getRawValue(),
		                userAccountId :cmbCommonAccount.getValue(),
                        fileName : files[i]
		            };                                       
                    _this._fileList.push({
                        value : remoteFileInfo,
                        text : '远程文件　'+ remoteFileInfo.fileName +'　'+remoteFileInfo.ip  +'　'+remoteFileInfo.accountAliasSelect
                    });
	            }
	        }
	        _this._appendFiles();
        }
    },
    /**
     * 删除选中的记录
     */
    _remove : function(){
    	var me = this;
        var selectFileList = me.COMPONENTS.selectFileList;
        var selected = selectFileList.getSelected();
        var store = selectFileList.getStore();

        Ext.each(selected,function(record){
        	var index = store.indexOf(record);
        	store.remove(record);
        	me._fileList.splice(index,1);
        });

    },
    /**
     * 删除所有记录
     */
    _removeAll: function(){
        var selectFileList = this.COMPONENTS.selectFileList;
        var store = selectFileList.getStore();
        store.removeAll();
        this._fileList = [];
    },
    /**
     * 传输文件
     */
    _doTransfer : function(){
        var cmbApplication = this.COMPONENTS.cmbApplication;
        var fileList = [];
        var panelIPList = this.COMPONENTS.panelIPList;
        var form = this.getForm();
        var txtTargetFilePath = form.findField('txtTargetFilePath');
        var txtSpeedLimit = form.findField('txtSpeedLimit');
        var cmbAccount = this.COMPONENTS.cmbAccount;
        var hosts = panelIPList.getHosts();
        var isAllBadAgent = true;
        var btnTransfer = this.down('button[ref*=btnTransfer]');
        if(!form.isValid()){
            return;
        }
        if(Ext.isEmpty(cmbApplication.getValue())){
            parent.Frame.insertMsg('请选择开发商！', 2);
            return;
        }
        Ext.each(this._fileList,function(file){
            delete file.value.accountAliasSelect;
            fileList.push(file.value);
        });
        if (fileList.length===0) {
            parent.Frame.insertMsg('文件列表为空！', 2);
            return;
        }
        if(Ext.isEmpty(txtTargetFilePath.getRawValue())){
            parent.Frame.insertMsg('文件分发路径为空！', 2);
            return;
        }
        Ext.each(hosts, function(host) {
            if (host.isAgentOk) {
                isAllBadAgent = false;
                return false;                
            }
        });
        if (hosts.length===0 || isAllBadAgent) {
            parent.Frame.insertMsg('无有效的Agnet状态的IP', 2);
            return;
        }
        var ipList = [];
				Ext.each(panelIPList.getHosts(), function(host) {
            ipList.push(host.ip);
        });	
		var name = this.findById('name');
		if(Ext.isEmpty(name)){
			name = '一次性分发文件';
		}else{
			name = '一次性分发文件-'+name.getValue();
		}
        var params ={
        	'name' : name,
            'applicationId' : cmbApplication.getValue(),
            'fileList' : Ext.encode(fileList),
            'destFileDir' : txtTargetFilePath.getValue(),
            'speedLimit' : txtSpeedLimit.getValue(),
            'ipList': ipList.join(","),
            'accountId' : cmbAccount.getValue(),
            'appID': cmbApplication.getValue()
        };
        btnTransfer.disable();
        Ext.Ajax.request({
            url : './jobs/startSendFile.action',
            params : params,
            scope : this,
            success : function(response,opts){
                if (this.toolkit.hasPermission(response)) {
	                var result = Ext.decode(response.responseText);
                    if (result.taskId > 0) {
                        var thisTabId = getActiveTabId();
                        openNewTab("./jobs/jobRun.jsp?jobInstanceId=" + result.taskId, "执行作业【一次性分发文件】");
                        //closeTab(thisTabId); //保留原tab页
                    } else {
                        parent.Frame.insertMsg("系统异常，请联系管理员。\n" + response.responseText, 2);
                    }
                }
                btnTransfer.enable();
            },
            failure : function(response,opts){
                Ext.Msg.alert('信息','错误代码：' + response.status + '\n错误描述：' + response.statusText)
                btnTransfer.enable();
            }
        });
    }
});

//end file