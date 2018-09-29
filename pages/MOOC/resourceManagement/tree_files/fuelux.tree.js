(function(a, c) {
    var b = function(e, d) {
        this.$element = a(e);
        this.options = a.extend({}, a.fn.tree.defaults, d);
        this.$element.on("click", ".tree-item", a.proxy(function(f) {
            this.selectItem(f.currentTarget)
        }, this));
        this.$element.on("click", ".tree-folder-header", a.proxy(function(f) {
            //点击每一个文件夹，展示文件夹下的文件列表
            this.selectFolder(f.currentTarget)
            var content= f.target.innerText;
            content =$.trim(content);
            console.log(content);
            var list = new Array();
            var  allColumnsResult = function () {
                jQuery("#list").html(list[0]);
                //console.log(list[0]);
                if ($('#list').hasClass('dataTable')) {
                    dttable = $('#list').dataTable();
                    dttable.fnClearTable(); //清空一下table
                    dttable.fnDestroy(); //还原初始化了的datatable
                }
                //$("#list").find("tbody").html(html);
                $('#list').dataTable({
                    ordering:false,
                    info: false,
                    bAutoWidth: true,
                    language: {
                        "sProcessing": "处理中...",
                        "sLengthMenu": "显示 _MENU_ 项结果",
                        "sZeroRecords": "没有匹配结果",
                        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                        "sInfoPostFix": "",
                        "sSearch": "搜索:",
                        "sUrl": "",
                        "sEmptyTable": "表中数据为空",
                        "sLoadingRecords": "载入中...",
                        "sInfoThousands": ",",
                        "oPaginate": {
                            "sFirst": "首页",
                            "sPrevious": "上页",
                            "sNext": "下页",
                            "sLast": "末页"
                        },
                        "oAria": {
                            "sSortAscending": ": 以升序排列此列",
                            "sSortDescending": ": 以降序排列此列"
                        }
                    }
                });
            }
            var paras = "fullpath="+'/'+content+'/';
            paras += "$^@^$operation=getSomeFiles";
            getFromWS("zyMooc/zyFileListNew.template", paras,list, allColumnsResult);
            var path = new Array();
            var  allColumnsResultpath = function () {
                var pathname = path[0].split(';');
                jQuery("#mulu").html('当前目录:'+pathname[0]+pathname[1]);
            }
            var para = "fullpath="+content;
            para += "$^@^$operation=getSomeFiles";
            getFromWS("zyMooc/zyFilePath.template", para,path, allColumnsResultpath);

        }, this));
        this.render()
    };
    b.prototype = {
        constructor: b,
        render: function() {
            this.populate(this.$element)
        },
        populate: function(f) {
            var e = this;
            var d = f.parent().find(".tree-loader:eq(0)");
            d.show();
            this.options.dataSource.data(f.data(), function(g) {
                d.hide();
                a.each(g.data, function(h, j) {
                    var i;
                    if (j.type === "folder") {
                        i = e.$element.find(".tree-folder:eq(0)").clone().show();
                        i.find(".tree-folder-name").html(j.name);
                        i.find(".tree-loader").html(e.options.loadingHTML);
                        var k = i.find(".tree-folder-header");
                        k.data(j);
                        if ("icon-class" in j) {
                            k.find('[class*="icon-"]').addClass(j["icon-class"])
                        }
                    } else {
                        if (j.type === "item") {
                            i = e.$element.find(".tree-item:eq(0)").clone().show();
                            i.find(".tree-item-name").html(j.name);
                            i.data(j);
                            if ("additionalParameters" in j && "item-selected" in j.additionalParameters && j.additionalParameters["item-selected"] == true) {
                                i.addClass("tree-selected");
                                i.find("i").removeClass(e.options["unselected-icon"]).addClass(e.options["selected-icon"])
                            }
                        }
                    }
                    if (f.hasClass("tree-folder-header")) {
                        //console.log(f);
                        // f.bind('click',function(){
                        //     alert(1);
                        // });
                        f.parent().find(".tree-folder-content:eq(0)").append(i)
                    } else {
                        f.append(i)
                    }
                });
                e.$element.trigger("loaded")
            })
        },
        selectItem: function(e) {
            if (this.options.selectable == false) {
                return
            }
            var d = a(e);
            var g = this.$element.find(".tree-selected");
            var f = [];
            if (this.options.multiSelect) {
                a.each(g, function(i, j) {
                    var h = a(j);
                    if (h[0] !== d[0]) {
                        f.push(a(j).data())
                    }
                })
            } else {
                if (g[0] !== d[0]) {
                    g.removeClass("tree-selected").find("i").removeClass(this.options["selected-icon"]).addClass(this.options["unselected-icon"]);
                    f.push(d.data())
                }
            }
            if (d.hasClass("tree-selected")) {
                d.removeClass("tree-selected");
                d.find("i").removeClass(this.options["selected-icon"]).addClass(this.options["unselected-icon"])
            } else {
                d.addClass("tree-selected");
                d.find("i").removeClass(this.options["unselected-icon"]).addClass(this.options["selected-icon"]);
                if (this.options.multiSelect) {
                    f.push(d.data())
                }
            }
            if (f.length) {
                this.$element.trigger("selected", {
                    info: f
                })
            }
        },
        selectFolder: function(e) {
            var d = a(e);
            var f = d.parent();
            if (d.find("." + this.options["close-icon"]).length) {
                if (f.find(".tree-folder-content").children().length) {
                    f.find(".tree-folder-content:eq(0)").show()
                } else {
                    this.populate(d)
                }
                f.find("." + this.options["close-icon"] + ":eq(0)").removeClass(this.options["close-icon"]).addClass(this.options["open-icon"]);
                this.$element.trigger("opened", d.data())
            } else {
                if (this.options.cacheItems) {
                    f.find(".tree-folder-content:eq(0)").hide()
                } else {
                    f.find(".tree-folder-content:eq(0)").empty()
                }
                f.find("." + this.options["open-icon"] + ":eq(0)").removeClass(this.options["open-icon"]).addClass(this.options["close-icon"]);
                this.$element.trigger("closed", d.data())
            }
        },
        selectedItemsAndParents: function() {
            //获取选中的子节点
            var $sel = this.$element.find(".tree-selected");
            //用来返回选中的子节点即其父节点
            var data = [];
            $.each($sel, function(index, value) {
                //获取父节点元素，当前子节点的父节点的上一个兄弟
                var $parent = $(value).parent(value).prev();
                //检测父节点的additionalParameters
                if(typeof($parent.data().additionalParameters) != "undefined"){
                    //检测data中是否已经包含该父节点  --》$.inArray()方法类似于JavaScript的原生.indexOf()方法，没有找到匹配元素时它返回-1。如果数组第一个元素匹配value（参数） ，那么$.inArray()返回0。
                    var result = $.inArray($parent.data(), data);
                    //如果不存在，即添加到data中
                    if(result==-1){
                        data.push($parent.data());
                    }
                }
                //把子节点添加到data中
                data.push($(value).data());
            });
            return data;
        },
        selectedItems: function() {
            var e = this.$element.find(".tree-selected");
            var d = [];
            a.each(e, function(f, g) {
                d.push(a(g).data())
            });
            return d
        }
    };
    a.fn.tree = function(e, g) {
        var f;
        var d = this.each(function() {
            var j = a(this);
            var i = j.data("tree");
            var h = typeof e === "object" && e;
            if (!i) {
                j.data("tree", (i = new b(this, h)))
            }
            if (typeof e === "string") {
                f = i[e](g)
            }
        });
        return (f === c) ? d : f
    };
    a.fn.tree.defaults = {
        multiSelect: false,
        loadingHTML: "<div>Loading...</div>",
        cacheItems: true
    };
    a.fn.tree.Constructor = b
})(window.jQuery);