/**
 * 拉取文件
 * @author v_jfdong
 * @description 拉取文件组件
 * @requires 
 */
Ext.ns('Ext.ijobs.job.step');
/**
 * 分发文件步骤
 * @class Ext.ijobs.job.step.JobStepTransferUI
 * @extends Ext.FormPanel
 */
Ext.define('Ext.ijobs.job.step.JobStepPullUI', {extend: 'Ext.FormPanel',
    constructor : function(config){
        config = Ext.apply({
            border : false,
            toolkit :  Ext.ijobs.common.Kit,
            frame : false,
            //autoHeight : config.initData.module==="INSTANCE",
            bodyStyle:'padding:15px 5px 0 20px',
            defaultType : 'textfield',
            defaults :{
                msgTarget : 'under',
                anchor : '90%'
            },
            autoScroll : true
        },config);
       Ext.ijobs.job.step.JobStepPullUI.superclass.constructor.call(this,config);        
    },
    initComponent : function(){
        var isReadOnly = false;//组件是否只读，true/false:只读/可写
        var isDisplay = false;//组件是否隐藏，true/false:隐藏/显示
        var isDisabled = false; //组件是否禁用,true/false:禁用/启用
        var txtStepOperaReadOnly = false;//执行人组件,true/false:只读/可写
        var ipGridReadOnly = false;//ipGrid组件,true/false:只读/可写
        var hideScriptAddition = false;//ipGrid组件中的cc脚本统一附加内容,true/false:隐藏/显示
        if (this.initData.module==="INSTANCE") {
            isReadOnly = true;
            isDisplay = true;
            isDisabled = true;
            txtStepOperaReadOnly = true;
            ipGridReadOnly = true;
            hideScriptAddition = false;
        } else if (this.initData.module==="CUSTOM") {
            isReadOnly = true;
            isDisplay = false;
            isDisabled = false;
            txtStepOperaReadOnly = false;
            ipGridReadOnly = false;
            hideScriptAddition = false;
        } else if (this.initData.module==="TEMPLATE") {
            isReadOnly = false;
            isDisplay = false;
            isDisabled = false;
            txtStepOperaReadOnly = false;
            ipGridReadOnly = false;
            hideScriptAddition = true;
        }
        this.fileList = this.initData ? (this.initData.pullFileList || []) : [];//分发文件列表
        this.items = [{
            id : this.id+'_txtStepName',
            name: 'txtStepName',
            fieldLabel : '步骤名称',
            emptyText : '请输入步骤名称',
            readOnly  : isReadOnly,
            validator : function(value){
                if (isReadOnly) {
                    return true;
                }                
                if(value.trim().length===0){
                    return "步骤名称不允许为空";
                }
                return true;
            },
            value : this.initData ? (this.initData.name || undefined) : undefined
        },{
            id : this.id+'_txtStepDesc',
            name : 'txtStepDesc',
            fieldLabel : '步骤描述',
            xtype : 'textarea',
            autoScroll : true,
            emptyText : '请输入步骤描述',
            readOnly  : isReadOnly,
            validator : function(value){
                if (isReadOnly) {
                    return true;
                }                
                if(value.trim().length===0){
                    return "步骤描述不允许为空";
                }
                return true;
            },             
            value : this.initData ? (this.initData.description || undefined) : undefined
        },{
            id : this.id+'_txtStepOpera',
            name : 'txtStepOpera',
            xtype : 'userchooser',
            fieldLabel : '步骤执行人',
            readOnly : txtStepOperaReadOnly,
            hidden : (this.initData.exeType!==typeDef.exeType[2].value),
            emptyText : '留空时本步骤执行时无需人工干预',
            validator : function(value){
                value = value.trim();
                if (txtStepOperaReadOnly) {
                    return true;
                }
                var idx = value.lastIndexOf(';');
                if(idx!==value.length-1){
                    value+=';';
                    idx = value.lastIndexOf(';');
                }
                if(idx!==-1){
                    value = value.substring(0,idx);
                    var users = value.split(';');
                    if(users.length!==1){
                        return "只能有一位步骤执行人";
                    }
                }
                return true;
            },             
            value : this.initData.operator
        },{
            id : this.id+'_txtBeforeComm',
            name : 'txtBeforeComm',
            fieldLabel : '前置命令',
            xtype : 'textarea',
            autoScroll : true,
            maxLength : 1000,
            readOnly : txtStepOperaReadOnly,
            emptyText : txtStepOperaReadOnly ? '' : '前置命令将在JobIP上执行，无则不填',
            value : this.initData ? (this.initData.beforeComm || undefined) : undefined
        },{
            id : this.id+'_txtAfterComm',
            name : 'txtAfterComm',
            fieldLabel : '后置命令',
            xtype : 'textarea',
            autoScroll : true,
            maxLength : 1000,
            readOnly : txtStepOperaReadOnly,
            emptyText : txtStepOperaReadOnly ? '' : '后置命令将在JobIP上执行，无则不填',
            value : this.initData ? (this.initData.afterComm || undefined) : undefined
        },{
            id : this.id+'_txtSpeedLimit',
            name : 'txtSpeedLimit',
            vtype : 'Number',
            sideText : '涉及windows专区或微小分布IDC时建议限速(0表示不限速)',
            allowBlank : false,
            readOnly : txtStepOperaReadOnly,
            blankText : '限速不允许为空！',
            fieldLabel : '限速（KBps）',
            value : Ext.value(this.initData.speedLimit,defaultSpeedLimit || 10000)
	    },
        this._createPullFilePanel(txtStepOperaReadOnly),
        this._createPullTargetPanel(txtStepOperaReadOnly),{
	    	xtype : 'fieldcontainer',
	    	hideEmptyLabel : false,
	    	items : [{
	    		id : this.id+'_chkUseIPGrid',
	    		name : 'chkUseIPGrid',
	            xtype : 'checkbox',
	            disabled : isDisabled,
	            checked : !this.initData.isUseJobConfigIp,
	            boxLabel: '本步骤使用如下JobIP取代全程JobIP'
	    	}]            
        },{
            id : this.id+'_stepHost',
            name : 'stepHost',
            xtype : 'ip-grid',
            border : false,
            fieldLabel : 'JobIP',
            readOnly : ipGridReadOnly,
            hideScriptAddition : hideScriptAddition,
            scriptAddition : this.scriptAddition,
            applicationId : this.applicationId,
            hosts : this.initData ? (this.initData.ipGridData || []) : [],//主机数据
            scriptInputType : this.initData.ipGetType,//IP录入方式
            scriptParams : this.initData.ccScriptParam,//cc脚本参数
            scriptId : this.initData.ccScriptId,//默认选中cc脚本
            scriptList : this.initData.ccScriptList,//cc脚本列表            
            hidden : !!this.initData.isUseJobConfigIp
        },{
            xtype : 'ijobscombo',
            id : this.id+'_cmbCommonAccount',
            name : 'cmbCommonAccount',
            hidden : !!this.initData.isUseJobConfigIp,
            fieldLabel : '常用账户',
            emptyText : '请选择常用账户',
            queryMode : 'local',
            //editable : false, 
            readOnly : txtStepOperaReadOnly,
            store : Ext.create('Ext.data.JsonStore', {
                data : [],
                fields : ["id","name","accountName","isLDAPUser"]/*,
                proxy: {
                	type: 'memory'
                }*/
            }),
            valueField: 'id',
            displayField: 'name',
            value : ''
        }];
        this.buttons =[{
            text : '<i class="icon-ok icon-white"></i>&nbsp;保存步骤',
            cls : 'opera btn_main long',
            hidden : isDisplay,
            ref : '../btnSaveStep',
            listeners : {
                afterrender : function(btn){
                    var ct = btn.findParentByType('toolbar').container;
                    ct.setStyle({
                        "background-color" : "#FFF"
                    });
                }
            }
        },{
            text : '<i class="icon-share-alt icon-white"></i>&nbsp;返回',
            cls : 'opera btn_query',
            style : 'margin :0 135 0 0',
            hidden : isDisplay,
            handler : function(btn,scope){
                var win = btn.findParentByType('window');
                if(Ext.type(win)==="object"){
                    win.hide();
                }
            }
        }];
        Ext.ijobs.job.step.JobStepPullUI.superclass.initComponent.call(this);
    },
    /**
     * 创建拉取至面板
     * @return {}
     */
    _createPullTargetPanel : function(txtStepOperaReadOnly){
        var panel = new Ext.form.FieldContainer({
            id : 'pullTargetPanel',
            border : false,
            layout : 'anchor',
            fieldLabel : '拉取至',
            defaults :{
                msgTarget : 'under',
                anchor : '90%'
            },
            items : [{
                xtype : 'textfield',
                id : 'txtTargetIP',
                name : 'txtTargetIP',
                fieldLabel : 'IP',
                vtype : 'IPAddress',
                emptyText : '请输入IP地址',
                allowBlank : txtStepOperaReadOnly,
                blankText : 'IP地址不允许为空',
                readOnly : txtStepOperaReadOnly,
                value : this.initData.pullFileDest.ip || undefined
            },{
	            id : 'txtTargetFilePath',
	            name : 'txtTargetFilePath',
                xtype : 'textfield',
	            sideText : '如果该路径不存在，系统将自动创建该路径。<br/>允许使用作为文件传输目的地址的路径为：<p>linux服务器：/usr，/data，/tmp，/home，/data1，/data2，/data3，/data4，/opt。</p><p>windows服务器：除了C:\\WINDOWS\\system32之外的所有目录。</p><br/><b>[TARGETIP]/用法描述：</b><br/>例如目标路径为/data/ijobs/[TARGETIP]/，作业ip为172.10.1.2和172.10.1.3，则在目的地ip的机器上，会创建/data/ijobs/172.10.1.2/和/data/ijobs/172.10.1.3/目录，并将待拉取的文件拉取到这两个文件夹中',
	            emptyText : '请填写拉取的路径',
	            fieldLabel : '路径',
                readOnly : txtStepOperaReadOnly,
	            validator : function(value){
	                if (txtStepOperaReadOnly) {
	                    return true;
	                }
                    value = value.trim();
	                if(value.trim().length===0){
	                    return "拉取至路径不允许为空"
	                }
                    return Ext.ijobs.common.Kit.validPath(value)
	            },
	            value : this.initData ? (this.initData.pullFileDest.destFileDir || '/[TARGETIP]/') : undefined
            },{
                xtype : 'displayfield',
                fieldStyle : 'color : red',
                value : '对于来自不同源的同名文件可能会在目标路径下相互覆盖的情况，可以在目标路径的末尾加上 /[TARGETIP]/进行分隔。'
            },{
                xtype : 'ijobscombo',
                name : 'cmbPullCommonAccount',
	            id : 'cmbPullCommonAccount',
	            fieldLabel : '常用账户',
                emptyText : '请选择常用账户',
	            store : Ext.create('Ext.data.JsonStore', {
		            data : [],
		            fields : ["id","name","accountName","isLDAPUser"],
		            proxy: {
		            	type: 'memory'
		            }
		        }),
                readOnly : txtStepOperaReadOnly,
	            anchor : '100%',
	            queryMode : 'local',
	            typeAhead: true,
	            //editable : false,
	            triggerAction: 'all',
	            valueField: 'id',
	            displayField: 'name',
	            value : ''
            }]
        });
        
        return panel;
            
    },
    /**
     * 创建拉取文件列表面板
     * @return {}
     */
    _createPullFilePanel : function(txtStepOperaReadOnly) {
        var panel = new Ext.form.FieldContainer({
            id : 'pullFilePanel',
            border : false,
            layout : 'anchor',
            fieldLabel : '待拉取文件',
            defaults :{
                msgTarget : 'under',
                anchor : '90%'
            },
            items :[{
                border : false,
                padding : '5 0 5 0',
                hidden : txtStepOperaReadOnly,
                layout : 'column',
                items : [{
                    columnWidth : .7,
                    xtype : 'textarea',
                    grow : true,
                    growMin : 25,
                    growMax :400,
                    id : 'txtFileList',
                    hideLabel : true,
                    fieldLabel : '文件列表',
                    autoScroll : true,
                    emptyText : '请输入文件名，多个文件请以“回车”分隔',
                    validator : function(value){
	                    var files = value.trim().split(/\n/g); 
	                    var errorFiles = [];
	                    var result = '';
	                    for ( var i = 0,len = files.length; i < len; i++) {
	                        result = Ext.ijobs.common.Kit.validPath(files[i]);
	                        if(typeof result==='string'){
	                            if(files[i].trim().length!==0){
	                                errorFiles.push("【"+ files[i] +"】"+result);
	                            }
	                        }
	                    }
	                    if(errorFiles.length!==0){
	                        return errorFiles.join("、");
	                    }
	                    return true;
                    }
                },{
                    columnWidth : .3,
                    border : false,
                    items:[{
                        xtype : 'buttongroup',
                        border : false,
                        frame : false,
                        defaults :{
                            width :80    
                        },
                        items :[{
                            text: '<i class="icon-white icon-plus"></i>&nbsp;添加',
                            cls : 'opera btn_sec',
                            id : this.id + '_btnAddPullFile',
                            ref : '../../../btnAddPullFile'
                        },{
                            xtype : 'panel',
                            border : false,
                            html : '<a class="infos" data-qtip="文件名中支持正则表达式写法以匹配多个文件，文件名前需加【REGEX:】前缀。如：/tmp/REGEX:abc[A-Z,a-z,0-9,+,-,_]{0,50}.tgz&lt;br&gt;如需分发文件目录，文件名请以‘/’或‘\’结束"></a>'
                        }]
                    }]
                },{
                    columnWidth : 1,
                    border : false,
                    items:[{
		                xtype : 'displayfield',
		                hideLabel : true,
		                fieldstyle : 'color:red',
		                value  : '使用正则表达式匹配文件总大小大于2G时，请慎用正则表达式，可能使步骤执行时间增加数倍！'    
                    }]
            }]
            },{
                id : 'msPullFileList',
                xtype : 'multiselectfield',
                hideLabel : true,
                autoWidth : true,
                height : 100,
                msgTarget : 'under',
                store: Ext.create('Ext.data.ArrayStore', {
                    data : this.fileList,
                    fields : [{
                        name :'file',
                        convert : function(value,record){
                            return record.raw;
                        }
                    }],
                    proxy:{
                    	type: 'memory'
                    }
                }),
                displayField: 'file',
                valueField: 'file'
            },
            {
            	xtype : 'panel',
            	buttonAlign : 'right',
            	border : false,
            	buttons : [{                	
                    id : 'btnRemove',
                    text : '<i class="icon-white icon-trash"></i>&nbsp;删除选中',
                    cls : 'opera btn_sec long',
                    hidden : txtStepOperaReadOnly,
                    ref : '../btnRemove'
            	},{            		
                    id : 'btnRemoveAll',
                    cls : 'opera btn_sec',
                    hidden : txtStepOperaReadOnly,
                    text : '<i class="icon-white icon-remove"></i>&nbsp;清空',
                    ref : '../btnRemoveAll'
            	}]
            }
            ]
                        
        });
        return panel;
    }   
});
/**
 * 拉取文件步骤事件
 * @class Ext.ijobs.job.step.JobStepPullAction
 * @extends Ext.ijobs.job.step.JobStepPullUI
 */
Ext.define('Ext.ijobs.job.step.JobStepPullAction', {extend: 'Ext.ijobs.job.step.JobStepPullUI',
	alias: 'widget.step-pull',
    constructor : function(config){
        Ext.ijobs.job.step.JobStepPullAction.superclass.constructor.call(this,config);        
    },
    initComponent : function(){
        
        Ext.ijobs.job.step.JobStepPullAction.superclass.initComponent.call(this);
        var pullFilePanel = this.findById('pullFilePanel');
        var pullTargetPanel = this.findById('pullTargetPanel');
        Ext.apply(this.COMPONENTS,{
            pullFilePanel : pullFilePanel,
            msPullFileList : pullFilePanel.findById('msPullFileList'),
            txtFileList : pullFilePanel.findById('txtFileList'),
            cmbPullCommonAccount : pullTargetPanel.findById('cmbPullCommonAccount'),
            cmbCommonAccount : this.findById(this.id+'_cmbCommonAccount')
        });
    },
    initEvents : function(){
        Ext.ijobs.job.step.JobStepPullAction.superclass.initEvents.call(this);
        
        this.findById(this.id+'_chkUseIPGrid').on('check',this._onChecked,this);
        
        this.down('button[ref*=btnSaveStep]').on('click',this._saveStep,this);
        
        this.COMPONENTS.msPullFileList.on('dblclick',this._editPullFile,this);
        
        this.COMPONENTS.cmbPullCommonAccount.getStore().on('datachanged',this._onPullCommonAccountLoad,this);
        this.COMPONENTS.cmbPullCommonAccount.on('boxready',this._initCommonAccount,this);
        this.COMPONENTS.cmbCommonAccount.getStore().on('datachanged',this._onCommonAccountLoad,this);
        this.COMPONENTS.cmbCommonAccount.on('boxready',this._initCommonAccount,this);        
        this.COMPONENTS.pullFilePanel.down('button[ref*=btnAddPullFile]').on('click',this._addPullFile,this);
        this.COMPONENTS.pullFilePanel.down('button[ref*=btnRemove]').on('click',this._remove,this);
        this.COMPONENTS.pullFilePanel.down('button[ref*=btnRemoveAll]').on('click',this._removeAll,this);
    },

    COMPONENTS : {},
    
    _onCommonAccountLoad : function(store){
        this._setDefaultAccount(this.COMPONENTS.cmbCommonAccount,store.data.items,this.initData.userAccountId);
    },
    
    _onPullCommonAccountLoad : function(store){    	
        var defautVal = this.initData.pullFileDest.userAccountId;
        this._setDefaultAccount(this.COMPONENTS.cmbPullCommonAccount,store.data.items,defautVal);
    },
    _initCommonAccount : function(cmb){
        cmb.getStore().loadData(this.initData.userAccountList);
    },
    
    /**
     * 当账户列表没有选中值时，默认选中isLDAPUser为true的账户
     * @param {Componment} cmbAccount 账户下列列表
     * @param {Record} accounts   账户数据
     */
    _setDefaultAccount : function(cmbAccount,accounts,defaultVal){
        var adminUser = [];
        var generalUser = [];
        
        	
        if (accounts.length===0) {
            cmbAccount.clearValue();
            return;
        }
        if(!Ext.isEmpty(cmbAccount.getValue())){
            return;
        }
        if(defaultVal){
            cmbAccount.setValue(defaultVal);
            return;
        }
        Ext.each(accounts,function(record){
            record.get('isLDAPUser') ? adminUser.push(record.get('id')) : generalUser.push(record.get('id'));
        });
        if (adminUser.length!==0) {
            cmbAccount.setValue(adminUser[0]);
            return;
        }
        if (generalUser.length!==0) {
            cmbAccount.setValue(generalUser[0]);            
        }  
    },    
    _editPullFile : function(vw, index, node, e){
        var rec = vw.getSelectedRecords()[0];
        this.COMPONENTS.txtFileList.setValue(rec.get('file'));
    },
    _validFileList : function(){
        if (this.fileList.length===0) {
            this.COMPONENTS.msPullFileList.markInvalid('拉取文件列表不允许为空！');
            return false;
        }
        return true;
    },
    /**
     * 删除选中的记录
     */
    _remove : function(){
        var selectFileList = this.COMPONENTS.msPullFileList;        
        var selected = selectFileList.getSelected();
        var store = selectFileList.getStore();
        var me = this;
        Ext.each(selected,function(record){
        	var index = store.indexOf(record);
        	store.remove(record);
        	me.fileList.splice(index,1);
        });
    },
    /**
     * 删除所有记录
     */
    _removeAll: function(){
        var selectFileList = this.COMPONENTS.msPullFileList;
        var store = selectFileList.getStore();
        store.removeAll();
        this.fileList = [];
    },    
    /**
     * 新增文件至列表
     */
    _appendFiles : function(){
        var msPullFileList = this.COMPONENTS.msPullFileList;
        var store = msPullFileList.getStore();
        store.loadData(this.fileList);
        msPullFileList.clearInvalid();
    },    
    /**
     * 添加需要拉取的文件
     */
    _addPullFile : function(){
        var _this = this;
        var txtFileList= this.COMPONENTS.txtFileList;
        var files = Ext.unique(txtFileList.getValue()
                    .trim()
                    .split(/\n/g));
        if (files.length === 0) { 
            return;
        }
        if(txtFileList.isValid()){
	        Ext.each(files,function(file){
	            if(!Ext.isEmpty(file) && _this.fileList.indexOf(file)===-1){
	                _this.fileList.push(file);
	            }
	        });
	        _this._appendFiles();
        }
    },    
      
    _onChecked : function(checkbox,isChecked){
        if(isChecked){
            this.getComponent(this.id + '_stepHost').show().doLayout();
            this.getComponent(this.id + '_cmbCommonAccount').show();
            this.toolkit.transButtons();
        }else{
            this.getComponent(this.id + '_stepHost').hide();
            this.getComponent(this.id + '_cmbCommonAccount').hide();
        }
        
    },    
    /**
     * 保存步骤信息
     */
    _saveStep : function(btnSaveStep){
        var form = this.getForm();
        if(form.isValid() && this._validFileList()){
            this.getEl().mask('正在保存…');
            var fields = form.getFieldValues();
            var isUseJobConfigIp = !fields["chkUseIPGrid"];
            var stepHost = this.findById(this.id+'_stepHost');
            
            var params ={
                "appID":this.applicationId,
                "creater":this.creater,                
				exeType: this.initData.exeType,
				stepType: this.initData.stepType,
				name: fields["txtStepName"],
				description: fields["txtStepDesc"],
				operator: fields["txtStepOpera"],
				isUseJobConfigIp: isUseJobConfigIp,
				ipDataId: this.initData.ipDataId,
				userAccountId: fields["cmbCommonAccount"],
				beforeComm: fields['txtBeforeComm'],
				afterComm: fields['txtAfterComm'],
				speedLimit: fields["txtSpeedLimit"],
				pullFileDest: Ext.encode({
                                ip : fields["txtTargetIP"],
                                destFileDir : fields["txtTargetFilePath"],
                                userAccountId : fields["cmbPullCommonAccount"]
                            }),
				pullFileList: Ext.encode(this.fileList)
            };
            
            Ext.copyTo(params,
                this.initData,
                (this.initData.module==="TEMPLATE") ? ['jobTemplateId','stepTemplateId'] : ['jobCustomId','stepCustomId']);            
            
            if(!isUseJobConfigIp){
                var ipList = [];
                Ext.each(stepHost.getHosts(),function(host){
                    ipList.push(host.ip);
                });
		        
                if (parseInt(fields["script"],10)===typeDef.ipGetType[0].value) {
		            Ext.apply(params,{
		                'ccScriptId' : fields[this.id+"_stepHost_hideScript"],
		                'ccScriptParam' : fields[this.id+"_stepHost_txtParams"]
		            });
		        }
                
                Ext.apply(params,{
                    ipGetType: fields["script"],
                    ipList:ipList.join(","),
                    userAccountId:fields["cmbCommonAccount"]
                });
            }  
            
            //console.log(params); return false;
            
            btnSaveStep.disable();
            Ext.Ajax.request({
                url: (this.initData.module==="TEMPLATE") ? "./jobs/updateStepTemplate.action" : "./jobs/updateStepCustom.action",
                scope : this,
                method: "POST",
                params: params,               
                success: function(response,opts) {
                    if (this.toolkit.hasPermission(response)) {
	                    printMsg("拉取文件步骤 【"+fields["txtStepName"]+"】保存成功",1);
	                    this.initData.pubicConfigPanel.refreshStepList();
	                    this.initData.pubicConfigPanel.alreadyBatchGetIp = stepHost.isGetJobIPByCCScript();                        
                    }
                    btnSaveStep.enable();
                    this.getEl().unmask();
                }
            });            
        }
    }
});

//end file