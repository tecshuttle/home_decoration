Ext.QuickTips.init();
UserAccount = {

	application: {
		id: -1
	},
	isSuccess:0,
	saveFlag:null,
	accountId:null,
	callback: function (res) {
        if (Ext.ijobs.common.Kit.hasPermission(res)) {
        	if(res != -1){
	            url = './jobs/getUserAccountInfo.action?userAccount.id=' + res+"&isSuccess=1";
	            var tab = getActiveTabId();
	            parent.Frame.createNewTab(url, Math.random(), '新建执行账户');
	            closeTab(tab.getId());
        	}else{
        		printMsg("账户添加失败！",2);
            	return false;
        	}
        }
	},
	
	submitFormAsync: function (submit, callBackFunction, beforeSendFunction) {
		var beforeResult = true;
		if (beforeSendFunction != undefined) {
			beforeResult = beforeSendFunction();
		}
		var application = Ext.getCmp('application'),
        	appVal = application.getValue();
		
		var data = {
				'userAccount.application.id':appVal,
				'appID':Ext.getDom("userAccountAppID").value,
				'userAccount.accountAlias' : Ext.getDom("userAccount.accountAlias").value,
				'userAccount.accountName' : Ext.getDom("userAccount.accountName").value,
				'userAccount.accountPassWord' : Ext.getDom("userAccount.accountPassWord").value			
		};
		
		if(Ext.getDom("updateUserAccountInfo_userAccount_id")){
			data['userAccount.id'] = Ext.getDom("updateUserAccountInfo_userAccount_id").value;
		}

		//var form = new Ext.form.Panel(Ext.get(submit.form.id));
		//var data = form.getValues();
		
		if(beforeResult != false){
			Ext.Ajax.request({
		 		url: submit.form.action,					// 提交的页面
		 		params: data,	// 从表单中获取数据	 		
		 		failure: function(request) {		// 设置表单提交出错
		 			new screenClass().unlock();
		 			printMsg("表单提交出错，请稍候再试",2);
		 		},
		 		success: function(data) {
					//console.log(data);
		 			var result = Ext.decode(data.responseText),
		                hasError = result.hasOwnProperty('msgType') & result.msgType === 2;
		                
		            if (result.showInConsole) {
		                printMsg(result.message, result.msgType);
		            }
		            if (!hasError) {
		            	callBackFunction(result);
		            }
		 		}
		 	});
		}
},
	check:function(){
        var application = Ext.getCmp('application'),
            appVal = application.getValue();
		if (Ext.isEmpty(appVal)) {
			printMsg("请选择开发商",2);
			return false;
		}
	
		if ("" == Ext.getDom("userAccount.accountAlias").value) {
			printMsg("请填账户别名",2);
			return false;
		}
		
		if ("" == Ext.getDom("userAccount.accountName").value) {
			printMsg("请填账户名",2);
			return false;
		}
		
		if ("" == Ext.getDom("userAccount.accountPassWord").value) {
			printMsg("请填账户密码",2);
			return false;
		}
		printMsg("正在进行账户别名检测，请稍等...",1);
		var flag;
		if(UserAccount.accountId == null || UserAccount.accountId == ""){
		 	flag= nameCheck("userAccount",Ext.getDom("userAccount.accountAlias").value.trim());
		}else{
			flag= updateNameCheck("userAccount",UserAccount.accountId,Ext.getDom("userAccount.accountAlias").value.trim());
		}
		document.getElementById("application_id").value=appVal;
		document.getElementById("userAccountAppID").value=appVal;
		return flag;
	}
	
	
};


Ext.onReady(function() {
    var appDisabled = false,
        showMore = false,
        isAdmin = false,
        defaultAppID = -1;
    if(UserAccount.application.id===-1){
        defaultAppID = Ext.value(parseInt(appid,10),-1);
        showMore = false;
        appDisabled = false;
        isAdmin = parent.isAdmin;
    } else{
        defaultAppID = UserAccount.application.id;
        showMore = true;
        appDisabled = true;
        isAdmin = true;
    }
    new Ijobs.common.ux.AppComboBox({
        id : 'application',
        triggerAction: "all",
        editable: true,
        mode: "local",
        style: 'margin-left:2px;',
        isAdmin : isAdmin,
        store: new Ext.data.JsonStore({
            autoLoad : true,
            autoDestroy: true,
            url : './common/getAllApplicationList.action',
            fields: ["id", "applicationName"]
        }),
        showMore : showMore,
        disabled : appDisabled,
        defaultApp : defaultAppID,
        valueField: "id",
        displayField: "applicationName",
        emptyText : '请选择开发商',
        renderTo : 'userAccount_application_id'
    
    });
	if(UserAccount.saveFlag == "success"){
		printMsg("保存帐户成功",1);
	}else if(UserAccount.saveFlag == "error"){
		printMsg("保存帐户失败",2);
	}
	
	if(UserAccount.isSuccess == 1){
		printMsg("保存帐户成功",1);
	}
	
    var kit = Ext.ijobs.common.Kit;
});