//全局变量default布局中重新赋值
var baselocation = "";
var keuploadSimpleUrl="";//kindeditor中使用的路径需要2个参数来区分项目和模块
var uploadSimpleUrl="";//单独的上传按钮使用的路径
var uploadServerUrl="";//上传服务用服务器地址
var staticServer="";//静态服务器地址
var mydomain =$("#mydomain").val();//主站域
/**
 * 验证前台学员是否已经登录 
 * @returns true登录 false未登录
 */
function isLogin(){
	var is = false;
	var user = getLoginUser();
	if(user!=null && user.userId>0){
		is=true;
	}
	return is;
}

/**
 * 获取登录学员
 * @returns User
 */
function getLoginUser(){
	var user = null;
	// account=$.cookie('mooc_login_name');
	account = localStorage.getItem("loginName")
	//para = "account=" + account
	$.ajax({
		// url:baselocation+'/user/ajax/getloginUser',
		url: homeAddress()+"one/mainmooc/getLoginUser.template",
		type:'post',
		async:false,
		dataType:'json',
		 data: {
                "account": account,// staff@qq.com   template里面@被替换成了%40
            },
		success:function(result){
			user = result;
		}
	});
	// user=$.cookie('mooc_login_name');

	return user;
}
/*获取vip开通信息*/
function getVipInfo() {
	var vipInfo = null;
	$.ajax({
		url:baselocation+'/user/ajax/getVipInfo',
		type:'post',
		async:false,
		dataType:'json',
		success:function(result){
			vipInfo = result.entity;
		}
	});
	return vipInfo;
}
/**
 * 学员退出登录
 */
function exit() {
    // $.ajax({
    // 	url:baselocation+'/uc/exit',
    // 	type:'post',
    // 	dataType:'json',
    // 	async:true,
    // 	success:function(result){
    //        reload();
    // 	}
    // });
    // $.cookie('mooc_login_name', null);
    // $.cookie('mooc_password', null);
    logout()
    // reload();
}
function reload(){
    var url = window.location.href;
	/*如果参数中有？则用&加随机数*/
    if (url.indexOf('?')>0){
        window.location.href=window.location.href+"&solveWx="+10000*Math.random();
    }else {
        window.location.href=window.location.href+"?solveWx="+10000*Math.random();
    }
}
/**
 * 内容编辑器
 * @param id 文本域ID
 * @param width 编辑器的宽
 * @param height 编辑器的高
 * @param param文件夹名(百度编译器暂不支持,已取消)
 * @param pressText 是否添加水印(暂未配置)
 */
function initKindEditor_addblog(id, width, height,param,pressText) {
	var ue;
	if(baselocation!=uploadServerUrl){
		ue=UE.getEditor(id,{
			initialFrameHeight: height,
			initialFrameWidth:width,
			toolbars: [
				[
					'undo', //撤销
					'redo', //重做
					'bold', //加粗
					'italic', //斜体
					'underline', //下划线
					'strikethrough', //删除线
					'source', //源代码
					'horizontal', //分隔线
					'fontfamily', //字体
					'fontsize', //字号
					'insertimage', //多图上传
					'link', //超链接
					'emotion', //表情
					'map', //Baidu地图
					'justifyleft', //居左对齐
					'justifyright', //居右对齐
					'justifycenter', //居中对齐
					'justifyjustify', //两端对齐
					'forecolor', //字体颜色
					'backcolor', //背景色
					'fullscreen', //全屏
					'pagebreak', //分页
					'imagenone', //默认
					'imageleft', //左浮动
					'imageright', //右浮动
					'imagecenter', //居中
					'wordimage', //图片转存
					'lineheight', //行间距
					'edittip ', //编辑提示
					'customstyle', //自定义标题
					'background', //背景
					'template', //模板
					'music', //音乐
				]
			]
			,zIndex:200//编辑器在页面上的z-index层级的基数，默认是900
			,autoFloatEnabled: false//是否保持toolbar的位置不动，默认true
			,serverUrl: uploadServerUrl+"/controller.jsp"
		});
	}
	else if(baselocation==uploadServerUrl) {
		ue=UE.getEditor(id,{
			initialFrameHeight: height,
			initialFrameWidth:width,
			toolbars: [
				[
					'undo', //撤销
					'redo', //重做
					'bold', //加粗
					'italic', //斜体
					'underline', //下划线
					'strikethrough', //删除线
					'source', //源代码
					'horizontal', //分隔线
					'fontfamily', //字体
					'fontsize', //字号
					'simpleupload', //单图上传
					'insertimage', //多图上传
					'link', //超链接
					'emotion', //表情
					'map', //Baidu地图
					'justifyleft', //居左对齐
					'justifyright', //居右对齐
					'justifycenter', //居中对齐
					'justifyjustify', //两端对齐
					'forecolor', //字体颜色
					'backcolor', //背景色
					'fullscreen', //全屏
					'pagebreak', //分页
					'imagenone', //默认
					'imageleft', //左浮动
					'imageright', //右浮动
					'imagecenter', //居中
					'wordimage', //图片转存
					'lineheight', //行间距
					'edittip ', //编辑提示
					'customstyle', //自定义标题
					'background', //背景
					'template', //模板
					'scrawl', //涂鸦
					'music', //音乐
				]
			]
			,zIndex:200//编辑器在页面上的z-index层级的基数，默认是900
			,autoFloatEnabled: false//是否保持toolbar的位置不动，默认true
		});
		//复写UEDITOR的getActionUrl 方法,定义自己的Action
		UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
		UE.Editor.prototype.getActionUrl = function (action) {
			if (action == 'uploadimage' || action == 'uploadfile') {
				var id = $('#carInfoId').val();
				return uploadServerUrl + '/image/ueditorupload';
			}
			else if (action == 'uploadscrawl') {
				return uploadServerUrl + '/image/ueditoruploadscrawl';
			}
			else {
				return this._bkGetActionUrl.call(this, action);
			}
		};
	}
	return ue;
}

/**
 * 后台专用图片上传
 * @param btnId 上传组件的ID
 * @param param 图片上传目录名
 * @param callback 上传成功后的回调函数，函数接收一个参数（上传图片的URL）
 * @param pressText 是否上水印 false或空 否 true是
 *@param cutImg 是拉伸图片 false或空 否 true是
 *@param width height 图片拉伸后宽高
 */
function initSimpleImageUpload(btnId,param,callback,pressText,cutImg,width,height){
    //实例化一个plupload上传对象
    var uploader = new plupload.Uploader({
        runtimes : 'flash,html5,gears,browserplus,silverlight,html4',
        browse_button : btnId, //触发文件选择对话框的按钮，为那个元素id
        url : uploadSimpleUrl+'param='+param+'&pressText='+pressText+'&cutImg='+cutImg+'&width='+width+'&height='+height, //服务器端的上传页面地址
        chunk_size : '1mb',
        flash_swf_url : baselocation+'/static/common/plupload/js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
        silverlight_xap_url : baselocation+'/static/common/plupload/js/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
        multi_selection:false
		/*, filters: {
            mime_types : [ //只允许上传图片和zip文件
                { title : "Image files", extensions : "jpg,png,jpeg" }
                ,{ title : "Zip files", extensions : "zip" }
            ],
            max_file_size : '10mb', //最大只能上传10mb的文件
            prevent_duplicates : true //不允许选取重复文件
        }*/
    });

    //在实例对象上调用init()方法进行初始化
    uploader.init();
    //文件选择后上传
    uploader.bind('FilesAdded', function(uploader, files) {
        //自动上传
        uploader.start();

        //上传清零
        layui.use('element', function(){
            var element = layui.element;
            element.progress('demo'+btnId, '0%');
        });
    });

    //文件选择后上传
    uploader.bind('FileFiltered', function(up, file){
        //选择文件后触发
        var limitSize=10;
        if (file.size > limitSize * 1024 * 1024)
        {
            layer.msg("您上传的图片大小是" + plupload.formatSize(file.size)  + ",只能上传小于"+limitSize+"mb图片", {icon: 5, shift: 6});
            up.removeFile(file);
            return;
        }
        if(!/(jpg|png|jpeg)$/.test(file.type)){
            layer.msg("图片类型必须是.jpg,png,jpeg中的一种", {icon: 5, shift: 6});
            //layer.msg("您上传的图片格式是" + file.type + ",只能上传"+limitType+"图片", {icon: 5, shift: 6});
            up.removeFile(file);
            return;
        }
    });

    //上传完成填充数据
    uploader.bind('FileUploaded',
        function(uploader, file, responseObject) {
            $.each(file, function(idx, item){
                uploader.removeFile(item);
            });
            var result=responseObject.response;
            var data = $.parseJSON(result);
            if(data.error == 0){
                callback(data.url);
            }else {
                alert(data.message);
            }
    	}
    );

    //没有上传进度条
    if($("#"+btnId).parent().find("div[lay-filter='demo"+btnId+"']").length==0){
		//上传进度条
        $("#"+btnId).parent().append('<div style="margin-top: 15px; width:300px" id="progress_'+btnId+'">\n' +
            '            <div class="layui-progress layui-progress-big" lay-showpercent="true" lay-filter="demo'+btnId+'">\n' +
            '            <div class="layui-progress-bar layui-bg-red" lay-percent="0%"></div>\n' +
            '            </div>\n' +
            '            </div>');
	}


    uploader.bind('UploadProgress', function (uploader, file) {
        var percent = file.percent;

        //上传进度展示
        layui.use('element', function(){
            var element = layui.element;
            element.progress('demo'+btnId, percent+'%');
        });
    });
    return uploader;
}
/**
 * 前台专用图片上传
 * @param btnId 上传组件的ID
 * @param param 图片上传目录名
 * @param callback 上传成功后的回调函数，函数接收一个参数（上传图片的URL）
 */
function webImageUpload(btnId,param,callback){
		var uploadbutton = KindEditor.uploadbutton({
			button : KindEditor('#'+btnId+'')[0],
			fieldName : "uploadfile",
			url : uploadSimpleUrl+'&param='+param+'&fileType=jpg,gif,png,jpeg',
			afterUpload : function(data) {
				if (data.error ==0) {
					var url = KindEditor.formatUrl(data.url, 'absolute');//absolute,domain
					callback(url);
				} else {
					alert(data.message);
				}
			},
			afterError : function(str) {
				alert('自定义错误信息: ' + str);
			}
		});
		uploadbutton.fileBox.change(function(e) {
			uploadbutton.submit();
		});
}

/**
 * 删除文件
 * @param filePath
 */
function deleteFile(filePath){
	$.ajax({
		url:baselocation+'/image/deletefile',
		type:'post',
		data:{'filePath':filePath},
		dataType:'json',
		success:function(){}
	});
}

/**
 * 获取Cookie值
 * @param cookieName cookie名
 * @returns 返回Cookie值
 */
function getCookie(cookieName) {
	var cookieString = document.cookie;
	var start = cookieString.indexOf(cookieName+'=');
	if(start!=-1){
		var cookieValue='';
		var cookieArr = cookieString.split(";");
		for(var i=0;i<cookieArr.length;i++){
			var arr = cookieArr[i].split("=");
			if($.trim(cookieName)==$.trim(arr[0])){
				cookieValue=arr[1];
			}
		}
		return cookieValue;
	}
	return null;
}

/**
 * 设置Cookie值 
 * @param name 
 * @param value
 */
function setCookie(name,value){
	var Days = 2;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="+ exp.toGMTString() + ";path=/";
}

//自定义方法-数组去重复
Array.prototype.uniqueRewrite = function(){
	var newArr = []; //一个新的临时数组
	for(var i = 0; i < this.length; i++){ //遍历当前数组
		if(this[i]==""){
			continue;
		}
		//如果当前数组的第i已经保存进了临时数组，那么跳过，否则把当前项push到临时数组里面
		if (newArr.indexOf(this[i]) == -1){
			newArr.push(this[i]);
		}
	}
	return newArr;

};

function isEmpty(str){
	if(str==null || str=="" || str.trim()==''){
		return true;
	}
	return false;
}

function isNotEmpty(str){
	return !isEmpty(str);
}

function isNotNull(object){
	return !isNull(object);
}

function isNull(object){
	if(typeof(object)=="undefined" || object==null ||  object==''){
		return true;
	}
	return false;
}


/**
 * 删除Cookies
 * @param name
 */
function DeleteCookie(name) {
	DeleteCookieDomain(name,mydomain);
}

/**
 * 删除指定域名下的共享cookie.二级域名可用
 * @param name
 * @param domain
 */
function DeleteCookieDomain(name,domain) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(isNotEmpty(domain)){
		document.cookie = name + "=" + escape(cval) + ";expires="
			+ exp.toGMTString() + ";path=/"+";domain="+domain;
	}else{
		document.cookie = name + "=" + escape(cval) + ";expires="
			+ exp.toGMTString() + ";path=/";
	}
}
/**
 * 获取URL中的参数
 * @param val
 * @returns
 */
function getParameter(val) {
	var uri = window.location.search;
	var re = new RegExp("" + val + "=([^&?]*)", "ig");
	return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
}

/**
 * 检查是否手机
 */
function checkIsMobile(){
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM ||bIsIpad) { // 移动端环境下效果
		return true;
	}
	return false;
}

/**
 * 检查是否微信
 */
function checkIsWeixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

/**
 * 减法
 */
function subtraction(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	}
	catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	}
	catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	//last modify by deeka
	//动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 兼容ie7/8 trim方法报错
 */
Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};
String.method('trim', function () {
	return this.replace(/^\s+|\s+$/g, '');
});
String.method('ltrim', function () {
	return this.replace(/^\s+/g, '');
});
String.method('rtrim', function () {
	return this.replace(/\s+$/g, '');
});

function isNumber(str) {//正整数验证
	var number = /^[0-9]+$/;
	if (number.test(str)) {
		return true;
	}
	return false;
}

/**
 * 兼容关闭浏览器的方法
 * @constructor
 */
function closeWebPage(){
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null;
            window.close();
        } else {
            window.open('', '_top');
            window.top.close();
        }
    }
    else if (navigator.userAgent.indexOf("Firefox") > 0) {
        window.open('','_parent','');
        window.opener = window;
        window.close();
    } else if (navigator.appName=="Netscape") {
        window.open('','_parent','');
        window.close();
    } else {
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    }
}

/**
 * 打开指定url（防止拦截）
 * @param url
 */
function winOpenUrl(url){
    var formObj=document.createElement("form");
    formObj.setAttribute("action" , url );
    formObj.setAttribute("method" , 'get' );
    formObj.setAttribute("target" , '_black' );
    document.body.appendChild(formObj);
    formObj.submit();
}


/**
 * 生成二維碼
 * @param codeId 显示id
 * @param url 访问地址
 * @param logo 中间小标
 */
function generateQRCode(codeId,url,logo) {
    var $codeId = $("#" + codeId);
    var width=$codeId.width();
    $codeId.height(width);
    var render = "canvas";
    try {
        //默认字符串转二维码的方法，仅支持html5
        document.createElement('canvas').getContext('2d');
    } catch (e) {
        //如果不支持html5报错后通过table生成二维码
        render = "table";
    }
    //生成二维码
    $codeId.qrcode({
        text: url,
        height: width,
        width: width,
        render: render,
        src: logo//这里配置Logo的地址即可。
    });
    window.setTimeout("convertCanvasToImage('"+codeId+"')",100);
}

//从 canvas 提取图片 image
function convertCanvasToImage(codeId) {
    //新Image对象，可以理解为DOM
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL
    // 指定格式 PNG
    image.src = $("#"+codeId).find('canvas')[0].toDataURL("image/png");
    //将img插入容器
    $("#"+codeId).html(image);
}

//从 canvas 提取图片 image
function convertCanvasToImage(codeId) {
    //新Image对象，可以理解为DOM
    var image = new Image();
    // canvas.toDataURL 返回的是一串Base64编码的URL
    // 指定格式 PNG
    image.src = $("#"+codeId).find('canvas')[0].toDataURL("image/png");
    //将img插入容器
    $("#"+codeId).html(image);
}

/**
 * 回车执行事件
 * @param event
 * @param str
 */
function enterSubmit(event, str) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
        eval(str);
    }
}
