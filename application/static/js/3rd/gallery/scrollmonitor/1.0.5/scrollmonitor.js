define("gallery/scrollmonitor/1.0.5/scrollmonitor", ["jquery"], function (t, i, o) {
	(function (i) {
		if ("undefined" != typeof define && define.amd)define(["jquery"], i); else if (o !== void 0 && o.exports) {
			var e = t("jquery");
			o.exports = i(e)
		} else window.scrollMonitor = i(jQuery)
	})(function (t) {
		function i() {
			if (l.viewportTop = n.scrollTop(), l.viewportBottom = l.viewportTop + l.viewportHeight, l.documentHeight = r.height(), l.documentHeight !== g) {
				for (k = a.length; k--;)a[k].recalculateLocation();
				g = l.documentHeight
			}
		}

		function o() {
			l.viewportHeight = n.height(), i(), s()
		}

		function e() {
			clearTimeout(y), y = setTimeout(o, 100)
		}

		function s() {
			for (B = a.length; B--;)a[B].update();
			for (B = a.length; B--;)a[B].triggerCallbacks()
		}

		function h(i, o) {
			function e(t) {
				if (0 !== t.length)for (k = t.length; k--;)y = t[k], y.callback.call(s, I), y.isOne && t.splice(k, 1)
			}

			var s = this;
			this.watchItem = i, this.offsets = o ? o === +o ? {top: o, bottom: o} : t.extend({}, V, o) : V, this.callbacks = {};
			for (var h = 0, c = d.length; c > h; h++)s.callbacks[d[h]] = [];
			this.locked = !1;
			var n, r, a, g, k, y;
			this.triggerCallbacks = function () {
				switch (this.isInViewport && !n && e(this.callbacks[w]), this.isFullyInViewport && !r && e(this.callbacks[f]), this.isAboveViewport !== a && this.isBelowViewport !== g && (e(this.callbacks[p]), r || this.isFullyInViewport || (e(this.callbacks[f]), e(this.callbacks[b])), n || this.isInViewport || (e(this.callbacks[w]), e(this.callbacks[u]))), !this.isFullyInViewport && r && e(this.callbacks[b]), !this.isInViewport && n && e(this.callbacks[u]), this.isInViewport !== n && e(this.callbacks[p]), !0) {
					case n !== this.isInViewport:
					case r !== this.isFullyInViewport:
					case a !== this.isAboveViewport:
					case g !== this.isBelowViewport:
						e(this.callbacks[v])
				}
				n = this.isInViewport, r = this.isFullyInViewport, a = this.isAboveViewport, g = this.isBelowViewport
			}, this.recalculateLocation = function () {
				if (!this.locked) {
					var i = this.top, o = this.bottom;
					if (this.watchItem.nodeName) {
						var s = this.watchItem.style.display;
						"none" === s && (this.watchItem.style.display = "");
						var h = t(this.watchItem).offset();
						this.top = h.top, this.bottom = h.top + this.watchItem.offsetHeight, "none" === s && (this.watchItem.style.display = s)
					} else this.watchItem === +this.watchItem ? this.top = this.bottom = this.watchItem > 0 ? this.watchItem : l.documentHeight - this.watchItem : (this.top = this.watchItem.top, this.bottom = this.watchItem.bottom);
					this.top -= this.offsets.top, this.bottom += this.offsets.bottom, this.height = this.bottom - this.top, void 0 === i && void 0 === o || this.top === i && this.bottom === o || e(this.callbacks[m])
				}
			}, this.recalculateLocation(), this.update(), n = this.isInViewport, r = this.isFullyInViewport, a = this.isAboveViewport, g = this.isBelowViewport
		}

		function c(t) {
			I = t, i(), s()
		}

		var l = {}, n = t(window), r = t(document), a = [], p = "visibilityChange", w = "enterViewport", f = "fullyEnterViewport", u = "exitViewport", b = "partiallyExitViewport", m = "locationChange", v = "stateChange", d = [p, w, f, u, b, m, v], V = {top: 0, bottom: 0};
		l.viewportTop, l.viewportBottom, l.documentHeight, l.viewportHeight = n.height();
		var g, I, k, y, B;
		h.prototype = {on: function (t, i, o) {
			switch (!0) {
				case t === p && !this.isInViewport && this.isAboveViewport:
				case t === w && this.isInViewport:
				case t === f && this.isFullyInViewport:
				case t === u && this.isAboveViewport && !this.isInViewport:
				case t === b && this.isAboveViewport:
					if (i(), o)return
			}
			if (!this.callbacks[t])throw Error("Tried to add a scroll monitor listener of type " + t + ". Your options are: " + d.join(", "));
			this.callbacks[t].push({callback: i, isOne: o})
		}, off: function (t, i) {
			if (!this.callbacks[t])throw Error("Tried to remove a scroll monitor listener of type " + t + ". Your options are: " + d.join(", "));
			for (var o, e = 0; o = this.callbacks[t][e]; e++)if (o.callback === i) {
				this.callbacks[t].splice(e, 1);
				break
			}
		}, one: function (t, i) {
			this.on(t, i, !0)
		}, recalculateSize: function () {
			this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom, this.bottom = this.top + this.height
		}, update: function () {
			this.isAboveViewport = this.top < l.viewportTop, this.isBelowViewport = this.bottom > l.viewportBottom, this.isInViewport = this.top <= l.viewportBottom && this.bottom >= l.viewportTop, this.isFullyInViewport = this.top >= l.viewportTop && this.bottom <= l.viewportBottom || this.isAboveViewport && this.isBelowViewport
		}, destroy: function () {
			var t = a.indexOf(this), i = this;
			a.splice(t, 1);
			for (var o = 0, e = d.length; e > o; o++)i.callbacks[d[o]].length = 0
		}, lock: function () {
			this.locked = !0
		}, unlock: function () {
			this.locked = !1
		}};
		for (var H = function (t) {
			return function (i, o) {
				this.on.call(this, t, i, o)
			}
		}, T = 0, A = d.length; A > T; T++) {
			var F = d[T];
			h.prototype[F] = H(F)
		}
		return i(), n.on("scroll", c), n.on("resize", e), l.beget = l.create = function (i, o) {
			"string" == typeof i && (i = t(i)[0]), i instanceof t && (i = i[0]);
			var e = new h(i, o);
			return a.push(e), e.update(), e
		}, l.update = function () {
			I = null, i(), s()
		}, l.recalculateLocations = function () {
			l.documentHeight = 0, l.update()
		}, l
	})
});