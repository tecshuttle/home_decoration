<meta charset="utf-8">
<title><?= $article->name ?></title>
<base href="http://www.tgsports.cn">
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
<div class="content clearfix">
    <!--搜索-->
    <div class="m_seach">

        当前位置：<a href="/">首页</a> &gt; 帮助中心

    </div>
    <!--搜索end-->
    <!-- about us start -->
    <div class="help_page">
        <div class="help_left">
            <ul>
                <?php foreach ($side_menu as $m): ?>
                    <li <?= ($m->id == $article->id ? 'class="active"' : '') ?>>
                        <a href="/doc/<?= $m->code ?>"><?= $m->name ?></a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
        <div class="help_rig">
            <div class="show_con">
                <?= $article->content ?>
            </div>
        </div>
    </div>
    <!-- about us end -->
</div>
<!-- content end -->

<?php $this->load->view('mini_footer') ?>

</body>
</html>