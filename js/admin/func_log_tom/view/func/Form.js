/*global Ext, console */

Ext.define("Log.view.func.Form", {
    extend: "Ext.form.FieldSet",
    alias: "widget.funcform",
    title: "查询",
    margin: 10,
    frame: false,
    layout: "fit",
    items: {
        xtype: "form",
        margin: 10,
        border: false,
        layout: {
            type: 'hbox'
        },
        items: [
            {
                xtype: 'button',
                text: '重置条件',
                margin: '0 20 0 0',
                width: 100,
                action: 'filter_reset'
            },
            {
                xtype: 'combo',
                fieldLabel: '接口名称',
                name: 'func',
                labelWidth: 60,
                margin: '0 40 0 0',
                store: 'ComboFunc',
                displayField: 'FUNC',
                valueField: 'FUNC'
            },
            {
                xtype: 'datefield',
                labelWidth: 40,
                fieldLabel: '时段',
                name: 'from_date',
                width: 170,
                format: 'Y-m-d',
                maxValue: new Date()  // limited to the current date or prior
            },
            {
                xtype: 'displayfield',
                margin: '0 15',
                value: ' 至 '
            },
            {
                xtype: 'datefield',
                name: 'to_date',
                width: 130,
                format: 'Y-m-d',
                maxValue: new Date()  // limited to the current date or prior
            } ,
            {
                xtype: 'checkboxfield',
                boxLabel: '按耗时排序',
                name: 'is_order_by_runtime',
                inputValue: 1,
                margin: '0 0 0 40',
                action: 'ReceiveMsg'
            },
            {
                xtype: 'tbspacer',
                flex: 1
            },

            {
                xtype: 'button',
                text: '查询',
                margin: '0 0 0 20em',
                width: 100,
                action: 'search'
            }
        ]
    },

    getValue: function () {
        var values = this.down('form').getValues();

        if (values.is_order_by_runtime === undefined) {
            values.is_order_by_runtime = 0;
        }

        return values;
    },

    resetValue: function () {
        this.down('combo[name=func]').setValue('');


        this.down('datefield[name=from_date]').setValue('');
        this.down('datefield[name=to_date]').setValue('');

        this.down('checkboxfield[name=is_order_by_runtime]').setValue('');
    }
});


//end file