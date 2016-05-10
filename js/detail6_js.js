var comment = function(jQuery) {
	var comm = function() {
		this.preurl = "/api.php?action=replycomment", this.TYPE_COMMENT = 1, this.TYPE_DIANPING = 2, this.TYPE_POI = 2, this.NUM_SEARCH = -1, this.guidelen = 600, this.addreplylen = 140, this.reload = function() {
			location.reload()
		}, this.uid = "", this.setUid = function(t) {
			this.uid = t
		}, this.getUid = function() {
			return "" == this.uid || this.uid <= 0 ? QYER.uid : this.uid
		}, this.__for__ = function(t, e) {
			$.post(this.preurl, t, e, "json")
		}, this.is_ingore_eventcode = function(t) {
			return -1 != $.inArray(t.keyCode, [37, 39, 38, 40])
		}, this.init_contri_txt = function() {
			var t = $("#contri-txt"),
				e = 2e3,
				i = $("#contri-tip"),
				o = $(t).val(),
				r = e - comment.getwordcount(o);
			r >= 0 ? $(i).html("剩余" + Math.floor(r / 2) + "字") : $(t).val(o.gbtrim(e))
		}, this.init_impress_txt = function(t, e) {
			t = t || "impress-tip", e = e || "impress-txt";
			var i = $("#" + e),
				o = 240,
				r = $("#" + t),
				a = $(i).val(),
				n = comment.getwordcount(a);
			n >= 0 ? $(r).html("" + Math.floor(n / 2) + " / 120 字") : $(i).val(a = a.gbtrim(o))
		}, this.reply = function(t, e, i) {
			var o = {
				cid: t,
				type: this.TYPE_COMMENT,
				reply: e
			};
			this.__for__(o, i)
		}, this.dianping = function(t, e, i, o) {
			var r = {
				cid: t,
				type: this.TYPE_DIANPING,
				reply: e
			};
			o = o || {}, r = $.extend(r, o), this.__for__(r, i)
		}, this.addImpress = function(t, e) {
			if ("" == comment.getUid() || comment.getUid() < 0) return ajaxlogin(), !1;
			if ("country" == e) var i = "impresscountry";
			else var i = "impress";
			popup.ajax("/api.php?action=" + i + "&oper=showform&id=" + t, "440")
		}, this.editImpress = function(t, e) {
			if ("" == comment.getUid() || comment.getUid() < 0) return ajaxlogin(), !1;
			if ("country" == e) var i = "impresscountry";
			else var i = "impress";
			popup.ajax("/api.php?action=" + i + "&oper=editform&id=" + t, "440")
		}, this.impressPost = function(objForm) {
			var ojbForm = this;
			return process_submit.before("cityimpressSubmit", "ui_button", "ui_button_load"), jQuery.getScript("http://static.qyer.com/js/common/jquery.form.js", function() {
				if (jQuery(ojbForm).find("input[name='cityid']").size()) var id = jQuery(ojbForm).find("input[name='cityid']").val(),
					typename = "city";
				else var id = jQuery(ojbForm).find("input[name='countryid']").val(),
					typename = "country";
				if (jQuery(ojbForm).find("#showbatchdoings").size()) var showbatchdoings = jQuery(ojbForm).find("#showbatchdoings").val();
				else var showbatchdoings = 0;
				$(ojbForm).ajaxSubmit({
					success: function(txt) {
						process_submit.after("发表");
						var ret;
						if (eval("ret=" + txt), 77 == ret.error_code) ajaxlogin();
						else if ("ok" == ret.result) {
							if ("undefined" != typeof ret.extra && ret.extra && "undefined" != typeof ret.extra.msg && ret.extra.msg && window.qyerUtil.showAntiSpam(ret.extra.msg), pupclose(), "1" == ret.data.credits) {
								if ($(".userimpressshow").length > 0) {
									var html = '<p class="user"><a href="' + ret.data.userinfo.url + '" target="_blank"><img src="' + ret.data.userinfo.icon + '" width="30" height="30" alt="' + ret.data.userinfo.username + '" /><span>' + ret.data.userinfo.username + '</span></a></p><p class="text">' + ret.data.comment + "</p>";
									$(".userimpressshow").html(html), $(".userimpressshowtitle span").html("经验")
								}
								"1" == ret.data.city ? popup.coast(200, "cityimpressSubmit", {
									text: "点评成功！",
									credits1: "+1"
								}) : popup.coast(200, "countryimpressSubmit", {
									text: "点评成功！",
									credits1: "+1"
								})
							}
							"undefined" != typeof ret.extra && ret.extra && "undefined" != typeof ret.extra.msg && ret.extra.msg ? setTimeout(function() {
								location.reload()
							}, 4e3) : location.reload()
						} else tips.show(ret.data.msg)
					}
				})
			}), !1
		}, this.guideReplyList = function(t, e) {
			var i = "replylist" + t;
			e = e || 10;
			var o = "/api.php?action=replylist&count=" + e + "&id=" + t + "&rnd=" + +new Date;
			$("#" + i).load(o)
		}, this.poiReplyList = function(t) {
			var e = "replylist" + t,
				i = "/api.php?type=2&action=replylist&id=" + t + "&rnd=" + +new Date;
			$("#" + e).load(i), $(".replymore" + t).hide()
		}, this.replyMore = function(t, e, i) {
			var o = "/api.php?action=replylist&type=" + i + "&rnd=" + +new Date;
			$.get(o, {
				flagXX: e
			}, function(e) {
				var i = $(t).parent();
				$(e).insertBefore(i), $(t).parent().remove()
			})
		}, this.addmsg = function(t, e) {
			var i = "replylist" + t,
				o = $("#" + i),
				r = o.html();
			$.get("/api.php?action=getonereply", {
				id: t,
				replyid: e,
				rnd: +new Date
			}, function(t) {
				o.html(t + r)
			})
		}, this.delGuideReply = function(t, e) {
			var i = $(t).attr("alt"),
				o = i.split("|"),
				r = o[0],
				a = (o[1], $(t).attr("ttype"));
			$.postJSON("/api.php?action=delreply", {
				replyid: r,
				typeid: a
			}, function(t) {
				if ("ok" == t.result) {
					var i = "#jsreplyitem" + r;
					$(i).remove(), e(t)
				}
				tips.show(t.data.msg)
			})
		}, this.delcomment = function(t, e) {
			var i = $(t).attr("alt");
			$.getJSON("/api.php?action=delcomment", {
				cid: i
			}, e)
		}, this.updateReplyNum = function(t, e) {
			e = e || this.TYPE_COMMENT, $.getJSON("/api.php?action=replycount&cid=" + t + "&type=" + e, {
				rnd: +new Date
			}, function(e) {
				var i, o = "#replyNum" + t;
				"ok" == e.result && (i = e.data.count ? "回复 " + e.data.count : "回复", $(o).html(i))
			})
		}, this.poiupdateReplyNum = function(t, e) {
			e = e || this.TYPE_COMMENT, $.getJSON("/api.php?action=replycount&cid=" + t + "&type=" + e, {
				rnd: +new Date
			}, function(e) {
				var i = "#replyNum" + t;
				if ("ok" == e.result) {
					var o = "回复 ";
					e.data.count > 0 && (o += e.data.count), $(i).html(o)
				}
			})
		}/*, this.getwordcount = util.getwordlen, this.REPORT_GUIDE = 1, this.REPORT_POI = 2, this.REPORT_IMPRESSION = 3, this.REPORT_GUIDE_REPLY = 11, this.REPORT_POI_REPLY = 12, this.REPORT_IMPRESSION_REPLY = 13, this.REPORT_ASK_QUESTION = 21, this.REPORT_ASK_ANSWER = 22, this.REPORT_ASK_COMMENT = 23, this.REPORT_JN_COMMENT = 31, this.REPORT_COUNTRY_IMPRESSION = 4, this.REPORT_ONEDAY_COMMENT = 51, this.REPORT_MESSAGE = 61, this.jubao = function(t, e) {
			return "" == comment.getUid() || comment.getUid() < 0 ? (ajaxlogin(), !1) : void popup.ajax("/api.php?action=jubao&oper=showform&id=" + e + "&type=" + t, "440")
		}*/, this.jubaoGuideReply = this.jubao, this.jubaoPost = function() {
			var objform = this;
			return jQuery(objform).ajaxSubmit({
				success: function(txt) {
					var ret;
					eval("ret=" + txt), 77 == ret.error_code ? ajaxlogin() : "ok" == ret.result ? (pupclose(), tips.show("感谢举报！我们会尽快处理！")) : tips.show(ret.data.msg)
				}
			}), !1
		}, this.contribute = function(t, e, i, o, r) {
			return 0 >= t ? !1 : "" == this.getUid() || this.getUid() <= 0 ? (ajaxlogin(), !1) : (e = e || 0, "" == o && (o = "cityid"), void popup.ajax("/api.php?action=contribute&type=" + e + "&oper=showform&cateid=" + t + "&parentid=" + i + "&parenttypename=" + o, "640", r))
		}, this.contribut_eedit = function(t, e) {
			if (0 >= t) return !1;
			if ("" == this.getUid() || this.getUid() <= 0) return ajaxlogin(), !1;
			var i = "showform";
			1 == e && (i = "showinfo"), popup.ajax("/api.php?action=contributeedit&type=" + e + "&oper=" + i + "&id=" + t + "&randomstr=" + Math.random(), "640")
		}, this.guide_edit = function(t, e) {
			if (0 >= t) return !1;
			if ("" == this.getUid() || this.getUid() <= 0) return ajaxlogin(), !1;
			var i = "showform";
			1 == e && (i = "showinfo"), popup.ajax("/api.php?action=guideedit&type=" + e + "&oper=" + i + "&id=" + t + "&randomstr=" + Math.random(), "640")
		}, this.contribut_del = function(t, e) {
			return 0 >= t ? !1 : "" == this.getUid() || this.getUid() <= 0 ? (ajaxlogin(), !1) : void $.ajax({
				type: "POST",
				url: "/api.php",
				data: "action=contributedel&id=" + t + "&type=" + e,
				dataType: "text",
				beforeSend: function(t) {},
				success: function(t) {
					1 == t ? (tips.show("删除成功！"), location.reload()) : tips.show("删除未成功，请重试！")
				}
			})
		}, this.contribut_poidel = function(t) {
			return 0 >= t ? !1 : "" == this.getUid() || this.getUid() <= 0 ? (ajaxlogin(), !1) : void $.ajax({
				type: "POST",
				url: "/api.php",
				data: "action=contributepoidel&id=" + t,
				dataType: "text",
				beforeSend: function(t) {},
				success: function(t) {
					1 == t ? (tips.show("删除成功！"), location.reload()) : tips.show("删除未成功，请重试！")
				}
			})
		}, this.contributePost = function(objForm) {
			var ojbForm = this,
				issave = jQuery(ojbForm).find("input[name='issave']").val();
			return $(ojbForm).ajaxSubmit({
				success: function(txt) {
					var ret;
					eval("ret=" + txt), 77 == ret.error_code ? ajaxlogin() : "ok" == ret.result ? (pupclose(), "1" == issave ? popup.coast(330, "issavedsf", {
						text: "内容保存成功，可以在个人中心查看。"
					}) : popup.coast(330, "issavedsf", {
						text: "内容提交成功！通过审核后会有经验值奖励。"
					})) : tips.show(ret.data.msg)
				}
			}), !1
		}, this.contribute_editPost = function(objForm) {
			var ojbForm = this;
			return $(ojbForm).ajaxSubmit({
				success: function(txt) {
					var ret;
					eval("ret=" + txt), 77 == ret.error_code ? ajaxlogin() : "ok" == ret.result ? (pupclose(), tips.show("投稿信息修改成功。"), location.reload()) : tips.show(ret.data.msg)
				}
			}), !1
		}, this.guide_editPost = function(objForm) {
			var ojbForm = this;
			return $(ojbForm).ajaxSubmit({
				success: function(txt) {
					var ret;
					eval("ret=" + txt), 77 == ret.error_code ? ajaxlogin() : "ok" == ret.result ? (pupclose(), tips.show("词条投稿信息修改成功。"), location.reload()) : tips.show(ret.data.msg)
				}
			}), !1
		}, this.batchaddplace = function() {
			return "" == this.getUid() || this.getUid() <= 0 ? (ajaxlogin(), !1) : void popup.ajax("/api.php?action=batchaddplace&randomstr=" + Math.random(), "440")
		}, this.jsselectcontinents = function(id) {
			return 0 >= id ? !1 : "" == this.getUid() || this.getUid() <= 0 ? (ajaxlogin(), !1) : void $.ajax({
				type: "POST",
				url: "/api.php",
				data: "action=getselectcontinents&id=" + id,
				dataType: "text",
				beforeSend: function(t) {},
				success: function(txt) {
					var ret;
					eval("ret=" + txt), "ok" == ret.result && ($("#input_country").html(ret.data.html), $(".user_place_item_list").html(""), $("#input_beento").html(""))
				}
			})
		}, this.jsselectcountry = function(id) {
			return 0 >= id ? !1 : "" == this.getUid() || this.getUid() <= 0 ? (ajaxlogin(), !1) : void $.ajax({
				type: "POST",
				url: "/api.php",
				data: "action=getselectcountry&id=" + id,
				dataType: "text",
				beforeSend: function(t) {},
				success: function(txt) {
					var ret;
					eval("ret=" + txt), "ok" == ret.result && ($("#input_city").html(ret.data.html), $("#input_beento").html(ret.data.ahtml), $(".user_place_item_box").carousel({
						dispItems: 1
					}))
				}
			})
		}, this.jsbatchaddbeento = function(t, e) {
			return t.length <= 0 && 0 >= e ? !1 : "" == this.getUid() || this.getUid() <= 0 ? (ajaxlogin(), !1) : (void 0 == e && (e = 0), void $.ajax({
				type: "POST",
				url: "/api.php",
				data: "action=batchaddbeento&cid=" + t + "&countryid=" + e,
				dataType: "text",
				beforeSend: function(t) {},
				success: function(t) {
					1 == t ? (tips.show("添加成功！"), location.reload()) : tips.show(2 == t ? "最少要选中一个！" : 3 == t ? "一次最多只能添加10个！" : "添加失败，请重试！")
				}
			}))
		}, this.ajax_search_place = function(t, e) {
			return 38 != e.keyCode && 40 != e.keyCode ? "" == t ? void $("#place_search_list_drop").hide() : void $.post("/index.php", {
				action: "searchplace",
				kw: t
			}, function(t, e) {
				"success" == e && (t = $.parseJSON(t), "ok" == t.result ? (comment.NUM_SEARCH = -1, $("#place_search_list_drop").show(), $(".jssearchcontainer").html(t.data.html).show()) : tips.show("	无法获取相应内容！"))
			}) : void 0
		}
	};
	return new comm
}(jQuery);
! function(e) {
	"use strict";

	function t(t) {
		var r = t.data;
		t.isDefaultPrevented() || (t.preventDefault(), e(this).ajaxSubmit(r))
	}

	function r(t) {
		var r = t.target,
			a = e(r);
		if (!a.is("[type=submit],[type=image]")) {
			var n = a.closest("[type=submit]");
			if (0 === n.length) return;
			r = n[0]
		}
		var i = this;
		if (i.clk = r, "image" == r.type)
			if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;
			else if ("function" == typeof e.fn.offset) {
			var o = a.offset();
			i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
		} else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
		setTimeout(function() {
			i.clk = i.clk_x = i.clk_y = null
		}, 100)
	}

	function a() {
		if (e.fn.ajaxSubmit.debug) {
			var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
			window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
		}
	}
	var n = {};
	n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData, e.fn.ajaxSubmit = function(t) {
		function r(t) {
			var r, a, n = e.param(t).split("&"),
				i = n.length,
				o = {};
			for (r = 0; i > r; r++) n[r] = n[r].replace(/\+/g, " "), a = n[r].split("="), o[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
			return o
		}

		function i(a) {
			for (var n = new FormData, i = 0; i < a.length; i++) n.append(a[i].name, a[i].value);
			if (t.extraData) {
				var o = r(t.extraData);
				for (var u in o) o.hasOwnProperty(u) && n.append(u, o[u])
			}
			t.data = null;
			var l = e.extend(!0, {}, e.ajaxSettings, t, {
				contentType: !1,
				processData: !1,
				cache: !1,
				type: s || "POST"
			});
			t.uploadProgress && (l.xhr = function() {
				var e = jQuery.ajaxSettings.xhr();
				return e.upload && (e.upload.onprogress = function(e) {
					var r = 0,
						a = e.loaded || e.position,
						n = e.total;
					e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r)
				}), e
			}), l.data = null;
			var c = l.beforeSend;
			return l.beforeSend = function(e, t) {
				t.data = n, c && c.call(this, e, t)
			}, e.ajax(l)
		}

		function o(r) {
			function n(e) {
				var t = e.contentWindow ? e.contentWindow.document : e.contentDocument ? e.contentDocument : e.document;
				return t
			}

			function i() {
				function t() {
					try {
						var e = n(v).readyState;
						a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
					} catch (r) {
						a("Server abort: ", r, " (", r.name, ")"), o(D), T && clearTimeout(T), T = void 0
					}
				}
				var r = c.attr("target"),
					i = c.attr("action");
				j.setAttribute("target", d), s || j.setAttribute("method", "POST"), i != f.url && j.setAttribute("action", f.url), f.skipEncodingOverride || s && !/post/i.test(s) || c.attr({
					encoding: "multipart/form-data",
					enctype: "multipart/form-data"
				}), f.timeout && (T = setTimeout(function() {
					y = !0, o(k)
				}, f.timeout));
				var u = [];
				try {
					if (f.extraData)
						for (var l in f.extraData) f.extraData.hasOwnProperty(l) && u.push(e.isPlainObject(f.extraData[l]) && f.extraData[l].hasOwnProperty("name") && f.extraData[l].hasOwnProperty("value") ? e('<input type="hidden" name="' + f.extraData[l].name + '">').attr("value", f.extraData[l].value).appendTo(j)[0] : e('<input type="hidden" name="' + l + '">').attr("value", f.extraData[l]).appendTo(j)[0]);
					f.iframeTarget || (h.appendTo("body"), v.attachEvent ? v.attachEvent("onload", o) : v.addEventListener("load", o, !1)), setTimeout(t, 15), j.submit()
				} finally {
					j.setAttribute("action", i), r ? j.setAttribute("target", r) : c.removeAttr("target"), e(u).remove()
				}
			}

			function o(t) {
				if (!g.aborted && !F) {
					try {
						M = n(v)
					} catch (r) {
						a("cannot access response document: ", r), t = D
					}
					if (t === k && g) return g.abort("timeout"), void S.reject(g, "timeout");
					if (t == D && g) return g.abort("server abort"), void S.reject(g, "error", "server abort");
					if (M && M.location.href != f.iframeSrc || y) {
						v.detachEvent ? v.detachEvent("onload", o) : v.removeEventListener("load", o, !1);
						var i, s = "success";
						try {
							if (y) throw "timeout";
							var u = "xml" == f.dataType || M.XMLDocument || e.isXMLDoc(M);
							if (a("isXml=" + u), !u && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), void setTimeout(o, 250);
							var l = M.body ? M.body : M.documentElement;
							g.responseText = l ? l.innerHTML : null, g.responseXML = M.XMLDocument ? M.XMLDocument : M, u && (f.dataType = "xml"), g.getResponseHeader = function(e) {
								var t = {
									"content-type": f.dataType
								};
								return t[e]
							}, l && (g.status = Number(l.getAttribute("status")) || g.status, g.statusText = l.getAttribute("statusText") || g.statusText);
							var c = (f.dataType || "").toLowerCase(),
								d = /(json|script|text)/.test(c);
							if (d || f.textarea) {
								var p = M.getElementsByTagName("textarea")[0];
								if (p) g.responseText = p.value, g.status = Number(p.getAttribute("status")) || g.status, g.statusText = p.getAttribute("statusText") || g.statusText;
								else if (d) {
									var x = M.getElementsByTagName("pre")[0],
										b = M.getElementsByTagName("body")[0];
									x ? g.responseText = x.textContent ? x.textContent : x.innerText : b && (g.responseText = b.textContent ? b.textContent : b.innerText)
								}
							} else "xml" == c && !g.responseXML && g.responseText && (g.responseXML = X(g.responseText));
							try {
								E = _(g, c, f)
							} catch (t) {
								s = "parsererror", g.error = i = t || s
							}
						} catch (t) {
							a("error caught: ", t), s = "error", g.error = i = t || s
						}
						g.aborted && (a("upload aborted"), s = null), g.status && (s = g.status >= 200 && g.status < 300 || 304 === g.status ? "success" : "error"), "success" === s ? (f.success && f.success.call(f.context, E, "success", g), S.resolve(g.responseText, "success", g), m && e.event.trigger("ajaxSuccess", [g, f])) : s && (void 0 === i && (i = g.statusText), f.error && f.error.call(f.context, g, s, i), S.reject(g, "error", i), m && e.event.trigger("ajaxError", [g, f, i])), m && e.event.trigger("ajaxComplete", [g, f]), m && !--e.active && e.event.trigger("ajaxStop"), f.complete && f.complete.call(f.context, g, s), F = !0, f.timeout && clearTimeout(T), setTimeout(function() {
							f.iframeTarget || h.remove(), g.responseXML = null
						}, 100)
					}
				}
			}
			var u, l, f, m, d, h, v, g, x, b, y, T, j = c[0],
				w = !!e.fn.prop,
				S = e.Deferred();
			if (e("[name=submit],[id=submit]", j).length) return alert('Error: Form elements must not have name or id of "submit".'), S.reject(), S;
			if (r)
				for (l = 0; l < p.length; l++) u = e(p[l]), w ? u.prop("disabled", !1) : u.removeAttr("disabled");
			if (f = e.extend(!0, {}, e.ajaxSettings, t), f.context = f.context || f, d = "jqFormIO" + (new Date).getTime(), f.iframeTarget ? (h = e(f.iframeTarget), b = h.attr("name"), b ? d = b : h.attr("name", d)) : (h = e('<iframe name="' + d + '" src="' + f.iframeSrc + '" />'), h.css({
					position: "absolute",
					top: "-1000px",
					left: "-1000px"
				})), v = h[0], g = {
					aborted: 0,
					responseText: null,
					responseXML: null,
					status: 0,
					statusText: "n/a",
					getAllResponseHeaders: function() {},
					getResponseHeader: function() {},
					setRequestHeader: function() {},
					abort: function(t) {
						var r = "timeout" === t ? "timeout" : "aborted";
						a("aborting upload... " + r), this.aborted = 1;
						try {
							v.contentWindow.document.execCommand && v.contentWindow.document.execCommand("Stop")
						} catch (n) {}
						h.attr("src", f.iframeSrc), g.error = r, f.error && f.error.call(f.context, g, r, t), m && e.event.trigger("ajaxError", [g, f, r]), f.complete && f.complete.call(f.context, g, r)
					}
				}, m = f.global, m && 0 === e.active++ && e.event.trigger("ajaxStart"), m && e.event.trigger("ajaxSend", [g, f]), f.beforeSend && f.beforeSend.call(f.context, g, f) === !1) return f.global && e.active--, S.reject(), S;
			if (g.aborted) return S.reject(), S;
			x = j.clk, x && (b = x.name, b && !x.disabled && (f.extraData = f.extraData || {}, f.extraData[b] = x.value, "image" == x.type && (f.extraData[b + ".x"] = j.clk_x, f.extraData[b + ".y"] = j.clk_y)));
			var k = 1,
				D = 2,
				A = e("meta[name=csrf-token]").attr("content"),
				L = e("meta[name=csrf-param]").attr("content");
			L && A && (f.extraData = f.extraData || {}, f.extraData[L] = A), f.forceSync ? i() : setTimeout(i, 10);
			var E, M, F, O = 50,
				X = e.parseXML || function(e, t) {
					return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
				},
				C = e.parseJSON || function(e) {
					return window.eval("(" + e + ")")
				},
				_ = function(t, r, a) {
					var n = t.getResponseHeader("content-type") || "",
						i = "xml" === r || !r && n.indexOf("xml") >= 0,
						o = i ? t.responseXML : t.responseText;
					return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o
				};
			return S
		}
		if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
		var s, u, l, c = this;
		"function" == typeof t && (t = {
			success: t
		}), s = this.attr("method"), u = this.attr("action"), l = "string" == typeof u ? e.trim(u) : "", l = l || window.location.href || "", l && (l = (l.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
			url: l,
			success: e.ajaxSettings.success,
			type: s || "GET",
			iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
		}, t);
		var f = {};
		if (this.trigger("form-pre-serialize", [this, t, f]), f.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
		if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
		var m = t.traditional;
		void 0 === m && (m = e.ajaxSettings.traditional);
		var d, p = [],
			h = this.formToArray(t.semantic, p);
		if (t.data && (t.extraData = t.data, d = e.param(t.data, m)), t.beforeSubmit && t.beforeSubmit(h, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
		if (this.trigger("form-submit-validate", [h, this, t, f]), f.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
		var v = e.param(h, m);
		d && (v = v ? v + "&" + d : d), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + v, t.data = null) : t.data = v;
		var g = [];
		if (t.resetForm && g.push(function() {
				c.resetForm()
			}), t.clearForm && g.push(function() {
				c.clearForm(t.includeHidden)
			}), !t.dataType && t.target) {
			var x = t.success || function() {};
			g.push(function(r) {
				var a = t.replaceTarget ? "replaceWith" : "html";
				e(t.target)[a](r).each(x, arguments)
			})
		} else t.success && g.push(t.success);
		t.success = function(e, r, a) {
			for (var n = t.context || this, i = 0, o = g.length; o > i; i++) g[i].apply(n, [e, r, a || c, c])
		};
		var b = e('input[type=file]:enabled[value!=""]', this),
			y = b.length > 0,
			T = "multipart/form-data",
			j = c.attr("enctype") == T || c.attr("encoding") == T,
			w = n.fileapi && n.formdata;
		a("fileAPI :" + w);
		var S, k = (y || j) && !w;
		t.iframe !== !1 && (t.iframe || k) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function() {
			S = o(h)
		}) : S = o(h) : S = (y || j) && w ? i(h) : e.ajax(t), c.removeData("jqxhr").data("jqxhr", S);
		for (var D = 0; D < p.length; D++) p[D] = null;
		return this.trigger("form-submit-notify", [this, t]), this
	}, e.fn.ajaxForm = function(n) {
		if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
			var i = {
				s: this.selector,
				c: this.context
			};
			return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function() {
				e(i.s, i.c).ajaxForm(n)
			}), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
		}
		return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
	}, e.fn.ajaxFormUnbind = function() {
		return this.unbind("submit.form-plugin click.form-plugin")
	}, e.fn.formToArray = function(t, r) {
		var a = [];
		if (0 === this.length) return a;
		var i = this[0],
			o = t ? i.getElementsByTagName("*") : i.elements;
		if (!o) return a;
		var s, u, l, c, f, m, d;
		for (s = 0, m = o.length; m > s; s++)
			if (f = o[s], l = f.name)
				if (t && i.clk && "image" == f.type) f.disabled || i.clk != f || (a.push({
					name: l,
					value: e(f).val(),
					type: f.type
				}), a.push({
					name: l + ".x",
					value: i.clk_x
				}, {
					name: l + ".y",
					value: i.clk_y
				}));
				else if (c = e.fieldValue(f, !0), c && c.constructor == Array)
			for (r && r.push(f), u = 0, d = c.length; d > u; u++) a.push({
				name: l,
				value: c[u]
			});
		else if (n.fileapi && "file" == f.type && !f.disabled) {
			r && r.push(f);
			var p = f.files;
			if (p.length)
				for (u = 0; u < p.length; u++) a.push({
					name: l,
					value: p[u],
					type: f.type
				});
			else a.push({
				name: l,
				value: "",
				type: f.type
			})
		} else null !== c && "undefined" != typeof c && (r && r.push(f), a.push({
			name: l,
			value: c,
			type: f.type,
			required: f.required
		}));
		if (!t && i.clk) {
			var h = e(i.clk),
				v = h[0];
			l = v.name, l && !v.disabled && "image" == v.type && (a.push({
				name: l,
				value: h.val()
			}), a.push({
				name: l + ".x",
				value: i.clk_x
			}, {
				name: l + ".y",
				value: i.clk_y
			}))
		}
		return a
	}, e.fn.formSerialize = function(t) {
		return e.param(this.formToArray(t))
	}, e.fn.fieldSerialize = function(t) {
		var r = [];
		return this.each(function() {
			var a = this.name;
			if (a) {
				var n = e.fieldValue(this, t);
				if (n && n.constructor == Array)
					for (var i = 0, o = n.length; o > i; i++) r.push({
						name: a,
						value: n[i]
					});
				else null !== n && "undefined" != typeof n && r.push({
					name: this.name,
					value: n
				})
			}
		}), e.param(r)
	}, e.fn.fieldValue = function(t) {
		for (var r = [], a = 0, n = this.length; n > a; a++) {
			var i = this[a],
				o = e.fieldValue(i, t);
			null === o || "undefined" == typeof o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
		}
		return r
	}, e.fieldValue = function(t, r) {
		var a = t.name,
			n = t.type,
			i = t.tagName.toLowerCase();
		if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;
		if ("select" == i) {
			var o = t.selectedIndex;
			if (0 > o) return null;
			for (var s = [], u = t.options, l = "select-one" == n, c = l ? o + 1 : u.length, f = l ? o : 0; c > f; f++) {
				var m = u[f];
				if (m.selected) {
					var d = m.value;
					if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), l) return d;
					s.push(d)
				}
			}
			return s
		}
		return e(t).val()
	}, e.fn.clearForm = function(t) {
		return this.each(function() {
			e("input,select,textarea", this).clearFields(t)
		})
	}, e.fn.clearFields = e.fn.clearInputs = function(t) {
		var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
		return this.each(function() {
			var a = this.type,
				n = this.tagName.toLowerCase();
			r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? e.browser.msie ? e(this).replaceWith(e(this).clone()) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
		})
	}, e.fn.resetForm = function() {
		return this.each(function() {
			("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
		})
	}, e.fn.enable = function(e) {
		return void 0 === e && (e = !0), this.each(function() {
			this.disabled = !e
		})
	}, e.fn.selected = function(t) {
		return void 0 === t && (t = !0), this.each(function() {
			var r = this.type;
			if ("checkbox" == r || "radio" == r) this.checked = t;
			else if ("option" == this.tagName.toLowerCase()) {
				var a = e(this).parent("select");
				t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t
			}
		})
	}, e.fn.ajaxSubmit.debug = !1
}(jQuery);
var handle_discussion = function(t, i) {
	var e = 10,
		o = 500,
		a = t(".ui2_textarea"),
		s = t(".mod_talk_edit input[type='submit']");
	t(".ui2_textarea").keyup(function() {
		var i = t(this).val().length,
			a = t(this).parents("form").find(".sum");
		a.text(i), e > i || i > o ? a.addClass("sum_error") : a.removeClass("sum_error")
	}), t(".mod_talk").on("focus", ".ui2_textarea", function() {
		return QYER.uid <= 0 ? (ajaxlogin(), !1) : (t(this).addClass("ui2_focus").removeClass("ui2_error"), void t(this).closest("form").find(".ui2_error_layer").hide())
	}), t(".mod_talk").on("blur", ".ui2_textarea", function() {
		t(this).removeClass("ui2_focus")
	}), t(".mod_talk").on("mouseenter", ".mod_talk_list_item", function() {
		t(this).find(".handle").show()
	}).on("mouseleave", ".mod_talk_list_item", function() {
		t(this).find(".handle").hide()
	}), t(".mod_talk_edit form").submit(function() {
		if (QYER.uid <= 0) return ajaxlogin(), !1;
		var i = a.val().length;
		return e > i || i > o ? (a.addClass("ui2_error"), t(this).find(".ui2_error_layer").show(), !1) : (s.removeClass("ui_buttonB").addClass("ui_button_load"), t(this).ajaxSubmit({
			type: "POST",
			dataType: "json",
			success: function(t) {
				s.addClass("ui_buttonB").removeClass("ui_button_load"), "ok" == t.result ? (window.location.hash = "#comment-mod", window.location.reload(!0)) : tips.show(t.data.msg)
			}
		}), !1)
	}), t(".mod_talk").on("click", ".reply", function(i) {
		var e = t(this).closest(".mod_talk_list_item"),
			o = e.find(".mod_talk_list_reply");
		if (o.is(":visible")) return void o.hide();
		var a = e.children(".name").text();
		o.show().find("textarea").focus().val("回复 @" + a + "：")
	}), t(".mod_talk").on("keyup", ".mod_talk_list .ui2_textarea", function() {
		var i = t(this).val().length,
			o = t(this).closest("form").find(".sum");
		o.text(i), e > i || i > 300 ? o.addClass("sum_error") : o.removeClass("sum_error")
	}), t(".mod_talk").on("submit", ".mod_talk_list form", function() {
		if (QYER.uid <= 0) return ajaxlogin(), !1;
		var i = t(this).find(".ui2_textarea"),
			o = t(this).find('input[type="submit"]'),
			a = i.val().length;
		return /^回复 @[^：]+：$/.test(i.val()) ? (i.addClass("ui2_error"), t(this).find(".ui2_error_layer_text").text("回复内容不能为空"), t(this).find(".ui2_error_layer").show(), !1) : e > a || a > 300 ? (i.addClass("ui2_error"), t(this).find(".ui2_error_layer_text").text("至少写够10个字，最多不超过300字"), t(this).find(".ui2_error_layer").show(), !1) : (o.removeClass("ui_buttonB").addClass("ui_button_load"), t(this).ajaxSubmit({
			type: "POST",
			dataType: "json",
			success: function(t) {
				o.addClass("ui_buttonB").removeClass("ui_button_load"), "ok" == t.result ? (window.location.hash = "#comment-mod", window.location.reload(!0)) : tips.show(t.data.msg)
			}
		}), !1)
	}), t(".mod_talk").on("click", ".delete", function(e) {
		e.preventDefault();
		var o = {
				action: "del",
				id: t(this).attr("did")
			},
			a = t(this).closest(".mod_talk_list_item");
		tips.confirm(e, function() {
			t.getJSON(i.url, o, function(t) {
				"ok" == t.result && a.remove(), tips.show(t.data), window.location.reload(!0)
			})
		})
	}), t(".mod_talk").on("click", ".ui_page a", function(e) {
		if (!t(this).hasClass("ui_page_item_current")) {
			var o = /javascript:void\(([0-9]+)\)/.exec(t(this).attr("href"));
			t.ajax({
				url: i.url,
				data: "bz=" + i.bzType + "&id=" + t("[name='bid']").val() + "&page=" + o[1],
				dataType: "html",
				success: function(i) {
					t(".mod_talk_edit").nextAll().remove(), t(".mod_talk_edit").after(i), t("html,body").animate({
						scrollTop: t("#comment-mod").offset().top
					}, 300)
				}
			})
		}
	}), t(".mod_talk").on("click", ".jsjubaoreply", function(e) {
		var o = t(this).attr("alt");
		e.preventDefault(), islogin(function() {
			comment.jubao(i.flagType, o)
		})
	}), t(".mod_talk").on("change", ".ui2_textarea", function() {
		qyerUI.autoheight(this, {
			fontSize: "14px",
			lineHeight: "24px"
		})
	}), t(".mod_talk").on("keyup", ".ui2_textarea", function() {
		qyerUI.autoheight(this, {
			fontSize: "14px",
			lineHeight: "24px"
		})
	})
};

function cancelFavoriteded(e) {
	var t = $(e);
	if (t.hasClass("cancelcollecting")) return !1;
	if (t.addClass("cancelcollecting"), QYER.uid <= 0) return ajaxlogin(), !1;
	var a = parseInt(t.attr("data-id")) ? parseInt(t.attr("data-id")) : myVar.id;
	$.ajax({
		url: "/api.php?action=lmfavor",
		data: "deal_id=" + a + "&op=del",
		dataType: "json"
	}).done(function(e) {
		t.removeClass("cancelcollecting"), "ok" == e.result && (t.hasClass("collected") ? t.removeClass("collected").addClass("normal").addClass("collect").children("em").html("收藏") : t.removeClass("btn_cancel_favoriteded").removeClass("btn_favorited").addClass("btn_collect"))
	})
}
$("#book_submit,.btn_book").click(function() {
		return "1" == $(this).attr("lv") && QYER.uid <= 0 ? (ajaxlogin(), !1) : $(this).hasClass("btn_book") && $(this).hasClass("returntop") ? (jQuery("body,html").animate({
			scrollTop: 0
		}), !1) : void qyerUI.popup.show({
			id: "hlayer",
			width: 360,
			isclose: "show"
		})
	}),
	function(e) {
		e(".jnWeiboAd a").click(function(e) {
			e.preventDefault();
			var t = amendUrl(window.location.href, "campaign=weibo_share&category=lm_read_detail"),
				a = "http://service.weibo.com/share/share.php?appkey=2254065920&title=" + encodeURIComponent(docData.title) + "&url=" + encodeURIComponent(t) + "&ralateUid=1721449743";
			docData.pic && (a += "&pic=" + encodeURIComponent(docData.pic)), window.open(a, "_blank", "scrollbars=no,width=600,height=480,left=75,top=20,status=no,resizable=yes,")
		}), e(".jnWeiboAd .close").click(function() {
			e(this).parent().hide()
		})
	}(jQuery), $(".lmdetails_r,.lmTools").on("click", ".btn_collect,.collect", function() {
		var e = $(this);
		if (e.hasClass("collecting")) return !1;
		if (e.addClass("collecting"), QYER.uid <= 0) return ajaxlogin(), !1;
		var t = parseInt(e.attr("data-id")) ? parseInt(e.attr("data-id")) : myVar.id;
		$.ajax({
			url: "/api.php?action=lmfavor",
			data: "deal_id=" + t,
			dataType: "json"
		}).done(function(t) {
			e.removeClass("collecting"), "ok" == t.result && (e.hasClass("collect") ? e.removeClass("normal").removeClass("collect").addClass("collected").children("em").html("已收藏") : e.removeClass("btn_collect").removeClass("btn_cancel_favoriteded").addClass("btn_favorited"))
		})
	}), $(".lmdetails_r").on("mouseout", ".btn_favorited", function() {
		return QYER.uid <= 0 ? (ajaxlogin(), !1) : void $(this).removeClass("btn_favorited").removeClass("btn_collect").addClass("btn_cancel_favoriteded")
	}), $(".lmdetails_r").on("click", ".btn_cancel_favoriteded", function() {
		cancelFavoriteded(".btn_cancel_favoriteded")
	}), $(".lmdetails_r").on("click", ".btn_favorited", function() {
		cancelFavoriteded(".btn_favorited")
	}), $(".lmTools").on("click", ".collected", function() {
		cancelFavoriteded(".collected")
	}), $(document).on("click", ".show-lb", function() {
		var e = $(this).attr("data"),
			t = $(this).attr("src"),
			a = new Image;
		a.src = t;
		var o = a.width;
		qyerUI.popup.show({
			id: "big_pic_" + e,
			width: o,
			isclose: "show"
		})
	}), $(document).on("click", ".show-lb_close", function() {
		$(".ui_popup_bg").fadeOut(300)
	}), $("#booknow").has("ul").length && $("#booknow").hover(function() {
		$("p a", this).addClass("hv"), $(this).find(".listyd").show()
	}, function() {
		$("p a", this).removeClass("hv"), $(this).find(".listyd").hide()
	}), $(function() {
		function e() {
			if (0 == t.length) return !1;
			var e = $(window).scrollTop(),
				o = t.offset().top + t.height();
			o > e ? a.hide() : a.show()
		}
		var t = $("#lmbookfixed_trigger"),
			a = $("#lmbookfixed");
		$(window).scroll(function() {
			e()
		})
	}), $.ajax({
		type: "GET",
		url: "/lastminute/comment.php",
		// data: "bz=LASTMIN&id=" + myVar.id,
		dataType: "html",
		success: function(e) {
			$(".mod_talk").append(e)
		}
	}), handle_discussion(jQuery, {
		bzType: "LASTMIN",
		url: "/lastminute/comment.php",
		flagType: 79
	});

function hide_notice() {
	$(".poplmsift").children(":first").hide()
}! function(t) {
	function e(e) {
		t('.ui_popup input[name="country"]').val(e), t(".pop_setremind .ui2_input").val(e)
	}
	var i, n = 38,
		s = 40,
		a = 13,
		u = ".pop_setremind .placelayer li",
		r = function() {
			t(".ui_popup .placelayer").hide()
		},
		p = function(i) {
			var p = t(u).size();
			if (a == i) {
				if (0 >= p) return !1;
				var o = t(u + ".current").find("p.cn").text();
				return e(o), void r()
			}
			if (!(0 >= p)) {
				var l = -1;
				t(u).each(function(e, i) {
					return t(i).hasClass("current") ? (l = e, !1) : void 0
				}), 0 > l || (s == i ? (l++, l >= p - 1 && (l = p - 1)) : n == i && (l--, 0 >= l && (l = 0)), t(u).removeClass("current"), t(u).eq(l).addClass("current"))
			}
		};
	t(document).on("keyup", ".pop_setremind .ui2_input", function(e) {
		if (e.keyCode == n || e.keyCode == s || e.keyCode == a) return void p(e.keyCode);
		clearTimeout(i);
		var u = t(this).val(),
			r = t(".ui_popup .placelayer");
		return t('.ui_popup input[name="country"]').val(""), "" == u ? void r.hide() : void(i = setTimeout(function() {
			t.ajax({
				url: "/api.php",
				data: {
					action: "lmcountry",
					kw: u
				},
				dataType: "html",
				beforeSend: function(t) {
					r.html('<p class="loading">正在搜索国家...</p>').show()
				}
			}).done(function(t) {
				r.html(t)
			})
		}, 500))
	}), t(document).on("click", u, function(i) {
		var n = t(this).find(".cn").text();
		e(n), r()
	}), t(document).on("click", ".btn_setremind", function() {
		var e = t(this).closest(".pop_setremind");
		return t(".ui2_input", e).val() && "" == t('input[name="country"]', e).val() && "" == t('input[name="start_pos"]', e).val() ? (t(".ui2_input", e).addClass("error").next().show(), !1) : t('input[name="country"]').val() || t('input[name="product_type"]').val() || t('input[name="date_str"]').val() || t('input[name="start_pos"]', e).val() ? void t(".poplmsift form").submit() : void t(".poplmsift").children(":first").show()
	}), t(document).on("focus", ".pop_setremind .ui2_input", function() {
		hide_notice(), t(".ui_popup .ui2_input").removeClass("error").next().hide()
	}), t(document).click(function() {
		if (!t(".ui_popup .placelayer").is(":hidden")) {
			var i;
			t(".ui_popup .placelayer .current").length && (i = t(".ui_popup .placelayer .current .cn").text(), e(i)), t(".ui_popup .placelayer").hide()
		}
	})
}(jQuery), $(document).on("click", '.poplmsift .travel-date a:not("#selectmonth2"), .monthlist a:not(.date-screening)', function(t) {
	if (t.preventDefault(), !$(this).hasClass("current")) {
		hide_notice();
		var e = $(this).attr("data") || "";
		$('input[name="date_str"]').val(e), $(".poplmsift .travel-date .current, .poplmsift .monthlist .current").removeClass("current"), $(this).addClass("current")
	}
}), $(document).on("click", ".poplmsift .pd-type a", function(t) {
	if (t.preventDefault(), !$(this).hasClass("current")) {
		hide_notice();
		var e = $(this).attr("data") || "";
		$('input[name="product_type"]').val(e), $(".poplmsift .pd-type .current").removeClass("current"), $(this).addClass("current")
	}
}), $(document).on("click", ".poplmsift .dpt a", function(t) {
	if (t.preventDefault(), !$(this).hasClass("current")) {
		hide_notice();
		var e = $(this).attr("data") || "";
		$('input[name="start_pos"]').val(e), $(".poplmsift .dpt .current").removeClass("current"), $(this).addClass("current")
	}
}), $(document).on("click", "#selectmonth2", function() {
	$(this).hasClass("openup") ? ($("#selectmonth_lay2").slideDown(300), $(this).removeClass().addClass("shrink")) : ($("#selectmonth_lay2").slideUp(300), $(this).removeClass().addClass("openup"))
}), $(document).on("click", ".pop_noemial input", function() {
	window.location = "http://user.qyer.com/profile_action_edit"
});
var __lm_subscribe_unvalid = '<div id="unvalid">';
__lm_subscribe_unvalid += '<div class="pop_noemial" style="padding:20px;">', __lm_subscribe_unvalid += '<h3 class="title fontYaHei" style="font-size:18px; line-height:20px;">你还没有验证邮箱</h3>', __lm_subscribe_unvalid += '<p class="text" style="font-size:14px; padding:20px 0 10px;">请先验证邮箱，再设置订阅</p>', __lm_subscribe_unvalid += '<p class="tc"><input type="button" class="ui_buttonB" value="验证邮箱" /></p>', __lm_subscribe_unvalid += "</div></div>";
var __lm_subscribe_unregister = '<div id="unregister">';
__lm_subscribe_unregister += '<div class="pop_noemial" style="padding:20px;">', __lm_subscribe_unregister += '<h3 class="title fontYaHei" style="font-size:18px; line-height:20px;">你还没有注册邮箱</h3>', __lm_subscribe_unregister += '<p class="text" style="font-size:14px; padding:20px 0 10px;">请先填写邮箱，验证后再设置订阅</p>', __lm_subscribe_unregister += '<p class="tc"><input type="button" class="ui_buttonB" value="填写邮箱" /></p>', __lm_subscribe_unregister += "</div></div>";
! function() {
	function t(t) {
		return t.replace(g, "").replace($, ",").replace(x, "").replace(y, "").replace(w, "").split(C)
	}

	function e(t) {
		return "'" + t.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
	}

	function i(i, a) {
		function n(t) {
			return h += t.split(/\n/).length - 1, d && (t = t.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), t && (t = b[1] + e(t) + b[2] + "\n"), t
		}

		function o(e) {
			var i = h;
			if (c ? e = c(e, a) : s && (e = e.replace(/\n/g, function() {
					return h++, "$line=" + h + ";"
				})), 0 === e.indexOf("=")) {
				var n = u && !/^=[=#]/.test(e);
				if (e = e.replace(/^=[=#]?|[\s;]*$/g, ""), n) {
					var o = e.replace(/\s*\([^\)]+\)/, "");
					p[o] || /^(include|print)$/.test(o) || (e = "$escape(" + e + ")")
				} else e = "$string(" + e + ")";
				e = b[1] + e + b[2]
			}
			return s && (e = "$line=" + i + ";" + e), _(t(e), function(t) {
				if (t && !m[t]) {
					var e;
					e = "print" === t ? $ : "include" === t ? x : p[t] ? "$utils." + t : f[t] ? "$helpers." + t : "$data." + t, y += t + "=" + e + ",", m[t] = !0
				}
			}), e + "\n"
		}
		var s = a.debug,
			r = a.openTag,
			l = a.closeTag,
			c = a.parser,
			d = a.compress,
			u = a.escape,
			h = 1,
			m = {
				$data: 1,
				$filename: 1,
				$utils: 1,
				$helpers: 1,
				$out: 1,
				$line: 1
			},
			v = "".trim,
			b = v ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
			g = v ? "$out+=text;return $out;" : "$out.push(text);",
			$ = "function(){var text=''.concat.apply('',arguments);" + g + "}",
			x = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + g + "}",
			y = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (s ? "$line=0," : ""),
			w = b[0],
			C = "return new String(" + b[3] + ");";
		_(i.split(r), function(t) {
			t = t.split(l);
			var e = t[0],
				i = t[1];
			1 === t.length ? w += n(e) : (w += o(e), i && (w += n(i)))
		});
		var j = y + w + C;
		s && (j = "try{" + j + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + e(i) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
		try {
			var k = new Function("$data", "$filename", j);
			return k.prototype = p, k
		} catch (D) {
			throw D.temp = "function anonymous($data,$filename) {" + j + "}", D
		}
	}
	var a = function(t, e) {
		return "string" == typeof e ? v(e, {
			filename: t
		}) : s(t, e)
	};
	a.version = "3.0.0", a.config = function(t, e) {
		n[t] = e
	};
	var n = a.defaults = {
			openTag: "<%",
			closeTag: "%>",
			escape: !0,
			cache: !0,
			compress: !1,
			parser: null
		},
		o = a.cache = {};
	a.render = function(t, e) {
		return v(t, e)
	};
	var s = a.renderFile = function(t, e) {
		var i = a.get(t) || m({
			filename: t,
			name: "Render Error",
			message: "Template not found"
		});
		return e ? i(e) : i
	};
	a.get = function(t) {
		var e;
		if (o[t]) e = o[t];
		else if ("object" == typeof document) {
			var i = document.getElementById(t);
			if (i) {
				var a = (i.value || i.innerHTML).replace(/^\s*|\s*$/g, "");
				e = v(a, {
					filename: t
				})
			}
		}
		return e
	};
	var r = function(t, e) {
			return "string" != typeof t && (e = typeof t, "number" === e ? t += "" : t = "function" === e ? r(t.call(t)) : ""), t
		},
		l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		},
		c = function(t) {
			return l[t]
		},
		d = function(t) {
			return r(t).replace(/&(?![\w#]+;)|[<>"']/g, c)
		},
		u = Array.isArray || function(t) {
			return "[object Array]" === {}.toString.call(t)
		},
		h = function(t, e) {
			var i, a;
			if (u(t))
				for (i = 0, a = t.length; a > i; i++) e.call(t, t[i], i, t);
			else
				for (i in t) e.call(t, t[i], i)
		},
		p = a.utils = {
			$helpers: {},
			$include: s,
			$string: r,
			$escape: d,
			$each: h
		};
	a.helper = function(t, e) {
		f[t] = e
	};
	var f = a.helpers = p.$helpers;
	a.onerror = function(t) {
		var e = "Template Error\n\n";
		for (var i in t) e += "<" + i + ">\n" + t[i] + "\n\n";
		"object" == typeof console && console.error(e)
	};
	var m = function(t) {
			return a.onerror(t),
				function() {
					return "{Template Error}"
				}
		},
		v = a.compile = function(t, e) {
			function a(i) {
				try {
					return new l(i, r) + ""
				} catch (a) {
					return e.debug ? m(a)() : (e.debug = !0, v(t, e)(i))
				}
			}
			e = e || {};
			for (var s in n) void 0 === e[s] && (e[s] = n[s]);
			var r = e.filename;
			try {
				var l = i(t, e)
			} catch (c) {
				return c.filename = r || "anonymous", c.name = "Syntax Error", m(c)
			}
			return a.prototype = l.prototype, a.toString = function() {
				return l.toString()
			}, r && e.cache && (o[r] = a), a
		},
		_ = p.$each,
		b = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
		g = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
		$ = /[^\w$]+/g,
		x = new RegExp(["\\b" + b.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
		y = /^\d[^,]*|,\d[^,]*/g,
		w = /^,+|,+$/g,
		C = /^$|,+/;
	"function" == typeof define ? define("template", [], function() {
		return a
	}) : "undefined" != typeof exports ? module.exports = a : this.template = a
}(), define("common/models/basic/js/require-css", [], function() {
	function t(t, e) {
		if (r) {
			if (0 == e.indexOf("common") || 0 == e.indexOf("project")) {
				var i = t.lastIndexOf("/") + 1;
				t = t.substr(0, i) + t.substr(i), i = null
			}
		} else t += "?v=" + window.__qRequire__.version;
		return t
	}
	if ("undefined" == typeof window) return {
		load: function(t, e, i) {
			i()
		}
	};
	var e = document.getElementsByTagName("head")[0],
		i = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)/) || 0,
		a = !1,
		n = !0;
	i[1] || i[7] ? a = parseInt(i[1]) < 6 || parseInt(i[7]) <= 9 : i[2] ? n = !1 : i[4] && (a = parseInt(i[4]) < 18);
	var o, s = {},
		r = !0;
	window.__qRequire__ && window.__qRequire__.version && (r = !1), r || -1 == window.location.href.indexOf("__qJSDebug__=true") || (r = !0);
	var l = function() {
			o = document.createElement("style"), e.appendChild(o)
		},
		c = function(e, i, a) {
			if (window.__qRequire__ && window.__qRequire__.combineCSS && window.__qRequire__.combineCSS.length)
				for (var n = 0, s = window.__qRequire__.combineCSS.length; s > n; n++)
					if (window.__qRequire__.combineCSS[n] == a) return i();
			e = t(e, a), l();
			var r = o.styleSheet || o.sheet;
			if (r && r.addImport) r.addImport(e), o.onload = i;
			else {
				o.textContent = '@import "' + e + '";';
				var c = setInterval(function() {
					try {
						o.sheet.cssRules, clearInterval(c), i()
					} catch (t) {}
				}, 10)
			}
		},
		d = function(i, a, o) {
			if (window.__qRequire__ && window.__qRequire__.combineCSS && window.__qRequire__.combineCSS.length)
				for (var s = 0, r = window.__qRequire__.combineCSS.length; r > s; s++)
					if (window.__qRequire__.combineCSS[s] == o) return a();
			i = t(i, o);
			var l = document.createElement("link");
			if (l.type = "text/css", l.rel = "stylesheet", n) l.onload = function() {
				l.onload = function() {}, setTimeout(a, 7)
			};
			else var c = setInterval(function() {
				for (var t = 0; t < document.styleSheets.length; t++) {
					var e = document.styleSheets[t];
					if (e.href == l.href) return clearInterval(c), a()
				}
			}, 10);
			l.href = i, e.appendChild(l)
		};
	return s.normalize = function(t, e) {
		return ".css" == t.substr(t.length - 4, 4) && (t = t.substr(0, t.length - 4)), e(t)
	}, s.load = function(t, e, i, n) {
		(a ? c : d)(e.toUrl(t + ".css"), i, t)
	}, s
}), define("common/models/common/ui/pages/pages", ["css!common/models/common/ui/pages/pages.css"], function() {
	function t(t) {
		this.init(t)
	}
	return t.prototype = {
		container: null,
		pageCount: 15,
		allCount: 1,
		curNum: 1,
		preCountNum: 5,
		nextCountNum: 5,
		preLabel: "上一页",
		nextLabel: "下一页",
		anchor: "",
		idxIpg: "",
		preIpg: "",
		nextIpg: "",
		pageIpg: "",
		init: function(t) {
			$.extend(this, t), this.dom = $(this.container), this.setPageNum(), this.render(), this.bindEvent()
		},
		bindEvent: function() {
			var t = this;
			this.dom.undelegate("a", "click").delegate("a", "click", function() {
				var e = $(this).attr("data-idx");
				"pre" == e ? t.pre() : "next" == e ? t.next() : t.reset(e)
			})
		},
		pre: function() {
			this.curNum > 1 && this.reset(this.curNum - 1)
		},
		next: function() {
			this.curNum < this.pageNum && this.reset(this.curNum + 1)
		},
		reset: function(t) {
			this.curNum = t - 0, this.render(), $(this).trigger("firepage", this.curNum)
		},
		getPreHtml: function() {
			return 1 == this.curNum ? "" : '<a href="' + this.getAnchor() + '" data-idx="pre" class="ui_page_item ui_page_prev" data-bn-ipg="' + this.preIpg + '">上一页</a>'
		},
		getPreContentHtml: function() {
			var t = [];
			if (this.curNum - this.preCountNum > 1) {
				t.push('<a href="' + this.getAnchor() + '" class="ui_page_item" data-idx="1" >1 ...</a>');
				for (var e = this.curNum - this.preCountNum + 1; e <= this.curNum; e++) t.push('<a href="' + this.getAnchor() + '" class="ui_page_item ' + (this.curNum == e ? "ui_page_item_current" : "") + '" data-idx="' + e + '" data-bn-ipg="' + this.pageIpg + '">' + e + "</a>")
			} else
				for (var e = 1; e <= this.curNum; e++) t.push('<a href="' + this.getAnchor() + '" class="ui_page_item ' + (this.curNum == e ? "ui_page_item_current" : "") + '" data-idx="' + e + '" data-bn-ipg="' + this.pageIpg + '">' + e + "</a>");
			return t
		},
		getNextCountHtml: function() {
			var t = [];
			if (this.curNum + this.nextCountNum > this.pageNum)
				for (var e = this.curNum + 1; e <= this.pageNum; e++) t.push('<a href="' + this.getAnchor() + '" class="ui_page_item" data-idx="' + e + '" data-bn-ipg="' + this.pageIpg + '">' + e + "</a>");
			else {
				for (var e = this.curNum + 1; e <= this.curNum + this.nextCountNum - 1; e++) t.push('<a href="' + this.getAnchor() + '" class="ui_page_item" data-idx="' + e + '" data-bn-ipg="' + this.pageIpg + '">' + e + "</a>");
				t.push(this.curNum + this.nextCountNum == this.pageNum ? '<a href="' + this.getAnchor() + '" class="ui_page_item" data-idx="' + this.pageNum + '" data-bn-ipg="' + this.pageIpg + '">' + this.pageNum + "</a>" : '<a href="' + this.getAnchor() + '" class="ui_page_item" data-idx="' + this.pageNum + '" data-bn-ipg="' + this.pageIpg + '">...' + this.pageNum + "</a>")
			}
			return t
		},
		getContentHtml: function() {
			var t = [];
			return t = t.concat(this.getPreContentHtml()), t = t.concat(this.getNextCountHtml()), t.join("")
		},
		getNextHtml: function() {
			return this.curNum == this.pageNum ? "" : '<a href="' + this.getAnchor() + '" data-idx="next" class="ui_page_item ui_page_next" data-bn-ipg="' + this.nextIpg + '">下一页</a>'
		},
		getAnchor: function() {
			return "" != this.anchor ? "#" + this.anchor : "javascript:;"
		},
		getHtml: function() {
			var t = '<div class="ui_page">';
			return t += this.getPreHtml(), t += this.getContentHtml(), t += this.getNextHtml(), t += "</div>"
		},
		setPageCount: function(t) {
			this.pageCount = t - 0, this.setPageNum()
		},
		setAllCount: function(t) {
			this.allCount = t - 0, this.setPageNum()
		},
		getCurNum: function() {
			return parseInt($(this.dom).find(".ui_page_item_current").attr("data-idx"), 10)
		},
		setCurNum: function(t) {
			this.curNum = t - 0
		},
		setPageNum: function() {
			this.pageNum = Math.ceil(this.allCount / this.pageCount)
		},
		show: function() {
			this.dom.show()
		},
		hide: function() {
			this.dom.hide()
		},
		destroy: function() {
			this.dom.children().remove()
		},
		render: function() {
			var t = this.getHtml();
			this.dom.html(t)
		}
	}, t
}), define("common/models/common/ui/share/share", ["css!common/models/common/ui/share/share.css"], function() {
	function t(t) {
		var e = {
				appkey: {
					tsina: "2254065920",
					tqq: "fae7e432cbfd4ae378f0e501ebb4feed",
					renren: "d5ecb574cf7e4ef7a3840898aab6fe4f",
					qzone: "fae7e432cbfd4ae378f0e501ebb4feed",
					douban: "0239fb1e9a36072606adf15bcea21572"
				}
			},
			i = $(t),
			a = i.parent();
		title = i.attr("data-title") || a.attr("data-title"), summary = i.attr("data-summary") || a.attr("data-summary"), pic = i.attr("data-pic") || a.attr("data-pic"), url = i.attr("data-url") || a.attr("data-url"), "undefined" != typeof title && (e.title = title), "undefined" != typeof summary && (e.summary = summary), "undefined" != typeof pic && (e.pic = pic), "undefined" != typeof url && (e.url = url), window.jiathis_config = e
	}
	return function() {
		var e = ['<div id="jiathisShadowLayer">', '<div class="jiathis_style">', '<a class="jiathis_button_tsina"></a>', '<a class="jiathis_button_tqq"></a>', '<a class="jiathis_button_qzone"></a>', '<a class="jiathis_button_renren"></a>', '<a class="jiathis_button_douban"></a>', '<a class="jiathis_button_weixin"></a>', "</div>", "</div>"].join("");
		$("body").append(e), e = null;
		var i = $("#jiathisShadowLayer");
		$.getScript("http://v3.jiathis.com/code/jia.js", function() {
			$(document).on("mousedown", ".qui-iconShares > a", function() {
				t(this)
			}), $(document).on("click", ".qui-iconShares > a", function() {
				var t = $(this).attr("class");
				i.find(".jiathis_button_" + t).trigger("click"), t = null
			})
		})
	}(), {
		trigger: function(t, e) {
			window.jiathis_config = "object" == typeof e ? e : {}, $("#jiathisShadowLayer").find(".jiathis_button_" + t).trigger("click")
		}
	}
}), define("common/models/common/ui/lmDatailCalendar/lmDatailCalendar", ["css!common/models/common/ui/lmDatailCalendar/lmDatailCalendar.css"], function() {
	function t(t, i) {
		this.el = t, this.ajaxStatus = null, this.option = {
			url: null,
			width: "100%",
			pid: "",
			inputData: null,
			cardsPerScreen: 4,
			onPrev: function(t) {},
			onNext: function(t) {},
			onShow: function(t) {},
			onError: function(t) {},
			onFresh: function(t) {},
			onEnableTdClick: function(t) {},
			onDisableTdClick: function(t) {}
		}, e.extend(this.option, i), this.html = "", this.init()
	}
	var e = jQuery;
	t.prototype = {
		currentYear: null,
		currentMonth: null,
		currentDate: null,
		jsonData: null,
		clickStatus: !0,
		lmDatailCalendar: null,
		calendarTab: null,
		activeTd: null,
		activeFullDate: null,
		calendarTds: null,
		cardUl: null,
		cards: null,
		activeCard: null,
		cardsLength: null,
		btn_prev: null,
		btn_next: null,
		init: function() {
			this.setHtml(), this.buildCalendar()
		},
		redrawCalendar: function(t) {
			e.extend(this.option, t), this.el.empty(), this.init()
		},
		setHtml: function() {
			this.html = ['<div class="lmDatailCalendar" style="width:' + this.option.width + '">', '<div id="calendarMask" style="width:100%;height:100%;position:absolute;text-align:center;z-index:10;display:none;"><img src="http://static.qyer.com/models/common/ui/lmDatailCalendar/loading_big.gif" style="position:relative;top:50%;transform:translateY(-50%);" /></div>', '<div class="card-unit">', '<a href="javascript:void(0);" class="card-btn prev" data-canClick="true" style="display:none;"></a>', '<div class="card-wrap">', '<ul class="card-cell clearfix"></ul>', "</div>", '<a href="javascript:void(0);" class="card-btn next" data-canClick="true" style="display:none;"></a>', "</div>", '<div class="table-unit">', '<table class="calendarTab-head">', "<tr>", '<td class="blank"></td>', "<td>日</td>", "<td>一</td>", "<td>二</td>", "<td>三</td>", "<td>四</td>", "<td>五</td>", "<td>六</td>", '<td class="blank"></td>', "</tr>", "</table>", '<div class="calendarTab-wrap">', '<table class="calendarTab">', "<tbody></tbody>", "</table>", "</div>", "</div>", "</div>"].join(""), this.el.append(this.html);
			for (var t = this.el.find(".calendarTab tbody"), i = 0; 6 > i; i++) {
				for (var a = e("<tr" + (5 == i ? ' style="display:none;"' : "") + "></tr>"), n = 0; 7 > n; n++) {
					var o = ["<td>", '<div class="cal-cont-Warp">', '<p class="cal-date"></p>', '<p class="cal-price"></p>', '<p class="cal-dec"></p>', "</div>", "</td>"].join("");
					a.append(o)
				}
				t.append(a)
			}
		},
		categoryAjax: function(t) {
			t.posturl = this.option.url, this.ajaxStatus = qyerUtil.doAjax(t)
		},
		do_categoryAjax: function(t) {
			var i = this;
			this.ajaxStatus && this.ajaxStatus.abort(), t ? (i.jsonData = aJSON.data, i.completeCalendar(aJSON.data), i.hideMask()) : this.categoryAjax({
				data: {
					pid: i.option.pid
				},
				__qFED__: {
					id: "4cf5c49-5765-e82a-2025-7c381acd2552",
					dataIndex: 0
				},
				onSuccess: function(t) {
					"ok" == t.result && 0 == t.error_code ? (i.jsonData = t.data, i.completeCalendar(t.data)) : (i.el.find(".lmDatailCalendar").hide(), e.isFunction(i.option.onError) && i.option.onError.call(i.el, t.data)), i.hideMask()
				},
				onError: function(t) {
					i.hideMask(), t.__server_error__ ? "abort" != t.__server_status__ && i.showTip("服务器错误，请稍后再试！") : i.showTip(t.data.msg || t.data), i.el.find(".lmDatailCalendar").hide(), e.isFunction(i.option.onError) && i.option.onError.call(i.el, t)
				}
			})
		},
		buildCalendar: function() {
			this.showMask(), this.option.inputData ? this.do_categoryAjax(this.option.inputData) : this.do_categoryAjax()
		},
		createCard: function(t) {
			var i, a, n, o, s, r, l;
			i = this, a = this.el.find(".lmDatailCalendar"), n = a.find(".card-cell"), o = 0, s = !1, e.each(t, function(t, a) {
				var l, c;
				if (c = t.replace(/[\-]/, "年") + "月", l = e('<li class="single-card" data-date="' + t + '">' + c + "</li>"), !s)
					for (var d = 0, u = a.length; u > d; d++)
						if (1 != parseInt(a[d].expired, 10) && parseInt(a[d].stock, 10) > 0) {
							s = !0, r = o, l.addClass("active"), i.activeCard = l;
							break
						}
				n.append(l), o += 1, l = c = null
			}), o > 4 ? (this.initActiveCard(n, r), a.find(".card-btn").show()) : a.find(".card-btn").hide(), this.cardsLength = o, a = n = o = r = s = l = null
		},
		initActiveCard: function(t, e) {
			var i, a, n;
			i = t.find("li").outerWidth(!0) * this.option.cardsPerScreen, a = t.position().left, n = Math.floor(e / this.option.cardsPerScreen), t.css({
				left: a - i * n
			}), i = a = n = null
		},
		get_calendarDay: function() {
			var t = new Date(this.currentYear, this.currentMonth - 1, 1);
			return t.getDay()
		},
		get_calendarDays: function() {
			var t = new Date(this.currentYear, this.currentMonth, 1);
			return t.setDate(t.getDate() - 1), t.getDate()
		},
		get_trLength: function(t, e) {
			return Math.ceil((t + e) / 7)
		},
		resetTds: function(t) {
			var i = ["data-date", "data-price", "data-stock", "data-days", "data-cid", "data-house_type", "data-house_diff", "data-expired", "data-already_buy", "data-limit"];
			t.each(function(t) {
				var a = e(this);
				a.removeClass("has-item disable active"), a.find(".cal-date").text(""), a.find(".cal-price").text(""), a.find(".cal-dec").removeClass("less").text("");
				for (var n = 0; n < i.length; n++) a.removeAttr(i[n])
			})
		},
		fillTableContent: function(t) {
			var i, a, n, o, s, r, l;
			i = this, a = this.activeCard.attr("data-date"), n = a.split(/[\-\/]/gi), o = t[a], this.currentYear = parseInt(n[0], 10), this.currentMonth = parseInt(n[1], 10), this.currentDate = parseInt(a + "-01", 10), s = this.get_calendarDay(), r = this.get_calendarDays(), l = this.get_trLength(s, r), this.calendarTab.find("tr").hide().filter(":lt(" + l + ")").show(), this.calendarTds.each(function(t) {
				var n = e(this);
				if (i.resetTds(n), s > t);
				else if (s + r > t) {
					var l = t - s + 1;
					n.attr("data-fulldate", a + "-" + (l > 9 ? l : "0" + l)), n.find(".cal-date").text(l);
					for (var c = 0; c < o.length; c++) parseInt(o[c].date, 10) == l && (n.addClass("has-item"), e.each(o[c], function(t, e) {
						"price" == t && n.find(".cal-price").text("¥" + e), n.attr("data-" + t, e)
					}), o[c].stock <= 0 ? (n.find(".cal-dec").text("已售罄"), n.addClass("disable")) : 1 == o[c].expired ? (n.find(".cal-dec").text("已结束"), n.addClass("disable")) : o[c].stock <= 5 ? n.find(".cal-dec").addClass("less").text("余" + o[c].stock) : n.find(".cal-dec").text(o[c].stock >= 9999 ? "充足" : "余" + o[c].stock))
				}
			}), this.hideMask(), this.activeCard.index() <= 0 ? (this.btn_prev.addClass("disable"), this.clickStatus = -1) : (this.btn_prev.removeClass("disable"), 1 != this.clickStatus && (this.clickStatus = 0)), this.activeCard.index() >= this.cardsLength - 1 ? (this.btn_next.addClass("disable"), this.clickStatus = 1) : (this.btn_next.removeClass("disable"), -1 != this.clickStatus && (this.clickStatus = 0)), i = a = n = o = s = r = l = null
		},
		resetActiveTd: function() {
			this.activeFullDate = null
		},
		completeCalendar: function(t) {
			this.createCard(t), this.resetActiveTd(), this.initDom(), this.afertBuildCalendar(t)
		},
		initDom: function() {
			this.lmDatailCalendar = this.el.find(".lmDatailCalendar"), this.btn_prev = this.lmDatailCalendar.find(".prev"), this.btn_next = this.lmDatailCalendar.find(".next"), this.cardUl = this.lmDatailCalendar.find(".card-cell"), this.cards = this.lmDatailCalendar.find(".card-cell .single-card"), this.calendarTab = this.lmDatailCalendar.find(".calendarTab"), this.calendarTds = this.calendarTab.find("td")
		},
		afertBuildCalendar: function(t) {
			this.fillTableContent(t), this.bindEvent(), e.isFunction(this.option.onShow) && this.option.onShow.call(this.el, this.jsonData)
		},
		freshCalendar: function() {
			this.showMask(), this.fillTableContent(this.jsonData), this.setActiveTd(), e.isFunction(this.option.onFresh) && this.option.onFresh.call(this.el, this.lmDatailCalendar)
		},
		bindEvent: function() {
			var t = this;
			this.btn_prev.on("click", function(e) {
				t.click_prev(this)
			}), this.btn_next.on("click", function(e) {
				t.click_next(this)
			}), this.cards.on("click", function(e) {
				t.click_card(this)
			}), this.calendarTds.on("click", function(e) {
				t.click_calendarTds(this)
			})
		},
		click_prev: function(t) {
			var i, a, n;
			i = e(t), this.clickStatus <= -1 || (n = this.activeCard.prev(), this.activeCard.removeClass("active"), this.activeCard = n.addClass("active"), a = this.activeCard.index(), (a + 1) % this.option.cardsPerScreen == 0 && this.slideCard(a, Math.floor((a + 1) / this.option.cardsPerScreen)), this.freshCalendar(), e.isFunction(this.option.onPrev) && this.option.onPrev.call(this.el, i), i = a = n = null)
		},
		click_next: function(t) {
			var i, a, n;
			i = e(t), this.clickStatus >= 1 || (n = this.activeCard.next(), this.activeCard.removeClass("active"), this.activeCard = n.addClass("active"), a = this.activeCard.index(), a % this.option.cardsPerScreen == 0 && this.slideCard(a, Math.floor(a / this.option.cardsPerScreen)), this.freshCalendar(), e.isFunction(this.option.onNext) && this.option.onNext.call(this.el, i), i = a = n = null)
		},
		click_card: function(t) {
			var i = e(t);
			i.is(this.activeCard) || (this.activeCard.removeClass("active"), this.activeCard = i.addClass("active"), this.freshCalendar())
		},
		click_calendarTds: function(t) {
			var i = e(t);
			i.hasClass("has-item") && (i.hasClass("disable") ? e.isFunction(this.option.onDisableTdClick) && this.option.onDisableTdClick.call(this.el, i) : i.hasClass("active") || (this.activeTd && this.activeTd.removeClass("active"), i.addClass("active"), this.activeTd = i, this.activeFullDate = i.attr("data-fulldate"), e.isFunction(this.option.onEnableTdClick) && this.option.onEnableTdClick.call(this.el, i)))
		},
		setActiveTd: function() {
			if (this.activeFullDate) {
				var t = this;
				this.calendarTds.each(function(i) {
					var a = e(this).attr("data-fulldate");
					a && a == t.activeFullDate && e(this).addClass("active"), a = null
				}), t = null
			}
		},
		slideCard: function(t, e) {
			var i, a;
			i = this.cardUl.find("li").outerWidth(!0) * this.option.cardsPerScreen, a = this.cardUl.position().left, this.cardUl.css(t + 1 - this.option.cardsPerScreen * e > 0 ? {
				left: a - i
			} : {
				left: a + i
			}), i = a = null
		},
		showMask: function() {
			e("#calendarMask").show()
		},
		hideMask: function() {
			e("#calendarMask").hide()
		},
		showTip: function(t, e) {
			requirejs(["common/models/common/ui/tip/tip"], function(i) {
				i.tip({
					text: t,
					type: e || "error"
				})
			})
		},
		showCal: function(t) {
			t ? this.el.find(".lmDatailCalendar").fadeIn(t) : this.el.find(".lmDatailCalendar").show()
		},
		hideCal: function(t) {
			t ? this.el.find(".lmDatailCalendar").fadeOut(t) : this.el.find(".lmDatailCalendar").hide()
		}
	}, jQuery.fn.extend({
		lmDatailCalendar: function(i, a, n) {
			if ("object" == typeof i || "undefined" == typeof i) this.each(function(a) {
				var n = e(this);
				this.__lmDatailCalendar__ ? this.__lmDatailCalendar__.redrawCalendar(i) : this.__lmDatailCalendar__ = new t(n, i)
			});
			else if ("string" == typeof i) {
				var o = ["showCal", "hideCal"];
				return -1 != o.toString().indexOf(i) && this.each(function(t) {
					this.__lmDatailCalendar__[i](a, n)
				}), this
			}
		}
	})
}), define("common/models/common/ui/popup/popup", ["css!common/models/common/ui/popup/popup.css"], function() {
	var t = jQuery,
		e = {
			$ui: null,
			$content: null,
			$box: null,
			$title: null,
			$okBtn: null,
			$cancelBtn: null,
			$loadBtn: null,
			$closeIcon: null,
			_uiState: "normal",
			defaultWidth: 400,
			init: function() {
				var e = ['<div class="qui-popup" style="display:none">', "<div>", '<div class="qui-popup-dt">', '<div class="qui-popup-box">', '<div class="qui-popup-closeIcon">&nbsp;</div>', '<div class="qui-popup-box-title fontYaHei">title</div>', '<div class="qui-popup-box-content">', "</div>", '<div class="qui-popup-box-bottom">', "&nbsp;", '<input class="qui-popup-cancelBtn ui_button_cancel" type="button" value="取消" />  ', '<input class="qui-popup-okBtn ui_button" type="button" value="确定" />  ', '<input class="qui-popup-loadingBtn  ui_button_load" type="button" value="" />  ', "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
				this.$ui = t(e), this.$content = this.$ui.find(".qui-popup-box-content"), this.$box = this.$ui.find(".qui-popup-box"), this.$title = this.$ui.find(".qui-popup-box-title"), this.$okBtn = this.$ui.find(".qui-popup-okBtn"), this.$cancelBtn = this.$ui.find(".qui-popup-cancelBtn"), this.$loadBtn = this.$ui.find(".qui-popup-loadingBtn"), this.$closeIcon = this.$ui.find(".qui-popup-closeIcon"), this.$ui.appendTo(document.body)
			},
			setWidth: function(t) {
				this.$box.animate({
					width: t
				}, 300)
			},
			setUIDefault: function(t) {
				this.$ui[0].className = "qui-popup", t.exClassName && this.$ui.addClass(t.exClassName), this.$content.html(t.iframeSrc ? '<iframe src="' + t.iframeSrc + '"  scrolling="auto" style="height:' + (t.iframeHeight || 300) + 'px;"  />' : t.contentHTML || "&nbsp;"), this.$title.html(t.title || "Title"), this.$box.css("width", t.width || this.defaultWidth), this.$title[t.showTitle === !1 ? "hide" : "show"](), this.$okBtn.val(t.okText || "确定"), this.$cancelBtn.val(t.cancelText || "取消"), this.$okBtn[t.showOKBtn === !1 ? "hide" : "show"](), this.$okBtn.removeAttr("data-bn-ipg"), this.$cancelBtn[t.showCancelBtn === !1 ? "hide" : "show"](), this.$cancelBtn.removeAttr("data-bn-ipg"), this.$loadBtn[t.showLoadBtn === !0 ? "show" : "hide"](), this.$loadBtn.removeAttr("data-bn-ipg"), this.$ui.find(".qui-popup-closeIcon").removeAttr("data-bn-ipg"), this.$closeIcon[t.showCloseIcon === !1 ? "hide" : "show"]()
			},
			show: function(i) {
				if ("hideing" == e._uiState) e.$box.stop(), e.$ui.stop(), this.$ui.css({
					display: "block",
					opacity: 1
				}), this.$box.css({
					top: 0,
					opacity: 1
				}), e._uiState = "normal", i.onShow && i.onShow();
				else {
					e._uiState = "showing";
					var a = {},
						n = {
							top: 0
						};
					t.support.leadingWhitespace && (a.opacity = 1, n.opacity = 1), this.$ui.css("display", "block").animate(a, 200, function() {
						e.$box.css("top", -30).animate(n, 200, function() {
							e._uiState = "normal", i.onShow && i.onShow()
						})
					})
				}
			},
			hide: function(i) {
				if (!i || !i.onBeforeHide || i.onBeforeHide() !== !1) {
					e._uiState = "hideing";
					var a = {
							top: -30
						},
						n = {};
					t.support.leadingWhitespace && (a.opacity = 0, n.opacity = 0), this.$box.animate(a, 200, function() {
						e.$ui.animate(n, 200, function() {
							e._uiState = "normal", e.$ui.css("display", "none"), e.$content.html(""), i && i.onAfterHide && i.onAfterHide()
						})
					})
				}
			}
		};
	e.init();
	var i = null,
		a = {
			show: function(t) {
				return i = t, e.setUIDefault(t), e.$ui.undelegate("click").delegate(".qui-popup-okBtn,.qui-popup-cancelBtn,.qui-popup-closeIcon", "click", function(i) {
					if (-1 != this.className.indexOf("qui-popup-closeIcon") || -1 != this.className.indexOf("qui-popup-cancelBtn")) {
						if (t.onBeforeCancel && !t.onBeforeCancel(i)) return;
						t.onCancel && t.onCancel()
					} else if (-1 != this.className.indexOf("qui-popup-okBtn") && t.onOK && t.onOK() === !1) return;
					e.hide(t)
				}), e.show(t), this
			},
			hide: function() {
				return e.hide(), this
			},
			setContent: function(t) {
				return e.$content.html(t), this
			},
			getContent: function() {
				return e.$content[0]
			},
			getButtons: function() {
				return {
					okBtn: e.$okBtn[0],
					cancelBtn: e.$cancelBtn[0],
					loadBtn: e.$loadBtn[0],
					closeIcon: e.$ui.find(".qui-popup-closeIcon")[0]
				}
			},
			setOption: function(a) {
				var n = {
					width: function() {
						e.setWidth(a.width)
					},
					showTitle: function() {
						a.showTitle === !1 ? e.$title.hide() : e.$title.show()
					},
					okText: function() {
						e.$okBtn.val(a.okText)
					},
					cancelText: function() {
						e.$cancelBtn.val(a.cancelText)
					},
					showOKBtn: function() {
						a.showOKBtn === !1 ? e.$okBtn.hide() : e.$okBtn.show()
					},
					showCancelBtn: function() {
						a.showCancelBtn === !1 ? e.$cancelBtn.hide() : e.$cancelBtn.show()
					},
					showLoadBtn: function() {
						a.showLoadBtn === !1 ? e.$loadBtn.hide() : e.$loadBtn.show()
					},
					showCloseIcon: function() {
						a.showCloseIcon === !1 ? e.$closeIcon.hide() : e.$closeIcon.show()
					},
					title: function() {
						e.$title.html(a.title)
					},
					exClassName: function() {
						e.$ui[0].className = "qui-popup " + a.exClassName
					},
					contentHTML: function() {
						a.iframeSrc || e.$content.html(a.contentHTML)
					},
					iframeSrc: function() {
						e.$content.html('<iframe src="' + a.iframeSrc + '"  scrolling="auto" style="height:' + (a.iframeHeight || 300) + 'px;" />')
					},
					iframeHeight: function() {
						e.$content.children("iframe").css("height", a.iframeHeight)
					}
				};
				for (var o in a) i[o] = a[o], "function" == t.type(n[o]) && n[o]()
			}
		};
	return a
}), define("common/models/common/ui/inputValidation/inputValidation", ["css!common/models/common/ui/inputValidation/inputValidation.css"], function() {
	function t(t, i) {
		this.$obj = e(t), this.option = i, this.init()
	}
	var e = jQuery;
	t.prototype = {
		$obj: null,
		$textDiv: null,
		option: null,
		init: function() {
			var t = this;
			this.setDefault(), this.option.blurAutoCheck !== !1 && this.$obj.blur(function() {
				t.check()
			}), this.$obj.focus(function() {
				t.clearTip()
			})
		},
		setDefault: function() {
			switch (this.option.defaultType) {
				case "mail":
					this.option.exp = /^([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/, this.option.text = this.option.text || "邮箱地址格式错误";
					break;
				case "phone":
					this.option.exp = /^1[3|4|5|7|8][0-9]\d{4,8}$/, this.option.text = this.option.text || "手机号码格式错误";
					break;
				case "identityID":
					this.option.exp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, this.option.text = this.option.text || "身份证号码格式错误";
					break;
				case "async":
					var t = this;
					this.option.exp = function() {
						return t.$obj.addClass("ui3_input_icon_loading"), t.$obj.removeClass("ui3_input_icon_error ui3_input_icon_ok"), t.option.asyncCheck(t.$obj.val(), function(e) {
							setTimeout(function() {
								t.$obj.removeClass("ui3_input_icon_loading"), e ? (t.option.text = e, t.addTip(), t.$obj.addClass("ui3_input_icon_error")) : t.$obj.addClass("ui3_input_icon_ok")
							}, 10)
						}), !0
					}
			}
		},
		check: function() {
			var t = !1;
			switch (e.type(this.option.exp)) {
				case "regexp":
					this.option.exp.lastIndex = 0, t = this.option.exp.test(this.$obj.val());
					break;
				case "function":
					t = this.option.exp(this.$obj.val())
			}
			return this[t ? "clearTip" : "addTip"](), t
		},
		clearTip: function() {
			this.$obj.removeClass("qui-errorip ui3_input_icon_error"), this.$textDiv && (this.$textDiv.remove(), this.$textDiv = null)
		},
		addTip: function() {
			this.$obj.addClass("qui-errorip"), this.$obj.hasClass("ui3_input") && this.$obj.addClass("ui3_input_icon_error"), this.$textDiv && this.$textDiv.remove();
			var t = "qui-errorip-textDiv" + (this.option.style || "");
			this.$textDiv = e('<div class="' + t + '"><div class="tip"> <p class="a1"></p> <p class="a2"></p> </div> <div class="text">' + this.option.text + "</div> </div>");
			var i = this.$obj[this.option.parent ? "position" : "offset"]();
			if (1 == this.option.style) {
				this.$textDiv.appendTo(this.option.parent || document.body);
				var a = e(this.option.parent || document.body).outerWidth();
				a -= i.left, a -= this.$obj.outerWidth(), a = a - this.$textDiv.outerWidth() / 2 + 16, this.$textDiv.css({
					right: a,
					top: i.top - 25
				})
			} else this.$textDiv.css({
				left: i.left + 10,
				top: i.top + this.$obj.outerHeight() - 1
			}), this.$textDiv.appendTo(this.option.parent || document.body)
		},
		clear: function() {
			this.clearTip()
		}
	}, e.fn.extend({
		qyerInputValidation: function(i) {
			var a, n = !1,
				o = this;
			return e.each(this, function() {
				a = e(this), a.data("__errorTip__") ? "clear" == i ? (n = o, a.data("__errorTip__").clear()) : n = a.data("__errorTip__").check() : a.data("__errorTip__", new t(this, i))
			}), o = null, i ? this : n
		}
	})
}), define("common/models/common/ui/tip/tip", ["css!common/models/common/ui/tip/tip.css"], function() {
	function t(t) {
		a.html(t.text || "&nbsp;"), i[0].className = "qui-tip-box", "error" == t.type ? i.addClass("qui-tip-box-error") : "warning" == t.type && i.addClass("qui-tip-box-warning")
	}
	var e, i, a, n = jQuery;
	! function() {
		var t = ['<div class="qui-tip" style="display:none;" >', '<div class="qui-tip-box">', '<span class="qui-tip-text fontYaHei">这里是提示文本</span>', "</div>", "</div>"].join("");
		e = n(t), a = e.find(".qui-tip-text"), i = e.find(".qui-tip-box"), e.appendTo(document.body)
	}();
	var o = {
		_timer: null,
		tip: function(i) {
			return t(i), e.slideDown(200), window.clearTimeout(this._timer), this._timer = setTimeout(function() {
				e.slideUp(200)
			}, i.time || 3e3), this
		}
	};
	return o
}), $(function() {
	function t() {
		this.ajaxUrl = {
			canlendarUrl: "/index.php?action=ajaxGetCategory",
			collectUrl: "/api.php?action=lmfavor",
			contactInfoUrl: "/api.php?action=lmcontacts",
			remindUrl: "/api.php?action=lm_subscribe_single",
			checkBookUrl: "/ajax.php?action=checkorderformusernum",
			countDownUrl: "/ajax.php?action=getProductStartLeft",
			merchantDealRecordUrl: "/index.php?action=ajaxsellrecord"
		}, this.anchor = [], this.timeout = null, this.timer = null, this.init()
	}
	$("img[width]", ".sub-content").removeAttr("width"), $("img[height]", ".sub-content").removeAttr("height"), Date.prototype.format = function(t) {
		var e = function(t, e) {
			var i = "",
				a = 0 > t,
				n = String(Math.abs(t));
			return n.length < e && (i = new Array(e - n.length + 1).join("0")), (a ? "-" : "") + i + n
		};
		if ("string" != typeof t) return this.toString();
		var i = function(e, i) {
				t = t.replace(e, i)
			},
			a = this.getFullYear(),
			n = this.getMonth() + 1,
			o = this.getDate(),
			s = this.getHours(),
			r = this.getMinutes(),
			l = this.getSeconds();
		return i(/yyyy/g, e(a, 4)), i(/yy/g, e(parseInt(a.toString().slice(2), 10), 2)), i(/MM/g, e(n, 2)), i(/M/g, n), i(/dd/g, e(o, 2)), i(/d/g, o), i(/HH/g, e(s, 2)), i(/H/g, s), i(/hh/g, e(s % 12, 2)), i(/h/g, s % 12), i(/mm/g, e(r, 2)), i(/m/g, r), i(/ss/g, e(l, 2)), i(/s/g, l), t
	}, myContact = myContact || "", t.prototype = {
		activeType: $(".right-operate .unit-nr .type-list li.active"),
		activeNavLi: $(".detail-nav .nav-unit li.active"),
		ajaxStatus: !0,
		moreArrow: $(".more"),
		calData: {
			price: 0,
			cid: "",
			adult: 0,
			already_buy: 0,
			limit: 0,
			children: 0,
			house_type: 0,
			house_diff: 0,
			expired: 1
		},
		hiddenData: {
			totalPrice: 0,
			cid: "",
			room_offset: 0,
			adult: 0,
			children: 0,
			rooms: 0
		},
		valueObj: {
			price: $(".booking-unit .price-unit .price em"),
			floatPrice: $(".detail-nav .nav-right .nav-price em"),
			adult: $("#num-adult"),
			children: $("num-children"),
			room: $("#num-room"),
			singleRoomOffset: $(".single-room-offset"),
			hidden_cid: $("#cid"),
			hidden_pid: $("#pid"),
			hidden_price: $("#price"),
			hidden_roomOffset: $("#room-offset"),
			hidden_adult: $("#sum"),
			hidden_children: $("#children"),
			hidden_rooms: $("#rooms"),
			hidden_name: $("#name"),
			hidden_phone: $("#phone"),
			hidden_email: $("#email"),
			hidden_wechat: $("#wechat")
		},
		init: function() {
			var t = this;
			t.setAnchor(), this.valueObj.hidden_pid.val(this.activeType.attr("data-pid")), this.showLookMore(), this.imgScroll(), this.share(), this.appPromotion(), this.customView(), this.firstShowCalendar(), this.setContact(myContact), this.bindEvent()
		},
		bindEvent: function() {
			var t = this;
			$(".type-list li").on("click", function(e) {
				t.click_type(this)
			}), $(".look-more-btn").on("click", function(e) {
				t.click_lookMore(this)
			}), $(".detail-nav .nav-unit li").on("click", function(e) {
				t.cick_nav(this)
			}), $(".tools li.sc").on("click", function(e) {
				t.click_collect(this)
			}), $(".tools li.tx").on("click", function(e) {
				t.click_contactInfo(this)
			}), $(".num-p").on("click", ".minus,.add", function(e) {
				t.click_compute(this);

			}).on("input", ".num-input", function(e) {
				t.change_number(this)
			}), $(".nav-book").on("click", function(e) {
				t.click_navBook(this)
			}), $(".remind").on("click", function(e) {
				t.click_remind(this)
			}), $("#booking").on("click", function(e) {
				t.click_bookSubmit(this)
			}), $(".recommend .recomm-text .more").on("click", function(e) {
				t.click_morelight(this)
			}), $(".notice-close").on("click", function(e) {
				t.click_noticeClose(this)
			}), $(window).on("scroll", function(e) {
				t.window_scroll()
			}), $("li:not(.hotel-default)", ".jd-cell-pic > .img-thumb").hover(function() {
				$("li", ".jd-cell-pic > .img-thumb").removeClass("active"), $(this).addClass("active"), $(this).parent().prev(".img-large").attr("src", $("img", this).attr("src"))
			}), $("button", ".sxcl .cl-type > li").on("click", function() {
				var t = $(this);
				$("button", ".sxcl .cl-type > li").removeClass("active"), t.addClass("active"), $(".cl-content:visible", ".sxcl").fadeOut(300, function() {
					$(".cl-content." + t.data("cl-type"), ".sxcl").fadeIn(300)
				})
			}), $(".cl-content:first", ".sxcl").show(), $(".promotion-getapp", ".promotion").hover(function() {
				$(".promotion-tip", ".promotion").toggle()
			}), this.setMerchantDealRecordPager()
		},
		setMerchantDealRecordPager: function() {
			var t = this,
				e = ["<% for(var i in data){ %>", "<tr>", "<td><%=data[i].name%></td>", "<td>", '<p class="product-name need-dots">', "<%=data[i].title%>", '<span class="ellipsis-dots">...</span>', "</p>", "</td>", "<td>", '<p class="product-type need-dots">', "<%=data[i].type%>", '<span class="ellipsis-dots">...</span>', "</p>", "</td>", "<td><%=data[i].num%></td>", "<td>￥<%=data[i].price%></td>", "<td>", "<%=data[i].date%><br/><%=data[i].time%>", "</td>", "</tr>", "<% } %>"].join(""),
				i = $(".record-table-pager").attr("data-total-count"),
				a = {
					container: ".record-table-pager",
					pageCount: 5,
					allCount: i,
					curNum: 1,
					preCountNum: 5,
					nextCountNum: 5,
					preLabel: "上一页",
					nextLabel: "下一页"
				};
			~~i <= ~~a.pageCount && $(".record-table-pager").hide(), requirejs(["template", "common/models/common/ui/pages/pages"], function(i, n) {
				var o = $(".merchant-deal-record").find("tbody"),
					s = new n(a),
					r = i.compile(e),
					l = function(e, i) {
						$(".ui_page", this.dom).addClass("load"), $.ajax({
							url: t.ajaxUrl.merchantDealRecordUrl,
							data: {
								lid: this.dom.attr("data-id"),
								cur_page_num: i,
								page_count: a.pageCount
							},
							type: "post",
							dataType: "json",
							success: function(t) {
								$.map(t.data, function(t, e) {
									if ("object" == typeof t) {
										var i = new Date(1e3 * t.date);
										t.date = i.format("yyyy-MM-dd"), t.time = i.format("HH:mm:ss")
									}
								}), o.html(r(t)), $(".ui_page", this.dom).removeClass("load"), o.find(".need-dots").each(function(t, e) {
									var i = $(e);
									i.height() > 60 && (i.css("max-height", "4.2em"), $(".ellipsis-dots", i).show())
								})
							},
							error: function(e) {
								t.showTip("服务器错误，请稍后再试！")
							}
						})
					};
				l.apply(s, void 0, 1), $(s).bind("firepage", l)
			})
		},
		setContact: function(t) {
			myContact && (this.valueObj.hidden_name.val(t.name), this.valueObj.hidden_phone.val(t.phone), this.valueObj.hidden_email.val(t.email), this.valueObj.hidden_wechat.val(t.wechat))
		},
		showMoreBtn: function() {
			var t, e, i, a;
			t = $(".type-list"), e = t.wrap('<div class="type-list-wrap" data-orheight="144"></div>'), i = e.height(), e.css({
				"max-height": "none",
				height: "auto"
			}), a = t.height(), a > i ? (e.css({
				"max-height": "none"
			}), $(".right-operate .unit-nr .more").show()) : $(".right-operate .unit-nr .more").hide()
		},
		showLookMore: function() {
			var t = $(".look-more-wrapp"),
				e = t.find(".look-more-inner");
			height = parseInt(t.attr("data-maxheight"), 10), e.height() <= height && (t.css({
				height: "auto"
			}), $(".look-more-btn-wrap").hide())
		},
		imgScroll: function() {
			$(".scroll-unit .img-scroll").imgScrollBlock({
				prevCallback: function(t) {
					qyerUtil.doTrackCode("lm-detail-pic-previous")
				},
				nextCallback: function(t) {
					qyerUtil.doTrackCode("lm-detail-pic-next")
				},
				controldot: !0,
				defaultStart: !1
			})
		},
		lmCountdown: function(t, e, i) {
			window.clearTimeout(this.timer), e = parseInt(e);
			var a = e;
			this.timer = window.setInterval(function() {
				if (a--, 0 > a) return window.clearTimeout(this.timer), $.isFunction(i) && i(), !1;
				var e = 0,
					n = 0,
					o = 0,
					s = 0;
				3600 >= a ? (o = Math.floor(a / 60), s = a % 60) : a > 3600 && 259200 >= a ? n = Math.ceil(a / 3600) : e = Math.ceil(a / 86400);
				var r = "";
				return e > 0 && (r += "<em>" + e + "</em>天"), n > 0 && (r += "<em>" + n + "</em>小时"), o > 0 && (r += "<em>" + o + "</em>分"), s > 0 && (r += "<em>" + s + "</em>秒"), $(t).html(r), !1;
				var n, o, s
			}, 1e3)
		},
		setAnchor: function() {
			var t = this;
			$(".detail-unit:not(.exclusive)").each(function(e) {
				t.anchor.push($(this))
			})
		},
		setNavActive: function(t) {
			this.activeNavLi.removeClass("active"), t.addClass("active"), this.activeNavLi = t
		},
		cick_nav: function(t) {
			var e, i, a, n;
			e = $(t), a = this, i = e.index(), n = -80, e.hasClass("active") || $("body,html").animate({
				scrollTop: a.anchor[i].offset().top + n
			}, 500)
		},
		window_scroll: function() {
			var t = $(window).scrollTop(),
				e = $(".detail-nav-wrap"),
				i = e.find(".nav-unit li"),
				a = -85;
			if (t > this.anchor[0].offset().top + a) {
				e.addClass("float"), $(".detail-nav .nav-right").show(), len = this.anchor.length;
				for (var n = 0; n < len; n++) 0 == n ? t <= this.anchor[n + 1].offset().top + a && this.setNavActive(i.eq(n)) : n == len - 1 ? t > this.anchor[n].offset().top + a && this.setNavActive(i.eq(n)) : t > this.anchor[n].offset().top + a && t <= this.anchor[n + 1].offset().top + a && this.setNavActive(i.eq(n))
			} else e.removeClass("float"), $(".detail-nav .nav-right").hide()
		},
		share: function() {
			require(["common/models/common/ui/share/share"])
		},
		firstShowCalendar: function() {
			this.activeType.length > 0 && (this.ajaxStatus = !1, this.showCalendar(this.activeType.attr("data-pid") || ""), this.do_countDownAjax({
				pid: this.activeType.attr("data-pid")
			}))
		},
		initPerson: function() {
			var t, e, i, a, n, o, s;
			t = "", 0 == this.calData.limit ? (e = this.calData.adult, i = e, t = this.calData.already_buy > 0 ? "none" : "stock") : (e = this.calData.limit - this.calData.already_buy, i = e, this.calData.already_buy > 0 ? e > this.calData.adult ? (i = this.calData.adult, t = "stock") : t = "none" : 0 == e ? t = "none" : e > 0 && e <= this.calData.adult ? t = "limit" : (t = "stock", i = this.calData.adult)), n = 0 == i ? 0 : 1, a = 1, o = [i, a, n], s = [this.valueObj.adult, this.valueObj.children, this.valueObj.room], 0 == this.calData.house_type || 0 == this.calData.house_diff ? s[2].parents("li").hide() : s[2].parents("li").show();
			for (var r = 0, l = s.length; l > r; r++) s[r].length > 0 && (o[r] < 1 ? s[r].prop("readOnly", !0).attr("data-tiptype", t).attr("data-min", 1).attr("data-max", o[r]).val(0).parent().find(".add").addClass("disable").end().find(".minus").addClass("disable") : s[r].prop("readOnly", !1).attr("data-tiptype", t).attr("data-min", 1).attr("data-max", o[r]).val(1).parent().find(".add").removeClass("disable").end().find(".minus").addClass("disable"));
			i = a = n = o = s = null
		},
		resetPerson: function() {
			var t, e, i, a, n;
			t = 0, e = 0, i = 0, a = [t, e, i], n = [this.valueObj.adult, this.valueObj.children, this.valueObj.room], 0 == this.calData.house_type || 0 == this.calData.house_diff ? n[2].parents("li").hide() : n[2].parents("li").show();
			for (var o = 0, s = n.length; s > o; o++) n[o].length > 0 && (a[o] <= 1 ? n[o].prop("readOnly", !0).attr("data-min", 0).attr("data-max", a[o]).val(0).parent().find(".add").addClass("disable").end().find(".minus").addClass("disable") : n[o].prop("readOnly", !1).attr("data-min", 0).attr("data-max", a[o]).val(0).parent().find(".add").removeClass("disable").end().find(".minus").addClass("disable"));
			t = e = i = a = n = null
		},
		set_calData: function(t) {
			t instanceof jQuery ? (this.calData.price = parseFloat(t.attr("data-price")) || 0, this.calData.cid = t.attr("data-cid") || "", this.calData.adult = parseInt(t.attr("data-stock"), 10) || 0, this.calData.house_type = parseInt(t.attr("data-house_type"), 10) || 0, this.calData.house_diff = parseFloat(t.attr("data-house_diff")) || 0, this.calData.expired = parseInt(t.attr("data-expired"), 10) || 0, this.calData.already_buy = parseInt(t.attr("data-already_buy"), 10) || 0, this.calData.limit = parseInt(t.attr("data-limit"), 10) || 0) : "object" == typeof t && (this.calData.price = parseFloat(t.price) || 0, this.calData.cid = t.cid || "", this.calData.adult = parseInt(t.stock, 10) || 0, this.calData.house_type = parseInt(t.house_type, 10) || 0, this.calData.house_diff = parseFloat(t.house_diff) || 0, this.calData.expired = parseInt(t.expired, 10) || 0, this.calData.already_buy = parseInt(t.already_buy, 10) || 0, this.calData.limit = parseInt(t.limit, 10) || 0)
		},
		culcuValue: function(t) {
			var e, i, a;
			e = this.valueObj.adult.length ? parseInt(this.valueObj.adult.val()) : 0, i = this.valueObj.children.length ? parseInt(this.valueObj.children.val()) : 0, a = this.valueObj.room.length ? parseInt(this.valueObj.room.val()) : 0, this.hiddenData.room_offset = this.calData.house_diff && this.calData.house_type ? (this.calData.house_type * a - e) * this.calData.house_diff : 0, this.hiddenData.totalPrice = this.calData.price * e + this.hiddenData.room_offset, this.hiddenData.cid = this.calData.cid, this.hiddenData.adult = e, this.hiddenData.children = i, this.hiddenData.rooms = a, e = i = a = null
		},
		fixNum: function(t, e) {
			var i, a;
			return a = e || 2, i = t.toFixed(a).replace(/\.00/, "")
		},
		resetHidden: function() {
			this.valueObj.hidden_cid.length ? this.valueObj.hidden_cid.val("") : !0, this.valueObj.hidden_price.length ? this.valueObj.hidden_price.val("") : !0, this.valueObj.hidden_roomOffset.length ? this.valueObj.hidden_roomOffset.val("") : !0, this.valueObj.hidden_adult.length ? this.valueObj.hidden_adult.val("") : !0, this.valueObj.hidden_children.length ? this.valueObj.hidden_children.val("") : !0, this.valueObj.hidden_rooms.length ? this.valueObj.hidden_rooms.val("") : !0
		},
		setValueToPage: function() {
			this.valueObj.price.length ? this.valueObj.price.text(this.fixNum(this.hiddenData.totalPrice)) : !0, this.valueObj.floatPrice.length ? this.valueObj.floatPrice.text(this.fixNum(this.hiddenData.totalPrice)) : !0, this.valueObj.singleRoomOffset.length && (this.hiddenData.room_offset > 0 ? this.valueObj.singleRoomOffset.text(this.fixNum(this.hiddenData.room_offset)).parents(".room-offset").show() : this.valueObj.singleRoomOffset.text(0).parents(".room-offset").hide()), this.valueObj.hidden_cid.length ? this.valueObj.hidden_cid.val(this.hiddenData.cid) : !0, this.valueObj.hidden_price.length ? this.valueObj.hidden_price.val(this.fixNum(this.hiddenData.totalPrice)) : !0, this.valueObj.hidden_roomOffset.length ? this.valueObj.hidden_roomOffset.val(this.hiddenData.room_offset) : !0, this.valueObj.hidden_adult.length ? this.valueObj.hidden_adult.val(this.hiddenData.adult) : !0, this.valueObj.hidden_children.length ? this.valueObj.hidden_children.val(this.hiddenData.children) : !0, this.valueObj.hidden_rooms.length ? this.valueObj.hidden_rooms.val(this.hiddenData.rooms) : !0
		},
		showCalendar: function(t) {
			var e = this;
			this.ajaxStatus = !1, require(["common/models/common/ui/lmDatailCalendar/lmDatailCalendar"], function() {
				$(".calendar-cell").lmDatailCalendar({
					url: e.ajaxUrl.canlendarUrl,
					pid: t,
					cardsPerScreen: 4,
					onShow: function(t) {
						e.resetHidden(), t.noDate ? ($(".calendar-cell").lmDatailCalendar("hideCal"), $(".lm-calendar").hide(), e.set_calData(t.noDate[0]), e.initPerson(), e.culcuValue(), e.setValueToPage()) : ($(".calendar-cell").lmDatailCalendar("showCal"), $(".lm-calendar").show(), e.resetPerson()), e.ajaxStatus = !0;
						var i = $(".lmDatailCalendar .card-unit");
						$(".card-btn.prev", i).css({
							background: "none",
							"text-decoration": "none"
						}).addClass("qui-icon-arrow-left"), $(".card-btn.next", i).css({
							background: "none",
							"text-decoration": "none"
						}).addClass("qui-icon-arrow-right")
					},
					onError: function() {
						e.ajaxStatus = !0
					},
					onFresh: function(t) {},
					onEnableTdClick: function(t) {
						var i = $(t);
						e.set_calData(i), e.initPerson(), e.culcuValue(), e.setValueToPage()
					}
				})
			})
		},
		click_type: function(t) {
			var e, i;
			e = $(t), e.hasClass("disable") || (i = e.attr("data-pid"), this.activeType && e.is(this.activeType) || (this.activeType && this.activeType.removeClass("active"), this.activeType = e.addClass("active"), this.appPromotion(), this.customView(), this.firstShowCalendar(), this.valueObj.hidden_pid.val(i), this.valueObj.hidden_adult.val(1), this.do_countDownAjax({
				pid: i
			})))
		},
		countDownAjax: function(t) {
			t.posturl = this.ajaxUrl.countDownUrl, qyerUtil.doAjax(t)
		},
		do_countDownAjax: function(t, e) {
			var i = this;
			this.countDownAjax({
				data: t,
				__qFED__: {
					id: "2f3ca257-1f4a-3514-c325-94adfb4a267d",
					dataIndex: 0,
					randomData: !0
				},
				onSuccess: function(t) {
					if ("" == t.data.stamp) $(".not-start").hide(), $("#booking,.nav-book").removeClass("disable").val("立即预订");
					else {
						var e = Math.floor(parseInt(t.data.stamp));
						e > 0 && ($(".not-start").show(), $("#booking,.nav-book").addClass("disable").val("即将开始"), $(".timer").each(function() {
							i.lmCountdown(this, e, function() {
								$("#booking,.nav-book").removeClass("disable").val("立即预订"), $(".not-start").hide()
							})
						}))
					}
				},
				onError: function(t) {
					t.__server_error__ ? "abort" != t.__server_status__ && i.showTip("服务器错误，请稍后再试！") : i.showTip(t.data.msg || t.data)
				}
			})
		},
		click_moretype: function(t) {
			var e, i, a, n, o;
			o = this, e = $(t), i = e.parents(".unit-nr").find(".type-list"), a = parseInt(i.attr("data-orheight"), 10), n = i.children().outerHeight(!0) * Math.ceil(i.children().length / 3), a >= n || (e.hasClass("up") ? (i.animate({
				height: a + "px"
			}, 500, function() {}), e.removeClass("up")) : (i.animate({
				height: n
			}, 500, function() {}), e.addClass("up")))
		},
		click_compute: function(t) {
			var e, i, a, n, o, s, r, l;
			switch (e = $(t), i = e.parent().find(".num-input"), a = e.parents(".person-list").find(".num-tip"), l = i.attr("data-tiptype"), n = parseInt(i.attr("data-min"), 10) || 0, o = parseInt(i.attr("data-max"), 10) || 0, l) {
				case "stock":
					s = '<i class="qui-icon-tip-info-reverse"></i>已达库存上限';
					break;
				case "limit":
					s = '<i class="qui-icon-tip-info-reverse"></i>每人限购<em>' + o + "</em>份";
					break;
				case "none":
					s = '<i class="qui-icon-tip-info-reverse"></i>已经达到购买限制'
			}
			r = parseInt(i.val(), 10), "num-room" == i.attr("id") && (s = '<i class="qui-icon-tip-info-reverse"></i>不能大于出行人数'), a.hide(), e.hasClass("minus") ? e.hasClass("disable") ? (0 == n && 0 == o ? a.html('<i class="qui-icon-tip-info-reverse"></i>请选择产品类型或出发日期').css({
				left: i.position().left + (i.width() - a.outerWidth()) / 2
			}).show() : a.html('<i class="qui-icon-tip-info-reverse"></i>已到最小值').css({
				left: i.position().left + (i.width() - a.outerWidth()) / 2
			}).show(), clearTimeout(this.timeout), this.timeout = setTimeout(function() {
				a.fadeOut()
			}, 3e3)) : (i.val(r - 1), this.change_number(i)) : e.hasClass("add") && (e.hasClass("disable") ? (0 == n && 0 == o ? a.html('<i class="qui-icon-tip-info-reverse"></i>请选择产品类型或出发日期').css({
				left: i.position().left + (i.width() - a.outerWidth()) / 2
			}).show() : a.html(s).css({
				left: i.position().left + (i.width() - a.outerWidth()) / 2
			}).show(), clearTimeout(this.timeout), this.timeout = setTimeout(function() {
				a.fadeOut()
			}, 3e3)) : (i.val(r + 1), this.change_number(i))), e = i = n = o = s = r = l = null
		},
		change_number: function(t) {
			var e, i, a, n, o, s, r, l;
			switch (e = t instanceof jQuery ? t : $(t), i = parseInt(e.val(), 10) || 0, a = parseInt(e.attr("data-min"), 10) || 0, n = parseInt(e.attr("data-max"), 10) || 0, o = e.parents(".person-list").find(".num-tip"), l = e.attr("data-tiptype"), s = "", l) {
				case "stock":
					r = '<i class="qui-icon-tip-info-reverse"></i>已达库存上限';
					break;
				case "limit":
					r = '<i class="qui-icon-tip-info-reverse"></i>每人限购<em>' + n + "</em>份";
					break;
				case "none":
					r = '<i class="qui-icon-tip-info-reverse"></i>已经达到购买限制'
			}
			if ("num-room" == e.attr("id") ? (r = '<i class="qui-icon-tip-info-reverse"></i>不能大于出行人数', s = "room") : "num-adult" == e.attr("id") && (s = "adult"), a >= i ? (e.val(a), e.parent().find(".minus").addClass("disable").end().find(".add").removeClass("disable"), o.html('<i class="qui-icon-tip-info-reverse"></i>已到最小值').css({
					left: e.position().left + (e.width() - o.outerWidth()) / 2
				}).show()) : i >= n ? (e.val(n), e.parent().find(".add").addClass("disable").end().find(".minus").removeClass("disable"), o.html(r).css({
					left: e.position().left + (e.width() - o.outerWidth()) / 2
				}).show()) : e.parent().find(".minus").removeClass("disable").end().find(".add").removeClass("disable"), clearTimeout(this.timeout), this.timeout = setTimeout(function() {
					o.fadeOut()
				}, 3e3), i = e.val(), "adult" == s && this.valueObj.room.length) {
				var c, d, u, h, p;
				this.valueObj.room.attr("data-max", i).attr("data-min", Math.ceil(i / this.calData.house_type)), c = parseInt(this.valueObj.room.attr("data-min"), 10), d = parseInt(this.valueObj.room.attr("data-max"), 10), u = parseInt(this.valueObj.room.val(), 10), h = this.valueObj.room.parent().find(".minus"), p = this.valueObj.room.parent().find(".add"), u > i ? (this.valueObj.room.val(i), p.addClass("disable"), d > c && h.removeClass("disable"), c == i && d == i && (p.addClass("disable"), h.addClass("disable"))) : c > u ? (this.valueObj.room.val(c), h.addClass("disable"), c == i && d == i && (p.addClass("disable"), h.addClass("disable"))) : c == i && d == i ? (p.addClass("disable"), h.addClass("disable")) : (u > c && d > c ? h.removeClass("disable") : h.addClass("disable"), p.removeClass("disable")), this.valueObj.room.prop("readonly", !1), c = d = u = h = p = null
			}
			this.culcuValue(), this.setValueToPage(), e = i = a = n = s = r = l = null
		},
		collectAjax: function(t) {
			t.posturl = this.ajaxUrl.collectUrl, qyerUtil.doAjax(t)
		},
		do_collectAjax: function(t, e, i) {
			var a = this;
			this.collectAjax({
				data: t,
				onSuccess: function(t) {
					"ok" == t.result && 0 == t.error_code ? $.isFunction(i) && i(e) : a.showTip(t.data.msg || t.data)
				},
				onError: function(t) {
					t.__server_error__ ? "abort" != t.__server_status__ && a.showTip("服务器错误，请稍后再试！") : a.showTip(t.data.msg || t.data)
				}
			})
		},
		click_collect: function(t) {
			if (!qyerUtil.isLogin()) return void qyerUtil.doLogin();
			var e, i, a, n, o;
			e = $(t), i = e.attr("id"), a = e.attr("data-id") ? parseInt(e.attr("data-id")) : "", e.hasClass("active") ? (n = "deal_id=" + a + "&op=del", o = !0) : (n = "deal_id=" + a, o = !1), this.do_collectAjax(n, o, function(t) {
				t ? (e.removeClass("active"), e.find("span").attr("class", "qui-icon-heart")) : (e.addClass("active"), e.find("span").attr("class", "qui-icon-heart-reverse active"))
			})
		},
		contactInfoAjax: function(t) {
			t.posturl = this.ajaxUrl.contactInfoUrl, qyerUtil.doAjax(t)
		},
		do_contactInfoAjax: function(t, e, i) {
			var a = this;
			this.contactInfoAjax({
				data: t,
				onSuccess: function(t) {
					"ok" == t.result && 0 == t.error_code ? (a.showTip("保存成功！", "success"), a.setContact(e)) : a.showTip(t.data.msg || t.data), i.hide()
				},
				onError: function(t) {
					t.__server_error__ ? "abort" != t.__server_status__ && a.showTip("服务器错误，请稍后再试！") : a.showTip(t.data.msg || t.data)
				}
			})
		},
		click_contactInfo: function(t) {
			if (!qyerUtil.isLogin()) return void qyerUtil.doLogin();
			var e = this;
			requirejs(["common/models/common/ui/popup/popup", "common/models/common/ui/inputValidation/inputValidation"], function(t) {
				t.show({
					title: "填写联系人信息",
					width: 348,
					okText: "保存信息",
					exClassName: "contactInfoPop",
					contentHTML: ['<div class="popInner" id="tar">', '<p class="popInner-line">', '<label for="infoName"><i class="xing">*</i>姓名</label>', '<input class="input-text" id="infoName" type="text" placeholder="请填写真实姓名"/>', "</p>", '<p class="popInner-line">', '<label for="infoWechat">微信号</label>', '<input class="input-text" id="infoWechat" type="text" placeholder="用于境外24小时紧急服务"/>', "</p>", '<p class="popInner-line">', '<label for="infoPhone"><i class="xing">*</i>电话</label>', '<input class="input-text" id="infoPhone" type="text" placeholder="用于接收确认信息"/>', "</p>", '<p class="popInner-line no-margin">', '<label for="infoEmail"><i class="xing">*</i>邮箱</label>', '<input class="input-text" id="infoEmail" type="text" placeholder="用于接收确认信息"/>', "</p>", "</div>"].join(""),
					onOK: function() {
						var i, a, n;
						return i = "", $("#infoName").qyerInputValidation() || (i += "请填写真实姓名\n"), $("#infoWechat").qyerInputValidation() || (i += "请填写正确的微信号\n"), $("#infoPhone").qyerInputValidation() || (i += "请填写正确的手机号码\n"), $("#infoEmail").qyerInputValidation() || (i += "请填写正确的邮箱地址\n"), "" != i ? !1 : void("" == i && (n = {
							name: $("#infoName").val(),
							phone: $("#infoPhone").val(),
							email: $("#infoEmail").val(),
							wechat: $("#infoWechat").val()
						}, a = "name=" + $("#infoName").val() + "&phone=" + $("#infoPhone").val() + "&email=" + $("#infoEmail").val() + "&wechat=" + $("#infoWechat").val(), e.do_contactInfoAjax(a, n, t), $.extend(myContact, n)))
					},
					onShow: function() {
						$("#infoName").val($("#name").val()), $("#infoPhone").val($("#phone").val()), $("#infoEmail").val($("#email").val()), $("#infoWechat").val(myContact.wechat), $("#infoName").qyerInputValidation({
							blurAutoCheck: !0,
							parent: $(".popInner"),
							text: "请填写真实姓名",
							exp: function(t) {
								return "" == t ? (this.text = "名字不能为空", !1) : !0
							}
						}), $("#infoPhone").qyerInputValidation({
							parent: $(".popInner"),
							blurAutoCheck: !0,
							text: "请填写正确的手机号码",
							exp: function(t) {
								return "" == t ? (this.text = "手机号不能为空", !1) : /^1[3578]{1}[0-9]{9}$/g.test(t) ? !0 : (this.text = "请填写正确的手机号码", !1)
							}
						}), $("#infoWechat").qyerInputValidation({
							parent: $(".popInner"),
							blurAutoCheck: !0,
							text: "请填写正确的微信号",
							exp: function(t) {
								return t ? /^[a-zA-Z0-9_-]{6,}$/.test(t) ? !0 : !1 : !0
							}
						}), $("#infoEmail").qyerInputValidation({
							parent: $(".popInner"),
							blurAutoCheck: !0,
							text: "请填写正确的邮箱地址",
							exp: function(t) {
								return "" == t ? (this.text = "邮箱地址不能为空", !1) : /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t) ? !0 : (this.text = "请填写正确的邮箱地址", !1)
							}
						})
					}
				})
			})
		},
		remindAjax: function(t) {
			t.posturl = this.ajaxUrl.remindUrl, qyerUtil.doAjax(t)
		},
		do_remindAjax: function(t, e) {
			var i = this;
			this.remindAjax({
				data: t,
				onSuccess: function(t) {
					"ok" == t.result && 0 == t.error_code ? (i.showTip("设置提醒成功！", "success"), e.removeClass("not-remind")) : i.showTip(t.data.msg || t.data)
				},
				onError: function(t) {
					t.__server_error__ ? "abort" != t.__server_status__ && i.showTip("服务器错误，请稍后再试！") : i.showTip(t.data.msg || t.data)
				}
			})
		},
		click_remind: function(t) {
			var e = $(t);
			return qyerUtil.isLogin() ? void(e.hasClass("not-remind") ? this.do_remindAjax({
				lid: e.attr("data-id")
			}, e) : this.showTip("已经设置提醒！", "success")) : void qyerUtil.doLogin()
		},
		checkBookAjax: function(t) {
			t.posturl = this.ajaxUrl.checkBookUrl, qyerUtil.doAjax(t)
		},
		do_checkBookAjax: function(t, e) {
			var i = this;
			this.checkBookAjax({
				data: t,
				onSuccess: function(t) {
					"ok" == t.result && 0 == t.error_code ? t.data ? $.isFunction(e) && e() : i.showTip("您购买的数量已经超出限制") : 500 == t.error_code && qyerUtil.doLogin()
				},
				onError: function(t) {
					t.__server_error__ ? "abort" != t.__server_status__ && i.showTip("服务器错误，请稍后再试！") : i.showTip(t.data.msg || t.data)
				}
			})
		},
		book_submit: function(t) {
			var e = this.valueObj.hidden_pid.val();
			if (!e) return !1;
			var i = this,
				a = function(e) {
					var a, n, o, s;
					if (n = $(t), n.hasClass("disable")) return !1;
					if (!qyerUtil.isLogin()) return qyerUtil.doLogin(), !0;
					if (1 == i.checkIfCustomView()) {
						var r = $("#travelDateStart"),
							l = $("#travelDateEnd"),
							c = $("#travelTimeStart"),
							d = $("#travelTimeEnd");
						if (!r.val()) return i.showTip("请选择取设备日期"), !1;
						if (!l.val()) return i.showTip("请选择还设备日期"), !1;
						if (r.val() + c.val() > l.val() + d.val()) return i.showTip("取设备日期必须早于还设备日期"), !1;
						a = $.extend(a, {
							contactTravelTimeStart: r + "&&" + c,
							contactTravelTimeEnd: l + "&&" + d
						})
					} else {
						if (n.hasClass("disable")) return !1;
						if (!qyerUtil.isLogin()) return qyerUtil.doLogin(), !0;
						if ("" == i.valueObj.hidden_pid.val()) return !1;
						if ("" == i.valueObj.hidden_cid.val()) return i.showTip("请选择产品出发日期"), !1;
						if ("" == i.valueObj.hidden_adult.val()) return !1;
						if (o = parseInt(i.valueObj.hidden_rooms.val()), s = parseInt(i.valueObj.hidden_adult.val()), 0 == s) return void i.showTip("请选择出行人数！");
						if (o > 0 && o > s) return i.showTip("房间数不能大于出行人数！"), !1
					}
					return a = {
						pid: i.valueObj.hidden_pid.val(),
						num: i.valueObj.hidden_adult.val(),
						cid: i.valueObj.hidden_cid.val()
					}, i.do_checkBookAjax(a, function() {
						e(function() {
							$("#lastminuteorderform").submit()
						})
					}), a = n = o = s = null, !0
				},
				n = function(t, i) {
					$.ajax({
						url: "/ajax.php?action=isSignCanBuy",
						dataType: "json",
						data: {
							pid: e
						},
						type: "post",
						success: function(e) {
							var a = e.data;
							2 === e.error_code ? requirejs(["common/models/common/ui/popup/popup"], function(t) {
								t.show({
									width: 348,
									exClassName: "limitBugAlert",
									okText: "去打卡",
									showTitle: !1,
									showCancelBtn: !1,
									contentHTML: ["", '<div class="popInner">', '<p class="popInner-line">', '您已打卡<span class="text-sign">' + a.signs + "</span>次", "</p>", '<p class="popInner-line">', '还需打卡<span class="text-lack">' + a.lack + "</span>次才能换购此产品", "</p>", "</div>"].join(""),
									onOK: function() {
										window.open("http://z.qyer.com/zt/2015zuishijie/"), t.hide()
									}
								})
							}) : 3 === e.error_code ? requirejs(["common/models/common/ui/popup/popup"], function(t) {
								t.show({
									width: 348,
									exClassName: "limitBugAlert",
									okText: "回大促看看",
									showTitle: !1,
									showCancelBtn: !1,
									contentHTML: ["", '<div class="popInner">', '<p class="popInner-line">', "您已换购过该产品", "</p>", '<p class="popInner-line">', '每款产品每个穷游ID只限购<span class="text-limit-buy">1</span>份', "</p>", "</div>"].join(""),
									onOK: function() {
										window.open("http://z.qyer.com/zt/2015zuishijie/"), t.hide()
									}
								})
							}) : t(i)
						}
					})
				},
				o = function(t) {
					"undefined" != typeof pdLimitDay && pdLimitDay && pdLimitDay.national_day ? requirejs(["common/models/common/ui/popup/popup"], function(e) {
						e.show({
							width: 600,
							title: "重要提醒",
							exClassName: "pd-limit-day",
							okText: "继续预订",
							contentHTML: ["", "<div>", "<p>该产品国庆期间只接受预订，但不做订单确认。节假日期间的订单会顺延至节后工作日处</p>", "<p>理（10月10日前使用的产品不能保证及时完成确认）。</p>", "<p>请您根据实际情况提前预订。对因此引起的不便，请您谅解。</p>", "</div>"].join(""),
							onOK: function() {
								t()
							}
						})
					}) : t()
				};
			n(a, o)
		},
		click_bookSubmit: function(t) {
			this.book_submit(t)
		},
		click_navBook: function(t) {
			this.book_submit(t) || $("html,body").animate({
				scrollTop: "0px"
			})
		},
		click_morelight: function(t) {
			var e = $(".sub-title.zkjzld").length > 0 ? $(".sub-title.zkjzld").offset().top - 60 : 0;
			$("html,body").animate({
				scrollTop: e
			})
		},
		click_noticeClose: function(t) {
			$(t).parent().slideUp(function() {})
		},
		validateHidden: function() {
			var t, e;
			t = "", e = [this.valueObj.hidden_cid ? this.valueObj.hidden_cid.val() : "", this.valueObj.hidden_pid ? this.valueObj.hidden_pid.val() : "", this.valueObj.hidden_price ? this.valueObj.hidden_price.val() : "", this.valueObj.hidden_roomOffset ? this.valueObj.hidden_roomOffset.val() : "", this.valueObj.hidden_adult ? this.valueObj.hidden_adult.val() : "", this.valueObj.hidden_children ? this.valueObj.hidden_children.val() : "", this.valueObj.hidden_adult ? this.valueObj.hidden_adult.val() : ""];
			for (var i = 0, a = e.length; a > i; i++) "" == i && (t = "error");
			return e
		},
		showTip: function(t, e) {
			requirejs(["common/models/common/ui/tip/tip"], function(i) {
				i.tip({
					text: t,
					type: e || "error"
				})
			})
		},
		show_moretype: function(t) {
			var e, i, a, n;
			n = this, e = $(t).find(".type-list-wrap"), i = $(t).find(".type-list"), a = i.height(), e.stop().animate({
				"max-height": a + "px",
				height: a + "px"
			}, 500, function() {
				n.moreArrow.stop().fadeOut(200)
			})
		},
		hide_moretype: function(t) {
			var e, i, a, n;
			return n = this, e = $(t).find(".type-list-wrap"), i = parseInt(e.attr("data-orheight"), 10), a = e.find(".type-list").outerHeight(!0), i >= a ? void this.moreArrow.hide() : void e.stop().animate({
				"max-height": i + "px",
				height: i + "px"
			}, 500, function() {
				n.moreArrow.fadeIn(200)
			})
		},
		click_lookMore: function(t) {
			var e, i, a, n, o;
			o = this, e = $(t), i = e.parents(".look-more-unit").find(".look-more-wrapp"), a = parseInt(i.attr("data-maxheight"), 10), n = i.find(".look-more-inner").outerHeight(!0), e.hasClass("up") ? i.stop().animate({
				height: a
			}, 500, function() {
				e.removeClass("up").find(".more-btn-text").text("查看全部")
			}) : i.stop().animate({
				height: n
			}, 500, function() {
				e.addClass("up").find(".more-btn-text").text("收起")
			})
		},
		appPromotion: function() {
			var t = !1,
				e = $(".promotion"),
				i = $(".promotion-text"),
				a = this.activeType.attr("data-app-promotion");
			a && (a + "").trim() ? ($(".text-content", e).text(a), t = !0, i.show()) : i.hide();
			var n = $(".promotion-text-dc");
			"object" == typeof linkTopic ? ($(".dc-text-content", n).html(linkTopic.title), $(".dc-text-link > a", n).attr("href", linkTopic.url), t = !0, n.show()) : n.hide(), t ? e.slideDown(300) : e.slideUp(300)
		},
		dealDateMinus: function(t, e) {
			return Math.round((new Date(e) - new Date(t)) / 3600 / 1e3 / 24) + 1
		},
		dealTimeAdd: function(t, e) {
			return new Date(new Date(t) - 0 + 864e5 * (e - 1)).format("yyyy-MM-dd")
		},
		checkIfCustomView: function() {
			var t = (myVar.id, myVar.ptype),
				e = myVar.psubtype,
				i = myVar.supid;
			if ("cityfun" == t && "320" == i && "wifi" == e) {
				var a = this.activeType.text();
				if (/^单日价格$/.test(a)) return 1
			}
		},
		customView: function() {
			var t = this;
			$(".type-custom-view").hide();
			var e = myVar.id;
			if (1 == t.checkIfCustomView()) {
				$(".type-custom-view").show(), $(".lm-calendar").hide(), $(".person-number").hide(), t.valueObj.hidden_adult = $("#travelDays_shadow");
				var i, a;
				~[47669, 47543, 47509, 47251].indexOf(e) ? (i = 22, a = 12, $(".travelDaysHelpBlock").text("当天晚22:00以后取设备，或中午12:00前还设备，不计算天数")) : ~[47897, 47937, 47931, 47951, 47956, 48488, 48504, 47954].indexOf(e) ? (i = 22, a = 3, $(".travelDaysHelpBlock").text("当天晚22:00以后取设备，或早3:00前还设备，不计算天数")) : ~[47743, 47827].indexOf(e) && (i = a = void 0);
				var n = $("#travelDateStart"),
					o = $("#travelDateEnd"),
					s = $("#travelTimeStart"),
					r = $("#travelTimeEnd"),
					l = function() {
						var e = n.val(),
							l = o.val(),
							c = s.val(),
							d = r.val();
						if (c = c ? /(\d{1,2}):00/.exec(c)[1] : void 0, d = d ? /(\d{1,2}):00$/.exec(d)[1] : void 0, e && l && c && d) {
							var u = t.dealDateMinus(e, l);
							i && c >= i && u--, a && a >= d && u--, 0 >= u && (u = 1), $(".travelDays").text(u);
							var h = $("#sum").val() || 1;
							$("#sum").val(u), $("#travelDays_shadow").val(u);
							var p = t.valueObj.hidden_price.val(),
								f = p / h;
							f && u && ($(".booking-unit .price-unit .price em").text(u * f), $("#price").val(u * f))
						}
					},
					n = $("#travelDateStart"),
					o = $("#travelDateEnd");
				s.add(r).off("change").on("change", l), n.datepicker({
					changeYear: !0,
					yearRange: "-100:+50",
					minDate: "+" + myVar.order_adv_days + "d",
					onSelect: function(e) {
						o.datepicker("option", "minDate", t.dealTimeAdd(n.val(), 1)), l()
					}
				}), o.datepicker({
					changeYear: !0,
					yearRange: "100:+50",
					minDate: "+" + myVar.order_adv_days + "d",
					onSelect: function(e) {
						n.datepicker("option", "maxDate", t.dealTimeAdd(o.val(), 1)), l()
					}
				})
			} else $(".lm-calendar").show(), $(".person-number").show(), t.valueObj.hidden_adult = $("#sum")
		}
	};
	new t
}), define("old/models/project/lmDedail/js/deal_detail_5.3", function() {});