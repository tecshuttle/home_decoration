Ext.define('WeiXin.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID', type: 'int' },
        { name: 'NAME', type: 'string' },
        { name: 'VALUE', type: 'string' },
        { name: 'DESC', type: 'string' }
    ]
});

//end file