$(function() {
	cSortFun(); //分类更多按钮交互效果
	scrollLoad(); //响应滚动加载课程图片

	$("#headerSearchName").val($("#hiddenCourseName").val());
	$("#h5HeaderSearchName").val($("#hiddenCourseName").val());
});
//sort suMore
var cSortFun = function() {
	$(".c-s-dl>dl .c-s-more").each(function() {
		var _this = $(this),
			_uList = _this.siblings("ul"),
			_uLw = _uList.height();
		if (_uLw <= "50") {
			_this.hide();
		} else {
			_uList.css("height","40px");
			_this.hover(function() {
				_this.children(".icon-gd").addClass("current");
				_this.children(".m-a-box").show();
			},function(){
				_this.children(".icon-gd").removeClass("current");
				_this.children(".m-a-box").hide();
			});
			//把overflow：hidden 的li追加到 .m-a-b-more
			$(_uList).children("li").each(function(index,tag){
				if($(tag).position().top>$(_uList).find("li").eq(0).position().top){
					var aHtml=$(tag).html();
					$(".m-a-b-more").append(aHtml);//追加节点
				}
			})
		}
	});
};

/**
 * 不同条件查询课程 
 * @param type 1班类型（专业） 2讲师 3排序条件
 * @param keyWord type==1(专业ID) type==2(老师ID) type=3(排序条件)
 */
function submitForm(type,keyWord){
	if(type==1){
		$("input[name='queryCourse.subjectId']").val(keyWord);
	}else if(type==2){
		$("input[name='queryCourse.teacherId']").val(keyWord);
	}else if(type==3){
		$("input[name='queryCourse.order']").val(keyWord);
	}else if(type==4){
		if(keyWord=='DESCENDING'){
			$("input[name='queryCourse.order']").val('ASCENDING');
		}else if(keyWord=='ASCENDING'){
			$("input[name='queryCourse.order']").val('DESCENDING');
		}else{
			//默认倒序
			$("input[name='queryCourse.order']").val('ASCENDING');
		}
	}
	else if(type==5){
		$("input[name='queryCourse.sellType']").val(keyWord);
	}
	else if(type==6){
        if(keyWord=='NEW'){
            $("input[name='queryCourse.order']").val('ascNew');
        }else if(keyWord=='ascNew'){
            $("input[name='queryCourse.order']").val('NEW');
        }else{
            //默认倒序
            $("input[name='queryCourse.order']").val('NEW');
        }
	}
	else if(type==7){
        if(keyWord=='FOLLOW'){
            $("input[name='queryCourse.order']").val('ascFollow');
        }else if(keyWord=='ascFollow'){
            $("input[name='queryCourse.order']").val('FOLLOW');
        }else{
            //默认倒序
            $("input[name='queryCourse.order']").val('FOLLOW');
        }
	}

	$("input[name='queryCourse.courseName']").val($("#headerSearchName").val());

	$("#searchForm").submit();
}
/*手机端选专业*/
function mobileSubmitForm(keyWord) {
	$("input[name='queryCourse.subjectId']").val(keyWord);


	/*根据class获取子集*/
	var subjectClass =".subject"+ keyWord;
	/*如果数量大于0 就显示子集*/
	if ($(subjectClass).size()>0){
		$(".childSubject").hide();
		$(subjectClass).show();
		return;
	}
	$("#searchForm").submit();
}
/*查询套餐课程*/
function selectPackage(obj){
	/*如果按钮被选中了*/
	if ($(obj).hasClass("check")){
		/*去掉查询套餐的条件*/
		$("#package").attr("name","");
		/*查询 套餐和课程条件为true*/
		$("#noPackage").val("true");
		if (checkIsMobile()){
			$(obj).removeClass("current");
			$(obj).removeClass("check")
		}else {
			$("#searchForm").submit();
		}

	}else {
		/*如果按钮没被选中 加上查询套餐条件*/
		$("#package").attr("name","queryCourse.sellType");
		$("#package").val("PACKAGE");
		/*查询 套餐和课程条件为false*/
		$("#noPackage").val("false");
		if (checkIsMobile()){
			$(obj).addClass("current");
			$(obj).addClass("check")
		}else {
			$("#searchForm").submit();
		}
	}
}
/*查询免费课程*/
function selectFree(obj) {
	if ($(obj).hasClass("check")){
		$("#isFree").val("false");
		if (checkIsMobile()){
			$(obj).removeClass("current");
			$(obj).removeClass("check")
		}else {
			$("#searchForm").submit();
		}

	}else {
		$("#isFree").val("true");
		if (checkIsMobile()){
			$(obj).addClass("current");
			$(obj).addClass("check")
		}else {
			$("#searchForm").submit();
		}
	}
}
/*查询可砍价课程*/
function selectBargainIng(obj) {
	if ($(obj).hasClass("check")){
		$("#isBargainIng").val("false");
		if (checkIsMobile()){
			$(obj).removeClass("current");
			$(obj).removeClass("check")
		}else {
			$("#searchForm").submit();
		}

	}else {
		$("#isBargainIng").val("true");
		if (checkIsMobile()){
			$(obj).addClass("current");
			$(obj).addClass("check")
		}else {
			$("#searchForm").submit();
		}
	}
}
/*清空筛选条件*/
function clearColumn() {
	if($("#sxtj-list .current").size()>0){
		$("#sxtj-list .current").click()
	}
    $("input[name='queryCourse.memberTypeId']").val('');
    $("#member li").removeClass("current");
    $("#member li").eq(0).addClass("current");
}
/*会员类型搜索*/
function memberType(memberTypeId,obj) {
	if (checkIsMobile()){
		if (!$(obj).hasClass("current")){
			$("input[name='queryCourse.memberTypeId']").val(memberTypeId);
			$(obj).parent().addClass("current").siblings().removeClass("current");
		}
	}else {
		$("input[name='queryCourse.memberTypeId']").val(memberTypeId);
		$("#searchForm").submit();
	}
}
