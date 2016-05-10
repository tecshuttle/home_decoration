var taskTListStore;
var taskTListGrid;
Ext.onReady(function() {
    var kit = Ext.ijobs.common.Kit;
	taskTListStore = Ext.create('Ext.data.JsonStore' , {
		fields : [ "id", "name", "applicationName","taskType", "creater", 'createTime'],
		proxy : {
			reader: {
	            type: 'json',
	            root: 'data',
	            totalProperty : 'totalCount',
	            idProperty: 'name'
	        },
			type : 'ajax',
			url : './personal/userFavoritesAction!getTaskTFromFavorites.action'
		}
	});	
	taskTListGrid = Ext.create('Ext.grid.GridPanel',{
		renderTo : Ext.getBody(),
		frame : false,
        header : false,
		title : '收藏作业',
        style : 'margin: 15px',
		store : taskTListStore,
		columnLines: true,
		columns : [
					{header : "id", dataIndex : 'id', hidden : true},
					{header : "作业名", dataIndex : 'name',
						renderer : function(value, cellMeta, record) {
							return "<a href=\"javascript:getTaskTMainPage("				
								+ record.data['id']
								+ ",'"
								+ record.data['name']
								+ "')\">"
								+ record.data['name'] + "</a> "
						}
					},
					{header : "开发商", dataIndex : 'applicationName' },
					{header : "作业类型", dataIndex : 'taskType',
		                renderer : function(value, cellMeta, record) {
		                    return kit.getStateByType(kit.STATE_TYPE.JOB_TYPE,parseInt(value));
		                }},
					{header : "创建人", dataIndex : 'creater', width : 50},
					{header : "创建时间", dataIndex : 'createTime'},
					{header : "操作", dataIndex : 'action',
						renderer : function(value, cellMeta, record) {
							return "<a href=\"javaScript:delUserFavorites('"
								+ record.get('id') + "',1)\">删除收藏</a>";
						}
		}],
		clicksToEdit : 1,
		forceFit:true,
        viewConfig: {
        	stripeRows : true,	
        	trackOver : true,
            enableRowBody:true,
            showPreview:true
        }
	});
	//taskTListGrid.render('taskTListDIV');
	taskTListStore.load();
});
function getTaskTMainPage(taskTId, taskTName) {
    openNewTab("./jobs/jobTemplateMain.jsp?jobTemplateId="+taskTId,"作业【"+ taskTName + "】主页");                        
}

function delUserFavorites(taskTId,favoriteType) {
	Ext.MessageBox.buttonText.yes = "是";
	Ext.MessageBox.buttonText.no = "否";  
	Ext.MessageBox.confirm("请确认","您确定要删除该收藏吗？",function(button,text){
        if(button == "yes"){
        	Ext.Ajax.request( {
        		url : "./personal/userFavoritesAction!favoritesDelete.action",
        		success : function(xmlHttp) {
	        		if (xmlHttp.responseText.indexOf("success") == -1) {
	        		   printMsg("删除失败", 2);
	        	    } else {
	        	       printMsg("删除成功", 1);
	        	    }
	        		taskTListStore.load();
		        },
		        failure : function() {
		        },
		        method : 'POST',
		        params : {
		        	'favoriteId' : taskTId,
		        	'favoriteType' : favoriteType
		        }
        	});
        }
   });
}

