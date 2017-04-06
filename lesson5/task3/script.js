var Canvas = function(elem){
    var self = this;
    this.context = document.getElementById(elem).getContext('2d');
    this.colorStroke = '#ffffff';
    this.colorFill = '#ffffff';
    this.line = 1;

    this.start = function(){
        self.context.strokeStyle = self.colorStroke;
        self.context.fillStyle = self.colorFill;
        self.context.lineWidth = self.line;
        self.context.beginPath();
    };

    this.finish = function(method){
        if (method == 'stroke'){
            self.context.stroke();
        } else {
            self.context.fill();
        }
        self.context.closePath();
    };

    this.arc = function(x, y, rad, start, end, course, method){
        self.start();
        self.context.arc(x, y, rad, start, end, course);
        self.finish(method);
    };

    this.stroke = function(mass, method){
        self.start();
        var arr = new Array();
        var all = mass.split(', ');
        var a = 0;
        for(var i in all){
            if (i % 2 == 0){
                arr[a] = new Array();
                arr[a][0] = all[i];
            } else {
                arr[a][1] = all[i];
                a++;
            }
        }
        for(var x in arr){
            if (x == 0){
                self.context.moveTo(arr[x][0], arr[x][1]);
            } else {
                self.context.lineTo(arr[x][0], arr[x][1]);
            }
        }
        self.finish(method);
    };

    this.curve = function(start, mass, method){
        self.start();
        self.context.moveTo(start[0], start[1]);
        if (mass.length == 6){
            self.context.bezierCurveTo(mass[0], mass[1], mass[2], mass[3], mass[4], mass[5]);
        } else {
            self.context.quadraticCurveTo(mass[0], mass[1], mass[2], mass[3]);
        }
        self.finish(method);
    };

    this.rect = function(x, y, width, height, method){
        self.start();
        if (method == 'stroke'){
            self.context.strokeRect(x, y, width, height);
        } else if(method == 'fill'){
            self.context.fillRect(x, y, width, height);
        } else {
            self.context.clearRect(x, y, width, height);
        }
        self.context.closePath();
    };
};

$(function () {
    var canvas = new Canvas('canvas');
    canvas.colorStroke = '#f00';
    canvas.colorFill = '#ff0';
    canvas.line = 4;
    canvas.arc(150, 150, 100, 0, 2 * Math.PI, true, 'stroke');
    canvas.arc(190, 110, 15, 0, 2 * Math.PI, true, 'fill');
    canvas.arc(110, 110, 15, 0, 2 * Math.PI, true, 'fill');
    canvas.stroke('150, 120, 135, 180, 165, 180', 'stroke');
    canvas.arc(150, 150, 70, Math.PI, 2 * Math.PI, true, 'stroke');
    canvas.colorStroke = '#000';
    var x = 0, y = 0;
    for(var i = 0; i < 5; i++){
        canvas.curve([80 + x, 85 + y], [60 + x, 60 + y, 120 + x, 40 + y, 100 + x, y],'stroke');
        x += 15;
        y -= 5;
    }
    for(var i = 0; i < 5; i++){
        canvas.curve([80 + x, 85 + y], [x, 60 + y, 220 + x, 40 + y, 100 + x, y],'stroke');
        x += 15;
        y += 5;
    }
    canvas.colorStroke = '#0f0';
    canvas.colorFill = '#0ff';
    canvas.rect(50, 250, 200, 50, 'stroke');
    canvas.rect(60, 260, 180, 30, 'fill');
    canvas.rect(70, 270, 160, 10, 'clean');
});

