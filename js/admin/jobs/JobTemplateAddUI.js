Ext.ns('Ext.ijobs.job.JobTemplateAddUI');
/**
 * 新建作业模板界面
 * @class Ext.ijobs.job.JobTemplateAddUI
 * @extends Ext.Panel
 */
Ext.define('Ext.ijobs.job.JobTemplateAddUI', {extend: 'Ext.Panel', 

    constructor : function(config){
        config = Ext.apply({
            border : false,
            toolkit :  Ext.ijobs.common.Kit,
            bodyStyle: 'padding: 20px 20px 0px 20px',
            autoScroll : true
            //layout: 'form'//ux.row
        },config);
        Ext.ijobs.job.JobTemplateAddUI.superclass.constructor.call(this,config);        
    },
    initComponent : function(){
        this.items = [
            this._createJobBaseInfoPanel()];
        Ext.ijobs.job.JobTemplateAddUI.superclass.initComponent.call(this);
    },
    
    _createJobBaseInfoPanel : function(){
        var panel = new Ext.Panel({
            border : false,
            //autoHeight : true,
            layout : 'column',
            defaults : {
                //layout : 'form',
                border : false,
                labelWidth : 70
            },
            items : [{
                columnWidth : .3,
                style: 'margin-right: 10px;',
                layout: 'anchor',
				items: [{
                    id : 'txtTaskName',
				    xtype     : 'textfield',
				    labelWidth : 70,
				    fieldLabel: '作业名称',
				    //width: 300,
                    anchor : '100%',
                    emptyText : '请填写作业名称',
                    value : this.initData.name
				}]
            },{
                columnWidth : .3,
                style: 'margin-right: 10px;',
                layout: 'anchor',
				items: [{
                    id : 'cmbTaskApplicaton',
				    fieldLabel: '开发商',
				    labelWidth : 70,
                    xtype     : 'app-combo',
                    queryMode : 'local',
                    anchor : '100%',
                    triggerAction: 'all',
                    defaultApp : parseInt(appid,10),
                    emptyText : '请选择…',
                    store : Ext.create('Ext.data.JsonStore', {
                        fields: ["id", "name"],
                        data : this.initData.applicationList,
                        proxy: {
                        	type: 'memory',
                        }
                    }),
                    valueField: "id",
                    displayField: "name",
                    value :  (appid==="-1") ? "" : appid
                }]
            },{
                columnWidth : .3,
                items: [{
                    id : 'cmbTaskType',
                    xtype     : 'combo',
                    queryMode : 'local',
                    root : '',
		            editable : false,
		            triggerAction: 'all',
                    store : Ext.create('Ext.data.JsonStore', {
                    	fields: ["value", "label"],
                    	data : typeDef.jobType.filter(function(value,index,arr){
                            return value.isSystemType===false;
                    	}),
                    	proxy:{
                    		type : 'memory'
                    	}
                    }),
                    valueField: "value",
                    anchor : '90%',
                    displayField: "label",
                    fieldLabel: '作业类型',
                    labelWidth : 70,
                    emptyText : '请选择…',
                    value : this.initData.jobType
                }]
            },{
                columnWidth : .1,
                xtype : 'button',
                id : 'btnCreateTemplate',
                cls : 'opera btn_main long',
                text : '<i class="icon-ok icon-white"></i>&nbsp;创建作业',
                ref : '../btnCreateTemplate'
            },{
            	columnWidth : .6,
            	layout: 'anchor',
            	style: 'margin-right: 10px;',
            	items: [{
            		xtype : 'textarea',
            		anchor : '100%',
            		//width: 600,
            		id : 'txtDes',
        			fieldLabel: '作业备注',
        			labelWidth : 70,
        			emptyText : '请输入作业备注',
        			value : this.initData.des
            	}]
            }]
        });
        return panel;
    }
});

// end file