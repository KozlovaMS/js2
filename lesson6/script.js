$(function(){
    var indicator = [0, 0, 0, 0, 0, 0, 0];
    var error = '';
    var control = function(el){
        var condition = false;
        var num;
        switch(el.attr('id')){
            case ('username'):
                num = 0;
                condition = (el.val().length >= 6 && el.val().length <= 100);
                error += "Длина логина должна быть от 6 до 100 символов!<br>";
                break;
            case ('password'):
                num = 1;
                condition = (el.val().length >= 6 && el.val().length <= 100);
                error += "Длина пароля должна быть от 6 до 100 символов!<br>";
                break;
            case ('email'):
                num = 2;
                condition = (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(el.val()));
                error += "Проверьте указанный e-mail!<br>";
                break;
            case ('credit_card'):
                num = 3;
                condition = (/^\d{16}$/.test(el.val()));
                error += "Проверьте указанный номер карты!<br>";
                break;
            case ('birth'):
                num = 4;
                condition = (/^\d{4}-\d{2}-\d{2}$/.test(el.val()));
                error += "Пожалуйста, укажите дату Вашего рождения!<br>";
                break;
            case ('gender'):
                num = 5;
                condition = (el.val() != '0');
                error += "Укажите пол!<br>";
                break;
            case ('bio'):
                num = 6;
                condition = (el.val().length > 0);
                error += "Пожалуйста, заполните поле &quot;О себе&quot;!<br>";
                break;
            default:
                num = indicator.length;
                condition = (el.val().length > 0);
                error += "Проверьте правильность указанных Вами данных!<br>";
        }
        if (condition){
            el.css('border', '2px solid green');
            indicator[num] = 1;
            return true;
        } else {
            el.css('border', '2px solid red');
            el.effect('bounce', {distance: 150, times: 20, direction: 'right'}, 10000);
            indicator[num] = 0;
            return false;
        }
    };
    
    $(document).on('blur', '#username, #password, #email, #credit_card, #gender, #bio', function(){
        control($(this));
        if (error != ''){
            $('#error').html(error);
            $("#error").dialog("open");
            error = '';
        }
        var count = indicator.reduce(function(a, b) {
            return a + b;
        });
        var value = count / indicator.length * 100;
        $( "#progressbar" ).progressbar("value", value);
    });
    
    $(document).on('click', '#sub', function(){
        var username = control($('#username'));
        var password = control($('#password'));
        var email = control($('#email'));
        var gender = control($('#gender'));
        var creditcard = control($('#credit_card'));
        var bio = control($('#bio'));
        var birth = control($('#birth'));
        if (username && password && email && gender && creditcard && bio && birth){
            $.ajax({
                type: "POST",
                url: "validator.php",
                data: $('#form').serialize(),
                success: function(data){
                    var all = JSON.parse(data);
                    if (all.result){
                        $('form').hide();
                        $('.result_plus').show();
                    } else {
                        var errorhtml = '';
                        for(var i in all.error){
                            errorhtml += i + ': ' + all.error[i] + '<br>';
                        }
                        $('#form + .error').html(errorhtml);
                        $('#form + .error').dialog("open");
                    }
                }
            });
        } else {
            if (error != ''){
                $('#error').html(error);
                $("#error").dialog("open");
                error = '';
            }
        }
        var count = indicator.reduce(function(a, b) {
            return a + b;
        });
        var value = count / indicator.length * 100;
        $( "#progressbar" ).progressbar("value", value);
        return false;
    });
});