//初始化左侧目录文件夹
function channelsToTreeData(data) {
    var resultData = {};
    var jd = data[0].replace(/\'/g, '\"');
    var jsonData = jd.replace(/&/g, '\'');
    jsonData = jsonData.substr(0, jsonData.length - 1);//去掉最后一个逗号
    var str = '[' + jsonData + ']';
    //将字符串格式转换成对象
    var zNodes = JSON.parse(str);//[{},{},....,{}]
    for (var i = 0; i < zNodes.length; i++) {
        var pnode = {};
        var subchs = zNodes[i].file_id;
        pnode.name = zNodes[i].dir_name;
        pnode.id = zNodes[i].id;
        //console.log(pnode.name);
        if (subchs == 1) {
            pnode.type = "folder";
            var childrennodes = checkChildrenFolder(pnode.name);
            if(childrennodes !=null){
                var additionalParameters = {};
                additionalParameters.children = childrennodes;
                pnode.additionalParameters = additionalParameters;
            }
        }
        resultData[zNodes[i].dir_name] = pnode;

    }
    return resultData;
}
//判断文件夹下是否还有子文件夹，并全部展示出来
function checkChildrenFolder(name){
    var children_folder = {};
    var result = new Array();
    var children = function () {
        //如果文件夹下还有子文件夹，展示子文件夹
        if(result[0] != 'no') {
            //alert(result[0]);
            var childjd = result[0].replace(/\'/g, '\"');
            var childjsonData = childjd.replace(/&/g, '\'');
            childjsonData = childjsonData.substr(0, childjsonData.length - 1);//去掉最后一个逗号
            var childstr = '[' + childjsonData + ']';
            //将字符串格式转换成对象
            var childNodes = JSON.parse(childstr);//[{},{},....,{}]
            for (var i = 0; i < childNodes.length; i++) {
                var cnode = {};
                var csubchs = childNodes[i].file_id;
                cnode.name = childNodes[i].dir_name;
                cnode.id = childNodes[i].id;
                if (csubchs == 1) {
                    cnode.type = "folder";
                    var para = name+'/'+cnode.name;
                    var childrennodess = checkChildrenFolder(para);
                    //alert(para);
                    //console.log(childrennodess);
                    if(childrennodess !=null){
                        var additionalParameterss = {};
                        additionalParameterss.children = childrennodess;
                        cnode.additionalParameters = additionalParameterss;
                    }
                }else{

                }
                children_folder[childNodes[i].dir_name] = cnode;
            }
        }
        //paras += "$^@^$articleId="+aid;
        //paras += "$^@^$operation=deleteAppendix";
    }
    var paras = "childname=" + '/' + name + '/';
    getFromWS("zyMooc/zyFileSpaceChildren.template", paras, result, children);
    return children_folder;
}

// 新建文件夹，弹窗
function newFileOrDir(){
    var prmpt = "新建文件夹";
    //$("#bufferMark").val("new");
    hiBox('#modifybox',prmpt,750,350,'','.a_close');
    $("#popup_message #selectFileTr").css("display","none");
    $("#popup_message #dirNameTr").css("display","table-row");

    $("#popup_message #modifyAttribute").val('目录');
    var parentDirName = $("#mulu").text();
    var parentDirName1=parentDirName.split(":")[1];
    $("#popup_message #modifyFullpath").val(parentDirName1);
}
//存储文件夹记录
function saveRecord(){
    //dirName是文件名字
    var dirName = $("#popup_message #modifyDirName").val();
    //fileName是文件名
    var fileName = $("#popup_message #modifyFileName").val();
    //上传的文件
    var uploadfile = $("#popup_message #modifyUploadFile").val();
    //parentpath是文件的父路径
    var parentpath = $("#popup_message #modifyFullpath").val();
    //文件或目录的描述
    var description = $("#popup_message #modifyDescription").val();
    var type= $("#popup_message #modifyAttribute").val();
    if (type == '目录'){
        var paras;
        var obj = new Array();
        var processResult1 = function(){
            if(obj[0]=="sameDir"){
                alert("文件夹名字重复");
            }else{
                alert('成功！');
                hiClose();
                catalogue();
                //window.location.reload();
            }
        };
        if(parentpath == '/'){
            paras = "parentDirName=" + parentpath;
        }else{
            paras = "parentDirName=" + parentpath+'/';
        }
        paras += "$^@^$dirName=" + dirName;
        paras += "$^@^$operation=newdir";
        paras += "$^@^$description=" + description;
        paras += "$^@^$loginName=" + localStorage.getItem('loginName');
        if(dirName==""&&dirName.trim() == ""){
            alert("文件夹名称不能为空");
            return;
        }else if(dirName&&dirName.indexOf("/")!=-1){
            alert("文件夹名称不能包含\"/\"");
            return;
        }
        getFromWS("zyMooc/zyNewFileFolder.template",paras,obj,processResult1);
    }else if(type == '文件'){
        if(uploadfile==""){
            alert("未选择任何文件");
            return;
        }
        var fileName = uploadfile.split('\\');
        var file_name=fileName[fileName.length-1];
        var obj = new Array();
        var allFilesMapResult = function () {
            if(obj == 'hasSameFile'){
                alert('该文件夹下已有同名文件，请重新命名');
            }else{
                var point = uploadfile.lastIndexOf(".");
                var type = uploadfile.substr(point);
                if(type==".mp4"||type==".avi"||type==".war"||type==".mov"||type==".flv"||type==".asf"||type==".rmvb"){
                    var additional_args="databaseType=PostgresXL&needThumbnail=true";
                }else{
                    var additional_args="databaseType=PostgresXL&needThumbnail=false";
                }
                uploadToDatabase("popup_message #modifyUploadFile",doSaveFile,additional_args);
                return;
            }
        }
        var paras = "fileName="+file_name;
        paras += "$^@^$fullpath="+parentpath+'/';
        paras += "$^@^$operation=isSameFile";
        getFromWS("zyMooc/zyFileOperation.template",paras, obj, allFilesMapResult);
    }
}
//删除文件夹弹出框
function deleteTanKuang() {
    $('#deleteModalFolder').modal();
}
//删除文件夹
function deleteFolder() {
    var parentDirName = $("#mulu").text();
    var parentDirName1 = parentDirName.split(":")[1];
    if (parentDirName1 == "/") {
        alert('根目录不能删除');
        $('#deleteModalFolder').modal('hide');
    } else {
        var dirnamearr = parentDirName1.split('/');
        if (dirnamearr.length > 0) {
            var dirname = dirnamearr[dirnamearr.length - 1];
        }
        var paras = "parentDirName=" + parentDirName1 + '/';
        paras += "$^@^$dirName=" + dirname;
        paras += "$^@^$operation=deletefolder";
        var html = new Array();
        var htmlResult = function () {
            console.log(html[0]);
            if (html[0] == "isNotNullDir") {
                alert("此文件夹不为空，请先删除子文件");
                $('#deleteModalFolder').modal('hide');
            } else {
                console.log(dirnamearr);
                console.log(dirnamearr.length)
                $('#deleteModalFolder').modal('hide');
                var pathDir = new Array();
                catalogue();
                for (var i = 0; i < dirnamearr.length - 1; i++) {
                    pathDir.push(dirnamearr[i]);
                }
                var pathDir1 = pathDir.join('/');
                if (pathDir1.length == 0) {
                    allFileList();
                    $("#mulu").html('当前目录:' + '/');
                } else {
                    $("#mulu").html('当前目录:' + pathDir1);
                    someFileList(pathDir1);
                }

            }
        }
        getFromWS("zyMooc/zyNewFileFolder.template", paras, html, htmlResult);
    }
}
//右侧资源列表部分加载
function someFileList(content) {
    var list = new Array();
    var  allColumnsResult = function () {
        jQuery("#list").html(list[0]);
        //console.log(list[0]);
        if ($('#list').hasClass('dataTable')) {
            dttable = $('#list').dataTable();
            dttable.fnClearTable(); //清空一下table
            dttable.fnDestroy(); //还原初始化了的datatable
        }
        //$("#list").find("tbody").html(html);
        $('#list').dataTable({
            ordering:false,
            info: false,
            bAutoWidth: true,
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            }

        });
    }
    var paras = "fullpath="+content+'/';
    paras += "$^@^$operation=getSomeFiles";
    getFromWS("zyMooc/zyFileListNew.template", paras,list, allColumnsResult);
}
 function rootFolder() {
     var parentDirName = $("#mulu").text();
     var parentDirName1=parentDirName.split(":")[1];
     if(parentDirName1 == "/"){
         alert('当前是根目录');
     }else{
         allFileList();
         $("#mulu").html('当前目录:'+'/');
     }
 }


