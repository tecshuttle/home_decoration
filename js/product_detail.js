/*
 * 朝圣 详情js
 * author:yilujun100@qq.com
 * date:2015-12-9
 */
$(function(){
	// 产品封面
	var itemLi = $('.gy-thumb-list li');
	var iNow = 0;
	$('.gy-thumb-list li a img').click(function(){
		var srcImg = $(this).attr('src');
		$('.gy-image img').attr('src', srcImg);
	});
	$('.gy-thumb-list').css('width', itemLi.length*(itemLi.width()+4));
	$('.gy-forward').on('click', function(){ // next
		iNow++;
		if (iNow >= itemLi.length - 5) {
			
			iNow = itemLi.length - 5;
			
		}
		$('.gy-thumb-list').css({'left': -iNow*(itemLi.width()+4)});
	});
	$('.gy-back').on('click', function(){ // prev
		iNow--;
		if (iNow <= 0) {
			
			iNow = 0;
			
		}
		$('.gy-thumb-list').css({'left': -iNow*(itemLi.width()+4)});
	});

	// 滚动监听
	$('#detail-tab span').on('click', function(){
		var i = $(this).attr('rel');
		var boxTop = $('#'+i).offset().top - 49;

		$('#detail-tab span').removeClass('on');
		$(this).addClass('on');
		window.scrollTo(0, boxTop);
		$('#detail-tab').css({'position':'fixed', 'top':0});
	});
	var oneTop = $('#detail-tab').offset().top;

	$(window).scroll(function(){
		var leftNav = $('#detail-tab span'),
			docTop = $(document).scrollTop();

		if(docTop >= oneTop){
			$('#detail-tab').css({'position':'fixed', 'top':0});

			$('.nr_list').each(function(index, domEle){
				var uhTop = $(domEle).offset().top-49,
					uhBot = uhTop + $(domEle).height();
				if(docTop<uhBot && docTop>=uhTop){
					$('#detail-tab span').removeClass('on');
					$('#detail-tab span:eq('+ index +')').addClass('on');
				}else{
					return;
				}
			})
		}else{
			$('#detail-tab').css({'position':'static'});			
		}
	})
})