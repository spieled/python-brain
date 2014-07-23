define("arale/placeholder/1.0.1/placeholder", ["$"], function (e, t, a) {
	var l, r = e("$"), n = function (e) {
		function t(t) {
			var a = {}, l = /^jQuery\d+$/;
			return e.each(t.attributes, function (e, t) {
				t.specified && !l.test(t.name) && (a[t.name] = t.value)
			}), a
		}

		function a(t, a) {
			var l = this, r = e(l);
			if ((l.value == r.attr("placeholder") || "" == l.value) && r.hasClass("placeholder"))if (r.data("placeholder-password")) {
				if (r = r.hide().next().show().attr("id", r.removeAttr("id").data("placeholder-id")), t === !0)return r[0].value = a;
				r.focus()
			} else l.value = "", r.removeClass("placeholder"), l == document.activeElement && l.select()
		}

		function l() {
			var l, r = this, n = e(r), o = this.id;
			if ("" == e(r).val()) {
				if ("password" == r.type) {
					if (!n.data("placeholder-textinput")) {
						try {
							l = n.clone().attr({type: "text"})
						} catch (i) {
							l = e("<input>").attr(e.extend(t(this), {type: "text"}))
						}
						l.removeAttr("name").data({"placeholder-password": !0, "placeholder-id": o}).bind("focus.placeholder", a), n.data({"placeholder-textinput": l, "placeholder-id": o}).before(l)
					}
					n = n.removeAttr("id").hide().prev().attr("id", o).show()
				}
				n.addClass("placeholder"), n[0].value = n.attr("placeholder")
			} else n.removeClass("placeholder")
		}

		var r, n, o = "placeholder"in document.createElement("input"), i = "placeholder"in document.createElement("textarea"), c = {}, u = e.valHooks;
		if (o && i)n = c.placeholder = function () {
			return this
		}, n.input = n.textarea = !0; else {
			if (n = c.placeholder = function () {
				var e = this;
				return e.filter((o ? "textarea" : ":input") + "[placeholder]").unbind({"focus.placeholder": a, "blur.placeholder": l}).bind({"focus.placeholder": a, "blur.placeholder": l}).data("placeholder-enabled", !0).trigger("blur.placeholder"), e
			}, n.input = o, n.textarea = i, r = {get: function (t) {
				var a = e(t);
				return a.data("placeholder-enabled") && a.hasClass("placeholder") ? "" : t.value
			}, set: function (t, r) {
				var n = e(t);
				return n.data("placeholder-enabled") ? ("" == r ? (t.value = r, t != document.activeElement && l.call(t)) : n.hasClass("placeholder") ? a.call(t, !0, r) || (t.value = r) : t.value = r, n) : t.value = r
			}}, !o) {
				var d = u.input;
				u.input = d ? {get: function () {
					return d.get && d.get.apply(this, arguments), r.get.apply(this, arguments)
				}, set: function () {
					return d.set && d.set.apply(this, arguments), r.set.apply(this, arguments)
				}} : r
			}
			if (!i) {
				var d = u.textarea;
				u.textarea = d ? {get: function () {
					return d.get && d.get.apply(this, arguments), r.get.apply(this, arguments)
				}, set: function () {
					return d.set && d.set.apply(this, arguments), r.set.apply(this, arguments)
				}} : r
			}
			e(function () {
				e(document).delegate("form", "submit.placeholder", function () {
					var t = e(".placeholder", this).each(a);
					setTimeout(function () {
						t.each(l)
					}, 10)
				})
			}), e(window).bind("beforeunload.placeholder", function () {
				e(".placeholder").each(function () {
					this.value = ""
				})
			})
		}
		return n
	}(r);
	l = n.input && n.textarea ? function () {
	} : function (e) {
		e || (e = r("input, textarea")), e && n.call(r(e))
	}, l(), a.exports = l
});
