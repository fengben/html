/*
 * 引导步骤 _2016/01/04
 * */
var bmaskFun = function() {
	var winW = document.documentElement.clientWidth,
		winH = document.documentElement.clientHeight,
		bMask = $('<div class="bg-mask"></div>').appendTo($("body"));
		bMask.css({background : "#000",width : winW,height : winH,position : "fixed",top : "0px",left : "0px",opacity : "0.5",zIndex : "99998"});
};
//首页欢迎引导
var guideOneFun = function() {
	bmaskFun();
	var guiBox = $('<div class="guiBox"></div>').appendTo($("body"));
	var guiEle = '';
		guiEle+= '<div class="of"><div class="guiWrap"><span class="guiDcole"><a class="dClose icon16 pa" title="关闭" href="javascript:void(0)">&nbsp;</a></span>';
		guiEle+= '<h2 class="hLh30"><span class="fsize20 c-333">因酷教育软件学习圈子正式上线啦！</span></h2><div class="mt20" style="line-height: 220%;">';
		guiEle+= '<p class="fsize14 c-666">学友们，在这里可以和不同兴趣的小伙伴分享、交流、互动、学习。这是最有趣的互联网教育社区平台</p>';
		guiEle+= '<p class="fsize14 c-666 mt10">创建，管理属于你自己的学习圈子，和同兴趣的人一起成长，发表自己的学习，感悟，与志同道合的学友们分享，互动。创建一场线上&线下活动，约定一下感兴趣的学友们参加，亲临体验圈子文化的氛围...</p>';
		guiEle+= '<div class="mt20"><a href="/indexGuide" class="guiBtn">快快约起来~</a></div>';
		guiEle+= '</div></div></div>';
		guiBox.html(guiEle);
		
	$(".guiDcole>.dClose,.guiBtn").bind("click", function() {guiBox.remove();$(".bg-mask").remove();});
};
//首次注册成功引导
var guideRegFun = function() {
	bmaskFun();
	var userInfo = $(".userinfo"),
        userAvatar = $(".u-h-avatar"),
        uGroup = $(".nav-pc>ul>li").eq(1),
		grOneTop = parseInt(userInfo.offset().top),
		grOneLeft = parseInt(userInfo.offset().left),
		grTwoTop = parseInt(userAvatar.offset().top),
		grTwoLeft = parseInt(userAvatar.offset().left),
		grThrTop = parseInt(uGroup.offset().top),
		grThrLeft = parseInt(uGroup.offset().left);
	var grEle = '';
		grEle += '<div class="grOne" style="top:'+grOneTop+'px;left:'+grOneLeft+'px;"><div class="pr"><a href="javascript: void(0)" title="知道了" class="grBtn grBtn1"><img src="/static/gro/img/pic/guide-1.png" width="326" height="244" class="dis"></a></div></div>';
	    grEle += '<div class="grTwo undis" style="top:'+grTwoTop+'px;left:'+grTwoLeft+'px;"><div class="pr"><a href="javascript: void(0)" title="知道了" class="grBtn grBtn2"><img src="/static/gro/img/pic/guide-2.png" width="439" height="268" class="dis"></a></div></div>';
	    grEle += '<div class="grThr undis" style="top:'+grThrTop+'px;left:'+grThrLeft+'px;"><div class="pr"><a href="javascript: void(0)" title="知道了" class="grBtn grBtn3" onclick="addGuide(2)"><img src="/static/gro/img/pic/guide-3.png" width="241" height="213" class="dis"></a></div></div>';
	
	$("body").append(grEle);
	$(".grBtn1").bind("click", function() {
		$(".grOne").fadeOut("fast");
		$(".grTwo").fadeIn("fast");
	});
	$(".grBtn2").bind("click", function() {
		$(".grTwo").fadeOut("fast");
		$(".grThr").fadeIn("fast");
	});
	$(".grBtn3").bind("click", function() {
		$(".grThr").hide();
		$(".bg-mask").remove();
		$(this).attr({"href":"/group/groupList","target":"_blank"});
	});
};
//创建小组成功后小组主页引导
var guideGroupFun = function() {
	bmaskFun();
	var groApple = $(".apple-group"),
		groSend = $(".zy-fb-cj-btn>a:first"),
		groCre = $(".zy-fb-cj-btn>a:last"),
		groAll = $(".groAllBtn"),
		groATop = parseInt(groApple.offset().top),
		groALeft = parseInt(groApple.offset().left),
		groSTop = parseInt(groSend.offset().top),
		groSLeft = parseInt(groSend.offset().left),
		groCTop = parseInt(groCre.offset().top),
		groCLeft = parseInt(groCre.offset().left),
		groALTop = parseInt(groAll.offset().top),
		groALLeft = parseInt(groAll.offset().left);
	var gGElem = '';
		gGElem += '<div class="ggOne" style="top:'+groATop+'px;left:'+groALeft+'px;"><div class="pr"><a href="javascript: void(0)" title="知道了" class="grBtn grBtn4"><img src="/static/gro/img/pic/guide-4.png" width="488" height="160" class="dis"></a></div></div>';
		gGElem += '<div class="ggTwo undis" style="top:'+groSTop+'px;left:'+groSLeft+'px;"><div class="pr"><a href="javascript: void(0)" title="知道了" class="grBtn grBtn5"><img src="/static/gro/img/pic/guide-5.png" width="311" height="193" class="dis"></a></div></div>';
		/*gGElem += '<div class="ggThr undis" style="top:'+groCTop+'px;left:'+groCLeft+'px;"><div class="pr"><a href="javascript: void(0)" title="知道了" class="grBtn grBtn6"><img src="/static/gro/img/pic/guide-6.png" width="390" height="206" class="dis"></a></div></div>';*/
		gGElem += '<div class="ggFou undis" style="top:'+groALTop+'px;left:'+groALLeft+'px;"><div class="pr"><a href="javascript: void(0)" title="知道了" class="grBtn grBtn7" onclick="addGuide(3)"><img src="/static/gro/img/pic/guide-7.png" width="223" height="242" class="dis"></a></div></div>';
	
	$("body").append(gGElem);
	$(".grBtn4").bind("click", function() {
		$(".ggOne").fadeOut("fast");
		$(".ggTwo").fadeIn("fast");
	});
	$(".grBtn5").bind("click", function() {
		/*$(".ggTwo").fadeOut("fast");
		$(".ggThr").fadeIn("fast");*/
		$(".ggTwo").fadeOut("fast");
		$(".ggFou").fadeIn("fast");
	});
	$(".grBtn6").bind("click", function() {
		$(".ggThr").fadeOut("fast");
		$(".ggFou").fadeIn("fast");
	});
	$(".grBtn7").bind("click", function() {
		$(".ggFou").fadeOut("fast");
		$(".bg-mask").remove();
	});
};

var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
var bIsMidp = sUserAgent.match(/midp/i) == "midp";
var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
var bIsAndroid = sUserAgent.match(/android/i) == "android";
var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
var browserRedirectOne = function() {
	if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		return false;
	} else {
		guideOneFun(); //首页欢迎引导
	};
};
var browserRedirectTwo = function() {
	if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		return false;
	} else {
		guideRegFun(); //首次注册引导
	};
};
var browserRedirectThr = function() {
	if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		return false;
	} else {
		guideGroupFun(); //创建小组成功后小组主页引导
	};
};

//添加引导  0未引导 1已引导 
function addGuide(state){
	$.ajax({
		url:baselocation+"/user/ajax/addGuide",
		data:{
			"state":state
		},
		dataType:"json",
		type:"post",
		success:function(result){
			
		}
	})
}