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
                text: "文章管理",
                leaf: true
            },
            {
                href: "/admin/tags",
                text: "服务主题",
                leaf: true
            },
            {
                href: "/admin/equipments",
                text: "产品管理",
                leaf: true
            }
        ]
    },
    {
        id: 'admin',
        text: '微信设置',
        isMutilLevel: false,
        children: [
            {
                href: "/admin/weixin",
                text: "微信设置",
                leaf: true
            },
            {
                href: "/admin/weixin_auto_reply",
                text: "自动消息回复",
                leaf: true
            },
            {
                href: "/admin/weixin_menu",
                text: "自定义菜单",
                leaf: true
            }
        ]
    },
    {
        id: 'job',
        text: '日志',
        isMutilLevel: false,
        children: [
            {
                href: "/admin/func_log",
                text: "API调用",
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