/*global Ext, Ijobs, window, document, printMsg, console, top, reset, openNewTab, setInterval, getSelect */

Ext.ns('Ext.ijobs.job.JobTemplateMainUI');
/**
 * 作业模板主页界面
 * @class Ext.ijobs.job.JobTemplateMainUI
 * @extends Ext.Container
 */
Ext.define('Ext.ijobs.job.JobTemplateMainUI', {extend: 'Ext.Panel', 

    constructor: function (config) {
        config = Ext.apply({
            border: false,
            toolkit: Ext.ijobs.common.Kit,
            bodyStyle: 'padding: 15px 30px 30px 30px;',
            autoScroll: true
        }, config);
        Ext.ijobs.job.JobTemplateMainUI.superclass.constructor.call(this, config);
    },
    initComponent: function () {
        this.items = [
            this._createJobBaseInfoPanel(),
            this._createJobCustomPanel()];
        Ext.ijobs.job.JobTemplateMainUI.superclass.initComponent.call(this);
    },
    /**
     * 创建执行态列表面板
     */
    _createJobCustomPanel: function () {
        var me = this,
            panel = new Ext.form.FieldSet({
                id: 'jobCustomPanel',
                autoScroll: true,
                title: '<span style="font-size: 15px">&nbsp;&nbsp;执行态&nbsp;&nbsp;</span>',
                collapsed: false,
                collapsible: true,
                items: [
                    {
                        frame: false,
                        xtype: 'buttongroup',
                        defaults: {
                            cls: 'opera btn_sec long',
                            style : 'margin-right: 10px;'
                            //width: 80
                        },
                        items: [
                            {
                                text: '<i class="icon-white icon-plus"></i>&nbsp;添加',
                                ref: '../../btnAddCustom'
                            },
                            {
                                text: '<i class="icon-white icon-refresh"></i>&nbsp;刷新',
                                ref: '../../btnRefreshCustom'
                            },
                            {
                                text: '<i class="icon-white icon-share"></i>&nbsp;复制',
                                ref: '../../btnCopyCustom'
                            },
                            {
                                text: '<i class="icon-white icon-trash"></i>&nbsp;删除执行态',
                                ref: '../../btnRemoveCustom',
                                //width: 110
                            }/*,
                            {授权管理屏蔽
                                text: '<i class="icon-th-list icon-white"></i>&nbsp;授权管理',
                                ref: '../../btnAuthManage',
                                //width: 110
                            }*/
                        ]
                    },
                    {
                        style: 'padding-top:10px',
                        border: false,
                        items: [
                            {
                                xtype: 'textfield',
                                enableKeyEvents: true,
                                width: 250,
                                emptyText: '请输入名称过滤…',
                                itemId: 'searchKey',
                                listeners: {
                                    'keyup': me._filterCustom.bind(me)
                                }

                            }
                        ]
                    },
                    {
                        id: 'jobCustomListPanel',
                        height: 450,
                        autoScroll: true,
                        border: false
                    }
                ]
            });
        return panel;
    },
    _createJobBaseInfoPanel : function(){
    	var panel = new Ext.Panel({
    		border: false,
            layout: {
            	type : 'table',
            	columns : 4
            },
            items : [{
            	width : 350,
            	xtype: 'displayfield',
                style: 'padding-top : 3px',
                fieldLabel: '作业名称',
                value: this.initData.name
            },{            	
            	tdAttrs : {
                    valign : 'top'
                },
                width: 125,
                border : false,
                layout : 'vbox',
                items : [{
                	 xtype: 'button',
                     id: 'btnSyncCustom',
                     cls: 'opera btn_main long',
                     text: '<i class="icon-white icon-repeat"></i>&nbsp;同步执行态',
                     ref: '../../btnSyncCustom',
                     width: 120
                }]
            },{
            	border : false,
            	tdAttrs : {
                    valign : 'top'                    	
                },
                width: 125,
                style : 'margin-left:10px',
            	items : [{
                	xtype: 'button',
                    id: 'btnEditTemplate',
                    cls: 'opera btn_main long',
                    tooltip: '编辑作业模板',
                    width: 120,
                    text: '<i class="icon-pencil icon-white"></i>&nbsp;编辑作业模板',
                    ref: '../../btnEditTemplate'
                }]
            },{
            	border : false,
            	tdAttrs : {
            		style: {
                        width: '100%'
                    },
                    valign : 'top'
                },
                style : 'margin-left:10px',
            	items : [{
	            	xtype: 'button',
	            	width: 120,
	                id: 'btnRemoveJob',
	                cls: 'opera btn_sec long',
	                text: '<i class="icon-white icon-trash"></i>&nbsp;删除模板',
	                ref: '../../btnRemoveJob'
            	}]
            },{
            	xtype: 'displayfield',
                style: 'padding-top : 3px',
                fieldLabel: '开发商',
                value: this.initData.applicationName
            },{
            	
            	border : false,
            	tdAttrs : {
            		style: {
                        width: '100%'
                    },
                    valign : 'top'
                },
                layout : 'hbox',
            	rowspan: 3,
            	colspan: 4,
            	items : [{
            		width : 180,
            		width : 380,
            		border : false,
            		style : 'padding-top:10px',
            		html : '模板中步骤增删、顺序调整、步骤名称、文本步骤描述以及脚本替换会同步到执行态中。同一脚本不同版本的变化<span style="color:red;">不会</span>同步到执行态中。'
            	},{
            		border : false,
            		style : 'padding-top:10px',
            		html : '<a class="infos" data-qtip="同步功能会将作业模板中的如下数据同步至已有作业执行态中：作业模板中步骤的个数、顺序、名称、文本步骤内容等。<br>对于分发文件和拉取文件步骤，不会同步详细设置，允许每个作业执行态中的分发文件和拉取文件与作业模板不一致。"></a>'
            	}]
            },{
            	xtype: 'displayfield',
                style: 'padding-top : 3px',
                fieldLabel: '作业类型',
                value: this.toolkit.getStateByType(this.toolkit.STATE_TYPE.JOB_TYPE, this.initData.jobType)
            },{
            	xtype: 'displayfield',
                anchor: '80%',
                fieldLabel: '更新时间',
                value: this.initData.lastModifyTime
            },{
            	xtype: 'displayfield',
                anchor: '80%',
                fieldLabel: '备注',
                colspan: 5,
                value: this.initData.des
            }]
    	});
    	return panel;
    },
    _createJobBaseInfoPanel2: function () {
        var panel = new Ext.Panel({
            border: false,
            layout: 'column',
            defaults: {
                border: false,
                frame: false,
                labelWidth: 60
            },
            items: [
                //分左右两列，按钮在右边分两行
                {
                    columnWidth: 0.3,
                    //文字说明
                    items: [
                        {
                            layout: 'column',
                            labelWidth: 75,
                            style: 'line-height: 15px',
                            defaults: {
                                border: false,
                                columnWidth: 1,
                                labelWidth: 60,
                                itemCls: 'x-instance-form-item'
                            },
                            border: false,
                            items: [
                                {
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            style: 'padding-top : 3px',
                                            fieldLabel: '作业名称',
                                            value: this.initData.name
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            style: 'padding-top : 3px',
                                            fieldLabel: '开发商',
                                            value: this.initData.applicationName
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            style: 'padding-top : 3px',
                                            fieldLabel: '作业类型',
                                            value: this.toolkit.getStateByType(this.toolkit.STATE_TYPE.JOB_TYPE, this.initData.jobType)
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    columnWidth: 0.7,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'button',
                            id: 'btnSyncCustom',
                            cls: 'opera btn_main long',
                            text: '<i class="icon-white icon-repeat"></i>&nbsp;同步执行态',
                            ref: '../../btnSyncCustom',
                            width: 110
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            width: 360,
                            style: 'margin : 0 5',
                            html: '模板中步骤增删、顺序调整、步骤名称、文本步骤描述以及脚本替换会同步到执行态中。同一脚本不同版本的变化<span style="color:red;">不会</span>同步到执行态中。'
                        },
                        {
                            columnWidth: 1,
                            border: false,
                            html: '<a class="infos" data-qtip="同步功能会将作业模板中的如下数据同步至已有作业执行态中：作业模板中步骤的个数、顺序、名称、文本步骤内容等。<br>对于分发文件和拉取文件步骤，不会同步详细设置，允许每个作业执行态中的分发文件和拉取文件与作业模板不一致。"></a>',
                            style: 'margin: 0 10;color:#FF0000'
                        }
                    ]
                },
                {
                    columnWidth: 0.7,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'button',
                            id: 'btnEditTemplate',
                            cls: 'opera btn_main long',
                            tooltip: '编辑作业模板',
                            //width: 130,
                            //height: 30,
                            text: '<i class="icon-pencil icon-white"></i>&nbsp;编辑作业模板',
                            ref: '../../btnEditTemplate'
                        },
                        {
                            xtype: 'button',
                            id: 'btnRemoveJob',
                            //height: 30,
                            cls: 'opera btn_sec long',
                            text: '<i class="icon-white icon-trash"></i>&nbsp;删除模板',
                            ref: '../../btnRemoveJob'
                        }
                    ]
                },
                {
                    columnWidth: 1,
                    items: [
                        {
                            xtype: 'displayfield',
                            anchor: '80%',
                            fieldLabel: '更新时间',
                            value: this.initData.lastModifyTime
                        }
                    ]
                },
                {
                    columnWidth: 1,
                    items: [
                        {
                            xtype: 'displayfield',
                            anchor: '80%',
                            fieldLabel: '备注',
                            value: this.initData.des
                        }
                    ]
                }
            ]
        });

        return panel;
    }
});

//end file