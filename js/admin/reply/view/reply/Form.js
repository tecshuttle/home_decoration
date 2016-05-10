/*global Ext, console */

Ext.define("WeiXin.view.reply.Form", {
    extend: "Ext.window.Window",
    alias: "widget.replyform",
    title: "编辑",
    width: 800,
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
            labelWidth: 100
        },
        items: [
            { xtype: "hidden", name: "ID", value: 0},
            {
                xtype: 'radiogroup',
                fieldLabel: "接收",
                action: 'ReceiveMsg',
                layout: {
                    autoFlex: false
                },
                defaults: {
                    name: 'ReceiveMsgType',
                    margin: '0 25 0 0'
                },
                items: [
                    {
                        inputValue: 'txt',
                        boxLabel: '文本',
                        checked: true
                    },
                    {
                        inputValue: 'event',
                        boxLabel: '消息'
                    }
                ]
            },
            { xtype: "textfield", name: "keyword", fieldLabel: "关键字", emptyText: '自动回复可不设关键字', action: 'keyword' },
            { xtype: "textfield", name: "event_name", fieldLabel: "消息名", action: 'event_name', hidden: true },
            { xtype: "textfield", name: "event_key", fieldLabel: "消息键值", emptyText: '没有则不填', action: 'event_key', hidden: true },

            {
                xtype: 'radiogroup',
                fieldLabel: "回复",
                action: 'ReplyMsg',
                margin: '20, 0, 0, 0',
                layout: {
                    autoFlex: false
                },
                defaults: {
                    name: 'ReplyMsgType',
                    margin: '0 25 0 0'
                },
                items: [
                    {
                        inputValue: 'txt',
                        boxLabel: '文本',
                        checked: true
                    },
                    {
                        inputValue: 'articles',
                        boxLabel: '图文消息'
                    }
                ]
            },
            {
                xtype: "textarea",
                name: "txt_content",
                fieldLabel: "文本内容",
                action: 'txt_content',
                rows: 9
            },
            {
                xtype: "textarea",
                name: "articles_content",
                fieldLabel: "图文消息",
                action: 'articles_content',
                emptyText: "标题\n简介\n封面图url\n文章url \n\n注：\n1、如有多篇文章，每篇文章间留一空行；\n2、最多10篇文章。",
                rows: 9,
                hidden: true
            },
            {
                xtype: "textarea",
                name: "DESC",
                fieldLabel: "描述",
                margin: '20, 0, 0, 0',
                rows: 3
            }
        ]
    },
    buttons: [
        { text: "保存", action: "save" }
    ],

    setValue: function (value) {
        var name = value.NAME.split('_');

        if (name[0] !== 'auto') {
            Ext.Msg.alert('出错', '数据格式不正确！');
            return false;
        }

        var receiveRadio = this.down('radiogroup[action=ReceiveMsg]');

        if (name[1] === 'txt') {
            receiveRadio.setValue({ReceiveMsgType: "txt"});
            this.down('textfield[name=keyword]').setValue(name[2]);
            this.down('textarea[action=txt_content]').setValue(value.VALUE);
        }

        if (name[1] === 'event') {
            receiveRadio.setValue({ReceiveMsgType: "event"});

            this.down('textfield[name=event_name]').setValue(name[2]);
            this.down('textfield[name=event_key]').setValue(name[3]);
            this.down('textarea[action=articles_content]').setValue(value.VALUE);
        }

        var replyRadio = this.down('radiogroup[action=ReplyMsg]');
        var reply = JSON.parse(value.VALUE);
        if (reply.type === 'articles') {
            receiveRadio.setValue({ReplyMsgType: "articles"});
            this.down('textarea[action=articles_content]').setValue(this._unformat(reply.data));
        } else {
            receiveRadio.setValue({ReplyMsgType: "txt"});
            this.down('textarea[action=txt_content]').setValue(reply.data);
        }
    },

    _unformat: function (data) {
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

    _format: function (data) {
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
        return this._format(values);
    }
});


//end file