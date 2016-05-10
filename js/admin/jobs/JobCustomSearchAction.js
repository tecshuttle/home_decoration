/*global Ext, Ijobs, window, document, printMsg, console */

Ext.ns('Ext.ijobs.job.jobCustomSearchAction');

Ext.define('Ext.ijobs.job.jobCustomSearchAction', {extend: 'Ext.ijobs.job.jobCustomSearchUI', 

    initEvents: function () {
        var me = this,
            formPanel = me.COMPONENTS.formPanel,
            gridPanel = me.COMPONENTS.gridPanel;
        //store     = gridPanel.getStore();

        Ext.ijobs.common.Kit.bindPagingKeys(gridPanel);//绑定翻页快捷键
        //store.on('exception',me._onStoreLoadExceptions,me);

        formPanel.down('button[ref*=btnQuery]').on('click', me._query, me);
        formPanel.down('button[ref*=btnReset]').on('click', function () {
            formPanel.getForm().reset();
        }, me);

        Ext.ijobs.job.jobCustomSearchAction.superclass.initEvents.call(this);

    },

    COMPONENTS: {},

    _query: function (btn) {
        var me = this,
            formPanel = me.COMPONENTS.formPanel,
            gridPanel = me.COMPONENTS.gridPanel,
            form = formPanel.getForm(),
            store = gridPanel.getStore(),
            params = form.getValues();

        Ext.iterate(params, function (key, value) {
            var field = form.findField(key);
            if (field && field.emptyText === value) {
                params[key] = '';
            }
            //处理所属业务值为空的情况
            if (key === 'applicationId') {
                params[key] = me.isStandard ? -1 : Ext.value(value, -1);
            }
        });

        var proxy = store.getProxy();
        Ext.apply(proxy.extraParams, params);

        store.load();
    },

    _viewJobCustom: function (grid, rowIndex, colIndex) {
        var me = this,
            record = grid.getStore().getAt(rowIndex);

        parent.Frame.createNewTab(
            "./jobs/jobCustomEdit.jsp?jobCustomId=" + record.get('id'),
            "jobCustom_" + record.get('id'),
            "编辑执行态【" + record.get('name') + "】"
        );

    }
});

var viewJobTemplate = function (taskTId, taskTName) {
    parent.Frame.createNewTab(
        "./jobs/jobTemplateMain.jsp?jobTemplateId=" + taskTId,
        "jobTemplate_" + taskTId,
        "作业【" + taskTName + "】主页"
    );
};

Ext.ijobs.job.jobCustomSearch = Ext.ijobs.job.jobCustomSearchAction;

//end file