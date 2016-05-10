Ext.ns('Tomtalk');

Ext.onReady(function () {
    new Ext.Viewport({
        renderTo: Ext.getBody(),
        layout: 'fit',
        style: 'background-color: white;',
        items: [
            new Tomtalk.Panel({
                module: 'tuan'
            })
        ]
    });
});


Tomtalk.PanelUI = Ext.extend(Ext.Panel, {
    constructor: function (config) {
        var me = this;
        config = Ext.apply({
            style: 'padding:10px;background-color: white;',
            autoScroll: true,
            border: false
        }, config);

        me.COMPONENTS = {};

        Tomtalk.PanelUI.superclass.constructor.call(me, config);
    },

    initComponent: function () {
        var me = this;
        me.items = [
            Ext.create('Tomtalk.grid', {
                id: me.id + '_grid',
                module: me.module
            }),
            Ext.create('Tomtalk.Form', {
                id: me.id + '_form',
                module: me.module,
                hidden: true
            })
        ];

        Tomtalk.PanelUI.superclass.initComponent.call(me);
    }

});

Tomtalk.PanelAction = Ext.extend(Tomtalk.PanelUI, {
    constructor: function (config) {
        Tomtalk.PanelAction.superclass.constructor.call(this, config);
    },

    initComponent: function () {
        Tomtalk.PanelAction.superclass.initComponent.call(this);

        Ext.apply(this.COMPONENTS, {
            grid: Ext.getCmp(this.id + '_grid'),
            form: Ext.getCmp(this.id + '_form')
        });
    },

    initEvents: function () {
        var me = this;
        var $c = this.COMPONENTS;

        Tomtalk.PanelAction.superclass.initEvents.call(me);

        this.on('boxready', me._afterrender, me);
    },

    _afterrender: function () {
        var $c = this.COMPONENTS;
    },

    _returnFrom: function () {
        var $c = this.COMPONENTS;

        $c.form.hide();
        $c.grid.show();
        $c.grid.getStore().reload();
    }
});

Tomtalk.Panel = Tomtalk.PanelAction;

//end file