var queryResultGrid = null;
var queryResultStore = null;

Ext.onReady(function() {	
	
	queryResultStore = Ext.create('Ext.data.Store', {
		        pageSize: 20,
                fields : ['id','name', 'creater', {name : 'formatCreateTime', type : 'date', mapping : 'createTime.time', dateFormat : 'time'},'taskTName','taskTId','taskIName','appid','applicationName'],               
                proxy : {
                	type: 'ajax',
                	url: './jobs/authorizationAction!getOurAuth.action',
                	reader: {
                		type: 'json',
                		root : 'data',
                        totalProperty : 'totalCount',
                        idProperty : 'id'
                	}
                }               
            });
	
    
    
    queryResultGrid = new Ext.grid.GridPanel({               
            	trackOver : true,
        		//autoHeight : true,
            	renderTo: 'queryResultDiv',
        		title : '我被授权的作业',
                header : false,
        		columnLines : true,
        		style : 'margin: 15px',
        		store : queryResultStore,
        		
        			columns : [{
        				header : "作业模版", dataIndex : 'taskTName',
    					renderer : function(value, cellMeta, record) {
    						var	str = "<a href='javascript:return false;'><span onclick='getTaskTMainPage(\"" + record.data['taskTId'] + "\",\""+record.data['taskTName']+"\");return false;'>"+record.data['taskTName']+"</span></a>";
    						return str;
    					}
	    				}, {
	                        header : "开发商",
	                        dataIndex : 'applicationName',
	                        align : 'left'
	                    }, {
	                        header : "执行态名称",
	                        dataIndex : 'taskIName',                  
	                        align : 'left'
	                    }, {
	                        header : "被授权人",
	                        dataIndex : 'name',                  
	                        align : 'left'
	                    }, {
	                        header : "授权人",
	                        dataIndex : 'creater',                  
	                        align : 'left'
	                    }, {
	                        header : "授权时间",
	                        dataIndex : 'formatCreateTime',
	                        align : 'left',
	                        renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')
	                    }, {
	                        header : "取消授权",
	                        dataIndex : 'id',                   
	                        align : 'left',
	                        renderer : function(value, cellMeta, record) {
	    						var	str = "<a href='javascript:return false;'><span onclick='deleteAuth(\"" + record.get('id') + "\",\""+record.data['appid']+"\");return false;'>取消授权</span></a>";
	    						return str;
    					}
                    }],	
        		             
	            bbar: {
	            	xtype : 'pagingtoolbar',
	    			store: queryResultStore,
	    			displayInfo: true,
	    			beforePageText : '页',
	    	        afterPageText : '/ {0}',
	    			displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
	    			emptyMsg: "没有记录",
	    			items :['-','←、→方向键可翻页']
	    		},
	    		clicksToEdit : 1,
	    		forceFit:true,
        		viewConfig: {
        			stripeRows : true,
	            	enableRowBody:true,
	            	showPreview:true
        		}            
            });
    
    queryResultGrid.getStore().load();
    
    var kit = Ext.ijobs.common.Kit;
     
    kit.toggleCollapse();
    kit.bindPagingKeys(queryResultGrid);
    var kit = Ext.ijobs.common.Kit;
    kit.toggleCollapse();
});

function deleteAuth(id,appID){
	Ext.Ajax.request( {
		url : "./jobs/authorizationAction!deleteAuthorization.action",
		success : function(xmlHttp) {
		if(-1 != xmlHttp.responseText.indexOf("success")){
			printMsg("删除授权成功",1);
			queryResultGrid.getStore().reload();
		} else {
			printMsg("删除授权失败",2);	
		}
		},
			failure : function() {
		},
		method : 'POST',
		params : {
			'id' : id,
			'appID':appID
		}
	});
}

function getTaskTMainPage(taskTId, taskTName) {
	openNewTab("./jobs/jobTemplateMain.jsp?jobTemplateId="+taskTId,"作业【"+ taskTName + "】主页");
}
