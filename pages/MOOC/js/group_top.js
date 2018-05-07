$(function() {
	// 头部登陆未登录状态是否显示
	showLoginInfo();
	headerShow();
});
//联合登录,重新打开窗口
function oauthLogin(appType){
    window.location.href=baselocation+"/app/authlogin?appType="+appType;
}

var nowloginurl = 0;
function togouc(url){
	if(isLogin()){
		window.location.href=""+url+"/"+nowloginurl;
	}else{
		lrFun();
	}
}
/** 前台页面显示登录层* */
function showLoginInfo() {
    var user = getLoginUser();
    if(user!=null && user.userId>0){
        //查询未读消息
        queryUnReadNum();

        $(".headerLogined").removeClass('undis');
        $("#notLogin").hide();
        var entity = user;
        nowloginurl = entity.userId;
        if( entity && entity.displayName && isNotEmpty(entity.displayName)){//昵称
            $(".cusName").html( entity.displayName);
            $(".userNameClass").html('<span class="c-999" onclick="togouc(\'/uc/index\')">'+ entity.displayName+'</span>');
        }else{
            $(".cusName").html(entity.email);//邮箱
            $(".userNameClass").html('<span class="c-999" onclick="togouc(\'/uc/index\')">'+ entity.email+'</span>');
        }
        //个性签名
        var userInfo = entity.userInfo;
        if(userInfo!=null&&userInfo!=''){
            $(".userInfo").html(userInfo);
        }
        //兴趣爱好
        /*var hobby = entity.hobby;
        if(hobby!=null&&hobby!=''){
            $(".hobby").html(hobby);
        }*/
        //性别
        var gender = entity.sex;
        if(gender==0){
            $(".boyfalg").show();
        }else{
            $(".girlfalg").show();
        }


        //省
        var province = entity.province;
        //市
        var city = entity.city;
        //区
        var area = entity.area;
        var areafalg = "";
        if(province!=null&&province!=''){
            areafalg+=province;
            if(city!=null&&city!=''){
                areafalg+="·"+city;
            }
            if(area!=null&&area!=''){
                areafalg+="·"+area;
            }
            $(".areafalg").html(areafalg);
        }
        if(entity.picImg && isNotEmpty(entity.picImg)){
            $(".cusImgClass").attr("src",staticServer+entity.picImg);
        }else{
            $(".cusImgClass").attr("src","/static/gro/img/avatar-boy.gif");
        }
    }else{
        $(".headerLogined").hide();
        $("#notLogin").show();
    }
}


// 提示消息
function showDialog(dTitle, conent) {
	var oBg = $('<div class="bg-shadow"></div>').appendTo($("body")), dialogEle = $('<div class="dialog-shadow"><div class="dialog-ele"><h4 class="d-s-head pr"><a href="javascript:void(0)" title="关闭" class="dClose icon16 pa">&nbsp;</a><span class="d-s-head-txt">'
			+ dTitle
			+ '</span></h4><div id="dcWrap" class="pt20 pb20 pl20 pr20 of" style=""></div></div></div>')
			.appendTo($("body"));

	var dCont = [
			"<div class='d-tips-1'><em class='icon30 pa d-t-icon-1'></em><p class='fsize14 c-666'>"
					+ conent
					+ "</p><div class='tac mt20'><a href='javascript:void(0);' title='' class='blue-btn ml10 dClose'>确定</a></div><p class='tar mt20 c-666'></p></div>",
			"<div></div>", "<div></div>"];
	$("#dcWrap").html(dCont[0]);

	var dTop = (parseInt(document.documentElement.clientHeight, 10) / 2)
			+ (parseInt(document.documentElement.scrollTop
							|| document.body.scrollTop, 10)), dH = dialogEle
			.height(), dW = dialogEle.width();
	dialogEle.css({
				"top" : (dTop - (dH / 2)),
				"margin-left" : -(dW / 2)
			});
	$(".dClose").bind("click", function() {
				dialogEle.remove();
				oBg.remove();
			});
}


/**
 * 头部点击哪一个，就改其中的样式
 */
function headerShow() {
	var index = '/index';
	var course = '/front/showcoulist';
	var teahcer = '/front/teacherlist';
	var article = '/front/articlelist';
	var atricleInfo = '/front/toArticle';
	var courseInfo = '/front/couinfo';

	var pageUrl = window.location;
	pageUrl = pageUrl + '';
	if (urlindexOf(pageUrl, index)) {
		$("#headerindex").addClass('current');
	} else if (urlindexOf(pageUrl, course) || urlindexOf(pageUrl, courseInfo)) {
		$("#headercourse").addClass('current');
	} else if (urlindexOf(pageUrl, teahcer)) {
		$("#headerteacher").addClass('current');
	} else if (urlindexOf(pageUrl, article) || urlindexOf(pageUrl, atricleInfo)) {
		$("#headerarticle").addClass('current');
	}
}
// str1是否包含str2
function urlindexOf(str1, str2) {
	return str1.indexOf(str2) != -1;
}

/**
 * 公共ajax登录方法
 * @param type 登录类型 1重新加载本页面,2跳转到首页，3跳转到传来的URL
 * @param url 要转向的路径
 */
function pageLogin(type,url){
    $("#requestErrorID").parent().hide();
    var userName=$("#userEmail").val();
    var pwd = $("#userPassword").val();
    var autoThirty=$("#autoThirty").prop("checked")
    $("#passwordError").html('');
    $("#userNameError").html('');
    $("#requestErrorID").html('');
    if(!isNotEmpty(userName)){
        $("#requestErrorID").parent().attr("style","visibility:visible").show();
        $("#requestErrorID").html('<font class="fsize12">输入用户名</font>');
        return false;
    }
    if(!isNotEmpty(pwd)){
        $("#requestErrorID").parent().attr("style","visibility:visible").show();
        $("#requestErrorID").html('<font class="fsize12">请输入密码</font>');
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
        cache : false,
        async : false,
        success : function(result) {
            if(result.success){
                //如果登录成功，则刷新页面
            	/*var forwordURL=getCookieFromServer("redirect");
                if (typeof(forwordURL) != "undefined" && forwordURL) {
                    DeleteCookie("forward");
                    window.location.href = forwordURL.replaceAll('"','');
                    return;
                }*/
                if(type==1){
                	showLoginInfo();//加载 nowloginurl
                	toBrowseUserCenter(nowloginurl);
                }else{
                	window.location.reload();
                }
            }else{
                $("#requestErrorID").parent().attr("style","visibility:visible").show();
                $("#requestErrorID").html('<font class="fsize12">'+result.message+'</font>');
            }
        }
    });
}

//邮箱注册
function emailregister() {
    $("#u-name-regError").hide();
    $("#emailError").hide();
    $("#randomcodeError").hide();
    $("#regPwdError").hide();
    $("#cusPwdConfirmError").hide();
    $("#mobileError").hide();
    $("#pp-randomcode-regError").hide();
    $("#error").css("visibility","hidden");

    var nameVal=$("#u-name-reg").val();
    if (nameRegister=="ON"){
        if (nameVal==null||nameVal==""){
            $("#u-name-regError").show();
            $("#u-name-regError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入账号');
            return;
        }
    }

    var emailVal=$("#regEmail").val();
    if (emailRegister=="ON"){
        if(isNotEmpty(emailVal)==false){//验证邮箱是否为空
            $("#emailError").show();
            $("#emailError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入邮箱');
            return;
        }
        if(emailRegex.test(emailVal)==false){//格式不正确
            $("#emailError").show();
            $("#emailError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入正确的邮箱');
            return;
        };
    }
    /*if(isNotEmpty($("#cusPwdConfirm").val())==false){//验证确认密码是否为空
        $("#cusPwdConfirmError").show();
        $("#cusPwdConfirmError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入确认密码');
        return;
    }
    if($("#cusPwdConfirm").val()!=$("#regPwd").val()){//验证确认密码是否相同
        $("#cusPwdConfirmError").show();
        $("#cusPwdConfirmError").html('<em class="icon16 u-a-cw">&nbsp;</em>两次密码输入不一致');
        return;
    }*/
    if (phoneRegister=="ON"){
        if(isNotEmpty($("#mobile").val())==false){//手机为空
            $("#mobileError").show();
            $("#mobileError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入手机');
            return;
        }
        if (mobileRegex.test($("#mobile").val()) == false) {//格式不正确
            $("#mobileError").show();
            $("#mobileError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入正确的手机号');
            return;
        }
    }
    if(isNotEmpty($("#regPwd").val())==false){//验证密码是否为空
        $("#regPwdError").show();
        $("#regPwdError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入密码');
        return;
    }
    if($("#regPwd").val().length<6){//验证密码长度
        $("#regPwdError").show();
        $("#regPwdError").html('<em class="icon16 u-a-cw">&nbsp;</em>密码长度不能小于六位');
        return;
    }
    if(($("#regPwd").val()).indexOf(" ")!=-1){
        $("#regPwdError").show();
        $("#regPwdError").html('<em class="icon16 u-a-cw">&nbsp;</em>密码不能包含空格');
        return false;
    }
    if(isNotEmpty($("#randomcode").val())==false){//验证 验证码是否为空
        $("#randomcodeError").show();
        $("#randomcodeError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入验证码');
        return;
    }
    var mobileCode =$("#pp-randomcode-reg").val();
    if (phoneProving=="ON"){
        if (isEmpty(mobileCode)) {
            $("#pp-randomcode-regError").show();
            $("#pp-randomcode-regError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入手机验证码');
            return;
        }
    }

    $.ajax({
        url :  baselocation + "/user/ajax/createuser",
        data : {"user.userName":$("#u-name-reg").val(),"user.email":$("#regEmail").val(),"user.password":$("#regPwd").val(),
            "registerCode":$("#randomcode").val(),
            "user.mobile":$("#mobile").val(),"mobileCode":$("#pp-randomcode-reg").val(),
            "emailCode":$("#ep-randomcode-reg").val()},
        type : "post",
        dataType : "json",
        cache : false,
        async : false,
        success : function(result) {
            if(result.success==true) {
                var forwordURL=getCookie("forward");
                if (typeof(forwordURL) != "undefined" && forwordURL) {
                    DeleteCookie("forward");
                    window.location.href = forwordURL.replaceAll('"','');
                    return;
                }
                //window.location.href = baselocation + "/uc/home";
                /*location.reload();*/
                showLoginInfo();//加载 nowloginurl
            	toBrowseUserCenter(nowloginurl);
            }else {
                //$("#emailError").show();
                //$("#emailError").html('<em class="icon16 u-a-cw">&nbsp;</em>'+result.message+'');
                $("#error").html('<em class="icon16 u-a-cw">&nbsp;</em>'+result.message+'');
                $("#error").css("visibility","visible")
            }
        },
        error : function(error) {
            $("#emailError").show();
            $("#emailError").html('<em class="icon16 u-a-cw">&nbsp;</em>系统繁忙，请稍后再操作');
            $("#error").html('<em class="icon16 u-a-cw">&nbsp;</em>'+result.message+'');
            $("#error").css("visibility","visible")
        }
    });
}

/**
 * 发送手机验证码
 */
function sendGroupPhoneRegister() {
    $("#u-name-regError").hide();
    $("#emailError").hide();
    $("#randomcodeError").hide();
    $("#regPwdError").hide();
    $("#cusPwdConfirmError").hide();
    $("#mobileError").hide();
    $("#pp-randomcode-regError").hide();
    $("#error").css("visibility","hidden");

    var mobileVal=$("#mobile").val();
    if(mobileVal==""){//验证手机是否为空
        $("#mobileError").show();
        $("#mobileError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入手机');
        return;
    }
    if(mobileRegex.test(mobileVal)==false){//格式不正确
        $("#mobileError").show();
        $("#mobileError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入正确的手机号');
        return;
    }

    var randomcodeReg=$("#randomcode").val();
    if(isEmpty(randomcodeReg)){
        $("#randomcodeError").show();
        $("#randomcodeError").html('<em class="icon16 u-a-cw">&nbsp;</em>请输入验证码');
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
                $("#pp-randomcode-regError").show();
                $("#pp-randomcode-regError").html('<em class="icon16 u-a-cw">&nbsp;</em>'+result.message);
                var timeTicket;
                var timeNum = 60;
                clearInterval(timeTicket);
                /*当点击获取验证码后设置60秒计时不可点击*/
                timeTicket = setInterval(function () {
                    if (timeNum>1){
                        timeNum--;
                        /*设置按钮不可点击*/
                        $("#getMobileCodeBtn").attr("onclick","");
                        $("#getMobileCodeBtn").text(timeNum+"秒后重试");
                    }else if (timeNum==1){
                        $("#getMobileCodeBtn").text("获取验证码");
                        $("#getMobileCodeBtn").attr("onclick","sendGroupPhoneRegister()");
                        timeNum = 60;
                        clearInterval(timeTicket);
                        //刷新验证码
                        $(".js-verify-refresh.c-green").click();
                    }
                },1000);
            }else{
                /*如果是验证码错误*/
                if(result.entity=="randomcode"){
                    $("#randomcodeError").show();
                    $("#randomcodeError").html('<em class="icon16 u-a-cw">&nbsp;</em>'+result.message);
                }else if(result.entity=="mobile"){/*如果是手机号错误*/
                    $("#mobileError").show();
                    $("#mobileError").html('<em class="icon16 u-a-cw">&nbsp;</em>'+result.message);
                    return;
                }else {
                    $("#requestErrorID").html('<font class="fsize12 c-orange">'+result.message+'</font>');
                }//刷新验证码
                $(".js-verify-refresh.c-green").click();
            }

        }
    })
}

function queryUnReadNum(){//查询未读消息
    $.ajax({
        type : "POST",
        dataType : "json",
        url:baselocation+"/user/ajax/queryUnReadLetter",
        cache : true,
        async : false,
        success : function(result) {
            var letter = result.entity;
            if(letter!=null) {
                //未读系统消息数
                var systemNum = letter.length;
                if(systemNum>0){
                    $("#msgCountId").attr("href","/groupuc/letter");
                }
            }
            //未读站内信数
            var letterNum = result.stationMsgNum;
            if(letterNum>0){
                $("#msgCountId").attr("href","/groupuc/privateMsg");
            }

            unReadNum = letter.length+letterNum;
            // if(isNaN(unReadNum)){
            //     unReadNum = letter.length;
            // }
            if(unReadNum!=0){
                $("#msgCountId").parent().append('<q class="red-point">&amp;nsbp;</q>');
            }
            $("#msgCountId").attr("title","您有"+unReadNum+"条未读消息");


        }
    });
}