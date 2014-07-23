define("arale/switchable/0.9.15/tabs", ["./switchable", "$", "arale/easing/1.0.0/easing", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "./plugins/effects", "./plugins/autoplay", "./plugins/circular", "./plugins/multiple", "./const"], function (a, b, c) {
	var d = a("./switchable");
	c.exports = d.extend({})
}), define("arale/switchable/0.9.15/switchable", ["$", "arale/easing/1.0.0/easing", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/switchable/0.9.15/plugins/effects", "arale/switchable/0.9.15/plugins/autoplay", "arale/switchable/0.9.15/plugins/circular", "arale/switchable/0.9.15/plugins/multiple", "arale/switchable/0.9.15/const"], function (a, b, c) {
	function d(a, b, c) {
		for (var d = e("<ul>"), f = 0; a > f; f++) {
			var g = f === b ? c : "";
			e("<li>", {"class": g, html: f + 1}).appendTo(d)
		}
		return d
	}

	var e = a("$");
	a("arale/easing/1.0.0/easing");
	var f = a("arale/widget/1.1.1/widget"), g = "ui-switchable", h = a("arale/switchable/0.9.15/plugins/effects"), i = a("arale/switchable/0.9.15/plugins/autoplay"), j = a("arale/switchable/0.9.15/plugins/circular"), k = a("arale/switchable/0.9.15/plugins/multiple"), l = f.extend({attrs: {triggers: {value: [], getter: function (a) {
		return e(a)
	}}, panels: {value: [], getter: function (a) {
		return e(a)
	}}, classPrefix: g, hasTriggers: !0, triggerType: "hover", delay: 100, effect: "none", easing: "linear", duration: 500, activeIndex: 0, step: 1, length: {readOnly: !0, getter: function () {
		return Math.ceil(this.panels.length / this.get("step"))
	}}, viewSize: [], activeTriggerClass: g + "-active"}, setup: function () {
		this._initConstClass(), this._parseRole(), this._initElement(), this._initPanels(), this._initTriggers(), this._initPlugins()
	}, _initConstClass: function () {
		var b = this.get("classPrefix");
		this.CONST = a("arale/switchable/0.9.15/const")(b)
	}, _parseRole: function (a) {
		if (a = a || this._getDatasetRole()) {
			var b = this.get("triggers"), c = this.get("panels");
			0 === b.length && (a.trigger || a.nav) && (b = a.trigger || a.nav.find("> *")), 0 === c.length && (a.panel || a.content) && (c = a.panel || a.content.find("> *")), this.set("triggers", b), this.set("panels", c)
		}
	}, _getDatasetRole: function (a) {
		var b = this.element;
		a = a || {};
		var c = !1, d = ["trigger", "panel", "nav", "content"];
		return e.each(d, function (d, f) {
			var g = e("[data-role=" + f + "]", b);
			g.length && (a[f] = g, c = !0)
		}), c ? a : null
	}, _initElement: function () {
		this.element.addClass(this.CONST.UI_SWITCHABLE)
	}, _initPanels: function () {
		var a = this.panels = this.get("panels");
		if (0 === a.length)throw new Error("panels.length is ZERO");
		this.content = a.parent().addClass(this.CONST.CONTENT_CLASS), a.addClass(this.CONST.PANEL_CLASS)
	}, _initTriggers: function () {
		var a = this.triggers = this.get("triggers");
		0 === a.length && this.get("hasTriggers") ? (this.nav = d(this.get("length"), this.get("activeIndex"), this.get("activeTriggerClass")).appendTo(this.element), this.triggers = this.nav.children()) : this.nav = a.parent(), this.triggers.addClass(this.CONST.TRIGGER_CLASS), this.nav.addClass(this.CONST.NAV_CLASS), this.triggers.each(function (a, b) {
			e(b).data("value", a)
		}), this._bindTriggers()
	}, _initPlugins: function () {
		this._plugins = [], this._plug(h), this._plug(i), this._plug(j), this._plug(k)
	}, _bindTriggers: function () {
		function a(a) {
			c._onFocusTrigger(a.type, e(this).data("value"))
		}

		function b() {
			clearTimeout(c._switchTimer)
		}

		var c = this;
		"click" === this.get("triggerType") ? this.triggers.click(a) : this.triggers.hover(a, b)
	}, _onFocusTrigger: function (a, b) {
		var c = this;
		"click" === a ? this.switchTo(b) : this._switchTimer = setTimeout(function () {
			c.switchTo(b)
		}, this.get("delay"))
	}, switchTo: function (a) {
		return this.set("activeIndex", a), this
	}, _onRenderActiveIndex: function (a, b) {
		this._triggerIsValid(a, b) && this._switchTo(a, b)
	}, _switchTo: function (a, b) {
		this.trigger("switch", a, b), this._switchTrigger(a, b), this._switchPanel(this._getPanelInfo(a, b)), this.trigger("switched", a, b)
	}, _triggerIsValid: function (a, b) {
		return a !== b
	}, _switchTrigger: function (a, b) {
		var c = this.triggers;
		c.length < 1 || (c.eq(b).removeClass(this.get("activeTriggerClass")), c.eq(a).addClass(this.get("activeTriggerClass")))
	}, _switchPanel: function (a) {
		a.fromPanels.hide(), a.toPanels.show()
	}, _getPanelInfo: function (a, b) {
		var c, d, f = this.panels.get(), g = this.get("step");
		if (b > -1) {
			var h = b * g, i = (b + 1) * g;
			c = f.slice(h, i)
		}
		return d = f.slice(a * g, (a + 1) * g), {toIndex: a, fromIndex: b, toPanels: e(d), fromPanels: e(c)}
	}, prev: function () {
		var a = this.get("activeIndex"), b = (a - 1 + this.get("length")) % this.get("length");
		this.switchTo(b)
	}, next: function () {
		var a = this.get("activeIndex"), b = (a + 1) % this.get("length");
		this.switchTo(b)
	}, _plug: function (a) {
		if (a.isNeeded.call(this)) {
			var b = a.attrs, c = a.methods;
			if (b)for (var d in b)!b.hasOwnProperty(d) || d in this.attrs || this.set(d, b[d]);
			if (c)for (var e in c)c.hasOwnProperty(e) && (this[e] = c[e]);
			a.install && a.install.call(this), this._plugins.push(a)
		}
	}, destroy: function () {
		e.each(this._plugins, function (a, b) {
			b.destroy && b.destroy.call(this)
		}), l.superclass.destroy.call(this)
	}});
	c.exports = l
}), define("arale/switchable/0.9.15/plugins/effects", ["$"], function (a, b, c) {
	var d = a("$"), e = "scrollx", f = "scrolly", g = "fade";
	c.exports = {isNeeded: function () {
		return"none" !== this.get("effect")
	}, install: function () {
		var a = this.panels;
		a.show();
		var b = this.get("effect"), c = this.get("step");
		if (0 === b.indexOf("scroll")) {
			var f = this.content, i = a.eq(0);
			f.css("position", "relative"), "static" === f.parent().css("position") && f.parent().css("position", "relative"), b === e && (a.css("float", "left"), f.width("9999px"));
			var j = this.get("viewSize");
			if (j[0] || (j[0] = i.outerWidth() * c, j[1] = i.outerHeight() * c, this.set("viewSize", j)), !j[0])throw new Error("Please specify viewSize manually")
		} else if (b === g) {
			var k = this.get("activeIndex"), l = k * c, m = l + c - 1;
			a.each(function (a, b) {
				var c = a >= l && m >= a;
				d(b).css({opacity: c ? 1 : 0, position: "absolute", zIndex: c ? 9 : 1})
			})
		}
		this._switchPanel = function (a) {
			var b = this.get("effect"), c = d.isFunction(b) ? b : h[b];
			c.call(this, a)
		}
	}};
	var h = {fade: function (a) {
		if (this.get("step") > 1)throw new Error('Effect "fade" only supports step === 1');
		var b = a.fromPanels.eq(0), c = a.toPanels.eq(0), d = this.anim;
		if (d && d.stop(!1, !0), c.css("opacity", 1), b[0]) {
			var e = this.get("duration"), f = this.get("easing"), g = this;
			this.anim = b.animate({opacity: 0}, e, f, function () {
				g.anim = null, c.css("zIndex", 9), b.css("zIndex", 1)
			})
		} else c.css("zIndex", 9)
	}, scroll: function (a) {
		var b = this.get("effect") === e, c = this.get("viewSize")[b ? 0 : 1] * a.toIndex, d = {};
		if (d[b ? "left" : "top"] = -c + "px", this.anim && this.anim.stop(), a.fromIndex > -1) {
			var f = this, g = this.get("duration"), h = this.get("easing");
			this.anim = this.content.animate(d, g, h, function () {
				f.anim = null
			})
		} else this.content.css(d)
	}};
	h[f] = h.scroll, h[e] = h.scroll, c.exports.Effects = h
}), define("arale/switchable/0.9.15/plugins/autoplay", ["$"], function (a, b, c) {
	function d(a, b) {
		function c() {
			c.stop(), d = setTimeout(a, b)
		}

		b = b || 200;
		var d;
		return c.stop = function () {
			d && (clearTimeout(d), d = 0)
		}, c
	}

	function e(a) {
		var b = g.scrollTop(), c = b + g.height(), d = a.offset().top, e = d + a.height();
		return c > d && e > b
	}

	var f = a("$");
	c.exports = {attrs: {autoplay: !0, interval: 5e3, pauseOnScroll: !0, pauseOnHover: !0}, isNeeded: function () {
		return this.get("autoplay")
	}, install: function () {
		function a() {
			b(), j.paused = !1, c = setInterval(function () {
				j.paused || j.next()
			}, i)
		}

		function b() {
			c && (clearInterval(c), c = null), j.paused = !0
		}

		var c, f = this.element, h = "." + this.cid, i = this.get("interval"), j = this;
		a(), this.stop = b, this.start = a, this.get("pauseOnScroll") && (this._scrollDetect = d(function () {
			j[e(f) ? "start" : "stop"]()
		}), g.on("scroll" + h, this._scrollDetect)), this.get("pauseOnHover") && this.element.hover(b, a)
	}, destroy: function () {
		var a = "." + this.cid;
		this.stop && this.stop(), this._scrollDetect && (this._scrollDetect.stop(), g.off("scroll" + a))
	}};
	var g = f(window)
}), define("arale/switchable/0.9.15/plugins/circular", ["$", "arale/switchable/0.9.15/plugins/effects"], function (a, b, c) {
	function d(a, b, c) {
		var d = this.get("step"), e = this.get("length"), g = a ? e - 1 : 0, h = g * d, i = (g + 1) * d, j = a ? c : -c * e, k = a ? -c * e : c * e, l = f(this.panels.get().slice(h, i));
		return l.css("position", "relative"), l.css(b, k + "px"), j
	}

	function e(a, b, c) {
		var d = this.get("step"), e = this.get("length"), g = a ? e - 1 : 0, h = g * d, i = (g + 1) * d, j = f(this.panels.get().slice(h, i));
		j.css("position", ""), j.css(b, ""), this.content.css(b, a ? -c * (e - 1) : "")
	}

	var f = a("$"), g = "scrollx", h = "scrolly", i = a("arale/switchable/0.9.15/plugins/effects").Effects;
	c.exports = {isNeeded: function () {
		var a = this.get("effect"), b = this.get("circular");
		return b && (a === g || a === h)
	}, install: function () {
		this.set("scrollType", this.get("effect")), this.set("effect", "scrollCircular")
	}}, i.scrollCircular = function (a) {
		var b = a.toIndex, c = a.fromIndex, f = this.get("length"), h = this.get("_isNext"), i = 0 === c && b === f - 1 && !h, j = c === f - 1 && 0 === b && h, k = i || !j && c > b, l = i || j, m = this.get("scrollType") === g, n = m ? "left" : "top", o = this.get("viewSize")[m ? 0 : 1], p = -o * b;
		this.anim && this.anim.stop(!1, !0), l && (p = d.call(this, k, n, o));
		var q = {};
		if (q[n] = p + "px", c > -1) {
			var r = this.get("duration"), s = this.get("easing"), t = this;
			this.anim = this.content.animate(q, r, s, function () {
				t.anim = null, l && e.call(t, k, n, o)
			})
		} else this.content.css(q)
	}
}), define("arale/switchable/0.9.15/plugins/multiple", [], function (a, b, c) {
	c.exports = {isNeeded: function () {
		return this.get("multiple")
	}, methods: {switchTo: function (a) {
		this._switchTo(a, a)
	}, _switchTrigger: function (a) {
		this.triggers.eq(a).toggleClass(this.get("activeTriggerClass"))
	}, _triggerIsValid: function () {
		return!0
	}, _switchPanel: function (a) {
		a.toPanels.toggle()
	}}}
}), define("arale/switchable/0.9.15/const", [], function (a, b, c) {
	c.exports = function (a) {
		return{UI_SWITCHABLE: a || "", NAV_CLASS: a ? a + "-nav" : "", CONTENT_CLASS: a ? a + "-content" : "", TRIGGER_CLASS: a ? a + "-trigger" : "", PANEL_CLASS: a ? a + "-panel" : "", ACTIVE_CLASS: a ? a + "-active" : "", PREV_BTN_CLASS: a ? a + "-prev-btn" : "", NEXT_BTN_CLASS: a ? a + "-next-btn" : "", DISABLED_BTN_CLASS: a ? a + "-disabled-btn" : ""}
	}
});
