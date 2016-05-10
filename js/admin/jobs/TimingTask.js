Ext.ns('Ext.ijobs.job.TimingTaskUI');
/**
 * 定时任务
 * @class Ext.ijobs.job.TimingTaskUI
 * @extends Ext.Window
 */
Ext.ijobs.job.TimingTaskUI = Ext.extend(Ext.Window,{
    constructor : function(config){
        config = Ext.apply({
            toolkit :  Ext.ijobs.common.Kit,
            title : '定时任务',
            layout:'fit',
            resizable : false,
            width:500,
            height: 240,
            modal : true,
            plain: true,
            cronExpressionVal : undefined,//定时规则默认值
            ccParamVal : undefined,//CC脚本默认值
            cronDescVal : undefined,//任务描述默认值
            //外部参数
            taskID : 0,//任务ID
            applicationID : 0,//属性业务ID
            creater : '' //当前登录人 
        },config);
        Ext.ijobs.job.TimingTaskUI.superclass.constructor.call(this,config);        
    },
    initComponent : function(){
        this.items = this._createFormPanel();
        this.buttons =[{
                id : this.id +'_btnSave',
                ref : '../btnSaveTimingTask',
                text:'保存'
            },{
                id : this.id + '_btnClose',
                ref : '../btnCloseTimingTask',
                text: '关闭'
            }];
        Ext.ijobs.job.TimingTaskUI.superclass.initComponent.call(this);
    },
    
   /* destroy : function(){
    	console.log(this.items);
    	
        this.items = null;
        
        this.down('button[ref*=btnSaveTimingTask]').purgeListeners();
        this.down('button[ref*=btnCloseTimingTask]').purgeListeners();
        
        delete this.items;
        
        Ext.ijobs.job.TimingTaskUI.superclass.destroy.call(this);
    },*/
    
    _createFormPanel : function(){
    	var me = this;
    	
        var form = new Ext.FormPanel({
        	id: 'ttForm',
            frame : false,
            labelWidth: 75,
            defaults: {
                width: 400,
                msgTarget :'under',
            },
            defaultType: 'textfield',
            bodyStyle:'padding:10px 10px 0',
            border : false,
            items : [{
                id : this.id+'_txtCronExpression',
                name : this.id+'_txtCronExpression',
                sideText : '<table style=\'font:11\'><tr><td>字段域</td><td>允许的值</td><td>允许的字符</td></tr><tr><td>秒</td><td>0-59</td><td>, - * /</td></tr><tr><td>分</td><td>0-59</td><td>, - * /</td></tr><tr><td>小时</td><td>0-23</td><td>, - * /</td></tr><tr><td>日期</td><td>1-31</td><td>, - * ? / L W C</td></tr><tr><td>月份</td><td>1-12或JAN-DEC</td><td>, - * /</td></tr><tr><td>星期</td><td>1-7或SUN-SAT</td><td>, - * ? / L C #</td></tr><tr><td>年(可选)</td><td>留空 1970-2099</td><td>, - * /</td></tr></table><FONT color=#800080>注意:日期和星期必须有一个为?问号</FONT><br>例：<br>\'0 0 12 * * ?\' 表示每天中午12点触发<br>\'0 0/5 14,18 * * ?\'在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发<br>详细说明请登录KM中ijob说明板块查看',
                fieldLabel : '定时规则',
                emptyText : '请输入定时规则',
                validator : function(value){
                    if(value.trim().length===0){
                        return "定时规则不允许为空";
                    } else if (/^\*/.test(value.trim())) {
                        return "为防止误操作,系统暂时不允许在秒域上使用*字符";
                    }
                    return true;
                },                
                value : this.cronExpressionVal
            },{
                xtype: 'displayfield',
                style : 'font-size:11px;margin-left:80;',
                value: '1-7或SUN-SAT代表星期，其中1代表周日SUN'
            },{
                id : this.id+'_txtCronDesc',
                name : this.id+'_txtCronDesc',
                fieldLabel : '任务描述',
                emptyText : '请输入任务描述',
                validator : function(value){
                    if(value.trim().length===0){
                        return "任务描述不允许为空";
                    }
                    return true;
                },                
                value : this.cronDescVal
            },{
                id : this.id+'_txtStarter',
                name : this.id+'_txtStarter',
                xtype : 'userchooser',
                fieldLabel : '启动人',
                value : this.creater,
                msgTarget :'under',
                validator : function(value){
                	value = value.trim();
                	if(value.length === 0){
                		return "请指定定时作业的启动人！";
                	}
                    if(value.split(';').length > 1){
                        return "任务只能设置一个启动人!";
                    } 
                    return true;
                }
            },{
                xtype : 'displayfield',
                labelStyle : 'color:red;width:400px;',
                fieldLabel : '重要提醒：对于一次性的定时调度规则，请务必加上年份。',
                labelSeparator : '',
                value  : ''
            }]
        });

        return form;
    }
});


/**
 * 定时任务事件响应
 * @class Ext.ijobs.job.TimingTaskAction
 * @extends Ext.ijobs.job.TimingTaskUI
 */
Ext.ijobs.job.TimingTaskAction = Ext.extend(Ext.ijobs.job.TimingTaskUI,{
     constructor : function(config){
        Ext.ijobs.job.TimingTaskAction.superclass.constructor.call(this,config);        
    },
    
    initEvents : function(){
        Ext.ijobs.job.TimingTaskAction.superclass.initEvents.call(this);
        
        this.down('button[ref*=btnSaveTimingTask]').on('click',this._saveTimingTask,this);
        this.down('button[ref*=btnCloseTimingTask]').on('click',this._close,this);
    },
    
    /**
     * 保存定时任务
     */
    _saveTimingTask : function(){
        var _this = this;

        var formPanel = Ext.getCmp('ttForm');
        var form = formPanel.getForm();
        
        if(form.isValid()){
            var params = formPanel.getValues();            
            Ext.Ajax.request( {
                url : "./jobs/crontabTaskAction!addCrontabTask.action",
                method : 'POST',
                params : {
                    'taskExecuteId'  : _this.taskID,
                    'cronDesc'       : params[_this.id+'_txtCronDesc'].trim(),
                    'cronExpression' : params[_this.id+'_txtCronExpression'].trim(),
                    "starter"        : params[_this.id+'_txtStarter'].trim(),      
                    "appID":_this.applicationID,
                    "creater":_this.creater
                },
                success : function(response,opts) {
                    if (_this.toolkit.hasPermission(response)) {
	                    if (response.responseText.indexOf("success") === -1) {
	                        printMsg(response.responseText.trim(), 2);
	                    } else {
	                        printMsg("定时任务定制成功", 1);
	                        _this._close();
	                    }
                    }
                },
                failure : function(response,opts) {
                }

            });            
        }
    },
    
    _close : function(){
        this.close();
    }
});

Ext.ijobs.job.TimingTaskWindow = Ext.ijobs.job.TimingTaskAction;

//end file