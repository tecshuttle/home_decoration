/**
 * 公用头尾
 *
 * @author junbo.yan
 */

$(function() {
	

	/* 头部搜索 */
	require(['web_qui_quiautocomplete'], function(QuiAutoComplete) {
		
		var defalutHTML = getDefalutHTML();

		function getDefalutHTML() {
			var max = 6, // 最多6条item
				size = 0; // 当前0个
			var str = '<ul>';
			var historyList = getHistoryList(); // 历史list
			var hotList = getHotList(); // 热门list

			str += historyList.join('');
			size = historyList.length;

			hotList = hotList.slice(0, max - size);
			str += hotList.join('');

			str += '</ul>';

			return str;
		}

		// 获取 热门搜索list
		function getHotList() {
			var ary = [];
			ary.push('<li><a href="http://z.qyer.com/all_0_0_14_0_0_0_0/?_channel=freetour&_type=place&zkw=日本" data-bn-ipg="zsj-search-hot"><em>热门搜索</em><span class="name">日本</span></a></li>');
			ary.push('<li><a href="http://z.qyer.com/all_0_0_215_54_0_0_0/?_channel=freetour&_type=place&zkw=清迈" data-bn-ipg="zsj-search-hot"><em>热门搜索</em><span class="name">清迈</span></a></li>');
			ary.push('<li><a href="http://z.qyer.com/all_0_0_0_0_9_0_0/?_channel=freetour&_type=theme&zkw=海岛" data-bn-ipg="zsj-search-hot"><em>热门搜索</em><span class="name">海岛</span></a></li>');
			ary.push('<li><a href="http://z.qyer.com/flights/all_0_0_186_0_0_0_0/?_channel=freetour&_type=channel&zkw=法国" data-bn-ipg="zsj-search-hot"><em>热门搜索</em><span class="name">法国</span></a></li>');
			ary.push('<li><a href="http://z.qyer.com/cityfun/citypass_0_0_11_11186_0_0_0/?_channel=cityfun&_type=channel&zkw=台湾" data-bn-ipg="zsj-search-hot"><em>热门搜索</em><span class="name">台湾</span></a></li>');
			ary.push('<li><a href="http://z.qyer.com/all_0_0_233_0_0_0_0/?_channel=freetour&_type=place&zkw=韩国" data-bn-ipg="zsj-search-hot"><em>热门搜索</em><span class="name">韩国</span></a></li>');
			return ary;
		}

		// 获取 历史搜索list
		function getHistoryList() {
			var ary = [],
				cache = getHistoryCache(),
				val = '',
				url = '';
			for (var i = 0; i < cache.length; i++) {
				val = cache[i].val;
				if (cache[i].url === '') {
					url = '/?action=list&_type=search&zfrom=header&kw=' + encodeURIComponent(val);
				} else {
					url = cache[i].url;
				};
				ary.push('<li><a href="' + url + '" data-bn-ipg="zsj-search-history"><em>历史记录</em><span class="zwui-iconfont icon-clock"></span><span class="name">' + val + '</span></a></li>');
				if (i == 2) {
					break; // 最多取3个历史记录
				};
			};
			return ary;
		}

		// 保存 历史搜索缓存
		function saveHistoryCache(val, url) {
			var ary = getHistoryCache();
			var item = {
				val: val || '',
				url: url || ''
			};

			if (val === '') {
				return; // val为空时直接退出
			};

			if (ary.length > 10) {
				ary.length = 10; // 控制缓存数组最大长度
			};
			
			for (var i = 0; i < ary.length; i++) {
				if (ary[i].val == val) {
					ary.splice(i, 1); // 数据去重
				};
			};

			if (window.localStorage) {
				ary.unshift(item); // 插入到数组前面
				window.localStorage.zuishijie_search_history = JSON.stringify(ary);
			};
		}

		// 读取 历史搜索缓存
		function getHistoryCache() {
			var ary = [];
			if (window.localStorage && window.localStorage.zuishijie_search_history) {
				ary = jQuery.parseJSON(window.localStorage.zuishijie_search_history);
			};
			return ary;
		}

		// 配置input搜索的联想框
		var input1 = new QuiAutoComplete({
			target: '#zwheadSearchText',
			parent: '#zwheadSearchs',
			width: '208',
			zindex: 99,
			dataSource: '/?action=search', // '../js/search.json'
			submitOnEnter: false,
			defalutHTML: defalutHTML,
			onItemSelected: function(elm) {
				// console.log('页面输出：', elm);
				var url = $(elm).attr('data-url'),
					val = $(elm).attr('data-value');
				saveHistoryCache(val, url); // 保存当前数据进入缓存
				window.location.href = url;
			},
			onIndexChanged: function(index, elm) {
				// console.log('页面输出：', index, elm);
			},
			onKeyEnter: function() {
				// console.log("页面输出：enter回调");
			},
			contentHTML: function(data) {
				// console.log('页面输出：', data);
				var html = '';

				$.each(data.keywords, function(index, val) {
					var text = val.title;
					html += '<li class="qui-autoComplete-item" data-value="' + val.title + '" data-url="' + val.url + '" data-bn-ipg="zsj-search-suggest"><em>' + val.type + '</em><span class="name">' + val.title + '</span></li>';
				});
				
				return html;
			}
		});

		$('#zwheadSearchs').on('submit', function(event) {
			var ipt_val = $('#zwheadSearchText').val();
			ipt_val = jQuery.trim(ipt_val);
			if (ipt_val === '') {
				return false; // input内容为空，则直接跳出
			};
			saveHistoryCache(ipt_val); // 保存当前数据进入缓存
		});

		

	});
});