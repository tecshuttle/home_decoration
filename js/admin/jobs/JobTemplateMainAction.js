/*global Ext, Ijobs, window, document, printMsg, console, top, reset, openNewTab, setInterval, getSelect */

/**
 * 作业模板主页事件
  * @class Ext.ijobs.job.JobTemplateMainAction
  * @extends Ext.ijobs.job.JobTemplateMainUI
  */
Ext.define('Ext.ijobs.job.JobTemplateMainAction', {extend: 'Ext.ijobs.job.JobTemplateMainUI',
    constructor : function(config){
        Ext.ijobs.job.JobTemplateMainAction.superclass.constructor.call(this,config);        
    },
    initComponent : function(){
        Ext.ijobs.job.JobTemplateMainAction.superclass.initComponent.call(this);
        Ext.apply(this.COMPONENTS,{
            jobCustomListPanel : this.findById('jobCustomListPanel')
        });
    },
    initEvents : function(){
        Ext.ijobs.job.JobTemplateMainAction.superclass.initEvents.call(this);
        this.down('button[ref*=btnEditTemplate]').on('click',this._editTemplate,this);
        this.down('button[ref*=btnSyncCustom]').on('click',this._syncCustom,this);
        this.down('button[ref*=btnRemoveJob]').on('click',this._removeJobTemplate,this);
        this.down('button[ref*=btnAddCustom]').on('click',this._addCustom,this);
        this.down('button[ref*=btnCopyCustom]').on('click',this._copyCustom,this);
        this.down('button[ref*=btnRefreshCustom]').on('click',this._refreshCustom,this);
        this.down('button[ref*=btnRemoveCustom]').on('click',this._removeCustom,this);
        /*this.down('button[ref*=btnAuthManage]').on('click',this._authManage,this);授权管理屏蔽*/
        		
        this.findById('jobCustomListPanel').on('boxready',this._initJobCustomList,this);
    },
    COMPONENTS : {},    
    /**
     * 打开编辑作业模板标签页
     */
    _editTemplate : function(){
        var tab = parent.Frame.getActiveTab();
        var urlParams = Ext.urlEncode({
            "jobTemplateId" : this.initData.jobTemplateId
        });
        openNewTab("./jobs/jobTemplateEdit.jsp?"+urlParams,"编辑作业【"+  this.initData.name + "】");        
    },
    /**
     * 同步执行态
     */
    _syncCustom: function (btnSyncCustom) {
        btnSyncCustom.disable();
        Ext.Ajax.request( {
            url : "./jobs/updateTaskIByTaskT.action",
            method : 'POST',
            scope : this,
            params : {
                'jobTemplateId' : this.initData.jobTemplateId,
                'creater' :this.initData.creater,
                'appID':this.initData.applicationId
            },
            success : function(response,opts) {
                if (this.toolkit.hasPermission(response)) {
	                if(-1 !== response.responseText.indexOf("成功")){
	                  printMsg("同步成功",1);
	                  this._refreshCustom();
	                } else {
	                  printMsg("同步失败",2);   
	                }
                }
                
                btnSyncCustom.enable();
	        },
	        failure : function() {
	        }
        });
    },
    /**
     * 删除作业模板
     */
    _removeJobTemplate : function(btnRemoveJob){
        var _this = this;
        Ext.MessageBox.confirm("请确认", "您确定要删除该作业模板吗？", function(button,text) {
            if (button == "yes") {
                btnRemoveJob.disable();
                Ext.Ajax.request({
                    url: "./jobs/deleteTaskT.action",
                    method: "POST",
                    params: {
		                'jobTemplateId' : _this.initData.jobTemplateId,
		                'creater' :_this.initData.creater,
		                'appID':_this.initData.applicationId
                    },
                    success: function(response,opts) {
		                if (_this.toolkit.hasPermission(response)) {
	                        if (response.responseText.indexOf("成功") === -1) {
	                            printMsg("删除作业失败",2);
	                        } else {
	                            printMsg("删除作业成功",1);
	                            closeTab(getActiveTabId());
	                        }
                        }
                        btnRemoveJob.enable();
                    }
                });
            }
        });        
    },
    /**
     * 初始化执行态按钮列表面板
     * @param {} panel
     */
    _initJobCustomList : function(panel){
        var curUser = parent.Frame.getCurUser();
        var _this =this;
        
		var tpl = new Ext.XTemplate(
            '<div>',
            '<div style="padding-bottom:5px;"><input type="checkbox" id="chkHdCustom"/>&nbsp;全选/全不选</div>',
		    '<tpl for="jobCustomList">',
		        '<tpl if="this.isCreater(creater)">',
		            '<div>',
                        '<input type="checkbox" name="chkCustom" value="{id}" creater="{creater}"/>&nbsp;',
                        '<input style="width:auto;overflow:visible;color:#0249CE;" type="button" value="{name}" onclick="javascript:viewJobCustom(\'{id}\',\'{name}\')" />&nbsp;' ,
                        '<tpl if="this.hasAuther(names)">',
                            '<span style="font-size: 10px; color: gray;">{creater}&nbsp;&nbsp;{createTime}&nbsp;&nbsp;{id}</span>',
                         '</tpl>',
                        '<tpl if="this.hasAuther(names)==false">',
                            '<span style="font-size: 10px; color: gray;">{creater}&nbsp;&nbsp;{createTime}&nbsp;&nbsp;{id}&nbsp;&nbsp;已授权给：{names}</span>',
                         '</tpl>',
                         
                         '<tpl if="this.isSync(lastSyncTime)==false">',
                         	'&nbsp;<img src="../images/alert-red.png" style="vertical-align:text-top;" ext:qtip="未同步,最后同步时间：{lastSyncTime}"><span style="font-size: 10px; color: red;">未同步</span>',
                         '</tpl>',
                         '<tpl if="this.isSync(lastSyncTime)==true">',
	                      	'&nbsp;<i class="ch_ico_check" ext:qtip="已同步,最后同步时间：{lastSyncTime}"></i><span style="font-size: 10px;">已同步</span>',
	                      '</tpl>',
                        '</div>',
		        '</tpl>',
                '<tpl if="this.isCreater(creater)==false">',
                    '<div>',
                        '<input type="checkbox" name="chkCustom" value="{id}" creater="{creater}"/>&nbsp;',
                        '<input style="width:auto;overflow:visible;" type="button" value="{name}" onclick="javascript:viewJobCustom(\'{id}\',\'{name}\')" />&nbsp;' ,
                        '<tpl if="this.hasAuther(names)">',
                            '<span style="font-size: 10px; color: gray;">{creater}&nbsp;&nbsp;{createTime}&nbsp;&nbsp;{id}</span>',
                         '</tpl>',
                        '<tpl if="this.hasAuther(names)==false">',
                            '<span style="font-size: 10px; color: gray;">{creater}&nbsp;&nbsp;{createTime}&nbsp;&nbsp;{id}&nbsp;&nbsp;已授权给：{names}</span>',
                         '</tpl>', 
                         '<tpl if="this.isSync(lastSyncTime)==false">',
                      	'&nbsp;<img src="../images/alert-red.png" style="vertical-align:text-top;" ext:qtip="未同步,最后同步时间：{lastSyncTime}"><span style="font-size: 10px; color: red;">未同步</span>',
                      	'</tpl>',
                      	'<tpl if="this.isSync(lastSyncTime)==true">',
	                      	'&nbsp;<i class="ch_ico_check" ext:qtip="已同步,最后同步时间：{lastSyncTime}"></i><span style="font-size: 10px;">已同步</span>',
	                      '</tpl>',
                    '</div>',
                '</tpl>',
		    '</tpl>',
            '</div>',
            {
                compiled: true,
                isCreater : function(creater){
                    return creater===curUser;
                },
                hasAuther : function(name){
                    return name.trim().length===0;
                },
                isSync : function (lastSyncTime){
                	if(Ext.isEmpty(lastSyncTime) || Ext.isEmpty(_this.initData.lastModifyTime)){
                		return "unknown";
                	}
                	var lastSyncTime = Ext.Date.parseDate(lastSyncTime , 'Y-m-d H:i:s');
                	var changeTime = Ext.Date.parseDate(_this.initData.lastModifyTime , 'Y-m-d H:i:s');
                	var syncTimeU = Ext.Date.format(lastSyncTime, 'U');
                	var changeTimeU = Ext.Date.format(changeTime, 'U');
                	return syncTimeU>changeTimeU;                 	
                }
            }
		);
		
        panel.removeAll();
        
        var vv = new Ext.view.View({
            tpl : tpl,
            style : 'padding-top:10px',
            itemSelector : '#chkHdCustom',
            store: Ext.create('Ext.data.JsonStore', {
            	fields: ['createTime','creater','des','id','lastSyncTime','name','names'],
            	proxy: {
            		type: 'memory',
            		reader: {
            			data: this.initData.jobCustomList
            		}
            	}
            }),
            listeners : {
            	 click: {
                     element: 'el', 
                     fn: function(a, b, c) {
                    	 if (b.id === 'chkHdCustom') {
                    		 _this._toggleChecked();
                    	 }
                	 }
                 }
            }
        });
        
        panel.add(vv);
        
        panel.doLayout();
        
        this._refreshCustom();
        
        this._autoHeight(panel);
    },
    
    _autoHeight : function(panel){
        if (panel) {
            panel.setHeight(Ext.getBody().getHeight()-250);
        }
    },
    
    /**
     * 授权管理
     */
    _authManage : function(){
        var checkedCustoms = Ext.query('input[name="chkCustom"]:checked');
        var checkedCustomIds = [];
        if (checkedCustoms.length === 0){
            printMsg("请选择需要授权的执行态",2);
            return;
        }
        Ext.each(checkedCustoms,function(custom){
            checkedCustomIds.push(custom.value);
        });
	    if (!this.authWin) {
	        this.authWin = new Ext.ijobs.job.AuthManageWindow({
                'creater' :this.initData.creater,
                'applicationId':this.initData.applicationId                
            });     
	    }
        this.authWin.checkedCustomIds = checkedCustomIds;
        this.authWin.show();
    },
    /**
     * 删除执行态
     */
    _removeCustom : function(btnRemoveCustom){
        var checkedCustoms = Ext.query('input[name="chkCustom"]:checked');
        var removedCustomIds = [] ,removedCustomCreaters = [];
        var _this = this;
        if (checkedCustoms.length === 0){
            printMsg("请选择需要删除的作业执行态",2);
            return;
        }
        Ext.each(checkedCustoms,function(custom){
            custom = Ext.get(custom);
            if (! custom.parent().dom.hidden) {
                removedCustomIds.push(custom.getValue());
                removedCustomCreaters.push(custom.getAttribute('creater'));
            }
        });
        Ext.MessageBox.confirm("请确认", "您确定要删除选定的执行态吗?", function(button,text) {
            if (button === "yes") {
                btnRemoveCustom.disable();
                Ext.Ajax.request( {
                    url: "./jobs/deleteTaskIs.action",
                    method: "POST",
                    params: {
                        "jobCustomIdList": removedCustomIds.join(","),
                        'creater' :removedCustomCreaters.join(","),
                        'appID':_this.initData.applicationId
                    },                    
                    success: function(response,opts) {
                        if (_this.toolkit.hasPermission(response)) {
	                        if (response.responseText.indexOf("success") !==-1){
	                            printMsg("删除成功",1);
	                            _this._refreshCustom();
	                        } else {
	                            printMsg("删除失败",2);
	                        }
                        }
                        btnRemoveCustom.enable();
                    }
                });
            }
        });          
    },
    /**
     * 复制执行态
     */
    _copyCustom : function(btnCopyCustom){
        var checkedCustoms = Ext.query('input[name="chkCustom"]:checked');
        var copiedCustomIds = [];
        if (checkedCustoms.length === 0){
            printMsg("请选择需要复制的作业执行态",2);
            return;
        }
        Ext.each(checkedCustoms,function(custom){
            copiedCustomIds.push(custom.value);
        });
        btnCopyCustom.disable();
        Ext.Ajax.request( {
            url: "./jobs/copyTaskI.action",
            method: "POST",
            scope : this,
            params: {
                'creater' :this.initData.creater,
                'appID':this.initData.applicationId,                
                "jobCustomIdList": copiedCustomIds.join(",")
            },            
            success: function(response,opts) {
                if (this.toolkit.hasPermission(response)) {
	                if(response.responseText.indexOf("success") !== -1) {
	                    printMsg("复制成功",1);
	                    this._refreshCustom();
	                } else {
	                    printMsg("复制失败",2);
	                }
                }
                btnCopyCustom.enable();
            }
        });
    },
    /**
     * 新增执行态
     */
    _addCustom : function(btnAddCustom){
        Ext.Ajax.request( {
            url : "./jobs/checkJobTemplate.action",
            method : 'POST',
            scope : this,
            params : {
                'jobTemplateId' : this.initData.jobTemplateId
            },
            success : function(response) {
                try{
                    var result = Ext.decode(response.responseText);
                    if (result.result < 0) {
                        printMsg(result.errInfo, 2);
                    } else {
                        btnAddCustom.disable();
				        Ext.Ajax.request( {
				            url : "./jobs/addTaskI.action",
				            method : 'POST',
				            scope : this,
				            params : {
				                'jobTemplateId' : this.initData.jobTemplateId,
                                'appID' : this.initData.applicationId,
                                'creater' : this.initData.creater
				            },
                            success : function(response) {
                                if (this.toolkit.hasPermission(response)) {
	                               try{
	                                    var result = Ext.decode(response.responseText);
	                                    var url = './jobs/jobCustomEdit.jsp?jobCustomId=' +result.jobCustomId;
	                                    this._refreshCustom();
	                                    openNewTab.defer(1000,this,[url,"新建执行态【" + this.initData.name + "】"]);                                    
	                                }catch(e){
	                                    printMsg('新增执行态失败'+e.message, 2);
	                                }
                                }
                                btnAddCustom.enable();
                            }
                        });
                        
                    }
                }catch(e){
                    printMsg('新增执行态失败'+e.message, 2);
                }
            },
            failure : function() {
            }
        }); 
    },
    /**
     * 刷新执行态
     */
    _refreshCustom : function(){
        var me = this,
        	view = this.COMPONENTS.jobCustomListPanel.getComponent(0);
        
        Ext.Ajax.request({
            url: "./jobs/getTaskTMainPage.action",
            scope : this,
            params: {
                jobTemplateId:this.initData.jobTemplateId
            },
            success: function(response,opts) {
                try{
                    var initData =Ext.decode(response.responseText);
                    me.initData = initData;
                    view.update(initData);                    
                    this._autoHeight(this.COMPONENTS.jobCustomListPanel);
                    //清空搜索框输入的内容
                    var textfield = me.findById('searchKey');                    
                    textfield.setValue('');
                }catch(e){
                    printMsg('刷新执行态失败！'+e.message,2);
                }
            }
        });        
    },
    
    /***
     * 过滤执行态
     */
    _filterCustom : function(t){
    	var me = this,
    		jobCustomListPanel = me.COMPONENTS.jobCustomListPanel,
    		panelId = jobCustomListPanel.getId();
    		text = t.getValue();    	
    	if(Ext.isEmpty(text)){
    		var all = Ext.query('input[type="button"]');
    		Ext.each(all,function(a){
        		a.parentElement.hidden = false;
        	});
    		return;
    	}
    	var q = String.format('[value*="{0}"]', text);
    	var b = Ext.query('input[type="button"]:not('+ q +')');
    	Ext.each(b,function(bb){
    		bb.parentElement.hidden = true;
    	});
    	var b = Ext.query('input[type="button"]'+ q +'');
    	Ext.each(b,function(bb){
    		bb.parentElement.hidden = false;
    	});
    	//findParentByType
    	//console.log(b);
    	//console.log(Ext.query(String.format('input[type="button"]:not([value*="{0}"])',text)));
    	return;    	
    },
    
    /**
     * 切换选中状态
     */
    _toggleChecked : function(){
        var isChecked = Ext.getDom('chkHdCustom').checked;
        var chkCustoms = Ext.query('input[name="chkCustom"]');
        
        Ext.each(chkCustoms,function(chkCustom){
            chkCustom.checked = isChecked;
        });
    }
});


//打开执行态页面
var viewJobCustom = function(jobCustomId, jobCustomName){
	parent.Frame.createNewTab(
        	"./jobs/jobCustomEdit.jsp?jobCustomId="+jobCustomId,
            "jobCustom_"+jobCustomId,
            "编辑执行态【"+ jobCustomName + "】"
    );
};

//end file