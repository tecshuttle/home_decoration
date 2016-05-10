/*global Ext, console */

Ext.define("WeiXin.view.menu.Form", {
    extend: "Ext.form.Panel",
    alias: "widget.menuform",
    region: 'center',
    frame: false,
    border: false,
    hidden: true,
    layout: "fit",
    margin: '35, 0, 0, 0',

    items: {
        xtype: "form",
        margin: 10,
        border: false,
        layout: 'anchor',
        fieldDefaults: {
            labelAlign: 'left',
            //anchor: '100%',
            labelWidth: 100
        },
        items: [
            { xtype: "hidden", name: "id", value: 0},
            { xtype: "textfield", name: "name", fieldLabel: "菜单名", msgTarget: 'under', allowBlank: false, action: 'name', size: 40 },
            {
                xtype: 'radiogroup',
                fieldLabel: "点击效果",
                action: 'clickType',
                layout: {
                    autoFlex: false
                },
                defaults: {
                    name: 'clickType',
                    margin: '0 25 0 0'
                },
                items: [
                    {
                        inputValue: 'view',
                        boxLabel: '打开页面链接',
                        checked: true
                    },
                    {
                        inputValue: 'click',
                        boxLabel: '发送点击事件消息'
                    }
                ]
            },
            { xtype: "textfield", name: "value", fieldLabel: "页面URL", action: 'event_name', anchor: '100%' },
            {
                xtype: "button",
                action: 'save',
                margin: '30, 0, 0, 106',
                width: 100,
                text: '保存'
            }
        ]
    },

    setValue: function (value) {
        if (!value.leaf) {
            this.down('radiogroup[action=clickType]').hide();
            this.down('textfield[name=value]').hide();
        } else {
            this.down('radiogroup[action=clickType]').show();
            this.down('textfield[name=value]').show();
        }

        this.down('hidden[name=id]').setValue(value.id);
        this.down('textfield[name=name]').setValue(value.text);
        this.down('radiogroup[action=clickType]').setValue({clickType: value.type});
        this.down('textfield[name=value]').setValue(value.value);
        this.down('textfield[name=value]').setFieldLabel(value.type === 'view' ? '页面URL' : '消息键值');
    },

    unFormat: function (data) {
        var articles = [];

        Ext.each(data, function (item) {
            var article = [];
            article.push(item.title);
            article.push(item.desc);
            article.push(item.pic);
            article.push(item.url);

            articles.push(article.join("\n"));
        });

        return articles.join("\n\n");
    },

    format: function (data) {
        var name = ['auto'];

        if (data.ReceiveMsgType === 'txt') {
            name.push('txt');
            if (data.keyword) {
                name.push(data.keyword);
            }
        } else {
            name.push('event');
            name.push(data.event_name);
            if (data.event_key) {
                name.push(data.event_key);
            }
        }

        var reply = {};
        if (data.ReplyMsgType === 'txt') {
            reply.type = 'txt';
            reply.data = data.txt_content;
        } else {
            reply.type = 'articles';

            var articles = data.articles_content.replace(/\n[ \t]*\n/gm, "|").split("|");
            reply.data = [];

            Ext.each(articles, function (article) {
                var item = article.split("\n");
                reply.data.push({
                    title: item[0],
                    desc: item[1],
                    pic: item[2],
                    url: item[3]
                });
            });
        }

        var values = {
            ID: data.ID,
            NAME: name.join("_"),
            VALUE: JSON.stringify(reply),
            DESC: data.DESC
        };

        return values;
    },

    getValue: function () {
        var values = this.down('form').getValues();
        return this.format(values);
    }
});


//end file