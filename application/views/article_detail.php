<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title><?= $article->name ?></title>
    <base href="http://www.tgsports.cn">
    <link rel="shortcut icon" href="/images/favicon.png">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <!-- style base -->
    <link rel="stylesheet" href="css/base.css">
    <!-- style font awesome -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/moule.css">
    <!-- style bxslider -->
    <link rel="stylesheet" type="text/css" href="css/jquery.bxslider.css">
    <!-- style layout -->
    <link rel="stylesheet" href="css/home.css">
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <link rel="stylesheet" type="text/css" href="/css/article_detail.css">
    <!--[if IE 6]>
    <script src="js/DD_belatedPNG_0.0.8a-min.js"></script>
    <script>

        /* EXAMPLE */
        DD_belatedPNG.fix('.png_bg');

        /* 将 .png_bg 改成你应用了透明PNG的CSS选择器 */
    </script>
    <![endif]-->

    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body style="background:#fff;">


<!-- inner header start -->
<div class="q-layer-header">
    <?php $this->load->view('mini_header') ?>
</div>
<!-- inner header end -->


<!-- content start -->
<div class="content">
    <!--搜索-->
    <div class="m_seach">

        当前位置：<a href="/">首页</a> &gt; <a href="/cat/<?= $article->type_id ?>"><?= $cat->name ?></a>
        &gt; <?= $article->name ?>

    </div>
    <!--搜索end-->

    <!--内容-->
    <div class="m_cont">

        <!--left-->
        <div class="mc_left">
            <div class="mc_content">
                <div class="mc_ctitle">
                    <span class="mcc_a1"><?= $article->name ?></span>

                    <div class="mcc_a2 jiathis_style">
                        <span class="mcc_a3">来源:铁杆社区 | <?= date('Y-m-d', $article->ctime) ?></span>
                    </div>
                </div>
                <div class="mcc_a5">
                    <?= $article->content; ?>
                </div>
                <div class="mcc_fenx"></div>
            </div>
        </div>
        <!--leftend-->

        <!--right-->
        <div class="mc_right">
            <!--专题-->
            <div class="mcr_zt" style="display:none;">
                <div class="mcr_ztop">热门专题</div>
                <div class="mcr_ztbot">
                    <dl>
                        <dt><img src="images/20151210132257.jpg" title="去澳大利亚看网球，为澳网加油！" alt="去澳大利亚看网球，为澳网加油！"
                                 width="76" height="66"/></dt>
                        <dd>
                            <strong><a href="#" target="_blank">去澳大利亚看网球，为澳网加油！</a></strong>
                            2015年11月21日20:00，中国广州，亚冠赛场，恒大1…
                            <a href="#" target="_blank" class="mcr_a1">[ 查看详细 ]</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt><img src="images/20151130142228.jpg" title="[亚洲] 顺着湄公河的行走——绝美原始老挝"
                                 alt="[亚洲] 顺着湄公河的行走——绝美原始老挝" width="76" height="66"/></dt>
                        <dd>
                            <strong><a href="#" target="_blank">[亚洲] 顺着湄公河的行走——绝美原始老挝</a></strong>
                            多年前在电视里看到那边的一些女人都不穿衣服，小时候以为那边热…
                            <a href="#" target="_blank" class="mcr_a1">[ 查看详细 ]</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt><img src="images/20151130135530.jpg" title="[欧洲] 阿姆斯特丹的疯狂之旅------四个人的毕业旅行"
                                 alt="[欧洲] 阿姆斯特丹的疯狂之旅------四个人的毕业旅行" width="76"
                                 height="66"/></dt>
                        <dd>
                            <strong><a href="#" target="_blank">[欧洲] 阿姆斯特丹的疯狂之旅------四个人的毕业旅行</a></strong>本人，女，典型双鱼座90后，大学毕业后来英读书，今年刚好毕业…
                            <a href="#" target="_blank" class="mcr_a1">[ 查看详细 ]</a>
                        </dd>
                    </dl>
                </div>
            </div>
            <!--专题end-->

            <div class="mc_banner" style="display:none;">
                <a href='' style="width:100%; margin-bottom:10px;" class="fl clearfix">
                    <img src="images/qrcode_qyer.png" alt="" width="200" height="200"/>
                </a>
            </div>

            <!--热文排行-->
            <div class="mcr_hot">
                <div class="mcr_ztop">热文排行</div>
                <div class="mcr_hotbot">
                    <ul>
                        <?php foreach ($hot_articles as $a): ?>
                            <li><a class="mcr_a1" href="/pages/<?= $a->id ?>" target="_blank"><?= $a->name ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
            <!--热文排行end-->

            <!--产品排行-->
            <div class="mcr_hot">

            </div>
            <!--产品排行end-->

        </div>
        <!--rightend-->

        <div class="show_sidle">
            <?php $this->load->view('product_hot_list', $products) ?>
        </div>

    </div>
    <!--内容end-->
</div>
<!-- content end -->

<?php $this->load->view('mini_footer') ?>
</body>
</html>