/**
 * 文本步骤
 * @author v_jfdong
 * @description 文本步骤组件
 * @requires 
 */

Ext.ns('Ext.ijobs.job.step');
/**
 * 文本步骤
 * @class Ext.ijobs.job.step.JobStepText
 * @extends Ext.FormPanel
 */
Ext.define('Ext.ijobs.job.step.JobStepTextUI', {extend: 'Ext.form.Panel',
	
    constructor : function(config){
        config = Ext.apply({
            border : false,
            toolkit :  Ext.ijobs.common.Kit,
            frame : false,
            autoHeight : config.initData.module==="INSTANCE",
            bodyStyle:'padding:15px 5px 0 20px',
            defaultType : 'textfield',
            defaults :{
                msgTarget : 'under',
                anchor : '90%'
            },
            autoScroll : true
        },config);
        
       Ext.ijobs.job.step.JobStepTextUI.superclass.constructor.call(this,config);
    },
    
    initComponent : function(){
        var isReadOnly = false;//组件是否只读，true/false:只读/可写
        var isDisplay = false;//组件是否隐藏，true/false:隐藏/显示
        var isDisabled = false; //组件是否禁用,true/false:禁用/启用
        var txtStepOperaReadOnly = false;//执行人组件,true/false:只读/可写
        var me = this;
        if (this.initData.module==="INSTANCE") {
            isReadOnly = true;
            isDisplay = true;
            isDisabled = true;
            txtStepOperaReadOnly = true;

        } else if (this.initData.module==="CUSTOM") {
            isReadOnly = true;
            isDisplay = false;
            isDisabled = false;
            txtStepOperaReadOnly = false;
        } else if (this.initData.module==="TEMPLATE") {
            isReadOnly = false;
            isDisplay = false;
            isDisabled = false;
            txtStepOperaReadOnly = false;
        }
        this.items = [{
            id : this.id+'_txtStepName',
            fieldLabel : '步骤名称',
            emptyText : '请输入步骤名称',
            readOnly  : isReadOnly,
            validator : function(value){
                if(value.trim().length===0){
                    return "步骤名称不允许为空";
                }
                return true;
            },
            value : this.initData.name
        },{
            id : this.id + '_txtStepOpera',
            xtype : 'userchooser',
            fieldLabel : '步骤执行人',
            emptyText : '留空时本步骤执行时无需人工干预',
            readOnly : txtStepOperaReadOnly,
            hidden : (this.initData.exeType!==typeDef.exeType[2].value),
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
            id : this.id+'_txtTextDesc',
            fieldLabel : '文本描述',
            readOnly  : isReadOnly,
            xtype : 'textarea',
            autoScroll : true,
            emptyText : '请输入文本描述',
            validator : function(value){
                if(value.trim().length===0){
                    return "文本描述不允许为空";
                }
                return true;
            },             
            value : this.initData.description
        },{
            xtype : 'panel',
            border : false,
            hideLabel : true,
			buttons :[{
	            text : '<i class="icon-ok icon-white"></i>&nbsp;保存步骤',
	            cls : 'opera btn_main long',
	            hidden : isDisplay,
	            ref : '../../btnSaveStep'
	        },{
	            text : '<i class="icon-share-alt icon-white"></i>&nbsp;返回',
	            hidden : isDisplay,
	            cls : 'opera btn_query',
	            handler : function(btn,scope){
	                var win = btn.findParentByType('window');
	                if(Ext.type(win)==="object"){
	                    win.hide();
	                }
	            }
	        }]            
        }];
        Ext.ijobs.job.step.JobStepTextUI.superclass.initComponent.call(this);
    }
});
/**
 * 文本步骤事件
 * @class Ext.ijobs.job.step.JobStepTextAction
 * @extends Ext.ijobs.job.step.JobStepTextUI
 */
Ext.define('Ext.ijobs.job.step.JobStepTextAction', {extend: 'Ext.ijobs.job.step.JobStepTextUI',
	alias: 'widget.step-text',
    initEvents : function(){
        Ext.ijobs.job.step.JobStepTextAction.superclass.initEvents.call(this);
        this.down('button[ref*=btnSaveStep]').on('click',this._saveStep,this);
    },
    
    /**
     * 保存步骤信息
     */
    _saveStep : function(btnSaveStep){
        var form = this.getForm();
                
        if(form.isValid() ){
            this.getEl().mask('正在保存…');
            var fields = form.getFieldValues();
            var params ={
                "appID":this.applicationId,
                "creater":this.creater,                
                exeType: this.initData.exeType,
                stepType: this.initData.stepType,
                name: fields[this.id+"_txtStepName-inputEl"],
                description: fields[this.id+"_txtTextDesc-inputEl"],
                operator: getUserName(this.id+"_txtStepOpera")
            };
            Ext.copyTo(params,
                this.initData,
                (this.initData.module==="TEMPLATE") ? ['jobTemplateId','stepTemplateId'] : ['jobCustomId','stepCustomId']);
            btnSaveStep.disable();
            Ext.Ajax.request({
                url: (this.initData.module==="TEMPLATE") ? "./jobs/updateStepTemplate.action" : "./jobs/updateStepCustom.action",
                scope : this,
                method: "POST",
                params: params,               
                success: function(response,opts) {
                    if (this.toolkit.hasPermission(response)) {
	                    printMsg("文本步骤 【"+fields[this.id+"_txtStepName-inputEl"]+"】保存成功",1);
	                    this.initData.pubicConfigPanel.refreshStepList();                        
                    }
                    btnSaveStep.enable();
                    this.getEl().unmask();
                }
    
            });            
        }
    }
});

//Ext.reg('step-text','Ext.ijobs.job.step.JobStepTextAction');

//end file