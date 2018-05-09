var slider;
/*������˺�ע�Ὺ��*/
var ifEmailReg = "off";
var mobHeight;
$(function () {
    wmNavFun(); // �ֻ��˵�������
    mobHeight=$(window).height();
    moSeachAll();//�ƶ�������ҳ��ҳ��

});
//�ƶ��˵�����ʾ������
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
//���Ϲ�������
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
//������λ
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
// �γ̷���
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
//�γ������ײ�
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

    //һ��Ŀ¼
    $("#lh-menu>ul>li>a").each(function() {
        /*�򿪿γ��½��б���ʾ�����½�*/
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
//���ɻظ�
function replyFun() {
    var hfElem = '<section class="n-reply-wrap"><fieldset>' +
        '<textarea name=""></textarea>' +
        '</fieldset><p class="of mt5 tar pl10 pr10">' +
        '<span class="fl"><tt class="c-red">�ظ����ݲ���Ϊ�գ�</tt></span>'+
        '<u class="hand mr10 qxBtn c-999">ȡ��</u>' +
        '<a href="javascript: void(0)" title="�ظ�" class="lh-reply-btn" onclick="addReply(this)">�ظ�</a>' +
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
//ѡ���������
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
// scrollLoad ������Ӧ���ص���ͼƬ����
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
        var offsetPage = window.pageYOffset ? window.pageYOffset : window.document.documentElement.scrollTop,	//�����������߶�
            offsetWindow = offsetPage + Number(window.innerHeight ? window.innerHeight : document.documentElement.clientHeight),
            docImg = document.getElementById("aCoursesList").getElementsByTagName("img"),			//ͨ��ID���һ�ȡͼƬ�ڵ�
            _len = docImg.length;
        if (!_len) return false;
        for (var i = 0; i < _len; i++) {
            var attrSrc = docImg[i].getAttribute(defaults.src),
                o = docImg[i], tag = o.nodeName.toLowerCase();
            if (o) {
                postPage = o.getBoundingClientRect().top + window.document.documentElement.scrollTop + window.document.body.scrollTop;
                postWindow = postPage + Number(this.getStyle(o, 'height').replace('px', ''));
                if ((postPage > offsetPage && postPage < offsetWindow) || (postWindow > offsetPage && postWindow < offsetWindow)) {	//�ж�Ԫ��ʼ���ڿɼ�������
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
//��������
/*******
 *** @param dTitle : �����������;
 *** @param index : ���õ��������;
 *** index == 0 : ֧���������������;
 *** index == 1 : ��ȷ��ʾ������;
 *** index == 2 : ������ʾ������;
 *** index == 3 : ȷ����ʾ������
 */
function dialog(dTitle,msg,index,url) {
    if(index==19){
        var locUrl=window.parent.location+"";
        if(self.frameElement && self.frameElement.tagName == "IFRAME" && locUrl.indexOf("/uc/play/")!=-1){
            url = 'fromCoursePlayer';//���Բ��Ŵ��� ��ʾ��ͬ����ʾ��
        }
    }
    $("#tisbutt,#dClose,#qujiao").click();
    var oBg = $('<div class="bMask"></div>').appendTo($("body")),
        dialogEle = $('<div class="dialogWrap"><div class="dialog-ele"><h4 class="d-s-head pr"><a id="dClose" href="javascript:void(0)" title="�ر�" class="dClose icon16 pa">&nbsp;</a><span class="d-s-head-txt">'+dTitle+'</span></h4><div class="of bg-fff"><div id="dcWrap" class="mt20 mb20 ml20 mr20 "></div></div></div></div>').appendTo($("body"));
    $.ajax({
        url : baselocation + "/dialog/ajax/showPage",
        data:{"dTitle":dTitle,"msg":msg,"index":index,"url":url,"dataOne":arguments[4],"dataTwo":arguments[5],"dataThree":arguments[6],"dataFour":arguments[7]},
        type : 'post',
        dataType : 'text',
        async : false,
        success : function(result) {
            $("#dcWrap").html(result);
            /*7Ϊ�ϴ�ͷ�� �����ϴ�ͼƬ���*/
            if (index==7){
                uploadImg('fileupload','uploadfile');
            }
            var dTop = (parseInt(document.documentElement.clientHeight, 10)/2) + (parseInt(document.documentElement.scrollTop || document.body.scrollTop, 10)),
                dH = dialogEle.height(),
                dW = dialogEle.width(),
                dHead = $(".dialog-ele>h4");
            dialogEle.css({"top" : (dTop-(dH/2)) , "margin-left" : -(dW/2)});
            //dHead.css({"width" : (dW-"12")}); //ie7�¼�����;
            $("#tisbutt,#dClose,#qujiao").bind("click", function() {dialogEle.remove();oBg.remove();});
        }
    })



}


var ajaxUrl;//��¼�ϴ�ajax��ҳ��url
var ajaxparameters;//��¼�ϴ�ajax��ҳ�Ĳ���
var ajaxcallBack;
/*
 * ajax��ҳ������ȡ����
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
//�����ҳ
function goPageAjax(pageNum){
    ajaxPage(ajaxUrl,ajaxparameters,pageNum,ajaxcallBack);
}

/*
 * ��������
 * targetId ���޵�Ŀ��id
 * type �������� 1�ʴ���� 2�ʴ����۵���
 * obj ��ǰ��ǩ����
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
                    msgshow("���޳ɹ�","true","3000");
                    //��������һ
                    var praiseNum = $(".addPraise"+targetId+"_"+type).children("span").html();
                    $(".addPraise"+targetId+"_"+type).children("span").html(praiseNum*1+1);
                    //�޸ĵ�����
                    var priaseCount=parseInt($(obj).children("span").html());
                    $(obj).children("span").html(priaseCount+1);
                }else{
                    msgshow(result.message,"false","3000");
                }
            }
        })
    }else{
        //�ȹر� ����
        $("#tisbutt,#dClose,#qujiao").click();
        lrFun();
    }
}

/**
 * ��ѯδ����Ϣ
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
                /* ���û��δ����Ϣ�Ƴ�������ʾ��Ϣ��div*/
                $("#letter").parent().remove();
                return;
            }
            var html = '';
            for(var i=0;i<letter.length;i++){
                /*��δ����Ϣ�ŵ�����*/
                var letterInfo = letter[i];
                var type = "";
                if (letterInfo.type==1){
                    type="ϵͳ��Ϣ"
                }else if (letterInfo.type==5){
                    type="�γ̹���"
                }else if (letterInfo.type==6){
                    type="�Ż�ȯ����"
                }
                /*��δ����Ϣ�����ݺ�����ƴ�ӵ���ǩ��*/
                html += ' <li> <div class="t-n-nr"><em title="ɾ��" onclick="removeMsg('+letterInfo.id+',this)" class="ico-n-cl icon16">&nbsp;</em><a title="�鿴����" class="nr-tit" href="/uc/letter">'+letterInfo.content+'</a></div></li>'
            }
            /* ��ƴ�õ��ַ�����ǩ�ŵ�ҳ�� id=��letter��λ��*/
            $("#letter").html(html);
            //���δ����Ϣ���ڵ���6����ʾ����ʾ����
            if(letter.length>=6){
                $("#letter").next().show();
            }
            if(letter.length>0){
                $("#letterPoint").show();
                $("#letterPoint").html(letter.length)
            }
            //$("#headerMsgCountId").attr("title",unReadNum+"��δ����Ϣ");

            //$("#headerMsgCountId").html(unReadNum);
        }
    });
}
/*��ϵͳ��Ϣ��Ϊ�Ѷ�*/
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
                //��Ϣ��
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
 * ��ݵ�¼/ע��
 * type 1 ͷ�������½ 2 ע�� ѡ��
 * jumpType ��ת���� ucIndex �������� reload ��ǰҳ������ˢ�� Ĭ��ֻ��̬����ͷ����Ϣ
 */
function lrFun(type,jumpType) {
	
    if ($(".new-loigin").length>0){
        return;
    }
    if(isLogin()){
        return;
    }
    var oBg = $('<div class="bMask"></div>').appendTo($("body")),
        dialogEle = $('<div class="dialogWrap" style="position: absolute;overflow-x:hidden;overflow-y: auto;"><div class="dialog-ele new-loigin"><h4 class="d-s-head pr new-header"><a id="dClose" href="javascript:void(0)" title="�ر�" class="dClose icon16 pa new-close">&nbsp;</a><span id="d-s-head-tab" class="d-s-head-tab"><a href="javascript:void(0)" class="current">��¼</a><a href="javascript:void(0)">ע��</a></span></h4><div class="of"><div id="lrEleWrap" class="mt10 mb20 ml30 mr30"></div></div></div></div>').appendTo($("body"));
    $.ajax({
        url : baselocation + "/dialog/ajax/loginReg",
        data:{"jumpType":jumpType},
        type : 'post',
        dataType : 'text',
        async:false,
        success : function(result) {
            $("#lrEleWrap").html(result);

            placeholderFun();//placeholder����IE����
            var dTop = (parseInt(document.documentElement.clientHeight, 10)/2) + (parseInt(document.documentElement.scrollTop || document.body.scrollTop, 10)),
                dH = dialogEle.height(),
                dW = dialogEle.width(),
                dHead = $(".dialog-ele>h4");
            dialogEle.css({"top" : (dTop-(dH/2)) , "margin-left" : -(dW/2)});
            dHead.css({"width" : (dW-"6")}); //ie7�¼�����;
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
            /*�����¼ҳ�����·�����������õ�·������ת�����õģ���ֹ����*/
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

        //�ֻ����������� �߶� ��ʵ�ֹ�����
        if(checkIsMobile()){
            //����ֻ���Ļ�ĸ߶�С�� ������ĸ߶�
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
//placeholder����IE����
function placeholderFun() {
    //�ж�������Ƿ�֧��placeholder����
    supportPlaceholder='placeholder'in document.createElement('input');

    //���������֧��placeholder����ʱ������placeholder����
    if(!supportPlaceholder){
        $("input").not("input[type='password']").each(//��input���¼� �ų�password��
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
        //��password������⴦��
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
//�Ҳม�� ���߿ͷ����ٷ�΢�ţ� ���ض���
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
 * �����ֻ���֤��
 */
function sendPhoneRegister() {
    $(".e-login-options li").removeClass("err");
    var mobileVal=$("#u-mobile-reg").val();
    if(mobileVal==""){//��֤�ֻ��Ƿ�Ϊ��
        $("#u-mobile-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>�������û��ֻ��ţ�</span>');
        $("#u-mobile-reg").parent().addClass("err");
        return;
    }
    if(mobileRegex.test(mobileVal)==false){//��ʽ����ȷ
        $("#u-mobile-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>��������ȷ���ֻ��ţ�</span>');
        $("#u-mobile-reg").parent().addClass("err");
        return;
    }

    var randomcodeReg=$("#u-randomcode-reg").val();
    if(isEmpty(randomcodeReg)){
        $("#u-randomcode-reg").next().next().next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>��������֤�룡</span>');
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
                /*�������ȡ��֤�������60���ʱ���ɵ��*/
                timeTicket = setInterval(function () {
                    if (timeNum>1){
                        timeNum--;
                        /*���ð�ť���ɵ��*/
                        $(".mobile-yz-btn").addClass("mobile-yz-btn-no");
                        $(".mobile-yz-btn").attr("onclick","");
                        $(".mobile-yz-btn").text(timeNum+"���ɵ��");
                    }else if (timeNum==1){
                        $(".mobile-yz-btn").text("�����ȡ��֤��");
                        $(".mobile-yz-btn").attr("onclick","sendPhoneRegister()");
                        $(".mobile-yz-btn").removeClass("mobile-yz-btn-no");
                        timeNum = 60;

                        clearInterval(timeTicket);

                        //ˢ����֤��
                        $(".js-verify-refresh.c-green").click();
                    }
                },1000);
            }else{
                /*�������֤�����*/
                if(result.entity=="randomcode"){
                    $("#u-randomcode-reg").next().next().next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-randomcode-reg").parent().addClass("err");
                }else if(result.entity=="mobileRandomcode"){ /*������ֻ���֤�����*/
                    $("#pp-randomcode-reg").next().next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#pp-randomcode-reg").parent().addClass("err");
                }else if(result.entity=="name"){/*������˺Ŵ���*/
                    $("#u-name-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-name-reg").parent().addClass("err");
                }else if(result.entity=="email"){/*������������*/
                    $("#u-email-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-email-reg").parent().addClass("err");
                }else if(result.entity=="mobile"){/*������ֻ��Ŵ���*/
                    $("#u-mobile-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-mobile-reg").parent().addClass("err");
                }else {
                    $(".e-l-jy").html('<font class="fsize12 c-orange">'+result.message+'</font>');
                }//ˢ����֤��
                $(".js-verify-refresh.c-green").click();
            }

        }
    })
}
/**
 * ����������֤��
 */

function sendEmailRegister() {
    var emailVal=$("#u-email-reg").val();
    if(emailVal==""){//��֤�����Ƿ�Ϊ��
        $("#u-email-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>���������䣡</span>');
        return;
    }
    if(emailRegex.test(emailVal)==false){//��ʽ����ȷ
        $("#u-email-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>��������ȷ�����䣡</span>');
        return;
    }

    var randomcodeReg= $("#email-randomcode-reg").val();

    if(isEmpty(randomcodeReg)){
        $("#email-randomcode-reg").next().next().next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>��������֤�룡</span>');
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
                        $("#recoverEmailClick").text(timeNum+"���ɵ��");
                    }else if (timeNum==1){
                        $("#emailClick").css("visibility","visible");
                        $("#recoverEmailClick").css("visibility","hidden");
                        timeNum = 60;
                        $("#recoverEmailClick").text(timeNum+"���ɵ��");
                        clearInterval(timeTicket);

                        //ˢ����֤��
                        $(".js-verify-refresh.c-green").click();
                    }
                },1000);
            }else{
                $("#ep-randomcode-reg").next().next().next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>'+result.message+'</span>');
                //ˢ����֤��
                $(".js-verify-refresh.c-green").click();
            }
        }
    })

}

/**
 * ִ�е�¼
 * jumpType ��ת���� ucIndex �������� reload ��ǰҳ������ˢ�� Ĭ��ֻ��̬����ͷ����Ϣ
 */
 function dialogLogin(jumpType) {

            var loginName = $("#u-email").val();
            var password = $("#u-password").val();

            var autoThirty = $("#autoThirty").prop("checked");
            $("#u-email").next().html('');
            $("#u-password").next().html('');
            $(".e-l-jy").html('');

            function passResult(results) {
                var fig = results[0].substring(0, 6);
                if (fig == "failed") {
                    alert("登录失败：" + results[0].substring(7));
                } else {
                    $.cookie('mooc_login_name', loginName);
                    $.cookie('mooc_password', password);
                    //$("#loginForm_back,#loginfrom").hide();
                    if (jumpType == 'ucIndex') {
                        window.location.href = "/uc/index";
                    } else if (jumpType == 'reload') {
                        window.location.reload();
                    } else {
                        $("#dClose").click();
                        showUserInfo();//Í·²¿ÏÔÊ¾ÓÃ»§ÐÅÏ¢
                        if ($("#limitLogin").val() == "ON") {
                            //¼ÓÔØÏÞÖÆµÇÂ¼js
                            limitLogin();
                        }
                    }
                    // location.href="articleManagement.html";
                }
            }

            login(loginName, password, passResult);  //登录login


        }


/**
 * ע�����û�
 */
function dialogRegister(jumpType) {
    $(".e-login-options li").removeClass("err");
    $(".e-l-jy").html('');
    $(".e-login-options li p").html('');
    var nameVal=$("#u-name-reg").val();
    var emailVal=$("#u-email-reg").val();
    if (nameRegister=="ON"){
        if (nameVal==null||nameVal==""){
            $("#u-name-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>�������˺ţ�</span>');
            $("#u-name-reg").parent().addClass("err");
            return;
        }
        if (usernameRegex.test(nameVal) == false) {//��ʽ����ȷ
            $("#u-name-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>'+usernameRegex_info+'</span>');
            $("#u-name-reg").parent().addClass("err");
            return;
        }
        if (numberRegex.test(nameVal) == true) {
            $("#u-name-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>�˺Ų���ȫΪ����</span>');
            $("#u-name-reg").parent().addClass("err");
            return;
        }
    }
    if (emailRegister=="ON"){
        if (emailVal==null||emailVal==""){
            $("#u-email-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>���������䣡</span>');
            $("#u-email-reg").parent().addClass("err");
            return;
        }
        if (emailRegex.test(emailVal) == false) {//��ʽ����ȷ
            $("#u-email-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>��������ȷ�����䣡</span>');
            $("#u-email-reg").parent().addClass("err");
            return;
        }
    }
    /*var emailCode =$("#ep-randomcode-reg").val();
     if (emailProving=="ON"){
     if (emailCode==""||emailCode==null){
     $("#ep-randomcode-reg").next().next().next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>������������֤�룡</span>');
     return;
     }
     }*/

    /*��ȡ�ֻ���*/
    var mobileVal=$("#u-mobile-reg").val();
    /*����ֻ�ע�Ὺ�ش�*/
    if (phoneRegister=="ON") {
        if(mobileVal==null|| mobileVal==""){
            $("#u-mobile-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>�������û��ֻ��ţ�</span>');
            $("#u-mobile-reg").parent().addClass("err");
            return;
        }
        if (mobileRegex.test(mobileVal) == false) {//��ʽ����ȷ
            $("#u-mobile-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>��������ȷ���ֻ��ţ�</span>');
            $("#u-mobile-reg").parent().addClass("err");
            return;
        }
    }
    if($("#u-password-reg").val().trim()==""){//��֤�����Ƿ�Ϊ��
        $("#u-password-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>���������룡</span>');
        $("#u-password-reg").parent().addClass("err");
        return;
    }
    if($("#u-password-reg").val().length<6){//��֤���볤��
        $("#u-password-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>���볤�Ȳ���С����λ��</span>');
        $("#u-password-reg").parent().addClass("err");
        return;
    }
    if(($("#u-password-reg").val()).indexOf(" ")!=-1){
        $("#u-password-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>���벻�ܰ����ո�</span>');
        $("#u-password-reg").parent().addClass("err");
        return false;
    }
    /*if($("#u-passwordre-reg").val().trim()==""){//��֤ȷ�������Ƿ�Ϊ��
     $("#u-passwordre-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>������ȷ�����룡</span>');
     return;
     }*/
    var mobileCode =$("#pp-randomcode-reg").val();
    if (phoneProving=="ON"){
        if (isEmpty(mobileCode)) {
            $("#pp-randomcode-reg").next().html('<span class="c-orange"><em class="icon16 u-a-cw">&nbsp;</em>�������ֻ���֤�룡</span>');
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
                    showUserInfo();//ͷ����ʾ�û���Ϣ
                }
            }else {
                /*�������֤�����*/
                if(result.entity=="randomcode"){
                    $("#u-randomcode-reg").next().next().next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-randomcode-reg").parent().addClass("err");
                }else if(result.entity=="mobileRandomcode"){ /*������ֻ���֤�����*/
                    $("#pp-randomcode-reg").next().next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#pp-randomcode-reg").parent().addClass("err");
                }else if(result.entity=="name"){/*������˺Ŵ���*/
                    $("#u-name-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-name-reg").parent().addClass("err");
                }else if(result.entity=="email"){/*������������*/
                    $("#u-email-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-email-reg").parent().addClass("err");
                }else if(result.entity=="mobile"){/*������ֻ��Ŵ���*/
                    $("#u-mobile-reg").next().html('<font class="fsize12 c-orange">'+result.message+'</font>');
                    $("#u-mobile-reg").parent().addClass("err");
                }else {
                    $(".e-l-jy").html('<font class="fsize12 c-orange">'+result.message+'</font>');
                }
            }
        },
        error : function(error) {
            $(".e-l-jy").html('<font class="fsize12 c-orange">ϵͳ��æ�����Ժ��ٲ���</font>');
        }
    });
}

/**
 * ѧ���˿γ̵��û�
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
                    var resultStr='<section class="c-infor-tabTitle c-tab-title"><a href="" title="">ѧ���˿ε��ˣ�'+result.message+'��</a></section>';
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
 *�ֻ��û��������ĵ�¼������ת
 */
function mobileHrefCheckLogin(hrefUrl){
    if(isLogin()){
        window.location.href=hrefUrl;
    }else{
        lrFun();
    }
}


//���ϵ�¼,���´򿪴���
function thirdPartyLogin(appType){
    window.location.href=baselocation+"/app/authlogin?appType="+appType;
}

/**
 * ֱ������
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
                /*����ǰټ��Ƶ��ÿͻ�����window.location.href*/
                if (result.message=="bajiayunApp"){
                    if (checkIsMobile()){
                        msgshow("�޷���ȡ�ͻ��ˣ�����ϵ����Ա","false","2000");
                        return;
                    }
                    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
                        dialog("���뷿��","���δ��װ���ܴ򿪿ͻ��ˣ����������°�ͻ��ˣ��ͻ��˹��ܸ�ǿ��",13,result.entity+"|"+"http://www.baijiacloud.com/default/home/liveclientDownload?type=mac")
                    } else {
                        dialog("���뷿��","���δ��װ���ܴ򿪿ͻ��ˣ����������°�ͻ��ˣ��ͻ��˹��ܸ�ǿ��",13,result.entity+"|"+"http://www.baijiacloud.com/default/home/liveclientDownload?type=windows")
                    }
                    /*window.location.href=result.entity;*/
                }else if(result.message=='bajiayunPlayback'){
                    window.open(result.entity+"&width=100%&height="+heigth);
                }else if (result.message=="96kooClient"){
                    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
                        dialog("���뷿��","���δ��װ���ܴ򿪿ͻ��ˣ����������°�ͻ��ˣ��ͻ��˹��ܸ�ǿ��",13,result.entity+"|"+"http://www.96koo.net/static/live/zhinengzhibomac6.6.0.dmg")
                    } else {
                        dialog("���뷿��","�����δ��װ���ܴ򿪿ͻ��ˣ����������°�ͻ��ˣ��ͻ��˹��ܸ�ǿ��",13,result.entity+"|"+"http://www.96koo.net/static/live/zhinengzhibo6.6.0.0103.zip");
                    }
                }else {
                    window.open(result.entity+"&width=100%&height="+heigth);
                }
            }else{
                if(result.message.indexOf("��ֱ��Ϊ�շ�ֱ�����빺��������")!=-1 && courseId!=null){
                    window.location.href = "/front/couinfo/"+courseId;
                }else{
                    dialog('��ʾ',result.message,1);
                }
            }
        }
    });
}
/*�Ա�Ĭ��Ϊ1���У�*/
var sex = 1;
/*ѡ���Ա�*/
function selectSex(num,obj) {
    $(obj).parent().children().removeClass("current");
    $(obj).addClass("current");
    $("input[name='user.sex']").val(num);
    $("#sexPrompt").html("");
    sex = num;
}
/*�л����仹���˺�ע�᷽ʽ*/
function turnIfEmailReg() {

    if (ifEmailReg=="off"){
        ifEmailReg="on";
        $("#u-email-reg").attr("placeholder","����������");
        $(".check-email-reg").text("�˺�ע��")
    }else {
        ifEmailReg="off";
        $("#u-email-reg").attr("placeholder","�������˺�");
        $(".check-email-reg").text("����ע��")

    }
}

/**
 * ��鶩��֧��״̬
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
                msgshow("֧��ʧ��", "false");
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
        /* �����������ɸѡ������ѡ��ȥ��ѡ��*/
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
        /*�жϸ���רҵid�ǲ���0 չ����Ӧ���Ӽ�רҵ*/
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
    //z�ۺ�����
    $(".zhpx-li").click(function(){
        /* �����������ɸѡ������ѡ��ȥ��ѡ��*/
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
    //ɸѡ����
    $(".sxtj-li").click(function(){
        /* �����������ɸѡ������ѡ��ȥ��ѡ��*/
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
 * ������ ������ʾ��
 * @param info ��Ϣ����
 * @param success true �ɹ� false ʧ��
 * @param timeNum ��ʾʱ������
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
//�ƶ�������ҳ��ҳ��
function moSeachAll() {
    //�֙C����� ��С�߶�
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
 * ����Ƿ���
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
 * �μӿ���
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