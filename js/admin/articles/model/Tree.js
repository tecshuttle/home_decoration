Ext.define('Tiegan.model.Tree', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string', mapping: 'id' },
        { name: 'text', type: 'string', mapping: 'text' },
        { name: 'leaf', type: 'boolean', mapping: 'leaf' },
        { name: 'type', type: 'string'},
        { name: 'value', type: 'string'}
    ]
});

//end file