Ext.define('Tiegan.view.func.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.typetree',
    id: 'tree',
    region: 'west',
    rootVisible: false,
    width: 300,
    margin: '10, 10, 10, 10',
    useArrows: true,
    title: '分类',
    store: 'Tree',
    dockedItems: [
        {
            xtype: 'toolbar',
            id: this.id + '_toolbar',
            dock: 'top',
            //hidden: true,
            disabled: true,
            items: [
                {
                    text: '添加同级',
                    name: 'sibling',
                    id: this.id + '_add_sibling'
                },
                {
                    text: '添加下级',
                    name: 'children',
                    id: this.id + '_add_children'
                },
                {
                    text: '删除',
                    name: 'delete',
                    id: this.id + '_delete'
                },
                {
                    text: '编辑',
                    name: 'edit',
                    id: this.id + '_edit'
                },
                {
                    text: ' +内容',
                    id: this.id + '_add_content'
                }
            ]
        }
    ]
});

//end file