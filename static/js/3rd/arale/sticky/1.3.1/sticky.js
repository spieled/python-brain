// 有自定义的修改，在构造函数的最后加了 this.elem.attr('stickyId',this._stickyId)
// 将stickyId赋到了DOM上，便于外部(hair/chart/1.0.0/chart.js)去获取到stickyId做针对性的操作。
define("arale/sticky/1.3.1/sticky", ["$"], function (a, b, c, d) {
	function e(a) {
		this.options = a || {}, this.elem = k(this.options.element), this.callback = a.callback || function () {
		}, this.position = a.position, this._stickyId = n++, this.elem.attr('stickyId', this._stickyId)
	}

	function f(a, b, c) {
		return k.isPlainObject(b) || (b = {top: b}), b.top === d && b.bottom === d && (b.top = 0), new e({element: a, position: b, callback: c}).render()
	}

	function g() {
		return!q
	}

	function h() {
		if (p)return!1;
		var a = l[0].body;
		if (l[0].createElement && a && a.appendChild && a.removeChild) {
			var b, c = l[0].createElement("div"), d = function (a) {
				return window.getComputedStyle ? window.getComputedStyle(c).getPropertyValue(a) : c.currentStyle.getAttribute(a)
			};
			a.appendChild(c);
			for (var e = 0; e < m.length && (c.style.cssText = "position:" + m[e] + "sticky;visibility:hidden;", !(b = -1 !== d("position").indexOf("sticky"))); e++);
			return c.parentNode.removeChild(c), b
		}
	}

	function i() {
		return(Date.now || function () {
			return(new Date).getTime()
		})()
	}

	function j(a, b, c) {
		var d, e, f, g, h;
		return function () {
			f = this, e = arguments, g = i();
			var j = function () {
				var k = i() - g;
				b > k ? d = setTimeout(j, b - k) : (d = null, c || (h = a.apply(f, e)))
			}, k = c && !d;
			return d || (d = setTimeout(j, b)), k && (h = a.apply(f, e)), h
		}
	}

	var k = a("$"), l = k(document), m = ["-webkit-", "-ms-", "-o-", "-moz-", ""], n = 0, o = (window.navigator.userAgent || "").toLowerCase(), p = -1 !== o.indexOf("msie"), q = -1 !== o.indexOf("msie 6"), r = h(), s = g();
	e.prototype._prepare = function () {
		var a = this.elem.offset();
		this._originTop = a.top, this._originLeft = a.left, this.position.top === Number.MAX_VALUE && (this._callFix = !0, this.position.top = this._originTop), this._originStyles = {position: null, top: null, bottom: null, left: null};
		for (var b in this._originStyles)this._originStyles.hasOwnProperty(b) && (this._originStyles[b] = this.elem.css(b))
	}, e.prototype.render = function () {
		var a = this;
		if (!this.elem.length || this.elem.data("bind-sticked"))return this;
		this._prepare(), this.adjust = function () {
			a._restore();
			var c = a.elem.offset();
			a._originTop = c.top, a._originLeft = c.left, b.call(a)
		};
		var b;
		if (f.isPositionStickySupported && !this._callFix) {
			b = this._supportSticky;
			for (var c = "", e = 0; e < m.length; e++)c += "position:" + m[e] + "sticky;";
			this.position.top !== d && (c += "top: " + this.position.top + "px;"), this.position.bottom !== d && (c += "bottom: " + this.position.bottom + "px;"), this.elem[0].style.cssText += c, this.adjust = function () {
				b.call(a)
			}
		} else f.isPositionFixedSupported ? b = this._supportFixed : (b = this._supportAbsolute, k("<style type='text/css'> * html{ background:url(null) no-repeat fixed; } </style>").appendTo("head"));
		return b.call(this), k(window).on("scroll.sticky" + this._stickyId, function () {
			a.elem.is(":visible") && b.call(a)
		}), k(window).on("resize.sticky" + this._stickyId, j(function () {
			a.adjust()
		}, 120)), this.elem.data("bind-sticked", !0), this
	}, e.prototype._getTopBottom = function (a, b) {
		var c, e;
		return this.position.top !== d && (c = b - a <= this.position.top), this.position.bottom !== d && (e = a + k(window).height() - b - this.elem.outerHeight() <= this.position.bottom), {top: c, bottom: e}
	}, e.prototype._supportFixed = function () {
		var a = this.elem.data("sticked"), b = this._getTopBottom(l.scrollTop(), this._originTop);
		!a && (b.top !== d && b.top || b.bottom !== d && b.bottom) ? (this._addPlaceholder(), this.elem.css(k.extend({position: "fixed", left: this._originLeft}, b.top ? {top: this.position.top} : {bottom: this.position.bottom})), this.elem.data("sticked", !0), this.callback.call(this, !0)) : !a || b.top || b.bottom || this._restore()
	}, e.prototype._supportAbsolute = function () {
		var a = l.scrollTop(), b = this.elem.data("sticked"), c = this._getTopBottom(a, this.elem.offset().top);
		c.top || c.bottom || this._callFix ? (b || (this._addPlaceholder(), this.elem.data("sticked", !0), this.callback.call(this, !0)), this.elem.css({position: "absolute", top: this._callFix ? this._originTop + a : c.top ? this.position.top + a : a + k(window).height() - this.position.bottom - this.elem.outerHeight()})) : !b || c.top || c.bottom || this._restore()
	}, e.prototype._supportSticky = function () {
		var a = this.elem.data("sticked"), b = this._getTopBottom(l.scrollTop(), this.elem.offset().top);
		!a && (b.top !== d && b.top || b.bottom !== d && b.bottom) ? (this.elem.data("sticked", !0), this.callback.call(this, !0)) : !a || b.top || b.bottom || (this.elem.data("sticked", !1), this.callback.call(this, !1))
	}, e.prototype._restore = function () {
		this._removePlaceholder(), this.elem.css(this._originStyles), this.elem.data("sticked", !1), this.callback.call(this, !1)
	}, e.prototype._addPlaceholder = function () {
		var a = !1, b = this.elem.css("position");
		("static" === b || "relative" === b) && (a = !0), "block" !== this.elem.css("display") && (a = !1), a && (this._placeholder = k('<div style="visibility:hidden;margin:0;padding:0;"></div>'), this._placeholder.width(this.elem.outerWidth(!0)).height(this.elem.outerHeight(!0)).css("float", this.elem.css("float")).insertAfter(this.elem))
	}, e.prototype._removePlaceholder = function () {
		this._placeholder && this._placeholder.remove()
	}, e.prototype.destroy = function () {
		this._restore(), this.elem.data("bind-sticked", !1), k(window).off("scroll.sticky" + this._stickyId), k(window).off("resize.sticky" + this._stickyId)
	}, c.exports = f, f.stick = f, f.fix = function (a) {
		return new e({element: a, position: {top: Number.MAX_VALUE}}).render()
	}, f.isPositionStickySupported = r, f.isPositionFixedSupported = s
});