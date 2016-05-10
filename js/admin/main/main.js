Ext.ns('Ext.ijobs.index');

Ext.Loader.setPath('Ext.ux', './js/extjs4/ux');

Ext.define('Ext.ijobs.index.TreeMenu', {
    extend: 'Ext.Panel',
    constructor: function (config) {
        config = Ext.apply({
            region: 'west',
            header: false,
            width: 208,
            layout: 'fit',
            border: false,
            maxSize: 500,
            collapsible: true,
            autoScroll: true,
            animCollapse: false,
            animate: false,
            style: 'padding: 6px 14px;background-color: #f6f6f6;',
            bodyStyle: 'background-color: #f6f6f6;',
            id: 'leftmenu_div',
            collapseMode: 'mini',
            cls: 'left-wrapper'
        }, config);
        Ext.ijobs.index.TreeMenu.superclass.constructor.call(this, config);
    },
    initComponent: function () {
        Ext.ijobs.index.TreeMenu.superclass.initComponent.call(this);

    },
    onRender: function (ct, position) {
        Ext.ijobs.index.TreeMenu.superclass.onRender.call(this, ct, position);
        this._createTreeView();
    },

    _createTreeView: function () {
        var tpl = new Ext.XTemplate(
                //'<div class="left-wrapper">主导航</div>',
                '<dl class="leftnav">',
                '<dl class="x-item">',
                '<tpl for=".">',
                '<dt class="active"><span class="ico_desk"></span>{menu}</dt>',
                '<tpl for="subMenu">',
                '<dd class="x-item"><span class="nav_arrow"></span><a id="{id}" href="javascript:void(0);" to="{url}" tabTitle="{menu}">{menu}</a></dd>',
                '</tpl>',
                '</tpl>',
                '</dl>',
                '</dl>'
            ),
            updateIndexes = function (startIndex, endIndex) {
                var ns = this.all.elements,
                    records = this.store.getRange(),
                    i, j;

                startIndex = startIndex || 0;
                endIndex = endIndex || ((endIndex === 0) ? 0 : (ns.length - 1));
                for (i = startIndex, j = startIndex - 1; i <= endIndex; i++) {
                    if (Ext.fly(ns[i]).is('dl')) {
                        j++;
                    }

                    ns[i].viewIndex = i;

                    ns[i].viewRecordId = records[j].internalId;
                    if (!ns[i].boundView) {
                        ns[i].boundView = this.id;
                    }
                }
            };

        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'memory'
            },
            fields: ['menu', 'subMenu', 'url', 'id']
        });
        var view = Ext.create('Ext.view.View', {
            store: store,
            tpl: tpl,
            itemSelector: '.x-item',
            listeners: this.dvListeners,
            renderTo: this.body,
            updateIndexes: updateIndexes
        });
        this.dataView = view;
    },
    loadMenuData: function (menuData) {
        var view = this.dataView,
            store = view.getStore();
        store.loadData(menuData);

    }
});

Ext.define('Ext.ijobs.index.MainPanel', {
    extend: 'Ext.Panel',
    constructor: function (config) {
        config = Ext.apply({
            region: 'center',
            border: false,
            layout: 'border',
            cls: 'right-wrapper'
        }, config);
        Ext.ijobs.index.MainPanel.superclass.constructor.call(this, config);
    },
    requires: ['Ext.ux.IFrame'],
    initComponent: function () {
        //this.COMPONENT.masPanel = new Ext.ijobs.index.MessagePanel();
        this.items = [
            this._createTabPanel()
        ];
        Ext.ijobs.index.MainPanel.superclass.initComponent.call(this);

        Ext.apply(
            this.COMPONENT, {
                contentTab: Ext.getCmp('contentTab'),
                msgDialogIds: []
            });
    },
    COMPONENT: {},
    _createTabPanel: function () {
        var tab = Ext.create('Ext.tab.Panel', {
            id: 'contentTab',
            region: 'center',
            style: 'background-color:#f6faff;',
            bodyStyle: 'border: none;',
            resizeTabs: true,
            minTabWidth: 115,     //最小tab宽度
            maxTabWidth: 260,
            tabBar: {
                height: 48,
                padding: '16 12 0 12',  //tabbar左右间距
                defaults: {
                    margin: '0 3',
                    height: 32
                }
            },
            plain: true,
            border: false,
            plugins: new Ext.ux.TabCloseMenu({
                closeTabText: '关闭标签页（Ctrl+`）',
                closeOthersTabsText: '关闭其它标签页',
                closeAllTabsText: '关闭所有标签页'
            }),
            enableTabScroll: true,

            initEvents: function () {
                this.on('tabchange', this._tabchange, this);
                this.on('remove', this._remove, this);
            },

            _tabchange: function () {
                this.el.dom.style.backgroundColor = '#fcfcfc';
                Ext.query('.x-tab-bar-strip-default-top')[0].style.display = '';
            },

            _remove: function () {
                if (this.items.length === 0) {
                    this.el.dom.style.backgroundColor = 'white';
                    Ext.query('.x-tab-bar-strip-default-top')[0].style.display = 'none';
                }
            },

            createNewTab: function () {
                var id = "tab-" + arguments[1];
                var tab = this.getComponent(arguments[1]) || this.getComponent(id);
                var p = null;
                if (tab) {
                    this.setActiveTab(tab);
                    return;
                }
                if (typeof(arguments[0]) === 'object') {
                    p = this.add(
                        new Ext.Panel({
                            id: id,
                            title: arguments[2],
                            tabTip: arguments[2],
                            closable: true,
                            border: false,
                            layout: 'fit',
                            items: arguments[0]
                        })
                    );
                } else {
                    var href = arguments[0];

                    p = this.add(Ext.create('Ext.ux.IFrame', {
                        id: id,
                        title: arguments[2],
                        border: false,
                        src: href,
                        tooltip: arguments[2],
                        width: this.getWidth() == 0 ? (document.body.clientWidth - 208) : 'auto',
                        height: this.getHeight() == 0 ? (document.body.clientHeight - 201) : 'auto',
                        closable: true,
                        afterRender: function (comp) {
                            this.getEl().mask('加载中……', 'x-mask-loading');
                            this.on('load', function (tab) {
                                tab.iframeEl.unmask();
                            });
                        },
                        setTitle: function (title, iconCls) {
                            this.title = title;
                            if (this.header && this.headerAsText) {
                                this.header.child('span').update(title);
                            }
                            if (iconCls) {
                                this.setIconClass(iconCls);
                            }
                            this.fireEvent('titlechange', this, title);
                            return this;
                        }
                    }));
                }

                this.setActiveTab(p);
            }
        });

        return tab;
    },
    createNewTab: function (url, id, title) {
        var tab = this.COMPONENT.contentTab;
        tab.createNewTab(url, id, title);
    }
});

Ext.onReady(function () {
    Ext.QuickTips.init();
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    var mainPanel = new Ext.ijobs.index.MainPanel({
        boxMinWidth: 1130,
        listeners: {
            afterrender: function () {//如果有默认首页就打开设置的页面
                mainPanel.createNewTab('/admin/articles', Math.random(), '文章管理');
            }
        }
    });

    var treeMenu = new Ext.ijobs.index.TreeMenu({
        dvListeners: {
            "itemclick": function (view, record, item, index, e) {

                var node = e.target,
                    title = node.getAttribute('tabTitle'),
                    href = node.getAttribute('to'),
                    id = node.id;
                if (!title)return;
                Ext.each(Ext.query('dd'), function (dd) {
                    Ext.get(dd).removeCls('active');
                });
                Ext.fly(node.parentNode).addCls('active');
                mainPanel.createNewTab(href, id, title);
            }
        }
    });

    /**
     * 全局方法
     */
    window.Frame = {
        getBody: function () {
            return Ext.getBody();
        },
        insertMsg: function (msg, type) {
            mainPanel.insertMsg(msg, type);
        },
        getCurUser: function () {
            return uploadUserName;
        },
        createNewTab: function () {
            arguments.length !== 1 ?
                mainPanel.createNewTab(arguments[0], arguments[1], arguments[2]) : mainPanel.createNewTab(arguments[0]);
        },

        getActiveTab: function () {
            return mainPanel.COMPONENT.contentTab.getActiveTab();
        },

        closeTab: function (id) {
            mainPanel.COMPONENT.contentTab.remove(id);
        },

        setTabTitle: function (id, title) {
            mainPanel.COMPONENT.contentTab.getItem(id).setTitle(title);
        },
        cleanInfos: function () {
            mainPanel.clearMsg();
        },
        getTabTitle: function (id) {
            return mainPanel.COMPONENT.contentTab.getItem(id).title;
        }};


    /**
     * 构造主页布局
     */
    Ext.create('Ext.Viewport', {
        layout: 'border',
        autoScroll: true,
        boxMinWidth: 1300,
        items: [
            {
                region: 'north',
                xtype: 'box',
                el: 'header',
                boxMinWidth: 1300
            },
            treeMenu,
            mainPanel
        ]
    });

    /**
     * 构造主页菜单及点击事件
     */
    (function () {
        var v3_topmenu = {
            user: {cls: 'user-center', name: '内容管理'},
            job: {cls: 'job-manage', name: '日志'},
            data: {cls: 'data', name: '订单管理'},
            admin: {cls: 'admin-entrance', name: '微信设置'},
            step: {cls: 'step-component', name: '步骤'},
            set: {cls: 'set', name: '系统设置'}
        };

        var mainMenu = [];
        /**
         * 构造主页顶部菜单
         */
        var buildTopMenu = function () {
            var lis = [];
            var dh = Ext.DomHelper;
            if (isAdmin) {
                if (isGeneralVersion) {
                    mainMenu = Docs_general.Menu;
                } else {
                    mainMenu = Docs.Menu;
                }
            } else {
                if (isGeneralVersion) {
                    mainMenu = Docs_user_general.Menu;
                } else {
                    mainMenu = Docs_user.Menu;
                }
            }

            Ext.each(mainMenu, function (menu) {
                lis.push({
                    tag: 'li',
                    cls: v3_topmenu[menu.id].cls,
                    html: '<h4>' + v3_topmenu[menu.id].name + '</h4>'
                });
            });

            dh.append('topmenu', lis);

        };

        /**
         * 构造主页左面的菜单
         */
        var buildLeftMenu = function (menus) {
            var _menus = [];
            var _subMenus = [];
            if (menus.isMutilLevel) {
                var secLevelMenu = menus.children;
                Ext.each(secLevelMenu, function (secMenu, secIndex) {
                    Ext.each(secMenu.children, function (thridMenu, thridIndex) {
                        _subMenus.push({
                            id: menus.id + "_" + secIndex + "_" + thridIndex,
                            menu: thridMenu.text,
                            url: thridMenu.href
                        });
                    });
                    _menus.push({
                        menu: secMenu.text,
                        subMenu: _subMenus
                    });
                    _subMenus = [];
                });
            } else {
                Ext.each(menus.children, function (menu, index) {
                    _subMenus.push({
                        id: menus.id + "_" + index,
                        menu: menu.text,
                        url: menu.href
                    });
                });
                _menus.push({
                    menu: menus.text,
                    subMenu: _subMenus
                });
            }
            treeMenu.loadMenuData(_menus);
            bindLeftNav();
        };

        var bindLeftNav = function () {
            //主导航图标上的点击菜单
            var navs = [];
            Ext.each(mainMenu, function (menu) {
                navs.push({
                    text: menu.text,
                    handler: function () {
                        var navDom = Ext.query('#header>ul[id="topmenu"]>li[class*="' + menu.id + '"]')[0],
                            navEl = Ext.get(navDom),
                            className = navEl.getAttribute('class'),
                            hoverClass = className;// + '_hover';
                        navEl.addCls(hoverClass);
                        navEl.removeCls(className);
                        navDom.click();
                    }
                });
            });

            var navMenu = new Ext.menu.Menu({
                items: navs
            });
        };

        /**
         * 绑定主页上方菜单点击事件及样式变化
         */
        var applyTopMenuHover = function () {
            var menus = Ext.query('#header>ul[id="topmenu"]>li');
            Ext.each(menus, function (menu, index) {
                menu = Ext.get(menu);
                var className = menu.getAttribute('class');
                var hoverClass = className;// + '_hover';
                var selectClass = "active";
                menu.hover(function () {
                    if (!menu.hasCls(selectClass)) {
                        menu.addCls(hoverClass);
                        //menu.removeCls(className);
                    }
                }, function () {
                    if (!menu.hasCls(selectClass)) {
                        menu.addCls(className);
                        //menu.removeCls(hoverClass);
                    }
                });
                menu.on('click', function () {
                    var selectedMenus = Ext.query('#header>ul[id="topmenu"]>li[class*="active"]');
                    Ext.each(selectedMenus, function (selectedMenu) {
                        selectedMenu = Ext.get(selectedMenu);
                        if (menu === selectedMenu) {
                            return false;
                        }
                        selectedMenu.removeCls(selectClass);

                        buildLeftMenu(mainMenu[index]);
                        menu.addCls(selectClass);
                    });
                });
            });
        };

        /**
         * 解析外链
         * **/
        var autoGoDirectlink = function () {
            var url = window.location.href;
            if (url.indexOf("directlink") != -1) {
                var arr = url.split("/");
                var action = "./jobs/" + arr[arr.length - 1];
                window.Frame.createNewTab(action, Math.random(), "查看执行作业");
            }
        };

        var autoGoStatDirectlink = function () {
            var url = window.location.href;
            if (url.indexOf("statdirectlink") != -1) {
                var arr = url.split("/");
                var action = "./statistics/" + arr[arr.length - 1];
                window.Frame.createNewTab(action, Math.random(), "统计数据查看");
            }
        };

        /**
         * 初始化菜单选中样式及左边菜单
         */
        var initApp = function () {
            autoGoDirectlink();
            autoGoStatDirectlink();
            buildTopMenu();
            applyTopMenuHover();

            var index = 0;//默认选中内容管理
            var menu = Ext.get(Ext.query('#header>ul[id="topmenu"]>li')[index]);

            var normalCls = menu.getAttribute('class');
            var overCls = normalCls;// + '_hover';
            menu.set({'class': overCls + ' active'});
            Ext.defer(function () {
                buildLeftMenu(mainMenu[index]);
            }, 30);
            roleInfo = '';

            Ext.get('lnkLogout').addListener('click', function (e) {
                window.location.href = "http://passport.oa.com/modules/passport/signout.ashx?url=" + window.encodeURIComponent(basePath);
            });
        }();
    }());
});

//end file