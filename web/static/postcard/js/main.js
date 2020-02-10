$(function(){
    $('.bg').addClass('active')
    $('.message').click(function(){
        $('#verifycode').show()
    })
    // 输入取件码点了取件
    $('.code-get').click(function(){
        $('.code-get').text('获取中')
        var verifyCode = $('#code-input').val()
        if (!verifyCode) {
            a('请输入取件码')
            $('.code-get').text('取件')
            return
        }

        $.ajax({
            url: 'http://nightapi.xtzero.me/index.php/readPostcard',
            dataType: "json",
            async: true,
            data: {
                verifycode: verifyCode
            },
            type: "GET",
            beforeSend: function(){
                console.log(1)
            },
            success: function(req){
                if (req.code == 200) {
                    console.log(req)
                    $('#content').text(req.data[0].content)
                    $('#from').text('from:' + req.data[0].from_name)
                    $('#verifycode').hide()
                    $('.message').hide()
                    $('.popBg').show()
                    $('#postcard').show()
                } else {
                    a(req.msg)
                }
            },
            complete: function(){
                $('.code-get').text('取件')
            },
            error: function(){
                alert('参加人数太多啦，一会再来吧~')
            }
        })
    })
    $('.close').click(function(){
        $('.message').show()
        $('.popBg').hide()
        $('#postcard').hide()
    })
})

function a(message) {
    alert(message)
}