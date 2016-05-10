<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>铁杆体育</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <link rel="shortcut icon" href="/images/favicon.png">
    <!-- style base -->
    <link rel="stylesheet" href="css/base.css">
    <!-- style fontawesome -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <!-- style bxslider -->
    <link rel="stylesheet" type="text/css" href="css/jquery.bxslider.css">
    <!-- style home -->
    <link rel="stylesheet" href="css/home.css">
    <!-- style layout -->
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="/css/kendo.common-material.min.css">
    <link rel="stylesheet" href="/css/kendo.material.min.css">

    <script type="text/javascript" src="js/jquery-1.9.1.js"></script>
    <!-- jquery bxslider js -->
    <script type="text/javascript" src="js/jquery.bxslider.min.js"></script>
    <script type="text/javascript" src="/js/kendo.all.min.js"></script>

    <script>
        $(function () {
            var slider = $('.bxslider');

            slider.bxSlider({
                auto: true,
                controls: false,
                pause: 6000,
                mode: 'fade',
                pager: true,
                onSlideAfter: function () {
                    slider.startAuto();
                }
            });

            var aLink = $('.window dt');
            aLink.each(function () {
                var _this = $(this);
                _this.hover(function () {
                    _this.next().show();
                }, function () {
                    _this.next().hide();
                });
            });
		    // code
			$('.win-item-weixin').on('click', function () {
				$('.mask, .popup').show();
			});
			$('.mask').on('click', function () {
				$('.mask, .popup').hide();
			});

            $("#search_home").kendoAutoComplete({
                dataTextField: "name",
                filter: "contains",
                //minLength: 3,
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: "/equipments/search_home",
                            type: "POST",
                            dataType: "json"
                        }
                    },
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: {type: "id"},
                                name: {type: "string"}
                            }
                        }
                    }
                },
                select: function (e) {
                    var item = e.item;
                    var text = item.text();
                    // Use the selected item or its text
                    var dataItem = this.dataItem(e.item.index());
                    window.location.href = '/match/' + dataItem.id;
                }
            });
        })
    </script>
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

<!-- 广告结束 -->

<!-- header -->
<div class="header">
    <div class="header-inner">
        <a href="#"><img src="images/logo_2.png" alt="" class="logo" width="226" height="60"></a>

        <div class="nav">
            <ul class="nav-ul">
                <li class="nav-list"><a class="nav-span" href="#" title="首页">首页</a></li>
                <li class="nav-list"><a class="nav-span" href="/equipments" title="朝圣">朝圣</a></li>
                <li class="nav-list"><a class="nav-span" href="/cat/225" title="荣归">荣归</a></li>
                <li class="nav-list"><a class="nav-span" href="/cat/223" title="旅行那些事儿">旅行那些事儿</a></li>
                <li class="nav-list"><a class="nav-span" href="/cat/227" title="天下足球">天下足球</a></li>
                <li class="nav-list"><a class="nav-span" href="/doc/about" title="我是铁杆">我是铁杆</a></li>
            </ul>
        </div>
        <div class="service-phone"><i class="ico-phone"></i>400-188-6468</div>
        <!-- <div class="fun">
            <div id="userStatus" class="status" style="display: none;">
                <div class="login">
                    <a href="#">注册</a> |
                    <a href="#">登录</a>
                </div>
            </div>
            <div class="service-phone h-service-phone">
                <i class="ico-phone"></i><span style="font-size: 26px;">400-188-6468</span>
            </div>
            <div class="qrcode" style="display: none;">
                <img src="images/qrcode_qyer.png" width="80" height="80" alt=""/>
            </div>
        </div> -->
    </div>
</div>
<!-- banner -->
<div id="qyer_banner" class="banner">
    <ul class="bxslider">
        <?php foreach ($scroll_img as $sc): ?>
            <li>
                <a href="<?= $sc->url ?>" target="_blank"><img src="<?= $sc->img ?>" width="100%" alt=""/></a>
            </li>
        <?php endforeach; ?>
    </ul>

    <!-- <div id="bannerbg" class="blur">
        <img src="">
    </div> -->
    <div id="search" class="search active-place">
        <div class="tab">
            <h3>朝圣,梦想!</h3>
            <!-- <a class="tab-place" href="javascript:;">球队</a>
            <a class="tab-plan" href="javascript:;">联赛</a>
            <a class="tab-z" href="javascript:;">时间</a> -->
        </div>
        <div class="panel">
            <!-- <em class="arrow"></em> -->

            <div class="panel-inner">
                <div class="panel-cont">
                    <div class="place place_search_box">
                        <div class="input-control">
                            <form class="place_search_form" target="_blank" action="" method="post">
                                <input class="txt placesearch_txt" type="text" placeholder="搜索球队、联赛、时间"
                                       autofocus=""
                                       autocomplete="off" id="search_home">
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
    </div>
</div>
<!-- content -->
<!-- 朝圣 product -->
<div class="section">
    <div class="wrapper">
        <h2 class="title">
            朝圣<a href="/equipments" class="h-view-more c-view-more-1">查看更多俱乐部&gt;&gt;</a>
            <span>你需要的只是去实现朝圣梦想的那一点点勇气，省时、省钱、省心、这点破事丢给铁杆就O了</span>
        </h2>

        <div id="interest" class="interest">
            <div class="interest_inner">
                <ul style="display:block;">
                    <?php foreach ($products as $key => $article): ?>
                        <li>
                            <div class="item">
                                <div class="img">
                                    <a href="/match/<?= $article->id ?>" target="_blank">
                                        <img class="lazy" src="<?= $article->cover ?>" width="370" height="220">

                                        <div class="bg" style="display:none;">
                                            <div class="p"></div>
                                        </div>

                                        <div class="tag">
                                            <span style="display: none;">
                                                <?php if (empty($article->logo)) : ?>
                                                    <i class="iconfont icon-chengshi"></i>
                                                <?php else: ?>
                                                    <img src="<?= $article->logo ?>"/>
                                                <?php endif; ?>
                                            </span>

                                            <span class=""><?= (empty($article->team) ? '球队' : $article->team) ?></span>
                                        </div>
                                    </a>
                                </div>

                                <div class="info">
                                    <a href="/match/<?= $article->id ?>" target="_blank">
                                        <div class="subtitle">
                                            <p class="ellipsis"><?= $article->name ?></p>
                                        </div>
                                        <div class="pro-desc">
                                            <p class="ellipsis">行程天数：<?= $article->travel_long ?></p>

                                            <p class="ellipsis">出发日期：<?= $article->travel_begin ?></p>

                                            <p class="ellipsis">行程概览：<?= $article->brief ?></p>
                                        </div>
                                        <div class="bottom">
                                            <!-- <span class="fr" style="display:none;">10703个人去过这里</span> -->
                                            <span class="f14 fr price">低至 <b>¥<?= $article->price ?></b></span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>
                    <?php endforeach; ?>


                </ul>
            </div>
        </div>
    </div>
</div>
<!-- 荣归 travel notes -->
<div class="section section-green">
    <div class="wrapper">
        <h2 class="title">荣归<a href="/cat/225" class="h-view-more c-view-more-2">查看更多&gt;&gt;</a>
            <span>精选先行者的朝圣体验与感悟</span>
        </h2>

        <div class="hottravels">
            <div class="slider slider-hottravels">
                <div class="slider-inner">
                    <div class="item">
                        <ul>
                            <?php foreach ($go_home as $key => $a): ?>
                                <li>
                                    <div class="travel">
                                        <div class="photo">
                                            <a href="/pages/<?= $a->id ?>" target="_blank">
                                                <img class="lazy" src="<?= $a->cover ?>" width="275" height="185">
                                            </a>

                                            <div class="like"><i class="iconfont icon-xiangqu1"
                                                                 style="display: none;"></i> <?= $a->pv ?></div>
                                        </div>
                                        <div class="inner">
                                            <!-- <div class="info">
                                            <span class="avatar" style="visibility: hidden;">
                                                <a href="/pages/<?= $a->id ?>" target="_blank">
                                                    <img class="lazy" src="images/17_avatar_big.jpg">
                                                </a>
                                            </span>
                                            <span class="txt" style="display:none;">
                                                <a href="/pages/<?= $a->id ?>" target="_blank">SJ</a>
                                                <span class="auth_avatar_q s">
													<i class="icon member"></i>
												</span>
                                            </span>
                                            </div> -->
                                            <a href="/pages/<?= $a->id ?>" target="_blank">
                                                <div class="caption" style="padding-top: 0px;">
                                                    <?= $a->name ?>
                                                </div>
                                            </a>
                                        </div>
                                        <?php if (!empty($a->tag)): ?>
                                            <em class="tip"><?= $a->tag ?></em>
                                        <?php endif; ?>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- <div class="more">
                <a href="#" target="_blank">查看更多</a>
            </div> -->
        </div>
    </div>
</div>

<div class="section section-gray">
    <div class="wrapper clearfix">
        <div class="items-wrap">
            <!-- 旅行那些事儿 strategy -->
            <div class="strategy items">
                <div class="items-title clearfix">
                    <span>旅行那些事儿</span>
                    <a href="/cat/<?= $nav_menu[1]->id ?>" class="view-more" target="_blank">更多&gt;&gt;</a>
                </div>
                <div class="items-list">
                    <ul>
                        <?php foreach ($nav_menu[1]->articles as $key => $a): ?>
                            <li><em><?= ($key + 1) ?>.</em>
                                <a href="/pages/<?= $a->id ?>" target="_blank"><?= $a->name ?></a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
            <!-- 天下足球 news -->
            <div class="strategy items">
                <div class="items-title clearfix">
                    <span>天下足球</span>
                    <a href="/cat/<?= $nav_menu[2]->id ?>" class="view-more" target="_blank">更多&gt;&gt;</a>
                </div>
                <div class="items-list">
                    <ul>
                        <?php foreach ($nav_menu[2]->articles as $key => $a): ?>
                            <li><em><?= ($key + 1) ?>.</em>
                                <a href="/pages/<?= $a->id ?>" target="_blank"><?= $a->name ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<?php $this->load->view('mini_footer') ?>

</body>
</html>