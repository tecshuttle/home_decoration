Ext.define('KitchenSink.view.binding.TwoWay', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-two-way',

    width: 300,
    bodyPadding: 10,

    controller: 'binding.twoway',
    viewModel: {
        data: {
            title: 'The title'
        }
    },

    bind: {
        title: '{title}'
    },

    items: {
        xtype: 'textfield',
        fieldLabel: 'Title',
        labelWidth: 50,
        // The default config for textfield in a bind is "value" (two-way):
        bind: '{title}'
    },

    tbar: [{
        text: 'Random Title',
        handler: 'onTitleButtonClick'
    }]
});

Ext.define('KitchenSink.view.binding.TwoWayController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binding.twoway',

    onTitleButtonClick: function () {
        var title = 'Title' + Ext.Number.randomInt(1, 100);
        this.getViewModel().set('title', title);
    }
});


Ext.ns('Color.admin');

Color.Viewport = Ext.extend(Ext.Viewport, {
    style: 'padding:10px;background-color: white;',
    layout: 'fit',
    items: [
        {
            xtype: 'panel',
            autoScroll: true,
            border: false,
            layout: 'vbox',
            defaults: {
                width: '100%'
            },
            items: [
                Ext.create('KitchenSink.view.binding.TwoWay', {
                    width: '100%'
                }),
                {
                    xtype: 'binding-two-way',
                    flex: 1,
                    margin: '10 0'
                },
                {
                    xtype: 'binding-two-way',
                    flex: 1
                }
            ]
        }

    ]
});

Ext.onReady(function () {
    new Color.Viewport({
        renderTo: Ext.getBody()
    });
});

//end file