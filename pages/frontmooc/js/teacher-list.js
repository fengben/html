var subjectId = $("#subjectId").val();
$(function() {
	if (subjectId == null || subjectId== 0) {
		$("#subjectAll").addClass("current");
	}else{
		$("#"+subjectId).addClass("current");
	}
	scrollLoad(); //响应滚动加载课程图片

	$("#headerSearchName").val($("#hiddenTeacherName").val());
	$("#h5HeaderSearchName").val($("#hiddenTeacherName").val());
});

/**
 * 条件查询
 */
function submitForm(val){
	$("input[name='queryTeacher.subjectId']").val(val);
	$("#hiddenTeacherName").val($("#headerSearchName").val());
	$("#searchForm").submit();
}