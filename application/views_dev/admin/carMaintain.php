<!DOCTYPE html>
<html lang="zh-CN">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta http-equiv="Cache-Control" content="no-siteapp">
		<meta name="renderer" content="webkit">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-touch-fullscreen" content="yes">
		<meta name="format-detection" content="telephone=no">
		<title>车辆维护</title>

		<!--▼Bootstrap core CSS▼-->
		<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css" media="screen">
		<link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.2.0/css/font-awesome.min.css" media="screen">

		<!--mobiscroll Style-->
		<!--官方文档： http://demo.mobiscroll.com/calendar/ -->
		<link rel="stylesheet" href="assets/addons/plugin_Mobiscroll/css/mobiscroll.icons.css" media="screen">
		<link rel="stylesheet" href="assets/addons/plugin_Mobiscroll/css/mobiscroll.widget.css" media="screen">
		<link rel="stylesheet" href="assets/addons/plugin_Mobiscroll/css/mobiscroll.scroller.css" media="screen">
		<link rel="stylesheet" href="assets/addons/plugin_Mobiscroll/css/mobiscroll.animation.css" media="screen">
		<!--/.mobiscroll end-->


		<link rel="stylesheet" href="assets/css/layout.css" media="screen">
		<link rel="stylesheet" href="assets/css/components.css" media="screen">
		<link rel="stylesheet" href="assets/css/modules.css" media="screen">
		<link rel="stylesheet" href="assets/css/plugin.css" media="screen">

		<!--
		<link rel="stylesheet" href="assets/css/layout.min.css" media="screen">
		<link rel="stylesheet" href="assets/css/components.min.css" media="screen">
		<link rel="stylesheet" href="assets/css/modules.min.css" media="screen">
		<link rel="stylesheet" href="assets/css/plugin.min.css" media="screen">
		-->

	</head>

	<body class="body-common body-repair">
		<a href="#content" class="sr-only">Skip to main content</a>

		<!-----site-header-------------->
		<header id="header">
			<div class="container-fluid">
				<a class="go-back clearfix" href="#">
					<i class="fa fa-angle-left"></i>
					<span>返回</span>
				</a>
				<h5 class="text-center">车辆维护</h5>
			</div>
		</header>
		<!---./site-header End --------->

		<!-----Page-main ------------>
		<main class="container-fluid" id="main" role="main">
			<div class="row">
				<div class="col-xs-12">

					<div class="md-repair">

						<form role="form">

							<div class="repair-list clearfix">

								<div class="form-group col-xs-6">
									<label for="input1">车牌号：</label>
									<input type="text" class="form-control" id="input1">
								</div>

								<div class="form-group col-xs-6">
									<label for="input2">保养前里程：</label>
									<input type="text" class="form-control" id="input2">
								</div>

								<div class="form-group col-xs-6">
									<label for="input3">保养人：</label>
									<input type="text" class="form-control" id="input3">
								</div>

								<div class="form-group col-xs-6">
									<label for="input4">当前里程：</label>
									<input type="text" class="form-control" id="input4">
								</div>

								<div class="form-group col-xs-6">
									<label for="input5">保养编号：</label>
									<input type="text" class="form-control" id="input5">
								</div>

								<div class="form-group col-xs-6">
									<label for="input6">完成时间：</label>
									<input type="text" class="form-control date" id="input6">
								</div>

							</div>

							<h4>请您选择车辆保养项目：</h4>

							<ul class="list-unstyled clearfix">

								<li class="col-xs-6">
									<div class="radio">
										<span>加油</span>
									</div>

								</li>

								<li class="col-xs-6">
									<div class="radio">
										<span>清洁</span>
									</div>
								</li>

								<li class="col-xs-6">
									<div class="radio">
										<span>维修</span>
									</div>

								</li>

								<li class="col-xs-6">
									<div class="radio">
										<span>换件</span>
									</div>
								</li>

								<li class="col-xs-6">
									<div class="radio">
										<span>驾驶培训</span>
									</div>

								</li>

								<li class="col-xs-6">
									<div class="radio">
										<span>挪位</span>
									</div>
								</li>

								<li class="col-xs-6">
									<div class="radio">
										<span>其他项目</span>
									</div>
								</li>
							</ul>

							<div class="form-group textarea">
								<textarea class="form-control" rows="3" placeholder="您可对本次车辆维护详细说明。"></textarea>
							</div>

							<div class="important">
								<div class="form-group clearfix">
									<label for="input7" class="col-sm-4 control-label">下次保养里程：</label>
									<div class="col-sm-8">
										<input type="text" class="form-control" id="input7">
									</div>
								</div>

								<div class="form-group clearfix">
									<label for="input8" class="col-sm-4 control-label">下次4S店保养日期：</label>
									<div class="col-sm-8">
										<input type="text" class="form-control date" id="input8">
									</div>
								</div>
							</div>

							<button type="submit" class="btn btn-light btn-green btn-block">
								开始保养
							</button>

						</form>

					</div>
				</div>
			</div>
		</main>
		<!---./Page-main end --------->

		<!--jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
		<script src="http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
		<!--./ Bootstrap's JavaScript plugins  end -->

		<!--IE10 viewport hack for Surface/desktop Windows 8 bug -->
		<script src="assets/js/ie10-viewport-bug-workaround.js"></script>

		<!--mobiscroll-->
		<!--官方文档： http://demo.mobiscroll.com/calendar/ -->
		<script src="assets/addons/plugin_Mobiscroll/js/mobiscroll.core.js"></script>
		<script src="assets/addons/plugin_Mobiscroll/js/mobiscroll.util.datetime.js"></script>
		<script src="assets/addons/plugin_Mobiscroll/js/mobiscroll.widget.js"></script>
		<script src="assets/addons/plugin_Mobiscroll/js/mobiscroll.scroller.js"></script>
		<script src="assets/addons/plugin_Mobiscroll/js/mobiscroll.datetime.js"></script>
		<script src="assets/addons/plugin_Mobiscroll/js/mobiscroll.select.js"></script>
		<script src="assets/addons/plugin_Mobiscroll/js/i18n/mobiscroll.i18n.zh.js"></script>

		<script>
			$(function() {
				//datetime
				var now = new Date();
				$('.date').mobiscroll().date({
					minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
					lang: 'zh',
					display: 'bottom',
					mode: 'scroller',
					dateOrder: 'YYMMddDD',
					dateFormat: 'yy年mm月dd日',
				});
			});
		</script>

		<!--jquery向订单号列表添加类  — "checkbox-active"-->
		<script>
			$(function() {
				//checkbox-active可作为表单选中类
				$('.list-unstyled').on('click', 'li', function() {
					$(this).toggleClass('checkbox-active');
				});
			});
		</script>

		<!--站点相关脚本设置-->
		<script src="assets/js/addons.js"></script>
	</body>

</html>