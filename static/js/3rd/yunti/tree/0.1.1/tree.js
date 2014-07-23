//============================================
//============================================
// 使用说明及示例代码
// 配置参数中：
// tree等同于ztree的完整配置，
// nodes是初始化的ztree节点信息，
// 如果tree中没有配置url参数则trigger表现为arale的Select组件一样的只读下拉选择的样式
// 组件支持的事件有：render show hide load
// 组件支持的方法有：setValue(id,label) getZtree
// 可以通过定义.ui-tree-trigger来覆盖trigger的默认样式
// 可以通过定义.ui-tree-element来覆盖下来树的默认样式
//
//var tree = new Tree({
//    trigger: "#districtCode_${formId}",
//    delay: 500,
//    tree: {
//        view: {
//            dblClickExpand: false
//        },
//        url: "${baseurl}/config/catalog/getArsTree.htm",
//        callback: {
//            onClick: function (e, treeId, treeNode) {
//                if (!treeNode.isParent) {
//                    tree.setValue(treeNode.code, treeNode.fullName);
//                } else {
//                    tree.getZtree().expandNode(treeNode);
//                }
//            }
//        }
//    },
//    nodes: [
//        {"code": 510101, "fullName": "四川省 成都市 市辖区", "id": "c1dc8f1d80fe", "name": "市辖区"},
//        {"code": 510104, "fullName": "四川省 成都市 锦江区", "id": "3f7887fe78c4", "name": "锦江区"}
//    ]
//}).on('load', function (json) {
//        if (json.length == 1) {
//            json = json[0];
//            if (!json.isParent) {
//                tree.setValue(json.code, json.fullName);
//            }
//        }
//    });
//=========================================================
//=========================================================


define("yunti/tree/0.1.1/tree", ['arale/overlay/1.1.1/overlay', '$', 'arale/position/1.0.1/position', 'arale/iframe-shim/1.0.2/iframe-shim', 'arale/widget/1.1.1/widget', 'arale/base/1.1.1/base', 'arale/class/1.1.0/class', 'arale/events/1.1.0/events', 'arale/templatable/0.9.1/templatable', 'gallery/handlebars/1.0.2/handlebars', 'gallery/jsuri/1.2.2/jsuri', 'gallery/ztree/3.5.14/ztree' , 'gallery/jquery.loadmask/0.4.0/jquery.loadmask', 'arale/select/0.9.7/select.css', './tree.css'], function (require, exports, module) {
    var Overlay = require("arale/overlay/1.1.1/overlay");
    var $ = require("$")
    var Uri = require('gallery/jsuri/1.2.2/jsuri');
    var Templatable = require("arale/templatable/0.9.1/templatable");

    require("gallery/jquery.artdialog/5.0.5/jquery.artdialog");
    require("gallery/ztree/3.5.14/ztree");
    require("gallery/jquery.loadmask/0.4.0/jquery.loadmask");


    // 这些KeyCode都是不能响应事件的
    var KEY = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ENTER: 13,
        ESC: 27,
        BACKSPACE: 8,
        TAB: 9,
        SHIFT: 16
    };

    var Tree = Overlay.extend({
        attrs: {
            trigger: {
                value: null,
                getter: function (val) {
                    return $(val).eq(0);
                }
            },
            align: {
                baseXY: [0, "100%-1px"]
            },
            autoLoad: false,
            loaded: false,
            autoHide: true,
            syncWidth: true,
            classPrefix: 'ui-tree',
            minLength: 2,
            delay: 800,
            tree: {}
        },

        initAttrs: function (config, dataAttrsConfig) {

            // 先自己构造ztree的容器，并用Widget生成的cid作为容器的id前缀，确保不会重复，如果不在容器上设置id则当页面内同时有多个ztree时节点就无法选择了
            var el = $('<div class="ui-tree-element fn-hide"><div class="fn-right"><a href="javascript:;" id="' + this.cid + '_expandBtn">开</a><a href="javascript:;" id="' + this.cid + '_collapseBtn" class="ml5">关</a><a href="javascript:;" id="' + this.cid + '_clearBtn" class="ml5 mr5">清</a></div><div id="' + this.cid + '-ztree" class="ztree"></div></div>');
            $(document.body).append(el);
            this.set("element", el);


            // 要在设置了element之后再执行父类的initAttrs方法，否则会因为缺少element而去找template，就会抛出JS的异常了。
            Tree.superclass.initAttrs.call(this, config, dataAttrsConfig);

            // 取出树的配置，如果没有配置或没有配置url，则不允许编辑，就使用ui-select组件的样式的下拉框
            var tree = this.get("tree");
            if (typeof(this.get("editable")) == "undefined") {
                this.set("editable", tree && tree.url);
            }
            var editable = this.get("editable");


            // 隐藏原有的trigger，根据是否可编辑呈现新的trigger
            var trigger = this.get("trigger"), triggerClassName = this.getClassName(this.get("classPrefix"), "trigger");
            trigger.addClass(triggerClassName);
            this.set("oldTrigger", trigger);
            var triggerTpl = this.get("triggerTpl");
            if (!triggerTpl) {
                if (editable) {
                    triggerTpl = trigger.clone().removeAttr('name').removeAttr('id').attr('name', trigger.attr("visibleName")).attr('value', trigger.attr("visibleValue"));
                } else {
                    triggerTpl = '<a href="#" class="ui-select-trigger" style="width: 188px;"><span data-role="trigger-content">请选择</span><i class="iconfont" title="请选择">&#xF03C;</i></a>';
                }
            }
            var newTrigger = $(triggerTpl).addClass(triggerClassName);
            this.set("trigger", newTrigger);
            trigger.after(newTrigger).css({
                position: "absolute",
                left: "-99999px",
                zIndex: -100,
                display: "none"
            });

            // 最后，初始化ztree
            var ztree = $.fn.zTree.init(el.find('DIV[class=ztree]'), tree, this.get("nodes"));
            this.set("ztree", ztree);

            var that = this;

            // 实现按钮的响应
            $("#" + this.cid + "_expandBtn").click(function () {
                ztree.expandAll(true);
            });
            $("#" + this.cid + "_collapseBtn").click(function () {
                ztree.expandAll(false);
            });
            $("#" + this.cid + "_clearBtn").click(function () {
                that.setValue("", "");
            });

        },

        getClassName: function (classPrefix, className) {
            if (!classPrefix) return "";
            return classPrefix + "-" + className;
        },

        setup: function () {
            this._bindEvents();
            this._tweakAlignDefaultValue();
            this._blurHide([$(this.get("trigger"))]);
            Tree.superclass.setup.call(this);
        },

        render: function () {
            Tree.superclass.render.call(this);
            this._syncTriggerWidth();
            this._setElementWidth();
            this.trigger("render", this);
            return this;
        },

        destroy: function () {
            this.element.remove();
            Tree.superclass.destroy.call(this);
        },

        hide: function () {
            if (!this._setted) {
                this.get("trigger").attr('value', this._label);
                this.get("oldTrigger").attr("value", this._value);
            }
            Tree.superclass.hide.call(this);
            this.trigger("hide", this);
            return this;
        },

        show: function () {
            Tree.superclass.show.call(this);
            this.element.css('z-index', getMaxZIndex() + 1);
            if ((this.get("editable") == false || this.get("autoLoad") == true) && this.get("tree").url && !this.get("loaded")) {
                this.set("loaded", true);
                var that = this;
                setTimeout(function () {
                    that._fetchData.call(that);
                }, 300);
            }
            this.trigger("show", this);
            return this;
        },

        /**
         * 赋值
         * @param value
         * @param label
         * @returns {Tree}
         */
        setValue: function (value, label) {

            this._setted = true;

            this._value = value;
            this._label = label;

            this.get("oldTrigger").attr("value", this._value).attr("displayValue", this._label);
            if (this.get("editable")) {
                this.get("trigger").attr("value", this._label);
            } else {
                var trigger = this.get("trigger");
                var triggerContent = trigger.find("[data-role=trigger-content]");
                if (triggerContent.length) {
                    triggerContent.html(label);
                } else {
                    trigger.html(label);
                }
            }

            // 设置了自动关闭，设置值之后就立即隐藏
            if (this.get("autoHide")) {
                this.hide();
            }

            this.trigger("change", value, label);

            return this;
        },

        /**
         * 清空树
         */
        clear: function () {
            var tree = this.getZtree(), nodes = tree.getNodes();
            for (var i = nodes.length - 1; i >= 0; i--) {
                tree.removeNode(nodes[i]);
            }
            return this;
        },


        /**
         * 设置远程获取数据的URL
         * @param url
         */
        setUrl: function (url, preserve) {

            this.get("tree").url = url;
            this.set("loaded", false);
            if (!preserve) {
                this.clear();
            }
        },


        /**
         * 返回zTree对象
         * @returns {*}
         */
        getZtree: function () {
            return this.get("ztree");
        },


        // 定义事件处理行为
        _bindEvents: function () {

            var trigger = this.get("trigger"), that = this;

            // 干掉自动完成
            trigger.attr("autocomplete", "off");

            this.delegateEvents(trigger, "mousedown", this._triggerHandle);

            this.delegateEvents(trigger, "click", function (e) {
                e.preventDefault();
            });

            this.delegateEvents(trigger, "keydown", $.proxy(this._keydownEvent, this));

            this.delegateEvents(trigger, "keyup", function (e) {
                clearTimeout(that._timeout);
                that._timeout = setTimeout(function () {
                    that._timeout = null;
                    that._keyupEvent.call(that, e);
                }, that.get("delay"));
            });
        },

        // 跟踪按键按下，ESC取消，上下左右忽略
        _keydownEvent: function (e) {
            delete this._keyupStart;
            switch (e.which) {
                case KEY.ESC:
                    this.hide();
                    break;
                case KEY.UP:
                case KEY.DOWN:
                case KEY.LEFT:
                case KEY.RIGHT:
                    break;
                default :
                    this._keyupStart = true;
            }
        },

        // 按键弹起，触发获取数据的请求
        _keyupEvent: function (e) {
            if (!this._keyupStart) return;
            delete this._keyupStart;
            this.show();
            this._fetchData.call(this, e);
        },

        // 通过ajax请求获取数据
        _fetchData: function (e) {

            var url = this.get("tree").url, that = this;
            if (!url) {
                that.element.mask("缺少远程数据源URL");
                return;
            }

            // 执行请求之前，把清空已有的节点，必须采用倒序清除，否则清不干净。
            var ztree = this.getZtree(), nodes = ztree.getNodes();
            for (var i = nodes.length - 1; i >= 0; i--) {
                ztree.removeNode(nodes[i]);
            }

            // 是通过输入来触发的，就检测最小位数够了没
            if (e) {
                // 判断输入的字符数量够不够
                var query = e.srcElement.value;
                if (query.length == 0) {
                    that.setValue("", "");
                    return;
                } else if (query.length < that.get("minLength")) {
                    that.element.mask("至少" + that.get("minLength") + "个字符");
                    return;
                }

                // 将参数添加到URL，执行ajax请求，成功后触发load事件
                url = new Uri(url).replaceQueryParam("query", query);
            }

            // 去掉赋值的标识符
            that._setted = false;

            // 遮罩
            this.element.mask();

            // 远程取数据
            $.ajax({
                url: url,
                success: function (json) {
                    if ($.isArray(json)) {
                        ztree.addNodes(null, json);
                    } else {
                        if ($.isArray(json.list)) {
                            ztree.addNodes(null, json.list);
                        } else if (json.msg) {
                            try {
                                $.alert(json.msg);
                            } catch (err) {
                                alert(json.msg);
                            }
                        }
                    }
                    that.element.unmask();
                    that.trigger("load", json, url);
                },
                error: function (xhr) {
                    that.element.mask(xhr.statusText);
                }
            });
        },

        // 将自己建的trigger同步成原始trigger的宽度
        _syncTriggerWidth: function () {
            if (!this.get("syncWidth")) {
                return;
            }
            var el = this.get("trigger");
            var width = this.get("oldTrigger").outerWidth();
            var pl = parseInt(el.css("padding-left"), 10);
            var pr = parseInt(el.css("padding-right"), 10);
            var bl = parseInt(el.css("border-left-width"), 10) || 0;
            var br = parseInt(el.css("border-right-width"), 10) || 0;
            el.css("width", width - pl - pr - bl - br);
        },

        // 将element弄成和trigger一样的宽度
        _setElementWidth: function () {
            var el = this.element;
            var width = this.get("trigger").outerWidth();
            var pl = parseInt(el.css("padding-left"), 10);
            var pr = parseInt(el.css("padding-right"), 10);
            var bl = parseInt(el.css("border-left-width"), 10) || 0;
            var br = parseInt(el.css("border-right-width"), 10) || 0;
            el.css("width", width - pl - pr - bl - br);
        },

        _tweakAlignDefaultValue: function () {
            var align = this.get("align");
            if (align.baseElement._id === "VIEWPORT") {
                align.baseElement = this.get("trigger");
            }
            this.set("align", align);
        },

        // 点击trigger的时候，显示ztree
        _triggerHandle: function (e) {
            e.preventDefault();
            if (!this.get("visible")) {
                this.show();
            }
        }
    });

    module.exports = Tree;

});