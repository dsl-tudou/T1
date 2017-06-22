/**
 * Created by Administrator on 2017/6/20.
 */
var regusername = document.getElementById('regusername').value;
var regpassword = document.getElementById('regpassword').value;
var regrepassword = document.getElementById('regrepassword').value;

    // 用户名 正则判断   及数据库查询
    function Onmuseleave(){
        //决断用户名是否符合正则要求
        if (regusername == "") {
            window.alert("Invalid Input");
            return;
        } else {
            var n = regusername.length;
            reg = /^[a-zA-Z0-9_]+$/;
            if (n < 1 || n > 6) {
                window.alert("Invalid Input")
                return;
            } else if (!reg.test(regusername)) {
                window.alert("Invalid Input");
                return;
            }
        }

    }


//用户名  密码 使用正则判断
function test() {


    //决断第一次输入的密码是否符合正则要求
    if (regpassword == "") {
        window.alert("Invalid Input");
        return;
    } else {
        var n = regpassword.length;
        reg = /^[a-zA-Z0-9_]+$/;
        if (n < 1 || n > 6) {
            window.alert("Invalid Input");
            return;
        } else if (!reg.test(regpassword)) {
            window.alert("Invalid Input");
            return;
        }
    }

    //决断第二次输入的密码是否符合正则,及是否与一第次输入的密码相同
    if (regrepassword == "" || regrepassword != regpassword) {
        window.alert("Invalid Input");
        return;
    }else {
        var n = regrepassword.length;
        reg = /^[a-zA-Z0-9_]+$/;
        if (n < 1 || n > 6) {
            window.alert("Invalid Input");
            return;
        }

        else if (!reg.test(regrepassword)) {
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
        // alert("验证正确");
    }else{
        alert("验证码错误,请重新输入");
    }
}

$('#regBtn').click(function () {
    //通过ajax提交数据
    // alert(3213);
    $.ajax({
        type: 'post',
        url: '/api/user/register',
        data: {
            regusername: $('#regusername').val(),
            regpassword: $('#regpassword').val(),
            regrepassword: $('#regrepassword').val()
        },
        dateType: 'json',
        success: function (res) {
            // console.log(res.message);

            alert(res.message);
            // $loginBox.show();
            // $regBox.hide();
            // $('#regMess').html(res.message);
        }

    });
});
