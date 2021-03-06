define("gallery/ztree/3.5.2/exedit", ["$"], function (a) {
	var d = a("$");
	(function (a) {
		var b = {event: {DRAG: "ztree_drag", DROP: "ztree_drop", REMOVE: "ztree_remove", RENAME: "ztree_rename"}, id: {EDIT: "_edit", INPUT: "_input", REMOVE: "_remove"}, move: {TYPE_INNER: "inner", TYPE_PREV: "prev", TYPE_NEXT: "next"}, node: {CURSELECTED_EDIT: "curSelectedNode_Edit", TMPTARGET_TREE: "tmpTargetzTree", TMPTARGET_NODE: "tmpTargetNode"}}, c = {edit: {enable: !1, editNameSelectAll: !1, showRemoveBtn: !0, showRenameBtn: !0, removeTitle: "remove", renameTitle: "rename", drag: {autoExpandTrigger: !1, isCopy: !0, isMove: !0, prev: !0, next: !0, inner: !0, minMoveSize: 5, borderMax: 10, borderMin: -5, maxShowNodeNum: 5, autoOpenTime: 500}}, view: {addHoverDom: null, removeHoverDom: null}, callback: {beforeDrag: null, beforeDragOpen: null, beforeDrop: null, beforeEditName: null, beforeRename: null, onDrag: null, onDrop: null, onRename: null}}, d = function (a) {
			var b = u.getRoot(a);
			b.curEditNode = null, b.curEditInput = null, b.curHoverNode = null, b.dragFlag = 0, b.dragNodeShowBefore = [], b.dragMaskList = new Array, b.showHoverDom = !0
		}, e = function () {
		}, f = function (a) {
			var b = a.treeObj, c = s.event;
			b.bind(c.RENAME, function (b, c, d) {
				r.apply(a.callback.onRename, [b, c, d])
			}), b.bind(c.REMOVE, function (b, c, d) {
				r.apply(a.callback.onRemove, [b, c, d])
			}), b.bind(c.DRAG, function (b, c, d, e) {
				r.apply(a.callback.onDrag, [c, d, e])
			}), b.bind(c.DROP, function (b, c, d, e, f, g, h) {
				r.apply(a.callback.onDrop, [c, d, e, f, g, h])
			})
		}, g = function (a) {
			var b = a.treeObj, c = s.event;
			b.unbind(c.RENAME), b.unbind(c.REMOVE), b.unbind(c.DRAG), b.unbind(c.DROP)
		}, h = function (a) {
			var b = a.target, c = u.getSetting(a.data.treeId), d = a.relatedTarget, e = "", f = null, g = "", h = "", i = null, j = null, k = null;
			if (r.eqs(a.type, "mouseover") ? (k = r.getMDom(c, b, [
				{tagName: "a", attrName: "treeNode" + s.id.A}
			]), k && (e = k.parentNode.id, g = "hoverOverNode")) : r.eqs(a.type, "mouseout") ? (k = r.getMDom(c, d, [
				{tagName: "a", attrName: "treeNode" + s.id.A}
			]), k || (e = "remove", g = "hoverOutNode")) : r.eqs(a.type, "mousedown") && (k = r.getMDom(c, b, [
				{tagName: "a", attrName: "treeNode" + s.id.A}
			]), k && (e = k.parentNode.id, g = "mousedownNode")), e.length > 0)switch (f = u.getNodeCache(c, e), g) {
				case"mousedownNode":
					i = m.onMousedownNode;
					break;
				case"hoverOverNode":
					i = m.onHoverOverNode;
					break;
				case"hoverOutNode":
					i = m.onHoverOutNode
			}
			var l = {stop: !1, node: f, nodeEventType: g, nodeEventCallback: i, treeEventType: h, treeEventCallback: j};
			return l
		}, i = function (a, b, c) {
			c && (c.isHover = !1, c.editNameFlag = !1)
		}, j = function (b, c) {
			c.cancelEditName = function (a) {
				var c = u.getRoot(b), d = b.data.key.name, e = c.curEditNode;
				c.curEditNode && t.cancelCurEditNode(b, a ? a : e[d])
			}, c.copyNode = function (a, c, d, e) {
				function g() {
					t.addNodes(b, a, [f], e)
				}

				if (!c)return null;
				if (a && !a.isParent && b.data.keep.leaf && d === s.move.TYPE_INNER)return null;
				var f = r.clone(c);
				return a || (a = null, d = s.move.TYPE_INNER), d == s.move.TYPE_INNER ? r.canAsync(b, a) ? t.asyncNode(b, a, e, g) : g() : (t.addNodes(b, a.parentNode, [f], e), t.moveNode(b, a, f, d, !1, e)), f
			}, c.editName = function (a) {
				a && a.tId && a === u.getNodeCache(b, a.tId) && (a.parentTId && t.expandCollapseParentNode(b, a.getParentNode(), !0), t.editNode(b, a))
			}, c.moveNode = function (c, d, e, f) {
				function g() {
					t.moveNode(b, c, d, e, !1, f)
				}

				return d ? c && !c.isParent && b.data.keep.leaf && e === s.move.TYPE_INNER ? null : c && (d.parentTId == c.tId && e == s.move.TYPE_INNER || a("#" + d.tId).find("#" + c.tId).length > 0) ? null : (c || (c = null), r.canAsync(b, c) ? t.asyncNode(b, c, f, g) : g(), d) : d
			}, c.setEditable = function (a) {
				return b.edit.enable = a, this.refresh()
			}
		}, k = {setSonNodeLevel: function (a, b, c) {
			if (c) {
				var d = a.data.key.children;
				if (c.level = b ? b.level + 1 : 0, c[d])for (var e = 0, f = c[d].length; f > e; e++)c[d][e] && u.setSonNodeLevel(a, c, c[d][e])
			}
		}}, l = {}, m = {onHoverOverNode: function (a, b) {
			var c = u.getSetting(a.data.treeId), d = u.getRoot(c);
			d.curHoverNode != b && m.onHoverOutNode(a), d.curHoverNode = b, t.addHoverDom(c, b)
		}, onHoverOutNode: function (a) {
			var c = u.getSetting(a.data.treeId), d = u.getRoot(c);
			d.curHoverNode && !u.isSelectedNode(c, d.curHoverNode) && (t.removeTreeDom(c, d.curHoverNode), d.curHoverNode = null)
		}, onMousedownNode: function (c, d) {
			function E(c) {
				if (0 == h.dragFlag && Math.abs(B - c.clientX) < g.edit.drag.minMoveSize && Math.abs(C - c.clientY) < g.edit.drag.minMoveSize)return!0;
				var d, e, f, i, j, E = g.data.key.children;
				if (a("body").css("cursor", "pointer"), 0 == h.dragFlag) {
					if (0 == r.apply(g.callback.beforeDrag, [g.treeId, k], !0))return F(c), !0;
					for (d = 0, e = k.length; e > d; d++)0 == d && (h.dragNodeShowBefore = []), f = k[d], f.isParent && f.open ? (t.expandCollapseNode(g, f, !f.open), h.dragNodeShowBefore[f.tId] = !0) : h.dragNodeShowBefore[f.tId] = !1;
					h.dragFlag = 1, h.showHoverDom = !1, r.showIfameMask(g, !0);
					var G = !0, H = -1;
					if (k.length > 1) {
						var I = k[0].parentTId ? k[0].getParentNode()[E] : u.getNodes(g);
						for (j = [], d = 0, e = I.length; e > d; d++)if (void 0 !== h.dragNodeShowBefore[I[d].tId] && (G && H > -1 && H + 1 !== d && (G = !1), j.push(I[d]), H = d), k.length === j.length) {
							k = j;
							break
						}
					}
					for (G && (v = k[0].getPreNode(), w = k[k.length - 1].getNextNode()), m = a("<ul class='zTreeDragUL'></ul>"), d = 0, e = k.length; e > d; d++)if (f = k[d], f.editNameFlag = !1, t.selectNode(g, f, d > 0), t.removeTreeDom(g, f), i = a("<li id='" + f.tId + "_tmp'></li>"), i.append(a("#" + f.tId + s.id.A).clone()), i.css("padding", "0"), i.children("#" + f.tId + s.id.A).removeClass(s.node.CURSELECTED), m.append(i), d == g.edit.drag.maxShowNodeNum - 1) {
						i = a("<li id='" + f.tId + "_moretmp'><a>  ...  </a></li>"), m.append(i);
						break
					}
					m.attr("id", k[0].tId + s.id.UL + "_tmp"), m.addClass(g.treeObj.attr("class")), m.appendTo("body"), n = a("<span class='tmpzTreeMove_arrow'></span>"), n.attr("id", "zTreeMove_arrow_tmp"), n.appendTo("body"), g.treeObj.trigger(s.event.DRAG, [c, g.treeId, k])
				}
				if (1 == h.dragFlag) {
					if (o && n.attr("id") == c.target.id && z && c.clientX + l.scrollLeft() + 2 > a("#" + z + s.id.A, o).offset().left) {
						var J = a("#" + z + s.id.A, o);
						c.target = J.length > 0 ? J.get(0) : c.target
					} else o && (o.removeClass(s.node.TMPTARGET_TREE), z && a("#" + z + s.id.A, o).removeClass(s.node.TMPTARGET_NODE + "_" + s.move.TYPE_PREV).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_NEXT).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_INNER));
					o = null, z = null, p = !1, q = g;
					var K = u.getSettings();
					for (var L in K)K[L].treeId && K[L].edit.enable && K[L].treeId != g.treeId && (c.target.id == K[L].treeId || a(c.target).parents("#" + K[L].treeId).length > 0) && (p = !0, q = K[L]);
					var M = l.scrollTop(), N = l.scrollLeft(), O = q.treeObj.offset(), P = q.treeObj.get(0).scrollHeight, Q = q.treeObj.get(0).scrollWidth, R = c.clientY + M - O.top, S = q.treeObj.height() + O.top - c.clientY - M, T = c.clientX + N - O.left, U = q.treeObj.width() + O.left - c.clientX - N, V = g.edit.drag.borderMax > R && R > g.edit.drag.borderMin, W = g.edit.drag.borderMax > S && S > g.edit.drag.borderMin, X = g.edit.drag.borderMax > T && T > g.edit.drag.borderMin, Y = g.edit.drag.borderMax > U && U > g.edit.drag.borderMin, Z = R > g.edit.drag.borderMin && S > g.edit.drag.borderMin && T > g.edit.drag.borderMin && U > g.edit.drag.borderMin, $ = V && 0 >= q.treeObj.scrollTop(), _ = W && q.treeObj.scrollTop() + q.treeObj.height() + 10 >= P, ab = X && 0 >= q.treeObj.scrollLeft(), bb = Y && q.treeObj.scrollLeft() + q.treeObj.width() + 10 >= Q;
					if (c.target.id && q.treeObj.find("#" + c.target.id).length > 0) {
						for (var cb = c.target; cb && cb.tagName && !r.eqs(cb.tagName, "li") && cb.id != q.treeId;)cb = cb.parentNode;
						var db = !0;
						for (d = 0, e = k.length; e > d; d++) {
							if (f = k[d], cb.id === f.tId) {
								db = !1;
								break
							}
							if (a("#" + f.tId).find("#" + cb.id).length > 0) {
								db = !1;
								break
							}
						}
						db && c.target.id && (c.target.id == cb.id + s.id.A || a(c.target).parents("#" + cb.id + s.id.A).length > 0) && (o = a(cb), z = cb.id)
					}
					f = k[0], Z && (c.target.id == q.treeId || a(c.target).parents("#" + q.treeId).length > 0) && (!o && (c.target.id == q.treeId || $ || _ || ab || bb) && (p || !p && f.parentTId) && (o = q.treeObj), V ? q.treeObj.scrollTop(q.treeObj.scrollTop() - 10) : W && q.treeObj.scrollTop(q.treeObj.scrollTop() + 10), X ? q.treeObj.scrollLeft(q.treeObj.scrollLeft() - 10) : Y && q.treeObj.scrollLeft(q.treeObj.scrollLeft() + 10), o && o != q.treeObj && o.offset().left < q.treeObj.offset().left && q.treeObj.scrollLeft(q.treeObj.scrollLeft() + o.offset().left - q.treeObj.offset().left)), m.css({top: c.clientY + M + 3 + "px", left: c.clientX + N + 3 + "px"});
					var eb = 0, fb = 0;
					if (o && o.attr("id") != q.treeId) {
						var gb = null == z ? null : u.getNodeCache(q, z), hb = c.ctrlKey && g.edit.drag.isMove && g.edit.drag.isCopy || !g.edit.drag.isMove && g.edit.drag.isCopy, ib = !(!v || z !== v.tId), jb = !(!w || z !== w.tId), kb = f.parentTId && f.parentTId == z, lb = (hb || !jb) && r.apply(q.edit.drag.prev, [q.treeId, k, gb], !!q.edit.drag.prev), mb = (hb || !ib) && r.apply(q.edit.drag.next, [q.treeId, k, gb], !!q.edit.drag.next), nb = !(!hb && kb || q.data.keep.leaf && !gb.isParent || !r.apply(q.edit.drag.inner, [q.treeId, k, gb], !!q.edit.drag.inner));
						if (lb || mb || nb) {
							var ob = a("#" + z + s.id.A, o), pb = gb.isLastNode ? null : a("#" + gb.getNextNode().tId + s.id.A, o.next()), qb = ob.offset().top, rb = ob.offset().left, sb = lb ? nb ? .25 : mb ? .5 : 1 : -1, tb = mb ? nb ? .75 : lb ? .5 : 0 : -1, ub = (c.clientY + M - qb) / ob.height();
							if ((1 == sb || sb >= ub && ub >= -.2) && lb ? (eb = 1 - n.width(), fb = qb - n.height() / 2, A = s.move.TYPE_PREV) : (0 == tb || ub >= tb && 1.2 >= ub) && mb ? (eb = 1 - n.width(), fb = null == pb || gb.isParent && gb.open ? qb + ob.height() - n.height() / 2 : pb.offset().top - n.height() / 2, A = s.move.TYPE_NEXT) : (eb = 5 - n.width(), fb = qb, A = s.move.TYPE_INNER), n.css({display: "block", top: fb + "px", left: rb + eb + "px"}), ob.addClass(s.node.TMPTARGET_NODE + "_" + A), (x != z || y != A) && (D = (new Date).getTime()), gb && gb.isParent && A == s.move.TYPE_INNER) {
								var vb = !0;
								window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId !== gb.tId ? (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null) : window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId === gb.tId && (vb = !1), vb && (window.zTreeMoveTimer = setTimeout(function () {
									A == s.move.TYPE_INNER && gb && gb.isParent && !gb.open && (new Date).getTime() - D > q.edit.drag.autoOpenTime && r.apply(q.callback.beforeDragOpen, [q.treeId, gb], !0) && (t.switchNode(q, gb), q.edit.drag.autoExpandTrigger && q.treeObj.trigger(s.event.EXPAND, [q.treeId, gb]))
								}, q.edit.drag.autoOpenTime + 50), window.zTreeMoveTargetNodeTId = gb.tId)
							}
						} else o = null, z = "", A = s.move.TYPE_INNER, n.css({display: "none"}), window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null)
					} else A = s.move.TYPE_INNER, o && r.apply(q.edit.drag.inner, [q.treeId, k, null], !!q.edit.drag.inner) ? o.addClass(s.node.TMPTARGET_TREE) : o = null, n.css({display: "none"}), window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null);
					x = z, y = A
				}
				return!1
			}

			function F(c) {
				function w() {
					if (p) {
						if (!i)for (var b = 0, d = k.length; d > b; b++)t.removeNode(g, k[b]);
						if (A == s.move.TYPE_INNER)t.addNodes(q, j, v); else if (t.addNodes(q, j.getParentNode(), v), A == s.move.TYPE_PREV)for (b = 0, d = v.length; d > b; b++)t.moveNode(q, j, v[b], A, !1); else for (b = -1, d = v.length - 1; d > b; d--)t.moveNode(q, j, v[d], A, !1)
					} else if (i && A == s.move.TYPE_INNER)t.addNodes(q, j, v); else if (i && t.addNodes(q, j.getParentNode(), v), A != s.move.TYPE_NEXT)for (b = 0, d = v.length; d > b; b++)t.moveNode(q, j, v[b], A, !1); else for (b = -1, d = v.length - 1; d > b; d--)t.moveNode(q, j, v[d], A, !1);
					for (b = 0, d = v.length; d > b; b++)t.selectNode(q, v[b], b > 0);
					a("#" + v[0].tId).focus().blur(), g.treeObj.trigger(s.event.DROP, [c, q.treeId, v, j, A, i])
				}

				if (window.zTreeMoveTimer && (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null), x = null, y = null, l.unbind("mousemove", E), l.unbind("mouseup", F), l.unbind("selectstart", G), a("body").css("cursor", "auto"), o && (o.removeClass(s.node.TMPTARGET_TREE), z && a("#" + z + s.id.A, o).removeClass(s.node.TMPTARGET_NODE + "_" + s.move.TYPE_PREV).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_NEXT).removeClass(s.node.TMPTARGET_NODE + "_" + b.move.TYPE_INNER)), r.showIfameMask(g, !1), h.showHoverDom = !0, 0 != h.dragFlag) {
					h.dragFlag = 0;
					var d, e, f;
					for (d = 0, e = k.length; e > d; d++)f = k[d], f.isParent && h.dragNodeShowBefore[f.tId] && !f.open && (t.expandCollapseNode(g, f, !f.open), delete h.dragNodeShowBefore[f.tId]);
					m && m.remove(), n && n.remove();
					var i = c.ctrlKey && g.edit.drag.isMove && g.edit.drag.isCopy || !g.edit.drag.isMove && g.edit.drag.isCopy;
					if (!i && o && z && k[0].parentTId && z == k[0].parentTId && A == s.move.TYPE_INNER && (o = null), o) {
						var j = null == z ? null : u.getNodeCache(q, z);
						if (0 == r.apply(g.callback.beforeDrop, [q.treeId, k, j, A, i], !0))return;
						var v = i ? r.clone(k) : k;
						A == s.move.TYPE_INNER && r.canAsync(q, j) ? t.asyncNode(q, j, !1, w) : w()
					} else {
						for (d = 0, e = k.length; e > d; d++)t.selectNode(q, k[d], d > 0);
						g.treeObj.trigger(s.event.DROP, [c, g.treeId, k, null, null, null])
					}
				}
			}

			function G() {
				return!1
			}

			var e, f, g = u.getSetting(c.data.treeId), h = u.getRoot(g);
			if (2 == c.button || !g.edit.enable || !g.edit.drag.isCopy && !g.edit.drag.isMove)return!0;
			var i = c.target, j = u.getRoot(g).curSelectedList, k = [];
			if (u.isSelectedNode(g, d))for (e = 0, f = j.length; f > e; e++) {
				if (j[e].editNameFlag && r.eqs(i.tagName, "input") && null !== i.getAttribute("treeNode" + s.id.INPUT))return!0;
				if (k.push(j[e]), k[0].parentTId !== j[e].parentTId) {
					k = [d];
					break
				}
			} else k = [d];
			t.editNodeBlur = !0, t.cancelCurEditNode(g, null, !0);
			var m, n, o, v, w, l = a(document), p = !1, q = g, x = null, y = null, z = null, A = s.move.TYPE_INNER, B = c.clientX, C = c.clientY, D = (new Date).getTime();
			return r.uCanDo(g) && l.bind("mousemove", E), l.bind("mouseup", F), l.bind("selectstart", G), c.preventDefault && c.preventDefault(), !0
		}}, n = {getAbs: function (a) {
			var b = a.getBoundingClientRect();
			return[b.left, b.top]
		}, inputFocus: function (a) {
			a.get(0) && (a.focus(), r.setCursorPosition(a.get(0), a.val().length))
		}, inputSelect: function (a) {
			a.get(0) && (a.focus(), a.select())
		}, setCursorPosition: function (a, b) {
			if (a.setSelectionRange)a.focus(), a.setSelectionRange(b, b); else if (a.createTextRange) {
				var c = a.createTextRange();
				c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", b), c.select()
			}
		}, showIfameMask: function (b, c) {
			for (var d = u.getRoot(b); d.dragMaskList.length > 0;)d.dragMaskList[0].remove(), d.dragMaskList.shift();
			if (c)for (var e = a("iframe"), f = 0, g = e.length; g > f; f++) {
				var h = e.get(f), i = r.getAbs(h), j = a("<div id='zTreeMask_" + f + "' class='zTreeMask' style='top:" + i[1] + "px; left:" + i[0] + "px; width:" + h.offsetWidth + "px; height:" + h.offsetHeight + "px;'></div>");
				j.appendTo("body"), d.dragMaskList.push(j)
			}
		}}, o = {addEditBtn: function (b, c) {
			if (!(c.editNameFlag || a("#" + c.tId + s.id.EDIT).length > 0) && r.apply(b.edit.showRenameBtn, [b.treeId, c], b.edit.showRenameBtn)) {
				var d = a("#" + c.tId + s.id.A), e = "<span class='button edit' id='" + c.tId + s.id.EDIT + "' title='" + r.apply(b.edit.renameTitle, [b.treeId, c], b.edit.renameTitle) + "' treeNode" + s.id.EDIT + " style='display:none;'></span>";
				d.append(e), a("#" + c.tId + s.id.EDIT).bind("click",function () {
					return r.uCanDo(b) && 0 != r.apply(b.callback.beforeEditName, [b.treeId, c], !0) ? (t.editNode(b, c), !1) : !1
				}).show()
			}
		}, addRemoveBtn: function (b, c) {
			if (!(c.editNameFlag || a("#" + c.tId + s.id.REMOVE).length > 0) && r.apply(b.edit.showRemoveBtn, [b.treeId, c], b.edit.showRemoveBtn)) {
				var d = a("#" + c.tId + s.id.A), e = "<span class='button remove' id='" + c.tId + s.id.REMOVE + "' title='" + r.apply(b.edit.removeTitle, [b.treeId, c], b.edit.removeTitle) + "' treeNode" + s.id.REMOVE + " style='display:none;'></span>";
				d.append(e), a("#" + c.tId + s.id.REMOVE).bind("click",function () {
					return r.uCanDo(b) && 0 != r.apply(b.callback.beforeRemove, [b.treeId, c], !0) ? (t.removeNode(b, c), b.treeObj.trigger(s.event.REMOVE, [b.treeId, c]), !1) : !1
				}).bind("mousedown",function () {
					return!0
				}).show()
			}
		}, addHoverDom: function (a, b) {
			u.getRoot(a).showHoverDom && (b.isHover = !0, a.edit.enable && (t.addEditBtn(a, b), t.addRemoveBtn(a, b)), r.apply(a.view.addHoverDom, [a.treeId, b]))
		}, cancelCurEditNode: function (b, c) {
			var d = u.getRoot(b), e = b.data.key.name, f = d.curEditNode;
			if (f) {
				var g = d.curEditInput, h = c ? c : g.val();
				if (!c && r.apply(b.callback.beforeRename, [b.treeId, f, h], !0) === !1)return!1;
				f[e] = h ? h : g.val(), c || b.treeObj.trigger(s.event.RENAME, [b.treeId, f]);
				var i = a("#" + f.tId + s.id.A);
				i.removeClass(s.node.CURSELECTED_EDIT), g.unbind(), t.setNodeName(b, f), f.editNameFlag = !1, d.curEditNode = null, d.curEditInput = null, t.selectNode(b, f, !1)
			}
			return d.noSelection = !0, !0
		}, editNode: function (b, c) {
			var d = u.getRoot(b);
			if (t.editNodeBlur = !1, u.isSelectedNode(b, c) && d.curEditNode == c && c.editNameFlag)return setTimeout(function () {
				r.inputFocus(d.curEditInput)
			}, 0), void 0;
			var e = b.data.key.name;
			c.editNameFlag = !0, t.removeTreeDom(b, c), t.cancelCurEditNode(b), t.selectNode(b, c, !1), a("#" + c.tId + s.id.SPAN).html("<input type=text class='rename' id='" + c.tId + s.id.INPUT + "' treeNode" + s.id.INPUT + " >");
			var f = a("#" + c.tId + s.id.INPUT);
			f.attr("value", c[e]), b.edit.editNameSelectAll ? r.inputSelect(f) : r.inputFocus(f), f.bind("blur",function () {
				t.editNodeBlur || t.cancelCurEditNode(b)
			}).bind("keydown",function (a) {
				"13" == a.keyCode ? (t.editNodeBlur = !0, t.cancelCurEditNode(b, null, !0)) : "27" == a.keyCode && t.cancelCurEditNode(b, c[e])
			}).bind("click",function () {
				return!1
			}).bind("dblclick", function () {
				return!1
			}), a("#" + c.tId + s.id.A).addClass(s.node.CURSELECTED_EDIT), d.curEditInput = f, d.noSelection = !1, d.curEditNode = c
		}, moveNode: function (b, c, d, e, f, g) {
			var h = u.getRoot(b), i = b.data.key.children;
			if (c != d && (!b.data.keep.leaf || !c || c.isParent || e != s.move.TYPE_INNER)) {
				var j = d.parentTId ? d.getParentNode() : h, k = null === c || c == h;
				k && null === c && (c = h), k && (e = s.move.TYPE_INNER);
				var l = c.parentTId ? c.getParentNode() : h;
				e != s.move.TYPE_PREV && e != s.move.TYPE_NEXT && (e = s.move.TYPE_INNER), e == s.move.TYPE_INNER && (k ? d.parentTId = null : (c.isParent || (c.isParent = !0, c.open = !!c.open, t.setNodeLineIcos(b, c)), d.parentTId = c.tId));
				var m, n;
				if (k)m = b.treeObj, n = m; else {
					if (g || e != s.move.TYPE_INNER ? g || t.expandCollapseNode(b, c.getParentNode(), !0, !1) : t.expandCollapseNode(b, c, !0, !1), m = a("#" + c.tId), n = a("#" + c.tId + s.id.UL), m.get(0) && !n.get(0)) {
						var o = [];
						t.makeUlHtml(b, c, o, ""), m.append(o.join(""))
					}
					n = a("#" + c.tId + s.id.UL)
				}
				var p = a("#" + d.tId);
				p.get(0) ? m.get(0) || p.remove() : p = t.appendNodes(b, d.level, [d], null, !1, !0).join(""), n.get(0) && e == s.move.TYPE_INNER ? n.append(p) : m.get(0) && e == s.move.TYPE_PREV ? m.before(p) : m.get(0) && e == s.move.TYPE_NEXT && m.after(p);
				var q, r, v = -1, w = 0, x = null, y = null, z = d.level;
				if (d.isFirstNode)v = 0, j[i].length > 1 && (x = j[i][1], x.isFirstNode = !0); else if (d.isLastNode)v = j[i].length - 1, x = j[i][v - 1], x.isLastNode = !0; else for (q = 0, r = j[i].length; r > q; q++)if (j[i][q].tId == d.tId) {
					v = q;
					break
				}
				if (v >= 0 && j[i].splice(v, 1), e != s.move.TYPE_INNER)for (q = 0, r = l[i].length; r > q; q++)l[i][q].tId == c.tId && (w = q);
				if (e == s.move.TYPE_INNER ? (c[i] || (c[i] = new Array), c[i].length > 0 && (y = c[i][c[i].length - 1], y.isLastNode = !1), c[i].splice(c[i].length, 0, d), d.isLastNode = !0, d.isFirstNode = 1 == c[i].length) : c.isFirstNode && e == s.move.TYPE_PREV ? (l[i].splice(w, 0, d), y = c, y.isFirstNode = !1, d.parentTId = c.parentTId, d.isFirstNode = !0, d.isLastNode = !1) : c.isLastNode && e == s.move.TYPE_NEXT ? (l[i].splice(w + 1, 0, d), y = c, y.isLastNode = !1, d.parentTId = c.parentTId, d.isFirstNode = !1, d.isLastNode = !0) : (e == s.move.TYPE_PREV ? l[i].splice(w, 0, d) : l[i].splice(w + 1, 0, d), d.parentTId = c.parentTId, d.isFirstNode = !1, d.isLastNode = !1), u.fixPIdKeyValue(b, d), u.setSonNodeLevel(b, d.getParentNode(), d), t.setNodeLineIcos(b, d), t.repairNodeLevelClass(b, d, z), !b.data.keep.parent && 1 > j[i].length) {
					j.isParent = !1, j.open = !1;
					var A = a("#" + j.tId + s.id.UL), B = a("#" + j.tId + s.id.SWITCH), C = a("#" + j.tId + s.id.ICON);
					t.replaceSwitchClass(j, B, s.folder.DOCU), t.replaceIcoClass(j, C, s.folder.DOCU), A.css("display", "none")
				} else x && t.setNodeLineIcos(b, x);
				y && t.setNodeLineIcos(b, y), b.check && b.check.enable && t.repairChkClass && (t.repairChkClass(b, j), t.repairParentChkClassWithSelf(b, j), j != d.parent && t.repairParentChkClassWithSelf(b, d)), g || t.expandCollapseParentNode(b, d.getParentNode(), !0, f)
			}
		}, removeEditBtn: function (b) {
			a("#" + b.tId + s.id.EDIT).unbind().remove()
		}, removeRemoveBtn: function (b) {
			a("#" + b.tId + s.id.REMOVE).unbind().remove()
		}, removeTreeDom: function (a, b) {
			b.isHover = !1, t.removeEditBtn(b), t.removeRemoveBtn(b), r.apply(a.view.removeHoverDom, [a.treeId, b])
		}, repairNodeLevelClass: function (b, c, d) {
			if (d !== c.level) {
				var e = a("#" + c.tId), f = a("#" + c.tId + s.id.A), g = a("#" + c.tId + s.id.UL), h = "level" + d, i = "level" + c.level;
				e.removeClass(h), e.addClass(i), f.removeClass(h), f.addClass(i), g.removeClass(h), g.addClass(i)
			}
		}}, p = {tools: n, view: o, event: l, data: k};
		a.extend(!0, a.fn.zTree.consts, b), a.extend(!0, a.fn.zTree._z, p);
		var q = a.fn.zTree, r = q._z.tools, s = q.consts, t = q._z.view, u = q._z.data;
		q._z.event, u.exSetting(c), u.addInitBind(f), u.addInitUnBind(g), u.addInitCache(e), u.addInitNode(i), u.addInitProxy(h), u.addInitRoot(d), u.addZTreeTools(j);
		var w = t.cancelPreSelectedNode;
		t.cancelPreSelectedNode = function (a, b) {
			for (var c = u.getRoot(a).curSelectedList, d = 0, e = c.length; e > d && (b && b !== c[d] || (t.removeTreeDom(a, c[d]), !b)); d++);
			w && w.apply(t, arguments)
		};
		var x = t.createNodes;
		t.createNodes = function (a, b, c, d) {
			x && x.apply(t, arguments), c && t.repairParentChkClassWithSelf && t.repairParentChkClassWithSelf(a, d)
		};
		var y = t.makeNodeUrl;
		t.makeNodeUrl = function (a) {
			return a.edit.enable ? null : y.apply(t, arguments)
		};
		var z = t.removeNode;
		t.removeNode = function (a, b) {
			var c = u.getRoot(a);
			c.curEditNode === b && (c.curEditNode = null), z && z.apply(t, arguments)
		};
		var A = t.selectNode;
		t.selectNode = function (a, b) {
			var d = u.getRoot(a);
			return u.isSelectedNode(a, b) && d.curEditNode == b && b.editNameFlag ? !1 : (A && A.apply(t, arguments), t.addHoverDom(a, b), !0)
		};
		var B = r.uCanDo;
		r.uCanDo = function (a, b) {
			var c = u.getRoot(a);
			return b && (r.eqs(b.type, "mouseover") || r.eqs(b.type, "mouseout") || r.eqs(b.type, "mousedown") || r.eqs(b.type, "mouseup")) ? !0 : !c.curEditNode && (B ? B.apply(t, arguments) : !0)
		}
	})(d)
});