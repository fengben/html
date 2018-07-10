//显示登陆框
function showlogin() {
    $("#loginfrom").show();
    $("#dl").show();
    $("#zc").hide();
}

function closewin() {
    $("#loginfrom").hide();
}

function showdialogRegister(obj) {
    $('#d-s-head-tab').find('a').each(function () {
        //tmp = $(this).text();

        $(this).attr("class", "");
    });

    $(obj).attr("class", "current")
    $("#dl").hide()
    $("#zc").show()
}

function showdialoglogin(obj) {
    $('#d-s-head-tab').find('a').each(function () {
        //tmp = $(this).text();

        $(this).attr("class", "");
    });
    $(obj).attr("class", "current")
    $("#dl").show()
    $("#zc").hide()
}