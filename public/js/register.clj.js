/**
 * Created by Administrator on 2017/6/20.
 */
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
var password2 = document.getElementById('password2').value;

    // 用户名 正则判断   及数据库查询
    function Onmuseleave(){
        //决断用户名是否符合正则要求
        if (username == "") {
            window.alert("Invalid Input");
            return;
        } else {
            var n = username.length;
            reg = /^[a-zA-Z0-9_]+$/;
            if (n < 1 || n > 6) {
                window.alert("Invalid Input")
                return;
            } else if (!reg.test(username)) {
                window.alert("Invalid Input");
                return;
            }
        }

    }


//用户名  密码 使用正则判断
function test() {


    //决断第一次输入的密码是否符合正则要求
    if (password == "") {
        window.alert("Invalid Input");
        return;
    } else {
        var n = password.length;
        reg = /^[a-zA-Z0-9_]+$/;
        if (n < 1 || n > 6) {
            window.alert("Invalid Input");
            return;
        } else if (!reg.test(password)) {
            window.alert("Invalid Input");
            return;
        }
    }

    //决断第二次输入的密码是否符合正则,及是否与一第次输入的密码相同
    if (password2 == "" || password2 != password) {
        window.alert("Invalid Input");
        return;
    }else {
        var n = password2.length;
        reg = /^[a-zA-Z0-9_]+$/;
        if (n < 1 || n > 6) {
            window.alert("Invalid Input");
            return;
        }

        else if (!reg.test(password2)) {
            window.alert("Invalid Input");
            return;
        }
    }
}



//图形码生成器
var verifyCode = new GVerify("v_container");
//检验验证码是否正确
function check(){
    // alert(213213);
    var res = verifyCode.validate(document.getElementById("code_input").value);
    if(res){
        alert("验证正确");
    }else{
        alert("验证码错误");
    }
}
