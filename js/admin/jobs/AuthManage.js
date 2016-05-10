/**
 * 授权管理
 * @author v_jfdong
 * @description 提供普通授权、组授权、职能化授权等功能
 * @requires Ext.ux.form.LovCombo.css,common/utils.js,common/LovCombo.js,common/UserChooser.js,common/LinkColumn.js
 */
Ext.ns('Ext.ijobs.job.AuthManageUI');
/**
 * 受权管理界面
 * @class Ext.ijobs.job.AuthManageUI
 * @extends Ext.Window
 */

Ext.define('Ext.ijobs.job.AuthManageUI', {extend: 'Ext.Window',
    constructor : function(config){
        config = Ext.apply({
			title:'授权管理',
	        layout:'fit',
            toolkit :  Ext.ijobs.common.Kit,
            modal : true,
	        width:900,
	        height:400, 
            checkedCustomIds : [],
	        closeAction:'hide'
        },config);
        Ext.ijobs.job.AuthManageUI.superclass.constructor.call(this,config);          
    },
    initComponent : function(){
        this.items = this._createAuthGrid();
        Ext.ijobs.job.AuthManageUI.superclass.initComponent.call(this);
    },
    _createAuthGrid : function(){
        var _this = this;
        
        var cm = new Ext.grid.ColumnModel({
            defaults : {
                sortable : false,
                align : 'left',
                menuDisabled : true
            },
            columns :[{
                header : "执行态",
                dataIndex : 'taskIName'                  
            },
            {
                header : "被授权人",
                dataIndex : 'authName'                  
            },{
                header : "操作",
                xtype : 'linkcolumn',
                items : [{
                    text : '删除',
                    handler: function(grid, rowIndex, colIndex) {
                        var record = grid.getStore().getAt(rowIndex);
                        _this._removeAuth(record.data.id);
                    }                    
                }]
            }]
        });
        
        var tbar = [{
            xtype : 'tbtext',
            text: '被授权人:'
        },{
            id : 'ucAuther',
            chooserType :1,
            xtype : 'userchooser'
        },{
            id : 'btnNormalAuth',
            text : '普通授权',
            icon: "./images/add.gif",
            ref : '../btnNormalAuth'
        },'-',{
            id : 'cmbGroupAuth',
            //xtype : 'lovcombo',
            xtype : 'ijobscombo',
            multiSelect: true,
            emptyText : '请选择组授权',
            beforeBlur: Ext.emptyFn,
            store : Ext.create('Ext.data.Store', {
                autoLoad : true,
	            fields : ['id', 'name'],
                proxy: {
                	type: 'ajax',
                	url : './jobs/groupAuthAction!getApplicationGroupAuth.action',
                	extraParams : {
                        applicationId : this.applicationId,
                    },
                	reader: {
                		type: 'json',
                		root : 'data'
                	}
                }
	        }),
            //typeAhead : true,
            mode : 'local',
            triggerAction : 'all',
            valueField : 'id',
            displayField : 'name',
            editable: true
        },{
            id : 'btnGroupAuth',
            text : '组授权',
            icon: "./images/add.gif",
            ref : '../btnGroupAuth'
        },'-',{
            id : 'btnSpecialAuth',
            text : '职能化授权',
            icon: "./images/add.gif",
            ref : '../btnSpecialAuth'
        }];
        
        var store  = Ext.create('Ext.data.Store', {
            pageSize: 10,        	
            fields : ['id','authName','taskIName'],
            proxy: {
            	type: 'ajax',
            	url : './jobs/authorizationAction!getAuthorizationList.action',
            	reader: {
            		root : 'data',
            		totalProperty : 'totalCount',
            	}
            }
        });
        
        var grid = new Ext.grid.GridPanel({
            trackMouseOver : true,
            stripeRows : true,
            border : false,
            frame : false,
            title : '职能化人员列表',
            header : false,
            store : store,
            loadMask : {
                msg :'正在加载数据，请稍等…'
            },
            cm : cm,
            forceFit : true,
            tbar : tbar,
            bbar: new Ext.PagingToolbar({
                store: store,
                displayInfo: true,
                beforePageText : '页',
                afterPageText : '/ {0}',
                displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
                emptyMsg: "没有记录"
            })
        });
        
        return grid;
    }
});
/**
 * 授权管理事件
 * @class Ext.ijobs.job.AuthManageAction
 * @extends Ext.ijobs.job.AuthManageUI
 */
Ext.define('Ext.ijobs.job.AuthManageAction', {extend: 'Ext.ijobs.job.AuthManageUI',
    constructor : function(config){
        Ext.ijobs.job.AuthManageAction.superclass.constructor.call(this,config);        
    },
    initComponent : function(){
        Ext.ijobs.job.AuthManageAction.superclass.initComponent.call(this);
        Ext.apply(this.COMPONENTS,{
            autherGrid : this.get(0)
        });
    },
    COMPONENTS : {},
    initEvents : function(){
        Ext.ijobs.job.AuthManageAction.superclass.initEvents.call(this);
        this.on('beforeshow',this._onBeforeShow,this);
        
        this.COMPONENTS.autherGrid.down('button[ref*=btnNormalAuth]').on('click',this._normalAuth,this);
        this.COMPONENTS.autherGrid.down('button[ref*=btnGroupAuth]').on('click',this._groupAuth,this);
        this.COMPONENTS.autherGrid.down('button[ref*=btnSpecialAuth]').on('click',this._specialAuth,this);
    },
    _onBeforeShow : function(win){
        var store = this.COMPONENTS.autherGrid.getStore();
        store.load({
            params  : {
                taskIds : this.checkedCustomIds,
                start : 0,
                limit : 10
            }
        });
        
        //Ext.getCmp('ucAutherValue').setValue('');
        Ext.getCmp('cmbGroupAuth').reset();
    },
    /**
     * 取消授权
     * @param {} id
     */
    _removeAuth : function(id){
	    Ext.Ajax.request( {
	        url : "./jobs/authorizationAction!deleteAuthorization.action",
            method : 'POST',
            scope : this,
            params : {
                'id' : id,
                'appID':this.applicationId
            },            
	        success : function(xmlHttp) {
                if (this.toolkit.hasPermission(xmlHttp)) {
	                if(-1 != xmlHttp.responseText.indexOf("success")){
	                	var proxy = this.COMPONENTS.autherGrid.getStore().getProxy();
	                	Ext.apply(proxy.extraParams, {taskIds: this.checkedCustomIds});
	                    this.COMPONENTS.autherGrid.getStore().reload();
	                    printMsg("删除授权成功",1);
	                } else {
	                    printMsg("删除授权失败",2);   
	                }                    
                }
	        },
	            failure : function() {
	        }

	    });        
    },
    /**
     * 普通授权
     */
    _normalAuth : function(){
        var auther = Ext.getCmp('ucAuther').getValue();
        var index = auther.lastIndexOf(';');
        if (index !== -1) {
            auther = auther.substring(0,index);
        }
        Ext.Ajax.request( {
            url : "./jobs/authorizationAction!addAuthorization.action",
            method : 'POST',
            scope : this,
            params : {
                'name' : auther,
                'taskIds':this.checkedCustomIds,
                'authType':1,
                'appID':this.applicationId
            },
            success : function(xmlHttp) {
                if (this.toolkit.hasPermission(xmlHttp)) {
	                if(-1 != xmlHttp.responseText.indexOf("success")){
	                    this.COMPONENTS.autherGrid.getStore().reload();
	                    printMsg("授权成功",1);
	                } else if(-1 != xmlHttp.responseText.indexOf("noRoleUser")){
	                	Ext.MessageBox.show({
	                        title: '授权失败',	                        
	                        msg: '授权失败！用户 '+auther+' 没有授权角色权限，<br/>请通知 '+auther+'前往<a style="text-decoration:underline;color:red" target="_blank"" href="http://sec.cm.com/RightApplyPersonal/?sys_id=510">敏感权限系统</a> 申请iJobs"授权角色"',
	                        buttons: Ext.MessageBox.OK,	                       
	                        icon: 'ext-mb-error'
	                    });	                	
	                    //printMsg("被授权人未在角色系统注册，授权失败",2);    
	                } else{
	                    printMsg("授权失败",2);
	                }
                }
            },
            failure : function() {
            }
        });
    },
    /**
     * 组授权
     */
    _groupAuth : function(){
        var cmbGroupAuth = Ext.getCmp('cmbGroupAuth');
        var name = cmbGroupAuth.getRawValue();
        var groupids = cmbGroupAuth.getValue();
        
        Ext.Ajax.request( {
            url : "./jobs/authorizationAction!addGroupAuthorization.action",
            method : 'POST',
            scope : this,
            params : {
                'name' : name,
                'taskIds':this.checkedCustomIds,
                'authType':3,
                'appID':this.applicationId,
                'groupids' : groupids.join(',')
            },            
            success : function(xmlHttp) {
                if (this.toolkit.hasPermission(xmlHttp)) {
	                if(-1 != xmlHttp.responseText.indexOf("success")){
	                    this.COMPONENTS.autherGrid.getStore().reload();
	                    printMsg("授权成功",1);
	                } else if(-1 != xmlHttp.responseText.indexOf("noRoleUser")){
	                    printMsg("授权失败,请申请授权角色！",2);    
	                } else{
	                    printMsg("授权失败",2);
	                }
                }
            },
            failure : function() {
            }
        });        
    },
    /**
     * 职能化授权
     */
    _specialAuth : function(){
        Ext.Ajax.request( {
            url : "./jobs/authorizationAction!addAuthorization.action",
            method : 'POST',
            scope : this,
            params : {
                'taskIds':this.checkedCustomIds,
                'authType':2,
                'appID':this.applicationId
            },            
            success : function(xmlHttp) {
                if (this.toolkit.hasPermission(xmlHttp)) {
	                if(-1 != xmlHttp.responseText.indexOf("success")){
	                    this.COMPONENTS.autherGrid.getStore().reload();
	                    printMsg("授权成功",1);
	                } else {
	                    printMsg("授权失败",2); 
	                }
                }
            },
            failure : function() {
            }
        });
    }
});

Ext.ijobs.job.AuthManageWindow = Ext.ijobs.job.AuthManageAction;

//end file