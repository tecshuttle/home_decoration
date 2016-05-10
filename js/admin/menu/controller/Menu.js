/*global Ext, console */

Ext.define('WeiXin.controller.Menu', {
    extend: 'Ext.app.Controller',
    models: ['Menu'],
    stores: ['Menu'],
    views: ['Viewport', 'menu.Tree', 'menu.Form'],
    refs: [
        {
            ref: 'tree',
            selector: 'menutree'
        },
        {
            ref: 'form',
            selector: 'menuform'
        }
    ],

    init: function () {
        this.control({
            'menutree': {
                itemclick: this.onItemClick
            },
            'menutree > treeview': {
                drop: this.onTreeDrop
            },
            'menutree button[action=add_children]': {
                click: this.add_children
            },
            'menutree button[action=delete]': {
                click: this.deleteNode
            },
            'menutree button[action=update]': {
                click: this.updateMenu
            },
            'menuform button[action=save]': {
                click: this.updateNode
            }
        });
    },

    onItemClick: function (node, record, item, index, e, eOpts) {
        var tree = this.getTree();
        var form = this.getForm();
        var selNode = tree.getSelectionModel().selected.items[0];

        //tree.down('toolbar[action=toolbar]').enable();
        this.getTree().down('button[action=add_children]').enable();
        this.getTree().down('button[action=delete]').enable();

        form.setValue(record.data);
        form.show();

        /*if (selNode.get('leaf')) {

            form.show();
        } else {
            form.hide();
        }*/
    },

    add_children: function () {
        var tree = this.getTree();
        var selNode = tree.getSelectionModel().selected.items[0];

        selNode.appendChild({
            text: '菜单项',
            leaf: true,
            id: this.getNodeCount()
        });

        if (selNode.get("leaf")) {
            selNode.set("leaf", false);
        }

        selNode.expand();

        this.saveTree();
    },

    deleteNode: function () {
        var tree = this.getTree();
        var selNode = tree.getSelectionModel().selected.items[0];
        var parentNode = selNode.parentNode;

        selNode.remove();
        if (parentNode.childNodes.length <= 0) {
            parentNode.set("leaf", true);
        }

        this.saveTree();
        this.getForm().hide();
        this.getTree().down('toolbar[action=toolbar]').disable();
    },

    onTreeDrop: function () {
        this.getForm().hide();
        this.saveTree();
    },

    updateNode: function () {
        if (this.getForm().isValid()) {
            var values = this.getForm().getValues();

            var store = this.getTree().getStore();
            var rec = store.getById(values.id);

            rec.set('text', values.name);
            rec.set('type', values.clickType);
            rec.set('value', values.value);
            rec.commit();

            this.saveTree();
        }
    },

    saveTree: function () {
        this.getForm().hide();
        var menu = [];
        var nodes = this.getTree().getRootNode().childNodes;
        var i = 0;

        Ext.each(nodes, function (node) {
            var children = [];

            if (node.childNodes.length > 0) {
                Ext.each(node.childNodes, function (leaf) {
                    i = i + 1;
                    children.push({
                        id: i,
                        name: leaf.data.text,
                        type: leaf.data.type,
                        value: leaf.data.value,
                        leaf: true
                    });
                });
            }

            i = i + 1;
            var item = {
                id: i,
                name: node.data.text,
                type: node.data.type,
                value: node.data.value
            };

            if (children.length > 0) {
                item.children = children;
                item.expanded = true;
            } else {
                item.leaf = true;
            }

            menu.push(item);
        });

        Ext.Ajax.request({
            url: '/admin/weixin_menu_save',
            params: {
                menu: JSON.stringify(menu)
            },
            success: function (res) {
                var result = Ext.decode(res.responseText);

                if (!result.success) {
                    console.log(result);
                }
            }
        });
    },

    updateMenu: function () {
        Ext.Ajax.request({
            url: '/weixin/create_menu',
            params: { },
            success: function (res) {
                var result = Ext.decode(res.responseText);

                if (result.errcode === 0) {
                    Ext.MessageBox.alert('更新菜单', '成功!');
                } else {
                    Ext.MessageBox.alert('更新菜单不成功', '错误信息：' + result.errmsg);
                }
            }
        });
    },

    //取当前所有tree节点总数，方便设置新增节点id
    getNodeCount: function () {
        var nodes = this.getTree().getRootNode().childNodes;
        var i = 1;
        Ext.each(nodes, function (node) {
            if (node.childNodes.length > 0) {
                Ext.each(node.childNodes, function () {
                    i = i + 1;
                });
            }

            i = i + 1;
        });

        return i;
    }
});

//end file