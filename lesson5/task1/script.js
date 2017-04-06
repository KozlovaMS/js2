var Clock = function (elem) {
    this.elem = elem;
    var self = this;
    this.ticking = '';
    this.tick = function(){
        var now = new Date();
        var str = '';
        if (now.getHours() < 10) str += '0';
        str += now.getHours() + ':';
        if (now.getMinutes() < 10) str += '0';
        str += now.getMinutes() + ':';
        if (now.getSeconds() < 10) str += '0';
        str += now.getSeconds();
        this.elem.html(str);
    };
    this.start = function(){
        self.ticking = setInterval(function(){
            self.tick();
        }, 1000);
    };
    this.stop = function(){
        clearInterval(self.ticking);
    }
};

$(function () {
    var clock = new Clock($('.clock'));
    clock.start();
    $(document).on('click', '#start', function(){
        clock.start();
        $('#start').hide();
        $('#stop').show();
    });
    $(document).on('click', '#stop', function(){
        clock.stop();
        $('#start').show();
        $('#stop').hide();
    });
});

