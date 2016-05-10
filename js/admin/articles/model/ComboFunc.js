Ext.define('Tiegan.model.ComboFunc', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'LOG_ID', type: 'string' },
        { name: 'FUNC', type: 'string' },
        { name: 'PARAMS', type: 'string' },
        { name: 'RETURN', type: 'string' },
        { name: 'CALL_TIME', type: 'float' },
        { name: 'RETURN_TIME', type: 'float' }
    ]
});

//end file