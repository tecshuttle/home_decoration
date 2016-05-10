var queryResultGrid = null;
var queryResultStore = null;

Ext.onReady(function() {	
	queryResultStore = Ext.create('Ext.data.JsonStore', {
		pageSize: 20,
        fields : ['id','name', 'creater', {name : 'formatCreateTime', type : 'date', mapping : 'createTime.time', dateFormat : 'time'},'taskTName','taskTId','taskIName','applicationName'],
        proxy : {
        	type: 'ajax',
            url : './jobs/authorizationAction!getUserAuthed.action',
            extraParams : {
                start : 0,
                limit : 20
            },
            reader: {
                root : 'data',
                totalProperty : 'totalCount',
                idProperty : 'id'
            }
        }
    });
	
    //var mask = new Ext.LoadMask(Ext.getBody(), {msg:"数据加载中，请等待...",removeMask:true, store:queryResultStore});
    
    queryResultGrid = new Ext.grid.GridPanel({               
        		title : '我被授权的作业',
                header : false,
                style : 'margin: 15px',
        		columnLines : true,
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
                }],
	            bbar: new Ext.PagingToolbar({
	    			store: queryResultStore,
	    			displayInfo: true,
	    			beforePageText : '页',
	    	        afterPageText : '/ {0}',
	    			displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
	    			emptyMsg: "没有记录",
	    			items :['-','←、→方向键可翻页']
	    		}),
	    		clicksToEdit : 1,
	    		forceFit:true,
        		viewConfig: {
        			trackOver : true,
            		stripeRows : true,
	            	enableRowBody:true,
	            	showPreview:true
        		}            
            });
    queryResultGrid.render('queryResultDiv');  
    queryResultGrid.getStore().load();
     var kit = Ext.ijobs.common.Kit;
    kit.toggleCollapse();
    kit.bindPagingKeys(queryResultGrid);
});
function getTaskTMainPage(taskTId, taskTName) {
	openNewTab("./jobs/jobTemplateMain.jsp?jobTemplateId="+taskTId,"作业【"+ taskTName + "】主页");
}
