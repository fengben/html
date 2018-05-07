var isok=$("#isok").val();
var invitationCode = $("#invitationCode").val();
var currentprice = $("#currentprice").val();
//评论课程id
var otherId = $("#otherId").val();
//课程有效期到期时间
var loseTimeTime = $("#loseTimeTime").val();
//有效期类型，0：到期时间，1：按天数
var loseType=$("#loseType").val();
//评论类型,类型2为课程
var type = $("#type").val();
var otherId = $("#otherId").val();

$(function() {
	shareShow(); //课程分享
    //treeMenuThree();
    tcLw();//相关套餐课程宽度
	replyFun(); //回复展开
	cTabFun($("#c-i-tabTitle>a")); //滚动定位
	queryComment();//评论
	//学过此课程的用户
	getCourseLearnedUser(otherId);
    bjRwidth();//班级右侧宽度
    cTabFun($("c-i-tabTitle-bj>a"));//滚动定位
    muFix();//滚动固定定位目录选择卡

	var render = "canvas";
	try {
		//默认字符串转二维码的方法，仅支持html5
		document.createElement('canvas').getContext('2d');
	} catch (e) {
		//如果不支持html5报错后通过table生成二维码
		render = "table";
	}
	//生成二维码
	$('#output').qrcode({
		text: baselocation+"/front/classinfo/"+otherId+"?IvtFrom=CLASS&IvtCode="+invitationCode+"&courseId="+otherId,
		height: 120,
		width: 120,
		render: render,
		src: '/favicon.ico'//这里配置Logo的地址即可。
	});
	/*if (checkIsMobile()==false){
		/!*计算课程详情部分高度 赋值给简介部分高度*!/
		var packgeHeight =0;
		if ($(".coursePackge").size()>0){
			packgeHeight = $(".coursePackge").height();
		}
		var height = $(".c-infor-box").height()-packgeHeight;
		if ($(".cou-in-boc").height()<height){
			$(".cou-in-boc").css("min-height",height);
		}
	}*/

});
//课程详情收起展开
var ctbodyFun = function() {
	var ctb = $(".course-txt-body"),
		ctBtn = $(".ctb-btn>a");
	if (ctb.height() < 88) {
		ctBtn.parent().hide();
		ctb.css({"visibility" : "visible"});//默认隐藏，然后显示
		return false;
	} else {
	    /*课程简介显示全部*/
		ctb.css({"height" : "auto"});
		ctb.css({"visibility" : "visible"});//默认隐藏，然后显示
		ctBtn.parent().show();
		ctBtn.toggle(function() {
			ctBtn.text("收起更多∧");
			ctb.stop().animate({"height" : "100%"}, 500);
		}, function() {
			ctBtn.text("查看更多∨");
			ctb.css({"height" : "auto"});
		});
	}
};

$.fn.toggle = function( fn ) {
	// Save reference to arguments for access in closure
	var args = arguments,
		guid = fn.guid || jQuery.guid++,
		i = 0,
		toggler = function( event ) {
			// Figure out which function to execute
			var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
			jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ lastToggle ].apply( this, arguments ) || false;
		};

	// link all the functions, so any of them can unbind this click handler
	toggler.guid = guid;
	while ( i < args.length ) {
		args[ i++ ].guid = guid;
	}

	return this.click( toggler );
};

//班级封面图适配尺寸
var cvbjPic = function() {
    if($(".c-v-pic").height()>0){
        $(".c-v-pic-wrap-bj").css("height" , $(".c-v-pic").height());
    }

};
//调整页面兼容问题等图片完全加载完成之后再调方法
var t_img; // 定时器
var isLoad = true; // 控制变量
// 判断图片加载状况，加载完成后回调
isImgLoad(function(){
	// 加载完成
    cvbjPic();
});

// 判断图片加载的函数
function isImgLoad(callback){
	// 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
	// 查找所有封面图，迭代处理
	$('.c-v-pic').each(function(){
		// 找到为0就将isLoad设为false，并退出each
		if(this.height === 0){
			isLoad = false;
			return false;
		}
	});
	// 为true，没有发现为0的。加载完毕
	if(isLoad){
		clearTimeout(t_img); // 清除定时器
		// 回调函数
		callback();
		// 为false，因为找到了没有加载完成的图，将调用定时器递归
	}else{
		isLoad = true;
		t_img = setTimeout(function(){
			isImgLoad(callback); // 递归扫描
		},500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
	}
}

window.onresize = function() {cvbjPic();};

var cShopcar=function(){
	// 元素以及其他一些变量
	var eleFlyElement = document.querySelector("#flyItem"), eleShopCart = document.querySelector("#shopCart");

	// 抛物线运动
	var myParabola = funParabola(eleFlyElement, eleShopCart, {
		speed: 400, //抛物线速度
		curvature: 0.0008, //控制抛物线弧度
		complete: function() {
			eleFlyElement.style.visibility = "hidden";
			eleShopCart.querySelector("tt").innerHTML = ++numberItem;
		}
	});
	// 绑定点击事件
	if (eleFlyElement && eleShopCart) {

		[].slice.call(document.getElementsByClassName("btnCart")).forEach(function(event) {
			//button.addEventListener("click", function(event) {
			//button.click(function(event) {
			//var src = $(this).parent().parent().parent().parent().siblings(".c-v-pic-wrap").find('.p-h-video-box').find("img").attr("src");
			var src = $("#aCoursesList").find("article.c-v-pic-wrap-bj").find('.p-h-video-box').find("img").attr("src");
			$("#flyItem").find("img").attr("src", src);
			// 滚动大小
			var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
				scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
			eleFlyElement.style.left = event.clientX + scrollLeft + "px";
			eleFlyElement.style.top = event.clientY + scrollTop + "px";
			eleFlyElement.style.visibility = "visible";

			// 需要重定位
			myParabola.position().move();
			//});
		});
	}
};

/**
 * 获得课程章节目录
 * @param num
 */
function getCourseKpointList(courseId,type) {
	goBack = "true";
	$.ajax({
		url : baselocation + "/front/ajax/classKpointList/"+courseId+"/"+type,
		data:{},
		type : 'post',
		dataType : 'text',
		success : function(result) {
			$("#courseKpointMenu").html(result);
			// treeMenu(); //课程树
		}
	});
}
var setting={
	view: {
		showIcon: true,//是否显示节点图片
		dblClickExpand: false,//是否双击展开节点
		showLine: true,//是否显示节点之间的连接线
		selectedMulti: false,//是否可以按Ctrl键选择多个节点
		nameIsHTML:true
	},
	data: {
		simpleData: {
			enable:true,//true  false 分别表示 使用  不使用 简单数据模式
			idKey: "kpointId",//节点数据中保存唯一标识的属性名称,enable = true 时生效
			pIdKey: "parentId"//节点数据中保存其父节点唯一标识的属性名称。[setting.data.simpleData.enable = true 时生效]
		},
		key: {
			name: "name",//标明节点的显示属性
			title:"name"
		}
	},
	callback: {
		//当单击时触发的方法，三个参数是固定的
		onClick:  function(event,treeId, treeNode) {
			if(!treeNode.isParent){
				//1免费
				var videoUrl = treeNode.videoUrl;
				if(videoUrl!=null && $.trim(videoUrl)!=''){
					if(treeNode.free==1){
						playVideo(videoUrl);
					}else if(treeNode.free==2){//收费
						if(isok==true){
							playVideo(videoUrl);
						}
					}
				}
			}
		}
	}
};

/**
 * 显示分享组件
 */
function shareShow() {
	$(".kcShare").hover(function() {
		$(this).stop().animate({"width" : "190px"}, 200);
		$(this).children("#bdshare").stop().animate({"right" : "0"}, 200);
	}, function() {
		$(this).stop().animate({"width" : "50px"}, 200);
		$(this).children("#bdshare").stop().animate({"right" : "-160px"}, 200);
	});
}

/**
 * 立即购买
 * @param courseId 课程ID
 */
function buyNow(courseId,type){
	if(chcckCourseBuy(courseId,type)){
		dialog('提示',"您已购买过此班级！",1);
		return;
	}

	var loseTime = new Date(loseTimeTime.replace(/\-/g, "\/"));
	//到期类型
	if(loseType=='0'){
		var nowDAte = new Date();
		if(loseTime>nowDAte){
			//添加到购物车 并跳转
			window.location.href="/shopcart?goodsid="+courseId+"&type=1&command=addShopitem";
		}else{
			dialog('提示',"对不起，课程已过期!",1);
		}
	}else{
		//添加到购物车 并跳转
		window.location.href="/shopcart?goodsid="+courseId+"&type=1&command=addShopitem";
	}
		
}

/**
 * 收藏课程
 * @param courseId 课程ID
 */
function favorites(courseId,obj){
	if(isLogin()){
		$.ajax({
			url:baselocation+'/front/createfavorites/'+courseId,
			type:'post',
			dataType:'json',
            data:{"type":'CLASS'},
			success:function(result){
				if(result.success==false){
					msgshow(result.message,"false","3000");
				}else{
					$(obj).attr("onclick","deleteFaveorite("+courseId+",this)").addClass("sc-end").attr("title","取消收藏").find("tt").html("取消收藏");
					msgshow(result.message,"success","3000");
				}
			}
		});
	}else{
		lrFun();
	}
}

/**
 * 取消收藏
 * @param favoriteId
 */
function deleteFaveorite(courseId,obj) {
	$.ajax({
		url:'/uc/deleteFaveorite/'+courseId,
		type:'post',
		data:{"type":'CLASS'},
		dataType: 'json',
		success: function (result) {
			if(result.success==false){
				msgshow(result.message,"false","3000");
			}else{
				$(obj).attr("onclick","favorites("+courseId+",this)").removeClass("sc-end").attr("title","收藏").find("tt").html("收藏");
				msgshow(result.message,"success","3000");
			}
		}
	})
}

//视频试听播放方法
function vedioClick(freeVideoId,kpointListIsNull,isClass){
	if(isClass=="OFF"){
        dialog('提示',"请在开班时间内学习!",1);
	}else {
        if(kpointListIsNull=="true"){
            dialog('提示',"该课程还没有课程节点!",1);
        }else{
            if(freeVideoId!=""&&freeVideoId!=0&&freeVideoId!=null)
            {
                // 播放视频
                getPlayerHtml(freeVideoId,1,"");
            }else{
                dialog('提示',"该课程暂不支持试听!",1);
            }
        }
	}




}


/**
 * 加入购物车
 * @param courseId
 */
function addShoppingCart(courseId,type){
	if(chcckCourseBuy(courseId,type)){
		dialog('提示',"您已购买过此班级！",1);
		return;
	}

	var loseTime = new Date(loseTimeTime.replace(/\-/g, "\/"));
	//到期类型
	if(loseType=='0'){
		var nowDAte = new Date();
		if(loseTime>nowDAte){
			toShoppingCart(courseId,type);
		}else{
			dialog('提示',"对不起，班级已过期!",1);
		}
	}else{
		toShoppingCart(courseId,type);
	}
}

/*
* 到加入购物车
*/
function toShoppingCart(courseId,type){

	//添加到购物车
	$.ajax({//验证课程金额
		url:baselocation+"/course/check/"+courseId,
		type:"post",
		dataType:"json",
        data:{"type":type},
		success:function(result){
			if(result.message!='true'){
				dialog('提示信息',result.message,1);
			}else{
				//添加到购物车
				$.ajax({//验证课程金额
					url:baselocation+"/shopcart/ajax/add",
					data:{
						"goodsid":courseId,
						"type":"1"
					},
					type:"post",
					dataType:"json",
					success:function(result){
						if(result.success!=true){
							dialog('提示信息',result.message,1);
						}else{
							if(checkIsMobile()){
                                msgshow("加入购物车成功","true");
							}else {
                                cShopcar();//购物车飞入效果
								//重新查询购物车右侧列表
								shopCartHtml();
                            }
						}
					}
				})
			}
		}
	})

}
/*课程简介、列表、评论点击切换显示对应内容*/
function selectCourseInfo(infoId) {
	$("#courseContext,#courseList,#courseComment").hide();
	$("#"+infoId).show();
    /*记下父级div高度*/
	if (checkIsMobile()==false){
        $(".cou-in-boc").height("auto");
        var packgeHeight =0,
			Height=$(".coursePackge").height();
        if ($(".coursePackge").size()>0){
            packgeHeight = $(".coursePackge").css("min-height",Height+40);
        }
        var originalHeight = $(".c-infor-box").css("min-height",Height+40);
        var height = $(".cou-in-boc").height();
        /*如果小于要切换出的模块高度 将他的高度设置为auto */
        if (height<$("#"+infoId).height()){
            $(".cou-in-boc").height("auto");
        /*如果不小于要切换出的模块高度 则将高度设置为原高度 */
        }else if ($("#"+infoId).height()<height){
            $(".cou-in-boc").css("min-height",originalHeight);
        }
	}
}
/*选择显示对应的套餐
* num 套餐对应的index
 */
function packageCourse(num,obj) {
	/*隐藏所有套餐*/
	$(".packageCourse").hide();
	/*显示选择的套餐*/
	$("#packageCourse"+num).show();
	/*移除所有选中状态*/
	$(obj).parent().find("a").removeClass("current");
	/*给点击的按钮加选中状态*/
	$(obj).addClass("current");
}
/*班级右侧宽度计算*/
function bjRwidth() {
	var bigW = $(".cours-big-box").width()-40;
	var smLw = $(".c-v-pic-wrap-bj").width();
	var smRw = bigW-smLw;
	if(!checkIsMobile()){
		$(".c-attr-wrap-bj").css({"float":"left","width":smRw});
	}else {
        $(".c-attr-wrap-bj").css({"float":"inherit","width":"100%"});
	}
}
window.onresize = function() {bjRwidth();};
/*相关套餐课程宽度*/
function tcLw() {
    var allW = $("#i-live-cou-list").width();
    if (!checkIsMobile()){
        $(".tctj-warp .comm-course-list li").css("width",allW/3);
    }else {
        $(".tctj-warp .comm-course-list li").css("width",allW);
    }
}


//tree menu
/*function treeMenuThree() {

    //一级目录
    $("#lh-menu div.all-big-name").each(function() {
        /!*打开课程章节列表显示所有章节*!/
        var _this = $(this);
        _this.siblings("ul.new-ej-lh-menu").slideDown(150);
        _this.addClass("current-1");
        _this.click(function() {
            if (_this.siblings("ul.new-ej-lh-menu").is(":hidden")) {
                _this.siblings("ul.new-ej-lh-menu").slideDown(150);
                _this.addClass("current-1");
                //_this.parent("li").siblings().children("ol").slideUp(150);
                //_this.parent("li").siblings().children("a:first").removeClass("current-1");
            } else {
                _this.siblings("ul.new-ej-lh-menu").slideUp(150);
                _this.removeClass("current-1");
            }
        });

        //二级章节
        var _twoThis=_this.siblings("ul.new-ej-lh-menu").find("a.l-m-stitle");

        _twoThis.addClass("current-1");
        _twoThis.next().slideDown(150);
        _twoThis.click(function() {
        	console.log(1);
            var _this2= $(this);
            if (_this2.next().is(":hidden")) {
                _this2.next().slideDown(150);
                _this2.addClass("current-1");
                //_this.parent("li").siblings().children("ol").slideUp(150);
                //_this.parent("li").siblings().children("a:first").removeClass("current-1");
            } else {
                _this2.next().slideUp(150);
                _this2.removeClass("current-1");
            }
        });
    })
}*/
//滚动固定定位目录选择卡
function muFix() {
	var _topHeight=$(".cou-in-boc-title").offset().top
    var _muFun = function () {
        var sTop = parseInt(document.documentElement.scrollTop || document.body.scrollTop, 10),
            muBx = $(".cou-in-boc-title"),
            boxW = $(".cou-in-boc").width()+11;
        if (sTop > _topHeight) {
            console.log();
            muBx.addClass("class-in-l-fixed-title");
            $(".cou-in-boc-title").css("width",boxW);
        } else {
            muBx.removeClass('class-in-l-fixed-title');
            $(".cou-in-boc-title").css("width","auto");
        }
        ;
    }
    $(window).bind('scroll', _muFun);
}
//tab切换滚动定位
function cTabFun(op) {
    var cTab = op;
    cTab.each(function() {
        var _this = $(this),
            _tName = _this.attr("name");
        _this.click(function() {
            _this.parent().parent().find("a").removeClass("current");
            _this.addClass("current").siblings().removeClass("current");
            $("html,body").animate({"scrollTop":$("."+_tName+"-content").offset().top-68}, 500);
        })
    })
}


/**
 * 加入班级
 * @param courseId
 * @param currentPrice
 * @param type
 */
function joinClass(courseId,currentPrice,type,sellType,firstCourseId,isClass,isJoinClass) {

    if(isClass=="OFF" && isJoinClass=="true"){
        dialog('提示',"请在开班时间内学习!",1);
    }else {
        if(isLogin()){
            $.ajax({
                url:baselocation+"/course/free/addTrxorder",
                data:{
                    "courseId":courseId,
                    "type":type,
                    "trxorderType":sellType
                },
                type:"post",
                dataType:"json",
                success:function(result){
                    if(result.success==false){
                        msgshow(result.message,"false","3000");
                    }else{
                    	if(isClass=="OFF"){
                            dialog("提示", "加入班级成功,请在开班时间内学习!", 29, "javascript:void(0)' onclick='gratisRefresh()'");
                            // msgshow("加入班级成功,请在开班时间内学习!", "true", "1000");
                            // setTimeout('window.location.reload()',1000);
						}else {
                            window.location.href=baselocation+'/uc/play/'+firstCourseId+'/0';
						}

                    }
                }
            })
        }else{
            lrFun();
        }
	}
}

function gratisRefresh(){
    window.location.reload();
}

/**
 * 最新学员、学霸排行
 */
function showClassUserList(obj,showId) {
    $(obj).addClass("current").parent().siblings().children("a").removeClass("current");
    $("#" + showId).show().siblings().hide();
}

/**
 * 查询班级动态
 * @param classId
 */
function getClassDynamic(classId) {
    $.ajax({
        url : baselocation + "/front/ajax/getClassDynamic/"+classId,
        data:{},
        type : 'post',
        dataType : 'text',
        success : function(result) {
            $("#classDynamicList").html(result);
        }
    });
}


/**
 * 立即砍价
 * @param courseId 课程ID
 */
function bargain(courseId,type,bargainActivityId){
	if(!isLogin()){
		lrFun(1,'reload');
		return;
	}
	if(chcckCourseBuy(courseId,type)){
		dialog('提示',"您已购买过此班级！",1);
		return;
	}
	//获取砍价发布id
	var bargainPublishId=addbargainPublish(bargainActivityId);
	var loseTime = new Date(loseTimeTime.replace(/\-/g, "\/"));
	//到期类型
	if(loseType=='0'){
		var nowDAte = new Date();
		if(loseTime>nowDAte){
			if(bargainPublishId!=0){
				//跳转到砍价页面
				window.location.href="/front/bargain/"+bargainPublishId;
			}

		}else{
			dialog('提示',"对不起，班级已过期!",1);
		}
	}else{
		if(bargainPublishId!=0){
			//跳转到砍价页面
			window.location.href="/front/bargain/"+bargainPublishId;
		}
	}

}