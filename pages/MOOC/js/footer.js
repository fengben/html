//购物车数量
var numberItem = 0;
$(function(){
	scPos();
	sideNav();
	//显示购物车数量
	showshopnums();
	goTopFun();//返回顶部
	goTopFun2();
	mtitShow();
	optionShow();
	gnFun();//移动端底部导航变色
	$(".r-fix-box.r-fix-box>ul>li").mouseenter(function(){
		$(this).find(".smgz-pic").show("normal");
	}).mouseleave(function(){
		$(this).find(".smgz-pic").hide();
	});
	//底部二维码ios兼容
	footerweima();
});
$(window).resize(function() {scPos();});
function scPos() {
	var winW = $(window).height();
	$("#s-car-box-middle").css({"height" : winW-110 + "px","overflow-y" : "auto","overflow-x" : "hidden"});
}
//底部二维码ios兼容
function footerweima(){
	$(".gf-tx").on("touchstart", touchStart);
	$(".gf-tx").on("touchend", touchEnd);

	function touchStart(event) {
		$(this).find(".gf-tx-ewm").css("opacity","1");
	}
	function touchEnd(event) {
		$(this).find(".gf-tx-ewm").css("opacity","0");
	}
}

function sideNav(){
	if(checkIsMobile()){      // 移动端环境下效果
		return false;
	} else {

		var vBtn=$("#v-nav-first"),
			naxBox=$(".r-fixed-wrap");
		vBtn2=$("#v-nav-close"),
			vBtn.click(function(e) {
				if(!vBtn.hasClass("vBtnCurr")){
					naxBox.stop().animate({"right" : "0"}, 400);
					vBtn.addClass("vBtnCurr");
					$("html").addClass("onScroll");
				}else{
					ccrFun();
				}
				stopFunc(e);
			});
		vBtn2.click(function(e) {
			ccrFun();
			stopFunc(e);
		});
		/*$(document).click(function() {
		 ccrFun();
		 });*/
		$("#shopcarthtml .s-car-close").click(function() {
			ccrFun();
		});
		function ccrFun() {
			naxBox.stop().animate({"right" : "-279px"}, 400);
			vBtn.removeClass("vBtnCurr");
			$("html").removeClass("onScroll");
		}
		function stopFunc(e) {
			document.all ? event.cancelBubble = true : e.stopPropagation();
		}

	}
}

function goTopFun2() {
	var _gt = $("#goTopBtn2");
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
 * 查询购物车列表
 */
function shopCartHtml(){
	$.ajax({
		type:'post',
		dataType:'text',
		data:{},
		url:baselocation+'/shopcart/ajax/headerShopCartinfo?type=1',
		async:false,
		success:function (result){
			$("#shopcarthtml").html(result);
			/*if(isNotEmpty(result)){
			 $("#studulist").removeClass('undis').html(result);
			 }else{
			 $("#nocoursebug").removeClass('undis');
			 }*/
		}
	});
}

//删除购物车
function deleteCartId(id,goodsid,type) {
	$.ajax({
		url : baselocation + "/shopcart/ajax/deleteShopitem",
		data : {
			"id":id,
			'goodsid' : goodsid,
			"type":type
		},
		type : "post",
		dataType : "json",
		async : false,
		cache : false,
		success : function(result) {
			shopCartHtml();
			//显示购物车数量
			showshopnums();
		}
	});
}

/**
 * 显示购物车数量
 */
function showshopnums(){
	return;
	$.ajax({
		url:"/shopcart/ajax/shopcartnums",
		data:{"type":1},
		type : "post",
		dataType : "json",
		success: function (result){
			if(result.entity && isNotNull(result.entity ) && result.entity.shopCartNum>0){
				$("#shopCartNum").html(result.entity.shopCartNum);
				numberItem = result.entity.shopCartNum;
			}else{
				$("#shopCartNum").html(0);
				numberItem = 0;
			}
		}
	});
}
//邀请好友复制链接
function copyContent(){
	var Url=document.getElementById("copyContent");
	Url.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
	msgshow("复制成功","true");
}
//移动端底部导航变色
function gnFun() {
	var cC = "#d44920",
		oC = "#333",
		oL = $("#gn-ul>li"),
		timer = null;
	oL.each(function() {
		var _this = $(this),
			_svg = _this.find("svg"),
			_sFi = _svg.find("path");
		if (_this.hasClass("current")) {
			_sFi.attr("fill" , cC);
		} else {
			_sFi.attr("fill" , oC);
		}
	})
}

/**
 * h5底部 我的 按钮点击，未登录弹出 登陆框 ， 登陆后 右侧展开
 */
function h5FooterMyLogin() {
	if(isLogin()){
		$(".mw-nav-btn").click();
	}else{
		lrFun();
	}
}