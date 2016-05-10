/*global Ext, console */

Ext.define("Tiegan.view.func.DetailWin", {
    extend: "Ext.window.Window",
    alias: "widget.detailwin",
    title: "详情",
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
            {
                xtype: "textfield",
                fieldLabel: "调用接口",
                name: "func"
            },
            {
                xtype: "textarea",
                fieldLabel: "请求参数",
                name: "params",
                rows: 12
            },
            {
                xtype: "textarea",
                fieldLabel: "返回结果",
                name: "return",
                rows: 12
            }
        ]
    },

    setValue: function (value) {
        this.down('textfield[name=func]').setValue(value.FUNC);

        this.down('textarea[name=params]').setValue(this.getJSON(value.PARAMS));

        if (value.RETURN.length > 1000) {
            this.down('textarea[name=return]').setValue(value.RETURN);
        } else {
            this.down('textarea[name=return]').setValue(this.getJSON(value.RETURN));
        }
    },

    getJSON: function (json_str) {
        var json = JSON.parse(json_str);
        var t = this.printAllObject(json);

        return t;
    },

    printAllObject: function (o, maxLevel, level) {
        if (typeof level == "undefined") {
            level = 0;
        }

        if (typeof level == "undefined") {
            maxLevel = 0;
        }

        var str = [];
        // Remove this if you don't want the pre tag, but make sure to remove
        // the close pre tag on the bottom as well
        if (level == 0) {
            str = [];
        }

        var levelStr = '';
        for (var x = 0; x < level; x++) {
            levelStr += '    ';
        }

        if (maxLevel != 0 && level >= maxLevel) {
            str.push(levelStr + '...');
            return str;
        }

        for (var p in o) {
            if (typeof o[p] === 'number') {
                str.push(levelStr + p + ' : ' + o[p]);
            } else if (typeof o[p] === 'string') {
                str.push(levelStr + p + ' : "' + o[p] + '"');
            } else if (o[p] === null) {
                str.push(levelStr + p + ' : ' + 'null');
            } else {
                str.push(levelStr + p + ' : { ');

                str.push(this.printAllObject(o[p], maxLevel, level + 1));
                str.push(levelStr + '}');
            }
        }

        // Remove this if you don't want the pre tag, but make sure to remove
        // the open pre tag on the top as well
        if (level == 0) {
            str.push('');
        }

        return str.join("\n");
    }

});


//end file