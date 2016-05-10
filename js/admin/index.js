Ext.ns('Tomtalk');

Tomtalk.IdcUI = Ext.extend(Ext.Panel,{
    constructor : function(config){
        var me = this;
        config = Ext.apply({
            border :false,
            style : 'padding:20px 20px 0',
            layout : 'anchor'
        }, config);

        me.COMPONENTS = {};

        Tomtalk.IdcUI.superclass.constructor.call(me, config);
    },

    initComponent : function(){
        var me = this;
        me.items = [
            me._typeInfoPanel(),
            me._gridList()
        ];

        Tomtalk.IdcUI.superclass.initComponent.call(me);
    },

    _typeInfoPanel : function(){
        var me = this,
            queryPanel;

        queryPanel = new Ext.form.FieldSet({
            xtype : 'fieldset',
            id: this.id + '_query',
            title : '查询条件',
            collapsible: true,
            items: [{
                xtype: 'fieldcontainer',
                layout: 'column',
                items : [{
                    xtype : 'textfield',
                    fieldLabel : 'ID',
                    id: this.id + '_id',
                    columnWidth: 0.25,
                    emptyText : '请输入…'
                },{
                    xtype : 'textfield',
                    fieldLabel : 'IDC名称',
                    id: this.id + '_name',
                    columnWidth: 0.25,
                    emptyText : '请输入…'
                },{
                    xtype: 'button',
                    id: this.id + '_btn_query',
                    columnWidth: 0.25,
                    width: 100,
                    text : '查询'
                },{
                    xtype: 'button',
                    id : this.id + '_btn_reset',
                    columnWidth: 0.25,
                    width: 100,
                    text : '重置'
                }]
            }]
        });

        return queryPanel;
    },

    _gridList: function() {
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            pageSize: 20,
            fields : ['idcId','idcName'],
            proxy : {
                type: 'ajax',
                url: '/idc/getList',
                reader: {
                    type: 'json',
                    root : 'data',
                    totalProperty : 'totalCount'
                }
            }
        });

        var grid = new Ext.grid.GridPanel({
            id: this.id + '_gridList',
            title : '我被授权的作业',
            header : false,
            columnLines : true,
            store : store,
            columns : [{
                header : "ID", dataIndex : 'idcId',
                renderer : function(value, cellMeta, record) {
                    return "<a href='javascript:return false;'>"+record.data['idcId']+"</a>";
                }
            }, {
                header : "IDC名称",
                dataIndex : 'idcName',
                align : 'left'
            }, {
                header : "操作",
                dataIndex : 'id',
                align : 'left',
                renderer : function(value, cellMeta, record) {
                    return "<a href='javascript:return false;'>取消授权</a>";
                }
            }],

            bbar: {
                xtype : 'pagingtoolbar',
                store: store,
                displayInfo: true,
                beforePageText : '页',
                afterPageText : '/ {0}',
                displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
                emptyMsg: "没有记录"
            },
            forceFit:true,
            viewConfig: {
                stripeRows : true,
                enableRowBody:true,
                showPreview:true
            }
        });

        return grid;
    }
});

Tomtalk.IdcAction = Ext.extend(Tomtalk.IdcUI,{
    constructor: function (config) {
        Tomtalk.IdcAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.IdcAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            grid: Ext.getCmp(this.id + '_gridList'),
            id: Ext.getCmp(this.id + '_id'),
            name: Ext.getCmp(this.id + '_name'),
            query: Ext.getCmp(this.id + '_btn_query'),
            reset: Ext.getCmp(this.id + '_btn_reset')
        });
    },

    initEvents : function(){
        var me        = this;
        var $c = this.COMPONENTS;

        Tomtalk.IdcAction.superclass.initEvents.call(me);

        this.on('boxready', me._afterrender, me);

        $c.query.on('click', me._query, me);
        $c.reset.on('click', me._reset, me);
    },

    _afterrender: function() {
        var $c = this.COMPONENTS;
        console.log('afterrender tom', $c);
    },

    _query: function(){
        var params = {
            id: this.COMPONENTS.id.getValue(),
            name: this.COMPONENTS.name.getValue()
        };

        console.log(params);

        var store = this.COMPONENTS.grid.getStore();
        var proxy = store.getProxy();

        Ext.apply(proxy.extraParams, params);

        store.load();
    },

    _reset: function(){
        this.COMPONENTS.id.setValue('');
        this.COMPONENTS.name.setValue('');
        console.log('reset');
    }
});

Tomtalk.Idc = Tomtalk.IdcAction;

Ext.onReady(function() {
    new Tomtalk.Idc({
        renderTo : Ext.getBody()
    });
});