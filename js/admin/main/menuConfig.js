var Docs = {};
Docs.Menu = [
    {
        id: 'user',
        text: '内容管理',
        isMutilLevel: false,
        children: [
            {
                href: "/admin/gallery",
                text: "图库",
                leaf: true
            },
            {
                href: "/admin/articles",
                text: "文章",
                leaf: true
            },
            {
                href: "/admin/cat",
                text: "分类",
                leaf: true
            },
            {
                href: "/admin/brand",
                text: "品牌",
                leaf: true
            },
            {
                href: "/admin/item",
                text: "单品",
                leaf: true
            }
        ]
    },
    {
        id: 'admin',
        text: '团购',
        isMutilLevel: false,
        children: [
            {
                href: "/admin/tuan",
                text: "团购",
                leaf: true
            }
        ]
    },
    {
        id: 'set',
        text: '系统设置',
        isMutilLevel: false,
        children: [
            {
                href: "/admin/settings",
                text: "全站设置",
                leaf: true
            },
            {
                href: "/admin/scroll_img",
                text: "滚动图",
                leaf: true
            },
            {
                href: "/admin/accounts",
                text: "管理员帐号",
                leaf: true
            }
        ]
    }
];

//end file