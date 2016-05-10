/**
 * 设置默认首页
 * Ext.ijobs.job.setHomepageUI
 */
Ext.define('Ext.ijobs.job.setHomepageUI', {extend: 'Ext.Panel',
	constructor : function(config){
		var me = this;
		
        config = Ext.apply({
            border : false,
            toolkit :  Ext.ijobs.common.Kit,
            bodyStyle: 'padding: 15px 30px 30px 30px;',
            dataField : '__homepage',
            expires : new Date('2999/12/31'),//cookie过期时间
            autoScroll : true
        },config);
        me.menuText = new Array();
        me.menuText.push({
        	text : '作业执行历史',
        	herf : './jobs/taskIList.jsp',
        	type : 'job'
        });
        me.menuText.push({
        	text : '作业模版管理',
        	herf : './jobs/getTaskTListSearch.action',
        	type : 'job'
        });
        me.menuText.push({
        	text : '定时调度管理',
        	herf : './jobs/crontabTaskList.jsp',
        	type : 'job'
        });
        me.menuText.push({
        	text : '作业执行态管理',
        	herf : './jobs/jobCustomSearch.jsp',
        	type : 'job'
        });
        me.menuText.push({
        	text : '查询作业脚本',
        	herf : './components/scriptList.jsp?isStandard=0',
        	type : 'script'
        });
        /*me.menuText.push({
        	text : '查询cc脚本',
        	herf : './components/ccScriptList.jsp',
        	type : 'script'
        });*/
        me.menuText.push({
        	text : '我的收藏',
        	herf : './jobs/userFavorites.jsp',
        	type : 'user'
        });
        me.COMPONENTS = {};
        me._cookie = Ext.util.Cookies;
        Ext.ijobs.job.setHomepageUI.superclass.constructor.call(this,config); 
    },
    initComponent : function(){
        this.items = [
                      this._creatRadioGroup()
            ];
        
        Ext.ijobs.job.setHomepageUI.superclass.initComponent.call(this);
    },
    _creatRadioGroup : function(){
    	var me = this,
    		_page = me._cookie.get(me.dataField),
    		menus = new Array();
    	        
        Ext.each(me.menuText,function(menu, index){
        	var value = Ext.encode(menu);
        	var checked = false;
        	//如果有设置，选择设置的项，如果没有设置，选择第一个
        	if(Ext.isEmpty(_page)){
        		if(index === 0){
        			checked = true;
        		}
        	}else{
        		if(value===_page){
        			checked = true;
        		}
        	}
        	var radio = {
        			boxLabel: menu.text,
        			name: 'menus',
        			inputValue: value,
        			checked : checked
        	};
        	menus.push(radio);        	
        });
        var p = Ext.create('Ext.form.FormPanel', {
        	border: false,
        	layout : 'column',
        	height : 200,
        	buttonAlign : 'left',
        	buttons : [{
        		cls : 'opera btn_main',
				text : '<i class="icon-ok icon-white"></i>&nbsp;保存设置',
				ref : '../btnSave'
			}],
        	items : [{
        			xtyple : 'box',
        			html : '<span>请选择一个默认首页，该页面会在登录后显示。默认为"作业执行历史"。</span>',
        			border : false,
        			height : 25,
        			columnWidth : 1
        		},{
					xtype: 'fieldset',
					columnWidth: .5,
					height : 110,
				    title: '&nbsp;默认首页&nbsp;',
				    style : 'margin-right:5px;margin-bottom:15px;',
				    autoHeight: true,
				    labelWidth : 10,
				    items : {
						xtype: 'radiogroup',
						columns : 2,
				        items : menus
				    }
				}
        	]
        }) ;
        me.COMPONENTS.radioPanel = p;
        return p;	
    }
});

/**
 * 事件实现
 */

Ext.define('Ext.ijobs.job.setHomepageAction', {extend: 'Ext.ijobs.job.setHomepageUI',
	initEvents : function(){
        var me    = this,
        	radioPanel = me.COMPONENTS.radioPanel;
        Ext.ijobs.job.setHomepageAction.superclass.initEvents.call(me);   
        
        radioPanel.down('button[ref=../btnSave]').on('click', me._save, me);
    },
    /**
     * 不需要取消功能，删除
    _clear : function(){
    	var me = this;
//    	Ext.util.Cookies.clear('__homepage');
    	Ext.Msg.confirm('确认','确定要取消首页的设置吗？',
    		function(value){
    			if(value == 'yes'){
    				var radioPanel = me.COMPONENTS.radioPanel,
    					form = radioPanel.getForm();
    				
    				var radiogroups =radioPanel.findByType('radiogroup');
    				Ext.each(radiogroups,function(radiogroup){
    					radiogroup.setValue(false);
    				});
    				me._cookie.set(me.dataField,'', new Date());
    				//Ext.util.Cookies.clear(me.dataField);
    				printMsg("取消成功",1);
    			}
    		}
    	);
    	
    },  * 
     */
    _save : function(){
    	var me    = this,
    		radioPanel = me.COMPONENTS.radioPanel,
    		from = radioPanel.getForm(),
    		values = from.getValues();
    	if(Ext.isEmpty(values.menus)){
    		printMsg("请选择你想设置为首页的页面",2);
    		return false;
    	}
    	me._cookie.set(me.dataField,values.menus,me.expires);
    	printMsg("保存成功",1);
    }
});

Ext.ijobs.job.setHomepage = Ext.ijobs.job.setHomepageAction;

//end file