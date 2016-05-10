Ext.define('Ext.ijobs.job.AgentMgrUI',{
	extend : 'Ext.Panel',
    COMPONENTS : {},
    constructor : function(config){
        config = Ext.apply({
            border : false,
            toolkit :  Ext.ijobs.common.Kit,
            bodyStyle: 'padding: 30px;',
            autoScroll : true
        },config);
        Ext.ijobs.job.AgentMgrUI.superclass.constructor.call(this,config);        
    },
    initComponent : function(){
        this.items = [
                      this._createSearchPanel(),
                      this._createAgentGrid()
          ];
        Ext.ijobs.job.AgentMgrUI.superclass.initComponent.call(this);
    },
    SPECIAL_VERS : [],
    _createSearchPanel : function(){
        var me = this;
        var panel = new Ext.form.FieldSet({
            title : '查询条件',
            collapsed : false,
            collapsible: true,            
            autoHeight : true,
            layout : 'column',
            defaults : {
                layout : 'anchor',
                border : false,
                frame : false,
                labelWidth : 70
            },
            items: [{
                columnWidth : .35,
                items :[{
                    id : 'txtIPs',
                    xtype: 'textarea',
                    anchor : '98%',
                    fieldLabel : 'IP',
                    autoScroll : true,
                    grow : true,
                    growMin : 22,
                    growMax : 200,
                    emptyText : '多个IP请以“回车”分隔，留空则查询所有IP的Agent状态'
                }]
            },{
                columnWidth : .2,
                items :[{
                    id : 'cmbAgentStauts',
                    xtype: 'combo',
                    anchor : '98%',
                    fieldLabel : 'Agent状态',
                    store : {
                    	autoLoad : true,
                        xtype : 'array',
                        proxy : {
                        	type : 'memory',
                        	reader : {
                        		type : 'array'
                        	}
                        },
                        data : [[-1,'全部'],[0,'异常'],[1,'正常']],
                        fields : ['value','name']
                    },
                    value : -1,
                    emptyText : '请选择…',
                    queryMode : 'local',
                    triggerAction : 'all',
                    valueField : 'value',
                    displayField : 'name',
                    editable: false                         
                }]
                            
            },{
                columnWidth : .25,
                items : [{
                    id : 'cmbAgentVersion',
	                xtype : 'combo',
	                emptyText : '请选择…',
                    anchor : '98%',
                    fieldLabel : 'Agent版本',
	                store : new Ext.data.JsonStore({
	                    autoLoad : true,
	                    proxy : {
	                    	type : 'ajax',
	                    	url : './admin/getAgentVersionList.action'
	                    },                        
	                    fields : ['label','value','ver'],
                        listeners : {
                            load : function(store,records){
                                Ext.each(records,function(record){
                                    ver = me._processAgentVerStr(record.get('ver'));
                                    record.set('label',ver);
                                    record.set('value',ver);
                                    record.commit();
                                });                                
                                /*store.add([
                                    new store.recordType({'label':'全部','value' : ''}),
                                    new store.recordType({'label':'未知','value' : 'NULL'}),
                                    new store.recordType({'label':'Linux','value' : 'Linux'}),
                                    new store.recordType({'label':'Windows','value' : 'Windows'}) 
                                ]);
                                store.sort('value');*/                                
                            }
                        }
	                }),
                    value : '',
                    queryMode : 'local',
	                triggerAction : 'all',
	                valueField : 'value',
	                displayField : 'label',
	                editable: false
                }]            
            },{
                columnWidth : .2,
                xtype : 'panel',
                autoHeight:true,
                //layout: 'hbox',              
                items :[{
                    xtype : 'button',
                    id : 'btnSearch',
                    cls : 'opera btn_main',
                    text : '<i class="icon-search icon-white"></i>&nbsp;搜索',
                    ref : '../btnSearch'
                },{
                    xtype : 'button',
                    id : 'btnReset',
                    style : 'margin-left: 10px;',
                    cls : 'opera btn_sec',
                    text : '<i class="icon-repeat icon-white"></i>&nbsp;重置',
                    ref : '../btnReset'
                }]
            }]
        });
        this.COMPONENTS.searchPanel = panel;
        return panel;
    },
    _createAgentGrid : function(){
        var me = this;
        var store = new Ext.data.JsonStore({
        	proxy : {
        		type : 'ajax',
        		url : './admin/getAgentList.action',
        		extraParams : {
        			'ipList' : '',
                    'status' : -1,
                    'ver' : ''
        		}
        	},            
            totalProperty : 'totalCount',            
            pageSize: 20,
            root : 'data',
            fields : ['ip','assetId','ver','sysLaunchTime','agentLaunchTime','timeStamp','alived','failReason']
        });
        var grid = new Ext.grid.GridPanel({
            style : 'padding:30px 0px 0px 0px;',
            autoScroll : true,
            viewConfig: {
                layout : function() {   
			        if (!this.mainBody) {   
			            return;
			        }
			        var g = this.grid,
                        c = g.getGridEl(),
                        csize = c.getSize(true),
                        vw = csize.width;   
			        if (!g.hideHeaders && (vw < 20 || csize.height < 20)) {
			            return;   
			        }   
			        if (g.autoHeight) {   
			            if (this.innerHd) {   
			                this.innerHd.style.width = (vw) + 'px';   
			            }   
			        } else {   
			            this.el.setSize(csize.width, csize.height);   
			            var hdHeight = this.mainHd.getHeight();   
			            var vh = csize.height - (hdHeight);   
			            this.scroller.setSize(vw, vh);   
			            if (this.innerHd) {   
			                this.innerHd.style.width = (vw) + 'px';   
			            }   
			        }   
			        if (this.forceFit) {   
			            if (this.lastViewWidth != vw) {   
			                this.fitColumns(false, false);   
			                this.lastViewWidth = vw;   
			            }   
			        } else {   
			            this.autoExpand();   
			            this.syncHeaderScroll();   
			        }   
			        this.onLayout(vw, vh);   
			    } ,                
                getRowClass : function(record, rowIndex, rp, ds){ 
                    var rowClass = '';
                    rowClass = record.get('alived') !== 1 ? 'x-grid-row-ip-agent-fail' : '';
                    return rowClass;
                }                
            },
            autoHeight : true,
            bbar: new Ext.PagingToolbar({
                
                store: store,
                items : ['-',{
                	plugins: {
                        ptype: 'zeroclipboard',
                        onCopyComplete : function(client,opt){
                            if (!Ext.isEmpty(opt.text)) {
                                parent.Frame.insertMsg('IP列表复制成功',1);
                            }
                        },
                        targetFunc: me._copy.bind(me)
                    }, 
        			width: 85,
        			xtype : 'button',
        			fixed : true,
        			text :'复制IP',
        			ref : 'btnCopy'	
                }],
                displayInfo: true,
                beforePageText : '页',
                afterPageText : '/ {0}',
                displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
                emptyMsg: "没有记录"
            }),            
            columns :[{
                header : 'IP',          
                dataIndex : 'ip'
            },{
                header : '固资号',
                width : 150,
                dataIndex : 'assetId'
            },{
                header : 'Agent版本',
                width : 120,
                dataIndex : 'ver',                                                                       
                renderer: function(value, metaData, record) {
                    return  me._processAgentVerStr(value);
                } 
            },{
                header : '系统启动时间',
                width : 120,
                dataIndex : 'sysLaunchTime'
            },{
                header : 'Agent启动时间',
                width : 120,
                dataIndex : 'agentLaunchTime'
            },{
                header : '状态最后更新时间',
                width : 120,
                
                dataIndex : 'timeStamp'
            },{
                header : '状态',
                width : 50,
                dataIndex : 'alived',                                                                       
                renderer: function(value, metaData, record) {
                    return value===1 ? '正常' : '异常';
                }                
            },{
                header : '状态异常原因',
                width : 420,
                dataIndex : 'failReason'
            }],
            store : store
        });
        this.COMPONENTS.gridAgent = grid;
        return grid;
    }
});
Ext.define('Ext.ijobs.job.AgentMgrAction',{
	extend:'Ext.ijobs.job.AgentMgrUI',
    constructor : function(config){
        Ext.ijobs.job.AgentMgrAction.superclass.constructor.call(this,config); 
    },
    initEvents : function(){
        Ext.ijobs.job.AgentMgrAction.superclass.initEvents.call(this);
        this.COMPONENTS.searchPanel.down("button[ref='../btnSearch']").on('click',this._search,this);
        this.COMPONENTS.searchPanel.down("button[ref='../btnReset']").on('click',this._reset,this);
    },
    _copy : function(btn){
        var ips = [];
        Ext.each(this.COMPONENTS.gridAgent.getStore().getRange(),function(record){
            ips.push(record.get('ip'));
        });
        if(ips.length!==0){
	        btn.setValue(ips.join("\r\n"));
        }
    },
     /**
      * 处理版本字符，将"Linux IED 3.2.17 Mar 6 2012 10:22:45",去掉时间缀截取成"Linux IED 3.2.17 Mar 6 2012"
      * @param {string} v
      * @return {string}
      */   
    _processAgentVerStr : function(v) {
        v = Ext.value(v,'');
        return v.substring(0,v.search(/\d\d:\d\d:\d\d/));
    },
    _reset : function(){
            var searchPanel = this.COMPONENTS.searchPanel;
            var txtIPS = searchPanel.findById('txtIPs');
            txtIPS.reset();
            txtIPS.getEl().setHeight(txtIPS.growMin);
            searchPanel.findById('cmbAgentStauts').reset();
            searchPanel.findById('cmbAgentVersion').reset();            
    },
    /**
     * 搜索
     */
    _search : function(){
        var store = this.COMPONENTS.gridAgent.getStore(),
            searchPanel = this.COMPONENTS.searchPanel;
            ipsValue = searchPanel.findById('txtIPs').getValue().trim(),
            agentStauts = searchPanel.findById('cmbAgentStauts').getValue(),
            agentVersion = searchPanel.findById('cmbAgentVersion').getValue(),
            errorIPs = [],
            ips = [],
            validator = Ext.form.VTypes,
            params = store.proxy.extraParams;
            
        if( Ext.isEmpty(ipsValue) ){
            params = Ext.apply(params,{
                'ipList' : '',
                'alived' : agentStauts,
                'ver' : agentVersion
            });
        } else {
	        Ext.each(Ext.unique(ipsValue.split(/^\s\s+|\s+/g)),function(ip){
	            !validator.IPAddress(ip) ? errorIPs.push(ip) : ips.push(ip);  
	        }); 
	        if( errorIPs.length>0 ){
	            printMsg('不合法的IP：'+errorIPs.join('、'),2);
	            return;
	        } else {
	            params = Ext.apply(params,{
	                'ipList' : ips.join(","),
                    'alived' : agentStauts,
                    'ver' : agentVersion
	            });
	        }                
        }
        Ext.apply(store.proxy.extraParams,params);
        store.load();
    }
});

Ext.ijobs.job.AgentMgr = Ext.ijobs.job.AgentMgrAction;
