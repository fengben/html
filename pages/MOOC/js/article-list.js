$(function() {
	articleRecommend();//好文推荐
	scrollLoad(); //响应滚动加载课程图片
	$("#headerSearchName").val($("#articleQueryKey").val());
	$("#h5HeaderSearchName").val($("#articleQueryKey").val());
});

//好文推荐  subjectType 资讯的分类类型
function articleRecommend() {
	$.ajax({
		url : baselocation + '/front/ajax/recommend?type='+subjectType,
		type : 'post',
		async : true,
		dataType : 'text',
		success : function(result) {
			$(".articleRecommend").html(result);
		}
	});
}