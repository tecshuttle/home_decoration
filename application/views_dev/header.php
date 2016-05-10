<!DOCTYPE html>
<html <?= (isset($appName) ? "ng-app='$appName'" : '') ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title ng-bind="title"><?= isset($title) ? $title : '铁杆欢迎您！' ?></title>

    <?php
    //设置默认值
    $css_js_version = $this->config->config['css_js_version'];;
    $css = (isset($css) ? $css : array());
    ?>

    <link rel="stylesheet" type="text/css" href="/css/bootstrap-3.3.4/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/common.css"/>

    <?php foreach ($css as $cssFile): ?>
        <link rel="stylesheet" type="text/css" href="<?= $cssFile ?>?version=<?= $css_js_version ?>"/>
    <?php endforeach; ?>

</head>

<body>

<div class="container-fluid">
    <div class="row header" style="padding-top: 1em;border-bottom: 2px solid gray;">
        <div class="col-xs-2">
            <a href="/">
                <p class="img-thumbnail" style="width:200px; text-align: center;padding: 10px;">tiegan logo</p>
            </a>
        </div>

        <div class="col-xs-8" style="text-align: center;padding-top: 10px;">
            <span class="header-menu <?= ($menu == 'product' ? 'nav-list-selected' : '') ?>"><a class="nav-span" href="/equipments" title="朝圣">朝圣</a></span>
            <span class="header-menu <?= ($menu == 'back' ? 'nav-list-selected' : '') ?>"><a class="nav-span" href="/cat/225" title="荣归">荣归</a></span>
            <span class="header-menu <?= ($menu == 'travel' ? 'nav-list-selected' : '') ?>"><a class="nav-span" href="/cat/223" title="旅行那些事">旅行那些事</a></span>
            <span class="header-menu <?= ($menu == 'news' ? 'nav-list-selected' : '') ?>"><a class="nav-span" href="/cat/227" title="天下足球">天下足球</a></span>
            <span class="header-menu <?= ($menu == 'fan' ? 'nav-list-selected' : '') ?>"><a class="nav-span" href="/cat/233" title="我是铁杆">我是铁杆</a></span>
        </div>

        <div class="col-xs-2">
            <p style="text-align: center;padding: 10px;">
                <?php if ($this->user) : ?>
                    <a href="/user"><?= $this->user['name'] ?></a>
                    <span style="display: inline-block;width:1em;"></span>
                    <a href="/user/logout">退出</a>
                <?php else: ?>
                    <a href="/user/login">登入</a>
                    <span style="display: inline-block;width:1em;"></span>
                    <a href="/user/register">注册</a>
                <?php endif; ?>
            </p>
        </div>
    </div>
</div>

