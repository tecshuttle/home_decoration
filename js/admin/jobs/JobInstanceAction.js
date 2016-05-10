/**
 * 作业实例查看页面事件 
 * @class Ext.ijobs.job.JobInstanceAction
 * @extends Ext.ijobs.job.JobInstanceUI
 */
Ext.ijobs.job.JobInstanceAction = Ext.extend(Ext.ijobs.job.JobInstanceUI,{
    constructor : function(config){
        Ext.ijobs.job.JobInstanceAction.superclass.constructor.call(this,config);

    },
    initComponent : function(){
        Ext.ijobs.job.JobInstanceAction.superclass.initComponent.call(this);
        Ext.apply(this.COMPONENTS,{
            'stepEditPanel' :this.get('stepEditPanel')
        });        
    },
    initEvents  : function(){
        Ext.ijobs.job.JobInstanceAction.superclass.initEvents.call(this);
    },
    COMPONENTS : {},
    _showStepTypeEditPanel : function(stepType,stepInitData){
        var _stepEditPanel = this.COMPONENTS.stepEditPanel;
        var stepComponent = null;
        switch (stepType){
            case this.STEP_TYPE.UNDEFINED:
                break;
            case this.STEP_TYPE.EXE_SCRIPT:
                stepComponent = {
                    xtype : 'step-exe-script',
                    applicationId:    this.initData.applicationId,
                    readOnly : true,
                    initData : stepInitData
                };                
                break;
            case this.STEP_TYPE.DISPATCH_FILE:
                stepComponent = {
                    xtype : 'step-transfer',
                    applicationId:    this.initData.applicationId,
                    initData : stepInitData                    
                };
                break;
            case this.STEP_TYPE.PULL_FILE:
                stepComponent = {
                    xtype : 'step-pull',
                    applicationId:    this.initData.applicationId,
                    initData : stepInitData                    
                };
                break;
            case this.STEP_TYPE.TEXT_STEP:
                stepComponent = {
                    xtype : 'step-text',
                    applicationId:    this.initData.applicationId,
                    initData : stepInitData
                };                 
                break;
            default :
                break;
        }        

        _stepEditPanel.removeAll();
        _stepEditPanel.add(stepComponent);
        _stepEditPanel.doLayout();
        _stepEditPanel.expand();        
    },
    /**
     * 编辑步骤信息
     * @param {int} stepID 步骤id
     * @param {int} stepType 步骤类型
     * @param {string} stepName 步骤名称
     */
    _editStep : function(stepID,stepType,stepName){

        var initData = null;
        Ext.Ajax.request({
            scope: this,
            url: "./jobs/getStepInstanceContent.action",
            method: "POST",
            params: {
                "jobInstanceId": this.initData.jobInstanceId,
                "stepInstanceId": stepID,
//                "stepType" : stepType,
                "appID":this.initData.applicationId,
                "creater":this.initData.creater
            },            
            success : function(response,opts) {
                var initData =  Ext.decode(response.responseText);                 
                initData = Ext.apply(initData,{
                    stepInstanceId : initData.id,
                    module : 'INSTANCE'
                });
                delete initData.id;
                this._showStepTypeEditPanel(stepType,initData);
            }
        });
    }
});