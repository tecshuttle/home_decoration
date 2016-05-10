Ext.define('Ijobs.common.ux.DateField', {
    extend: 'Ext.form.field.Date',

    alias: 'widget.ijobsdatefield',

    trigger2Cls: Ext.baseCSSPrefix + 'form-yestotay-trigger',

    trigger3Cls: Ext.baseCSSPrefix + 'form-totay-trigger',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                me.onTrigger2Click();
            }
        });
    },

	onTrigger2Click : function(){
        this.setDate(Ext.Date.DAY,-1);
    },

    onTrigger3Click : function(){
    	this.setDate(Ext.Date.DAY,1);
    },
    
    setDate : function(interval,value){
        var val = this.getValue();
        this.setValue(
            Ext.isEmpty(val) ?
            new Ext.Date.add(new Date(), interval, value===1 ? 0 : -1) : 
            new Ext.Date.add(val,interval,value));        
    }
});
