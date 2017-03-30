$(function(){
    var control = function(el, condition){
        if (condition){
            el.css('border', '2px solid green');
            el.next('.error').hide();
            return true;
        } else {
            el.css('border', '2px solid red');
            el.next('.error').show();
            return false;
        }
    };
    
    $(document).on('blur', '#username', function(){
        var el = $('#username');
        control(el, (el.val().length >= 6 && el.val().length <= 100));
    });
    $(document).on('blur', '#password', function(){
        var el = $('#password');
        control(el, (el.val().length >= 6 && el.val().length <= 100));
    });
    $(document).on('blur', '#email', function(){
        var el = $('#email');
        control(el, /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(el.val()));
    });
    $(document).on('blur', '#credit_card', function(){
        var el = $('#credit_card');
        control(el, /^\d{16}$/.test(el.val()));
    });
    $(document).on('blur', '#birth', function(){
        var el = $('#birth');
        control(el, /^\d{4}-\d{2}-\d{2}$/.test(el.val()));
    });
    
    $(document).on('click', '#sub', function(){
        var username = $('#username');
        var password = $('#password');
        var email = $('#email');
        var gender = $('#gender');
        var creditcard = $('#credit_card');
        var bio = $('#bio');
        var birth = $('#birth');
        if ((control(username, (username.val().length >= 6 && username.val().length <= 100))) && (control(password, (password.val().length >= 6 && password.val().length <= 100))) && (control(email, /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email.val()))) && (control(gender, (gender.val().length == 1))) && (control(creditcard, /^\d{16}$/.test(creditcard.val()))) && (control(bio, (bio.val().length > 0))) && (control(birth, /^\d{4}-\d{2}-\d{2}$/.test(birth.val())))){
            $.ajax({
                type: "POST",
                url: "validator.php",
                data: "username=" + username.val() + "&password=" + password.val() + "&email=" + email.val() + "&gender=" + gender.val() + "&credit_card=" + creditcard.val() + "&bio=" + bio.val() + "&birth=" + birth.val(),
                success: function(data){
                    var all = JSON.parse(data);
                    if (all.result){
                        $('form').hide();
                        $('.result_plus').show();
                    } else {
                        var errorhtml = '';
                        console.log(all.error);
                        for(var i in all.error){
                            console.log(i);
                            console.log(all.error[i]);
                            errorhtml += i + ': ' + all.error[i] + '<br>';
                        }
                        $('.global').html(errorhtml);
                        $('.global').show();
                    }
                }
            });
        }
        return false;
    });
});