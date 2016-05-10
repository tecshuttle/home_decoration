<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=9"/>
    <meta http-equiv=Content-Type content="text/html;charset=utf-8">
    <title><?= $msg ?></title>
    <base href="<?= $base_url ?>">

    <?php foreach ($css as $cssFile): ?>
        <link rel="stylesheet" type="text/css" href="<?= $cssFile ?>"/>
    <?php endforeach; ?>

    <script type="text/javascript">
        var uploadUserName = "ijobsadmin";
        var department = "部门";
        var isAdmin = true;
        var isAllApp = true;
        //var roleInfo = {'roleName':'超级管理员', 'appsName':''};
        var userRole = [];//用户所属业务
        var isGeneralVersion = false;
        var basePath = 'http://127.0.0.1:8080/tms2web/';
        var url = window.encodeURIComponent(basePath);
    </script>

</head>

<body id="ijobs-main">

<!--顶部开始-->
<div id="header" class="top">
    <!--  <div class="logo f_l"></div>  左侧logo -->
    <div class="f_l"></div>

    <ul id="topmenu" class="nav-wrap f_l"></ul>
    <!-- 中部菜单 -->

    <!-- 右侧信息栏 -->
    <div class="user-wrap f_r">
        <div class="user-options-wrap">
            <ul>
                <li><b class="user-role" id="lblAppNames">Good luck：<?= $user ?></b></li>
                <li><s class="sepe-hr"></s></li>
                <li><a target='_self' href="/admin/logout" id="lnkLogout" class="layout" title="退出"></a></li>
            </ul>
        </div>
    </div>
    <!-- 右侧信息栏 end -->
</div>
<!--顶部结束-->