function a(message) {
    alert(message)
}

$(function(){
    $('.bg').addClass('active')
    $('.openMsg').click(function(){
        $('#verifycode').show()
    })
    $('.close-get').click(function(){
        $('#verifycode').hide()
    })
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
                    $('#from').text('来自：' + req.data[0].from_name)
                    $('#verifycode').hide()
                    $('.message').hide()
                    $('.popBg').show()
                    $('.postcard.cnt').show()
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
    $('.postcard.cnt .close').click(function(){
        $('.message').show()
        $('.popBg').hide()
        $('.postcard.cnt').hide()
    })
    $('.sendShow').click(function(){
        $('.popBg').show()
        $('.postcard.send').show()
    })
    $('.postcard.send .close').click(function(){
        $('.popBg').hide()
        $('.postcard.send').hide()
    })
    textScreen()
    $(window).resize(function(){
        textScreen()
    })
    function textScreen(){
        if($(window).width() < $(window).height() ){
            $('body').attr('class','arround')
        } else {
            $('body').attr('class','normal')
        }
    }
})