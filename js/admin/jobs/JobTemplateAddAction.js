/**
 * 作业模板主页事件
  * @class Ext.ijobs.job.JobTemplateAddAction
  * @extends Ext.ijobs.job.JobTemplateAddUI
  */
Ext.define('Ext.ijobs.job.JobTemplateAddAction', {extend: 'Ext.ijobs.job.JobTemplateAddUI',
    constructor : function(config){
        Ext.ijobs.job.JobTemplateAddAction.superclass.constructor.call(this,config);
    },
    initComponent : function(){
        Ext.ijobs.job.JobTemplateAddAction.superclass.initComponent.call(this);
  
    },
    initEvents : function(){
        Ext.ijobs.job.JobTemplateAddAction.superclass.initEvents.call(this);
        //this.btnCreateTemplate.on('click',this._createTemplate,this);
        this.down('button[ref*=btnCreateTemplate]').on('click', this._createTemplate, this);
    },
    COMPONENTS : {},
    /**
     * 创建作业模板
     */
    _createTemplate : function(btnCreateTemplate){
        var _this = this;
        var txtTaskName = Ext.getCmp('txtTaskName').getValue().trim();
        var applicationId = Ext.getCmp('cmbTaskApplicaton').getValue();
        var des = Ext.getCmp('txtDes').getValue();
        this._validJobName(txtTaskName,function(){
                btnCreateTemplate.disable();
                Ext.Ajax.request({
                    url : './jobs/addTaskT.action',
                    params : {
                        "name" : txtTaskName,
                        'applicationId' :applicationId,
                        'jobType' : Ext.getCmp('cmbTaskType').getValue(),
                        'appID' : applicationId,
                        'des' : des
                    },
                    success : function(response,opts){
                        btnCreateTemplate.enable();
                    	var result = Ext.decode(response.responseText);
                        if (_this.toolkit.hasPermission(response)) {
                            var tab = getActiveTabId();
                            
                            var jobTemplateId = result.jobTemplateId;
                            var urlParams = Ext.urlEncode({
                                pageID : Math.random(),
                                title :  "作业【" + txtTaskName + "】主页",
                                "jobTemplateId" : jobTemplateId,
                                url : './jobs/jobTemplateMain.jsp?jobTemplateId='+jobTemplateId
                            });
                            openNewTab("./jobs/jobTemplateMain.jsp?jobTemplateId="+jobTemplateId,"作业【" + txtTaskName + "】主页");                             
                            closeTab(tab.getId());
    					} 
                    }
                });                   
        });      
    },
    _validate : function(){
        var applicationId = Ext.value(Ext.getCmp('cmbTaskApplicaton').getValue(),-1);
        var jobType =  Ext.value(Ext.getCmp('cmbTaskType').getValue(),-1);
        var txtTaskName = Ext.getCmp('txtTaskName').getValue().trim();
        if (Ext.isEmpty(txtTaskName)) {
            printMsg("请填写作业名称",2);
            return false;
        }        
        if (-1 === applicationId) {
            printMsg("请选择开发商",2);
            return false;
        }
        if (-1 === jobType) {
            printMsg("请选择作业类型",2);
            return false;
        }       
        return true;
    },
    /**
     * 验证步骤名称
     * @param {string} jobName 步骤名称
     * @param {function} callback 验证结束后的回调
     */
    _validJobName : function(jobName,callback){
        if(!this._validate()){
            return;
        }
        
        printMsg("正在进行作业名称检测，请稍等...",1);
        Ext.Ajax.request({
            url : './common/checkName.action',
            params : {
                "name" : jobName,
                "model" : "taskT"
            },
            success : function(response,opts){
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
    }  
});