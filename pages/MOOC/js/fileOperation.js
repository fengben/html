// 上传文件，弹窗
function uploadFileNew(){
    var prmpt = "上传文件";
    hiBox('#modifybox',prmpt,750,350,'','.a_close');
    $("#popup_message #selectFileTr").css("display","table-row");
    $("#popup_message #dirNameTr").css("display","none");
    $("#popup_message #modifyAttribute").val('文件');
    var parentDirName = $("#mulu").text();
    var parentDirName1=parentDirName.split(":")[1];
    //console.log(parentDirName1);
    $("#popup_message #modifyFullpath").val(parentDirName1);
}
//上传文件，用了upload.js里面的uploadToDatabase函数
function doSaveFile(rstr){
    if(rstr == ""){return;}
    //parentpath是文件的父路径
    var parentpath = $("#popup_message #modifyFullpath").val();
    var description = $("#popup_message #modifyDescription").val();
    var paras = "fileId=" + rstr;
    if(parentpath =='/'){
        paras += "$^@^$parentDirName=" + parentpath;
    }else{
        paras += "$^@^$parentDirName=" + parentpath+'/';
    }
    paras += "$^@^$operation=" + "newfile";
    paras += "$^@^$loginName=" + localStorage.getItem('loginName');
    paras += "$^@^$description=" + description;
    var obj = new Array();
    var processResult = function(){
        if(parentpath == '/'){
            allFileList();
            //$("#mulu").html('当前目录:'+'/');
        }else{
            //$("#mulu").html('当前目录:'+pathDir1);
            someFileList(parentpath);
        }
        hiClose();
    };
    getFromWS("zyMooc/zyFileOperation.template",paras,obj,processResult);
}
//文件预览
function viewFile(fileId,fileName){
    if(checkImg(fileName)){
        var html = '<img width="550" height="400" src="/one/downloadFile.spe?dtype=PostgresXL&mode=html&fileid='+fileId+'">';
        hiBox('#viewbox',fileName,650,500,'');
        $("#popup_message").html(html);
    }else if(checkTv(fileName)){
        var html = '<video src="/one/downloadFile.spe?dtype=PostgresXL&mode=html&fileid='+fileId+'" controls="true" width="550" height="400" autoplay="autoplay"/>';
        hiBox('#viewbox',fileName,650,500,'');
        $("#popup_message").html(html);
    }else if(checkTxt(fileName)){
         var request=null;
        if(window.XMLHttpRequest){
            request=new XMLHttpRequest();
        }else if(window.ActiveXObject){
            request=new ActiveXObject("Microsoft.XMLHTTP");
        }
        if(request){
            request.open("GET","/one/downloadFile.spe?dtype=PostgresXL&mode=html&fileid="+fileId+"&fileName="+fileName,true);
            request.overrideMimeType("text/html;charset=gb2312");//设定以gb2312编码识别数据
            request.onreadystatechange=function(){
                if(request.readyState===4){
                    if (request.status == 200 || request.status == 0){
                        //var reader = new FileReader();
                        $("#viewbox").html(request.responseText);
                        hiBox('#viewbox',fileName,650,500,'');
                    }
                }
            }
            request.send(null);
        }else{
            alert("error");
        }
    }else if(checkWord(fileName)){
        //var html = '<object data="http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=/one/downloadFile.spe?dtype=PostgresXL&mode=html&fileid='+fileId+'" width="550" height="400"/>';
       //<a href="http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=/one/downloadFile.spe?dtype=PostgresXL&mode=html&fileid='+fileId+'">name</a>
        $("#viewbox").html('<a href="http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=/one/downloadFile.spe?dtype=PostgresXL&mode=html&fileid=\'+fileId+\'"></a>');
        //console.log(<a href="http://www.xdocin.com/xdoc?_func=to&_format=html&_cache=1&_xdoc=/one/downloadFile.spe?dtype=PostgresXL&mode=html&fileid='+fileId+'"></a>);
        //hiBox('#viewbox',fileName,650,500,'');
    }else if(checkPdf(fileName)){
        var html = '<object data="/one/downloadFile.spe?dtype=PostgresXL&mode=html&fileid='+fileId+'" width="550" height="400"/>';
        $("#viewbox").html(html);
        hiBox('#viewbox',fileName,650,500,'');
    }else if(checkPpt(fileName)){
        var html = '<object data="/one/downloadFile.spe?dtype=PostgresXL&mode=html&fileid='+fileId+'" width="550" height="400"/>';
        $("#viewbox").html(html);
        hiBox('#viewbox',fileName,650,500,'');
    } else{
        alert("格式不支持预览");

    }
}
function checkImg(filename){
    var index = filename.lastIndexOf("."); //得到"."在第几位
    var fileType = filename.substring(index); //截断"."之前的，得到后缀
    if(fileType==".bmp"||fileType==".png"||fileType==".gif"||fileType==".jpg"||fileType==".jpeg"){  //根据后缀，判断是否符合图片格式
        return true;
    }
    return false;
}
function checkPdf(filename){
    var index = filename.lastIndexOf("."); //得到"."在第几位
    var fileType = filename.substring(index); //截断"."之前的，得到后缀
    if(fileType==".pdf"){  //根据后缀，判断是否符合图片格式
        return true;
    }
    return false;
}
function checkPpt(filename){
    var index = filename.lastIndexOf("."); //得到"."在第几位
    var fileType = filename.substring(index); //截断"."之前的，得到后缀
    if(fileType==".pptx"||fileType==".ppt"){  //根据后缀，判断是否符合图片格式
        return true;
    }
    return false;
}
function checkTxt(filename){
    var index = filename.lastIndexOf("."); //得到"."在第几位
    var fileType = filename.substring(index); //截断"."之前的，得到后缀
    if(fileType==".txt"){  //根据后缀，判断是否符合文件格式
        return true;
    }
    return false;
}
function checkWord(filename){
    var index = filename.lastIndexOf("."); //得到"."在第几位
    var fileType = filename.substring(index); //截断"."之前的，得到后缀
    if(fileType==".doc"||fileType==".docx"||fileType=="wps"){  //根据后缀，判断是否符合文件格式
        return true;
    }
    return false;
}
function checkTv(filename){
    var index = filename.lastIndexOf("."); //得到"."在第几位
    var fileType = filename.substring(index); //截断"."之前的，得到后缀
    if(fileType==".mp4"||fileType==".avi"||fileType==".war"||fileType==".mov"||fileType==".flv"||fileType==".asf"||fileType==".rmvb"){ //根据后缀，判断是否符合视频格式
        return true;
    }
    return false;
}
//绑定删除按钮
var deleteModal = $('#deleteModal');
//show.bs.modal 在modal调用show方法后触发
//在这里也就是点击删除按钮后触发
deleteModal.on('show.bs.modal', function(e) {
    var parentDirName = $("#mulu").text();
    var parentpath=parentDirName.split(":")[1];
    var btn = $(e.relatedTarget);
    //获取删除记录的id
    var id = btn.data("id");
    $('#removeItem').on('click', function () {
        var res = new Array();
        var deleteResult = function () {
            if (res[0] == "ok") {
                $('#deleteModal').modal('hide');
                if(parentpath == '/'){
                    allFileList();
                }else{
                    someFileList(parentpath);
                }
            } else {
                alert('删除失败');
                return;
            }
        }
        var paras = "";
        paras += "operation=deletefile";
        paras += "$^@^$fileId=" + id;
        getFromWS("zyMooc/zyFileOperation.template", paras, res, deleteResult);
    });
});
function copyResourceURL(fileId){
    var domain = window.location.host;
    var url = domain+"/one/downloadFile.spe?dtype=PostgresXL&mode=attachment&fileid="+fileId;
    var oInput = document.createElement('input');
    oInput.value = url;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.className = 'oInput';
    oInput.style.display='none';
    alert('复制成功');
}
