/**
 * 头部h5 公共搜索处理
 */
var searchType='COURSE';//默认课程
function searchTypeH5(type){
    searchType=type;
    if(type == "TEACHER") {
        $(".i_h_gb_s_input").attr("name","queryTeacher.name");
        $(".i_h_gb_s_input").attr("placeholder","请输入老师名称");
        $("#headerformH5Search").attr("action",baselocation+"/front/teacherlist");
    }else if (type == "ARTICLE") {
        $(".i_h_gb_s_input").attr("name","queryArticle.queryKey")
        $(".i_h_gb_s_input").attr("placeholder","请输入资讯名称")
        $("#headerformH5Search").attr("action",baselocation+"/front/articlelist/article");
    }else if (type == "LINEARTICLE") {
        $(".i_h_gb_s_input").attr("name","queryArticle.queryKey")
        $(".i_h_gb_s_input").attr("placeholder","请输入面授资讯名称")
        $("#headerformH5Search").attr("action",baselocation+"/articlelist/lineArticle");
    }else if (type=="LIVES"){
        $(".i_h_gb_s_input").attr("name","queryCourse.courseName")
        $(".i_h_gb_s_input").attr("placeholder","请输入直播名称")
        $("#headerformH5Search").attr("action",baselocation+"/front/showLivelist");
    }else if (type == "QUESTIONS") {

    }else if (type == "LINECLASS") {
        $(".i_h_gb_s_input").attr("name","queryCourse.courseName")
        $(".i_h_gb_s_input").attr("placeholder","请输入面授课名称")
        $("#headerformH5Search").attr("action",baselocation+"/lineclass/list");
    }else if (type=="EXAM"){
        $(".i_h_gb_s_input").attr("name","queryPaper.name")
        $(".i_h_gb_s_input").attr("placeholder","请输入试卷名称")
        $("#headerformH5Search").attr("action",baselocation+"/exam/examList");
    }else if (type=="CLASS"){
        $(".i_h_gb_s_input").attr("name","queryCourse.courseName")
        $(".i_h_gb_s_input").attr("placeholder","请输入班级名称")
        $("#headerformH5Search").attr("action",baselocation+"/front/classlist");
    }else {
        $(".i_h_gb_s_input").attr("name","queryCourse.courseName")
        $(".i_h_gb_s_input").attr("placeholder","请输入课程名称")
        $("#headerformH5Search").attr("action",baselocation+"/front/showcoulist");
    }

    //获取搜索历史
    var keyWords=unescape(getCookie(searchType));
    if(isNotEmpty(keyWords)&&keyWords!="null"){
        var keyWordsArr=keyWords.split("|");
        var cookieKeyWordHtml="";
        for(var i=0;i<keyWordsArr.length;i++){
            if(isNotEmpty(keyWordsArr[i].trim())&&keyWordsArr[i]!="null"){
                cookieKeyWordHtml+=
                    '<li>'+
                    '<div class="seach-g-all-infor">'+
                    '<a href="javascript:void (0)" title="" onclick="clicksearch(this,\''+keyWordsArr[i]+'\')" class="seach-a-name"><em class="seach-f-a-li-ico">&nbsp;</em>'+keyWordsArr[i]+'</a>' +
                    '<a href="javascript:void (0)" onclick="delCookie(this,\''+keyWordsArr[i]+'\')" class="seach-a-clear">&nbsp;</a>'+
                    ' </div>'+
                    ' </li>'
                /*'<li>'+
                 '	<div class="seach-g-all-infor">'+
                 '		<em class="icon24 list_search_ioc vam" onclick="clicksearch(this,\''+keyWordsArr[i]+'\')">&nbsp;</em>'+
                 '			<font class="fsize16 c-999 vam">'+keyWordsArr[i]+'</font>'+
                 '	</div>'+
                 '	<a href="javascript:void(0)" onclick="delCookie(this,\''+keyWordsArr[i]+'\')" class="i_cm_close">'+
                 '		<em class="icon24 close_ico">&nbsp;</em>'+
                 '	</a>'+
                 '</li>'*/;
            }
        }

        if(isNotEmpty(cookieKeyWordHtml)){
            $(".seach-group-all").html(cookieKeyWordHtml);
            $(".mo-all-seach-warp  .no-data-wrap").hide();
            $("ul.seach_group_ul").show();
        }
    }

};

/**
 * 点击某个 关键词 搜索
 */
function clicksearch(obj,keyword){
    $("#headerformH5Search").find("input").val(keyword);
    $("#headerformH5Search").submit();
}

/**
 * 提交设置cookie
 */
function searchKeyWord(obj){
    var keyWord=$(obj).find("input").val();
    if(isNotEmpty(keyWord)){
        var cookiekeyWords=unescape(getCookie(searchType));
        cookiekeyWords=cookiekeyWords.replace(keyWord+"|","");
        setCookie(searchType, keyWord+"|"+cookiekeyWords);
    }

}

/**
 * 删除单个
 * @param obj
 * @param keyWords
 */
function delCookie(obj,keyWords){
    var cookiekeyWords=unescape(getCookie(searchType));
    cookiekeyWords=cookiekeyWords.replace(keyWords+"|","");
    setCookie(searchType, cookiekeyWords);
    $(obj).parent().parent().remove();
    if ($(".seach-group-all li").length==0){
        $(".mo-all-seach-warp .seach-group-all").hide();
        $(".mo-all-seach-warp  .no-data-wrap").show();
    }
}

/**
 * 清空所有
 */
function cleakCookieKeyword(){
    setCookie(searchType, "");
    $(".mo-all-seach-warp  .seach-group-all").hide();
    $(".mo-all-seach-warp  .no-data-wrap").show();
}