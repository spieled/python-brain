define(function (require, exports, module) {
	var $ = require('jquery');
	var Select = require('select');
	var Calendar = require('calendar');
	var Moment = require('moment');

	/* ========================收银台工具======================= */

	

	/** 乘的方法 */
	exports.accMul = function (arg1, arg2) {
		var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		} catch (e) {
		}
		try {
			m += s2.split(".")[1].length;
		} catch (e) {
		}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
			/ Math.pow(10, m);
	};
	/** 加法函数 */
	exports.accAdd = function (arg1, arg2) {
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		return (arg1 * m + arg2 * m) / m;
	};
	/** 减法函数 */
	exports.Subtr = function (arg1, arg2) {
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2));
		n = (r1 >= r2) ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(n);
	};
	/** 除法函数 */
	exports.accDiv = function (arg1, arg2) {
		var t1 = 0, t2 = 0, r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length;
		} catch (e) {
		}
		try {
			t2 = arg2.toString().split(".")[1].length;
		} catch (e) {
		}
		with (Math) {
			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			return (r1 / r2) * pow(10, t2 - t1);
		}
	};

	/** 弹出服务项目,弹出员工 */
	exports.publicdialog = function (node, contentId, callback) {
		var node = $(node);
		var offset = node.offset();
		var top = parseInt(offset.top) + parseInt(node.css('height'))
			+ parseInt(5);
		callback = callback || function () {
		};
		$('#' + contentId).find("a").unbind("click");
		$("#" + contentId).find("a").click(function () {
			callback(this);
		});
		$('#' + contentId).offset({
			top: top,
			left: offset.left
		}).css({
				position: 'absolute',
				zIndex: 100
			}).attr('ontargetId', node.attr("id")).show();
	};

	/** service or product → input焦点事件 */
	exports.bindInputFocus = function (tagId, listViewId, callback) {
		$("#" + tagId).on("focusin",function () {
			exports.publicdialog(this, listViewId, callback);
		}).on("focusout", function () {
				var _this = this;
				var numb = $(this).val();
				setTimeout(function () {
					$("#" + listViewId).offset({
						top: 0,
						left: 0
					}).hide();
				}, 200);
			});
	};
	
	exports.bindWareInputFocus = function (tagId, listViewIdSuffix, callback) {
		var prefix;
		$("#" + tagId).on("focusin",function () {
			prefix = $(this).parent().parent().find("input[name='wareType']").val();
			console.log("#" + prefix + listViewIdSuffix);
			exports.publicdialog(this, prefix + listViewIdSuffix, callback);
		}).on("focusout", function () {
				var _this = this;
				var numb = $(this).val();
				
				setTimeout(function () {
					console.log("#" + prefix + listViewIdSuffix);
					$("#" + prefix + listViewIdSuffix).offset({
						top: 0,
						left: 0
					}).hide();
				}, 200);
			});
	};

});