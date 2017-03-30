$(function(){
    $('.tabs').each(function(){
        $(this).find('li:eq(0)').addClass("active");
        var sel = $(this).find('li:eq(0)').attr('id');
        $(this).find('.' + sel).show();
    });
    $(document).on('click','.label',function(){
        if (!$(this).hasClass('active')){
            $(this).parent().find('li').removeClass('active');
            $(this).addClass("active");
            $(this).parent().parent().find('div').hide();
            var sel = $(this).attr('id');
            $(this).parent().parent().find('.' + sel).show();
        }
    });
})