/*global Ext */

Ext.define('WeiXin.model.Menu', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string', mapping: 'id' },
        { name: 'text', type: 'string', mapping: 'name' },
        { name: 'leaf', type: 'boolean', mapping: 'leaf' },
        { name: 'type', type: 'string'},
        { name: 'value', type: 'string'}
    ]
});

//end file