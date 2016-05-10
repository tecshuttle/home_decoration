<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
		<meta http-equiv="X-UA-Compatible" content="IE=9" />
        <title>iJobs - Only time will tell</title>
        <base href="/">
        <!-- <link rel="stylesheet" type="text/css" href="./js/extjs4/resources/css/ext-all-notheme.css" /> -->
        <link rel="stylesheet" type="text/css" title="blue"      href="./js/extjs4/resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="./themes/ijobs-v3/css/index.css" />
        <link rel="stylesheet" type="text/css" href="./themes/ijobs-v3/css/ijobs.css" />

        <script type="text/javascript">
            var uploadUserName = "ijobsadmin";
            var department = "部门";
            var isAdmin = true;
            var isAllApp = true;
            var roleInfo = {'roleName':'超级管理员', 'appsName':''};
            var userRole = [];//用户所属业务
            var isGeneralVersion = false;
            var basePath = 'http://127.0.0.1:8080/tms2web/';
            var url = window.encodeURIComponent(basePath);
        </script>
    </head>

    <body id="ijobs-main">
        <!--顶部开始-->
        <div id="header" class="top">

            <div class="logo f_l"></div> <!-- 左侧logo -->

            <ul id="topmenu" class="nav-wrap f_l"></ul> <!-- 中部菜单 -->

            <!-- 右侧信息栏 -->
            <div class="user-wrap f_r">
		        <p class="welcome-tips" title="ijobsadmin">Good luck， ijobsadmin</p>
		        <div class="user-options-wrap">
		            <ul>
		                <li><b class="user-role" id="lblAppNames">您当前的角色为：&nbsp;&nbsp;</b></li>
		                <li><s class="sepe-hr"></s></li>
		                <li><a target='_self' href="javascript:void(0)" id="lnkLogout" class="layout" title="退出"></a></li>

		            </ul>
		        </div>
		    </div>
		    <!-- 右侧信息栏 end -->
        </div>
        <!--顶部结束-->
        
       	<script type="text/javascript" src="./js/extjs4/bootstrap.js"></script>
        <script type="text/javascript" src="./js/extjs4/locale/ext-lang-zh_CN.js"></script>
        <script type="text/javascript" src="./js/main/config.js?ver=B3R01_0907_1"></script>
        <script type="text/javascript" src="./js/main/config_user.js?ver=B3R01_0907_1"></script>
        <script type="text/javascript" src="./js/main/config_general.js?ver=B3R01_0907_1"></script>
        <script type="text/javascript" src="./js/main/config_user_general.js?ver=B3R01_0907_1"></script>
        <script type="text/javascript" src="./js/extjs4/ux/TabCloseMenu.js?ver=B3R01_0907_1"></script>
        	
        <script type="text/javascript" src="./js/common/utils.js?ver=B3R01_0907_1"></script>
       	<script type="text/javascript" src="./js/main/main.js?ver=B3R01_0907_1"></script>
    </body>
</html>