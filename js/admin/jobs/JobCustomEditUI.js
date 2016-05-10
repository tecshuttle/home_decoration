/*global Ext, Ijobs, window, document, printMsg, reset, console, getUserName */

Ext.ns('Ext.ijobs.job.JobCostomEditUI');

/**
 * 作业模板编辑界面
 * @class Ext.ijobs.job.JobTemplateEditUI
 * @extends Ext.Container
 */
Ext.ijobs.job.JobCustomEditUI = Ext.extend(Ext.Panel, {

    constructor: function (config) {
        config = Ext.apply({
            border: false,
            toolkit: Ext.ijobs.common.Kit,
            bodyStyle: 'padding: 30px;',
            autoScroll: true,
            layout: 'form'
        }, config);
        Ext.ijobs.job.JobCustomEditUI.superclass.constructor.call(this, config);
    },
    initComponent: function () {
        this.items = [
            this._createJobCustomInfoPanel(),
            this._createCustomStepGrid()
        ];
        Ext.ijobs.job.JobCustomEditUI.superclass.initComponent.call(this);
    },
    /**
     * 步骤类型
     */
    STEP_TYPE: {
        /**
         * 未定义
         */
        UNDEFINED: typeDef.stepType[0].value,
        /**
         *执行脚本
         */
        EXE_SCRIPT: typeDef.stepType[1].value,
        /**
         *分发文件
         */
        DISPATCH_FILE: typeDef.stepType[2].value,
        /**
         * 拉取文件
         */
        PULL_FILE: typeDef.stepType[3].value,
        /**
         * 文件步骤
         */
        TEXT_STEP: typeDef.stepType[4].value

    },


    /**
     * 创建执行步骤列表
     * @return {}
     */
    _createCustomStepGrid: function () {

        var _this = this;
        var toolkit = _this.toolkit;
        
        
        var store = new Ext.data.JsonStore({
            data: this.initData.stepCustomList || [],
            fields: ["id", "isExec", "jobCustomId", "ipFalseCount", "ipCount", "isUseJobConfigIp", "ipGetType", "name", "stepType", "idx", "operator"] ,
             proxy: new Ext.data.MemoryProxy(this.initData.stepCustomList || []),
             reader: new Ext.data.JsonReader({
             root: '',
             fields: ["id","isExec", "jobCustomId","ipFalseCount","ipCount","isUseJobConfigIp","ipGetType", "name", "stepType", "idx", "operator"]
             }),
        });

        var cm = new Ext.grid.ColumnModel({
            defaults: {
                sortable: false,
                align: 'left',
                menuDisabled: true
            },
            columns: [
                {header: "id", dataIndex: "id", hidden: true},
                {header: "jobCustomId", dataIndex: "jobCustomId", hidden: true},
                {header: "执行顺序", dataIndex: "idx",
                    renderer: function (value, cellMeta, record, rowIndex, colIndex, store) {
                        return "第" + (rowIndex + 1) + "步";
                    }
                },
                {
                    header: "步骤名",
                    dataIndex: "name",
                    xtype: 'linkcolumn',
                    items: [
                        {
                            handler: function (grid, rowIndex, colIndex) {
                                var record = store.getAt(rowIndex);
                                _this._editStep(record.get("id"), record.get("stepType"), record.get("name"));
                            }
                        }
                    ]
                },
                {
                    header: "步骤类型",
                    dataIndex: "stepType",
                    renderer: function (value, cellMeta, record, rowIndex, colIndex, store) {
                        return toolkit.getStateByType(toolkit.STATE_TYPE.STEP_TYPE, value);
                    }
                },
                {
                    header: "执行人",
                    dataIndex: "operator"
                },
                {
                    header: "JobIP数（检测失败/总）",
                    dataIndex: "isUseJobConfigIp",
                    renderer: function (value, cellMeta, record, rowIndex, colIndex, store) {
                        var jobConfig = value ? "全程" : "步骤";
                        var isExec = record.get('isExec');
                        var ipFalseCount = record.get('ipFalseCount');
                        var ipCount = record.get('ipCount');
                        var ipGetType = record.get('ipGetType') === typeDef.ipGetType[1].value ? "手工录入" : "CC脚本导入";
                        var stepType = record.get('stepType');
                        var ipStatue = ipFalseCount > 0 ?
                            '（<span style="color:red">' + ipFalseCount + '</span>' + '/' + ipCount + '）' :
                            '（' + ipFalseCount + '/' + ipCount + '）';
                        var result = '';
                        if (stepType === _this.STEP_TYPE.TEXT_STEP) {
                            result = '文本步骤无需IP';
                        } else if (!isExec) {
                            result = '跳过执行';
                        } else {
                            result = jobConfig + ipGetType + ipStatue;
                        }
                        return result;
                    }
                }
            ]
        });
        
        this._stepGrid_cm = cm;
        
        var stepGrid = new Ext.grid.GridPanel({
            id: 'stepGrid',
            autoHeight: true,
            columns: [{header: "id", dataIndex: "id", hidden: true},
                      {header: "jobCustomId", dataIndex: "jobCustomId", hidden: true},
                      {header: "执行顺序", dataIndex: "idx",
                          renderer: function (value, cellMeta, record, rowIndex, colIndex, store) {
                              return "第" + (rowIndex + 1) + "步";
                          }
                      },
                      {
                          header: "步骤名",
                          dataIndex: "name",
                          xtype: 'linkcolumn',
                          items: [
                              {
                                  handler: function (grid, rowIndex, colIndex) {
                                      var record = store.getAt(rowIndex);
                                      _this._editStep(record.get("id"), record.get("stepType"), record.get("name"));
                                  }
                              }
                          ]
                      },
                      {
                          header: "步骤类型",
                          dataIndex: "stepType",
                          renderer: function (value, cellMeta, record, rowIndex, colIndex, store) {
                              return toolkit.getStateByType(toolkit.STATE_TYPE.STEP_TYPE, value);
                          }
                      },
                      {
                          header: "执行人",
                          dataIndex: "operator"
                      },
                      {
                          header: "JobIP数（检测失败/总）",
                          dataIndex: "isUseJobConfigIp",
                          renderer: function (value, cellMeta, record, rowIndex, colIndex, store) {
                              var jobConfig = value ? "全程" : "步骤";
                              var isExec = record.get('isExec');
                              var ipFalseCount = record.get('ipFalseCount');
                              var ipCount = record.get('ipCount');
                              var ipGetType = record.get('ipGetType') === typeDef.ipGetType[1].value ? "手工录入" : "CC脚本导入";
                              var stepType = record.get('stepType');
                              var ipStatue = ipFalseCount > 0 ?
                                  '（<span style="color:red">' + ipFalseCount + '</span>' + '/' + ipCount + '）' :
                                  '（' + ipFalseCount + '/' + ipCount + '）';
                              var result = '';
                              if (stepType === _this.STEP_TYPE.TEXT_STEP) {
                                  result = '文本步骤无需IP';
                              } else if (!isExec) {
                                  result = '跳过执行';
                              } else {
                                  result = jobConfig + ipGetType + ipStatue;
                              }
                              return result;
                          }
                      }],
            selModel : Ext.create('Ext.selection.CheckboxModel',{checkOnly:true}),
//            bodyCssClass : 'ijobs-step ijobs-custom-step',
            bodyCssClass: 'ijobs-custom-step',
            style: 'padding: 20px 0 20px 0;',
            deferRowRender: false,
            frame: false,
            store: store,
            forceFit: true,
            viewConfig : {
            	stripeRows: true,
				getRowClass : function(record, rowIndex, rp, ds){
					var rowClass = '';
					rowClass = record.get('isExec') !== true ? 'x-grid-row-step-unchecked' : '';
					return rowClass;
				}
            },
            columnLines: true
        });
        
        return stepGrid;
    },
    _createJobCustomInfoPanel : function(){
    	var panel = Ext.create('Ext.form.Panel', {
    		layout : 'column',
    		border: false,
    		items : [{
    			columnWidth : .7,
    			border: false,
    			layout : 'form',
    			items : [{
    				border: false,    				
    				xtype : 'panel',
    				layout : 'column',
    				items : [{
    					border: false,
    					columnWidth : .8,
    					xtype: 'textfield',
                        id: 'txtTaskName',
                        fieldLabel: '作业名称',
                        height: 25,
                        style: 'font-weight: bold;font-size:15px;',
                        anchor: '98%',
                        value: this.initData.name
    				},{
    					border: false,
    					columnWidth : .2,
                        xtype: 'displayfield',
                        hideLabel: true,
                        value: this.initData.creater
    				}]
    			},{
    				anchor: '80%',
    				style : 'margin-top:5px;',
                    xtype: 'param-input',
                    dataName: '__CCScriptParams',
                    id: 'txtCCParam',
                    hidden: true,
                    fieldLabel: 'CC脚本参数',
                    emptyText: '请输入CC脚本入口参数，没有则不填',
                    value: this.initData.unityCcParam
    			},{
    				xtype: 'displayfield',
                    style: 'font-size:11px;',
                    hidden: true,
                    value: '此处CC脚本参数会<span style="color:red;">追加</span>到本执行态中所有使用CC脚本的参数之后'
    			},{
    				xtype: 'textarea',
                    anchor: '98%',
                    id: 'des',
                    emptyText: '请输入执行态备注',
                    value: this.initData.des,
                    name: 'des',
                    style: 'margin-top: 5px;',
                    fieldLabel: '备注'
    			}]
    		},{
    			columnWidth : .3,
    			layout: {
                    type: 'hbox',
                    padding:'5',
                    pack:'end',
                    align:'top'
                },
                defaults : {
                	width : 110,
                	layout : {
                		type: 'vbox',
                        align:'stretch'
                	}, 
                	border: false,
                	defaults:{margin:'0px 0px 10px 0px'}
                },
    			border: false,   			
    			items : [{   
    				margin:'0px 15px 0px 0px',
					items : [{
    					xtype: 'button',
                        cls: 'opera btn_sec long',
                        margin:'0px 0px 42px 0px',
                        id: 'btnTimingStart',
                        text: '<i class="icon-white icon-time"></i>&nbsp;定时启动',
                        ref: '../btnTimingStart'
    				},{
    					xtype: 'button',
                        id: 'btnJobPublicConfig',
                        cls: 'opera btn_sec long',
                        text: '<i class="icon-white icon-pencil"></i>&nbsp;全程设定'
    				},{
    					xtype: 'button',
                        id: 'btnBatchGetHosts',
                        cls: 'opera btn_sec long',
                        hidden: true,
                        text: '<i class="icon-white icon-list-alt"></i>&nbsp;批量获取IP',
                        ref: '../btnBatchGetHosts'
    				}]	
				},{	
					items : [{
    					xtype: 'button',
	                    id: 'btnSaveCutstom',
	                    margin:'0px 0px 42px 0px',
	                    cls: 'opera btn_main long',
	                    text: '<i class="icon-white icon-ok"></i>&nbsp;保存执行态',
	                    ref: '../btnSaveCutstom'
    				},{    					
    					xtype: 'button',
                        id: 'btnStart',
                        text: '<i class="icon-white icon-play"></i>&nbsp;立即启动',
                        cls: 'opera btn_main long',
                        ref: '../btnStart'
    				}]
    			}]
    		}]
    	});
    	
    	return panel;
    		
    }
    
});