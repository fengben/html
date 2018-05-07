//公共下拉方法
var fnShow = function() {
	var timer = null,
		fnBtn = $(".nav-pc>ul>li,.h-r-user-box>ul>li,.is-t-tab-ol>li");
	fnBtn.each(function() {
		var _this = $(this);
		var _fnSub = _this.find(".fn-sub-box");
		_this.hover(function() {
			if (_fnSub.is(":hidden")) {
				timer = setInterval(function() {
					_fnSub.slideDown(150);
				}, 500);
			};
		}, function() {
			clearInterval(timer);
			_fnSub.hide();
		});
	});
};
//移动端导航显示与隐藏
var wmNavFun = function() {
    var wmBtn = $(".mw-nav-tap"),
    	hmMask = $(".h-mobile-mask"),
        wH = $(window).height();
    $(".leftMenu-mobile").css("height", wH+"px");
    wmBtn.click(function() {
        if (!wmBtn.hasClass("mw-tap")) {
            $(this).addClass("mw-tap");
            $("html").addClass("active");
            hmMask.show().css("opacity","1");
        } else {
            $(this).removeClass("mw-tap");
            $("html").removeClass("active");
            hmMask.css("opacity","0").hide();
        };
    });
    hmMask.click(function() {
    	if(!hmMask.is(":hidden")) {
    		wmBtn.removeClass("mw-tap");
            $("html").removeClass("active");
            hmMask.css("opacity","0").hide();
    	}
    });
};
//左侧区域滚动固定
var rftFun = function() {
    var sT = function() {
        var rf = $("#r-fixedTop"),
            sTop = parseInt(document.documentElement.scrollTop || document.body.scrollTop , 10),
            rfw = rf.parent().width();
        if (sTop > 300) {
            rf.css({"position":"fixed", "top":"40px", "width":rfw});
        } else {
            rf.css({"position":"", "top":"", "width":rfw});
        };
    };
    $(window).bind("scroll", sT);
}
//点赞数字效果
var dzFun = function() {
    $(".dz-btn").one("click",function() {
        var _dznum = $(this).find(".dz-num");
        _dznum.stop().animate({"opacity":"0", "bottom":"90px"}, 1000, function() {
            _dznum.css({"opacity":"1", "bottom":"-20px"})
        });
    })
};
//快速定位去评论回复
var fcFun = function() {
    var fcB = $("#fc-rep").offset().top;
    $("html,body").animate({"scrollTop" : fcB},1000);
}
//公共弹框方法
/*
***
    dTitle : 弹框标题名称,
    dTxt : 提示内容文字,
    num : 弹框类型,
    num == 0 : 错误信息提示,
    num == 1 : 正确信息提示,
    num == 2 : 确认信息提示,
    num == 3 : 发私信弹出框,
    num == 4 : 发举报弹出框，
    num == 5 : 渐出信息提示
***
*/
function dialogFun(dTitle,dTxt,num,url) {
	if(num==3){
		if(!isLogin()){
			lrFun();
			return;
		}
		/*if(userId == url){
			dialogFun("提示信息","自己不能给自己发消息",5);
			return;
		}*/
	}

    $(".dialog-shadow").remove();
    $(".bg-mask").remove();
    var init = function() {
        this.dTitle = dTitle;
        this.dTxt = dTxt;
        this.num = num;
        this.winW = document.documentElement.clientWidth;
        this.winH = document.documentElement.clientHeight;
        this.sTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        this.sLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
        this.start();
        this.cancel();
    };
    init.prototype = {
        oTimer : null,
        tTimer : null,
        bMask : '',
        dCommEle : '',
        dContArr : [],
        dTop : 0,
        dLeft : 0,

        start : function() {
            var _this = this;
                _this.bMask = $('<div class="bg-mask"></div>').appendTo($("body"));
                _this.bMask.css({
                    background : "#000",
                    width : _this.winW,
                    height : _this.winH,
                    position : "fixed",
                    top : "0px",
                    left : "0px",
                    opacity : "0.3",
                    zIndex : "9999"
                });
            _this.dCommEle = $('<div id="dialog-shadow" class="dialog-shadow"><div class="dContent"><header id="dHead" class="dHead"><span class="c-333 ml20">'+_this.dTitle+'</span></header><a href="javascript:void(0)" title="关闭" class="dClose">&nbsp;</a><div id="dcWrap" class="dcWrap">内容区域</div></div></div>').appendTo($("body")).addClass("bounceIn");
            $.ajax({
                url:baselocation+"/group/ajax/commonDialog",
                data:{"dialog.title":dTitle,
                    "dialog.conent":dTxt,
                    "dialog.index":num,
                    "dialog.url":url
                },
                type:"post",
                dataType:"text",
                async:false,
                success:function(result){
                    $("#dcWrap").html(result);
                },error:function(){
                    $("#dcWrap").html("获取异常,请稍后再试试");
                }
            });


            _this.position();
            _this.drag();
            window.clearTimeout(_this.oTimer);
            window.clearTimeout(_this.tTimer);
        },
        position : function() {
            var _this = this,
                dcW =  _this.dCommEle.width(),
                dcH =  _this.dCommEle.height(),
                dHead = _this.dCommEle.find(".dHead");
            _this.dTop = (parseInt(_this.winH, 10)/2) + (parseInt(_this.sTop, 10));
            _this.dLeft = (parseInt(_this.winW, 10)/2) + (parseInt(_this.sLeft, 10));
            _this.dCommEle.css({
                top : _this.dTop - (dcH/2),
                left : _this.dLeft - (dcW/2)
            });
            dHead.css("width" , dcW + "px");
        },
        cancel : function() {
            var _this = this
                _dClose = _this.dCommEle.find(".dClose"),
                _dCancel = _this.dCommEle.find(".dCancel"),
                closeFun = function() {
                    _this.dCommEle.addClass("bounceOut");
                    _this.bMask.css({
                        opacity : "0",
                        zIndex : "-1"
                    });
                    _this.oTimer = setTimeout(function() {
                        _this.dCommEle.remove();
                        _this.bMask.remove();
                    }, 1000);
                };
            _this.tTimer = setTimeout(function() {
                _this.dCommEle.removeClass("bounceIn");
            }, 1000);
            if(_this.num === 5) {
                _this.bMask.remove();
                _this.dCommEle.find(".dHead").remove();
                _dClose.remove();
                _this.position();
                _this.oTimer = setTimeout(function() {
                    _this.dCommEle.fadeOut(1000);
                    _this.bMask.fadeOut(1000);
                }, 3000);
                _this.tTimer = setTimeout(function() {
                    closeFun();
                }, 4000);
            };
           _dClose.on("click",function() {closeFun()});
           _dCancel.on("click",function() {closeFun()});
        },
        drag : function() {
            var _this = this;
            var eDrag = document.getElementById("dialog-shadow"),
                oDrag = document.getElementById("dHead"),
                bDrag = false,
                disX = disY = 0;
            oDrag.onmousedown = function(event) {
                var event = event || window.event;
                bDrag = true;
                disX = event.clientX - eDrag.offsetLeft;
                disY = event.clientY - eDrag.offsetTop;
                this.setCapture && this.setCapture();  //设置鼠标捕获
                return false;
            };
            document.onmousemove = function(event) {
                if(!bDrag) return;
                var event = event || window.event;
                var dL = event.clientX - disX;
                var dT = event.clientY - disY;
                var maxL = document.documentElement.clientWidth + _this.sLeft - eDrag.offsetWidth;
                var maxT = document.documentElement.clientHeight + _this.sTop - eDrag.offsetHeight;
                dL = dL < 0 ? 0 : dL;
                dL = dL > maxL ? maxL : dL;
                dT = dT <0 ? 0 : dT;
                dT = dT > maxT ? maxT : dT;
                eDrag.style.marginTop = eDrag.style.marginLeft = 0;
                eDrag.style.left = dL + "px";
                eDrag.style.top = dT + "px";
                return false;
            };
            document.onmouseup = window.onblur = oDrag.onlosecapture = function() {
                bDrag = false;
                oDrag.releaseCapture && oDrag.releaseCapture();
            };
        }
    };
    new init();
}
//公共选项卡方法
function cardChange(oTitle, oCont, current, callback) {
    var oTitle = $(oTitle),
        oCont = $(oCont),
        _index;
    oTitle.click(function() {
        _index = oTitle.index(this);
        $(this).addClass(current).siblings().removeClass(current);
        oCont.eq(_index).show().siblings().hide();
        if (typeof callback === "function") {callback();};
    }).eq(0).click();
}



//快捷登录/注册
function lrFun(type) {
    var oBg = $('<div class="bMask"></div>').appendTo($("body")),
        dialogEle = $('<div class="dialogWrap undis loginshow" style="position: absolute;"><div class="dialog-ele"><h4 class="d-s-head pr"><a href="javascript:void(0)" title="关闭" class="dClose icon16 pa">&nbsp;</a><span id="d-s-head-tab" class="d-s-head-tab"><a href="javascript:void(0)" class="current">登录</a><a href="javascript:void(0)" class="webswitchhide">注册</a></span></h4><div class="of"><div id="lrEleWrap" class="mt10 mb20 ml20"></div></div></div></div>').appendTo($("body")).addClass("bounceIn")

      /*  ,rlEle = [
            '<div id="d-s-head-cont" class="lrWrap">'+
                '<section class="dis e-login-ele">'+
                    '<div class="mt10">'+
                        '<p class="e-l-jy"><font class="fsize12 c-red" id="requestErrorID">用户名和密码不匹配！</font></p>'+
                    '</div>'+
                    '<div>'+
                        '<ol class="e-login-options">'+
                            '<li>'+
                                '<input type="text" onkeyup="enterSubmit(event,\'pageLogin(2)\')" id="userEmail" placeholder="请输入登录邮箱"  name="" value="">'+
                                '<p class="lr-tip-wrap"><span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的邮箱！</span></p>'+
                            '</li>'+
                            '<li>'+
                                '<input type="password"  onkeyup="enterSubmit(event,\'pageLogin(2)\')" id="userPassword" placeholder="请输入密码"  name="" value="">'+
                                '<p class="lr-tip-wrap"><span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的密码！</span></p>'+
                            '</li>'+
                        '</ol>'+
                        '<section class="hLh30 of pl10"><span class="fr"><a href="/front/passwordRecovery" class="c-master fsize12">忘记密码?</a></span>'+
                        '<span class="fl"><label class="hand c-999 vam fsize12"><input type="checkbox" id="autoThirty" style="vertical-align: -2px;">自动登录</label></span></section>'+
                        '<section class="mt20 tac">'+
                            '<a href="javascript: void(0)" title="登 录" class="e-login-btn" onclick="pageLogin(2)" id="e-l-submit">登 录</a>'+
                        '</section>'+
                    '</div>'+
                '</section>'+
                '<section class="undis e-login-ele">'+
                    '<div class="mt10">'+
                        '<p class="e-l-jy"><font class="fsize12 c-red" >用户名和密码不匹配！</font></p>'+
                    '</div>'+
                    '<div>'+
                        '<ol class="e-login-options">'+
                            '<li>'+
                                '<input  type="text" maxlength="30" placeholder="请输入登录邮箱" id="regEmail" name="" value="">'+
                                '<p class="lr-tip-wrap"><span class="c-orange" id="emailError"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的邮箱！</span></p>'+
                            '</li>'+
                            '<li>'+
                                '<input  type="password"   placeholder="请输入密码" id="regPwd" name="" value="">'+
                                '<p class="lr-tip-wrap"><span class="c-orange" id="regPwdError"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的邮箱！</span></p>'+
                            '</li>'+
                            '<li>'+
                                '<input  type="password" placeholder="请再输入一次密码" id="cusPwdConfirm" name="" value="">'+
                                '<p class="lr-tip-wrap"><span class="c-orange" id="cusPwdConfirmError"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的邮箱！</span></p>'+
                            '</li>'+
                            '<li>'+
                                '<input  type="text" placeholder="请输入手机" id="mobile" name="" value="">'+
                                '<p class="lr-tip-wrap"><span class="c-orange" id="mobileError"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的邮箱！</span></p>'+
                            '</li>'+
                            '<li class="clearfix">'+
                                '<input id="randomcode" class="fl" style="width: 120px;" maxlength="4" type="text" placeholder="请输入验证码"  name="" value="">'+
                                '<a href="" title="" class="vam ml10 disIb fl"><img src="/ran/ajax/random" width="86" height="40"></a>'+
                                '<span class="c-999 fl ml10 fsize12">看不清<br><a href="javascript:void(0)" class="js-verify-refresh c-green">换一张</a></span><div class="clear"></div>'+
                                '<p class="lr-tip-wrap"><span class="c-orange" id="randomcodeError"><em class="icon16 u-a-cw">&nbsp;</em>请输入正确的邮箱！</span></p>'+
                            '</li>'+
                        '</ol>'+
                        '<section class="tac">'+
                            '<a href="javascript:void(0)" onclick="emailregister()" title="注 册" class="e-login-btn">注 册</a>'+
                        '</section>'+
                    '</div>'+
                '</section>'+
            '</div>'
        ]*/;
    var rlEle = "";
    $.ajax({
        url:baselocation+"/group/ajax/loginDialog",
        data:{"jumpType":type},
        dataType:"text",
        type:"post",
        async:false,
        success:function(result){
            rlEle = ""+result;
            //$("#hotTopicRecommend").html(result);
        }
    });
    $("#lrEleWrap").html(rlEle);
    placeholderFun();//placeholder兼容IE方法
    var dTop = (parseInt(document.documentElement.clientHeight, 10)/2) + (parseInt(document.documentElement.scrollTop || document.body.scrollTop, 10)),
        dH = dialogEle.height(),
        dW = dialogEle.width(),
        dHead = $(".dialog-ele>h4");
    dialogEle.css({"top" : (dTop-(dH/2)) , "margin-left" : -(dW/2)});
    dHead.css({"width" : (dW-"12")}); //ie7下兼容性;
    cardChange("#d-s-head-tab>a", "#d-s-head-cont>section", "current", function() {
        var dH = dialogEle.height();
        dialogEle.css({"top" : (dTop-(dH/2)) , "margin-left" : -(dW/2)});
    });
    $(".dClose").bind("click", function() {dialogEle.remove();oBg.remove();});
};
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
//返回顶部
function goTop() {
    var goTopEle = $('<a href="javascript:void(0)" id="global-goTop" class="G-goTop"><span><i class="icon30 G-ico">&nbsp;</i><em class="G-txt">返回顶部</em></span></a>').appendTo($("body"));
    $("#global-goTop").click(function() {
        $("html,body").animate({"scrollTop" : 0}, 100);
    })
    var goTopF = function() {
        var scrH = $(document).scrollTop(),
            winH = $(window).height();
        (scrH > 0) ? goTopEle.fadeIn(50) : goTopEle.fadeOut(50);
        if (!window.XMLHttpRequest) {
            goTopEle.css(top , scrH + winH);
        };
    }
    $(window).bind("scroll" , goTopF);
}


//公共加入小组
function joinGroup(groupId){
	if(isLogin()){
		$.ajax({
		    type: 'post',
		    url: baselocation+"/groupMember/ajax/join/"+groupId,
		    data: {
		    },
		    dataType:"json",
		    async:false,
		    success: function(result) {
		        if(result.success==true && result.message=="true"){
		        	dialogFun("操作提示","加入小组成功",1);
		        }else if(result.message=="exist"){
		        	dialogFun("操作提示","您已加入该小组！",0);
		        }else {
                    dialogFun("操作提示",result.message,0);
                }
		    }
		});
	}else{
		lrFun();
	}
};

//公共 热门话题
function groupHotTopic(groupId){
	$.ajax({
		url:baselocation+"/group/ajax/groupHotTopic",
		data:{"groupId":groupId},
		dataType:"text",
		type:"post",
		async:false,
		success:function(result){
			$("#hotTopicRecommend").html(result);
		}
	});
};



//关注
function toAttention(userId){
    //是否登陆
    if(isLogin()){
        $.ajax({
            url:baselocation+"/att/add",

            data:{
                "attentionUserId":userId
            },
            dataType:"json",
            type:"post",
            async : false,
            success:function(result){
                dialogFun("提示信息",result.message,5);
            }
        });
    }else{
        lrFun();
    }
};

//取消关注
function quxiaoAttention(userId){
    //是否登陆
    if(isLogin()){
        $.ajax({
            url:baselocation+"/att/del",
            data:{
                "attentionUserId":userId
            },
            dataType:"json",
            type:"post",
            async : false,
            success:function(result){
                dialogFun("提示信息",result.message,5);
            }
        });
    }else{
        lrFun();
    }
};


//发送消息
function hairMsg(receivingCusId){
	var conent = $("textarea[name='conent']").val();
	if(conent == null || $.trim(conent) == ''){
		$("#conentErrorMessage").show();
		return;
	}
	if(isLogin()){
		$.ajax({
			url:baselocation+"/groupuc/addReplyMsg",
			data:{
				"msgReceive.content":conent,
				"msgReceive.receivingCusId":receivingCusId
			},
			dataType:"json",
			type:"post",
			async : false,
			success:function(result){
				if(result.success){
					$("#conentErrorMessage").hide();
				}
				dialogFun("提示信息",result.message,5);
			}
		})
	}else{
		lrFun();
	}
};
//话题活动评论举报跳转到举报页
function reportPage(){
	dialogFun('举报信息','dasfasdfas',4);
};

/*
 *到添加小组页面
 */
function toAddGroup(){
	if(isLogin()){
		window.location.href='/group/groupAdd';
	}else{
		lrFun();
	}
}

/**
 *浏览用户
 */
function toBrowseUserCenter(userId){
	if(isLogin()){
		window.location.href='/groupuc/index/'+userId;
	}else{
		lrFun();
	}
}

/**
 * 小组管理 手机端选项卡处理
 */
function groupManagemobileMenuTab(){
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        var index=$(".is-title-ol.is-t-tab-ol li.current").index();
        if(index!=0){
            var $one_li = $(".is-title-ol.is-t-tab-ol li:eq(0)");
            var $two_li = $(".is-title-ol.is-t-tab-ol li.current");
            $two_li.insertBefore($one_li);    //移动节点
        }
    }
}


function initfrontUM(id,width,height){
    //实例化编辑器
    var ue = UE.getEditor(''+id,{

        toolbars: [
            ['emotion'
            ]
        ],
        enableAutoSave:false,
        autoHeightEnabled: true,
        autoFloatEnabled: true,
        initialFrameWidth:width,
        initialFrameHeight:height,
        maximumWords:500
        ,wordCount:false//        是否开启字数统计
    });

    //事件
    ue.addListener("contentChange",function(){

        if(ue.getContentLength(true)>500) {
            dialogFun("提示信息", "评论内容不能超过500个字！", 5);
            ue.setContent(ue.getContentTxt().substring(0, 500));
        }
    });
}

var ajaxUrlReply;//记录上次ajax分页的url
var ajaxparametersReply;//记录上次ajax分页的参数
var ajaxcallBackReply;
//ajax分页方法获取数据
function ajaxPageReply(url,parameters,pageNum,callBack){
    ajaxUrlReply = url;
    ajaxparametersReply = parameters;
    ajaxcallBackReply=callBack;
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
function goPageAjaxReply(pageNum,parentCommentId){
    $(".replyCommentContent").hide();
    $(".replyCommentContent").each(function(){
        var id = $(this).attr("id");
        UE.delEditor(''+id);
    });
    ajaxPageReply("/ajax/topicReplyCommentPaging/" + parentCommentId + "", "", pageNum, function(result){
        $("#replyCommentList"+parentCommentId).html(result);//回复的评论放到相应的评论下
    });
}

var ajaxUrl;//记录上次ajax分页的url
var ajaxparameters;//记录上次ajax分页的参数
var ajaxcallBack;
//ajax分页方法获取数据
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

function initFrontMultiUM(id,width,height){
    //实例化编辑器
    var ue = UE.getEditor(''+id,{
        toolbars: [
            [
                'fontfamily', //字体
                'fontsize', //字号
                'undo', //撤销
                'redo', //重做
                '|',
                'emotion', //表情
                'forecolor', //字体颜色
                'backcolor', //背景色
                'bold', //加粗
                'underline', //下划线
                'strikethrough', //删除线
                '|',
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                '|',
                'link', //超链接
                'unlink', //取消链接
                'simpleupload', //单图上传
                'insertimage', //多图上传
                //'music', //音乐
                //'insertvideo', //视频
                'removeformat', //清除格式
                'formatmatch', //格式刷
                'source', //源代码
            ]
        ],
        enableAutoSave:false,
        autoHeightEnabled: true,
        autoFloatEnabled: true,
        initialFrameWidth:width,
        initialFrameHeight:height,
        scaleEnabled:true//滚动条
    });
}