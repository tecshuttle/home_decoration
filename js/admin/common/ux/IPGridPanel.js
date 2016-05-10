Ext.define('Ijobs.common.ux.IPGridPanel',{
    extend : 'Ext.form.FieldContainer',
    alias: ['widget.ip-grid'],
    alternateClassName: 'Ijobs.ux.IPGridPanel',
    requires : ['Ext.ux.data.PagingMemoryProxy','Ijobs.ux.ComboBox','Ijobs.ux.ParamInput','Ijobs.ux.ZeroClipboard.ZeroClipboard'],
    constructor: function(config) {
        config = Ext.apply({
            plain:true,
            pageSize : 10,//分页数
            ccScriptURL : "./jobs/getCcResultStatus.action",
            hosts : [],//主机数据
            filterHosts : [],//过滤以后的主机数据
            isFilter : false,//是否过滤
            scriptInputType : this.IP_GET_TYPE.HAND,//IP录入方式
            scriptParams : '',//cc脚本参数
            scriptId : 0,//默认选中cc脚本
            scriptList : [],//cc脚本列表
            readOnly : false,//是否只读,true/false:是/否
            loadMaks :{msg:'加载中…'},
            isHand : false,//是否通过手动方式添加主机,true/false:是/否
            isCCScript : false,//是否通过CC脚本导入方式添加主机,true/false:是/否
            toolkit :Ext.ijobs.common.Kit,
            layout:'anchor'
        }, config);
        config.scriptInputType = config.scriptInputType || this.IP_GET_TYPE.HAND;
        config.scriptList = config.scriptList || [];
        this.COMPONENTS = {};
        this.ERR_HOST = [];
        this.NORMAL_HOST = [];
        this.callParent(arguments);

    },
    _showMask : function(msg){
    	var me = this;
    	me.mask = new Ext.LoadMask({
    		msg:msg,
    		target:me
    	});
    	me.mask.show(); 
    },
    _hideMask : function(){
    	var me = this;
    	if(me.mask){
    		me.mask.hide();
    	}    	
    },
    hideScriptAddition : false,//是否显示cc脚本入口参数附加内容
    hideHand : Ext.value(hideHand,false),//是否显示“手动录入”单选按钮
    hideCCScript : Ext.value(hideCCScript,false),//是否显示“CC脚本导入”单选按钮
    

    /**
     * ip获取方式
     * @type 
     */
    IP_GET_TYPE :{
        /**
         * cc脚本
         * @type 
         */
        CCSCRIPT : typeDef.ipGetType[0].value,
        /**
         * 手动获取
         * @type 
         */
        HAND : typeDef.ipGetType[1].value
    },
    /**
     * 初始化面板
     */
    initComponent : function(){
        this.items = [
                this._createIPInputPanel(),
                this._createGridPanel()
                
            ];
        this.callParent(arguments);   
        this.MAPPING_FIELDS = {};         
        Ext.apply(this.COMPONENTS,{
            rdoInputType :  this.findById(this.id+'_rdoInputType')
        });
    },
    initEvents : function(){
    	
    	var me = this;
    	me.callParent(arguments);

    	var $p = this.COMPONENTS;
        var grid = $p.panelHostGrid;
        $p.rdoInputType.on('change',this._doChange,this);
        this.findById(this.id + '_btnAddIP').on('click',this._addIP,this);
        var btnPanel = grid.getDockedComponent('btnPanel');
        btnPanel.down('button[itemId="_btnClear"]').on('click',this._removeAll,this);
        btnPanel.down('button[itemId="_btnDelete"]').on('click',this._removeHost,this);
        
        $p.panelHostGrid.down('button[itemId="_btnSearch"]').on('click',this._searchIP,this);
        $p.panelCC.down('button[itemId="_btnRefreshScript"]').on('click',this._refreshScript,this);
        $p.panelCC.down('button[itemId="_btnEditScript"]').on('click',this._editScript,this);
        $p.panelCC.down('button[itemId="_btnNewScript"]').on('click',this._newScript,this);
        $p.panelCC.down('button[itemId="_btnGetHosts"]').on('click',this._getHosts,this);

    },    
    onDestroy: function(){
    	this.callParent(arguments);
    },
    _createIPInputPanel : function(){
        var me = this,
        	toolkit = this.toolkit;
        this.hideHand = true;
        this.hideCCScript = true;
        var ipInputPanel = new Ext.Panel({
            border : false,
            header : false ,
            //layout : 'form',
            items : [{
                id : this.id + '_rdoInputType',
                name : this.id + '_rdoInputType',
                hideLabel : true,
                xtype: 'radiogroup',
                disabled : this.readOnly,
                width : 260,
                items: [                
                    {hidden : this.hideHand,boxLabel: toolkit.getStateByType(toolkit.STATE_TYPE.IP_GET_TYPE,this.IP_GET_TYPE.HAND) , name: 'script', inputValue:this.IP_GET_TYPE.HAND, checked: (this.scriptInputType || this.IP_GET_TYPE.HAND)===this.IP_GET_TYPE.HAND},
                    {hidden : this.hideCCScript,boxLabel: toolkit.getStateByType(toolkit.STATE_TYPE.IP_GET_TYPE,this.IP_GET_TYPE.CCSCRIPT), name: 'script',inputValue : this.IP_GET_TYPE.CCSCRIPT,checked : this.scriptInputType===this.IP_GET_TYPE.CCSCRIPT}
                ]
            },
            this._createHandPanel(),            
            this._createCCImportPanel()
            ]
        });
        me.COMPONENTS.rdoInputType = ipInputPanel;        
        return ipInputPanel;
    },
    _createHandPanel : function(){ 
    	var me = this;
        var handPanel = new Ext.Panel({
            id : this.id + '_handPanel',
            name : this.id + '_handPanel',
            border : false,
            hidden : !(this.scriptInputType===this.IP_GET_TYPE.HAND),
            layout : 'column',
            items : [{
                columnWidth : .8,
                xtype : 'textarea',
                autoScroll : true,
                hidden : this.readOnly,
                emptyText : '请输入IP，以“空格”或者“回车”或者“;”分隔',
                grow : true,
                growMin : 25,
                growMax : 400,
                id : this.id + '_hostsIP',
                name : this.id + '_hostsIP'
            },{
                columnWidth : .2,
                border : false,
                layout : 'hbox',
                layoutConfig: {
                    padding:'0 0 0 5',
                    align:'middle'
                },
                defaults:{margins:'0 5 0 0'},        
                items:[{
                    text: '<i class="icon-white icon-plus"></i>&nbsp;IP添加',
                    xtype : 'button',
                    hidden : this.readOnly,
                    height : 25,
                    cls : 'opera btn_sec long',
                    id : this.id + '_btnAddIP',
                    ref : '../btnAddIP'
                }]
            }]
        });
        me.COMPONENTS.panelHand = handPanel; 
        return handPanel;
    },
    _createCCImportPanel : function(){
    	var me = this;
        var ccPanel = new Ext.Panel({
            id : this.id + '_ccPanel',
            name : this.id + '_ccPanel',
            border : false,
            hidden : !(this.scriptInputType===this.IP_GET_TYPE.CCSCRIPT),
            defaults : {
                layout : 'column',
                border : false,
                frame : false
            },            
            items : [{
                defaults : {
                    border : false,
                    layout : 'anchor'
                },                  
                items : [{
                	border : false,
                    columnWidth : .6,
                    items :[{
                        xtype : 'ijobscombo',
                        anchor : '100%',
                        id : this .id + '_cmbScript',
                        itemId : '_cmbScript',
                        name : this .id + '_hideScript',
/*                        hiddenName: this.id + '_hideScript',
                        hiddenId: this.id + '_hideScript',*/
                        hideLabel : true, 
                        readOnly : this.readOnly,
                        emptyText : '请选择CC脚本',
                        queryMode: "local",
                        store: Ext.create('Ext.data.JsonStore', {
                            method: "POST",
                            autoDestroy: true,
                            fields: ["id", "name"],
                            proxy: {
                            	type: 'ajax',
                            	url: "./components/scriptsAction!getCcScriptListByApp.action",
                            	extraParams: {
                                    applicationId: this.applicationId
                                },
                            	reader: {
                            		root: "data"
                            	}
                            }
                        }),
                        listeners: {
                            afterrender: Ext.bind(me._onScriptListAfterRender,me)
                        },
                        valueField: "id",
                        displayField: "name"
                    }]                    
                },{
                    columnWidth : .4,
                    items:[{
                        hideLabel : true, 
                        xtype : 'buttongroup',
                        hidden : this.readOnly,
                        frame : false,
                        defaults :{
                            width :80    
                        },
                        items :[{
                            text: '<i class="icon-pencil icon-white"></i>&nbsp;编辑',
                            cls : 'opera btn_sec',
                            itemId : '_btnEditScript'
                        },{
                            text: '<i class="icon-white icon-plus"></i>&nbsp;新建',
                            cls : 'opera btn_sec',
                            itemId : '_btnNewScript'
                        },{
                            text: '<i class="icon-white icon-refresh"></i>&nbsp;刷新',
                            cls : 'opera btn_sec',
                            itemId : '_btnRefreshScript'
                        }]
                    }]                
                }]
            },{
                defaults : {
                    border : false,
                    layout : 'anchor'
                },
                items : [{
                    columnWidth : .6,
                    items : [{
                        xtype : 'param-input',
                        //xtype : 'textfield',
                        dataName : '__CCScriptParams',
                        anchor : '100%',
                        fieldLabel : 'CC脚本入口参数',
                        emptyText : this.readOnly ? '' : '请输入参数',
                        maxLength : 1000,
                        value : this.scriptParams,
                        readOnly : this.readOnly,
                        itemId : '_txtParams',
                        id : this.id +'_txtParams',
                        name : this.id +'_txtParams'
                    }]
                },{
                    columnWidth : .4,
                    items : [{
                        text: '<i class="icon-th-list icon-white"></i>&nbsp;获取服务器',
                        height : 25,
                        hidden : this.readOnly,
                        cls : 'opera btn_sec long',
                        xtype : 'button',
                        itemId : '_btnGetHosts'
                    }]
                }]
            },{
                defaults : {
                    border : false,
                    layout : 'anchor',
                    labelWidth : 170
                },
                hidden : this.hideScriptAddition,
                items : [{
                    columnWidth : 1,
                    items : [{
                        xtype : 'displayfield',
                        anchor : '100%',
                        style  : 'padding-top : 3px;text-decoration: underline;',
                        fieldLabel : 'CC脚本入口参数统一附加内容',
                        value : Ext.value(this.scriptAddition,'无'),
                        id : this.id +'_txtAddition',
                        name : this.id +'_txtAddition'
                    }]                    
                }]
            }]
        });
        me.COMPONENTS.panelCC = ccPanel; 
        return ccPanel;
    },
    _createGridPanel : function(){
        var me = this ,
	        sm = new Ext.selection.CheckboxModel(); //Ext.grid.CheckboxSelectionModel();
	        sm.handleMouseDown = Ext.emptyFn;
	        
        if (this.hosts.hasOwnProperty('data')) {
            this.hosts = this.hosts.data;
        }
	    var store = Ext.create('Ext.data.Store', {
	            storeId:'simpsonsStore',
	            autoLoad : true,
	            pageSize: me.pageSize,
	            fields:['isAgentOk','ip'],	            
	            proxy: {
	                type: 'pagingmemory'
	            }
	        });
	    
	    Ext.create('Ext.menu.Menu', {	  
		    id : me.id+'_copyBtnmenu',
		    plain : true,
		    minWidth : 85,		    
        	showSeparator : false,	                    	
        	items : [{
        		id : me.id+'_copyBtnGroup',
        		frame : false,
        		columns: 1,            		
            	xtype : 'buttongroup',
                floating: false,	                        
                showSeparator : false,
            	defaults : {
                    plugins: {
                        ptype: 'zeroclipboard',
                        onCopyComplete : function(client,opt){
                            if (!Ext.isEmpty(opt.text)) {
                                parent.Frame.insertMsg('IP列表复制成功',1);
                            }
                        },
                        targetFunc: Ext.bind(me._copyHosts,me)
                    }, 
        			width: 85,
        			xtype : 'button',
        			fixed : true
            	},
            	items : [{
        			text : '已勾选',
        			isButton : false,
        			action : 'selected'
        		},{
        			text : '全部',
        			isButton : false,
        			action : 'all'
        		},{
        			text : '全部异常',
        			isButton : false,
        			action : 'allAgentNotOk'
        		},{
        			text : '　全部正常　',
        			isButton : false,
        			action : 'allAgentOk'
        		}]
        	}]
            	            
		     
		});
	    
        var gridPanel = Ext.create('Ext.grid.Panel', {
            store: store,	            
            columns: [
                { text: 'agent状态',  dataIndex: 'isAgentOk', flex: 1,menuDisabled : true,sortable : false},
                { text: 'JobIP', dataIndex: 'ip', flex: 1 ,menuDisabled : true,sortable : false, renderer: function(value, metaData, record) {
                    metaData.css = "bold";
                    return value;
                }}
            ],
            selModel : Ext.create('Ext.selection.CheckboxModel'),
            forceFit : true, 
            viewConfig : {
            	stripeRows : true,
                getRowClass : function(record, rowIndex, rp, ds){ 
                    var rowClass = '';
                    rowClass = record.get('isAgentOk') !== true ? 'x-grid-row-ip-agent-fail' : '';
                    return rowClass;
                }
            },
            listeners: {
                afterrender: Ext.bind(me._onHostGridRender,me)
            },
            tbar : [{
            	xtype : 'textfield',
            	width : 200,
            	emptyText : '请输入搜索条件...',
            	itemId : '_ipParam',
            	listeners: {
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                        	me._searchIP();
                        }
                    }
                }
            },{
            	xtype : 'button',
            	text : '搜索',
            	itemId : '_btnSearch'        	
            }],	            
        	dockedItems :[{
        		xtype : 'panel',
        		dock : 'bottom',
        		itemId : 'btnPanel',
        		buttonAlign: "center",
        		buttons : [{
                    xtype : 'button',
                    text: "复制IP",
                    fixed : this.fixed,
                    icon: "./images/copy2.png",
                    ref : '../btnCopy',
                    scope: this,
                    menu : me.id+'_copyBtnmenu'              
                },{
                	xtype : 'button',
                    text: "删除选中",                
                    icon: "./images/set.jpg",
                    hidden : this.readOnly,
                    itemId : '_btnDelete',
                    scope: this
                },{
                	xtype : 'button',
                    text: "清空",
                    itemId : '_btnClear',
                    icon: "./images/set.jpg",
                    hidden : this.readOnly,	                    
                    scope: this
                }]
        	},{
        		xtype: 'pagingtoolbar',
        		dock: 'bottom',
        		store: store,
    	        displayInfo: true
        	},{
        		dock: 'top',
        		xtype: 'component',
        		html : '<span id="'+this.id+'_spanIPInfo">本次导入[<label style="color:#FF0000;"> 0 </label>]个IP，共计导入[<label style="color:#FF0000;"> 0 </label>]个IP；agent检测状态异常的IP数量共计[<label style="color:#FF0000;"> 0 </label>]；</span>',
                style : 'font-family:微软雅黑,宋体,Arial;font-size:15px;transparent;border-bottom:1px solid #99BBE8;'
        	}]
        });
	    me.COMPONENTS.panelHostGrid = gridPanel;
        return gridPanel;
    },
    
    _searchIP : function(){
    	
    	var me = this,
			text = me.COMPONENTS.panelHostGrid.down('textfield[itemId="_ipParam"]').getValue();
    	
		if(me.hosts.lenght === 0){
			return;
		}
		if(Ext.isEmpty(text)){
			if(me.isFilter){
				me.isFilter = false;
			}else{
				return;
			}
		}else{
			var regExp = new RegExp(".*" + text + ".*", "i");
			var filter = function(ips){
				return regExp.test(ips.ip);
			};
	
	        	
			var newhosts = me.hosts.filter(filter);
			me.filterHosts = newhosts;
			me.isFilter = true;
		}            		
		me._reconfigure();
    },
    /**
     * 切换IP来源面板
     * @param {} radiogroup
     * @param {} rdoChecked
     */
    _doChange : function(radiogroup,rdoChecked){    	
        if(parseInt(rdoChecked.script,10)===this.IP_GET_TYPE.HAND){
            Ext.getCmp(this.id + '_handPanel').show().doLayout();
            Ext.getCmp(this.id + '_ccPanel').hide();
        }else{
            Ext.getCmp(this.id + '_handPanel').hide();
            Ext.getCmp(this.id + '_ccPanel').show().doLayout();
        }
        this.toolkit.transButtons();
        var hostStore = this.COMPONENTS.panelHostGrid.getStore();
        this.hosts = [];
        
        this._clearCopy();
        hostStore.load();
        this._updateTip(0,0);      
    },

    /**
     * 手动增加
     */
    _addIP : function(){
        var $p = this.COMPONENTS;
        var _this = this;
        var gridHosts = $p.panelHostGrid;
        var txtHostsIP = Ext.unique(
                         Ext.getCmp(this.id+'_hostsIP').getRawValue()
                            .trim()
                            .replace(/^\s\s+|\s+/g,';')
                            .split(';')
                         );
        var hostsIP = {};//所有主机IP,用于验证提高性能
        var arrHostsIP = [];//所有主机IP，用于请求参数
        var appendHostsIP = 0;//新增的主机IP数量
        var isAppend = false ;//是否有新增主机
        if(txtHostsIP.length === 0){
        	_this._hideMask();
            //this.getEl().unmask();
            return;
        }                
        var tbs = gridHosts.getDockedItems('toolbar[dock="top"]'),		
			textfield = tbs[0].findById('_ipParam');
		    textfield.setValue('');
		    _this.isFilter = false;	    
		_this._showMask('正在处理中，请等待...');
	    //_this.getEl().mask('正在处理中，请等待...');
        //复制主机IP
        Ext.each(_this.hosts,function(item){
            var ip =item.ip;
            hostsIP[ip]=ip;
            arrHostsIP.push(ip);
        });
        //验证新增的主机
        var validator = Ext.form.VTypes;
        var errors = [];
        Ext.each(txtHostsIP,function(ip){
            if(validator.IPAddress(ip)){
                 if(!hostsIP.hasOwnProperty(ip)){
                    appendHostsIP++;
                    arrHostsIP.push(ip);
                    isAppend = true;
                 }else{
                    errors.push('IP['+ip+']已存在');
                 }
             }else{
                 if(ip!==''){
                    errors.push('IP['+ip+']不合法');
                 }
             }
        });
        if(errors.length!==0){
            parent.Frame.cleanInfos();
            parent.Frame.insertMsg(errors.join(";"),2);//避免换行，如果换行错误提示样式会乱
        }
        if(!isAppend){
        	this._hideMask();
            //this.getEl().unmask();
            return;
        }
        
        Ext.Ajax.request({
            url: './jobs/getManualIpStatus.action',
            scope: this,
            method: "POST",
            //timeout: 60*1000,
            params: {
                ipList :arrHostsIP.join(",")
            },            
            success: function(response,opts) {
            	_this._hideMask();                
                if(response.responseText.indexOf("html") > 0){
                    parent.Frame.insertMsg("返回IP列表解析出错，导入失败，请检查数据格式是否正确",2);
                    return;
                }
                var result = Ext.decode(response.responseText);
                var hosts = result.data;
                var hostsLen = hosts.length;

                if(!Ext.isEmpty(result.errMsg)){
                    parent.Frame.insertMsg(result.errMsg,2);
                    //return;
                }

                if(hostsLen === 0){
                    return '';
                }                
                Ext.getCmp(this.id+'_hostsIP').reset();
                _this.hosts = hosts;
                _this._updateTip(appendHostsIP,hostsLen);
                _this._reconfigure();
            }
        }); 
    },
    /**
     * 清空所有记录
     */
    _removeAll : function(){
        var $p = this.COMPONENTS;
        var gridHosts = $p.panelHostGrid;
        var hostStore = gridHosts.getStore();
        Ext.Msg.confirm('确认','确认清空所有主机吗？', function(btn, text){
            if (btn === 'yes'){
                //this.hosts = [];
                this._clearCopy();
                hostStore.load();
                this._updateTip(0,0);
            }
        },this);

    },
    /**
     * ip导入情况
     * @param {} addHostsLen 新增主机数量
     * @param {} totalHosts 主机总数
     */
    _updateTip : function(addHostsLen,totalHosts){
        var fails = 0;
        Ext.each(this.hosts,function(host){
            if(Ext.isObject(host)){
                if(!host.isAgentOk){
                    fails++;
                }
            }
        });
        var tip = Ext.getDom(this.id+'_spanIPInfo');
        tip.innerHTML = Ext.String.format('<span id="'+this.id+'_spanIPInfo">本次导入[{0}]个IP，共计导入[{1}]个IP；agent检测状态异常的IP数量共计[{2}]；</span>',
            '<label style="color:#FF0000;"> '+(addHostsLen!==0 ? addHostsLen : totalHosts)+' </label>',
            '<label style="color:#FF0000;"> '+totalHosts+' </label>',
            '<label style="color:#FF0000;"> '+fails+' </label>');
    },
    /**
     * 编辑时作业模板时，设置cc脚本列表默认值
     * @param {} combox
     */
    _onScriptListAfterRender : function(combox){
        if (Ext.isArray(this.scriptList) && this.scriptList.length>0){
            combox.getStore().loadData(this.scriptList);
            if (this.scriptId) {
                combox.setValue(this.scriptId);
            } else {
                if (!this.readOnly) {
                    combox.setValue(this.scriptList[0].id);
                }
            }
        }
    },
    /**
     * 编辑cc脚本
     */
    _editScript : function(){    	
        var $p = this.COMPONENTS;
        var cmbScript = $p.panelCC.findById(this.id + '_cmbScript');
        if(Ext.isEmpty(cmbScript.getValue())){
            return;
        }
        parent.Frame.createNewTab(
        		Ext.String.format('./components/ccScriptEdit.jsp?editable=1&readonly=0&scriptId={0}',cmbScript.getValue()),
            '_eidt_'+cmbScript.getRawValue(),
            Ext.String.format('编辑【{0}】CC脚本',cmbScript.getRawValue())
        );        
    },
    /**
     * 新建cc脚本
     */
    _newScript : function(){
    	var applicationId = this.applicationId,
    		param='';
    	if(!Ext.isEmpty(applicationId)){
    		param='?applicationId='+applicationId;
    	}    	
        parent.Frame.createNewTab('./components/ccScriptEdit.jsp'+param, 'xnode-000', '新建CC脚本');
    },
    /**
     * 刷新cc脚本下拉框
     */
    _refreshScript : function(){
        var $p = this.COMPONENTS;
        var cmbScript = $p.panelCC.findById(this.id + '_cmbScript');
        var store = cmbScript.getStore();
        if(Ext.isEmpty(cmbScript.getValue())){
            return;
        }
        cmbScript.clearValue();
        
        if(this.applicationId){
        	var proxy = store.getProxy();
        	proxy.extraParams.applicationId = this.applicationId;
        }
        
        store.load();
        store.on('load',function(){
        	if (store.getTotalCount()>0) {
                cmbScript.setValue(store.getAt(0).get('id'));
            }
        });
        
    },
    /**
     * 主机面板初始化完成执行相关事件
     * @param {} grid
     */
    _onHostGridRender : function(grid){
        var total = this.hosts.length;
        this._reconfigure();
        this._updateTip(total,total);
    },
    _onHostGridBeforeload : function(store,b,opts){
    	var me = this,
    		hosts = me.isFilter ? me.filterHosts : me.hosts;
    	
    	hosts.sort(function(a,b){
            return a.isAgentOk===true ? 1 : -1;
        });			
        store.proxy.data = {
            'totalProperty': hosts.length,
            'rows':hosts
        };
    },
    /**
     * 重置列及数据
     * @param {} store
     * @param {} opts
     */
    _reconfigure : function(){
    	var me = this;
        var grid = this.COMPONENTS.panelHostGrid;
        var cm = [];//列模型
        var fields = [];
        var excludeFields = ['isAgentOk','ip','ip2long'];//排除字段
        
        var hosts = me.isFilter ? me.filterHosts : me.hosts;
        //固定列
        var sm = grid.getSelectionModel();
        cm = [
            //sm,
            {
            	text: "Agent状态",
                dataIndex: "isAgentOk",
                menuDisabled : true,
                sortable : false,
                renderer: function(value, metaData, record) {
                    metaData.css = "bold";
                    return value===true ? '正常' : '异常';
                }
            },{            	
            	text: "JobIP",
                dataIndex: "ip",
                menuDisabled : true,
                sortable : false,
                renderer: function(value, metaData, record) {
                    metaData.css = "bold";
                    return value;
                }
            }
        ];
        fields = [{
            name: 'isAgentOk',
            mapping: 'isAgentOk',
            type :'boolean'
        },{
            name: 'ip',
            mapping: 'ip'
        }];
        
        var devKeys = [];//包含点号的key
        //动态列
        if (hosts.length>0) {
            var host = hosts[0];
            var newKey = '';
            
            for (var key in host) {
                if (excludeFields.indexOf(key) ===-1) {                	
                    cm.push({
                    	text : key,
                    	menuDisabled : true,
                    	sortable : false,
                        dataIndex: key
                    });
                    if (key.indexOf('.') !=-1){
                    	devKeys.push(key);  
                    }
                    newKey = key.replace(/\./igm,'%2E');
                    excludeFields.push(newKey);
                    fields.push({
                        name : key,
                        mapping : key.replace(/\./igm,'%2E')
                    });
                }
                
                
                
            }
        }
        if(devKeys.length > 0 ){
	        Ext.each(hosts, function(value,index){        	
	        	Ext.each(devKeys,function(key){
	        		var newKey = key.replace(/\./igm,'%2E');
	        		hosts[index][newKey] = hosts[index][key];
	        		//delete hosts[index][key];        		
	        	});
	        	        	
	        });        
        }
        /*var colModel = new Ext.grid.ColumnModel({
            defaults : {
                sortable : false,
                align : 'left',
                menuDisabled : true
            },
            columns : cm
        });*/
        //var Host = Ext.data.Record.create(fields);

        
        //var proxy = new Ext.data.PagingMemoryProxy();
        
        
        me._checkHostAgent(hosts);

        if(me.isFilter){
        	me.filterHosts = hosts;
        }else{
        	me.hosts = hosts;
        }
        /*var reader = new Ext.data.JsonReader({
                totalProperty: 'totalProperty',
                root: 'rows'
        },Host);*/

       
        /*Ext.define('models', {
            extend: 'Ext.data.Model',
            fields: fields
        });*/
        var store = Ext.create('Ext.data.Store', {            
        	fields: fields,
            pageSize: this.pageSize,
            //data : hosts,
            proxy: {
                type: 'pagingmemory',                
                reader: {
                    type: 'json',
                    totalProperty : 'totalProperty',
                    root: 'rows'
                }
            }
        });
        //store.sort('isAgentOk', 'ASC');
        store.on('beforeload',me._onHostGridBeforeload,me);
        //grid.getBottomToolbar().bind(store);
        grid.getDockedItems('pagingtoolbar')[0].bindStore(store);
        store.load({params:{start : 0,limit : this.pageSize}});        
        grid.reconfigure(store,cm);
    },
    
    /**
     * 根据主机状态把IP分到对应的数组里，给复制按钮使用
     */
    _checkHostAgent : function(hosts){
    	var me = this;
    	me.NORMAL_HOST = [];
    	me.ERR_HOST = [];
    	if(Ext.isEmpty(hosts)){    		
    		hosts = me.hosts;
    	}    	
    	Ext.each(hosts,function(host){
        	if(host.isAgentOk===true){
        		me.NORMAL_HOST.push(host.ip);        		
        	}else{
        		me.ERR_HOST.push(host.ip);
        	}        	
        });
        //console.log('正常IP数：'+me.NORMAL_HOST.length);
        //console.log('异常IP数：'+me.ERR_HOST.length);
    },
    
    /**
     * 删除主机
     */    
    _removeHost : function(){
    	var me = this;
        var $p = this.COMPONENTS;
        var gridHosts = $p.panelHostGrid;
        var gridStore = gridHosts.getStore();
        var sm = gridHosts.getSelectionModel();
        var pagingBar = gridHosts.getDockedItems('pagingtoolbar')[0];
        var records = sm.getSelections();
        
        if(records.length === 0){
            return ;
        }
        
        Ext.Msg.confirm('提示','确定要删除选中的记录？',function(btn){
            if(btn === 'yes'){
                
                var hostsData = [],ips = [],filterHostsData = [];
                
                Ext.each(records,function(record){                        
                    ips.push(record.data.ip);                        
                });
                Ext.each(this.hosts,function(host){
                    if(ips.indexOf(host.ip)===-1){
                        hostsData.push(host);                        
                    }
                });
                if(me.isFilter){
                	Ext.each(this.filterHosts,function(host){
                        if(ips.indexOf(host.ip)===-1){
                        	filterHostsData.push(host);                        
                        }
                    });
                	me.filterHosts = filterHostsData;
                }
                this.hosts = hostsData;
                gridStore.remove(records);                
                gridStore.load();
                
                this._checkHostAgent();
                
                this._updateTip(0,this.hosts.length);
                if(gridStore.getCount()===0){
                    pagingBar.moveLast();                        
                }else{                
                    pagingBar.doRefresh();
                }
            }
        },this);
        
    },
    /**
     * 复制主机IP
     */
    _copyHosts : function(btnCopy){
        var me = this,
        	$p = this.COMPONENTS,
        	action = btnCopy.action,
        	gridHosts = $p.panelHostGrid,
        	gridStore = gridHosts.getStore(),
        	hosts = [];
        /*console.log(me.ERR_HOST);
        console.log(me.ERR_HOST);*/
        
        switch(action){
	        case 'all':
	        	hosts = me.ERR_HOST.concat(me.NORMAL_HOST);
	        break;
	        
	        case 'selected':	    		
	    		var sm = gridHosts.getSelectionModel();
	            var records = sm.getSelections();
	            Ext.each(records,function(record){
	                hosts.push(record.data.ip);
	            });
	        break;
	        
	        case 'allAgentNotOk':
	        	hosts = me.ERR_HOST;	        	
	        break;
	        
	        case 'allAgentOk':
	        	hosts = me.NORMAL_HOST;
	        break;        
        }        
        if(hosts.length===0){
            return;
        }
        //console.log(btnCopy);
        return hosts.join("\r\n");
    },
    /**
     * 清除复制按钮的值
     */
    _clearCopy : function(){
    	var me = this;
    	
    	me.hosts = [];
    	me.filterHosts = [];
    	me.isFilter = false;


    	me.ERR_HOST = [];
    	me.NORMAL_HOST = [];
    },
    /**
     * 获取主机
     */
    _getHosts : function(){
        var $p = this.COMPONENTS;
        var hostGrid = $p.panelHostGrid;
        var cmbCCScript = $p.panelCC.down('[itemId="_cmbScript"]');
        var txtCCParams = $p.panelCC.down('[itemId="_txtParams"]');
        var _this = this;
        if(Ext.isEmpty(cmbCCScript.getValue())){
            return ;
        }
        
        /**
         *	清除搜索条件 
         */
        var textfield = hostGrid.down('textfield[itemId="_ipParam"]');
        textfield.setValue('');
        _this.isFilter = false;
        _this._showMask('正在获取主机列表，请等待...');
        //this.getEl().mask('正在获取主机列表，请等待...');
        Ext.Ajax.request({
            url: this.ccScriptURL,
            scope: this,
            method: "POST",
            params: {
                ccScriptId : cmbCCScript.getValue(),
                ccParams : txtCCParams.getValue()
            },            
            success: function(response,opts) {
            	_this._hideMask();
                //_this.getEl().unmask();
                if(response.responseText.indexOf("html") > 0){
                    parent.Frame.insertMsg("返回IP列表解析出错，导入失败，请检查数据格式是否正确",2);                    
                    return;
                }
                var result = Ext.decode(response.responseText);
                var hosts = result.data;
                var hostsLen = hosts.length;
                if(hostsLen === 0){
                    parent.Frame.insertMsg("导入IP列表为空，导入失败",2);                    
                    return;
                }
                if(!Ext.isEmpty(result.errMsg)){
                    parent.Frame.insertMsg(result.errMsg,2);
                }
                _this.isCCScript = true;
                _this.hosts = hosts;
                _this._updateTip(hostsLen,_this.hosts.length);
                _this._reconfigure();
            }
        });
    },
    /**
     * 获取主机相关信息
     */
    getHosts : function(){
        return this.hosts;
    },
    /**
     * 设置主机列表
     * @param {Array} hosts
     */
    setHosts : function(hosts){
        if(Ext.isArray(hosts)){
            var total = hosts.length;
            this.hosts = hosts;
            this._reconfigure();
            this._updateTip(total,total);
        }
    },
    /**
     * 是否通过cc脚本方式获取jobip
     * @return {boolean}
     */
    isGetJobIPByCCScript : function(){
        return this.isCCScript;
    },
    updateScriptAddition : function(v){
        this.scriptAddition = v;
        Ext.getCmp(this.id+'_txtAddition').setValue(Ext.value(v,'无'));
    }
});