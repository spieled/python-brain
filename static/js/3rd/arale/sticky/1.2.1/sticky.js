define("arale/sticky/1.2.1/sticky", ["$"], function (a, b, c) {
	function d(a) {
		this.options = a || {}, this.elem = h(this.options.element), this.callback = a.callback || function () {
		}, this.marginTop = a.marginTop || 0, this._stickyId = k++
	}

	function e(a, b, c) {
		return new d({element: a, marginTop: b || 0, callback: c}).render()
	}

	function f() {
		return!n
	}

	function g() {
		if (m)return!1;
		var a = i[0].body;
		if (i[0].createElement && a && a.appendChild && a.removeChild) {
			var b, c = i[0].createElement("div"), d = function (a) {
				return window.getComputedStyle ? window.getComputedStyle(c).getPropertyValue(a) : c.currentStyle.getAttribute(a)
			};
			a.appendChild(c);
			for (var e = 0; e < j.length && (c.style.cssText = "position:" + j[e] + "sticky;visibility:hidden;", !(b = -1 !== d("position").indexOf("sticky"))); e++);
			return c.parentNode.removeChild(c), b
		}
	}

	var h = a("$"), i = h(document), j = ["-webkit-", "-ms-", "-o-", "-moz-", ""], k = 0, l = (window.navigator.userAgent || "").toLowerCase(), m = -1 !== l.indexOf("msie"), n = -1 !== l.indexOf("msie 6"), o = g(), p = f();
	d.prototype.render = function () {
		var a = this;
		if (this.elem.length && !this.elem.data("bind-sticked")) {
			if (this._originTop = this.elem.offset().top, this.marginTop === Number.MAX_VALUE) {
				var b = !0;
				this.marginTop = this._originTop
			}
			this._originStyles = {position: null, top: null, left: null};
			for (var c in this._originStyles)this._originStyles.hasOwnProperty(c) && (this._originStyles[c] = this.elem.css(c));
			var d;
			if (e.isPositionStickySupported && !b) {
				d = this._supportSticky;
				for (var f = "", g = 0; g < j.length; g++)f += "position:" + j[g] + "sticky;";
				this.elem[0].style.cssText += f + "top: " + this.marginTop + "px;"
			} else e.isPositionFixedSupported ? d = this._supportFixed : (d = this._supportAbsolute, h("<style type='text/css'> * html{ background:url(null) no-repeat fixed; } </style>").appendTo("head"));
			return d.call(this), h(window).on("scroll." + this._stickyId, function () {
				a.elem.is(":visible") && d.call(a)
			}), this.elem.data("bind-sticked", !0), this
		}
	}, d.prototype._supportFixed = function () {
		var a = this._originTop - i.scrollTop();
		!this.elem.data("sticked") && a <= this.marginTop ? (this._addPlaceholder(), this.elem.css({position: "fixed", top: this.marginTop, left: this.elem.offset().left}), this.elem.data("sticked", !0), this.callback.call(this, !0)) : this.elem.data("sticked") && a > this.marginTop && this._restore()
	}, d.prototype._supportAbsolute = function () {
		var a = this._originTop - i.scrollTop();
		a <= this.marginTop ? (this.elem.data("sticked") || (this._addPlaceholder(), this.elem.data("sticked", !0), this.callback.call(this, !0)), this.elem.css({position: "absolute", top: this.marginTop + i.scrollTop()})) : this.elem.data("sticked") && a > this.marginTop && this._restore()
	}, d.prototype._supportSticky = function () {
		var a = this._originTop - i.scrollTop();
		!this.elem.data("sticked") && a <= this.marginTop ? (this.elem.data("sticked", !0), this.callback.call(this, !0)) : this.elem.data("sticked") && a > this.marginTop && this.callback.call(this, !1)
	}, d.prototype._restore = function () {
		this._removePlaceholder(), this.elem.css(this._originStyles), this.elem.data("sticked", !1), this.callback.call(this, !1)
	}, d.prototype._addPlaceholder = function () {
		var a = !1, b = this.elem.css("position");
		("static" === b || "relative" === b) && (a = !0), "block" !== this.elem.css("display") && (a = !1), a && (this._placeholder = h('<div style="visibility:hidden;margin:0;padding:0;"></div>'), this._placeholder.width(this.elem.outerWidth(!0)).height(this.elem.outerHeight(!0)).css("float", this.elem.css("float")).insertAfter(this.elem))
	}, d.prototype._removePlaceholder = function () {
		this._placeholder && this._placeholder.remove()
	}, d.prototype.destory = function () {
		this._restore(), this.elem.data("bind-sticked", !1), h(window).off("scroll." + this._stickyId)
	}, c.exports = e, e.stick = e, e.fix = function (a) {
		return new d({element: a, marginTop: Number.MAX_VALUE}).render()
	}, e.isPositionStickySupported = o, e.isPositionFixedSupported = p
});
