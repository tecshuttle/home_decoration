/**
 * 作业实例查看界面
 * @class Ext.ijobs.job.JobInstanceUI
 * @extends Ext.Container
 */
Ext.ijobs.job.JobInstanceUI = Ext.extend(Ext.Panel,{

    constructor : function(config){
        config = Ext.apply({
            border : false,
            toolkit :  Ext.ijobs.common.Kit,
            bodyStyle: 'padding: 30px',
            autoScroll : true,
            layout: 'form'
        },config);
        Ext.ijobs.job.JobInstanceUI.superclass.constructor.call(this,config);        
    },
    initComponent : function(){
        this.items = [
            this._createJobCustomInfoPanel(),
            this._createCustomStepGrid(),
            this._createJobPublicConfigPanel(),
            this._createJobStepInfoPanel()
        ];
        
        Ext.ijobs.job.JobInstanceUI.superclass.initComponent.call(this);
    },
    /**
     * 步骤类型
     */
    STEP_TYPE : {
        /**
         * 未定义
         */
        UNDEFINED : typeDef.stepType[0].value,
        /**
         *执行脚本 
         */
        EXE_SCRIPT : typeDef.stepType[1].value,
        /**
         *分发文件 
         */
        DISPATCH_FILE : typeDef.stepType[2].value,
        /**
         * 拉取文件
         */
        PULL_FILE : typeDef.stepType[3].value,
        /**
         * 文件步骤
         */
        TEXT_STEP : typeDef.stepType[4].value
        
    },    
    /**
     * 创建步骤信息面板
     */
    _createJobStepInfoPanel : function(){
        var panel = new Ext.form.FieldSet({
            id : 'stepEditPanel',
            layout : 'fit',
            autoScroll : true,
            title : '步骤设置',
            collapsed : true,
            collapsible: true,
            items :{
                xtype : 'displayfield',
                value : '请点击一个步骤名查看'
            }            
        });
        return panel;
    },
    /**
     * 全程设置
     * @return {}
     */
    _createJobPublicConfigPanel : function(){

        var form = new Ext.FormPanel({
            id : 'jobPublicConfigFormPanel',
            border : false,
            items :[{
		        xtype:'fieldset',
		        title: '全程设置',
		        collapsible: true,
                collapsed : false,
                defaults: {
                    anchor: '90%' // leave room for error icon
                },
		        defaultType: 'displayfield',
		        items :[{
                        fieldLabel : '执行模式',
		                anchor : '30%',
                        value : this.toolkit.getStateByType(this.toolkit.STATE_TYPE.EXE_TYPE,this.initData.exeType)
		            },{
		                xtype : 'ip-grid',
                        id : 'ipListPanel',
			            applicationId : this.initData.applicationId,//所属业务
			            pageSize : 10,//分页数
			            hosts : this.initData.ipGridData || [],//主机IP
                        scriptInputType : this.initData.ipGetType || 1,
                        scriptParams : this.initData.ccScriptParam || '',
                        scriptList : this.initData.ccScriptList || [],
                        scriptId : this.initData.ccScriptId,
			            border :false,
                        readOnly : true,
			            fieldLabel : 'JobIP'
		            }/*,{
                        xtype : 'ux-combo',
                        id : 'cmbCommonAccount',
                        anchor : '30%',
                        fieldLabel : '常用账户',
			            mode : 'local',
                        readOnly : true,
			            editable : false,                        
                        store : new Ext.data.JsonStore({
                            data : this.initData.userAccountList,
                            fields : ["id","name"]
                        }),
			            valueField: 'id',
			            displayField: 'name',
                        value : this.initData.userAccountId
                    }*/]
		    }]
        });
        
        return form;
    },
    /**
     * 创建执行步骤列表
     * @return {}
     */
    _createCustomStepGrid : function(){
        
        var _this = this;
        var toolkit = _this.toolkit;
        var store = new Ext.data.JsonStore({
            data : this.initData.stepInstanceList || [],
            fields: ["id","isExec", "jobCustomId","ipFalseCount","ipCount","isUseJobConfigIp","ipGetType", "name", "stepType", "idx", "operator"]
        });

        var cm = new Ext.grid.ColumnModel({
            defaults : {
                sortable : false,
                align : 'left',
                menuDisabled : true
            },
            columns :[
                {header: "id", dataIndex: "id", hidden: true},                
                {header: "jobCustomId", dataIndex: "jobCustomId", hidden: true},
                {header: "执行顺序", dataIndex: "idx",
                    renderer: function(value, cellMeta, record,rowIndex,colIndex,store) {
                        return "第" + (rowIndex + 1) + "步";
                    }
                },{
                    header: "步骤名",
                    dataIndex: "name",
                    xtype : 'linkcolumn',
                    items :[{
                        handler: function(grid, rowIndex, colIndex) {
                            var record = store.getAt(rowIndex);
                            _this._editStep(record.get('id'),record.get("stepType"),record.get("name"));
                        }
                    }]
                },{
                    header: "步骤类型",
                    dataIndex: "stepType",
                    renderer: function(value, cellMeta, record,rowIndex,colIndex,store) {
                        return toolkit.getStateByType(toolkit.STATE_TYPE.STEP_TYPE,value);
                    }
                },{
                    header: "执行人",
                    dataIndex: "operator"
                },{
                    header : "JobIP数（检测失败/总）",
                    dataIndex : "isUseJobConfigIp",
                    renderer : function(value, cellMeta, record,rowIndex,colIndex,store) {
                        var jobConfig = value ? "全程" : "步骤";
                        var isExec = record.get('isExec');
                        var ipFalseCount = record.get('ipFalseCount');
                        var ipCount = record.get('ipCount');
                        var ipGetType = record.get('ipGetType')===typeDef.ipGetType[1].value ? "手工录入" : "CC脚本导入";
                        var stepType = record.get('stepType');
                        var ipStatue = ipFalseCount>0 ?
                            '（<span style="color:red">' + ipFalseCount  + '</span>'  +'/'+ ipCount  +'）':
                            '（' + ipFalseCount  +'/'+ ipCount  +'）';
                        var result = '';
                        if (stepType===_this.STEP_TYPE.TEXT_STEP) {
                            result = '文本步骤无需IP';
                        } else if (!isExec) {
                            result = '跳过执行';
                        } else {
                            result = jobConfig + ipGetType+ ipStatue;
                        }
                        return result;
                    }
                }                    
            ]
        });
        var stepGrid = new Ext.grid.GridPanel({
            id : 'stepGrid',
            autoHeight : true,
            cm : cm,
            style: 'padding: 0 0 20px 0;',
            stripeRows: true,
            deferRowRender:false,
            frame: false,
            store: store,
            forceFit: true,
            columnLines: true
        });
        return stepGrid;
    },
    _createJobCustomInfoPanel : function(){
        var panel = new Ext.Panel({
            layout : 'column',
            autoHeight : true,
            border : false,
            frame : false,
            defaults : {
                layout : 'form',
                border : false,
                frame : false,
                labelWidth : 60
            },
            items : [{
                columnWidth : .4,
                items :[{
                    xtype: 'displayfield',
                    style  : 'padding-top : 3px',
	                fieldLabel : '作业名称',
	                value : this.initData.name
	            }]
            },{
                columnWidth : .3,
                items :[{
                    xtype: 'displayfield',
                    style  : 'padding-top : 3px',
                    fieldLabel : '开发商',
                    value : this.initData.applicationName
                }]
            },{
                columnWidth : .3,
                items :[{                    
                    xtype: 'displayfield',
                    style  : 'padding-top : 3px',
                    fieldLabel : '作业类型',
                    value : this.toolkit.getStateByType(this.toolkit.STATE_TYPE.JOB_TYPE,this.initData.jobType)
                }]
            },{
            	labelWidth : 60,
            	columnWidth : 1,
            	items :[{
                    xtype: 'displayfield',
                    style  : 'padding-top : 3px',
                    fieldLabel : '作业备注',
                    value : Ext.value(this.initData.des,'无')
                }]
            },{
                labelWidth : 120,
                columnWidth : 1,
                hideMode : 'visibility',
                hidden : Ext.value(hideCCScript,false),
                items :[{
                    xtype: 'displayfield',
                    style  : 'padding-top : 3px',
                    fieldLabel : 'CC脚本入口参数',
                    value : Ext.value(this.initData.unityCcParam,'无')
                }]
            
            }]
        });
        return panel;
    }
});