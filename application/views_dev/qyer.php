<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>穷游网</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <link rel="shortcut icon" href="images/favicon.ico">
    <script type="text/javascript">
        window.__qRequire__ = {
            version: '1448619797',
            combineCSS: []
        };
    </script>
    <script type="text/javascript" async="" src="js/beacon.js"></script>
    <script type="text/javascript" async="" src="js/ga.js"></script>
    <!-- style base -->
    <link rel="stylesheet" href="css/base.css">
    <!-- style home -->
    <link rel="stylesheet" href="css/home.css">
    <!--[if lt IE 11]>
    <style>
        .sk-wave {
            background: url('http://home.qyerstatic.com/common/images/common/londing32.gif') center center no-repeat;
        }

        .sk-wave .sk-rect {
            display: none;
        }
    </style>
    <![endif]-->
    <!--[if lt IE 8]>
    <script src="http://home.qyerstatic.com/common/js/common/json2.js"></script>
    <![endif]-->
</head>
<body>
<!-- 广告开始 -->

<style type="text/css">
    .zpui-head-ad {
        position: relative;
        z-index: 2;
    }

    .zpui-head-ad .bg {
        display: block;
        height: 60px;
        width: 100%;
        background: url("images/ad-bg2.jpg") center top no-repeat;
    }

    .zpui-head-ad .close {
        position: absolute;
        display: block;
        cursor: pointer;
        background: url(images/ad-close.png) center center no-repeat;
        left: 50%;
        top: 50%;
        width: 30px;
        height: 30px;
        margin-left: 420px;
        margin-top: -15px;
    }
</style>

<div id="zpui-head-ad" class="zpui-head-ad" style="display: none;">
    <a href="#" target="_blank" class="bg"></a>
    <span id="zpui-head-ad-close" class="close"></span>
</div>


<script type="text/javascript">
    (function () {
        function setCookie(name, value) {
            var exp = new Date();
            exp.setTime(exp.getTime() + 86400000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=qyer.com";
        };

        function getCookie(objName) {
            var arrStr = document.cookie.split("; ");
            for (var i = 0; i < arrStr.length; i++) {
                var temp = arrStr[i].split("=");
                if (temp[0] == objName) return unescape(temp[1]);
            }
        }

        // 解决静态页问题
        if (getCookie("qy_topad")) {
            document.getElementById("zpui-head-ad").style.display = "none";
        } else {
            document.getElementById("zpui-head-ad-close").onclick = function () {
                if ($) {
                    $("#zpui-head-ad").slideUp(200);
                }
                else {
                    document.getElementById("zpui-head-ad").style.display = "none";
                }
                setCookie("qy_topad", 1);
            }
        }

    })();
</script>

<!-- 广告结束 -->

<!-- header -->
<div class="header">
    <div class="header-inner">
        <a href="#"><img src="images/logo.png" alt="穷游" class="logo" width="84" height="36"></a>

        <div class="nav">
            <ul class="nav-ul">
                <li class="nav-list"><a class="nav-span" href="#" title="穷游目的地">目的地</a></li>
                <li class="nav-list"><a class="nav-span" href="#" title="穷游锦囊">锦囊</a></li>
                <li class="nav-list"><a class="nav-span" href="#" title="穷游行程助手">行程助手</a></li>
                <li class="nav-list nav-list-layer">
                    <span class="nav-span">社区<i class="iconfont icon-jiantouxia"></i></span>

                    <div class="q-layer q-layer-nav q-layer-arrow">
                        <ul>
                            <li class="nav-list-layer">
                                <a href="#" title="穷游论坛"><i class="iconfont icon-luntan"></i> 旅行论坛 <i
                                        class="iconfont icon-jiantouyou"></i></a>

                                <div class="q-layer q-layer-section">
                                    <div class="q-layer">
                                        <div class="section-title">
                                            <a class="more" href="#">全部版块<i class="iconfont icon-jiantouyou"></i></a>
                                            <span>热门版块</span>
                                        </div>
                                        <dl class="section-item">
                                            <dt>兴趣小组</dt>
                                            <dd>
                                                <a href="#">结伴同游</a>
                                                <a href="#">签证</a>
                                                <a href="#">旅行摄影</a>
                                                <a href="#">潜水俱乐部</a>
                                                <a href="#">带孩子旅行</a>
                                                <a href="#">路刻社</a>
                                            </dd>
                                        </dl>
                                        <dl class="section-item">
                                            <dt>穷游欧洲</dt>
                                            <dd>
                                                <a href="#">法国/摩纳哥</a>
                                                <a href="#">德国</a>
                                                <a href="#">英国/爱尔兰</a>
                                                <a href="#">瑞士/列支敦士登</a>
                                                <a href="#">土耳其</a>
                                                <a href="#">挪威/瑞典/芬兰/丹麦/冰岛</a>
                                                <a href="#">意大利/梵蒂冈/圣马力诺/马耳他</a>
                                            </dd>
                                        </dl>
                                        <dl class="section-item">
                                            <dt>穷游亚洲</dt>
                                            <dd>
                                                <a href="#">台湾</a>
                                                <a href="#">日本</a>
                                                <a href="#">泰国</a>
                                                <a href="#">新加坡</a>
                                                <a href="#">斯里兰卡</a>
                                                <a href="#">韩国/朝鲜</a>
                                                <a href="#">香港/澳门</a>
                                                <a href="#">马来西亚/文莱</a>
                                                <a href="#">柬埔寨</a>
                                                <a href="#">马尔代夫</a>
                                                <a href="#">缅甸</a>
                                                <a href="#">伊朗</a>
                                                <a href="#">印度/孟加拉</a>
                                            </dd>
                                        </dl>
                                        <dl class="section-item">
                                            <dt>穷游美洲</dt>
                                            <dd>
                                                <a href="#">加拿大</a>
                                                <a href="#">美国</a>
                                                <a href="#">中美</a>
                                                <a href="#">南美/南极</a>
                                            </dd>
                                        </dl>
                                        <dl class="section-item">
                                            <dt>穷游大洋洲</dt>
                                            <dd>
                                                <a href="#">澳大利亚</a>
                                                <a href="#">新西兰</a>
                                                <a href="#">太平洋海岛</a>
                                            </dd>
                                        </dl>
                                        <dl class="section-item">
                                            <dt>穷游非洲</dt>
                                            <dd>
                                                <a href="#">东非地区</a>
                                                <a href="#">非洲海岛</a>
                                                <a href="#">北非地区</a>
                                                <a href="#">非洲其他国家</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </li>
                            <li><a href="#" title="穷游问答"><i class="iconfont icon-wenda"></i> 旅行问答</a></li>
                            <li><a href="#" title="穷游生活实验室"><i class="iconfont icon-shenghuoshiyanshi"></i> 生活实验室</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-list">
                    <a class="nav-span" href="#" title="最世界自由行">
                        最世界·自由行
                        <span class="icon-recommend"><i></i></span>
                    </a>
                </li>
                <li class="nav-list"><a class="nav-span" href="#" title="穷游酒店">酒店</a></li>
                <li class="nav-list nav-list-layer">
                    <span class="nav-span">预订<i class="iconfont icon-jiantouxia"></i></span>

                    <div class="q-layer q-layer-nav q-layer-arrow">
                        <ul>
                            <li><a href="#" title="机票"><i class="iconfont icon-feiji"></i> 机票</a></li>
                            <li><a href="#" title="特价酒店"><i class="iconfont icon-chengshi"></i> 特价酒店</a></li>
                            <li><a href="#" title="保险"><i class="iconfont icon-baoxian"></i> 保险</a></li>
                            <li><a href="#" title="华人旅馆"><i class="iconfont icon-huarenlvguan"></i> 华人旅馆</a></li>
                            <li><a href="#" target="_blank" title="当地人家"><i class="iconfont icon-airbnb"></i> 当地人家</a>
                            </li>
                            <li><a href="#" target="_blank" title="邮轮"><i class="iconfont icon-lunchuan"></i> 邮轮</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-list"><a class="nav-span" href="#" title="手机穷游"><i
                            class="iconfont icon-phone"></i>手机穷游</a></li>
            </ul>
        </div>
        <div class="fun">
            <div id="siteSearch" class="nav-search">
                <form action="" method="get">
                    <input class="txt" name="wd" type="text" autocomplete="off">
                    <button class="btn" type="submit"><i class="iconfont icon-sousuo"></i><span>搜索</span></button>
                </form>
            </div>
            <div id="userStatus" class="status">
                <div class="login">
                    <a class="otherlogin-link" href="javascript:;" rel="noflow"><i class="iconfont icon-qq"></i></a>
                    <a class="otherlogin-link" href="javascript:;" rel="noflow"><i class="iconfont icon-weibo"></i></a>
                    <a class="otherlogin-link" href="javascript:;" rel="noflow"><i class="iconfont icon-weixin"></i></a>
                    <a href="#">注册</a>
                    <a href="#">登录</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- banner -->
<div id="qyer_banner" class="banner">
    <!-- <div id="bannerbg" class="blur">
        <img src="">
    </div> -->
    <div id="carousel" class="carousel">
        <div class="img"
             style="background-image: url(http://pic.qyer.com/public/home/focus/2015/11/26/14485334378733?imageMogr2/interlace/1);">
            <div class="hotlink">
                <a href="#" target="_blank"></a>
            </div>
            <div class="text">
                <div class="text-panel">
                    <a href="#" target="_blank">
                        <p><i class="iconfont icon-jinnang"></i> <strong>穷游锦囊 | 渥太华</strong></p>

                        <p>诡谲历史和惊艳风光中的低调首都</p>
                    </a>
                </div>
            </div>
        </div>

        <ul class="carousel-data">
            <li>
                <input class="bannerimg" type="hidden"
                       value="http://pic.qyer.com/public/home/focus/2015/11/26/14485334378733?imageMogr2/interlace/1">
                <input class="bannertext" type="hidden" value="渥太华">
                <input class="bannerurl" type="hidden" value="http://place.qyer.com/ottawa/">
                <input class="itemid" type="hidden" value="565">
                <input class="bannerlink" type="hidden" value="http://guide.qyer.com/ottawa/">

                <div class="text">
                    <a href="#" target="_blank">
                        <p><i class="iconfont icon-jinnang"></i> <strong>穷游锦囊 | 渥太华</strong></p>

                        <p>诡谲历史和惊艳风光中的低调首都</p>
                    </a>
                </div>
            </li>
            <li>
                <input class="bannerimg" type="hidden"
                       value="http://pic.qyer.com/public/home/focus/2015/11/25/14484359543999?imageMogr2/interlace/1">
                <input class="bannertext" type="hidden" value="里约热内卢">
                <input class="bannerurl" type="hidden" value="http://place.qyer.com/rio-de-janeiro/">
                <input class="itemid" type="hidden" value="1392354">
                <input class="bannerlink" type="hidden" value="http://bbs.qyer.com/thread-1392354-1.html">

                <div class="text">
                    <a href="#" target="_blank">
                        <p><strong>里约热内卢：上帝之城七宗“最”</strong></p>

                        <p>ChaseWang</p>
                    </a>
                </div>
            </li>
            <li>
                <input class="bannerimg" type="hidden"
                       value="http://pic.qyer.com/public/home/focus/2015/11/26/14485333574999?imageMogr2/interlace/1">
                <input class="bannertext" type="hidden" value="青森">
                <input class="bannerurl" type="hidden" value="http://place.qyer.com/aomori/">
                <input class="itemid" type="hidden" value="562">
                <input class="bannerlink" type="hidden" value="http://guide.qyer.com/aomori/">

                <div class="text">
                    <a href="#" target="_blank">
                        <p><i class="iconfont icon-jinnang"></i> <strong>穷游锦囊 | 青森</strong></p>

                        <p>体验弘前樱花祭，探访白神山地</p>
                    </a>
                </div>
            </li>
            <li>
                <input class="bannerimg" type="hidden"
                       value="http://pic.qyer.com/public/home/focus/2015/11/23/14482755187745?imageMogr2/interlace/1">
                <input class="bannertext" type="hidden" value="维也纳">
                <input class="bannerurl" type="hidden" value="http://place.qyer.com/vienna/">
                <input class="itemid" type="hidden" value="1394533">
                <input class="bannerlink" type="hidden" value="http://bbs.qyer.com/thread-1394533-1.html">

                <div class="text">
                    <a href="#" target="_blank">
                        <p><strong>醉心的画卷——由维也纳展开，到布拉格合上</strong></p>

                        <p>人字拖1小白</p>
                    </a>
                </div>
            </li>
            <li>
                <input class="bannerimg" type="hidden"
                       value="http://pic.qyer.com/public/home/focus/2015/11/25/14484355957171?imageMogr2/interlace/1">
                <input class="bannertext" type="hidden" value="美国">
                <input class="bannerurl" type="hidden" value="http://place.qyer.com/usa/">
                <input class="itemid" type="hidden" value="1391113">
                <input class="bannerlink" type="hidden" value="http://bbs.qyer.com/thread-1391113-1.html">

                <div class="text">
                    <a href="#" target="_blank">
                        <p><strong>南加州不下雨，狂野西部的16天</strong></p>

                        <p>比利白</p>
                    </a>
                </div>
            </li>
        </ul>
    </div>
    <div id="search" class="search active-place">
        <div class="tab">
            <a class="tab-place" href="javascript:;">目的地</a>
            <a class="tab-plan" href="javascript:;">做行程</a>
            <a class="tab-z" href="javascript:;">买折扣</a>
        </div>
        <div class="panel">
            <em class="arrow"></em>

            <div class="panel-inner">
                <div class="panel-cont">
                    <div class="place place_search_box">
                        <div class="input-control">
                            <form class="place_search_form" target="_blank" action="" method="post">
                                <input class="txt placesearch_txt" type="text" placeholder="里约热内卢" autofocus=""
                                       autocomplete="off">
                                <button class="btn" type="submit">搜索</button>
                            </form>
                        </div>
                    </div>
                    <div class="plan">
                        <p>一分钟搞定你的攻略</p>
                        <a class="link" target="_blank" href="#"><i class="iconfont icon-jiahao"></i> 创建行程</a>
                    </div>
                    <div class="z z_search_box">
                        <div class="input-control">
                            <form class="z_search_form" target="_blank" action="" method="get">
                                <input type="hidden" name="_type" value="search">
                                <input type="hidden" name="action" value="list">
                                <input class="txt zsearch_txt" type="text" placeholder="搜索目的地/折扣类型/关键词"
                                       autocomplete="off" name="kw">
                                <!-- <a class="btn placesearch_link" href="http://www.qyer.com">搜索</a> -->
                                <button class="btn" type="submit">搜索</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="q-layer q-layer-placesearch-history">
            <div class="placesearch_history_box"></div>
            <div class="placesearch-history-title">
                <span>热门城市</span>
            </div>
            <div class="placesearch-history-cont hot">
                <a href="#" target="_blank">香港</a>
                <a href="#" target="_blank">曼谷</a>
                <a href="#" target="_blank">澳门</a>
                <a href="#" target="_blank">巴黎</a>
                <a href="#" target="_blank">东京</a>
                <a href="#" target="_blank">台湾</a>
                <a href="#" target="_blank">首尔</a>
                <a href="#" target="_blank">京都</a>
                <a href="#" target="_blank">罗马</a>
                <a href="#" target="_blank">大阪</a>
                <a href="#" target="_blank">清迈</a>
                <a href="#" target="_blank">威尼斯</a>
                <a href="#" target="_blank">普吉岛</a>
                <a href="#" target="_blank">新加坡</a>
                <a href="#" target="_blank">吉隆坡</a>
                <a href="#" target="_blank">台北</a>
                <a href="#" target="_blank">佛罗伦萨</a>
                <a href="#" target="_blank">洛杉矶</a>
                <a href="#" target="_blank">芭堤雅</a>
                <a href="#" target="_blank">米兰</a>
            </div>
        </div>
        <div class="q-layer q-layer-zsearch-history">
            <div class="zsearch_history_box"></div>
            <div class="zsearch-history-title">
                <span>热门搜索</span>
            </div>
            <div class="zsearch-history-cont hot">
                <a href="#" target="_blank">日本 城市</a>
                <a href="#" target="_blank">元旦假期</a>
                <a href="#" target="_blank">清迈 门票/一日游</a>
                <a href="#" target="_blank">新加坡 机票</a>
                <a href="#" target="_blank">巴黎 机票</a>
                <a href="#" target="_blank">台湾 高铁票</a>
                <a href="#" target="_blank">韩国 自由行</a>
                <a href="#" target="_blank">WIFI/电话卡</a>
                <a href="#" target="_blank">日韩邮轮</a>
                <a href="#" target="_blank">普吉岛 门票/一日游</a>
                <a href="#" target="_blank">美国 交通卡</a>
                <a href="#" target="_blank">日本JR PASS</a>
                <a href="#" target="_blank">穷游CITYWALK</a>
            </div>
        </div>
    </div>
</div>
<!-- content -->

<!-- 感兴趣 interest -->
<div class="section">
<div class="wrapper">
<h2 class="title">猜你感兴趣</h2>

<div id="interest" class="interest">
<!--<div class="sk-wave">
    <div class="sk-rect sk-rect1"></div>
    <div class="sk-rect sk-rect2"></div>
    <div class="sk-rect sk-rect3"></div>
    <div class="sk-rect sk-rect4"></div>
    <div class="sk-rect sk-rect5"></div>
</div>-->
<a class="change" href="javascript:;"><i class="iconfont icon-shuaxin"></i> 换一换</a>

<div class="interest_inner">
<ul style="display:block;" class="gradually_col4_show">
<li>
    <div class="item">
        <a class="close iconfont icon-wrong" href="javascript:;" title="并不感兴趣"></a>

        <div class="img">
            <a href="#" target="_blank">
                <img class="lazy" src="images/275x185.jpg" width="275" height="185">

                <div class="bg">
                    <div class="p"></div>
                    <span>你可能感兴趣的城市</span>
                </div>
                <div class="tag">
                    <span><i class="iconfont icon-chengshi"></i></span>
                    <span class="bt">城市</span>
                </div>
            </a>
        </div>
        <div class="info">
            <a href="#" target="_blank">
                <div class="subtitle">
                    <p class="ellipsis">釜山</p>

                    <p class="ellipsis"><span>Busan</span></p>
                </div>
                <div class="bottom">
                    <span class="fr">10703个人去过这里</span>
                    <span class="f14">韩国城市</span>
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="item">
        <a class="close iconfont icon-wrong" href="javascript:;" title="并不感兴趣"></a>

        <div class="img">
            <a href="#" target="_blank"><img class="lazy" src="images/275x185_1.jpg" width="275" height="185">

                <div class="bg">
                    <div class="p">
                    </div>
                    <span>你可能感兴趣的景点</span>
                </div>
                <div class="tag">
                    <span><i class="iconfont icon-jingdian"></i></span><span class="bt">景点</span>
                </div>
            </a>
        </div>
        <div class="info">
            <a href="#" target="_blank">
                <div class="subtitle">
                    <p class="ellipsis">
                        艾伦群岛
                    </p>

                    <p class="ellipsis">
                        <span>Aran Islands</span>
                    </p>
                </div>
                <div class="bottom">
                    <span class="fr">当地景点排名第1</span><span class="f14">高威景点</span>
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="item ">
        <a class="close iconfont icon-wrong" href="javascript:;" title="并不感兴趣"></a>

        <div class="img">
            <a href="#" target="_blank"><img class="lazy" src="images/275x185_2.jpg" width="275" height="185">

                <div class="bg">
                    <div class="p">
                    </div>
                    <span>你可能感兴趣的景点</span>
                </div>
                <div class="tag">
                    <span><i class="iconfont icon-jingdian"></i></span><span class="bt">景点</span>
                </div>
            </a>
        </div>
        <div class="info">
            <a href="#" target="_blank">
                <div class="subtitle">
                    <p class="ellipsis">
                        帕萨尔加德
                    </p>

                    <p class="ellipsis">
                        <span>Tomb of Cyrus the Great</span>
                    </p>
                </div>
                <div class="bottom">
                    <span class="fr">当地景点排名第6</span><span class="f14">设拉子景点</span>
                </div>
            </a>
        </div>
    </div>
</li>
<li class="li_login">
    <div class="login">
        <div class="login-title">
            <h3>让我们更懂你</h3>

            <p>
                拥有穷游账号，获得更准确的推荐
            </p>
        </div>
        <div class="login-link">
            <a href="javascript:;" class="register-btn register-phone">立即注册</a>
            <span>已有帐号？<a class="login-mail" href="javascript:;">登录</a></span>
        </div>
        <div class="auth-login">
            <a class="register-mail" href="javascript:;">使用邮箱注册</a>
            <a href="javascript:;" class="login-auth iconfont icon-qq1"></a>
            <a href="javascript:;" class="login-auth iconfont icon-weibo1"></a>
            <a href="javascript:;" class="login-auth iconfont icon-weixin1"></a>
        </div>
    </div>
</li>
<li>
    <div class="item">
        <a class="close iconfont icon-wrong" href="javascript:;" title="并不感兴趣"></a>

        <div class="img">
            <a href="#" target="_blank"><img class="lazy" src="images/275x185_3.jpg" width="275" height="185">

                <div class="bg">
                    <div class="p">
                    </div>
                    <span>如梦似幻 色彩咖喱国</span>
                </div>
                <div class="tag">
                    <span><i class="iconfont icon-youji"></i></span><span class="bt">游记</span>
                </div>
            </a>
        </div>
        <div class="info">
            <a href="#" target="_blank">
                <div class="subtitle">
                    <p>
                        【探云】印度神游•异彩呈梦夏 2015.10.1-12【异域三部曲之3】
                    </p>
                </div>
                <div class="bottom">
                    <span class="fr">8814人浏览过</span><span class="f14">vincentzyp</span>
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="item">
        <a class="close iconfont icon-wrong" href="javascript:;" title="并不感兴趣"></a>

        <div class="img">
            <a href="#" target="_blank"><img class="lazy" src="images/275x185_4.jpg" width="275" height="185">

                <div class="bg">
                    <div class="p">
                    </div>
                    <span>你可能感兴趣的微锦囊</span>
                </div>
                <div class="tag">
                    <span><i class="iconfont icon-weijinnang"></i></span><span class="bt">微锦囊</span>
                </div>
            </a>
        </div>
        <div class="info">
            <a href="#" target="_blank">
                <div class="subtitle">
                    <p>
                        另一种穷游--看看南非那些高级酒店
                    </p>
                </div>
                <div class="bottom">
                    <span class="fr">推荐了6个目的地</span><span class="f14">小螃蟹</span>
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="item">
        <a class="close iconfont icon-wrong" href="javascript:;" title="并不感兴趣"></a>

        <div class="img">
            <a href="#" target="_blank"><img class="lazy" src="images/275x185_5.jpg" width="275" height="185">

                <div class="bg">
                    <div class="p">
                    </div>
                    <span>你可能感兴趣的折扣</span>
                </div>
                <div class="tag">
                    <span><i class="iconfont icon-zhekou"></i></span><span class="bt">折扣</span>
                </div>
            </a>
        </div>
        <div class="info">
            <a href="#" target="_blank">
                <div class="subtitle">
                    <p>
                        上海直飞巴黎+罗马/法兰克福11天往返含税机票
                    </p>
                </div>
                <div class="bottom">
                    <span class="fr"><em>2999</em>元起</span><span class="f14">巴黎,罗马,法兰克福</span>
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="item">
        <a class="close iconfont icon-wrong" href="javascript:;" title="并不感兴趣"></a>

        <div class="img">
            <a href="#" target="_blank"><img class="lazy" src="images/275x185_6.jpg" width="275" height="185">

                <div class="bg">
                    <div class="p">
                    </div>
                    <span>你可能感兴趣的折扣</span>
                </div>
                <div class="tag">
                    <span><i class="iconfont icon-zhekou"></i></span><span class="bt">折扣</span>
                </div>
            </a>
        </div>
        <div class="info">
            <a href="#" target="_blank">
                <div class="subtitle">
                    <p>
                        泰国甲米冷热温泉瀑布+翡翠池+虎窟寺热带雨林一日游(含午餐)
                    </p>
                </div>
                <div class="bottom">
                    <span class="fr"><em>110</em>元起</span><span class="f14">甲米</span>
                </div>
            </a>
        </div>
    </div>
</li>
</ul>
</div>
</div>
</div>
</div>
<dl style="display:none">
    <dt>
        <a href="#" title="曼谷">曼谷</a>
        <a href="#"><span>Bangkok</span></a>
    </dt>
    <dd>
        <span class="fr">97098人去过这里</span>
        <span class="f14">泰国城市</span>
    </dd>
    <dt>
        <a href="#" title="隆德大教堂">隆德大教堂</a>
        <a href="#"><span>Lund Cathedral</span></a>
    </dt>
    <dd>
        <span class="fr">65人去过这里</span>
        <span class="f14">隆德景点</span>
    </dd>
    <dt>
        <a href="#" title="贝加尔湖博物馆">贝加尔湖博物馆</a>
        <a href="#"><span>Baikal Museum</span></a>
    </dt>
    <dd>
        <span class="fr">45人去过这里</span>
        <span class="f14">利斯特维扬卡景点</span>
    </dd>
    <dt>
        <a href="#"
           title="【已完结】蜜月是托斯卡纳的茹毛饮血！斯佩罗鲜花节独家全程播报！绝美托斯卡纳田园自驾穿越！">【已完结】蜜月是托斯卡纳的茹毛饮血！斯佩罗鲜花节独家全程播报！绝美托斯卡纳田园自驾穿越！</a>
    </dt>
    <dd>
        <span class="fr">twinklesummer人去过这里</span>
        <span class="f14">2015-07-30</span>
    </dd>
    <dt>
        <a href="#" title="渡越南北——春寒料峭中的新西兰三代游（完结。附：私享版新西兰亲子游TOP 15）">渡越南北——春寒料峭中的新西兰三代游（完结。附：私享版新西兰亲子游TOP 15）</a>
    </dt>
    <dd>
        <span class="fr">一级水晶人去过这里</span>
        <span class="f14">2015-09-16</span>
    </dd>
    <dt>
        <a href="#" title="蒙特利尔广式小点心餐馆推荐">蒙特利尔广式小点心餐馆推荐</a>
    </dt>
    <dd>
        <span class="fr">Gypsophila5227人去过这里</span>
        <span class="f14">推荐了5个目的地</span>
    </dd>
    <dt>
        <a href="#" title="上海直飞巴黎+罗马/法兰克福11天往返含税机票">上海直飞巴黎+罗马/法兰克福11天往返含税机票</a>
    </dt>
    <dd>
        <span class="fr">巴黎,罗马,法兰克福人去过这里</span>
        <span class="f14"><em>2999</em>元起</span>
    </dd>
    <dt>
        <a href="#" title="泰国甲米冷热温泉瀑布+翡翠池+虎窟寺热带雨林一日游(含午餐)">泰国甲米冷热温泉瀑布+翡翠池+虎窟寺热带雨林一日游(含午餐)</a>
    </dt>
    <dd>
        <span class="fr">甲米人去过这里</span>
        <span class="f14"><em>110</em>元起</span>
    </dd>
</dl>
<!-- 最世界 lastminute -->
<div class="section section-green">
<div class="wrapper">
<h2 class="title"></h2>

<div id="lastminute" class="lastminute">
<!-- <div class="sk-wave">
    <div class="sk-rect sk-rect1"></div>
    <div class="sk-rect sk-rect2"></div>
    <div class="sk-rect sk-rect3"></div>
    <div class="sk-rect sk-rect4"></div>
    <div class="sk-rect sk-rect5"></div>
</div> -->
<div class="buytoday-container">
    <div class="buytoday">
        <div class="buytoday-qg">
            <h3>整点秒杀</h3>

            <div class="flip-box"></div>
        </div>
        <div class="buytoday-cont">
            <a href="#" target="_blank">
                <div class="buytoday-photo">
                    <img src="images/339x226.jpg">

                    <div class="cont">
                        <p>【上海领取】日本个人旅游签证</p>
                    </div>
                </div>
            </a>

            <div class="buytoday-price">
                <div class="buytoday-btn">
                    <a href="#" target="_blank" class="btn" style="display:none;">立即抢购</a>
                    <span class="disabled">已抢光</span>
                </div>
                <span class="price"><em>199</em>元起</span>
            </div>
        </div>
        <div class="buytoday-ft">
            <span class="text"><a href="#" target="_blank">18点开抢： 【元旦假期】上海直飞济州岛机票</a></span>
        </div>
    </div>
    <div class="buytoday">
        <div class="buytoday-qg">
            <h3>整点秒杀</h3>

            <div class="flip-box"></div>
        </div>
        <div class="buytoday-cont">
            <a href="#" target="_blank">
                <div class="buytoday-photo">
                    <img src="images/339x226_1.jpg">

                    <div class="cont">
                        <p>【元旦假期】上海直飞济州岛机票</p>
                    </div>
                </div>
            </a>

            <div class="buytoday-price">
                <div class="buytoday-btn">
                    <a href="#" target="_blank" class="btn" style="display:none;">立即抢购</a>
                    <span class="disabled">已抢光</span>
                </div>
                <span class="price"><em>888</em>元起</span>
            </div>
        </div>
    </div>
</div>
<div class="slider slider-lastminute">
<div class="slider-inner">
<div class="item active gradually_col3_show" style="display: block;">
    <ul>
        <li class="buytoday">
            <div class="buytoday">
                <div class="buytoday-qg">
                    <h3>整点秒杀</h3>

                    <div class="flip-box">
                        <div class="flip-group">
                            <div class="flip-digit">
                                <span class="num top hour-tens-top">0</span>
                                <span class="num bottom hour-tens-bottom"><i>0</i></span>

                                <div class="flip-swapper hour-tens-swapper">
                                    <span class="num top hour-tens-top-anim">0</span>
                                    <span class="num bottom hour-tens-bottom-anim"><i>0</i></span>
                                </div>
                            </div>
                            <div class="flip-digit">
                                <span class="num top hour-ones-top">0</span>
                                <span class="num bottom hour-ones-bottom"><i>0</i></span>

                                <div class="flip-swapper hour-ones-swapper">
                                    <span class="num top hour-ones-top-anim">0</span>
                                    <span class="num bottom hour-ones-bottom-anim"><i>0</i></span>
                                </div>
                            </div>
                        </div>
                        <div class="flip-colon">
                            :
                        </div>
                        <div class="flip-group">
                            <div class="flip-digit">
                                <span class="num top minute-tens-top">0</span>
                                <span class="num bottom minute-tens-bottom"><i>0</i></span>

                                <div class="flip-swapper minute-tens-swapper">
                                    <span class="num top minute-tens-top-anim">0</span>
                                    <span class="num bottom minute-tens-bottom-anim"><i>0</i></span>
                                </div>
                            </div>
                            <div class="flip-digit">
                                <span class="num top minute-ones-top">0</span>
                                <span class="num bottom minute-ones-bottom"><i>0</i></span>

                                <div class="flip-swapper minute-ones-swapper">
                                    <span class="num top minute-ones-top-anim">0</span>
                                    <span class="num bottom minute-ones-bottom-anim"><i>0</i></span>
                                </div>
                            </div>
                        </div>
                        <div class="flip-colon">
                            :
                        </div>
                        <div class="flip-group">
                            <div class="flip-digit">
                                <span class="num top second-tens-top">0</span>
                                <span class="num bottom second-tens-bottom"><i>0</i></span>

                                <div class="flip-swapper second-tens-swapper">
                                    <span class="num top second-tens-top-anim">0</span>
                                    <span class="num bottom second-tens-bottom-anim"><i>0</i></span>
                                </div>
                            </div>
                            <div class="flip-digit">
                                <span class="num top second-ones-top">0</span>
                                <span class="num bottom second-ones-bottom"><i>0</i></span>

                                <div class="flip-swapper second-ones-swapper">
                                    <span class="num top second-ones-top-anim">0</span>
                                    <span class="num bottom second-ones-bottom-anim"><i>0</i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buytoday-cont">
                    <a href="#" target="_blank">
                        <div class="buytoday-photo">
                            <img src="http://pic.qyer.com/lastminute/library/2015/05/18/5559b88e60ae0.jpg/339x226">

                            <div class="cont">
                                <p>
                                    【春节假期】香港直飞岘港自由行
                                </p>
                            </div>
                        </div>
                    </a>

                    <div class="buytoday-price">
                        <div class="buytoday-btn">
                            <a href="#" target="_blank" class="btn">立即抢购</a>
                            <span class="disabled" style="display: none;">已抢光</span>
                        </div>
                        <span class="price"><em>1490</em>元起</span>
                    </div>
                </div>
                <div class="buytoday-ft">
                    <span class="text"><a href="#" target="_blank">18点开抢： 【直省2000】上海直飞香港机票</a></span>
                </div>
            </div>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img" src="http://pic.qyer.com/public/picstock/2014/09/12/14105210099736/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            【元旦假期】上海直飞首尔4-5天往返机票(可选自由行套餐)
                        </div>
                        <div class="st">
                            <span class="time">2015/12 - 2016/03</span><span class="tag">自由行</span>
                        </div>
                        <div class="price">
                            <span><em>799</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/07/28/14380493178277/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            普吉岛女神人妖秀VIP座/黄金座门票(可另订接送)
                        </div>
                        <div class="st">
                            <span class="time">2015/01 - 2016/04</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>20</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/lastminute/library/2015/11/06/563c75c985540.jpg/120x120" width="120"
                         height="120">

                    <div class="inner">
                        <div class="caption">
                            北京直飞洛杉矶9天往返含税机票
                        </div>
                        <div class="st">
                            <span class="time">2015/12 - 2016/04</span><span class="tag">机票</span>
                        </div>
                        <div class="price">
                            <span><em>3999</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/01/06/14205106572644/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉珊瑚岛一日游(英文导游,可加订多种水上项目)
                        </div>
                        <div class="st">
                            <span class="time">2015/01 - 2016/04</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>75</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</div>
<div class="item">
    <ul>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/lastminute/library/2015/08/19/55d3ef8ac0129.jpg/120x120" width="120"
                         height="120">

                    <div class="inner">
                        <div class="caption">
                            【寻梦极光之旅】上海直飞芬兰8天6晚自由行(春节假期)
                        </div>
                        <div class="st">
                            <span class="time">2015/12 - 2016/01</span><span class="tag">自由行</span>
                        </div>
                        <div class="price">
                            <span><em>18999</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/07/22/14375673625320/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉岛皇帝岛快艇浮潜一日游(含午餐+中/英文导游)
                        </div>
                        <div class="st">
                            <span class="time">2015/04 - 2016/03</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>173</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/lastminute/library/2015/04/17/553088ff5437d.jpg/120x120" width="120"
                         height="120">

                    <div class="inner">
                        <div class="caption">
                            上海直飞吴哥窟5-6天自由行
                        </div>
                        <div class="st">
                            <span class="time">2015/10 - 2016/03</span><span class="tag">自由行</span>
                        </div>
                        <div class="price">
                            <span><em>1299</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/07/27/14379941405598/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉皇帝岛+珊瑚岛快艇一日游(英文服务,多套餐可选)
                        </div>
                        <div class="st">
                            <span class="time">2015/01 - 2016/04</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>185</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img" src="http://pic.qyer.com/public/picstock/2014/09/12/14105208001026/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            上海直飞西雅图/波士顿3-29天往返含税机票
                        </div>
                        <div class="st">
                            <span class="time">2015/12 - 2016/05</span><span class="tag">机票</span>
                        </div>
                        <div class="price">
                            <span><em>3999</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/01/13/14211163644629/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉岛攀牙湾日落之旅(含海鲜/龙虾晚餐)
                        </div>
                        <div class="st">
                            <span class="time">2015/01 - 2016/04</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>309</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</div>
<div class="item">
    <ul>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/04/08/14284622871945/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            【春节假期】北京往返普吉岛6天4晚自由行
                        </div>
                        <div class="st">
                            <span class="time">2015/06 - 2016/02</span><span class="tag">自由行</span>
                        </div>
                        <div class="price">
                            <span><em>2799</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/01/08/14206826864458/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉皮皮岛+竹子岛快艇浮潜一日游(含中文导游)
                        </div>
                        <div class="st">
                            <span class="time">2015/01 - 2016/04</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>309</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img" src="http://pic.qyer.com/public/picstock/2014/09/12/14105190268038/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            天津直飞大阪6-7天往返含税机票
                        </div>
                        <div class="st">
                            <span class="time">2015/10 - 2016/01</span><span class="tag">机票</span>
                        </div>
                        <div class="price">
                            <span><em>599</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/07/22/14375674317304/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            【秒杀】泰国普吉岛往返皮皮岛通赛码头/北部码头船票(含酒店接送)
                        </div>
                        <div class="st">
                            <span class="time">2015/01 - 2015/10</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>55</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img" src="http://pic.qyer.com/public/picstock/2014/09/12/14105209577127/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            北京直飞首尔4天3晚自由行(可选五星酒店)
                        </div>
                        <div class="st">
                            <span class="time">2015/10 - 2016/02</span><span class="tag">自由行</span>
                        </div>
                        <div class="price">
                            <span><em>1799</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/08/19/14399553271361/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉岛攀牙湾大船一日游(含皮艇泛舟)
                        </div>
                        <div class="st">
                            <span class="time">2015/02 - 2015/10</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>188</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</div>
<div class="item">
    <ul>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img" src="http://pic.qyer.com/public/picstock/2014/09/12/14105192581930/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            多地直飞欧洲多国7-30天往返含税机票(五星航空,可任选目的地)
                        </div>
                        <div class="st">
                            <span class="time">2015/11 - 2016/07</span><span class="tag">自由行</span>
                        </div>
                        <div class="price">
                            <span><em>3999</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/03/24/14271788689093/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉鸡蛋岛半日游/一日游
                        </div>
                        <div class="st">
                            <span class="time">2015/04 - 2016/04</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>145</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img" src="http://pic.qyer.com/public/picstock/2014/09/12/14105140704609/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            【春节假期】上海直飞长滩岛5-6天自由行(含接送机)
                        </div>
                        <div class="st">
                            <span class="time">2016/01 - 2016/03</span><span class="tag">自由行</span>
                        </div>
                        <div class="price">
                            <span><em>2599</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/07/27/14379793415959/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉岛可可热带生活水疗馆SPA体验(含酒店接送)
                        </div>
                        <div class="st">
                            <span class="time">2015/04 - 2016/04</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>320</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/lastminute/library/2015/04/16/552f7fba25456.jpg/120x120" width="120"
                         height="120">

                    <div class="inner">
                        <div class="caption">
                            【元旦/春节假期】北京直飞东京3-30天往返含税机票(赠首晚酒店)
                        </div>
                        <div class="st">
                            <span class="time">2015/11 - 2016/03</span><span class="tag">自由行</span>
                        </div>
                        <div class="price">
                            <span><em>2999</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2014/10/23/14140319868814/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉蜜月岛双体帆船浮潜一日游(含往返接送)
                        </div>
                        <div class="st">
                            <span class="time">2015/04 - 2016/04</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>490</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</div>
<div class="item">
    <ul>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img" src="http://pic.qyer.com/lastminute/library/2014/12/26/1419562284/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            北京直飞首尔5天4晚自由行(赠接送机)
                        </div>
                        <div class="st">
                            <span class="time">2015/10 - 2016/01</span><span class="tag">自由行</span>
                        </div>
                        <div class="price">
                            <span><em>1799</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/01/06/14205146591945/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉岛丛林飞跃Flying Hanuman
                        </div>
                        <div class="st">
                            <span class="time">2015/04 - 2016/04</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>280</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/lastminute/library/2015/07/30/55b9981373f0a.jpg/120x120" width="120"
                         height="120">

                    <div class="inner">
                        <div class="caption">
                            广州直飞沙巴5天5晚自由行(赠接送机)
                        </div>
                        <div class="st">
                            <span class="time">2015/12 - 2015/12</span><span class="tag">自由行</span>
                        </div>
                        <div class="price">
                            <span><em>1599</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/supplier/lastminute/2015/04/28/14301927604340/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            泰国普吉岛素可水疗中心SPA3小时套餐(可选接送)
                        </div>
                        <div class="st">
                            <span class="time">2015/04 - 2016/04</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>352</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img" src="http://pic.qyer.com/lastminute/library/2014/12/26/1419561650/120x120"
                         width="120" height="120">

                    <div class="inner">
                        <div class="caption">
                            北京直飞大阪5天往返含税机票
                        </div>
                        <div class="st">
                            <span class="time">2015/12 - 2015/12</span><span class="tag">机票</span>
                        </div>
                        <div class="price">
                            <span><em>999</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" target="_blank">
                <div class="discount">
                    <img class="lazy img"
                         src="http://pic.qyer.com/public/lastmin/lastminute/2015/04/22/14296979397552/120x120"
                         data-original="http://pic.qyer.com/public/lastmin/lastminute/2015/04/22/14296979397552/120x120"
                         width="120" height="120" style="display: block;">

                    <div class="inner">
                        <div class="caption">
                            美国10天AT&amp;T电话卡（含快递）
                        </div>
                        <div class="st">
                            <span class="time">2015/04 - 2015/12</span><span class="tag">城市玩乐</span>
                        </div>
                        <div class="price">
                            <span><em>178</em>元起</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</div>
</div>
<div class="slider-control">
    <a class="current" href="javascript:;"></a>
    <a href="javascript:;"></a>
    <a href="javascript:;"></a>
    <a href="javascript:;"></a>
    <a href="javascript:;"></a>
</div>
</div>
<div class="more">
    <a href="#" target="_blank">查看更多折扣</a>
</div>
</div>
</div>
</div>
<!-- 游记攻略 hottravels -->
<div class="section">
<div class="wrapper">
<h2 class="title">热门游记攻略</h2>

<div class="hottravels">
<div class="slider slider-hottravels">
<div class="slider-inner">
<div class="item" style="display: block;">
<ul>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/275x185_7.jpg" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 10</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/17_avatar_big.jpg">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">SJ</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    去葡萄牙，延续夏季的热情（完）
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/275x185_8.jpg" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 4</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/85_avatar_big.jpg">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">左手plus</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【左手+】《原来这么拍》第四季——国家公园房车之旅（更新至第5集 初级野生动物拍摄)
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/275x185_9.jpg" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 6</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/77_avatar_big.jpg">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">Housheng</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    只有喀布尔
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/275x185_10.jpg" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 285</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/04_avatar_big.jpg">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">小狮妹</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【小狮妹的蜜月旅行 • 新西兰13日南岛初春自驾游】附全程GPS坐标..
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/275x185_11.jpg" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 103</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/48_avatar_big.jpg">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">ile241</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【越南】3500元的国庆之旅（最新最实用，一篇游记带你走南越！值得收藏！） ★★★ 一起迈进那熟悉又陌生的越南 ！
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/275x185_12.jpg" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 27</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/big5.png">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">wahookuang</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    2015年国庆13天肯坦画圈之旅（各种住宿、装备、当地上网、司机、小费、小黄本、旅行社……详细攻略)[已完工]
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/275x185_13.jpg" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 153</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/35_avatar_big.jpg">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">KyleShi</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    果小姐的慢生活之荒野大骑行（美西不完全记录，更新ing）
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/275x185_14.jpg" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 12</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/97_avatar_big.jpg">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">想太多小小姐</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【世界没那么了不起，所以去吧】——依然梦中斯里兰卡，记一次随心随行之旅
                </div>
            </a>
        </div>
    </div>
</li>
</ul>
</div>
<div class="item">
<ul>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 6</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">nadadora</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【西班牙古镇游】Mogarraz：一座小村庄，一位艺术家和388幅居民肖像 （已完帖）
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 71</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">小狮妹</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【小狮妹の盛夏东京漫游记】附商场&amp;药妆店指南+高逼格文艺街区推荐... 直播中!!
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 1</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">前行天下</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    登顶“乞力马扎罗”·驰骋“东非大草原”——2015东非十八日记
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 125</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">sny528</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    半句韩语都不懂，轻松玩转济州岛——济州岛4天3晚私房自由行攻略（附最全的交通、景点信息和中韩文对照）
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 21</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">艾米儿er</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    文艺女独行澳洲14天深度游（内含悉尼、黄金海岸，布里斯班15个景点，8个餐厅、3个住宿、购物推荐）
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 58</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">Lisa_在路上</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【冰岛夜未眠】冰岛自驾环岛+格陵兰 ❤首楼五分钟冰岛大片❤
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 16</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">msyo</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【二访天竺】拨开眼中迷雾 细赏印度
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 25</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">fluffymm</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【已完结】【蔚蓝金黄，在水一方】贝加尔湖7日游--伊尔库茨克/环湖火车/奥尔洪岛
                </div>
            </a>
        </div>
    </div>
</li>
</ul>
</div>
<div class="item">
<ul>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 61</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">静byakuya</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    暴走东京十一日（箱根富士急乐园御殿场迪士尼筑地镰仓台场东京塔海贼王展）附多图大量实用攻略购物心得
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 69</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">艾米儿er</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    泰国处处美不胜收（曼谷+普吉岛+皇帝岛+清迈）9天自由行闺蜜之旅
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 33</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">宁静致远CC</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    陪你看尽落日黄昏---印尼9日行纪【含雅加达、日惹、巴厘岛攻略】
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 7</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">blazingcd</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    2015中秋国庆肯坦13天纯Safari行记，含旅行社推荐、塞伦盖蒂酒店分布及扒底裤报价超详尽攻略【精华，2万字+图】
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 12</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">浙江亮眼看世界</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    带着孩子看世界-斯里兰卡西南部经典路线十日游（全文完）
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 21</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">aero4400</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【AERO4400】野性冰岛的14天疯狂 47天自驾北欧之冰岛篇
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 32</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">只想着玩</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【仙本那】仙境，本该，那么远（邦邦岛OW考证+仙本那跳岛游）
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 7</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">mycinderella</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    漫游亚德里亚，慢走克罗地亚！
                </div>
            </a>
        </div>
    </div>
</li>
</ul>
</div>
<div class="item">
<ul>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 25</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">Sicoraffy</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    秋和朝日物语【高松-大阪-京都-宇治-奈良-下田-横滨-东京-镰仓-富士山中湖】（10.31更新）
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 63</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">Kent_JJJ</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    意大利世外桃源Santa Magdalenda（funes山谷）独家实用攻略+美图分享-2015.10
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 19</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">yuki_鑫</a>
                                                <span class="auth_avatar_q s">
                                                </span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    英国16天蜜月游（高地湖区自驾+KOP朝圣之旅）
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 22</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">人字拖1小白</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    醉心的画卷——由维也纳展开，到布拉格合上（人字拖小白奥捷自驾游，原创美图更新中)
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 8</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">veice</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    Journey to the Maroc - 从阿特拉斯到撒哈拉（摩洛哥16日）
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 4</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">jessie821010</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【去你的繁文缛节】J&amp;L希腊四岛旅行结婚记（更新至旅行结婚策划+希腊旅行攻略）
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 64</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">mariafe</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【开往布列瑟农的列车】混搭的秋日.意大利（罗马，托斯卡纳，多洛米蒂，加尔达湖，顶级庄园，Airbnb，米其林三星，自驾）
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 11</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">sirprise2004</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    "毛利人"在新西兰26天[更新到库克国家公园]
                </div>
            </a>
        </div>
    </div>
</li>
</ul>
</div>
<div class="item">
<ul>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 69</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">Caesar_Achilles</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    京都+大阪+奈良+富士河口湖+东京十三日之旅（超完整行程已完结），遇见最美的日本！
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 29</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">十面</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    绚烂西班牙——14天旅行美图与实用经验、拍摄心得分享（已完结）
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 7</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">洛小爬</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【已完结】梦圆腐国2015——两枚女球迷的12日朝圣之旅（曼彻斯特+爱丁堡+巴斯+伦敦+温莎+比斯特）
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 55</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">范世刚</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    留在纯净世界里的记忆——新西兰南北岛自驾游【附带手把手攻略，已到天堂谷，持续更新中】
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 2</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">秋刀鱼小白</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【鱼眼看欧洲】--一路向西去秋游--(卢塞恩/杜塞尔多夫/科隆/罗腾堡/柏林/布拉格/法兰克福)
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 21</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">池也错</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    带小两岁的宝宝游苏梅岛、涛岛、南园岛，一起感受生活安静向暖
                </div>
            </a>
        </div>
        <em class="tip">精华</em>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 2</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">大乔</a>
                                                <span class="auth_avatar_q s">
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    漂洋过海来看你
                </div>
            </a>
        </div>
    </div>
</li>
<li>
    <div class="travel">
        <div class="photo">
            <a href="#" target="_blank">
                <img class="lazy" src="images/grey.gif" width="275" height="185">
            </a>

            <div class="like"><i class="iconfont icon-xiangqu1"></i> 24</div>
        </div>
        <div class="inner">
            <div class="info">
                                            <span class="avatar">
                                                <a href="#" target="_blank">
                                                    <img class="lazy" src="images/grey.gif">
                                                </a>
                                            </span>
                                            <span class="txt">
                                                <a href="#" target="_blank">yihan1010</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
            </div>
            <a href="#" target="_blank">
                <div class="caption">
                    【安纳托利亚往事】
                </div>
            </a>
        </div>
    </div>
</li>
</ul>
</div>
</div>
<div class="slider-control">
    <a class="current" href="javascript:;"></a>
    <a href="javascript:;"></a>
    <a href="javascript:;"></a>
    <a href="javascript:;"></a>
    <a href="javascript:;"></a>
</div>
</div>
<div class="more">
    <a href="#" target="_blank">查看更多游记</a>
</div>
</div>
</div>
</div>

<!-- 应用 application -->
<div class="section">
    <div class="wrapper">
        <div class="application">
            <div class="apps">
                <h3 class="title">穷游APP</h3>
                <ul class="lists">
                    <li>
                        <a href="#" target="_blank">
                            <img src="images/app_qyer.png" width="80" height="80">
                        </a>
                        <span>穷游</span>
                    </li>
                    <li>
                        <a href="#" target="_blank">
                            <img src="images/app_plan.png" width="80" height="80">
                        </a>
                        <span>行程助手</span>
                    </li>
                    <li>
                        <a href="#" target="_blank">
                            <img src="images/app_z.png" width="80" height="80">
                        </a>
                        <span>穷游最世界</span>
                    </li>
                    <li style="display:none;">
                        <a href="#" target="_blank">
                            <img src="images/app_guide.png" width="80" height="80">
                        </a>
                        <span>穷游锦囊</span>
                    </li>
                </ul>
            </div>
            <div class="wechat">
                <h3 class="title">微信号</h3>
                <ul class="lists">
                    <li>
                        <img src="images/qrcode_qyer.png" width="80" height="80">
                        <span>穷游网</span>
                    </li>
                    <li>
                        <img src="images/qrcode_z.png" width="80" height="80">
                        <span>穷游最世界</span>
                    </li>
                    <li>
                        <img src="images/qrcode_guide.png" width="80" height="80">
                        <span>穷游锦囊</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- footer -->
<div class="footer">
    <div class="footer-line"></div>
    <div class="footer-wrap">
        <div class="footer-inner">
            <div class="footer-partner">
                <img src="images/partner.png" width="500" height="130">
                <a class="link-ali" href="#" target="_blank" rel="nofollow" title="阿里旅行·去啊">
                    <span>阿里旅行·去啊</span>
                </a>
                <a class="link-air" href="#" target="_blank" rel="nofollow" title="亚航">
                    <span>亚航</span>
                </a>
                <a class="link-booking" href="#" target="_blank" rel="nofollow" title="Booking">
                    <span>Booking</span>
                </a>
                <a class="link-up" href="#" target="_blank" rel="nofollow" title="境外使用银联卡">
                    <span>境外使用银联卡</span>
                </a>
                <a class="link-aig" href="#" target="_blank" rel="nofollow" title="境外旅游保险">
                    <span>境外旅游保险</span>
                </a>
            </div>
            <ul class="footer-about">
                <li>
                    <dl>
                        <dt>关于我们</dt>
                        <dd>
                            <a href="#" target="_blank" rel="nofollow">穷游简介</a>
                        </dd>
                        <dd>
                            <a href="#" target="_blank" rel="nofollow">联系我们</a>
                        </dd>
                        <dd>
                            <a href="#" target="_blank" rel="nofollow">合作伙伴</a>
                        </dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>加入穷游</dt>
                        <dd>
                            <a href="#" target="_blank" rel="nofollow">招聘职位</a>
                        </dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>网站条款</dt>
                        <dd>
                            <a href="#" target="_blank" rel="nofollow">会员条款</a>
                        </dd>
                        <dd>
                            <a href="#" target="_blank" rel="nofollow">社区指南</a>
                        </dd>
                        <dd>
                            <a href="#" target="_blank" rel="nofollow">版权声明</a>
                        </dd>
                        <dd>
                            <a href="#" target="_blank" rel="nofollow">免责声明</a>
                        </dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>帮助中心</dt>
                        <dd>
                            <a href="#" target="_blank" rel="nofollow">新手上路</a>
                        </dd>
                        <dd>
                            <a href="#" target="_blank" rel="nofollow">使用帮助</a>
                        </dd>
                        <dd>
                            <a href="#" target="_blank">网站地图</a>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>
    <div class="footer-wrap-black">
        <div class="footer-inner2">
            <div class="footer-copyright">
                <a href="#" rel="nofollow">
                    <img src="images/logo_gray.png" width="77" height="36" alt="穷游网">
                </a>

                <p>2004-2015 © 穷游网™ qyer.com All rights reserved. Version v5.57&nbsp;&nbsp;<a href="#" target="_blank"
                                                                                              rel="nofollow">京ICP备12003524号</a>&nbsp;&nbsp;京公网安备11010502023470&nbsp;&nbsp;京ICP证140673号
                </p>

                <p>
                    <a href="#">穷游网</a>为<a href="#">旅行</a>者提供原创实用的<a href="#">出境游</a><a href="#">旅行指南</a>和<a href="#">旅游攻略</a>、<a
                        href="#">旅行社区</a>和<a href="#">问答</a>交流平台，并提供<a href="#">签证</a>、<a href="#">保险</a>、<a
                        href="#">机票</a>、<a href="#">酒店预订</a>、<a href="#">租车</a>等服务。
                </p>
            </div>
            <div class="footer-links">
                <span>友情链接</span>

                <p>
                    <a href="#" target="_blank">国际租车</a> |
                    <a href="#" target="_blank">携程攻略社区</a> |
                    <a href="#" target="_blank">蜂鸟网</a> |
                    <a href="#" target="_blank">大鱼自助游</a> |
                    <a href="#" target="_blank">天巡国际机票</a> |
                    <a href="#" target="_blank">游谱旅行网 </a> |
                    <a href="#" target="_blank">中国签证资讯网</a> |
                    <a href="#" target="_blank">梦之旅</a> |
                    <a href="#" target="_blank">微驴儿自由行</a> |
                    <a href="#" target="_blank">九游网</a> |
                    <a href="#" target="_blank">北京国旅官网</a> |
                    <a href="#" target="_blank">同程旅游</a> |
                    <a href="#" target="_blank">机票</a> |
                    <a href="#" target="_blank">腾邦国际</a> |
                    <a href="#" target="_blank">相约久久旅游网</a> |
                    <a href="#" target="_blank">途牛旅游网</a> |
                    <a href="#" target="_blank">日租房</a> |
                    <a href="#" target="_blank">遨游网</a> |
                    <a href="#" target="_blank">携程旅游网</a> |
                    <a href="#" target="_blank">春秋航空</a> |
                    <a href="#" target="_blank">搜狗壁纸</a> |
                    <a href="#" target="_blank">户外资料网</a> |
                    <a href="#" target="_blank">爱旅行网</a> |
                    <a href="#" target="_blank">途风网</a> |
                    <a href="#" target="_blank">神舟国旅</a> |
                    <a href="#" target="_blank">拉拉勾旅游网</a> |
                    <a href="#" target="_blank">火车票</a> |
                    <a href="#" target="_blank">劲旅网</a> |
                    <a href="#" target="_blank">凤凰网旅游</a> |
                    <a href="#" target="_blank">悠哉旅游网</a> |
                    <a href="#" target="_blank">米胖旅游网</a> |
                    <a href="#" target="_blank">百程旅行网</a> |
                    <a href="#" target="_blank">五分旅游网</a> |
                    <a href="#" target="_blank">绿野网</a> |
                    <a href="#" target="_blank">天气预报15天查询</a> |
                    <a href="#" target="_blank">走遍欧洲</a> |
                    <a href="#" target="_blank">酒店预订</a> |
                    <a href="#" target="_blank">欣欣旅游网</a> |
                    <a href="#" target="_blank">驴妈妈旅游网</a> |
                    <a href="#" target="_blank">多多驿站</a> |
                    <a href="#" target="_blank">艺龙旅游指南</a>
                </p>
            </div>
        </div>
    </div>
</div>

<script src="js/base.js"></script>


<script src="js/home.js"></script>
<script>
    var _gaq = _gaq || [];

    _gaq.push(['_setAccount', 'UA-185023-1']);
    _gaq.push(['_setDomainName', 'qyer.com']);
    _gaq.push(['_setSiteSpeedSampleRate', 10]);
    _gaq.push(['_addIgnoredRef', 'qyer.com']);
    _gaq.push(['_addOrganic', 'soso', 'w']);
    _gaq.push(['_addOrganic', 'sogou', 'query']);
    _gaq.push(['_addOrganic', 'baidu', 'word']);
    _gaq.push(['_addOrganic', 'baidu', 'q1']);
    _gaq.push(['_addOrganic', 'baidu', 'q2']);
    _gaq.push(['_addOrganic', 'm.baidu', 'word']);
    _gaq.push(['_addOrganic', 'so.360', 'q']);
    _gaq.push(['_addOrganic', 'so', 'q']);
    _gaq.push(['_addOrganic', 'baidu', 'w']);
    _gaq.push(['_addOrganic', 'cn.bing', 'q']);
    _gaq.push(['_addOrganic', 'sm', 'q']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;

        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        if ('https:' == document.location.protocol) {
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        } else {
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        }
    })();
</script>
</body>
</html>