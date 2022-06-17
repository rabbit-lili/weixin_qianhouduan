$(function() {
    const ua = navigator.userAgent.toLowerCase();
    const isWeixin = ua.indexOf('micromessenger') != -1;
    const isAndroid = ua.indexOf('android') != -1;
    const isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
    if (!isWeixin) {
        document.head.innerHTML = '<title>抱歉，出错了</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"><link rel="stylesheet" type="text/css" href="_css/weui.css">';
        var opened = window.open("/weixin.html", '_self');
    } else {
        $.ajax({
                method: 'get',
                url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc9b33549372c6739&redirect_uri=http%3A%2F%2Fwx.demo.vm1776.top%2Fcode&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1',
                success: function(res) {
                    console.log(res)
                    $.ajax({
                        method: 'get',
                        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc9b33549372c6739&redirect_uri=http%3A%2F%2Fwx.demo.vm1776.top%2Fcode&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1',
                        success: function(res) {
                            console.log(res)

                        }

                    })
                }

            }

        })
}


$.ajax({
    method: 'get',
    url: 'http://node.vm1776.top:3007/mobile/yanzhengma',
    success: function(res) {
        if (res.status == 0) {
            $('#yanzhengma').attr("src", res.data) // 图片更换

        }


    }

})

//官网的加密部分
// var thisPwd = document.getElementById("password").value;
//     if(thisPwd.length != 256){
//         RSAUtils.setMaxDigits(131);
//         var key = RSAUtils.getKeyPair("010001", '', "008aed7e057fe8f14c73550b0e6467b023616ddc8fa91846d2613cdb7f7621e3cada4cd5d812d627af6b87727ade4e26d26208b7326815941492b2204c3167ab2d53df1e3a2c9153bdb7c8c2e968df97a5e7e01cc410f92c4c2c2fba529b3ee988ebc1fca99ff5119e036d732c368acf8beba01aa2fdafa45b21e4de4928d0d403");
//         var result = RSAUtils.encryptedString(key, thisPwd);
//         $("#password").val(result);
function encryptPassword() {
    let thisPwd = document.getElementById("password").value;
    if (thisPwd.length != 256) {
        RSAUtils.setMaxDigits(131);
        var key = RSAUtils.getKeyPair("010001", '', "008aed7e057fe8f14c73550b0e6467b023616ddc8fa91846d2613cdb7f7621e3cada4cd5d812d627af6b87727ade4e26d26208b7326815941492b2204c3167ab2d53df1e3a2c9153bdb7c8c2e968df97a5e7e01cc410f92c4c2c2fba529b3ee988ebc1fca99ff5119e036d732c368acf8beba01aa2fdafa45b21e4de4928d0d403");
        var result = RSAUtils.encryptedString(key, thisPwd);
        // console.log(result);
        // document.getElementById("password").value = result;


    }
    return result
}



const layer = layui.layer
$('#btn_submit').on('submit', function(e) {
    e.preventDefault()
    layer.msg('正在登陆中...', { icon: 1 });
    // let data = {
    //     username: $('#btn_submit [name=username]').val(),
    //     password: encryptPassword()
    // }
    // console.log(data)
    $.ajax({
        method: 'POST',
        url: 'http://127.0.0.1:8080/mobile/login',
        data: {
            username: $('#btn_submit [name=username]').val(),
            password: encryptPassword()
        },
        success: function(res) {
            if (res.status == 0) {
                return layer.msg(res.message)
            }
            return layer.msg('登录失败，请检查学号密码！')

        }

    })

    // layer.msg('登录成功', { icon: 6 });
    // alert($(this).serialize())
})
})