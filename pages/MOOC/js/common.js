var slider;
/*邮箱或账号注册开关*/
var ifEmailReg = "off";
var mobHeight;
$(function () {
    wmNavFun(); // 手机端导航方法
    mobHeight=$(window).height();
    moSeachAll();//移动端搜索页面页面

});
//移动端导航显示与隐藏
var wmNavFun = function() {
    var wmBtn = $(".mw-nav-btn"),
        hmMask = $(".h-mobile-mask"),
        wH = $(window).height();
    $(".head-mobile").css("height", wH+"px");
    wmBtn.click(function() {
        if (!wmBtn.hasClass("mw-tap")) {
            $(this).addClass("mw-tap");
            $("html").addClass("active");
            hmMask.show().css("opacity","1");
        } else {
            $(this).removeClass("mw-tap");
            $("html").removeClass("active");
            hmMask.css("opacity","0").hide();
        }
    });
    hmMask.click(function() {
        if(!hmMask.is(":hidden")) {
            wmBtn.removeClass("mw-tap");
            $("html").removeClass("active");
            hmMask.css("opacity","0").hide();
        }
    });
};
//向上滚动方法
var upSlideFun = function(od) {
    var _upWrap = $(od),
        _sTime = 5000,
        _moving;
    _upWrap.hover(function() {
        clearInterval(_moving);
    }, function() {
        _moving = setInterval(function() {
            var _mC = _upWrap.find("li:first");
            var _mH = _mC.height();
            _mC.animate({"margin-top" : -_mH + "px"}, 600, function() {
                _mC.css("margin-top", 0).appendTo(_upWrap);
            });
        }, _sTime);
    }).trigger("mouseleave");
};
//滚动定位
function cTabFun(op) {
    var cTab = op;
    cTab.each(function() {
        var _this = $(this),
            _tName = _this.attr("name");
        _this.click(function() {
            _this.parent().parent().find("a").removeClass("current");
            _this.addClass("current").siblings().removeClass("current");
            //$("html,body").animate({"scrollTop":$("."+_tName+"-content").offset().top}, 500);
        })
    })
}
// 课程分享
function shareShow() {
    //share show
    $(".kcShare").hover(function() {
        var _this = $(this);
        _this.stop().animate({"width" : "205px"}, 200);
        _this.siblings("span").css({"width" : "50px"});
        _this.children("#bdshare").stop().animate({"right" : "0"}, 200);
    }, function() {
        var _this = $(this);
        _this.stop().animate({"width" : "50px"}, 200);
        _this.children("#bdshare").stop().animate({"right" : "-160px"}, 200);
    });
}
//课程详情套餐
function slideScroll(oBox, prev, next, oUl, speed, autoplay) {
    var oBox = $(oBox),
        prev = $(prev),
        next = $(next),
        oUl = $(oUl).find("ul"),
        ulW = oUl.find("li").outerWidth(true),
        oLi = oUl.find("li").length,
        s = speed,
        timer = null;
    oUl.css("width", oLi * ulW + "px");
    //click prev
    next.click(function() {
        if (!oUl.is(":animated")) {
            oUl.animate({"margin-left" : -ulW}, function() {
                oUl.find("li").eq(0).appendTo(oUl);
                oUl.css("margin-left" , 0);
            });
        }
    });
    //click next
    prev.click(function() {
        if (!oUl.is(":animated")) {
            oUl.find("li:last").prependTo(oUl);
            oUl.css("margin-left", -ulW);
            oUl.animate({"margin-left" : 0});
        }
    });
    //autoplay
    if (autoplay === true) {
        timer = setInterval(function() {
            prev.click();
        }, s * 1000);
        oBox.hover(function() {
            clearInterval(timer);
        }, function() {
            timer = setInterval(function() {
                prev.click();
            }, s * 1000)
        })
    }
}
//tree menu
function treeMenu() {

    //一级目录
    $("#lh-menu>ul>li>a").each(function() {
        /*打开课程章节列表显示所有章节*/
        var _this = $(this);
        _this.siblings("ol").slideDown(150);
        _this.addClass("current-1");
        _this.click(function() {
            if (_this.siblings("ol").is(":hidden")) {
                _this.siblings("ol").slideDown(150);
                _this.addClass("current-1");
                //_this.parent("li").siblings().children("ol").slideUp(150);
                //_this.parent("li").siblings().children("a:first").removeClass("current-1");
            } else {
                _this.siblings("ol").slideUp(150);
                _this.removeClass("current-1");
            }
        });
    })
}
//答疑回复
function replyFun() {
    var hfElem = '<section class="n-reply-wrap"><fieldset>' +
        '<textarea name=""></textarea>' +
        '</fieldset><p class="of mt5 tar pl10 pr10">' +
        '<span class="fl"><tt class="c-red">回复内容不能为空！</tt></span>'+
        '<u class="hand mr10 qxBtn c-999">取消</u>' +
        '<a href="javascript: void(0)" title="回复" class="lh-reply-btn" onclick="addReply(this)">回复</a>' +
        '</p></section>';
    $(".question-list>ul>li").each(function() {
        var _this = $(this),
            qxFun = function() {
                //_this.find(".n-reply").find(".n-reply-wrap").remove();
                _this.find(".n-reply").slideUp(150);
            };
        _this.find(".noter-dy").click(function() {
            if (_this.find(".n-reply").is(":hidden")) {
                // _this.find(".n-reply").slideDown(150).prepend(hfElem);
                _this.find(".n-reply").slideDown(150);
            } else {
                qxFun();
            }
        });
        _this.find(".qxBtn").bind("click", function() {qxFun();});
    });
}
//选项卡公共方法
function cardChange(oTitle, oCont, current, callback) {
    var oTitle = $(oTitle),
        oCont = $(oCont),
        _index;
    oTitle.click(function() {
        _index = oTitle.index(this);
        $(this).addClass(current).siblings().removeClass(current);
        oCont.eq(_index).show().siblings().hide();
        if (typeof callback === "function") {
            callback();
        }
    }).eq(0).click();
}
// scrollLoad 滚动响应加载调用图片方法
var scrollLoad = (function (options) {
    var defaults = (arguments.length == 0) ? { src: 'xSrc', time: 500} : { src: options.src || 'xSrc', time: options.time ||500};
    var camelize = function (s) {
        return s.replace(/-(\w)/g, function (strMatch, p1) {
            return p1.toUpperCase();
        });
    };
    this.getStyle = function (element, property) {
        if (arguments.length != 2) return false;
        var value = element.style[camelize(property)];
        if (!value) {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                var css = document.defaultView.getComputedStyle(element, null);
                value = css ? css.getPropertyValue(property) : null;
            } else if (element.currentStyle) {
                value = element.currentStyle[camelize(property)];
            }
        }
        return value == 'auto' ? '' : value;
    };
    var _init = function () {
        if(document.getElementById("aCoursesList")==null){
            return;
        }
        var offsetPage = window.pageYOffset ? window.pageYOffset : window.document.documentElement.scrollTop,	//滚动条滚动高度
            offsetWindow = offsetPage + Number(window.innerHeight ? window.innerHeight : document.documentElement.clientHeight),
            docImg = document.getElementById("aCoursesList").getElementsByTagName("img"),			//通过ID查找获取图片节点
            _len = docImg.length;
        if (!_len) return false;
        for (var i = 0; i < _len; i++) {
            var attrSrc = docImg[i].getAttribute(defaults.src),
                o = docImg[i], tag = o.nodeName.toLowerCase();
            if (o) {
                postPage = o.getBoundingClientRect().top + window.document.documentElement.scrollTop + window.document.body.scrollTop;
                postWindow = postPage + Number(this.getStyle(o, 'height').replace('px', ''));
                if ((postPage > offsetPage && postPage < offsetWindow) || (postWindow > offsetPage && postWindow < offsetWindow)) {	//判断元素始终在可见区域内
                    if (tag === "img" && attrSrc !== null) {
                        o.setAttribute("src", attrSrc);
                    }
                    o = null;
                }
            }
        }
        window.onscroll = function () {
            setTimeout(function () {
                _init();
            }, defaults.time);
        }
    };
    return _init();
});
//公共弹框
/*******
 *** @param dTitle : 弹框标题名称;
 *** @param index : 调用弹框的类型;
 *** index == 0 : 支付结果反馈弹出框;
 *** index == 1 : 正确提示弹出框;
 *** index == 2 : 错误提示弹出框;
 *** index == 3 : 确认提示弹出框；
 */
function dialog(dTitle,msg,index,url) {
    if(index==19){
        var locUrl=window.parent.location+"";
        if(self.frameElement && self.frameElement.tagName == "IFRAME" && locUrl.indexOf("/uc/play/")!=-1){
            url = 'fromCoursePlayer';//来自播放大厅 显示不同的提示语
        }
    }
    $("#tisbutt,#dClose,#qujiao").click();
    var oBg = $('<div class="bMask"></div>').appendTo($("body")),
        dialogEle = $('<div class="dialogWrap"><div class="dialog-ele"><h4 class="d-s-head pr"><a id="dClose" href="javascript:void(0)" title="关闭" class="dClose icon16 pa">&nbsp;</a><span class="d-s-head-txt">'+dTitle+'</span></h4><div class="of bg-fff"><div id="dcWrap" class="mt20 mb20 ml20 mr20 "></div></div></div></div>').appendTo($("body"));
    // $.ajax({
    //     url : baselocation + "/dialog/ajax/showPage",
    //     data:{"dTitle":dTitle,"msg":msg,"index":index,"url":url,"dataOne":arguments[4],"dataTwo":arguments[5],"dataThree":arguments[6],"dataFour":arguments[7]},
    //     type : 'post',
    //     dataType : 'text',
    //     async : false,
    //     success : function(result) {
    //         $("#dcWrap").html(result);
    //         /*7为上传头像 加载上传图片插件*/
    //         if (index==7){
    //             uploadImg('fileupload','uploadfile');
    //         }
    //         var dTop = (parseInt(document.documentElement.clientHeight, 10)/2) + (parseInt(document.documentElement.scrollTop || document.body.scrollTop, 10)),
    //             dH = dialogEle.height(),
    //             dW = dialogEle.width(),
    //             dHead = $(".dialog-ele>h4");
    //         dialogEle.css({"top" : (dTop-(dH/2)) , "margin-left" : -(dW/2)});
    //         //dHead.css({"width" : (dW-"12")}); //ie7下兼容性;
    //         $("#tisbutt,#dClose,#qujiao").bind("click", function() {dialogEle.remove();oBg.remove();});
    //     }
    // })
    // $("#dcWrap").html(result);
    /*7为上传头像 加载上传图片插件*/
    if (index == 7) {
        uploadImg('fileupload', 'uploadfile');
        alert('after upload')
    }
    var dTop = (parseInt(document.documentElement.clientHeight, 10) / 2) + (parseInt(document.documentElement.scrollTop || document.body.scrollTop, 10)),
        dH = dialogEle.height(),
        dW = dialogEle.width(),
        dHead = $(".dialog-ele>h4");
    dialogEle.css({"top": (dTop - (dH / 2)), "margin-left": -(dW / 2)});
    //dHead.css({"width" : (dW-"12")}); //ie7下兼容性;
    $("#tisbutt,#dClose,#qujiao").bind("click", function () {
        dialogEle.remove();
        oBg.remove();
    });
}

function uploadImg() {
    $("#upLoadImg").click();
}

function getUrlString(name) {
    // alert("hahaha");
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
}

function uploadHeadImg() {
    var userName = localStorage.getItem("loginName");
    var file = $("#upLoadImg").val();
    var afterUploadFile = function(tid){//uploadToDatabase执行成功后返回的图片的id
		var paras = "picId=" + tid;
		paras += "$^@^$loginName=" + userName;

		var objs = new Array();
		var afterSavePic = function () {
            if (objs[0] == "ok") {
                location.reload(true);
            } else {
                alert("新增图片失败");
		    }
		};
		getFromWS("mainmooc/saveHeadImg.template", paras, objs, afterSavePic);
	}
	uploadToDatabase("upLoadImg",afterUploadFile,"databaseType=PostgresXL")

}

var ajaxUrl;//记录上次ajax分页的url
var ajaxparameters;//记录上次ajax分页的参数
var ajaxcallBack;
/*
 * ajax分页方法获取数据
 */
function ajaxPage(url,parameters,pageNum,callBack){
    ajaxUrl = url;
    ajaxparameters = parameters;
    ajaxcallBack=callBack;
    parameters='page.currentPage='+pageNum+''+parameters;
    $.ajax({
        type : "POST",
        dataType : "text",
        url:baselocation+url,
        data : parameters,
        cache : true,
        async : false,
        success : callBack
    });
}
//点击分页
function goPageAjax(pageNum){
    ajaxPage(ajaxUrl,ajaxparameters,pageNum,ajaxcallBack);
}

/*
 * 公共点赞
 * targetId 点赞的目标id
 * type 点赞类型 1问答点赞 2问答评论点赞
 * obj 当前标签对象
 */
function addPraise(targetId,type,obj){
    if(isLogin()){
        $.ajax({
            url:baselocation + "/praise/ajax/add",
            data:{
                "praise.targetId":targetId,
                "praise.type":type
            },
            type:"post",
            dataType:"json",
            async:true,
            success:function(result){
                if(result.success==true){
                    msgshow("点赞成功","true","3000");
                    //点赞数加一
                    var praiseNum = $(".addPraise"+targetId+"_"+type).children("span").html();
                    $(".addPraise"+targetId+"_"+type).children("span").html(praiseNum*1+1);
                    //修改点赞数
                    var priaseCount=parseInt($(obj).children("span").html());
                    $(obj).children("span").html(priaseCount+1);
                }else{
                    msgshow(result.message,"false","3000");
                }
            }
        })
    }else{
        //先关闭 弹出
        $("#tisbutt,#dClose,#qujiao").click();
        lrFun();
    }
}

/**
 * 查询未读消息
 */
function queryUnReadNum(){
    $.ajax({
        type : "POST",
        dataType : "json",
        url:baselocation+"/user/ajax/queryUnReadLetter",
        cache : true,
        async : true,
        success : function(result) {
            var letter = [];
            letter = result.entity;
            if(letter==null||letter.length==0){
                /* 如果没有未读消息移除用于显示消息的div*/
                $("#letter").parent().remove();
                return;
            }
            var html = '';
            for(var i=0;i<letter.length;i++){
                /*把未读消息放到数组*/
                var letterInfo = letter[i];
                var type = "";
                if (letterInfo.type==1){
                    type="系统消息"
                }else if (letterInfo.type==5){
                    type="课程过期"
                }else if (letterInfo.type==6){
                    type="优惠券过期"
                }
                /*把未读消息的内容和类型拼接到标签中*/
                html += ' <li> <div class="t-n-nr"><em title="删除" onclick="removeMsg('+letterInfo.id+',this)" class="ico-n-cl icon16">&nbsp;</em><a title="查看详情" class="nr-tit" href="/uc/letter">'+letterInfo.content+'</a></div></li>'
            }
            /* 把拼好的字符串标签放到页面 id=‘letter’位置*/
            $("#letter").html(html);
            //如果未读信息大于等于6条显示：显示更多
            if(letter.length>=6){
                $("#letter").next().show();
            }
            if(letter.length>0){
                $("#letterPoint").show();
                $("#letterPoint").html(letter.length)
            }
            //$("#headerMsgCountId").attr("title",unReadNum+"条未读消息");

            //$("#headerMsgCountId").html(unReadNum);
        }
    });
}
/*把系统消息改为已读*/
function removeMsg(letterId,obj) {
    $.ajax({
        url:baselocation + "/uc/ajax/changeStatus",
        data:{
            "msgReceive.id":letterId
        },
        type:"post",
        dataType:"json",
        success:function(result){
            if(result.success){
                $(obj).parent().parent().remove();
                if ($("#letter").find("li").length<=6){
                    $(".new-tit-box").hide();
                }
                //消息数
                var letterLength=parseInt($("#letterPoint").html())-1;
                if(letterLength==0){
                    $("#letterPoint").html("");
                    $("#letterPoint").removeClass("red-point");
                }else {
                    $("#letterPoint").html(letterLength);
                }

            }

        }
    })
}


/*
 * 快捷登录/注册
 * type 1 头部点击登陆 2 注册 选中
 * jumpType 跳转类型 ucIndex 个人中心 reload 当前页面重新刷新 默认只动态加载头部信息
 */
function lrFun(type,jumpType) {
    if ($(".new-loigin").length>0){
        return;
    }
    if(isLogin()){
        return;
    }
    var oBg = $('<div class="bMask"></div>').appendTo($("body")),
        dialogEle = $('<div class="dialogWrap" style="position: absolute;overflow-x:hidden;overflow-y: auto;"><div class="dialog-ele new-loigin"><h4 class="d-s-head pr new-header"><a id="dClose" href="javascript:void(0)" title="关闭" class="dClose icon16 pa new-close">&nbsp;</a><span id="d-s-head-tab" class="d-s-head-tab"><a href="javascript:void(0)" class="current">登录</a><a href="javascript:void(0)">注册</a></span></h4><div class="of"><div id="lrEleWrap" class="mt10 mb20 ml30 mr30"></div></div></div></div>').appendTo($("body"));
    $.ajax({
        url : baselocation + "/dialog/ajax/loginReg",
        data:{"jumpType":jumpType},
        type : 'post',
        dataType : 'text',
        async:false,
        success : function(result) {
            $("#lrEleWrap").html(result);

            placeholderFun();//placeholder兼容IE方法
            var dTop = (parseInt(document.documentElement.clientHeight, 10)/2) + (parseInt(document.documentElement.scrollTop || document.body.scrollTop, 10)),
                dH = dialogEle.height(),
                dW = dialogEle.width(),
                dHead = $(".dialog-ele>h4");
            dialogEle.css({"top" : (dTop-(dH/2)) , "margin-left" : -(dW/2)});
            dHead.css({"width" : (dW-"6")}); //ie7下兼容性;
            loginDialogChange("#d-s-head-tab>a", "#d-s-head-cont>section", "current",dialogEle.height(), function() {
                var dH = dialogEle.height();
                dialogEle.css({"top" : (dTop-(dH/2)) , "margin-left" : -(dW/2)});
            });
            $("#dClose").bind("click", function() {dialogEle.remove();oBg.remove();});

            if(type==2){
                $("#d-s-head-tab").find("a:eq(1)").click();
            }

            $("#u-email").focus();
        },
        error:function(error){
            /*如果登录页面访问路径不等于配置的路径，跳转到配置的，防止跨域*/
            if(window.location.href.indexOf(baselocation)==-1){
                window.location.href = baselocation+"/?msg=ExternalLogin";
            }
        }
    });
}

function loginDialogChange(oTitle, oCont, current,olddialogHeight, callback) {
    var oTitle = $(oTitle),
        oCont = $(oCont),
        _index;
    oTitle.click(function() {
        _index = oTitle.index(this);
        $(this).addClass(current).siblings().removeClass(current);
        oCont.eq(_index).show().siblings("section").hide();
        if (typeof callback === "function") {
            callback();
        }

        //手机端重新设置 高度 ，实现滚动条
        if(checkIsMobile()){
            //如果手机屏幕的高度小于 弹出框的高度
            //var mobHeight=$(window).height();
            var dialogHeight=$(".dialogWrap").height();
            if(mobHeight<=dialogHeight){
                if(_index==0){
                    var dTop = (parseInt(document.documentElement.clientHeight, 10)/2) + (parseInt(document.documentElement.scrollTop || document.body.scrollTop, 10));
                    dialogHeight=$(".dialogWrap").height("auto").height();
                    $(".dialogWrap").css({"top" : (dTop-(olddialogHeight/2)) });
                }else{
                    $(".dialogWrap").css("height", mobHeight+"px");
                    $(".dialogWrap").css({"top" : 0});
                }
            }
        }
    }).eq(0).click();
}
//placeholder兼容IE方法
function placeholderFun() {
    //判断浏览器是否支持placeholder属性
    supportPlaceholder='placeholder'in document.createElement('input');

    //当浏览器不支持placeholder属性时，调用placeholder函数
    if(!supportPlaceholder){
        $("input").not("input[type='password']").each(//把input绑定事件 排除password框
            function(){
                if($(this).val()=="" && $(this).attr("placeholder")!=""){
                    $(this).val($(this).attr("placeholder"));
                    $(this).focus(function(){
                        if($(this).val()==$(this).attr("placeholder")) $(this).val("");
                    });
                    $(this).blur(function(){
                        if($(this).val()=="") $(this).val($(this).attr("placeholder"));
                    });
                }
            });
        //对password框的特殊处理
        var pwdField    = $("input[type=password]");
        pwdField.each(function() {
            var _this = $(this),
                index = _this.index(),
                pwdVal = _this.attr('placeholder');
            _this.after('<input id="pwdPlaceholder'+index+'" type="text" value='+pwdVal+' autocomplete="off" />');
            var pwdFieldColn = _this.next();
            pwdFieldColn.show();
            _this.hide();

            pwdFieldColn.focus(function(){
                pwdFieldColn.hide();
                _this.show();
                _this.focus();
            });

            _this.blur(function(){
                if(_this.val() == '') {
                    pwdFieldColn.show();
                    _this.hide();
                }
            });
        });
    }
}
//右侧浮动 在线客服，官方微信， 返回顶部
function goTopFun() {
    var _gt = $("#goTopBtn");
    _gt.bind("click", function() {
        $("html,body").animate({"scrollTop" : 0}, 500);
    });
    var goTop = function() {
        var sTop = $(document).scrollTop();
        (sTop > 120) ? _gt.fadeIn(50) : _gt.fadeOut(50);
    };
    $(window).bind("scroll" , goTop);
}
/**
 * 发送手机验证码
 */
function sendPhoneRegister() {
    $(".e-login-options li").removeClass("err");
    var mobileVal=$("#u-mobile-reg").val();
    if(mobileVal==""){//验证手机是否为空
        $("#u-mobile-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入用户手机号！</span>');
        $("#u-mobile-reg").parent().addClass("err");
        return;
    }
    if(mobileRegex.test(mobileVal)==false){//格式不正确
        $("#u-mobile-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的手机号！</span>');
        $("#u-mobile-reg").parent().addClass("err");
        return;
    }

    var randomcodeReg=$("#u-randomcode-reg").val();
    if(isEmpty(randomcodeReg)){
        $("#u-randomcode-reg").next().next().next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入验证码！</span>');
        $("#u-randomcode-reg").parent().addClass("err");
        return;
    }

    $.ajax({
        url:baselocation+'/createuser/ajax/sendPhoneRegister',
        type:'post',
        dataType:'json',
        data:{
            "mobileVal":mobileVal,
            "randomcodeReg":randomcodeReg
        },
        success:function(result){
            if(result.success==true){
                $("#pp-randomcode-reg").next().next().html('<span class="c-orange"><em class="icon16 u-a-zq">&nbsp;</em>'+result.message+'</span>');
                var timeTicket;
                var timeNum = 60;
                //$("#phoneClick").css("visibility","hidden");
                // $("#recoverPhoneClick").css("visibility","visible");
                clearInterval(timeTicket);
                /*当点击获取验证码后设置60秒计时不可点击*/
                timeTicket = setInterval(function () {
                    if (timeNum>1){
                        timeNum--;
                        /*设置按钮不可点击*/
                        $(".mobile-yz-btn").addClass("mobile-yz-btn-no");
                        $(".mobile-yz-btn").attr("onclick","");
                        $(".mobile-yz-btn").text(timeNum+"秒后可点击");
                    }else if (timeNum==1){
                        $(".mobile-yz-btn").text("点击获取验证码");
                        $(".mobile-yz-btn").attr("onclick","sendPhoneRegister()");
                        $(".mobile-yz-btn").removeClass("mobile-yz-btn-no");
                        timeNum = 60;

                        clearInterval(timeTicket);

                        //刷新验证码
                        $(".js-verify-refresh.c-green").click();
                    }
                },1000);
            }else{
                /*如果是验证码错误*/
                if(result.entity=="randomcode"){
                    $("#u-randomcode-reg").next().next().next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-randomcode-reg").parent().addClass("err");
                }else if(result.entity=="mobileRandomcode"){ /*如果是手机验证码错误*/
                    $("#pp-randomcode-reg").next().next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#pp-randomcode-reg").parent().addClass("err");
                }else if(result.entity=="name"){/*如果是账号错误*/
                    $("#u-name-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-name-reg").parent().addClass("err");
                }else if(result.entity=="email"){/*如果是邮箱错误*/
                    $("#u-email-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-email-reg").parent().addClass("err");
                }else if(result.entity=="mobile"){/*如果是手机号错误*/
                    $("#u-mobile-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-mobile-reg").parent().addClass("err");
                }else {
                    $(".e-l-jy").html('<font class="fsize12 c-orange">'+result.message+'</font>');
                }//刷新验证码
                $(".js-verify-refresh.c-green").click();
            }

        }
    })
}
/**
 * 发送邮箱验证码
 */

function sendEmailRegister() {
    var emailVal=$("#u-email-reg").val();
    if(emailVal==""){//验证邮箱是否为空
        $("#u-email-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入邮箱！</span>');
        return;
    }
    if(emailRegex.test(emailVal)==false){//格式不正确
        $("#u-email-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的邮箱！</span>');
        return;
    }

    var randomcodeReg= $("#email-randomcode-reg").val();

    if(isEmpty(randomcodeReg)){
        $("#email-randomcode-reg").next().next().next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入验证码！</span>');
        return;
    }
    $.ajax({
        url:baselocation+'/createuser/ajax/sendEmailRegister',
        type:'post',
        dataType:'json',
        data:{
            "emailVal":emailVal,
            "randomcodeReg":randomcodeReg
        },
        success:function(result){
            if(result.success==true){
                $("#ep-randomcode-reg").next().next().next().html('<span class="c-orange">'+result.message+'</span>');
                var timeTicket;
                var timeNum = 60;
                $("#emailClick").css("visibility","hidden");
                $("#recoverEmailClick").css("visibility","visible");
                clearInterval(timeTicket);
                timeTicket = setInterval(function () {
                    if (timeNum>1){
                        timeNum--;
                        $("#recoverEmailClick").text(timeNum+"秒后可点击");
                    }else if (timeNum==1){
                        $("#emailClick").css("visibility","visible");
                        $("#recoverEmailClick").css("visibility","hidden");
                        timeNum = 60;
                        $("#recoverEmailClick").text(timeNum+"秒后可点击");
                        clearInterval(timeTicket);

                        //刷新验证码
                        $(".js-verify-refresh.c-green").click();
                    }
                },1000);
            }else{
                $("#ep-randomcode-reg").next().next().next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>'+result.message+'</span>');
                //刷新验证码
                $(".js-verify-refresh.c-green").click();
            }
        }
    })

}

/**
 * 执行登录
 * jumpType 跳转类型 ucIndex 个人中心 reload 当前页面重新刷新 默认只动态加载头部信息
 */
function dialogLogin(jumpType){
    var userName=$("#u-email").val();
    var pwd = $("#u-password").val();
    var autoThirty=$("#autoThirty").prop("checked");
    $("#u-email").next().html('');
    $("#u-password").next().html('');
    $(".e-l-jy").html('');
    if(userName==""||userName==null){
        $("#u-email").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入账户/邮箱/手机号！</span>');
        return false;
    }
    if(pwd==""||pwd==null){
        $("#u-password").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入登录密码！</span>');
        return false;
    }
    $.ajax({
        url:baselocation+'/user/ajax/login',
        type:'post',
        dataType:'json',
        data:{
            "account":userName,
            "password":pwd,
            "ipForget":autoThirty
        },
        success:function(result){
            if(result.success==false){
                $(".e-l-jy").html('<font class="fsize12 c-orange">'+result.message+'</font>');
            }else{
                if(jumpType=='ucIndex'){
                    window.location.href="/uc/index";
                }else if (jumpType=='reload'){
                    window.location.reload();
                }else{
                    $("#dClose").click();
                    showUserInfo();//头部显示用户信息
                    if($("#limitLogin").val()=="ON"){
                        //加载限制登录js
                        limitLogin();
                    }
                }
            }
        },
        error:function(error){
            alert("系统繁忙，请稍后再操作！");
        }
    });
}

/**
 * 注册新用户
 */
function dialogRegister(jumpType) {
    $(".e-login-options li").removeClass("err");
    $(".e-l-jy").html('');
    $(".e-login-options li p").html('');
    var nameVal=$("#u-name-reg").val();
    var emailVal=$("#u-email-reg").val();
    if (nameRegister=="ON"){
        if (nameVal==null||nameVal==""){
            $("#u-name-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入账号！</span>');
            $("#u-name-reg").parent().addClass("err");
            return;
        }
        if (usernameRegex.test(nameVal) == false) {//格式不正确
            $("#u-name-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>'+usernameRegex_info+'</span>');
            $("#u-name-reg").parent().addClass("err");
            return;
        }
        if (numberRegex.test(nameVal) == true) {
            $("#u-name-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>账号不能全为数字</span>');
            $("#u-name-reg").parent().addClass("err");
            return;
        }
    }
    if (emailRegister=="ON"){
        if (emailVal==null||emailVal==""){
            $("#u-email-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入邮箱！</span>');
            $("#u-email-reg").parent().addClass("err");
            return;
        }
        if (emailRegex.test(emailVal) == false) {//格式不正确
            $("#u-email-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的邮箱！</span>');
            $("#u-email-reg").parent().addClass("err");
            return;
        }
    }
    /*var emailCode =$("#ep-randomcode-reg").val();
     if (emailProving=="ON"){
     if (emailCode==""||emailCode==null){
     $("#ep-randomcode-reg").next().next().next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入邮箱验证码！</span>');
     return;
     }
     }*/

    /*获取手机号*/
    var mobileVal=$("#u-mobile-reg").val();
    /*如果手机注册开关打开*/
    if (phoneRegister=="ON") {
        if(mobileVal==null|| mobileVal==""){
            $("#u-mobile-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入用户手机号！</span>');
            $("#u-mobile-reg").parent().addClass("err");
            return;
        }
        if (mobileRegex.test(mobileVal) == false) {//格式不正确
            $("#u-mobile-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的手机号！</span>');
            $("#u-mobile-reg").parent().addClass("err");
            return;
        }
    }
    if($("#u-password-reg").val().trim()==""){//验证密码是否为空
        $("#u-password-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入密码！</span>');
        $("#u-password-reg").parent().addClass("err");
        return;
    }
    if($("#u-password-reg").val().length<6){//验证密码长度
        $("#u-password-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>密码长度不能小于六位！</span>');
        $("#u-password-reg").parent().addClass("err");
        return;
    }
    if(($("#u-password-reg").val()).indexOf(" ")!=-1){
        $("#u-password-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>密码不能包含空格！</span>');
        $("#u-password-reg").parent().addClass("err");
        return false;
    }
    /*if($("#u-passwordre-reg").val().trim()==""){//验证确认密码是否为空
     $("#u-passwordre-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入确认密码！</span>');
     return;
     }*/
    var mobileCode =$("#pp-randomcode-reg").val();
    if (phoneProving=="ON"){
        if (isEmpty(mobileCode)) {
            $("#pp-randomcode-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入手机验证码！</span>');
            $("#pp-randomcode-reg").parent().addClass("err");
            return;
        }
    }

    $.ajax({
        url : baselocation + "/user/ajax/createuser",
        data : {"user.userName":$("#u-name-reg").val(),"user.email":$("#u-email-reg").val(),"user.password":$("#u-password-reg").val(),
            "confirmPwd":$("#u-passwordre-reg").val(),"registerCode":$("#u-randomcode-reg").val(),
            "user.mobile":$("#u-mobile-reg").val(),"mobileCode":$("#pp-randomcode-reg").val(),
            "emailCode":$("#ep-randomcode-reg").val(),"sex":sex,"ifEmailReg":ifEmailReg},
        type : "post",
        dataType : "json",
        cache : false,
        async : false,
        success : function(result) {
            if(result.success==true) {
                if(jumpType=='ucIndex'){
                    window.location.href=baselocation+"/uc/initUpdateUser/0";
                }else if (jumpType=='reload'){
                    window.location.reload();
                }else{
                    $("#dClose").click();
                    showUserInfo();//头部显示用户信息
                }
            }else {
                /*如果是验证码错误*/
                if(result.entity=="randomcode"){
                    $("#u-randomcode-reg").next().next().next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-randomcode-reg").parent().addClass("err");
                }else if(result.entity=="mobileRandomcode"){ /*如果是手机验证码错误*/
                    $("#pp-randomcode-reg").next().next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#pp-randomcode-reg").parent().addClass("err");
                }else if(result.entity=="name"){/*如果是账号错误*/
                    $("#u-name-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-name-reg").parent().addClass("err");
                }else if(result.entity=="email"){/*如果是邮箱错误*/
                    $("#u-email-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-email-reg").parent().addClass("err");
                }else if(result.entity=="mobile"){/*如果是手机号错误*/
                    $("#u-mobile-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-mobile-reg").parent().addClass("err");
                }else {
                    $(".e-l-jy").html('<font class="fsize12 c-orange">'+result.message+'</font>');
                }
            }
        },
        error : function(error) {
            $(".e-l-jy").html('<font class="fsize12 c-orange">系统繁忙，请稍后再操作</font>');
        }
    });
}

/**
 * 学过此课程的用户
 */
function getCourseLearnedUser(courseId){
    $.ajax({
        type : "POST",
        dataType : "json",
        url:baselocation+"/couserStudyHistory/ajax/courseLearnedUser/"+courseId,
        cache : true,
        async : false,
        success : function(result) {
            if(result.success==true){
                var resultList=result.entity;
                if(resultList.length!=0){
                    var useImg="";
                    var userShowName="";
                    var resultStr='<section class="c-infor-tabTitle c-tab-title"><a href="" title="">学过此课的人（'+result.message+'）</a></section>';
                    resultStr+='<section class="buy-cin-list">';
                    for(var i=0;i<resultList.length;i++){
                        useImg=resultList[i].userImg;
                        if(useImg==null || $.trim(useImg)==''){
                            useImg = baselocation+'/static/inxweb/img/avatar-boy.gif';
                        }else{
                            useImg =baselocation+useImg;
                        }
                        userShowName=resultList[i].userShowName;
                        if(userShowName==null || $.trim(userShowName)==''){
                            userShowName = resultList[i].userEmail;
                        }
                        resultStr=resultStr+'<span title="'+userShowName+'"><img alt="" src="'+useImg+'"><tt class="c-999">'+userShowName+'</tt></span>';
                    }
                    resultStr+='</section>';
                    $("#courseLearnedUserDiv").parent().html(resultStr);
                }
            }
        }
    });
}
/**
 *手机用户个人中心登录拦截跳转
 */
function mobileHrefCheckLogin(hrefUrl){
    if(isLogin()){
        window.location.href=hrefUrl;
    }else{
        lrFun();
    }
}


//联合登录,重新打开窗口
function thirdPartyLogin(appType){
    window.location.href=baselocation+"/app/authlogin?appType="+appType;
}

/**
 * 直播播放
 */
function livePlay(kpointId,courseId){
    if(!isLogin()){
        lrFun();
        return;
    }
    $.ajax({
        type : "POST",
        dataType : "json",
        url:baselocation+"/front/ajax/livePlay",
        data:{"kpointId":kpointId},
        cache : true,
        async : false,
        success : function(result) {
            if(result.success){
                var heigth=$(window).height();
                /*如果是百家云掉用客户端用window.location.href*/
                if (result.message=="bajiayunApp"){
                    if (checkIsMobile()){
                        msgshow("无法调取客户端，请联系管理员","false","2000");
                        return;
                    }
                    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
                        dialog("进入房间","如果未安装或不能打开客户端，请下载最新版客户端，客户端功能更强大",13,result.entity+"|"+"http://www.baijiacloud.com/default/home/liveclientDownload?type=mac")
                    } else {
                        dialog("进入房间","如果未安装或不能打开客户端，请下载最新版客户端，客户端功能更强大",13,result.entity+"|"+"http://www.baijiacloud.com/default/home/liveclientDownload?type=windows")
                    }
                    /*window.location.href=result.entity;*/
                }else if(result.message=='bajiayunPlayback'){
                    window.open(result.entity+"&width=100%&height="+heigth);
                }else if (result.message=="96kooClient"){
                    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
                        dialog("进入房间","如果未安装或不能打开客户端，请下载最新版客户端，客户端功能更强大",13,result.entity+"|"+"http://www.96koo.net/static/live/zhinengzhibomac6.6.0.dmg")
                    } else {
                        dialog("进入房间","如果过未安装或不能打开客户端，请下载最新版客户端，客户端功能更强大",13,result.entity+"|"+"http://www.96koo.net/static/live/zhinengzhibo6.6.0.0103.zip");
                    }
                }else {
                    window.open(result.entity+"&width=100%&height="+heigth);
                }
            }else{
                if(result.message.indexOf("该直播为收费直播，请购买后操作。")!=-1 && courseId!=null){
                    window.location.href = "/front/couinfo/"+courseId;
                }else{
                    dialog('提示',result.message,1);
                }
            }
        }
    });
}
/*性别默认为1（男）*/
var sex = 1;
/*选择性别*/
function selectSex(num,obj) {
    $(obj).parent().children().removeClass("current");
    $(obj).addClass("current");
    $("input[name='user.sex']").val(num);
    $("#sexPrompt").html("");
    sex = num;
}
/*切换邮箱还是账号注册方式*/
function turnIfEmailReg() {

    if (ifEmailReg=="off"){
        ifEmailReg="on";
        $("#u-email-reg").attr("placeholder","请输入邮箱");
        $(".check-email-reg").text("账号注册")
    }else {
        ifEmailReg="off";
        $("#u-email-reg").attr("placeholder","请输入账号");
        $(".check-email-reg").text("邮箱注册")

    }
}

/**
 * 检查订单支付状态
 */
function chcckCoursePay(requestId) {
    $.ajax({
        url: '/order/review',
        data: {"requestId": requestId, "type": "course"},
        type: 'post',
        dataType: 'json',
        success: function (result) {
            if (result.message == "true") {
                var dataResult=result.entity;
                if(isNotNull(dataResult)){
                    var trxorderType=dataResult[0].trxorderType
                    if(trxorderType=='lineCourse'){
                        window.location.href = '/uc/lineCourse';
                    }
                    else if(trxorderType=='MEMBER'){
                        window.location.href = '/uc/associator';
                    }
                    else if(trxorderType=='ACCOUNT'){
                        window.location.href = '/uc/myAccount';
                    }
                    else if(trxorderType=='examPaper'){
                        window.location.href = '/uc/ucExam';
                    }
                    else if(trxorderType=='practiceQuestion'){
                        window.location.href = '/uc/ucPracticeQuestion';
                    }
                    else if(trxorderType=='passThrough'){
                        window.location.href = '/uc/ucPassThrough';
                    }
                    else if(trxorderType=='examPackage'){
                        window.location.href = '/uc/ucExamPackage';
                    }
                    else{
                        window.location.href = '/uc/index';
                    }
                }

            }else {
                msgshow("支付失败", "false");
            }
        }
    });
}

function mtitShow(){
    var _width = $(".u-r-tit-all").width(),
        _height = $(".u-body").height();
    $(".u-m-tit-abox").on('click', '.more',function(){
        $(".u-m-tit-abox .u-m-n-box").addClass("nameshow");
        $(".u-m-tit-abox .u-m-tit-a-warp").css({width:_width,height:_height});
        $(".u-m-tit-abox .u-m-tit-a-warp").show();
    });
    $(".u-m-tit-abox").on('click', '.u-m-tit-a-warp .u-m-t-ab-in ul li', function(){
        var _this = $(this);
        if (!_this.hasClass("m-current")) {
            _this.addClass("m-current").siblings().removeClass("m-current");
        } else {
            _this.removeClass("m-current");
        }
        $(".u-m-tit-abox .u-m-n-box").removeClass("nameshow");
        $(".u-m-tit-abox .more").text(($(".u-m-t-ab-in .m-current a").text()));
        $(".u-m-tit-abox .u-m-tit-a-warp").hide();
    })
}
function aNewTitShow(){
    var _width = $(".comm-title").width(),
        _height = $(".i-article").height();
    $(".u-m-tit-abox").on('click', '.more',function(){
        $(".u-m-tit-abox .u-m-n-box").addClass("nameshow");
        $(".u-m-tit-abox .u-m-tit-a-warp").css({width:_width,height:_height});
        $(".u-m-tit-abox .u-m-tit-a-warp").show();
    });
    $(".u-m-tit-abox").on('click', '.u-m-tit-a-warp .u-m-t-ab-in ul li', function(){
        var _this = $(this);
        if (!_this.hasClass("m-current")) {
            _this.addClass("m-current").siblings().removeClass("m-current");
        } else {
            _this.removeClass("m-current");
        }
        $(".u-m-tit-abox .u-m-n-box").removeClass("nameshow");
        $(".u-m-tit-abox .more").text(($(".u-m-t-ab-in .m-current a").text()));
        $(".u-m-tit-abox .u-m-tit-a-warp").hide();
    })
}
function optionShow(){
    var _heigth = $(".c-sort-box").height()-40;
    if(_heigth<$(window).height()){
        _heigth=$(window).height()
    }
    $(".kcfl-li").click(function(){
        /* 如果另外两个筛选条件有选中去掉选中*/
        if ($(".zhpx-li").hasClass("cur")){
            $(".zhpx-li").click()
        }
        if ($(".sxtj-li").hasClass("cur")){
            $(".sxtj-li").click()
        }
        if($(".kczy-box").hasClass("box-se")){
            $(".kczy-box").removeClass("box-se");
            $(this).removeClass("cur");
            $(".kczy-list-a").css("display","none");
            $(".mo-op-body").removeClass("mo-op-body-se");
        }else {
            $(".kczy-box").addClass("box-se");
            $(this).addClass("cur").siblings().removeClass("cur");
            $(".kczy-list-a").css("display","block");
            $(".mo-op-body").addClass("mo-op-body-se");
            $(".mo-op-body").css("height", _heigth);
        }
        /*判断父级专业id是不是0 展开对应的子集专业*/
        if (parentSubjectId !=0){
            $("#kczy-a").find(".current").click()
        }
    });
    $(".kczy-list-a li").click(function(){
        var bH=$(".kczy-list-a").height();
        if($(".kczy-list-b li").length==0){
            $(".kczy-list-a").css({display:"block",width:"100%"});
        }else {
            if(!$(this).hasClass("allSubject")){
                $(".kczy-list-a").css("width","50%");
            }
            $(".kczy-list-b").css({width:"50%",left:"50%",display:"block",height:bH});
        }
        $(this).addClass("current").siblings().removeClass("current");
    });
    $(".kczy-list-b li").click(function(){
        $(this).addClass("cater").siblings().removeClass("cater");
        $(".kcfl-li.cur a tt").text(($(this).children().text()));
        $(".kczy-box").removeClass("box-se");
        $(".mo-op-body").removeClass("mo-op-body-se");
        $(".kcfl-li").removeClass("cur");
    });
    //z综合排序
    $(".zhpx-li").click(function(){
        /* 如果另外两个筛选条件有选中去掉选中*/
        if ($(".kcfl-li").hasClass("cur")){
            $(".kcfl-li").click()
        }
        if ($(".sxtj-li").hasClass("cur")){
            $(".sxtj-li").click()
        }
        if($(".zhpx-box").hasClass("box-se")){
            $(".zhpx-box").removeClass("box-se");
            $(this).removeClass("cur");
            $(".zhpx-list").css("display","none");
            $(".mo-op-body").removeClass("mo-op-body-se");
        }else {
            $(this).addClass("cur").siblings().removeClass("cur");
            $(".zhpx-list").css("display","block");
            $(".zhpx-box").addClass("box-se");
            $(".mo-op-body").addClass("mo-op-body-se");
            $(".mo-op-body").css("height", _heigth);
        }
    });
    $(".zhpx-list li").click(function(){
        $(this).addClass("current").siblings().removeClass("current");
        $(".zhpx-li.cur a tt").text(($(this).text()));
        $(".zhpx-box").removeClass("box-se");
        $(".mo-op-body").removeClass("mo-op-body-se");
        $(".zhpx-li").removeClass("cur");
    });
    //筛选条件
    $(".sxtj-li").click(function(){
        /* 如果另外两个筛选条件有选中去掉选中*/
        if ($(".zhpx-li").hasClass("cur")){
            $(".zhpx-li").click()
        }
        if ($(".kcfl-li").hasClass("cur")){
            $(".kcfl-li").click()
        }
        if($(".sxtj-box").hasClass("box-se")){
            $(".sxtj-box").removeClass("box-se");
            $(this).removeClass("cur");
            $(".sxtj-list").css("display","none");
            $(".mo-op-body").removeClass("mo-op-body-se");
        }else {
            $(".sxtj-box").addClass("box-se");
            $(this).addClass("cur").siblings().removeClass("cur");
            $(".sxtj-list").css("display","block");
            $(".mo-op-body").addClass("mo-op-body-se");
            $(".mo-op-body").css("height", _heigth);
        }
    });
    /*$(".sxtj-list li").click(function(){
     $(this).addClass("current").siblings().removeClass("current");
     $(".sxtj-li.cur a tt").text(($(this).text()));
     $(".sxtj-box").removeClass("box-se");
     $(".mo-op-body").removeClass("mo-op-body-se");
     $(".sxtj-li").removeClass("cur");
     })*/

}
/**
 * 弹出框 （弱提示）
 * @param info 消息内容
 * @param success true 成功 false 失败
 * @param timeNum 显示时长毫秒
 */
function msgshow(info,success,timeNum){
    $("#message").remove();
    $(".mes-warp-0").remove();
    if(isEmpty(timeNum)){
        timeNum=3000;
    }
    var msgBox = $('<div id="message"></div>').appendTo($("body")).fadeIn("fast").delay(timeNum).fadeOut("slow");
    if (success=="false"){
        var msgTxt =
            '<div class="mes-warp-0">'+
            '<div class="msg-cg msg-nr msg-nr-cw"><em class="rts-ico"><img src="/static/admin/assets/rts-cw.png"></em><span>'+info+'</span></div>'+
            '</div>'
    }else{
        var msgTxt =
            '<div class="mes-warp-0">'+
            '<div class="msg-cg msg-nr msg-nr-zq"><em class="rts-ico"><img src="/static/admin/assets/rts-zq.png"></em><span>'+info+'</span></div>'+
            '</div>'
    }

    $("#message").html(msgTxt);
    var dTop = (parseInt(document.documentElement.clientHeight, 10)/2) + (parseInt(document.documentElement.scrollTop || document.body.scrollTop, 10)),
        dH = msgBox.height(),
        dW = msgBox.width(),
        timer = null;
    //dClose;
    msgBox.css({"top" : (dTop-(dH/2)) , "margin-left" : -(dW/2)});
    //dClose = function() {msgBox.remove();};
}
function goHistory(h5RedirectUrl) {
    var url =  window.location.href.replace(baselocation,"");
    if(url=="/quest/toQuestionitemList"||url=="/paper/toExamPaperRecordList"||url=="/quest/toErrorQuestionList"||url=="/quest/toNoteQuestionList"||url=="/quest/favoriteQuestion"){
        window.location.href=baselocation+"/paper/examIndex";
    }else if (url.indexOf('paper/getExamPaperReport')>0){
        window.location.href=baselocation+"/paper/examIndex";
    }else if(isNotEmpty(h5RedirectUrl)){
        window.location.href = h5RedirectUrl;
    }
    else {
        history.go(-1)
    }
}
//移动端搜索页面页面
function moSeachAll() {
    //手機端添加 最小高度
    if(checkIsMobile()){
        $("body").css("min-height",$(window).height());
    }
    var headHeight = $(".all-header").height();
    var bgHeight = $(window).height()-headHeight;
    var seachWidth = $(".mw-nav-seach").width();
    var seachIn =$(".h1-mw-seach-input").width();
    $(".mo-all-seach-warp").height(bgHeight);
    $(".h1-mw-seach-input").focus(function () {
        $("body").css({"height":"100%","overflow":"hidden"});
        $(this).val();
        $(".mo-all-seach-warp").animate({bottom:0},300);
        $(".mw-nav-btn").css("display","none");
        $(".mw-nav-seach").css({"right":"8px","width":seachWidth+55});
        $(".h1-mw-seach-input").css("width",seachIn+55);
    })
    $(".c-master").click(function () {
        $("body").css({"height":"auto","overflow":"hidden"});
        $(".mo-all-seach-warp").animate({bottom:"-100%"},300);
        $(".mw-nav-btn").css("display","block");
        $(".mw-nav-seach").css({"right":"55px","width":seachWidth});
        $(".h1-mw-seach-input").css("width",seachIn);
    })
  /*  $(".h1-mw-seach-input").blur(function () {
        $("body").css({"height":"auto","overflow":"hidden"});
        $(".mo-all-seach-warp").animate({bottom:"-100%"},300);
        $(".mw-nav-btn").css("display","block");
        $(".mw-nav-seach").css({"right":"55px","width":seachWidth});
        $(".h1-mw-seach-input").css("width",seachIn);
    })*/
}
/**
 * 检查是否购买
 */
function chcckCourseBuy(goodsId,type) {
    var isBuy=false;
    $.ajax({
        url: '/course/ajax/checkBuy/'+goodsId,
        data: {type:type},
        type: 'post',
        dataType: 'json',
        async:false,
        success: function (result) {
            isBuy=result.success;
        }
    });
    return isBuy;
}

/**
 * 参加砍价
 */
function addbargainPublish(bargainActivityId) {
    var bargainPublishId=0;
    $.ajax({
        url: baselocation+'/bargain/ajax/bargainPublishAdd/'+bargainActivityId,
        type: 'post',
        dataType: 'json',
        async:false,
        success: function (result) {
            if(result.success==false){
                msgshow(result.message,"false","3000");
            }
            bargainPublishId=result.entity.id;
        }
    });
    return bargainPublishId;
}