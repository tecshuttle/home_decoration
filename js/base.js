!
function(e, t) {
	function n(e) {
		var t = e.length,
			n = ce.type(e);
		return ce.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
	}
	function r(e) {
		var t = ke[e] = {};
		return ce.each(e.match(pe) || [], function(e, n) {
			t[n] = !0
		}), t
	}
	function i(e, n, r, i) {
		if (ce.acceptData(e)) {
			var o, a, s = ce.expando,
				u = e.nodeType,
				l = u ? ce.cache : e,
				c = u ? e[s] : e[s] && s;
			if (c && l[c] && (i || l[c].data) || r !== t || "string" != typeof n) return c || (c = u ? e[s] = te.pop() || ce.guid++ : s), l[c] || (l[c] = u ? {} : {
				toJSON: ce.noop
			}), ("object" == typeof n || "function" == typeof n) && (i ? l[c] = ce.extend(l[c], n) : l[c].data = ce.extend(l[c].data, n)), a = l[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[ce.camelCase(n)] = r), "string" == typeof n ? (o = a[n], null == o && (o = a[ce.camelCase(n)])) : o = a, o
		}
	}
	function o(e, t, n) {
		if (ce.acceptData(e)) {
			var r, i, o = e.nodeType,
				a = o ? ce.cache : e,
				u = o ? e[ce.expando] : ce.expando;
			if (a[u]) {
				if (t && (r = n ? a[u] : a[u].data)) {
					ce.isArray(t) ? t = t.concat(ce.map(t, ce.camelCase)) : t in r ? t = [t] : (t = ce.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
					for (; i--;) delete r[t[i]];
					if (n ? !s(r) : !ce.isEmptyObject(r)) return
				}(n || (delete a[u].data, s(a[u]))) && (o ? ce.cleanData([e], !0) : ce.support.deleteExpando || a != a.window ? delete a[u] : a[u] = null)
			}
		}
	}
	function a(e, n, r) {
		if (r === t && 1 === e.nodeType) {
			var i = "data-" + n.replace(Se, "-$1").toLowerCase();
			if (r = e.getAttribute(i), "string" == typeof r) {
				try {
					r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : Ee.test(r) ? ce.parseJSON(r) : r
				} catch (o) {}
				ce.data(e, n, r)
			} else r = t
		}
		return r
	}
	function s(e) {
		var t;
		for (t in e) if (("data" !== t || !ce.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
		return !0
	}
	function u() {
		return !0
	}
	function l() {
		return !1
	}
	function c() {
		try {
			return G.activeElement
		} catch (e) {}
	}
	function f(e, t) {
		do e = e[t];
		while (e && 1 !== e.nodeType);
		return e
	}
	function p(e, t, n) {
		if (ce.isFunction(t)) return ce.grep(e, function(e, r) {
			return !!t.call(e, r, e) !== n
		});
		if (t.nodeType) return ce.grep(e, function(e) {
			return e === t !== n
		});
		if ("string" == typeof t) {
			if ($e.test(t)) return ce.filter(t, e, n);
			t = ce.filter(t, e)
		}
		return ce.grep(e, function(e) {
			return ce.inArray(e, t) >= 0 !== n
		})
	}
	function d(e) {
		var t = Ue.split("|"),
			n = e.createDocumentFragment();
		if (n.createElement) for (; t.length;) n.createElement(t.pop());
		return n
	}
	function h(e, t) {
		return ce.nodeName(e, "table") && ce.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
	}
	function g(e) {
		return e.type = (null !== ce.find.attr(e, "type")) + "/" + e.type, e
	}
	function m(e) {
		var t = it.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}
	function y(e, t) {
		for (var n, r = 0; null != (n = e[r]); r++) ce._data(n, "globalEval", !t || ce._data(t[r], "globalEval"))
	}
	function v(e, t) {
		if (1 === t.nodeType && ce.hasData(e)) {
			var n, r, i, o = ce._data(e),
				a = ce._data(t, o),
				s = o.events;
			if (s) {
				delete a.handle, a.events = {};
				for (n in s) for (r = 0, i = s[n].length; i > r; r++) ce.event.add(t, n, s[n][r])
			}
			a.data && (a.data = ce.extend({}, a.data))
		}
	}
	function b(e, t) {
		var n, r, i;
		if (1 === t.nodeType) {
			if (n = t.nodeName.toLowerCase(), !ce.support.noCloneEvent && t[ce.expando]) {
				i = ce._data(t);
				for (r in i.events) ce.removeEvent(t, r, i.handle);
				t.removeAttribute(ce.expando)
			}
			"script" === n && t.text !== e.text ? (g(t).text = e.text, m(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ce.support.html5Clone && e.innerHTML && !ce.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
		}
	}
	function x(e, n) {
		var r, i, o = 0,
			a = typeof e.getElementsByTagName !== Y ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== Y ? e.querySelectorAll(n || "*") : t;
		if (!a) for (a = [], r = e.childNodes || e; null != (i = r[o]); o++)!n || ce.nodeName(i, n) ? a.push(i) : ce.merge(a, x(i, n));
		return n === t || n && ce.nodeName(e, n) ? ce.merge([e], a) : a
	}
	function w(e) {
		tt.test(e.type) && (e.defaultChecked = e.checked)
	}
	function T(e, t) {
		if (t in e) return t;
		for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Nt.length; i--;) if (t = Nt[i] + n, t in e) return t;
		return r
	}
	function C(e, t) {
		return e = t || e, "none" === ce.css(e, "display") || !ce.contains(e.ownerDocument, e)
	}
	function N(e, t) {
		for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = ce._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && C(r) && (o[a] = ce._data(r, "olddisplay", A(r.nodeName)))) : o[a] || (i = C(r), (n && "none" !== n || !i) && ce._data(r, "olddisplay", i ? n : ce.css(r, "display"))));
		for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
		return e
	}
	function k(e, t, n) {
		var r = yt.exec(t);
		return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
	}
	function E(e, t, n, r, i) {
		for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += ce.css(e, n + Ct[o], !0, i)), r ? ("content" === n && (a -= ce.css(e, "padding" + Ct[o], !0, i)), "margin" !== n && (a -= ce.css(e, "border" + Ct[o] + "Width", !0, i))) : (a += ce.css(e, "padding" + Ct[o], !0, i), "padding" !== n && (a += ce.css(e, "border" + Ct[o] + "Width", !0, i)));
		return a
	}
	function S(e, t, n) {
		var r = !0,
			i = "width" === t ? e.offsetWidth : e.offsetHeight,
			o = ct(e),
			a = ce.support.boxSizing && "border-box" === ce.css(e, "boxSizing", !1, o);
		if (0 >= i || null == i) {
			if (i = ft(e, t, o), (0 > i || null == i) && (i = e.style[t]), vt.test(i)) return i;
			r = a && (ce.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
		}
		return i + E(e, t, n || (a ? "border" : "content"), r, o) + "px"
	}
	function A(e) {
		var t = G,
			n = xt[e];
		return n || (n = j(e, t), "none" !== n && n || (lt = (lt || ce("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (lt[0].contentWindow || lt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = j(e, t), lt.detach()), xt[e] = n), n
	}
	function j(e, t) {
		var n = ce(t.createElement(e)).appendTo(t.body),
			r = ce.css(n[0], "display");
		return n.remove(), r
	}
	function D(e, t, n, r) {
		var i;
		if (ce.isArray(t)) ce.each(t, function(t, i) {
			n || Et.test(e) ? r(e, i) : D(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
		});
		else if (n || "object" !== ce.type(t)) r(e, t);
		else for (i in t) D(e + "[" + i + "]", t[i], n, r)
	}
	function L(e) {
		return function(t, n) {
			"string" != typeof t && (n = t, t = "*");
			var r, i = 0,
				o = t.toLowerCase().match(pe) || [];
			if (ce.isFunction(n)) for (; r = o[i++];)"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
		}
	}
	function H(e, t, n, r) {
		function i(s) {
			var u;
			return o[s] = !0, ce.each(e[s] || [], function(e, s) {
				var l = s(t, n, r);
				return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
			}), u
		}
		var o = {},
			a = e === It;
		return i(t.dataTypes[0]) || !o["*"] && i("*")
	}
	function q(e, n) {
		var r, i, o = ce.ajaxSettings.flatOptions || {};
		for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
		return r && ce.extend(!0, e, r), e
	}
	function _(e, n, r) {
		for (var i, o, a, s, u = e.contents, l = e.dataTypes;
		"*" === l[0];) l.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
		if (o) for (s in u) if (u[s] && u[s].test(o)) {
			l.unshift(s);
			break
		}
		if (l[0] in r) a = l[0];
		else {
			for (s in r) {
				if (!l[0] || e.converters[s + " " + l[0]]) {
					a = s;
					break
				}
				i || (i = s)
			}
			a = a || i
		}
		return a ? (a !== l[0] && l.unshift(a), r[a]) : void 0
	}
	function F(e, t, n, r) {
		var i, o, a, s, u, l = {},
			c = e.dataTypes.slice();
		if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
		for (o = c.shift(); o;) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;
		else if ("*" !== u && u !== o) {
			if (a = l[u + " " + o] || l["* " + o], !a) for (i in l) if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
				a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
				break
			}
			if (a !== !0) if (a && e["throws"]) t = a(t);
			else try {
				t = a(t)
			} catch (f) {
				return {
					state: "parsererror",
					error: a ? f : "No conversion from " + u + " to " + o
				}
			}
		}
		return {
			state: "success",
			data: t
		}
	}
	function M() {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	}
	function O() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}
	function B() {
		return setTimeout(function() {
			Kt = t
		}), Kt = ce.now()
	}
	function P(e, t, n) {
		for (var r, i = (on[t] || []).concat(on["*"]), o = 0, a = i.length; a > o; o++) if (r = i[o].call(n, t, e)) return r
	}
	function R(e, t, n) {
		var r, i, o = 0,
			a = rn.length,
			s = ce.Deferred().always(function() {
				delete u.elem
			}),
			u = function() {
				if (i) return !1;
				for (var t = Kt || B(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
				return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
			},
			l = s.promise({
				elem: e,
				props: ce.extend({}, t),
				opts: ce.extend(!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: Kt || B(),
				duration: n.duration,
				tweens: [],
				createTween: function(t, n) {
					var r = ce.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
					return l.tweens.push(r), r
				},
				stop: function(t) {
					var n = 0,
						r = t ? l.tweens.length : 0;
					if (i) return this;
					for (i = !0; r > n; n++) l.tweens[n].run(1);
					return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
				}
			}),
			c = l.props;
		for (W(c, l.opts.specialEasing); a > o; o++) if (r = rn[o].call(l, e, c, l.opts)) return r;
		return ce.map(c, P, l), ce.isFunction(l.opts.start) && l.opts.start.call(e, l), ce.fx.timer(ce.extend(u, {
			elem: e,
			anim: l,
			queue: l.opts.queue
		})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
	}
	function W(e, t) {
		var n, r, i, o, a;
		for (n in e) if (r = ce.camelCase(n), i = t[r], o = e[n], ce.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = ce.cssHooks[r], a && "expand" in a) {
			o = a.expand(o), delete e[r];
			for (n in o) n in e || (e[n] = o[n], t[n] = i)
		} else t[r] = i
	}
	function $(e, t, n) {
		var r, i, o, a, s, u, l = this,
			c = {},
			f = e.style,
			p = e.nodeType && C(e),
			d = ce._data(e, "fxshow");
		n.queue || (s = ce._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
			s.unqueued || u()
		}), s.unqueued++, l.always(function() {
			l.always(function() {
				s.unqueued--, ce.queue(e, "fx").length || s.empty.fire()
			})
		})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], "inline" === ce.css(e, "display") && "none" === ce.css(e, "float") && (ce.support.inlineBlockNeedsLayout && "inline" !== A(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", ce.support.shrinkWrapBlocks || l.always(function() {
			f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
		}));
		for (r in t) if (i = t[r], en.exec(i)) {
			if (delete t[r], o = o || "toggle" === i, i === (p ? "hide" : "show")) continue;
			c[r] = d && d[r] || ce.style(e, r)
		}
		if (!ce.isEmptyObject(c)) {
			d ? "hidden" in d && (p = d.hidden) : d = ce._data(e, "fxshow", {}), o && (d.hidden = !p), p ? ce(e).show() : l.done(function() {
				ce(e).hide()
			}), l.done(function() {
				var t;
				ce._removeData(e, "fxshow");
				for (t in c) ce.style(e, t, c[t])
			});
			for (r in c) a = P(p ? d[r] : 0, r, l), r in d || (d[r] = a.start, p && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
		}
	}
	function I(e, t, n, r, i) {
		return new I.prototype.init(e, t, n, r, i)
	}
	function z(e, t) {
		var n, r = {
			height: e
		},
			i = 0;
		for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Ct[i], r["margin" + n] = r["padding" + n] = e;
		return t && (r.opacity = r.width = e), r
	}
	function X(e) {
		return ce.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
	}
	var U, V, Y = typeof t,
		J = e.location,
		G = e.document,
		Q = G.documentElement,
		K = e.jQuery,
		Z = e.$,
		ee = {},
		te = [],
		ne = "1.10.2",
		re = te.concat,
		ie = te.push,
		oe = te.slice,
		ae = te.indexOf,
		se = ee.toString,
		ue = ee.hasOwnProperty,
		le = ne.trim,
		ce = function(e, t) {
			return new ce.fn.init(e, t, V)
		},
		fe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		pe = /\S+/g,
		de = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		he = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		ge = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		me = /^[\],:{}\s]*$/,
		ye = /(?:^|:|,)(?:\s*\[)+/g,
		ve = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		be = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
		xe = /^-ms-/,
		we = /-([\da-z])/gi,
		Te = function(e, t) {
			return t.toUpperCase()
		},
		Ce = function(e) {
			(G.addEventListener || "load" === e.type || "complete" === G.readyState) && (Ne(), ce.ready())
		},
		Ne = function() {
			G.addEventListener ? (G.removeEventListener("DOMContentLoaded", Ce, !1), e.removeEventListener("load", Ce, !1)) : (G.detachEvent("onreadystatechange", Ce), e.detachEvent("onload", Ce))
		};
	ce.fn = ce.prototype = {
		jquery: ne,
		constructor: ce,
		init: function(e, n, r) {
			var i, o;
			if (!e) return this;
			if ("string" == typeof e) {
				if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : he.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
				if (i[1]) {
					if (n = n instanceof ce ? n[0] : n, ce.merge(this, ce.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : G, !0)), ge.test(i[1]) && ce.isPlainObject(n)) for (i in n) ce.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
					return this
				}
				if (o = G.getElementById(i[2]), o && o.parentNode) {
					if (o.id !== i[2]) return r.find(e);
					this.length = 1, this[0] = o
				}
				return this.context = G, this.selector = e, this
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ce.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ce.makeArray(e, this))
		},
		selector: "",
		length: 0,
		toArray: function() {
			return oe.call(this)
		},
		get: function(e) {
			return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
		},
		pushStack: function(e) {
			var t = ce.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function(e, t) {
			return ce.each(this, e, t)
		},
		ready: function(e) {
			return ce.ready.promise().done(e), this
		},
		slice: function() {
			return this.pushStack(oe.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(e) {
			var t = this.length,
				n = +e + (0 > e ? t : 0);
			return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
		},
		map: function(e) {
			return this.pushStack(ce.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: ie,
		sort: [].sort,
		splice: [].splice
	}, ce.fn.init.prototype = ce.fn, ce.extend = ce.fn.extend = function() {
		var e, n, r, i, o, a, s = arguments[0] || {},
			u = 1,
			l = arguments.length,
			c = !1;
		for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || ce.isFunction(s) || (s = {}), l === u && (s = this, --u); l > u; u++) if (null != (o = arguments[u])) for (i in o) e = s[i], r = o[i], s !== r && (c && r && (ce.isPlainObject(r) || (n = ce.isArray(r))) ? (n ? (n = !1, a = e && ce.isArray(e) ? e : []) : a = e && ce.isPlainObject(e) ? e : {}, s[i] = ce.extend(c, a, r)) : r !== t && (s[i] = r));
		return s
	}, ce.extend({
		expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""),
		noConflict: function(t) {
			return e.$ === ce && (e.$ = Z), t && e.jQuery === ce && (e.jQuery = K), ce
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? ce.readyWait++ : ce.ready(!0)
		},
		ready: function(e) {
			if (e === !0 ? !--ce.readyWait : !ce.isReady) {
				if (!G.body) return setTimeout(ce.ready);
				ce.isReady = !0, e !== !0 && --ce.readyWait > 0 || (U.resolveWith(G, [ce]), ce.fn.trigger && ce(G).trigger("ready").off("ready"))
			}
		},
		isFunction: function(e) {
			return "function" === ce.type(e)
		},
		isArray: Array.isArray ||
		function(e) {
			return "array" === ce.type(e)
		},
		isWindow: function(e) {
			return null != e && e == e.window
		},
		isNumeric: function(e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		type: function(e) {
			return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? ee[se.call(e)] || "object" : typeof e
		},
		isPlainObject: function(e) {
			var n;
			if (!e || "object" !== ce.type(e) || e.nodeType || ce.isWindow(e)) return !1;
			try {
				if (e.constructor && !ue.call(e, "constructor") && !ue.call(e.constructor.prototype, "isPrototypeOf")) return !1
			} catch (r) {
				return !1
			}
			if (ce.support.ownLast) for (n in e) return ue.call(e, n);
			for (n in e);
			return n === t || ue.call(e, n)
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		error: function(e) {
			throw new Error(e)
		},
		parseHTML: function(e, t, n) {
			if (!e || "string" != typeof e) return null;
			"boolean" == typeof t && (n = t, t = !1), t = t || G;
			var r = ge.exec(e),
				i = !n && [];
			return r ? [t.createElement(r[1])] : (r = ce.buildFragment([e], t, i), i && ce(i).remove(), ce.merge([], r.childNodes))
		},
		parseJSON: function(t) {
			return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ce.trim(t), t && me.test(t.replace(ve, "@").replace(be, "]").replace(ye, ""))) ? new Function("return " + t)() : void ce.error("Invalid JSON: " + t)
		},
		parseXML: function(n) {
			var r, i;
			if (!n || "string" != typeof n) return null;
			try {
				e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
			} catch (o) {
				r = t
			}
			return r && r.documentElement && !r.getElementsByTagName("parsererror").length || ce.error("Invalid XML: " + n), r
		},
		noop: function() {},
		globalEval: function(t) {
			t && ce.trim(t) && (e.execScript ||
			function(t) {
				e.eval.call(e, t)
			})(t)
		},
		camelCase: function(e) {
			return e.replace(xe, "ms-").replace(we, Te)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, t, r) {
			var i, o = 0,
				a = e.length,
				s = n(e);
			if (r) {
				if (s) for (; a > o && (i = t.apply(e[o], r), i !== !1); o++);
				else for (o in e) if (i = t.apply(e[o], r), i === !1) break
			} else if (s) for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
			else for (o in e) if (i = t.call(e[o], o, e[o]), i === !1) break;
			return e
		},
		trim: le && !le.call("\ufeff ") ?
		function(e) {
			return null == e ? "" : le.call(e)
		} : function(e) {
			return null == e ? "" : (e + "").replace(de, "")
		},
		makeArray: function(e, t) {
			var r = t || [];
			return null != e && (n(Object(e)) ? ce.merge(r, "string" == typeof e ? [e] : e) : ie.call(r, e)), r
		},
		inArray: function(e, t, n) {
			var r;
			if (t) {
				if (ae) return ae.call(t, e, n);
				for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n
			}
			return -1
		},
		merge: function(e, n) {
			var r = n.length,
				i = e.length,
				o = 0;
			if ("number" == typeof r) for (; r > o; o++) e[i++] = n[o];
			else for (; n[o] !== t;) e[i++] = n[o++];
			return e.length = i, e
		},
		grep: function(e, t, n) {
			var r, i = [],
				o = 0,
				a = e.length;
			for (n = !! n; a > o; o++) r = !! t(e[o], o), n !== r && i.push(e[o]);
			return i
		},
		map: function(e, t, r) {
			var i, o = 0,
				a = e.length,
				s = n(e),
				u = [];
			if (s) for (; a > o; o++) i = t(e[o], o, r), null != i && (u[u.length] = i);
			else for (o in e) i = t(e[o], o, r), null != i && (u[u.length] = i);
			return re.apply([], u)
		},
		guid: 1,
		proxy: function(e, n) {
			var r, i, o;
			return "string" == typeof n && (o = e[n], n = e, e = o), ce.isFunction(e) ? (r = oe.call(arguments, 2), i = function() {
				return e.apply(n || this, r.concat(oe.call(arguments)))
			}, i.guid = e.guid = e.guid || ce.guid++, i) : t
		},
		access: function(e, n, r, i, o, a, s) {
			var u = 0,
				l = e.length,
				c = null == r;
			if ("object" === ce.type(r)) {
				o = !0;
				for (u in r) ce.access(e, n, u, r[u], !0, a, s)
			} else if (i !== t && (o = !0, ce.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function(e, t, n) {
				return c.call(ce(e), n)
			})), n)) for (; l > u; u++) n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
			return o ? e : c ? n.call(e) : l ? n(e[0], r) : a
		},
		now: function() {
			return (new Date).getTime()
		},
		swap: function(e, t, n, r) {
			var i, o, a = {};
			for (o in t) a[o] = e.style[o], e.style[o] = t[o];
			i = n.apply(e, r || []);
			for (o in t) e.style[o] = a[o];
			return i
		}
	}), ce.ready.promise = function(t) {
		if (!U) if (U = ce.Deferred(), "complete" === G.readyState) setTimeout(ce.ready);
		else if (G.addEventListener) G.addEventListener("DOMContentLoaded", Ce, !1), e.addEventListener("load", Ce, !1);
		else {
			G.attachEvent("onreadystatechange", Ce), e.attachEvent("onload", Ce);
			var n = !1;
			try {
				n = null == e.frameElement && G.documentElement
			} catch (r) {}
			n && n.doScroll && !
			function i() {
				if (!ce.isReady) {
					try {
						n.doScroll("left")
					} catch (e) {
						return setTimeout(i, 50)
					}
					Ne(), ce.ready()
				}
			}()
		}
		return U.promise(t)
	}, ce.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		ee["[object " + t + "]"] = t.toLowerCase()
	}), V = ce(G), function(e, t) {
		function n(e, t, n, r) {
			var i, o, a, s, u, l, c, f, h, g;
			if ((t ? t.ownerDocument || t : R) !== H && L(t), t = t || H, n = n || [], !e || "string" != typeof e) return n;
			if (1 !== (s = t.nodeType) && 9 !== s) return [];
			if (_ && !r) {
				if (i = be.exec(e)) if (a = i[1]) {
					if (9 === s) {
						if (o = t.getElementById(a), !o || !o.parentNode) return n;
						if (o.id === a) return n.push(o), n
					} else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && B(t, o) && o.id === a) return n.push(o), n
				} else {
					if (i[2]) return ee.apply(n, t.getElementsByTagName(e)), n;
					if ((a = i[3]) && C.getElementsByClassName && t.getElementsByClassName) return ee.apply(n, t.getElementsByClassName(a)), n
				}
				if (C.qsa && (!F || !F.test(e))) {
					if (f = c = P, h = t, g = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
						for (l = p(e), (c = t.getAttribute("id")) ? f = c.replace(Te, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", u = l.length; u--;) l[u] = f + d(l[u]);
						h = de.test(e) && t.parentNode || t, g = l.join(",")
					}
					if (g) try {
						return ee.apply(n, h.querySelectorAll(g)), n
					} catch (m) {} finally {
						c || t.removeAttribute("id")
					}
				}
			}
			return w(e.replace(le, "$1"), t, n, r)
		}
		function r() {
			function e(n, r) {
				return t.push(n += " ") > k.cacheLength && delete e[t.shift()], e[n] = r
			}
			var t = [];
			return e
		}
		function i(e) {
			return e[P] = !0, e
		}
		function o(e) {
			var t = H.createElement("div");
			try {
				return !!e(t)
			} catch (n) {
				return !1
			} finally {
				t.parentNode && t.parentNode.removeChild(t), t = null
			}
		}
		function a(e, t) {
			for (var n = e.split("|"), r = e.length; r--;) k.attrHandle[n[r]] = t
		}
		function s(e, t) {
			var n = t && e,
				r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || J) - (~e.sourceIndex || J);
			if (r) return r;
			if (n) for (; n = n.nextSibling;) if (n === t) return -1;
			return e ? 1 : -1
		}
		function u(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return "input" === n && t.type === e
			}
		}
		function l(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return ("input" === n || "button" === n) && t.type === e
			}
		}
		function c(e) {
			return i(function(t) {
				return t = +t, i(function(n, r) {
					for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
				})
			})
		}
		function f() {}
		function p(e, t) {
			var r, i, o, a, s, u, l, c = z[e + " "];
			if (c) return t ? 0 : c.slice(0);
			for (s = e, u = [], l = k.preFilter; s;) {
				(!r || (i = fe.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = pe.exec(s)) && (r = i.shift(), o.push({
					value: r,
					type: i[0].replace(le, " ")
				}), s = s.slice(r.length));
				for (a in k.filter)!(i = ye[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
					value: r,
					type: a,
					matches: i
				}), s = s.slice(r.length));
				if (!r) break
			}
			return t ? s.length : s ? n.error(e) : z(e, u).slice(0)
		}
		function d(e) {
			for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
			return r
		}
		function h(e, t, n) {
			var r = t.dir,
				i = n && "parentNode" === r,
				o = $++;
			return t.first ?
			function(t, n, o) {
				for (; t = t[r];) if (1 === t.nodeType || i) return e(t, n, o)
			} : function(t, n, a) {
				var s, u, l, c = W + " " + o;
				if (a) {
					for (; t = t[r];) if ((1 === t.nodeType || i) && e(t, n, a)) return !0
				} else for (; t = t[r];) if (1 === t.nodeType || i) if (l = t[P] || (t[P] = {}), (u = l[r]) && u[0] === c) {
					if ((s = u[1]) === !0 || s === N) return s === !0
				} else if (u = l[r] = [c], u[1] = e(t, n, a) || N, u[1] === !0) return !0
			}
		}
		function g(e) {
			return e.length > 1 ?
			function(t, n, r) {
				for (var i = e.length; i--;) if (!e[i](t, n, r)) return !1;
				return !0
			} : e[0]
		}
		function m(e, t, n, r, i) {
			for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
			return a
		}
		function y(e, t, n, r, o, a) {
			return r && !r[P] && (r = y(r)), o && !o[P] && (o = y(o, a)), i(function(i, a, s, u) {
				var l, c, f, p = [],
					d = [],
					h = a.length,
					g = i || x(t || "*", s.nodeType ? [s] : s, []),
					y = !e || !i && t ? g : m(g, p, e, s, u),
					v = n ? o || (i ? e : h || r) ? [] : a : y;
				if (n && n(y, v, s, u), r) for (l = m(v, d), r(l, [], s, u), c = l.length; c--;)(f = l[c]) && (v[d[c]] = !(y[d[c]] = f));
				if (i) {
					if (o || e) {
						if (o) {
							for (l = [], c = v.length; c--;)(f = v[c]) && l.push(y[c] = f);
							o(null, v = [], l, u)
						}
						for (c = v.length; c--;)(f = v[c]) && (l = o ? ne.call(i, f) : p[c]) > -1 && (i[l] = !(a[l] = f))
					}
				} else v = m(v === a ? v.splice(h, v.length) : v), o ? o(null, a, v, u) : ee.apply(a, v)
			})
		}
		function v(e) {
			for (var t, n, r, i = e.length, o = k.relative[e[0].type], a = o || k.relative[" "], s = o ? 1 : 0, u = h(function(e) {
				return e === t
			}, a, !0), l = h(function(e) {
				return ne.call(t, e) > -1
			}, a, !0), c = [function(e, n, r) {
				return !o && (r || n !== j) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
			}]; i > s; s++) if (n = k.relative[e[s].type]) c = [h(g(c), n)];
			else {
				if (n = k.filter[e[s].type].apply(null, e[s].matches), n[P]) {
					for (r = ++s; i > r && !k.relative[e[r].type]; r++);
					return y(s > 1 && g(c), s > 1 && d(e.slice(0, s - 1).concat({
						value: " " === e[s - 2].type ? "*" : ""
					})).replace(le, "$1"), n, r > s && v(e.slice(s, r)), i > r && v(e = e.slice(r)), i > r && d(e))
				}
				c.push(n)
			}
			return g(c)
		}
		function b(e, t) {
			var r = 0,
				o = t.length > 0,
				a = e.length > 0,
				s = function(i, s, u, l, c) {
					var f, p, d, h = [],
						g = 0,
						y = "0",
						v = i && [],
						b = null != c,
						x = j,
						w = i || a && k.find.TAG("*", c && s.parentNode || s),
						T = W += null == x ? 1 : Math.random() || .1;
					for (b && (j = s !== H && s, N = r); null != (f = w[y]); y++) {
						if (a && f) {
							for (p = 0; d = e[p++];) if (d(f, s, u)) {
								l.push(f);
								break
							}
							b && (W = T, N = ++r)
						}
						o && ((f = !d && f) && g--, i && v.push(f))
					}
					if (g += y, o && y !== g) {
						for (p = 0; d = t[p++];) d(v, h, s, u);
						if (i) {
							if (g > 0) for (; y--;) v[y] || h[y] || (h[y] = K.call(l));
							h = m(h)
						}
						ee.apply(l, h), b && !i && h.length > 0 && g + t.length > 1 && n.uniqueSort(l)
					}
					return b && (W = T, j = x), v
				};
			return o ? i(s) : s
		}
		function x(e, t, r) {
			for (var i = 0, o = t.length; o > i; i++) n(e, t[i], r);
			return r
		}
		function w(e, t, n, r) {
			var i, o, a, s, u, l = p(e);
			if (!r && 1 === l.length) {
				if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && C.getById && 9 === t.nodeType && _ && k.relative[o[1].type]) {
					if (t = (k.find.ID(a.matches[0].replace(Ce, Ne), t) || [])[0], !t) return n;
					e = e.slice(o.shift().value.length)
				}
				for (i = ye.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !k.relative[s = a.type]);) if ((u = k.find[s]) && (r = u(a.matches[0].replace(Ce, Ne), de.test(o[0].type) && t.parentNode || t))) {
					if (o.splice(i, 1), e = r.length && d(o), !e) return ee.apply(n, r), n;
					break
				}
			}
			return A(e, l)(r, t, !_, n, de.test(e)), n
		}
		var T, C, N, k, E, S, A, j, D, L, H, q, _, F, M, O, B, P = "sizzle" + -new Date,
			R = e.document,
			W = 0,
			$ = 0,
			I = r(),
			z = r(),
			X = r(),
			U = !1,
			V = function(e, t) {
				return e === t ? (U = !0, 0) : 0
			},
			Y = typeof t,
			J = 1 << 31,
			G = {}.hasOwnProperty,
			Q = [],
			K = Q.pop,
			Z = Q.push,
			ee = Q.push,
			te = Q.slice,
			ne = Q.indexOf ||
		function(e) {
			for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
			return -1
		}, re = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ie = "[\\x20\\t\\r\\n\\f]", oe = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ae = oe.replace("w", "w#"), se = "\\[" + ie + "*(" + oe + ")" + ie + "*(?:([*^$|!~]?=)" + ie + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ae + ")|)|)" + ie + "*\\]", ue = ":(" + oe + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + se.replace(3, 8) + ")*)|.*)\\)|)", le = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"), fe = new RegExp("^" + ie + "*," + ie + "*"), pe = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"), de = new RegExp(ie + "*[+~]"), he = new RegExp("=" + ie + "*([^\\]'\"]*)" + ie + "*\\]", "g"), ge = new RegExp(ue), me = new RegExp("^" + ae + "$"), ye = {
			ID: new RegExp("^#(" + oe + ")"),
			CLASS: new RegExp("^\\.(" + oe + ")"),
			TAG: new RegExp("^(" + oe.replace("w", "w*") + ")"),
			ATTR: new RegExp("^" + se),
			PSEUDO: new RegExp("^" + ue),
			CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"),
			bool: new RegExp("^(?:" + re + ")$", "i"),
			needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i")
		}, ve = /^[^{]+\{\s*\[native \w/, be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, xe = /^(?:input|select|textarea|button)$/i, we = /^h\d$/i, Te = /'|\\/g, Ce = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"), Ne = function(e, t, n) {
			var r = "0x" + t - 65536;
			return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
		};
		try {
			ee.apply(Q = te.call(R.childNodes), R.childNodes), Q[R.childNodes.length].nodeType
		} catch (ke) {
			ee = {
				apply: Q.length ?
				function(e, t) {
					Z.apply(e, te.call(t))
				} : function(e, t) {
					for (var n = e.length, r = 0; e[n++] = t[r++];);
					e.length = n - 1
				}
			}
		}
		S = n.isXML = function(e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return t ? "HTML" !== t.nodeName : !1
		}, C = n.support = {}, L = n.setDocument = function(e) {
			var t = e ? e.ownerDocument || e : R,
				n = t.defaultView;
			return t !== H && 9 === t.nodeType && t.documentElement ? (H = t, q = t.documentElement, _ = !S(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function() {
				L()
			}), C.attributes = o(function(e) {
				return e.className = "i", !e.getAttribute("className")
			}), C.getElementsByTagName = o(function(e) {
				return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
			}), C.getElementsByClassName = o(function(e) {
				return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
			}), C.getById = o(function(e) {
				return q.appendChild(e).id = P, !t.getElementsByName || !t.getElementsByName(P).length
			}), C.getById ? (k.find.ID = function(e, t) {
				if (typeof t.getElementById !== Y && _) {
					var n = t.getElementById(e);
					return n && n.parentNode ? [n] : []
				}
			}, k.filter.ID = function(e) {
				var t = e.replace(Ce, Ne);
				return function(e) {
					return e.getAttribute("id") === t
				}
			}) : (delete k.find.ID, k.filter.ID = function(e) {
				var t = e.replace(Ce, Ne);
				return function(e) {
					var n = typeof e.getAttributeNode !== Y && e.getAttributeNode("id");
					return n && n.value === t
				}
			}), k.find.TAG = C.getElementsByTagName ?
			function(e, t) {
				return typeof t.getElementsByTagName !== Y ? t.getElementsByTagName(e) : void 0
			} : function(e, t) {
				var n, r = [],
					i = 0,
					o = t.getElementsByTagName(e);
				if ("*" === e) {
					for (; n = o[i++];) 1 === n.nodeType && r.push(n);
					return r
				}
				return o
			}, k.find.CLASS = C.getElementsByClassName &&
			function(e, t) {
				return typeof t.getElementsByClassName !== Y && _ ? t.getElementsByClassName(e) : void 0
			}, M = [], F = [], (C.qsa = ve.test(t.querySelectorAll)) && (o(function(e) {
				e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || F.push("\\[" + ie + "*(?:value|" + re + ")"), e.querySelectorAll(":checked").length || F.push(":checked")
			}), o(function(e) {
				var n = t.createElement("input");
				n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && F.push("[*^$]=" + ie + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), F.push(",.*:")
			})), (C.matchesSelector = ve.test(O = q.webkitMatchesSelector || q.mozMatchesSelector || q.oMatchesSelector || q.msMatchesSelector)) && o(function(e) {
				C.disconnectedMatch = O.call(e, "div"), O.call(e, "[s!='']:x"), M.push("!=", ue)
			}), F = F.length && new RegExp(F.join("|")), M = M.length && new RegExp(M.join("|")), B = ve.test(q.contains) || q.compareDocumentPosition ?
			function(e, t) {
				var n = 9 === e.nodeType ? e.documentElement : e,
					r = t && t.parentNode;
				return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
			} : function(e, t) {
				if (t) for (; t = t.parentNode;) if (t === e) return !0;
				return !1
			}, V = q.compareDocumentPosition ?
			function(e, n) {
				if (e === n) return U = !0, 0;
				var r = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
				return r ? 1 & r || !C.sortDetached && n.compareDocumentPosition(e) === r ? e === t || B(R, e) ? -1 : n === t || B(R, n) ? 1 : D ? ne.call(D, e) - ne.call(D, n) : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
			} : function(e, n) {
				var r, i = 0,
					o = e.parentNode,
					a = n.parentNode,
					u = [e],
					l = [n];
				if (e === n) return U = !0, 0;
				if (!o || !a) return e === t ? -1 : n === t ? 1 : o ? -1 : a ? 1 : D ? ne.call(D, e) - ne.call(D, n) : 0;
				if (o === a) return s(e, n);
				for (r = e; r = r.parentNode;) u.unshift(r);
				for (r = n; r = r.parentNode;) l.unshift(r);
				for (; u[i] === l[i];) i++;
				return i ? s(u[i], l[i]) : u[i] === R ? -1 : l[i] === R ? 1 : 0
			}, t) : H
		}, n.matches = function(e, t) {
			return n(e, null, null, t)
		}, n.matchesSelector = function(e, t) {
			if ((e.ownerDocument || e) !== H && L(e), t = t.replace(he, "='$1']"), C.matchesSelector && _ && (!M || !M.test(t)) && (!F || !F.test(t))) try {
				var r = O.call(e, t);
				if (r || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
			} catch (i) {}
			return n(t, H, null, [e]).length > 0
		}, n.contains = function(e, t) {
			return (e.ownerDocument || e) !== H && L(e), B(e, t)
		}, n.attr = function(e, n) {
			(e.ownerDocument || e) !== H && L(e);
			var r = k.attrHandle[n.toLowerCase()],
				i = r && G.call(k.attrHandle, n.toLowerCase()) ? r(e, n, !_) : t;
			return i === t ? C.attributes || !_ ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null : i
		}, n.error = function(e) {
			throw new Error("Syntax error, unrecognized expression: " + e)
		}, n.uniqueSort = function(e) {
			var t, n = [],
				r = 0,
				i = 0;
			if (U = !C.detectDuplicates, D = !C.sortStable && e.slice(0), e.sort(V), U) {
				for (; t = e[i++];) t === e[i] && (r = n.push(i));
				for (; r--;) e.splice(n[r], 1)
			}
			return e
		}, E = n.getText = function(e) {
			var t, n = "",
				r = 0,
				i = e.nodeType;
			if (i) {
				if (1 === i || 9 === i || 11 === i) {
					if ("string" == typeof e.textContent) return e.textContent;
					for (e = e.firstChild; e; e = e.nextSibling) n += E(e)
				} else if (3 === i || 4 === i) return e.nodeValue
			} else for (; t = e[r]; r++) n += E(t);
			return n
		}, k = n.selectors = {
			cacheLength: 50,
			createPseudo: i,
			match: ye,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(e) {
					return e[1] = e[1].replace(Ce, Ne), e[3] = (e[4] || e[5] || "").replace(Ce, Ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
				},
				CHILD: function(e) {
					return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), e
				},
				PSEUDO: function(e) {
					var n, r = !e[5] && e[2];
					return ye.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && ge.test(r) && (n = p(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3))
				}
			},
			filter: {
				TAG: function(e) {
					var t = e.replace(Ce, Ne).toLowerCase();
					return "*" === e ?
					function() {
						return !0
					} : function(e) {
						return e.nodeName && e.nodeName.toLowerCase() === t
					}
				},
				CLASS: function(e) {
					var t = I[e + " "];
					return t || (t = new RegExp("(^|" + ie + ")" + e + "(" + ie + "|$)")) && I(e, function(e) {
						return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Y && e.getAttribute("class") || "")
					})
				},
				ATTR: function(e, t, r) {
					return function(i) {
						var o = n.attr(i, e);
						return null == o ? "!=" === t : t ? (o += "", "=" === t ? o === r : "!=" === t ? o !== r : "^=" === t ? r && 0 === o.indexOf(r) : "*=" === t ? r && o.indexOf(r) > -1 : "$=" === t ? r && o.slice(-r.length) === r : "~=" === t ? (" " + o + " ").indexOf(r) > -1 : "|=" === t ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
					}
				},
				CHILD: function(e, t, n, r, i) {
					var o = "nth" !== e.slice(0, 3),
						a = "last" !== e.slice(-4),
						s = "of-type" === t;
					return 1 === r && 0 === i ?
					function(e) {
						return !!e.parentNode
					} : function(t, n, u) {
						var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling",
							m = t.parentNode,
							y = s && t.nodeName.toLowerCase(),
							v = !u && !s;
						if (m) {
							if (o) {
								for (; g;) {
									for (f = t; f = f[g];) if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
									h = g = "only" === e && !h && "nextSibling"
								}
								return !0
							}
							if (h = [a ? m.firstChild : m.lastChild], a && v) {
								for (c = m[P] || (m[P] = {}), l = c[e] || [], d = l[0] === W && l[1], p = l[0] === W && l[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop();) if (1 === f.nodeType && ++p && f === t) {
									c[e] = [W, d, p];
									break
								}
							} else if (v && (l = (t[P] || (t[P] = {}))[e]) && l[0] === W) p = l[1];
							else for (;
							(f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++p || (v && ((f[P] || (f[P] = {}))[e] = [W, p]), f !== t)););
							return p -= i, p === r || p % r === 0 && p / r >= 0
						}
					}
				},
				PSEUDO: function(e, t) {
					var r, o = k.pseudos[e] || k.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
					return o[P] ? o(t) : o.length > 1 ? (r = [e, e, "", t], k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, n) {
						for (var r, i = o(e, t), a = i.length; a--;) r = ne.call(e, i[a]), e[r] = !(n[r] = i[a])
					}) : function(e) {
						return o(e, 0, r)
					}) : o
				}
			},
			pseudos: {
				not: i(function(e) {
					var t = [],
						n = [],
						r = A(e.replace(le, "$1"));
					return r[P] ? i(function(e, t, n, i) {
						for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
					}) : function(e, i, o) {
						return t[0] = e, r(t, null, o, n), !n.pop()
					}
				}),
				has: i(function(e) {
					return function(t) {
						return n(e, t).length > 0
					}
				}),
				contains: i(function(e) {
					return function(t) {
						return (t.textContent || t.innerText || E(t)).indexOf(e) > -1
					}
				}),
				lang: i(function(e) {
					return me.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(Ce, Ne).toLowerCase(), function(t) {
						var n;
						do
						if (n = _ ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
						while ((t = t.parentNode) && 1 === t.nodeType);
						return !1
					}
				}),
				target: function(t) {
					var n = e.location && e.location.hash;
					return n && n.slice(1) === t.id
				},
				root: function(e) {
					return e === q
				},
				focus: function(e) {
					return e === H.activeElement && (!H.hasFocus || H.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
				},
				enabled: function(e) {
					return e.disabled === !1
				},
				disabled: function(e) {
					return e.disabled === !0
				},
				checked: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && !! e.checked || "option" === t && !! e.selected
				},
				selected: function(e) {
					return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
				},
				empty: function(e) {
					for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
					return !0
				},
				parent: function(e) {
					return !k.pseudos.empty(e)
				},
				header: function(e) {
					return we.test(e.nodeName)
				},
				input: function(e) {
					return xe.test(e.nodeName)
				},
				button: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && "button" === e.type || "button" === t
				},
				text: function(e) {
					var t;
					return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
				},
				first: c(function() {
					return [0]
				}),
				last: c(function(e, t) {
					return [t - 1]
				}),
				eq: c(function(e, t, n) {
					return [0 > n ? n + t : n]
				}),
				even: c(function(e, t) {
					for (var n = 0; t > n; n += 2) e.push(n);
					return e
				}),
				odd: c(function(e, t) {
					for (var n = 1; t > n; n += 2) e.push(n);
					return e
				}),
				lt: c(function(e, t, n) {
					for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
					return e
				}),
				gt: c(function(e, t, n) {
					for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
					return e
				})
			}
		}, k.pseudos.nth = k.pseudos.eq;
		for (T in {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}) k.pseudos[T] = u(T);
		for (T in {
			submit: !0,
			reset: !0
		}) k.pseudos[T] = l(T);
		f.prototype = k.filters = k.pseudos, k.setFilters = new f, A = n.compile = function(e, t) {
			var n, r = [],
				i = [],
				o = X[e + " "];
			if (!o) {
				for (t || (t = p(e)), n = t.length; n--;) o = v(t[n]), o[P] ? r.push(o) : i.push(o);
				o = X(e, b(i, r))
			}
			return o
		}, C.sortStable = P.split("").sort(V).join("") === P, C.detectDuplicates = U, L(), C.sortDetached = o(function(e) {
			return 1 & e.compareDocumentPosition(H.createElement("div"))
		}), o(function(e) {
			return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
		}) || a("type|href|height|width", function(e, t, n) {
			return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
		}), C.attributes && o(function(e) {
			return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
		}) || a("value", function(e, t, n) {
			return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
		}), o(function(e) {
			return null == e.getAttribute("disabled")
		}) || a(re, function(e, t, n) {
			var r;
			return n ? void 0 : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
		}), ce.find = n, ce.expr = n.selectors, ce.expr[":"] = ce.expr.pseudos, ce.unique = n.uniqueSort, ce.text = n.getText, ce.isXMLDoc = n.isXML, ce.contains = n.contains
	}(e);
	var ke = {};
	ce.Callbacks = function(e) {
		e = "string" == typeof e ? ke[e] || r(e) : ce.extend({}, e);
		var n, i, o, a, s, u, l = [],
			c = !e.once && [],
			f = function(t) {
				for (i = e.memory && t, o = !0, s = u || 0, u = 0, a = l.length, n = !0; l && a > s; s++) if (l[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
					i = !1;
					break
				}
				n = !1, l && (c ? c.length && f(c.shift()) : i ? l = [] : p.disable())
			},
			p = {
				add: function() {
					if (l) {
						var t = l.length;
						!
						function r(t) {
							ce.each(t, function(t, n) {
								var i = ce.type(n);
								"function" === i ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== i && r(n)
							})
						}(arguments), n ? a = l.length : i && (u = t, f(i))
					}
					return this
				},
				remove: function() {
					return l && ce.each(arguments, function(e, t) {
						for (var r;
						(r = ce.inArray(t, l, r)) > -1;) l.splice(r, 1), n && (a >= r && a--, s >= r && s--)
					}), this
				},
				has: function(e) {
					return e ? ce.inArray(e, l) > -1 : !(!l || !l.length)
				},
				empty: function() {
					return l = [], a = 0, this
				},
				disable: function() {
					return l = c = i = t, this
				},
				disabled: function() {
					return !l
				},
				lock: function() {
					return c = t, i || p.disable(), this
				},
				locked: function() {
					return !c
				},
				fireWith: function(e, t) {
					return !l || o && !c || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? c.push(t) : f(t)), this
				},
				fire: function() {
					return p.fireWith(this, arguments), this
				},
				fired: function() {
					return !!o
				}
			};
		return p
	}, ce.extend({
		Deferred: function(e) {
			var t = [
				["resolve", "done", ce.Callbacks("once memory"), "resolved"],
				["reject", "fail", ce.Callbacks("once memory"), "rejected"],
				["notify", "progress", ce.Callbacks("memory")]
			],
				n = "pending",
				r = {
					state: function() {
						return n
					},
					always: function() {
						return i.done(arguments).fail(arguments), this
					},
					then: function() {
						var e = arguments;
						return ce.Deferred(function(n) {
							ce.each(t, function(t, o) {
								var a = o[0],
									s = ce.isFunction(e[t]) && e[t];
								i[o[1]](function() {
									var e = s && s.apply(this, arguments);
									e && ce.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					promise: function(e) {
						return null != e ? ce.extend(e, r) : r
					}
				},
				i = {};
			return r.pipe = r.then, ce.each(t, function(e, o) {
				var a = o[2],
					s = o[3];
				r[o[1]] = a.add, s && a.add(function() {
					n = s
				}, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
					return i[o[0] + "With"](this === i ? r : this, arguments), this
				}, i[o[0] + "With"] = a.fireWith
			}), r.promise(i), e && e.call(i, i), i
		},
		when: function(e) {
			var t, n, r, i = 0,
				o = oe.call(arguments),
				a = o.length,
				s = 1 !== a || e && ce.isFunction(e.promise) ? a : 0,
				u = 1 === s ? e : ce.Deferred(),
				l = function(e, n, r) {
					return function(i) {
						n[e] = this, r[e] = arguments.length > 1 ? oe.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
					}
				};
			if (a > 1) for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && ce.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s;
			return s || u.resolveWith(r, o), u.promise()
		}
	}), ce.support = function(t) {
		var n, r, i, o, a, s, u, l, c, f = G.createElement("div");
		if (f.setAttribute("className", "t"), f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = f.getElementsByTagName("*") || [], r = f.getElementsByTagName("a")[0], !r || !r.style || !n.length) return t;
		o = G.createElement("select"), s = o.appendChild(G.createElement("option")), i = f.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== f.className, t.leadingWhitespace = 3 === f.firstChild.nodeType, t.tbody = !f.getElementsByTagName("tbody").length, t.htmlSerialize = !! f.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !! r.style.cssFloat, t.checkOn = !! i.value, t.optSelected = s.selected, t.enctype = !! G.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== G.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, i.checked = !0, t.noCloneChecked = i.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled;
		try {
			delete f.test
		} catch (p) {
			t.deleteExpando = !1
		}
		i = G.createElement("input"), i.setAttribute("value", ""), t.input = "" === i.getAttribute("value"), i.value = "t", i.setAttribute("type", "radio"), t.radioValue = "t" === i.value, i.setAttribute("checked", "t"), i.setAttribute("name", "t"), a = G.createDocumentFragment(), a.appendChild(i), t.appendChecked = i.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, f.attachEvent && (f.attachEvent("onclick", function() {
			t.noCloneEvent = !1
		}), f.cloneNode(!0).click());
		for (c in {
			submit: !0,
			change: !0,
			focusin: !0
		}) f.setAttribute(u = "on" + c, "t"), t[c + "Bubbles"] = u in e || f.attributes[u].expando === !1;
		f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === f.style.backgroundClip;
		for (c in ce(t)) break;
		return t.ownLast = "0" !== c, ce(function() {
			var n, r, i, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				a = G.getElementsByTagName("body")[0];
			a && (n = G.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(f), f.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = f.getElementsByTagName("td"), i[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = 0 === i[0].offsetHeight, i[0].style.display = "", i[1].style.display = "none", t.reliableHiddenOffsets = l && 0 === i[0].offsetHeight, f.innerHTML = "", f.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ce.swap(a, null != a.style.zoom ? {
				zoom: 1
			} : {}, function() {
				t.boxSizing = 4 === f.offsetWidth
			}), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(f, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(f, null) || {
				width: "4px"
			}).width, r = f.appendChild(G.createElement("div")), r.style.cssText = f.style.cssText = o, r.style.marginRight = r.style.width = "0", f.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof f.style.zoom !== Y && (f.innerHTML = "", f.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === f.offsetWidth, f.style.display = "block", f.innerHTML = "<div></div>", f.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== f.offsetWidth, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = f = i = r = null)
		}), n = o = a = s = r = i = null, t
	}({});
	var Ee = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		Se = /([A-Z])/g;
	ce.extend({
		cache: {},
		noData: {
			applet: !0,
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		hasData: function(e) {
			return e = e.nodeType ? ce.cache[e[ce.expando]] : e[ce.expando], !! e && !s(e)
		},
		data: function(e, t, n) {
			return i(e, t, n)
		},
		removeData: function(e, t) {
			return o(e, t)
		},
		_data: function(e, t, n) {
			return i(e, t, n, !0)
		},
		_removeData: function(e, t) {
			return o(e, t, !0)
		},
		acceptData: function(e) {
			if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
			var t = e.nodeName && ce.noData[e.nodeName.toLowerCase()];
			return !t || t !== !0 && e.getAttribute("classid") === t
		}
	}), ce.fn.extend({
		data: function(e, n) {
			var r, i, o = null,
				s = 0,
				u = this[0];
			if (e === t) {
				if (this.length && (o = ce.data(u), 1 === u.nodeType && !ce._data(u, "parsedAttrs"))) {
					for (r = u.attributes; s < r.length; s++) i = r[s].name, 0 === i.indexOf("data-") && (i = ce.camelCase(i.slice(5)), a(u, i, o[i]));
					ce._data(u, "parsedAttrs", !0)
				}
				return o
			}
			return "object" == typeof e ? this.each(function() {
				ce.data(this, e)
			}) : arguments.length > 1 ? this.each(function() {
				ce.data(this, e, n)
			}) : u ? a(u, e, ce.data(u, e)) : null
		},
		removeData: function(e) {
			return this.each(function() {
				ce.removeData(this, e)
			})
		}
	}), ce.extend({
		queue: function(e, t, n) {
			var r;
			return e ? (t = (t || "fx") + "queue", r = ce._data(e, t), n && (!r || ce.isArray(n) ? r = ce._data(e, t, ce.makeArray(n)) : r.push(n)), r || []) : void 0
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = ce.queue(e, t),
				r = n.length,
				i = n.shift(),
				o = ce._queueHooks(e, t),
				a = function() {
					ce.dequeue(e, t)
				};
			"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return ce._data(e, n) || ce._data(e, n, {
				empty: ce.Callbacks("once memory").add(function() {
					ce._removeData(e, t + "queue"), ce._removeData(e, n)
				})
			})
		}
	}), ce.fn.extend({
		queue: function(e, n) {
			var r = 2;
			return "string" != typeof e && (n = e, e = "fx", r--), arguments.length < r ? ce.queue(this[0], e) : n === t ? this : this.each(function() {
				var t = ce.queue(this, e, n);
				ce._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ce.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				ce.dequeue(this, e)
			})
		},
		delay: function(e, t) {
			return e = ce.fx ? ce.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
				var r = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(r)
				}
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, n) {
			var r, i = 1,
				o = ce.Deferred(),
				a = this,
				s = this.length,
				u = function() {
					--i || o.resolveWith(a, [a])
				};
			for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;) r = ce._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(u));
			return u(), o.promise(n)
		}
	});
	var Ae, je, De = /[\t\r\n\f]/g,
		Le = /\r/g,
		He = /^(?:input|select|textarea|button|object)$/i,
		qe = /^(?:a|area)$/i,
		_e = /^(?:checked|selected)$/i,
		Fe = ce.support.getSetAttribute,
		Me = ce.support.input;
	ce.fn.extend({
		attr: function(e, t) {
			return ce.access(this, ce.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				ce.removeAttr(this, e)
			})
		},
		prop: function(e, t) {
			return ce.access(this, ce.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return e = ce.propFix[e] || e, this.each(function() {
				try {
					this[e] = t, delete this[e]
				} catch (n) {}
			})
		},
		addClass: function(e) {
			var t, n, r, i, o, a = 0,
				s = this.length,
				u = "string" == typeof e && e;
			if (ce.isFunction(e)) return this.each(function(t) {
				ce(this).addClass(e.call(this, t, this.className))
			});
			if (u) for (t = (e || "").match(pe) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(De, " ") : " ")) {
				for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
				n.className = ce.trim(r)
			}
			return this
		},
		removeClass: function(e) {
			var t, n, r, i, o, a = 0,
				s = this.length,
				u = 0 === arguments.length || "string" == typeof e && e;
			if (ce.isFunction(e)) return this.each(function(t) {
				ce(this).removeClass(e.call(this, t, this.className))
			});
			if (u) for (t = (e || "").match(pe) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(De, " ") : "")) {
				for (o = 0; i = t[o++];) for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
				n.className = e ? ce.trim(r) : ""
			}
			return this
		},
		toggleClass: function(e, t) {
			var n = typeof e;
			return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : ce.isFunction(e) ? this.each(function(n) {
				ce(this).toggleClass(e.call(this, n, this.className, t), t)
			}) : this.each(function() {
				if ("string" === n) for (var t, r = 0, i = ce(this), o = e.match(pe) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
				else(n === Y || "boolean" === n) && (this.className && ce._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ce._data(this, "__className__") || "")
			})
		},
		hasClass: function(e) {
			for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(De, " ").indexOf(t) >= 0) return !0;
			return !1
		},
		val: function(e) {
			var n, r, i, o = this[0]; {
				if (arguments.length) return i = ce.isFunction(e), this.each(function(n) {
					var o;
					1 === this.nodeType && (o = i ? e.call(this, n, ce(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ce.isArray(o) && (o = ce.map(o, function(e) {
						return null == e ? "" : e + ""
					})), r = ce.valHooks[this.type] || ce.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o))
				});
				if (o) return r = ce.valHooks[o.type] || ce.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(Le, "") : null == n ? "" : n)
			}
		}
	}), ce.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = ce.find.attr(e, "value");
					return null != t ? t : e.text
				}
			},
			select: {
				get: function(e) {
					for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++) if (n = r[u], (n.selected || u === i) && (ce.support.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ce.nodeName(n.parentNode, "optgroup"))) {
						if (t = ce(n).val(), o) return t;
						a.push(t)
					}
					return a
				},
				set: function(e, t) {
					for (var n, r, i = e.options, o = ce.makeArray(t), a = i.length; a--;) r = i[a], (r.selected = ce.inArray(ce(r).val(), o) >= 0) && (n = !0);
					return n || (e.selectedIndex = -1), o
				}
			}
		},
		attr: function(e, n, r) {
			var i, o, a = e.nodeType;
			if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === Y ? ce.prop(e, n, r) : (1 === a && ce.isXMLDoc(e) || (n = n.toLowerCase(), i = ce.attrHooks[n] || (ce.expr.match.bool.test(n) ? je : Ae)), r === t ? i && "get" in i && null !== (o = i.get(e, n)) ? o : (o = ce.find.attr(e, n), null == o ? t : o) : null !== r ? i && "set" in i && (o = i.set(e, r, n)) !== t ? o : (e.setAttribute(n, r + ""), r) : void ce.removeAttr(e, n))
		},
		removeAttr: function(e, t) {
			var n, r, i = 0,
				o = t && t.match(pe);
			if (o && 1 === e.nodeType) for (; n = o[i++];) r = ce.propFix[n] || n, ce.expr.match.bool.test(n) ? Me && Fe || !_e.test(n) ? e[r] = !1 : e[ce.camelCase("default-" + n)] = e[r] = !1 : ce.attr(e, n, ""), e.removeAttribute(Fe ? n : r)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!ce.support.radioValue && "radio" === t && ce.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(e, n, r) {
			var i, o, a, s = e.nodeType;
			if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !ce.isXMLDoc(e), a && (n = ce.propFix[n] || n, o = ce.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var t = ce.find.attr(e, "tabindex");
					return t ? parseInt(t, 10) : He.test(e.nodeName) || qe.test(e.nodeName) && e.href ? 0 : -1
				}
			}
		}
	}), je = {
		set: function(e, t, n) {
			return t === !1 ? ce.removeAttr(e, n) : Me && Fe || !_e.test(n) ? e.setAttribute(!Fe && ce.propFix[n] || n, n) : e[ce.camelCase("default-" + n)] = e[n] = !0, n
		}
	}, ce.each(ce.expr.match.bool.source.match(/\w+/g), function(e, n) {
		var r = ce.expr.attrHandle[n] || ce.find.attr;
		ce.expr.attrHandle[n] = Me && Fe || !_e.test(n) ?
		function(e, n, i) {
			var o = ce.expr.attrHandle[n],
				a = i ? t : (ce.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;
			return ce.expr.attrHandle[n] = o, a
		} : function(e, n, r) {
			return r ? t : e[ce.camelCase("default-" + n)] ? n.toLowerCase() : null
		}
	}), Me && Fe || (ce.attrHooks.value = {
		set: function(e, t, n) {
			return ce.nodeName(e, "input") ? void(e.defaultValue = t) : Ae && Ae.set(e, t, n)
		}
	}), Fe || (Ae = {
		set: function(e, n, r) {
			var i = e.getAttributeNode(r);
			return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
		}
	}, ce.expr.attrHandle.id = ce.expr.attrHandle.name = ce.expr.attrHandle.coords = function(e, n, r) {
		var i;
		return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null
	}, ce.valHooks.button = {
		get: function(e, n) {
			var r = e.getAttributeNode(n);
			return r && r.specified ? r.value : t
		},
		set: Ae.set
	}, ce.attrHooks.contenteditable = {
		set: function(e, t, n) {
			Ae.set(e, "" === t ? !1 : t, n)
		}
	}, ce.each(["width", "height"], function(e, t) {
		ce.attrHooks[t] = {
			set: function(e, n) {
				return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
			}
		}
	})), ce.support.hrefNormalized || ce.each(["href", "src"], function(e, t) {
		ce.propHooks[t] = {
			get: function(e) {
				return e.getAttribute(t, 4)
			}
		}
	}), ce.support.style || (ce.attrHooks.style = {
		get: function(e) {
			return e.style.cssText || t
		},
		set: function(e, t) {
			return e.style.cssText = t + ""
		}
	}), ce.support.optSelected || (ce.propHooks.selected = {
		get: function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	}), ce.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		ce.propFix[this.toLowerCase()] = this
	}), ce.support.enctype || (ce.propFix.enctype = "encoding"), ce.each(["radio", "checkbox"], function() {
		ce.valHooks[this] = {
			set: function(e, t) {
				return ce.isArray(t) ? e.checked = ce.inArray(ce(e).val(), t) >= 0 : void 0
			}
		}, ce.support.checkOn || (ce.valHooks[this].get = function(e) {
			return null === e.getAttribute("value") ? "on" : e.value
		})
	});
	var Oe = /^(?:input|select|textarea)$/i,
		Be = /^key/,
		Pe = /^(?:mouse|contextmenu)|click/,
		Re = /^(?:focusinfocus|focusoutblur)$/,
		We = /^([^.]*)(?:\.(.+)|)$/;
	ce.event = {
		global: {},
		add: function(e, n, r, i, o) {
			var a, s, u, l, c, f, p, d, h, g, m, y = ce._data(e);
			if (y) {
				for (r.handler && (l = r, r = l.handler, o = l.selector), r.guid || (r.guid = ce.guid++), (s = y.events) || (s = y.events = {}), (f = y.handle) || (f = y.handle = function(e) {
					return typeof ce === Y || e && ce.event.triggered === e.type ? t : ce.event.dispatch.apply(f.elem, arguments)
				}, f.elem = e), n = (n || "").match(pe) || [""], u = n.length; u--;) a = We.exec(n[u]) || [], h = m = a[1], g = (a[2] || "").split(".").sort(), h && (c = ce.event.special[h] || {}, h = (o ? c.delegateType : c.bindType) || h, c = ce.event.special[h] || {}, p = ce.extend({
					type: h,
					origType: m,
					data: i,
					handler: r,
					guid: r.guid,
					selector: o,
					needsContext: o && ce.expr.match.needsContext.test(o),
					namespace: g.join(".")
				}, l), (d = s[h]) || (d = s[h] = [], d.delegateCount = 0, c.setup && c.setup.call(e, i, g, f) !== !1 || (e.addEventListener ? e.addEventListener(h, f, !1) : e.attachEvent && e.attachEvent("on" + h, f))), c.add && (c.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), o ? d.splice(d.delegateCount++, 0, p) : d.push(p), ce.event.global[h] = !0);
				e = null
			}
		},
		remove: function(e, t, n, r, i) {
			var o, a, s, u, l, c, f, p, d, h, g, m = ce.hasData(e) && ce._data(e);
			if (m && (c = m.events)) {
				for (t = (t || "").match(pe) || [""], l = t.length; l--;) if (s = We.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
					for (f = ce.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = c[d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = p.length; o--;) a = p[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, f.remove && f.remove.call(e, a));
					u && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || ce.removeEvent(e, d, m.handle), delete c[d])
				} else for (d in c) ce.event.remove(e, d + t[l], n, r, !0);
				ce.isEmptyObject(c) && (delete m.handle, ce._removeData(e, "events"))
			}
		},
		trigger: function(n, r, i, o) {
			var a, s, u, l, c, f, p, d = [i || G],
				h = ue.call(n, "type") ? n.type : n,
				g = ue.call(n, "namespace") ? n.namespace.split(".") : [];
			if (u = f = i = i || G, 3 !== i.nodeType && 8 !== i.nodeType && !Re.test(h + ce.event.triggered) && (h.indexOf(".") >= 0 && (g = h.split("."), h = g.shift(), g.sort()), s = h.indexOf(":") < 0 && "on" + h, n = n[ce.expando] ? n : new ce.Event(h, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = g.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : ce.makeArray(r, [n]), c = ce.event.special[h] || {}, o || !c.trigger || c.trigger.apply(i, r) !== !1)) {
				if (!o && !c.noBubble && !ce.isWindow(i)) {
					for (l = c.delegateType || h, Re.test(l + h) || (u = u.parentNode); u; u = u.parentNode) d.push(u), f = u;
					f === (i.ownerDocument || G) && d.push(f.defaultView || f.parentWindow || e)
				}
				for (p = 0;
				(u = d[p++]) && !n.isPropagationStopped();) n.type = p > 1 ? l : c.bindType || h, a = (ce._data(u, "events") || {})[n.type] && ce._data(u, "handle"), a && a.apply(u, r), a = s && u[s], a && ce.acceptData(u) && a.apply && a.apply(u, r) === !1 && n.preventDefault();
				if (n.type = h, !o && !n.isDefaultPrevented() && (!c._default || c._default.apply(d.pop(), r) === !1) && ce.acceptData(i) && s && i[h] && !ce.isWindow(i)) {
					f = i[s], f && (i[s] = null), ce.event.triggered = h;
					try {
						i[h]()
					} catch (m) {}
					ce.event.triggered = t, f && (i[s] = f)
				}
				return n.result
			}
		},
		dispatch: function(e) {
			e = ce.event.fix(e);
			var n, r, i, o, a, s = [],
				u = oe.call(arguments),
				l = (ce._data(this, "events") || {})[e.type] || [],
				c = ce.event.special[e.type] || {};
			if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
				for (s = ce.event.handlers.call(this, e, l), n = 0;
				(o = s[n++]) && !e.isPropagationStopped();) for (e.currentTarget = o.elem, a = 0;
				(i = o.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((ce.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
				return c.postDispatch && c.postDispatch.call(this, e), e.result
			}
		},
		handlers: function(e, n) {
			var r, i, o, a, s = [],
				u = n.delegateCount,
				l = e.target;
			if (u && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
				for (o = [], a = 0; u > a; a++) i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? ce(r, this).index(l) >= 0 : ce.find(r, this, null, [l]).length), o[r] && o.push(i);
				o.length && s.push({
					elem: l,
					handlers: o
				})
			}
			return u < n.length && s.push({
				elem: this,
				handlers: n.slice(u)
			}), s
		},
		fix: function(e) {
			if (e[ce.expando]) return e;
			var t, n, r, i = e.type,
				o = e,
				a = this.fixHooks[i];
			for (a || (this.fixHooks[i] = a = Pe.test(i) ? this.mouseHooks : Be.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new ce.Event(o), t = r.length; t--;) n = r[t], e[n] = o[n];
			return e.target || (e.target = o.srcElement || G), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, a.filter ? a.filter(e, o) : e
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, n) {
				var r, i, o, a = n.button,
					s = n.fromElement;
				return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || G, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
			}
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					if (this !== c() && this.focus) try {
						return this.focus(), !1
					} catch (e) {}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					return this === c() && this.blur ? (this.blur(), !1) : void 0
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					return ce.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
				},
				_default: function(e) {
					return ce.nodeName(e.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					e.result !== t && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		simulate: function(e, t, n, r) {
			var i = ce.extend(new ce.Event, n, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			r ? ce.event.trigger(i, null, t) : ce.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
		}
	}, ce.removeEvent = G.removeEventListener ?
	function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	} : function(e, t, n) {
		var r = "on" + t;
		e.detachEvent && (typeof e[r] === Y && (e[r] = null), e.detachEvent(r, n))
	}, ce.Event = function(e, t) {
		return this instanceof ce.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? u : l) : this.type = e, t && ce.extend(this, t), this.timeStamp = e && e.timeStamp || ce.now(), void(this[ce.expando] = !0)) : new ce.Event(e, t)
	}, ce.Event.prototype = {
		isDefaultPrevented: l,
		isPropagationStopped: l,
		isImmediatePropagationStopped: l,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = u, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = u, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = u, this.stopPropagation()
		}
	}, ce.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(e, t) {
		ce.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				var n, r = this,
					i = e.relatedTarget,
					o = e.handleObj;
				return (!i || i !== r && !ce.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
			}
		}
	}), ce.support.submitBubbles || (ce.event.special.submit = {
		setup: function() {
			return ce.nodeName(this, "form") ? !1 : void ce.event.add(this, "click._submit keypress._submit", function(e) {
				var n = e.target,
					r = ce.nodeName(n, "input") || ce.nodeName(n, "button") ? n.form : t;
				r && !ce._data(r, "submitBubbles") && (ce.event.add(r, "submit._submit", function(e) {
					e._submit_bubble = !0
				}), ce._data(r, "submitBubbles", !0))
			})
		},
		postDispatch: function(e) {
			e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ce.event.simulate("submit", this.parentNode, e, !0))
		},
		teardown: function() {
			return ce.nodeName(this, "form") ? !1 : void ce.event.remove(this, "._submit")
		}
	}), ce.support.changeBubbles || (ce.event.special.change = {
		setup: function() {
			return Oe.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ce.event.add(this, "propertychange._change", function(e) {
				"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
			}), ce.event.add(this, "click._change", function(e) {
				this._just_changed && !e.isTrigger && (this._just_changed = !1), ce.event.simulate("change", this, e, !0)
			})), !1) : void ce.event.add(this, "beforeactivate._change", function(e) {
				var t = e.target;
				Oe.test(t.nodeName) && !ce._data(t, "changeBubbles") && (ce.event.add(t, "change._change", function(e) {
					!this.parentNode || e.isSimulated || e.isTrigger || ce.event.simulate("change", this.parentNode, e, !0)
				}), ce._data(t, "changeBubbles", !0))
			})
		},
		handle: function(e) {
			var t = e.target;
			return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
		},
		teardown: function() {
			return ce.event.remove(this, "._change"), !Oe.test(this.nodeName)
		}
	}), ce.support.focusinBubbles || ce.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		var n = 0,
			r = function(e) {
				ce.event.simulate(t, e.target, ce.event.fix(e), !0)
			};
		ce.event.special[t] = {
			setup: function() {
				0 === n++ && G.addEventListener(e, r, !0)
			},
			teardown: function() {
				0 === --n && G.removeEventListener(e, r, !0)
			}
		}
	}), ce.fn.extend({
		on: function(e, n, r, i, o) {
			var a, s;
			if ("object" == typeof e) {
				"string" != typeof n && (r = r || n, n = t);
				for (a in e) this.on(a, n, r, e[a], o);
				return this
			}
			if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = l;
			else if (!i) return this;
			return 1 === o && (s = i, i = function(e) {
				return ce().off(e), s.apply(this, arguments)
			}, i.guid = s.guid || (s.guid = ce.guid++)), this.each(function() {
				ce.event.add(this, e, i, r, n)
			})
		},
		one: function(e, t, n, r) {
			return this.on(e, t, n, r, 1)
		},
		off: function(e, n, r) {
			var i, o;
			if (e && e.preventDefault && e.handleObj) return i = e.handleObj, ce(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
			if ("object" == typeof e) {
				for (o in e) this.off(o, n, e[o]);
				return this
			}
			return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = l), this.each(function() {
				ce.event.remove(this, e, r, n)
			})
		},
		trigger: function(e, t) {
			return this.each(function() {
				ce.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			var n = this[0];
			return n ? ce.event.trigger(e, t, n, !0) : void 0
		}
	});
	var $e = /^.[^:#\[\.,]*$/,
		Ie = /^(?:parents|prev(?:Until|All))/,
		ze = ce.expr.match.needsContext,
		Xe = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	ce.fn.extend({
		find: function(e) {
			var t, n = [],
				r = this,
				i = r.length;
			if ("string" != typeof e) return this.pushStack(ce(e).filter(function() {
				for (t = 0; i > t; t++) if (ce.contains(r[t], this)) return !0
			}));
			for (t = 0; i > t; t++) ce.find(e, r[t], n);
			return n = this.pushStack(i > 1 ? ce.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
		},
		has: function(e) {
			var t, n = ce(e, this),
				r = n.length;
			return this.filter(function() {
				for (t = 0; r > t; t++) if (ce.contains(this, n[t])) return !0
			})
		},
		not: function(e) {
			return this.pushStack(p(this, e || [], !0))
		},
		filter: function(e) {
			return this.pushStack(p(this, e || [], !1))
		},
		is: function(e) {
			return !!p(this, "string" == typeof e && ze.test(e) ? ce(e) : e || [], !1).length
		},
		closest: function(e, t) {
			for (var n, r = 0, i = this.length, o = [], a = ze.test(e) || "string" != typeof e ? ce(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ce.find.matchesSelector(n, e))) {
				n = o.push(n);
				break
			}
			return this.pushStack(o.length > 1 ? ce.unique(o) : o)
		},
		index: function(e) {
			return e ? "string" == typeof e ? ce.inArray(this[0], ce(e)) : ce.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			var n = "string" == typeof e ? ce(e, t) : ce.makeArray(e && e.nodeType ? [e] : e),
				r = ce.merge(this.get(), n);
			return this.pushStack(ce.unique(r))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), ce.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null;
		},
		parents: function(e) {
			return ce.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return ce.dir(e, "parentNode", n)
		},
		next: function(e) {
			return f(e, "nextSibling")
		},
		prev: function(e) {
			return f(e, "previousSibling")
		},
		nextAll: function(e) {
			return ce.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return ce.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return ce.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return ce.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return ce.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return ce.sibling(e.firstChild)
		},
		contents: function(e) {
			return ce.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ce.merge([], e.childNodes)
		}
	}, function(e, t) {
		ce.fn[e] = function(n, r) {
			var i = ce.map(this, t, n);
			return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = ce.filter(r, i)), this.length > 1 && (Xe[e] || (i = ce.unique(i)), Ie.test(e) && (i = i.reverse())), this.pushStack(i)
		}
	}), ce.extend({
		filter: function(e, t, n) {
			var r = t[0];
			return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ce.find.matchesSelector(r, e) ? [r] : [] : ce.find.matches(e, ce.grep(t, function(e) {
				return 1 === e.nodeType
			}))
		},
		dir: function(e, n, r) {
			for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !ce(o).is(r));) 1 === o.nodeType && i.push(o), o = o[n];
			return i
		},
		sibling: function(e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	});
	var Ue = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		Ve = / jQuery\d+="(?:null|\d+)"/g,
		Ye = new RegExp("<(?:" + Ue + ")[\\s/>]", "i"),
		Je = /^\s+/,
		Ge = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Qe = /<([\w:]+)/,
		Ke = /<tbody/i,
		Ze = /<|&#?\w+;/,
		et = /<(?:script|style|link)/i,
		tt = /^(?:checkbox|radio)$/i,
		nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rt = /^$|\/(?:java|ecma)script/i,
		it = /^true\/(.*)/,
		ot = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		at = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: ce.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		},
		st = d(G),
		ut = st.appendChild(G.createElement("div"));
	at.optgroup = at.option, at.tbody = at.tfoot = at.colgroup = at.caption = at.thead, at.th = at.td, ce.fn.extend({
		text: function(e) {
			return ce.access(this, function(e) {
				return e === t ? ce.text(this) : this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(e))
			}, null, e, arguments.length)
		},
		append: function() {
			return this.domManip(arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = h(this, e);
					t.appendChild(e)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = h(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove: function(e, t) {
			for (var n, r = e ? ce.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || ce.cleanData(x(n)), n.parentNode && (t && ce.contains(n.ownerDocument, n) && y(x(n, "script")), n.parentNode.removeChild(n));
			return this
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) {
				for (1 === e.nodeType && ce.cleanData(x(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
				e.options && ce.nodeName(e, "select") && (e.options.length = 0)
			}
			return this
		},
		clone: function(e, t) {
			return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
				return ce.clone(this, e, t)
			})
		},
		html: function(e) {
			return ce.access(this, function(e) {
				var n = this[0] || {},
					r = 0,
					i = this.length;
				if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Ve, "") : t;
				if ("string" == typeof e && !et.test(e) && (ce.support.htmlSerialize || !Ye.test(e)) && (ce.support.leadingWhitespace || !Je.test(e)) && !at[(Qe.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = e.replace(Ge, "<$1></$2>");
					try {
						for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (ce.cleanData(x(n, !1)), n.innerHTML = e);
						n = 0
					} catch (o) {}
				}
				n && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function() {
			var e = ce.map(this, function(e) {
				return [e.nextSibling, e.parentNode]
			}),
				t = 0;
			return this.domManip(arguments, function(n) {
				var r = e[t++],
					i = e[t++];
				i && (r && r.parentNode !== i && (r = this.nextSibling), ce(this).remove(), i.insertBefore(n, r))
			}, !0), t ? this : this.remove()
		},
		detach: function(e) {
			return this.remove(e, !0)
		},
		domManip: function(e, t, n) {
			e = re.apply([], e);
			var r, i, o, a, s, u, l = 0,
				c = this.length,
				f = this,
				p = c - 1,
				d = e[0],
				h = ce.isFunction(d);
			if (h || !(1 >= c || "string" != typeof d || ce.support.checkClone) && nt.test(d)) return this.each(function(r) {
				var i = f.eq(r);
				h && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n)
			});
			if (c && (u = ce.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = u.firstChild, 1 === u.childNodes.length && (u = r), r)) {
				for (a = ce.map(x(u, "script"), g), o = a.length; c > l; l++) i = u, l !== p && (i = ce.clone(i, !0, !0), o && ce.merge(a, x(i, "script"))), t.call(this[l], i, l);
				if (o) for (s = a[a.length - 1].ownerDocument, ce.map(a, m), l = 0; o > l; l++) i = a[l], rt.test(i.type || "") && !ce._data(i, "globalEval") && ce.contains(s, i) && (i.src ? ce._evalUrl(i.src) : ce.globalEval((i.text || i.textContent || i.innerHTML || "").replace(ot, "")));
				u = r = null
			}
			return this
		}
	}), ce.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		ce.fn[e] = function(e) {
			for (var n, r = 0, i = [], o = ce(e), a = o.length - 1; a >= r; r++) n = r === a ? this : this.clone(!0), ce(o[r])[t](n), ie.apply(i, n.get());
			return this.pushStack(i)
		}
	}), ce.extend({
		clone: function(e, t, n) {
			var r, i, o, a, s, u = ce.contains(e.ownerDocument, e);
			if (ce.support.html5Clone || ce.isXMLDoc(e) || !Ye.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ut.innerHTML = e.outerHTML, ut.removeChild(o = ut.firstChild)), !(ce.support.noCloneEvent && ce.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ce.isXMLDoc(e))) for (r = x(o), s = x(e), a = 0; null != (i = s[a]); ++a) r[a] && b(i, r[a]);
			if (t) if (n) for (s = s || x(e), r = r || x(o), a = 0; null != (i = s[a]); a++) v(i, r[a]);
			else v(e, o);
			return r = x(o, "script"), r.length > 0 && y(r, !u && x(e, "script")), r = s = i = null, o
		},
		buildFragment: function(e, t, n, r) {
			for (var i, o, a, s, u, l, c, f = e.length, p = d(t), h = [], g = 0; f > g; g++) if (o = e[g], o || 0 === o) if ("object" === ce.type(o)) ce.merge(h, o.nodeType ? [o] : o);
			else if (Ze.test(o)) {
				for (s = s || p.appendChild(t.createElement("div")), u = (Qe.exec(o) || ["", ""])[1].toLowerCase(), c = at[u] || at._default, s.innerHTML = c[1] + o.replace(Ge, "<$1></$2>") + c[2], i = c[0]; i--;) s = s.lastChild;
				if (!ce.support.leadingWhitespace && Je.test(o) && h.push(t.createTextNode(Je.exec(o)[0])), !ce.support.tbody) for (o = "table" !== u || Ke.test(o) ? "<table>" !== c[1] || Ke.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; i--;) ce.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l);
				for (ce.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
				s = p.lastChild
			} else h.push(t.createTextNode(o));
			for (s && p.removeChild(s), ce.support.appendChecked || ce.grep(x(h, "input"), w), g = 0; o = h[g++];) if ((!r || -1 === ce.inArray(o, r)) && (a = ce.contains(o.ownerDocument, o), s = x(p.appendChild(o), "script"), a && y(s), n)) for (i = 0; o = s[i++];) rt.test(o.type || "") && n.push(o);
			return s = null, p
		},
		cleanData: function(e, t) {
			for (var n, r, i, o, a = 0, s = ce.expando, u = ce.cache, l = ce.support.deleteExpando, c = ce.event.special; null != (n = e[a]); a++) if ((t || ce.acceptData(n)) && (i = n[s], o = i && u[i])) {
				if (o.events) for (r in o.events) c[r] ? ce.event.remove(n, r) : ce.removeEvent(n, r, o.handle);
				u[i] && (delete u[i], l ? delete n[s] : typeof n.removeAttribute !== Y ? n.removeAttribute(s) : n[s] = null, te.push(i))
			}
		},
		_evalUrl: function(e) {
			return ce.ajax({
				url: e,
				type: "GET",
				dataType: "script",
				async: !1,
				global: !1,
				"throws": !0
			})
		}
	}), ce.fn.extend({
		wrapAll: function(e) {
			if (ce.isFunction(e)) return this.each(function(t) {
				ce(this).wrapAll(e.call(this, t))
			});
			if (this[0]) {
				var t = ce(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function(e) {
			return ce.isFunction(e) ? this.each(function(t) {
				ce(this).wrapInner(e.call(this, t))
			}) : this.each(function() {
				var t = ce(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = ce.isFunction(e);
			return this.each(function(n) {
				ce(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				ce.nodeName(this, "body") || ce(this).replaceWith(this.childNodes)
			}).end()
		}
	});
	var lt, ct, ft, pt = /alpha\([^)]*\)/i,
		dt = /opacity\s*=\s*([^)]*)/,
		ht = /^(top|right|bottom|left)$/,
		gt = /^(none|table(?!-c[ea]).+)/,
		mt = /^margin/,
		yt = new RegExp("^(" + fe + ")(.*)$", "i"),
		vt = new RegExp("^(" + fe + ")(?!px)[a-z%]+$", "i"),
		bt = new RegExp("^([+-])=(" + fe + ")", "i"),
		xt = {
			BODY: "block"
		},
		wt = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		Tt = {
			letterSpacing: 0,
			fontWeight: 400
		},
		Ct = ["Top", "Right", "Bottom", "Left"],
		Nt = ["Webkit", "O", "Moz", "ms"];
	ce.fn.extend({
		css: function(e, n) {
			return ce.access(this, function(e, n, r) {
				var i, o, a = {},
					s = 0;
				if (ce.isArray(n)) {
					for (o = ct(e), i = n.length; i > s; s++) a[n[s]] = ce.css(e, n[s], !1, o);
					return a
				}
				return r !== t ? ce.style(e, n, r) : ce.css(e, n)
			}, e, n, arguments.length > 1)
		},
		show: function() {
			return N(this, !0)
		},
		hide: function() {
			return N(this)
		},
		toggle: function(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
				C(this) ? ce(this).show() : ce(this).hide()
			})
		}
	}), ce.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = ft(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": ce.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(e, n, r, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, a, s, u = ce.camelCase(n),
					l = e.style;
				if (n = ce.cssProps[u] || (ce.cssProps[u] = T(l, u)), s = ce.cssHooks[n] || ce.cssHooks[u], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : l[n];
				if (a = typeof r, "string" === a && (o = bt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(ce.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || ce.cssNumber[u] || (r += "px"), ce.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try {
					l[n] = r
				} catch (c) {}
			}
		},
		css: function(e, n, r, i) {
			var o, a, s, u = ce.camelCase(n);
			return n = ce.cssProps[u] || (ce.cssProps[u] = T(e.style, u)), s = ce.cssHooks[n] || ce.cssHooks[u], s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = ft(e, n, i)), "normal" === a && n in Tt && (a = Tt[n]), "" === r || r ? (o = parseFloat(a), r === !0 || ce.isNumeric(o) ? o || 0 : a) : a
		}
	}), e.getComputedStyle ? (ct = function(t) {
		return e.getComputedStyle(t, null)
	}, ft = function(e, n, r) {
		var i, o, a, s = r || ct(e),
			u = s ? s.getPropertyValue(n) || s[n] : t,
			l = e.style;
		return s && ("" !== u || ce.contains(e.ownerDocument, e) || (u = ce.style(e, n)), vt.test(u) && mt.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)), u
	}) : G.documentElement.currentStyle && (ct = function(e) {
		return e.currentStyle
	}, ft = function(e, n, r) {
		var i, o, a, s = r || ct(e),
			u = s ? s[n] : t,
			l = e.style;
		return null == u && l && l[n] && (u = l[n]), vt.test(u) && !ht.test(n) && (i = l.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = i, a && (o.left = a)), "" === u ? "auto" : u
	}), ce.each(["height", "width"], function(e, t) {
		ce.cssHooks[t] = {
			get: function(e, n, r) {
				return n ? 0 === e.offsetWidth && gt.test(ce.css(e, "display")) ? ce.swap(e, wt, function() {
					return S(e, t, r)
				}) : S(e, t, r) : void 0
			},
			set: function(e, n, r) {
				var i = r && ct(e);
				return k(e, n, r ? E(e, t, r, ce.support.boxSizing && "border-box" === ce.css(e, "boxSizing", !1, i), i) : 0)
			}
		}
	}), ce.support.opacity || (ce.cssHooks.opacity = {
		get: function(e, t) {
			return dt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set: function(e, t) {
			var n = e.style,
				r = e.currentStyle,
				i = ce.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				o = r && r.filter || n.filter || "";
			n.zoom = 1, (t >= 1 || "" === t) && "" === ce.trim(o.replace(pt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = pt.test(o) ? o.replace(pt, i) : o + " " + i)
		}
	}), ce(function() {
		ce.support.reliableMarginRight || (ce.cssHooks.marginRight = {
			get: function(e, t) {
				return t ? ce.swap(e, {
					display: "inline-block"
				}, ft, [e, "marginRight"]) : void 0
			}
		}), !ce.support.pixelPosition && ce.fn.position && ce.each(["top", "left"], function(e, t) {
			ce.cssHooks[t] = {
				get: function(e, n) {
					return n ? (n = ft(e, t), vt.test(n) ? ce(e).position()[t] + "px" : n) : void 0
				}
			}
		})
	}), ce.expr && ce.expr.filters && (ce.expr.filters.hidden = function(e) {
		return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ce.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ce.css(e, "display"))
	}, ce.expr.filters.visible = function(e) {
		return !ce.expr.filters.hidden(e)
	}), ce.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		ce.cssHooks[e + t] = {
			expand: function(n) {
				for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Ct[r] + t] = o[r] || o[r - 2] || o[0];
				return i
			}
		}, mt.test(e) || (ce.cssHooks[e + t].set = k)
	});
	var kt = /%20/g,
		Et = /\[\]$/,
		St = /\r?\n/g,
		At = /^(?:submit|button|image|reset|file)$/i,
		jt = /^(?:input|select|textarea|keygen)/i;
	ce.fn.extend({
		serialize: function() {
			return ce.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = ce.prop(this, "elements");
				return e ? ce.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !ce(this).is(":disabled") && jt.test(this.nodeName) && !At.test(e) && (this.checked || !tt.test(e))
			}).map(function(e, t) {
				var n = ce(this).val();
				return null == n ? null : ce.isArray(n) ? ce.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(St, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(St, "\r\n")
				}
			}).get()
		}
	}), ce.param = function(e, n) {
		var r, i = [],
			o = function(e, t) {
				t = ce.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		if (n === t && (n = ce.ajaxSettings && ce.ajaxSettings.traditional), ce.isArray(e) || e.jquery && !ce.isPlainObject(e)) ce.each(e, function() {
			o(this.name, this.value)
		});
		else for (r in e) D(r, e[r], n, o);
		return i.join("&").replace(kt, "+")
	}, ce.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		ce.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}), ce.fn.extend({
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		},
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, n, r) {
			return this.on(t, e, n, r)
		},
		undelegate: function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		}
	});
	var Dt, Lt, Ht = ce.now(),
		qt = /\?/,
		_t = /#.*$/,
		Ft = /([?&])_=[^&]*/,
		Mt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		Ot = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		Bt = /^(?:GET|HEAD)$/,
		Pt = /^\/\//,
		Rt = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		Wt = ce.fn.load,
		$t = {},
		It = {},
		zt = "*/".concat("*");
	try {
		Lt = J.href
	} catch (Xt) {
		Lt = G.createElement("a"), Lt.href = "", Lt = Lt.href
	}
	Dt = Rt.exec(Lt.toLowerCase()) || [], ce.fn.load = function(e, n, r) {
		if ("string" != typeof e && Wt) return Wt.apply(this, arguments);
		var i, o, a, s = this,
			u = e.indexOf(" ");
		return u >= 0 && (i = e.slice(u, e.length), e = e.slice(0, u)), ce.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && ce.ajax({
			url: e,
			type: a,
			dataType: "html",
			data: n
		}).done(function(e) {
			o = arguments, s.html(i ? ce("<div>").append(ce.parseHTML(e)).find(i) : e)
		}).complete(r &&
		function(e, t) {
			s.each(r, o || [e.responseText, t, e])
		}), this
	}, ce.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		ce.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), ce.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: Lt,
			type: "GET",
			isLocal: Ot.test(Dt[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": zt,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": ce.parseJSON,
				"text xml": ce.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? q(q(e, ce.ajaxSettings), t) : q(ce.ajaxSettings, e)
		},
		ajaxPrefilter: L($t),
		ajaxTransport: L(It),
		ajax: function(n, r) {
			function i(n, r, i, o) {
				var a, p, b, x, T, N = r;
				2 !== w && (w = 2, l && clearTimeout(l), f = t, u = o || "", C.readyState = n > 0 ? 4 : 0, a = n >= 200 && 300 > n || 304 === n, i && (x = _(d, C, i)), x = F(d, x, C, a), a ? (d.ifModified && (T = C.getResponseHeader("Last-Modified"), T && (ce.lastModified[s] = T), T = C.getResponseHeader("etag"), T && (ce.etag[s] = T)), 204 === n || "HEAD" === d.type ? N = "nocontent" : 304 === n ? N = "notmodified" : (N = x.state, p = x.data, b = x.error, a = !b)) : (b = N, (n || !N) && (N = "error", 0 > n && (n = 0))), C.status = n, C.statusText = (r || N) + "", a ? (e.qyerUtil && "function" == typeof e.qyerUtil.ajaxFillter && e.qyerUtil.ajaxFillter(p, N, C), m.resolveWith(h, [p, N, C])) : m.rejectWith(h, [C, N, b]), C.statusCode(v), v = t, c && g.trigger(a ? "ajaxSuccess" : "ajaxError", [C, d, a ? p : b]), y.fireWith(h, [C, N]), c && (g.trigger("ajaxComplete", [C, d]), --ce.active || ce.event.trigger("ajaxStop")))
			}
			"object" == typeof n && (r = n, n = t), r = r || {};
			var o, a, s, u, l, c, f, p, d = ce.ajaxSetup({}, r),
				h = d.context || d,
				g = d.context && (h.nodeType || h.jquery) ? ce(h) : ce.event,
				m = ce.Deferred(),
				y = ce.Callbacks("once memory"),
				v = d.statusCode || {},
				b = {},
				x = {},
				w = 0,
				T = "canceled",
				C = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (2 === w) {
							if (!p) for (p = {}; t = Mt.exec(u);) p[t[1].toLowerCase()] = t[2];
							t = p[e.toLowerCase()]
						}
						return null == t ? null : t
					},
					getAllResponseHeaders: function() {
						return 2 === w ? u : null
					},
					setRequestHeader: function(e, t) {
						var n = e.toLowerCase();
						return w || (e = x[n] = x[n] || e, b[e] = t), this
					},
					overrideMimeType: function(e) {
						return w || (d.mimeType = e), this
					},
					statusCode: function(e) {
						var t;
						if (e) if (2 > w) for (t in e) v[t] = [v[t], e[t]];
						else C.always(e[C.status]);
						return this
					},
					abort: function(e) {
						var t = e || T;
						return f && f.abort(t), i(0, t), this
					}
				};
			if (m.promise(C).complete = y.add, C.success = C.done, C.error = C.fail, d.url = ((n || d.url || Lt) + "").replace(_t, "").replace(Pt, Dt[1] + "//"), d.type = r.method || r.type || d.method || d.type, d.dataTypes = ce.trim(d.dataType || "*").toLowerCase().match(pe) || [""], null == d.crossDomain && (o = Rt.exec(d.url.toLowerCase()), d.crossDomain = !(!o || o[1] === Dt[1] && o[2] === Dt[2] && (o[3] || ("http:" === o[1] ? "80" : "443")) === (Dt[3] || ("http:" === Dt[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ce.param(d.data, d.traditional)), H($t, d, r, C), 2 === w) return C;
			c = d.global, c && 0 === ce.active++ && ce.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Bt.test(d.type), s = d.url, d.hasContent || (d.data && (s = d.url += (qt.test(s) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = Ft.test(s) ? s.replace(Ft, "$1_=" + Ht++) : s + (qt.test(s) ? "&" : "?") + "_=" + Ht++)), d.ifModified && (ce.lastModified[s] && C.setRequestHeader("If-Modified-Since", ce.lastModified[s]), ce.etag[s] && C.setRequestHeader("If-None-Match", ce.etag[s])), (d.data && d.hasContent && d.contentType !== !1 || r.contentType) && C.setRequestHeader("Content-Type", d.contentType), C.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : d.accepts["*"]);
			for (a in d.headers) C.setRequestHeader(a, d.headers[a]);
			if (d.beforeSend && (d.beforeSend.call(h, C, d) === !1 || 2 === w)) return C.abort();
			T = "abort";
			for (a in {
				success: 1,
				error: 1,
				complete: 1
			}) C[a](d[a]);
			if (f = H(It, d, r, C)) {
				C.readyState = 1, c && g.trigger("ajaxSend", [C, d]), d.async && d.timeout > 0 && (l = setTimeout(function() {
					C.abort("timeout")
				}, d.timeout));
				try {
					w = 1, f.send(b, i)
				} catch (N) {
					if (!(2 > w)) throw N;
					i(-1, N)
				}
			} else i(-1, "No Transport");
			return C
		},
		getJSON: function(e, t, n) {
			return ce.get(e, t, n, "json")
		},
		getScript: function(e, n) {
			return ce.get(e, t, n, "script")
		}
	}), ce.each(["get", "post"], function(e, n) {
		ce[n] = function(e, r, i, o) {
			return ce.isFunction(r) && (o = o || i, i = r, r = t), ce.ajax({
				url: e,
				type: n,
				dataType: o,
				data: r,
				success: i
			})
		}
	}), ce.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(e) {
				return ce.globalEval(e), e
			}
		}
	}), ce.ajaxPrefilter("script", function(e) {
		e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), ce.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var n, r = G.head || ce("head")[0] || G.documentElement;
			return {
				send: function(t, i) {
					n = G.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
						(t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
					}, r.insertBefore(n, r.firstChild)
				},
				abort: function() {
					n && n.onload(t, !0)
				}
			}
		}
	});
	var Ut = [],
		Vt = /(=)\?(?=&|$)|\?\?/;
	ce.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = Ut.pop() || ce.expando + "_" + Ht++;
			return this[e] = !0, e
		}
	}), ce.ajaxPrefilter("json jsonp", function(n, r, i) {
		var o, a, s, u = n.jsonp !== !1 && (Vt.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(n.data) && "data");
		return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ce.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Vt, "$1" + o) : n.jsonp !== !1 && (n.url += (qt.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
			return s || ce.error(o + " was not called"), s[0]
		}, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
			s = arguments
		}, i.always(function() {
			e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Ut.push(o)), s && ce.isFunction(a) && a(s[0]), s = a = t
		}), "script") : void 0
	});
	var Yt, Jt, Gt = 0,
		Qt = e.ActiveXObject &&
	function() {
		var e;
		for (e in Yt) Yt[e](t, !0)
	};
	/*ce.ajaxSettings.xhr = e.ActiveXObject ?
	function() {
		return !this.isLocal && M() || O()
	} : M, Jt = ce.ajaxSettings.xhr(), ce.support.cors = !! Jt && "withCredentials" in Jt, Jt = ce.support.ajax = !! Jt, Jt && ce.ajaxTransport(function(n) {
		if (!n.crossDomain || ce.support.cors) {
			var r;
			return {
				send: function(i, o) {
					var a, s, u = n.xhr();
					if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields) for (s in n.xhrFields) u[s] = n.xhrFields[s];
					n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (s in i) u.setRequestHeader(s, i[s])
					} catch (l) {}
					u.send(n.hasContent && n.data || null), r = function(e, i) {
						var s, l, c, f;
						try {
							if (r && (i || 4 === u.readyState)) if (r = t, a && (u.onreadystatechange = ce.noop, Qt && delete Yt[a]), i) 4 !== u.readyState && u.abort();
							else {
								f = {}, s = u.status, l = u.getAllResponseHeaders(), "string" == typeof u.responseText && (f.text = u.responseText);
								try {
									c = u.statusText
								} catch (p) {
									c = ""
								}
								s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = f.text ? 200 : 404
							}
						} catch (d) {
							i || o(-1, d)
						}
						f && o(s, c, f, l)
					}, n.async ? 4 === u.readyState ? setTimeout(r) : (a = ++Gt, Qt && (Yt || (Yt = {}, ce(e).unload(Qt)), Yt[a] = r), u.onreadystatechange = r) : r()
				},
				abort: function() {
					r && r(t, !0)
				}
			}
		}
	});*/
	var Kt, Zt, en = /^(?:toggle|show|hide)$/,
		tn = new RegExp("^(?:([+-])=|)(" + fe + ")([a-z%]*)$", "i"),
		nn = /queueHooks$/,
		rn = [$],
		on = {
			"*": [function(e, t) {
				var n = this.createTween(e, t),
					r = n.cur(),
					i = tn.exec(t),
					o = i && i[3] || (ce.cssNumber[e] ? "" : "px"),
					a = (ce.cssNumber[e] || "px" !== o && +r) && tn.exec(ce.css(n.elem, e)),
					s = 1,
					u = 20;
				if (a && a[3] !== o) {
					o = o || a[3], i = i || [], a = +r || 1;
					do s = s || ".5", a /= s, ce.style(n.elem, e, a + o);
					while (s !== (s = n.cur() / r) && 1 !== s && --u)
				}
				return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
			}]
		};
	ce.Animation = ce.extend(R, {
		tweener: function(e, t) {
			ce.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
			for (var n, r = 0, i = e.length; i > r; r++) n = e[r], on[n] = on[n] || [], on[n].unshift(t)
		},
		prefilter: function(e, t) {
			t ? rn.unshift(e) : rn.push(e)
		}
	}), ce.Tween = I, I.prototype = {
		constructor: I,
		init: function(e, t, n, r, i, o) {
			this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ce.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = I.propHooks[this.prop];
			return e && e.get ? e.get(this) : I.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = I.propHooks[this.prop];
			return this.options.duration ? this.pos = t = ce.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : I.propHooks._default.set(this), this
		}
	}, I.prototype.init.prototype = I.prototype, I.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ce.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
			},
			set: function(e) {
				ce.fx.step[e.prop] ? ce.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ce.cssProps[e.prop]] || ce.cssHooks[e.prop]) ? ce.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, I.propHooks.scrollTop = I.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, ce.each(["toggle", "show", "hide"], function(e, t) {
		var n = ce.fn[t];
		ce.fn[t] = function(e, r, i) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(z(t, !0), e, r, i)
		}
	}), ce.fn.extend({
		fadeTo: function(e, t, n, r) {
			return this.filter(C).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, r)
		},
		animate: function(e, t, n, r) {
			var i = ce.isEmptyObject(e),
				o = ce.speed(t, n, r),
				a = function() {
					var t = R(this, ce.extend({}, e), o);
					(i || ce._data(this, "finish")) && t.stop(!0)
				};
			return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
		},
		stop: function(e, n, r) {
			var i = function(e) {
					var t = e.stop;
					delete e.stop, t(r)
				};
			return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
				var t = !0,
					n = null != e && e + "queueHooks",
					o = ce.timers,
					a = ce._data(this);
				if (n) a[n] && a[n].stop && i(a[n]);
				else for (n in a) a[n] && a[n].stop && nn.test(n) && i(a[n]);
				for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
				(t || !r) && ce.dequeue(this, e)
			})
		},
		finish: function(e) {
			return e !== !1 && (e = e || "fx"), this.each(function() {
				var t, n = ce._data(this),
					r = n[e + "queue"],
					i = n[e + "queueHooks"],
					o = ce.timers,
					a = r ? r.length : 0;
				for (n.finish = !0, ce.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
				for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
				delete n.finish
			})
		}
	}), ce.each({
		slideDown: z("show"),
		slideUp: z("hide"),
		slideToggle: z("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, t) {
		ce.fn[e] = function(e, n, r) {
			return this.animate(t, e, n, r)
		}
	}), ce.speed = function(e, t, n) {
		var r = e && "object" == typeof e ? ce.extend({}, e) : {
			complete: n || !n && t || ce.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !ce.isFunction(t) && t
		};
		return r.duration = ce.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ce.fx.speeds ? ce.fx.speeds[r.duration] : ce.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
			ce.isFunction(r.old) && r.old.call(this), r.queue && ce.dequeue(this, r.queue)
		}, r
	}, ce.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, ce.timers = [], ce.fx = I.prototype.init, ce.fx.tick = function() {
		var e, n = ce.timers,
			r = 0;
		for (Kt = ce.now(); r < n.length; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1);
		n.length || ce.fx.stop(), Kt = t
	}, ce.fx.timer = function(e) {
		e() && ce.timers.push(e) && ce.fx.start()
	}, ce.fx.interval = 13, ce.fx.start = function() {
		Zt || (Zt = setInterval(ce.fx.tick, ce.fx.interval))
	}, ce.fx.stop = function() {
		clearInterval(Zt), Zt = null
	}, ce.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, ce.fx.step = {}, ce.expr && ce.expr.filters && (ce.expr.filters.animated = function(e) {
		return ce.grep(ce.timers, function(t) {
			return e === t.elem
		}).length
	}), ce.fn.offset = function(e) {
		if (arguments.length) return e === t ? this : this.each(function(t) {
			ce.offset.setOffset(this, e, t)
		});
		var n, r, i = {
			top: 0,
			left: 0
		},
			o = this[0],
			a = o && o.ownerDocument;
		if (a) return n = a.documentElement, ce.contains(n, o) ? (typeof o.getBoundingClientRect !== Y && (i = o.getBoundingClientRect()), r = X(a), {
			top: i.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
			left: i.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
		}) : i
	}, ce.offset = {
		setOffset: function(e, t, n) {
			var r = ce.css(e, "position");
			"static" === r && (e.style.position = "relative");
			var i, o, a = ce(e),
				s = a.offset(),
				u = ce.css(e, "top"),
				l = ce.css(e, "left"),
				c = ("absolute" === r || "fixed" === r) && ce.inArray("auto", [u, l]) > -1,
				f = {},
				p = {};
			c ? (p = a.position(), i = p.top, o = p.left) : (i = parseFloat(u) || 0, o = parseFloat(l) || 0), ce.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + i), null != t.left && (f.left = t.left - s.left + o), "using" in t ? t.using.call(e, f) : a.css(f)
		}
	}, ce.fn.extend({
		position: function() {
			if (this[0]) {
				var e, t, n = {
					top: 0,
					left: 0
				},
					r = this[0];
				return "fixed" === ce.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ce.nodeName(e[0], "html") || (n = e.offset()), n.top += ce.css(e[0], "borderTopWidth", !0), n.left += ce.css(e[0], "borderLeftWidth", !0)), {
					top: t.top - n.top - ce.css(r, "marginTop", !0),
					left: t.left - n.left - ce.css(r, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent || Q; e && !ce.nodeName(e, "html") && "static" === ce.css(e, "position");) e = e.offsetParent;
				return e || Q
			})
		}
	}), ce.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, n) {
		var r = /Y/.test(n);
		ce.fn[e] = function(i) {
			return ce.access(this, function(e, i, o) {
				var a = X(e);
				return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : void(a ? a.scrollTo(r ? ce(a).scrollLeft() : o, r ? o : ce(a).scrollTop()) : e[i] = o)
			}, e, i, arguments.length, null)
		}
	}), ce.each({
		Height: "height",
		Width: "width"
	}, function(e, n) {
		ce.each({
			padding: "inner" + e,
			content: n,
			"": "outer" + e
		}, function(r, i) {
			ce.fn[i] = function(i, o) {
				var a = arguments.length && (r || "boolean" != typeof i),
					s = r || (i === !0 || o === !0 ? "margin" : "border");
				return ce.access(this, function(n, r, i) {
					var o;
					return ce.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? ce.css(n, r, s) : ce.style(n, r, i, s)
				}, n, a ? i : t, a, null)
			}
		})
	}), ce.fn.size = function() {
		return this.length
	}, ce.fn.andSelf = ce.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ce : (e.jQuery = e.$ = ce, "function" == typeof define && define.amd && define("jquery", [], function() {
		return ce
	}))
}(window);
!
function(e, t, i, o) {
	var n = e(t);
	e.fn.lazyload = function(r) {
		function f() {
			var t = 0;
			l.each(function() {
				var i = e(this);
				if (!h.skip_invisible || i.is(":visible")) if (e.abovethetop(this, h) || e.leftofbegin(this, h));
				else if (e.belowthefold(this, h) || e.rightoffold(this, h)) {
					if (++t > h.failure_limit) return !1
				} else i.trigger("appear"), t = 0
			})
		}
		var a, l = this,
			h = {
				threshold: 0,
				failure_limit: 0,
				event: "scroll",
				effect: "show",
				container: t,
				data_attribute: "original",
				skip_invisible: !0,
				appear: null,
				load: null,
				placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
			};
		return r && (o !== r.failurelimit && (r.failure_limit = r.failurelimit, delete r.failurelimit), o !== r.effectspeed && (r.effect_speed = r.effectspeed, delete r.effectspeed), e.extend(h, r)), a = h.container === o || h.container === t ? n : e(h.container), 0 === h.event.indexOf("scroll") && a.bind(h.event, function() {
			return f()
		}), this.each(function() {
			var t = this,
				i = e(t);
			t.loaded = !1, (i.attr("src") === o || i.attr("src") === !1) && i.is("img") && i.attr("src", h.placeholder), i.one("appear", function() {
				if (!this.loaded) {
					if (h.appear) {
						var o = l.length;
						h.appear.call(t, o, h)
					}
					e("<img />").bind("load", function() {
						var o = i.attr("data-" + h.data_attribute);
						i.hide(), i.is("img") ? i.attr("src", o) : i.css("background-image", "url('" + o + "')"), i[h.effect](h.effect_speed), t.loaded = !0;
						var n = e.grep(l, function(e) {
							return !e.loaded
						});
						if (l = e(n), h.load) {
							var r = l.length;
							h.load.call(t, r, h)
						}
					}).attr("src", i.attr("data-" + h.data_attribute))
				}
			}), 0 !== h.event.indexOf("scroll") && i.bind(h.event, function() {
				t.loaded || i.trigger("appear")
			})
		}), n.bind("resize", function() {
			f()
		}), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && n.bind("pageshow", function(t) {
			t.originalEvent && t.originalEvent.persisted && l.each(function() {
				e(this).trigger("appear")
			})
		}), e(i).ready(function() {
			f()
		}), this
	}, e.belowthefold = function(i, r) {
		var f;
		return f = r.container === o || r.container === t ? (t.innerHeight ? t.innerHeight : n.height()) + n.scrollTop() : e(r.container).offset().top + e(r.container).height(), f <= e(i).offset().top - r.threshold
	}, e.rightoffold = function(i, r) {
		var f;
		return f = r.container === o || r.container === t ? n.width() + n.scrollLeft() : e(r.container).offset().left + e(r.container).width(), f <= e(i).offset().left - r.threshold
	}, e.abovethetop = function(i, r) {
		var f;
		return f = r.container === o || r.container === t ? n.scrollTop() : e(r.container).offset().top, f >= e(i).offset().top + r.threshold + e(i).height()
	}, e.leftofbegin = function(i, r) {
		var f;
		return f = r.container === o || r.container === t ? n.scrollLeft() : e(r.container).offset().left, f >= e(i).offset().left + r.threshold + e(i).width()
	}, e.inviewport = function(t, i) {
		return !(e.rightoffold(t, i) || e.leftofbegin(t, i) || e.belowthefold(t, i) || e.abovethetop(t, i))
	}, e.extend(e.expr[":"], {
		"below-the-fold": function(t) {
			return e.belowthefold(t, {
				threshold: 0
			})
		},
		"above-the-top": function(t) {
			return !e.belowthefold(t, {
				threshold: 0
			})
		},
		"right-of-screen": function(t) {
			return e.rightoffold(t, {
				threshold: 0
			})
		},
		"left-of-screen": function(t) {
			return !e.rightoffold(t, {
				threshold: 0
			})
		},
		"in-viewport": function(t) {
			return e.inviewport(t, {
				threshold: 0
			})
		},
		"above-the-fold": function(t) {
			return !e.belowthefold(t, {
				threshold: 0
			})
		},
		"right-of-fold": function(t) {
			return e.rightoffold(t, {
				threshold: 0
			})
		},
		"left-of-fold": function(t) {
			return !e.rightoffold(t, {
				threshold: 0
			})
		}
	})
}(jQuery, window, document);
!
function(n, e) {
	"function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : n.NProgress = e()
}(this, function() {
	function n(n, e, t) {
		return e > n ? e : n > t ? t : n
	}
	function e(n) {
		return 100 * (-1 + n)
	}
	function t(n, t, r) {
		var i;
		return i = "translate3d" === c.positionUsing ? {
			transform: "translate3d(" + e(n) + "%,0,0)"
		} : "translate" === c.positionUsing ? {
			transform: "translate(" + e(n) + "%,0)"
		} : {
			"margin-left": e(n) + "%"
		}, i.transition = "all " + t + "ms " + r, i
	}
	function r(n, e) {
		var t = "string" == typeof n ? n : o(n);
		return t.indexOf(" " + e + " ") >= 0
	}
	function i(n, e) {
		var t = o(n),
			i = t + e;
		r(t, e) || (n.className = i.substring(1))
	}
	function s(n, e) {
		var t, i = o(n);
		r(n, e) && (t = i.replace(" " + e + " ", " "), n.className = t.substring(1, t.length - 1))
	}
	function o(n) {
		return (" " + (n.className || "") + " ").replace(/\s+/gi, " ")
	}
	function a(n) {
		n && n.parentNode && n.parentNode.removeChild(n)
	}
	var u = {};
	u.version = "0.2.0";
	var c = u.settings = {
		minimum: .08,
		easing: "ease",
		positionUsing: "",
		speed: 200,
		trickle: !0,
		trickleRate: .02,
		trickleSpeed: 800,
		showSpinner: !0,
		barSelector: '[role="bar"]',
		spinnerSelector: '[role="spinner"]',
		parent: "body",
		template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	};
	u.configure = function(n) {
		var e, t;
		for (e in n) t = n[e], void 0 !== t && n.hasOwnProperty(e) && (c[e] = t);
		return this
	}, u.status = null, u.set = function(e) {
		var r = u.isStarted();
		e = n(e, c.minimum, 1), u.status = 1 === e ? null : e;
		var i = u.render(!r),
			s = i.querySelector(c.barSelector),
			o = c.speed,
			a = c.easing;
		return i.offsetWidth, l(function(n) {
			"" === c.positionUsing && (c.positionUsing = u.getPositioningCSS()), f(s, t(e, o, a)), 1 === e ? (f(i, {
				transition: "none",
				opacity: 1
			}), i.offsetWidth, setTimeout(function() {
				f(i, {
					transition: "all " + o + "ms linear",
					opacity: 0
				}), setTimeout(function() {
					u.remove(), n()
				}, o)
			}, o)) : setTimeout(n, o)
		}), this
	}, u.isStarted = function() {
		return "number" == typeof u.status
	}, u.start = function() {
		u.status || u.set(0);
		var n = function() {
				setTimeout(function() {
					u.status && (u.trickle(), n())
				}, c.trickleSpeed)
			};
		return c.trickle && n(), this
	}, u.done = function(n) {
		return n || u.status ? u.inc(.3 + .5 * Math.random()).set(1) : this
	}, u.inc = function(e) {
		var t = u.status;
		return t ? ("number" != typeof e && (e = (1 - t) * n(Math.random() * t, .1, .95)), t = n(t + e, 0, .994), u.set(t)) : u.start()
	}, u.trickle = function() {
		return u.inc(Math.random() * c.trickleRate)
	}, function() {
		var n = 0,
			e = 0;
		u.promise = function(t) {
			return t && "resolved" !== t.state() ? (0 === e && u.start(), n++, e++, t.always(function() {
				e--, 0 === e ? (n = 0, u.done()) : u.set((n - e) / n)
			}), this) : this
		}
	}(), u.render = function(n) {
		if (u.isRendered()) return document.getElementById("nprogress");
		i(document.documentElement, "nprogress-busy");
		var t = document.createElement("div");
		t.id = "nprogress", t.innerHTML = c.template;
		var r, s = t.querySelector(c.barSelector),
			o = n ? "-100" : e(u.status || 0),
			l = document.querySelector(c.parent);
		return f(s, {
			transition: "all 0 linear",
			transform: "translate3d(" + o + "%,0,0)"
		}), c.showSpinner || (r = t.querySelector(c.spinnerSelector), r && a(r)), l != document.body && i(l, "nprogress-custom-parent"), l.appendChild(t), t
	}, u.remove = function() {
		s(document.documentElement, "nprogress-busy"), s(document.querySelector(c.parent), "nprogress-custom-parent");
		var n = document.getElementById("nprogress");
		n && a(n)
	}, u.isRendered = function() {
		return !!document.getElementById("nprogress")
	}, u.getPositioningCSS = function() {
		var n = document.body.style,
			e = "WebkitTransform" in n ? "Webkit" : "MozTransform" in n ? "Moz" : "msTransform" in n ? "ms" : "OTransform" in n ? "O" : "";
		return e + "Perspective" in n ? "translate3d" : e + "Transform" in n ? "translate" : "margin"
	};
	var l = function() {
			function n() {
				var t = e.shift();
				t && t(n)
			}
			var e = [];
			return function(t) {
				e.push(t), 1 == e.length && n()
			}
		}(),
		f = function() {
			function n(n) {
				return n.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(n, e) {
					return e.toUpperCase()
				})
			}
			function e(n) {
				var e = document.body.style;
				if (n in e) return n;
				for (var t, r = i.length, s = n.charAt(0).toUpperCase() + n.slice(1); r--;) if (t = i[r] + s, t in e) return t;
				return n
			}
			function t(t) {
				return t = n(t), s[t] || (s[t] = e(t))
			}
			function r(n, e, r) {
				e = t(e), n.style[e] = r
			}
			var i = ["Webkit", "O", "Moz", "ms"],
				s = {};
			return function(n, e) {
				var t, i, s = arguments;
				if (2 == s.length) for (t in e) i = e[t], void 0 !== i && e.hasOwnProperty(t) && r(n, t, i);
				else r(n, s[1], s[2])
			}
		}();
	return u
});
var requirejs, require, define;
!
function(global) {
	function isFunction(e) {
		return "[object Function]" === ostring.call(e)
	}
	function isArray(e) {
		return "[object Array]" === ostring.call(e)
	}
	function each(e, t) {
		if (e) {
			var i;
			for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1);
		}
	}
	function eachReverse(e, t) {
		if (e) {
			var i;
			for (i = e.length - 1; i > -1 && (!e[i] || !t(e[i], i, e)); i -= 1);
		}
	}
	function hasProp(e, t) {
		return hasOwn.call(e, t)
	}
	function getOwn(e, t) {
		return hasProp(e, t) && e[t]
	}
	function eachProp(e, t) {
		var i;
		for (i in e) if (hasProp(e, i) && t(e[i], i)) break
	}
	function mixin(e, t, i, r) {
		return t && eachProp(t, function(t, n) {
			(i || !hasProp(e, n)) && (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[n] = t : (e[n] || (e[n] = {}), mixin(e[n], t, i, r)))
		}), e
	}
	function bind(e, t) {
		return function() {
			return t.apply(e, arguments)
		}
	}
	function scripts() {
		return document.getElementsByTagName("script")
	}
	function defaultOnError(e) {
		throw e
	}
	function getGlobal(e) {
		if (!e) return e;
		var t = global;
		return each(e.split("."), function(e) {
			t = t[e]
		}), t
	}
	function makeError(e, t, i, r) {
		var n = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
		return n.requireType = e, n.requireModules = r, i && (n.originalError = i), n
	}
	function newContext(e) {
		function t(e) {
			var t, i;
			for (t = 0; t < e.length; t++) if (i = e[t], "." === i) e.splice(t, 1), t -= 1;
			else if (".." === i) {
				if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1]) continue;
				t > 0 && (e.splice(t - 1, 2), t -= 2)
			}
		}
		function i(e, i, r) {
			var n, a, o, s, c, u, d, p, f, l, h, m, g = i && i.split("/"),
				v = y.map,
				x = v && v["*"];
			if (e && (e = e.split("/"), d = e.length - 1, y.nodeIdCompat && jsSuffixRegExp.test(e[d]) && (e[d] = e[d].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && g && (m = g.slice(0, g.length - 1), e = m.concat(e)), t(e), e = e.join("/")), r && v && (g || x)) {
				o = e.split("/");
				e: for (s = o.length; s > 0; s -= 1) {
					if (u = o.slice(0, s).join("/"), g) for (c = g.length; c > 0; c -= 1) if (a = getOwn(v, g.slice(0, c).join("/")), a && (a = getOwn(a, u))) {
						p = a, f = s;
						break e
					}!l && x && getOwn(x, u) && (l = getOwn(x, u), h = s)
				}!p && l && (p = l, f = h),
				p && (o.splice(0, f, p), e = o.join("/"))
			}
			return n = getOwn(y.pkgs, e), n ? n : e
		}
		function r(e) {
			isBrowser && each(scripts(), function(t) {
				return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === q.contextName ? (t.parentNode.removeChild(t), !0) : void 0
			})
		}
		function n(e) {
			var t = getOwn(y.paths, e);
			return t && isArray(t) && t.length > 1 ? (t.shift(), q.require.undef(e), q.makeRequire(null, {
				skipMap: !0
			})([e]), !0) : void 0
		}
		function a(e) {
			var t, i = e ? e.indexOf("!") : -1;
			return i > -1 && (t = e.substring(0, i), e = e.substring(i + 1, e.length)), [t, e]
		}
		function o(e, t, r, n) {
			var o, s, c, u, d = null,
				p = t ? t.name : null,
				f = e,
				l = !0,
				h = "";
			return e || (l = !1, e = "_@r" + (A += 1)), u = a(e), d = u[0], e = u[1], d && (d = i(d, p, n), s = getOwn(j, d)), e && (d ? h = s && s.normalize ? s.normalize(e, function(e) {
				return i(e, p, n)
			}) : -1 === e.indexOf("!") ? i(e, p, n) : e : (h = i(e, p, n), u = a(h), d = u[0], h = u[1], r = !0, o = q.nameToUrl(h))), c = !d || s || r ? "" : "_unnormalized" + (T += 1), {
				prefix: d,
				name: h,
				parentMap: t,
				unnormalized: !! c,
				url: o,
				originalName: f,
				isDefine: l,
				id: (d ? d + "!" + h : h) + c
			}
		}
		function s(e) {
			var t = e.id,
				i = getOwn(S, t);
			return i || (i = S[t] = new q.Module(e)), i
		}
		function c(e, t, i) {
			var r = e.id,
				n = getOwn(S, r);
			!hasProp(j, r) || n && !n.defineEmitComplete ? (n = s(e), n.error && "error" === t ? i(n.error) : n.on(t, i)) : "defined" === t && i(j[r])
		}
		function u(e, t) {
			var i = e.requireModules,
				r = !1;
			t ? t(e) : (each(i, function(t) {
				var i = getOwn(S, t);
				i && (i.error = e, i.events.error && (r = !0, i.emit("error", e)))
			}), r || req.onError(e))
		}
		function d() {
			globalDefQueue.length && (apsp.apply(M, [M.length, 0].concat(globalDefQueue)), globalDefQueue = [])
		}
		function p(e) {
			delete S[e], delete k[e]
		}
		function f(e, t, i) {
			var r = e.map.id;
			e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function(r, n) {
				var a = r.id,
					o = getOwn(S, a);
				!o || e.depMatched[n] || i[a] || (getOwn(t, a) ? (e.defineDep(n, j[a]), e.check()) : f(o, t, i))
			}), i[r] = !0)
		}
		function l() {
			var e, t, i = 1e3 * y.waitSeconds,
				a = i && q.startTime + i < (new Date).getTime(),
				o = [],
				s = [],
				c = !1,
				d = !0;
			if (!x) {
				if (x = !0, eachProp(k, function(e) {
					var i = e.map,
						u = i.id;
					if (e.enabled && (i.isDefine || s.push(e), !e.error)) if (!e.inited && a) n(u) ? (t = !0, c = !0) : (o.push(u), r(u));
					else if (!e.inited && e.fetched && i.isDefine && (c = !0, !i.prefix)) return d = !1
				}), a && o.length) return e = makeError("timeout", "Load timeout for modules: " + o, null, o), e.contextName = q.contextName, u(e);
				d && each(s, function(e) {
					f(e, {}, {})
				}), a && !t || !c || !isBrowser && !isWebWorker || w || (w = setTimeout(function() {
					w = 0, l()
				}, 50)), x = !1
			}
		}
		function h(e) {
			hasProp(j, e[0]) || s(o(e[0], null, !0)).init(e[1], e[2])
		}
		function m(e, t, i, r) {
			e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(i, t, !1)
		}
		function g(e) {
			var t = e.currentTarget || e.srcElement;
			return m(t, q.onScriptLoad, "load", "onreadystatechange"), m(t, q.onScriptError, "error"), {
				node: t,
				id: t && t.getAttribute("data-requiremodule")
			}
		}
		function v() {
			var e;
			for (d(); M.length;) {
				if (e = M.shift(), null === e[0]) return u(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
				h(e)
			}
		}
		var x, b, q, E, w, y = {
			waitSeconds: 7,
			baseUrl: "./",
			paths: {},
			bundles: {},
			pkgs: {},
			shim: {},
			config: {}
		},
			S = {},
			k = {},
			O = {},
			M = [],
			j = {},
			P = {},
			R = {},
			A = 1,
			T = 1;
		return E = {
			require: function(e) {
				return e.require ? e.require : e.require = q.makeRequire(e.map)
			},
			exports: function(e) {
				return e.usingExports = !0, e.map.isDefine ? e.exports ? j[e.map.id] = e.exports : e.exports = j[e.map.id] = {} : void 0
			},
			module: function(e) {
				return e.module ? e.module : e.module = {
					id: e.map.id,
					uri: e.map.url,
					config: function() {
						return getOwn(y.config, e.map.id) || {}
					},
					exports: e.exports || (e.exports = {})
				}
			}
		}, b = function(e) {
			this.events = getOwn(O, e.id) || {}, this.map = e, this.shim = getOwn(y.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
		}, b.prototype = {
			init: function(e, t, i, r) {
				r = r || {}, this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, function(e) {
					this.emit("error", e)
				})), this.depMaps = e && e.slice(0), this.errback = i, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
			},
			defineDep: function(e, t) {
				this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
			},
			fetch: function() {
				if (!this.fetched) {
					this.fetched = !0, q.startTime = (new Date).getTime();
					var e = this.map;
					return this.shim ? void q.makeRequire(this.map, {
						enableBuildCallback: !0
					})(this.shim.deps || [], bind(this, function() {
						return e.prefix ? this.callPlugin() : this.load()
					})) : e.prefix ? this.callPlugin() : this.load()
				}
			},
			load: function() {
				var e = this.map.url;
				P[e] || (P[e] = !0, q.load(this.map.id, e))
			},
			check: function() {
				if (this.enabled && !this.enabling) {
					var e, t, i = this.map.id,
						r = this.depExports,
						n = this.exports,
						a = this.factory;
					if (this.inited) {
						if (this.error) this.emit("error", this.error);
						else if (!this.defining) {
							if (this.defining = !0, this.depCount < 1 && !this.defined) {
								if (isFunction(a)) {
									if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
										n = q.execCb(i, a, r, n)
									} catch (o) {
										e = o
									} else n = q.execCb(i, a, r, n);
									if (this.map.isDefine && void 0 === n && (t = this.module, t ? n = t.exports : this.usingExports && (n = this.exports)), e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", u(this.error = e)
								} else n = a;
								this.exports = n, this.map.isDefine && !this.ignore && (j[i] = n, req.onResourceLoad && req.onResourceLoad(q, this.map, this.depMaps)), p(i), this.defined = !0
							}
							this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
						}
					} else this.fetch()
				}
			},
			callPlugin: function() {
				var e = this.map,
					t = e.id,
					r = o(e.prefix);
				this.depMaps.push(r), c(r, "defined", bind(this, function(r) {
					var n, a, d, f = getOwn(R, this.map.id),
						l = this.map.name,
						h = this.map.parentMap ? this.map.parentMap.name : null,
						m = q.makeRequire(e.parentMap, {
							enableBuildCallback: !0
						});
					return this.map.unnormalized ? (r.normalize && (l = r.normalize(l, function(e) {
						return i(e, h, !0)
					}) || ""), a = o(e.prefix + "!" + l, this.map.parentMap), c(a, "defined", bind(this, function(e) {
						this.init([], function() {
							return e
						}, null, {
							enabled: !0,
							ignore: !0
						})
					})), d = getOwn(S, a.id), void(d && (this.depMaps.push(a), this.events.error && d.on("error", bind(this, function(e) {
						this.emit("error", e)
					})), d.enable()))) : f ? (this.map.url = q.nameToUrl(f), void this.load()) : (n = bind(this, function(e) {
						this.init([], function() {
							return e
						}, null, {
							enabled: !0
						})
					}), n.error = bind(this, function(e) {
						this.inited = !0, this.error = e, e.requireModules = [t], eachProp(S, function(e) {
							0 === e.map.id.indexOf(t + "_unnormalized") && p(e.map.id)
						}), u(e)
					}), n.fromText = bind(this, function(i, r) {
						var a = e.name,
							c = o(a),
							d = useInteractive;
						r && (i = r), d && (useInteractive = !1), s(c), hasProp(y.config, t) && (y.config[a] = y.config[t]);
						try {
							req.exec(i)
						} catch (p) {
							return u(makeError("fromtexteval", "fromText eval for " + t + " failed: " + p, p, [t]))
						}
						d && (useInteractive = !0), this.depMaps.push(c), q.completeLoad(a), m([a], n)
					}), void r.load(e.name, m, n, y))
				})), q.enable(r, this), this.pluginMaps[r.id] = r
			},
			enable: function() {
				k[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
					var i, r, n;
					if ("string" == typeof e) {
						if (e = o(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, n = getOwn(E, e.id)) return void(this.depExports[t] = n(this));
						this.depCount += 1, c(e, "defined", bind(this, function(e) {
							this.undefed || (this.defineDep(t, e), this.check())
						})), this.errback ? c(e, "error", bind(this, this.errback)) : this.events.error && c(e, "error", bind(this, function(e) {
							this.emit("error", e)
						}))
					}
					i = e.id, r = S[i], hasProp(E, i) || !r || r.enabled || q.enable(e, this)
				})), eachProp(this.pluginMaps, bind(this, function(e) {
					var t = getOwn(S, e.id);
					t && !t.enabled && q.enable(e, this)
				})), this.enabling = !1, this.check()
			},
			on: function(e, t) {
				var i = this.events[e];
				i || (i = this.events[e] = []), i.push(t)
			},
			emit: function(e, t) {
				each(this.events[e], function(e) {
					e(t)
				}), "error" === e && delete this.events[e]
			}
		}, q = {
			config: y,
			contextName: e,
			registry: S,
			defined: j,
			urlFetched: P,
			defQueue: M,
			Module: b,
			makeModuleMap: o,
			nextTick: req.nextTick,
			onError: u,
			configure: function(e) {
				e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
				var t = y.shim,
					i = {
						paths: !0,
						bundles: !0,
						config: !0,
						map: !0
					};
				eachProp(e, function(e, t) {
					i[t] ? (y[t] || (y[t] = {}), mixin(y[t], e, !0, !0)) : y[t] = e
				}), e.bundles && eachProp(e.bundles, function(e, t) {
					each(e, function(e) {
						e !== t && (R[e] = t)
					})
				}), e.shim && (eachProp(e.shim, function(e, i) {
					isArray(e) && (e = {
						deps: e
					}), !e.exports && !e.init || e.exportsFn || (e.exportsFn = q.makeShimExports(e)), t[i] = e
				}), y.shim = t), e.packages && each(e.packages, function(e) {
					var t, i;
					e = "string" == typeof e ? {
						name: e
					} : e, i = e.name, t = e.location, t && (y.paths[i] = e.location), y.pkgs[i] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
				}), eachProp(S, function(e, t) {
					e.inited || e.map.unnormalized || (e.map = o(t, null, !0))
				}), (e.deps || e.callback) && q.require(e.deps || [], e.callback)
			},
			makeShimExports: function(e) {
				function t() {
					var t;
					return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
				}
				return t
			},
			makeRequire: function(t, n) {
				function a(i, r, c) {
					var d, p, f;
					return n.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof i ? isFunction(r) ? u(makeError("requireargs", "Invalid require call"), c) : t && hasProp(E, i) ? E[i](S[t.id]) : req.get ? req.get(q, i, t, a) : (p = o(i, t, !1, !0), d = p.id, hasProp(j, d) ? j[d] : u(makeError("notloaded", 'Module name "' + d + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), q.nextTick(function() {
						v(), f = s(o(null, t)), f.skipMap = n.skipMap, f.init(i, r, c, {
							enabled: !0
						}), l()
					}), a)
				}
				return n = n || {}, mixin(a, {
					isBrowser: isBrowser,
					toUrl: function(e) {
						var r, n = e.lastIndexOf("."),
							a = e.split("/")[0],
							o = "." === a || ".." === a;
						return -1 !== n && (!o || n > 1) && (r = e.substring(n, e.length), e = e.substring(0, n)), q.nameToUrl(i(e, t && t.id, !0), r, !0)
					},
					defined: function(e) {
						return hasProp(j, o(e, t, !1, !0).id)
					},
					specified: function(e) {
						return e = o(e, t, !1, !0).id, hasProp(j, e) || hasProp(S, e)
					}
				}), t || (a.undef = function(e) {
					d();
					var i = o(e, t, !0),
						n = getOwn(S, e);
					n.undefed = !0, r(e), delete j[e], delete P[i.url], delete O[e], eachReverse(M, function(t, i) {
						t[0] === e && M.splice(i, 1)
					}), n && (n.events.defined && (O[e] = n.events), p(e))
				}), a
			},
			enable: function(e) {
				var t = getOwn(S, e.id);
				t && s(e).enable()
			},
			completeLoad: function(e) {
				var t, i, r, a = getOwn(y.shim, e) || {},
					o = a.exports;
				for (d(); M.length;) {
					if (i = M.shift(), null === i[0]) {
						if (i[0] = e, t) break;
						t = !0
					} else i[0] === e && (t = !0);
					h(i)
				}
				if (r = getOwn(S, e), !t && !hasProp(j, e) && r && !r.inited) {
					if (!(!y.enforceDefine || o && getGlobal(o))) return n(e) ? void 0 : u(makeError("nodefine", "No define call for " + e, null, [e]));
					h([e, a.deps || [], a.exportsFn])
				}
				l()
			},
			nameToUrl: function(e, t, i) {
				var r, n, a, o, s, c, u, d = getOwn(y.pkgs, e);
				if (d && (e = d), u = getOwn(R, e)) return q.nameToUrl(u, t, i);
				if (req.jsExtRegExp.test(e)) s = e + (t || "");
				else {
					for (r = y.paths, n = e.split("/"), a = n.length; a > 0; a -= 1) if (o = n.slice(0, a).join("/"), c = getOwn(r, o)) {
						isArray(c) && (c = c[0]), n.splice(0, a, c);
						break
					}
					s = n.join("/"), s += t || (/^data\:|\?/.test(s) || i ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : y.baseUrl) + s
				}
				return y.urlArgs ? s + ((-1 === s.indexOf("?") ? "?" : "&") + y.urlArgs) : s
			},
			load: function(e, t) {
				req.load(q, e, t)
			},
			execCb: function(e, t, i, r) {
				return t.apply(r, i)
			},
			onScriptLoad: function(e) {
				if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
					interactiveScript = null;
					var t = g(e);
					q.completeLoad(t.id)
				}
			},
			onScriptError: function(e) {
				var t = g(e);
				return n(t.id) ? void 0 : u(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
			}
		}, q.require = q.makeRequire(), q
	}
	function getInteractiveScript() {
		return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(e) {
			return "interactive" === e.readyState ? interactiveScript = e : void 0
		}), interactiveScript)
	}
	var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.18",
		commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
		cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
		jsSuffixRegExp = /\.js$/,
		currDirRegExp = /^\.\//,
		op = Object.prototype,
		ostring = op.toString,
		hasOwn = op.hasOwnProperty,
		ap = Array.prototype,
		apsp = ap.splice,
		isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
		isWebWorker = !isBrowser && "undefined" != typeof importScripts,
		readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
		defContextName = "_",
		isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
		contexts = {},
		cfg = {},
		globalDefQueue = [],
		useInteractive = !1;
	if ("undefined" == typeof define) {
		if ("undefined" != typeof requirejs) {
			if (isFunction(requirejs)) return;
			cfg = requirejs, requirejs = void 0
		}
		"undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(e, t, i, r) {
			var n, a, o = defContextName;
			return isArray(e) || "string" == typeof e || (a = e, isArray(t) ? (e = t, t = i, i = r) : e = []), a && a.context && (o = a.context), n = getOwn(contexts, o), n || (n = contexts[o] = req.s.newContext(o)), a && n.configure(a), n.require(e, t, i)
		}, req.config = function(e) {
			return req(e)
		}, req.nextTick = "undefined" != typeof setTimeout ?
		function(e) {
			setTimeout(e, 4)
		} : function(e) {
			e()
		}, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
			contexts: contexts,
			newContext: newContext
		}, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
			req[e] = function() {
				var t = contexts[defContextName];
				return t.require[e].apply(t, arguments)
			}
		}), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(e, t, i) {
			var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
			return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r
		}, req.load = function(e, t, i) {
			var r, n = e && e.config || {};
			if (isBrowser) return r = req.createNode(n, t, i), r.setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = i, currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;
			if (isWebWorker) try {
				importScripts(i), e.completeLoad(t)
			} catch (a) {
				e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + i, a, [t]))
			}
		}, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(e) {
			return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
		}), define = function(e, t, i) {
			var r, n;
			"string" != typeof e && (i = t, t = e, e = null), isArray(t) || (i = t, t = null), !t && isFunction(i) && (t = [], i.length && (i.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(e, i) {
				t.push(i)
			}), t = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), n = contexts[r.getAttribute("data-requirecontext")])), (n ? n.defQueue : globalDefQueue).push([e, t, i])
		}, define.amd = {
			jQuery: !0
		}, req.exec = function(text) {
			return eval(text)
		}, req(cfg)
	}
}(this);
requirejs.config({
	baseUrl: "http://home.qyerstatic.com",
	urlArgs: "v=" + window.__qRequire__.version,
	map: {
		"*": {
			css: "common/models/basic/js/require-css",
			text: "common/models/basic/js/text"
		}
	},
	paths: {
		jquery: "common/models/basic/js/jquery-1.10.2.min",
		web_ct_logindialog: "bower_components/web_ct_logindialog/loginDialog",
		web_ct_logindialog_loginFormValid: "bower_components/web_ct_logindialog/loginFormValid",
		web_old_popup: "bower_components/web_old_popup/popup",
		web_old_select: "bower_components/web_old_select/select",
		web_old_tip: "bower_components/web_old_tip/tip",
		web_lib_jquerymousewheel: "bower_components/web_lib_jquerymousewheel/jquery.mousewheel",
		web_lib_jquerylazyload: "bower_components/web_lib_jquerylazyload/jquery.lazyload",
		web_old_tooltips: "bower_components/web_old_tooltips/tooltip",
		web_lib_template: "bower_components/web_lib_template/template",
		web_ct_feedback: "bower_components/web_ct_feedback/feedback"
	}
});
window.QYER || (window.QYER = {
	uid: 0
}), !
function() {
	var e = jQuery;
	!
	function() {
		window.qyerUtil = {
			init: function() {
				window.QYER && window.QYER.frameVersion > 1 && (this._initHead(), this.spam_text_filter(), this.includeGA(), this.frameCompatibleh())
			},
			frameCompatibleh: function() {
				window._qyer_userid = window.QYER.uid, window.setCookie = this.setCookie, window.getCookie = this.getCookie, window._gaq = window._gaq || []
			},
			includeGA: function() {
				window._gaq = window._gaq || [], window._gaq.push(["_setAccount", "UA-185023-1"], ["_setDomainName", "qyer.com"], ["_setSiteSpeedSampleRate", 10], ["_addIgnoredRef", "qyer.com"], ["_addOrganic", "soso", "w"], ["_addOrganic", "sogou", "query"], ["_addOrganic", "baidu", "word"], ["_addOrganic", "baidu", "q1"], ["_addOrganic", "baidu", "q2"], ["_addOrganic", "m.baidu", "word"], ["_addOrganic", "so.360", "q"], ["_addOrganic", "so", "q"], ["_addOrganic", "baidu", "w"], ["_addOrganic", "cn.bing", "q"], ["_addOrganic", "sm", "q"], ["_trackPageview"]), "https:" == document.location.protocol ? requirejs(["https://ssl.google-analytics.com/ga.js"]) : requirejs(["http://qt.qyer.com/beacon.js", "http://www.google-analytics.com/ga.js"])
			},
			setCookie: function(e, t, n) {
				var i = 365,
					o = new Date;
				arguments[2] || (n = 1), 1 == n ? (o.setTime(o.getTime() + 24 * i * 60 * 60 * 1e3), document.cookie = e + "=" + escape(t) + "; path=/;domain=.qyer.com;expires=" + o.toGMTString()) : document.cookie = e + "=" + escape(t) + "; path=/;domain=.qyer.com", i = o = null
			},
			getCookie: function(e) {
				var t = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
				return null != t ? unescape(t[2]) : null
			},
			_initHead: function() {
				"ask.qyer.com" == window.location.hostname && e(".qyer_header_bg").css("position", "fixed")
			},
			_head: null,
			_getHead: function() {
				return this._head || (this._head = document.getElementsByTagName("head")[0]), this._head
			},
			loadCss: function(t, n) {
				n === !1 ? this.insertStyle(e.ajax({
					url: t,
					async: !1
				}).responseText) : e('<link rel="stylesheet" type="text/css" />').attr("href", t).appendTo(this._getHead())
			},
			insertStyle: function(e) {
				var t = document.createElement("style");
				t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = e : t.innerHTML = e, this._getHead().appendChild(t), t = null
			},
			sliceArguments: function(e, t) {
				for (var n = [], i = t; i < e.length; i++) n.push(e[i]);
				return n
			},
			isMobile: function() {
				var e = navigator.userAgent;
				return e.match(/Android/i) || -1 != e.indexOf("iPhone") || -1 != e.indexOf("iPad")
			},
			getWordLen: function(t, n) {
				function i(e) {
					if ("undefined" == typeof e) return 0;
					var t = e.match(/[^\x00-\x80]/g);
					return e.length + (t ? t.length : 0)
				}
				function o(e) {
					return e.replace(/[^\x00-\xff]/g, "*")
				}
				return n && (t = o(t)), i(e.trim(t))
			},
			subStr: function(e, t) {
				for (var n, i, o = 0, r = 0; r < e.length; r++) if (n = e.charAt(r), o += encodeURI(n).length > 2 ? 1 : .5, o >= t) return i = o == t ? r + 1 : r, e.substr(0, i);
				return e
			},
			doTrackCode: function(t) {
				var n = "__dotarckcodebutton__";
				document.getElementById(n) || e('<button id="' + n + '" style="display:none;">dotarckcodebutton</button>').appendTo(document.body), e("#" + n).attr("data-bn-ipg", t).trigger("click"), n = null
			},
			ajaxFillter: function(e, t, n) {
				if (0 != window.location.href.indexOf("http://plan.qyer.com") && "object" == typeof e && e.extra && e.extra.code) switch (0 | e.extra.code) {
				case 1:
					window.qyerUtil.showAntiSpam(e.extra.msg)
				}
			},
			showAntiSpam: function(e) {
				requirejs(["web_ct_antispam"], function(t) {
					t.show(e)
				})
			},
			doAjax: function(t) {
				var n, i, o;
				if (n = t.minResponseTime ? new Date : null, o = function(e) {
					if ("undefined" == typeof e.error_code) try {
						e.error_code = e.error, e.result = e.result, 0 != e.error_code && (e.data = e.data || {}, e.data.msg = e.msg)
					} catch (n) {}
					0 == e.error_code ? ("undefined" == typeof e.data && (e.data = t.__defaultData__), t.onCallSuccessBefore && t.onCallSuccessBefore(e), t.onSuccess && t.onSuccess(e), t.onCallSuccessAfter && t.onCallSuccessAfter(e)) : t.onError && t.onError(e)
				}, t.testData) return "undefined" == typeof t.testData.data && (t.testData.data = t.__defaultData__), void setTimeout(function() {
					o(t.testData)
				}, t.minResponseTime || 200);
				var r = window.location.host,
					a = t.url || t.posturl,
					c = t.data,
					s = "json";
				if (/static.qyer.com/.test(r) === !0 || /qyerstatic.com/.test(r) === !0) {
					var u;
					c = e.extend({}, c, {
						__qFED__: t.__qFED__
					}), t.__qFED__ && t.__qFED__.id && (u = t.__qFED__.id, t.type = "GET"), a = "http://fe.2b6.me:3000/service/api/" + u, s = "jsonp", api = null
				}
				var d = e.ajax({
					type: t.type || "POST",
					url: a,
					dataType: s,
					data: c,
					cache: t.cache || !1,
					success: function(e) {
						n ? (i = new Date - n, setTimeout(function() {
							o.call(null, e)
						}, i > t.minResponseTime ? 0 : t.minResponseTime - i)) : o.call(null, e), n = i = null
					},
					error: function(e, n) {
						t.onError && t.onError({
							error_code: -1,
							__server_error__: !0,
							__server_status__: d.statusText,
							result: "error",
							data: {
								msg: n || {}
							}
						})
					}
				});
				return d
			},
			runOneInPeriodOfTime: function(e, t) {
				var n;
				return function(i, o, r, a, c) {
					window.clearTimeout(n), n = window.setTimeout(function() {
						e(i, o, r, a, c)
					}, t || 300)
				}
			},
			isLogin: function() {
				return !(!window.QYER || !window.QYER.uid)
			},
			doLogin: function(e) {
				window.qyerUtil.isLogin() || requirejs(["web_ct_logindialog"], function(t) {
					t.show(e)
				})
			},
			doSignin: function(t) {
				requirejs(["web_ct_logindialog"], function(n) {
					n.show(e.extend({}, {
						page: "regist"
					}, t))
				})
			},
			getUrlParam: function(e, t) {
				var n, i = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
				if (t) {
					var o = t.indexOf("?"); - 1 != o && (n = t.substr(t.indexOf("?") + 1))
				} else n = window.location.search.substr(1);
				if (!n) return null;
				var r = n.match(i);
				return null != r ? unescape(r[2]) : null
			},
			spam_text_filter: function() {
				var t, n, i, o, r;
				t = /(http:\/\/)?[\w\.]*\.?(mafengwo\.cn|mafengwo\.com|mafengwo\.net)[a-zA-Z\/0-9&\?\.#\-_]*/gim, r = e(".qyer_spam_text_filter"), r.find("a").each(function() {
					n = e(this), (-1 != (n.html() + n.attr("href")).indexOf("mafengwo.cn") || -1 != (n.html() + n.attr("href")).indexOf("mafengwo.com") || -1 != (n.html() + n.attr("href")).indexOf("mafengwo.net")) && n.replaceWith(e(this).html())
				}), r.each(function() {
					if (n = e(this), i = n.html().replace(/\<script.*?\>document\.write\(AC_FL_RunContent.*?\<\/script\>/gim, ""), o = i.match(/\<img[\s\S]*?\>/gim), null != o) for (var r = 0; r < o.length; r++) i = i.replace(o[r], "[imgimg]" + r + "[/imgimg]");
					if (i = i.replace(t, ""), null != o) for (var r = 0; r < o.length; r++) i = i.replace("[imgimg]" + r + "[/imgimg]", o[r]);
					n.html(i)
				}), t = n = i = o = r = null
			},
			openUrl: function(t) {
				var n = e('<form action="' + t + '" target="_blank" method="get"></form>');
				n.appendTo(document.body), n.submit(), setTimeout(function() {
					n.remove(), n = null
				}, 8e3)
			}
		}
	}(), !
	function() {
		function e(e, t) {
			for (var n in t) e[n] = t[n]
		}
		e(Date.prototype, {
			qGetWeekStr: function() {
				return "星期" + ["日", "一", "二", "三", "四", "五", "六"][this.getDay()]
			},
			qAddDate: function(e) {
				return this.setDate(this.getDate() + e), this
			},
			qToString: function(e) {
				var t = [this.getFullYear(), this.getMonth() + 1, this.getDate()];
				return t.join(e || "-")
			}
		}), e(String.prototype, {
			qToDate: function(e) {
				var t = this.split(e || "-");
				t = [0 | t[0], (0 | t[1]) - 1, 0 | t[2]];
				var n = new Date(t[0], t[1], t[2]);
				return t.length = 0, t = null, n
			},
			qToIntFixed: function() {
				var e = 0 | this;
				return 10 > e ? "0" + e : e.toString()
			},
			qToHTML: function() {
				return this.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/\n/gi, "<br />").replace(/\t/gi, "&nbsp;&nbsp;&nbsp;&nbsp;")
			}
		})
	}()
}(), $(function() {
	qyerUtil.init()
});
var HomeUtil = {
	isParent: function(t, e) {
		for (; void 0 != t && null != t && "BODY" != t.tagName.toUpperCase() && "HTML" != t.tagName.toUpperCase();) {
			if (t == e) return !0;
			t = t.parentNode
		}
		return !1
	},
	loadInner: function() {
		return '<div class="sk-wave"><div class="sk-rect sk-rect1"></div><div class="sk-rect sk-rect2"></div><div class="sk-rect sk-rect3"></div><div class="sk-rect sk-rect4"></div><div class="sk-rect sk-rect5"></div></div>'
	},
	fliterScript: function(t) {
		return t.replace(/<script[^>]*>[\s\S]*?<\/[^>]*script>/gi, "")
	},
	otherlogin: function(t, e) {
		var e = "http://login.qyer.com/auth.php?action=" + t + "&popup=1&refer=" + (e || window.location.href);
		window.open(e, "newwindow", "width=600,height=530,top=100,left=300,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no"), e = null
	}
};