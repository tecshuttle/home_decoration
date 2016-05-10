<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>朝圣</title>
    <base href="http://www.tgsports.cn">
    <link rel="shortcut icon" href="/images/favicon.png">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <!-- style base -->
    <link rel="stylesheet" href="css/base.css">
    <!-- style font awesome -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/moule.css">
    <!-- style layout -->
    <link rel="stylesheet" href="css/home.css">
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <!--[if IE 6]>
    <script src="js/DD_belatedPNG_0.0.8a-min.js"></script>
    <script>

        /* EXAMPLE */
        DD_belatedPNG.fix('.png_bg');

        /* 将 .png_bg 改成你应用了透明PNG的CSS选择器 */
    </script>
    <![endif]-->
</head>
<body>
<!-- inner header start -->
<div class="q-layer-header">
    <?php $this->load->view('mini_header') ?>
</div>
<!-- inner header end -->
<!-- content start -->
<div class="content">
    <!-- filter -->
    <div class="filter_options">
        <dl class="clearfix options_item" style="display:none;">
            <dt>相 关 主 题：</dt>
            <dd class="options">
                <a href="javascript:void(0)" class="option alls hover" value='all'>全部</a>
                <a href="javascript:void(0)" class="option" value=''><span>NBA</span></a>
                <a href="javascript:void(0)" class="option" value=''><span>马拉松</span></a>
                <a href="javascript:void(0)" class="option" value=''><span>体育冬夏令营</span></a>
                <a href="javascript:void(0)" class="option" value=''><span>橄榄球</span></a>
                <a href="javascript:void(0)" class="option" value=''><span>玩转足球一日游</span></a>
                <a href="javascript:void(0)" class="option" value=''><span>五大联赛</span></a>
            </dd>
        </dl>

        <dl class="clearfix options_location">
            <dt>相 关 主 题：</dt>
            <dd class="options">
                <a href="/equipments" class="option alls <?= ($tag_id == 0 ? 'hover' : '') ?>" value='all'>全部</a>
                <?php foreach ($tags as $t): ?>
                    <a href="/equipments/<?= $t->id ?>" class="option alls <?= ($tag_id == $t->id ? 'hover' : '') ?>"
                       value='all'><?= $t->name ?></a>
                <?php endforeach; ?>
            </dd>
            <!-- <dd class="more"><a href="javascript:void(0)">多选</a></dd> -->
            <div class="clearfix"></div>
        </dl>
    </div>
    <!-- select result -->
    <div class="selectResult">
        <div class="count" id="temp">选择结果：共<span><?= $matchs['total'] ?></span>条</div>
        <ul class="resultList" id="htmlcontent">
            <?php foreach ($matchs['data'] as $m): ?>
                <li class="clearfix">
                    <a href="/match/<?= $m->id ?>" class="l" target="_blank">
                        <img src="<?= $m->cover ?>">
                    </a>

                    <div class="details">
                        <h1><a href="/match/<?= $m->id ?>" target="_blank"><?= $m->name ?></a></h1>
                        行程天数：<?= $m->travel_long ?><br>
                        出发日期：<?= $m->travel_begin ?><br>
                        行程概览：<?= $m->brief ?><br>

                        <div class="firTitle clearfix"></div>
                    </div>
                    <div class="rs">
                        <span class="money">低至 <span>¥<?= $m->price ?></span></span>
                        <a href="/match/<?= $m->id ?>" title="详情" target="_blank">详情</a>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
    <!-- page -->
    <?= $pager ?>
</div>
<!-- content end -->

<?php $this->load->view('mini_footer') ?>
</body>
</html>