/*global Ext, console */

Ext.define("WeiXin.view.user.Edit", {
    extend: "Ext.window.Window",
    alias: "widget.useredit",
    title: "编辑",
    width: 600,
    modal: true,
    frame: false,
    layout: "fit",
    items: {
        xtype: "form",
        margin: 10,
        border: false,
        layout: 'anchor',
        fieldDefaults: {
            labelAlign: 'left',
            anchor: '100%',
            labelWidth: 60
        },
        items: [
            { xtype: "hidden", name: "ID", value: 0},
            { xtype: "textfield", name: "NAME", fieldLabel: "名称", allowBlank: false, msgTarget: 'under' },
            { xtype: "textarea", name: "VALUE", rows: 10, fieldLabel: "内容", allowBlank: false, msgTarget: 'under' },
            { xtype: "textfield", name: "DESC", fieldLabel: "描述" }
        ]
    },
    buttons: [
        { text: "保存", action: "save" }
    ]
});

//end file