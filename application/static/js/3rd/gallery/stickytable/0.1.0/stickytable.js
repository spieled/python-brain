define('gallery/stickytable/0.1.0/stickytable', ["$", "sticky"], function (require, exports, module) {

	var $ = require("$");
	var sticky = require("sticky");

	module.exports = stickytable;

	var table, thead, ths, tds;

	function stickytable(elem, marginTop, callback) {

		// 得到表头
		thead = $(elem);

		// 得到表格
		table = thead.parent();

		// 取到所有的表头列，下面会针对跨列的要做特殊处理（跳过该th）。
		ths = $(elem + " th");

		// 取到表格的第一行各列
		tds = $(elem).next().children("tr :first").children("td");

		// 表表头和表格弄成固定宽度，不再跟随浏览器大小自动调整布局。
		thead.width(thead.width() + 2);
		table.width(table.width() + 2);

		// 先把第一行的高度向上同步给表头，确保滚动上去时表头不会缩到一起，保持原有宽度。
		var k = 0;
		for (var i = 0, j = ths.length; i < j; i++) {
			var th = $(ths[i]);
			if (!th.attr('colspan')) {
				th.attr('width', $(tds[k++]).width() + 1);
			}
		}

		// 又把表头的宽度向下同步给第一行，确保滚动上去时表格不会缩到一起，保持原有宽度。
		k = 0;
		for (var i = 0, j = ths.length; i < j; i++) {
			var th = $(ths[i]);
			if (!th.attr('colspan')) {
				$(tds[k++]).attr('width', th.width() + 1);
			}
		}

		// 准备回调函数
		var st = this;
		st.callback = callback || function () {
		};

		// 将自己返回出去
		return sticky(elem, marginTop, function (status) {
			st.callback.call(st, status);
		});

	};

});