define("arale/class/1.0.0/class", [], function (e, t, n) {
	function r(e) {
		if (!(this instanceof r) && c(e))return s(e)
	}

	function i(e) {
		var t, n;
		for (t in e)n = e[t], r.Mutators.hasOwnProperty(t) ? r.Mutators[t].call(this, n) : this.prototype[t] = n
	}

	function s(e) {
		return e.extend = r.extend, e.implement = i, e
	}

	function o() {
	}

	function a(e, t, n) {
		for (var r in t)if (t.hasOwnProperty(r)) {
			if (n && h(n, r) === -1)continue;
			r !== "prototype" && (e[r] = t[r])
		}
	}

	function d(e) {
		if (!p)return;
		var t = p();
		if (!t)return;
		var n = t.uri.split(/[\/\\]/).pop();
		Object.defineProperties ? Object.defineProperties(e, {__module: {value: t}, __filename: {value: n}}) : (e.__module = t, e.__filename = n)
	}

	n.exports = r, r.create = function (e, t) {
		function n() {
			e.apply(this, arguments), this.constructor === n && this.initialize && this.initialize.apply(this, arguments)
		}

		return c(e) || (t = e, e = null), t || (t = {}), e || (e = t.Extends || r), t.Extends = e, e !== r && a(n, e, e.StaticsWhiteList), i.call(n, t), s(n)
	}, r.extend = function (e) {
		return e || (e = {}), e.Extends = this, r.create(e)
	}, r.Mutators = {Extends: function (e) {
		var t = this.prototype, n = u(e.prototype);
		a(n, t), n.constructor = this, this.prototype = n, this.superclass = e.prototype, d(n)
	}, Implements: function (e) {
		l(e) || (e = [e]);
		var t = this.prototype, n;
		while (n = e.shift())a(t, n.prototype || n)
	}, Statics: function (e) {
		a(this, e)
	}};
	var u = Object.__proto__ ? function (e) {
		return{__proto__: e}
	} : function (e) {
		return o.prototype = e, new o
	}, f = Object.prototype.toString, l = Array.isArray;
	l || (l = function (e) {
		return f.call(e) === "[object Array]"
	});
	var c = function (e) {
		return f.call(e) === "[object Function]"
	}, h = Array.prototype.indexOf ? function (e, t) {
		return e.indexOf(t)
	} : function (e, t) {
		for (var n = 0, r = e.length; n < r; n++)if (e[n] === t)return n;
		return-1
	}, p = n.constructor._getCompilingModule
});
