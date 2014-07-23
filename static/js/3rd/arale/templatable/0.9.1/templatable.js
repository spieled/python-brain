define("arale/templatable/0.9.1/templatable", ["$", "gallery/handlebars/1.0.2/handlebars"], function (a, b, c) {
	function d(a) {
		return h(a) ? null : i(f(a))
	}

	function e(a, b) {
		if (a) {
			var c = a.find(b);
			if (0 === c.length)throw new Error("Invalid template selector: " + b);
			return g(c.html())
		}
	}

	function f(a) {
		return a.replace(/({[^}]+}})/g, "<!--$1-->").replace(/\s(src|href)\s*=\s*(['"])(.*?\{.+?)\2/g, " data-templatable-$1=$2$3$2")
	}

	function g(a) {
		return a.replace(/(?:<|&lt;)!--({{[^}]+}})--(?:>|&gt;)/g, "$1").replace(/data-templatable-/gi, "")
	}

	function h(a) {
		return"function" == typeof a
	}

	var i = a("$"), j = a("gallery/handlebars/1.0.2/handlebars"), k = {};
	c.exports = {templateHelpers: null, templateObject: null, parseElementFromTemplate: function () {
		var a, b = this.get("template");
		/^#/.test(b) && (a = document.getElementById(b.substring(1))) && (b = a.innerHTML, this.set("template", b)), this.templateObject = d(b), this.element = i(this.compile())
	}, compile: function (a, b) {
		if (a || (a = this.get("template")), b || (b = this.get("model")), b.toJSON && (b = b.toJSON()), h(a))return a(b, {helpers: this.templateHelpers});
		var c = this.templateHelpers;
		if (c)for (var d in c)c.hasOwnProperty(d) && j.registerHelper(d, c[d]);
		var e = k[a];
		e || (e = k[a] = j.compile(a));
		var f = e(b);
		if (c)for (d in c)c.hasOwnProperty(d) && delete j.helpers[d];
		return f
	}, renderPartial: function (a) {
		if (this.templateObject) {
			var b = e(this.templateObject, a);
			b ? this.$(a).html(this.compile(b)) : this.element.html(this.compile())
		} else {
			var c = i(this.compile()), d = c.find(a);
			d.length ? this.$(a).html(d.html()) : this.element.html(c.html())
		}
		return this
	}};
	var l = j.compile;
	j.compile = function (a) {
		return h(a) ? a : l.call(j, a)
	}
});
