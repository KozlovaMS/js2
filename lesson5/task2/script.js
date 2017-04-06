var Voter = function(elem){
    this.down = elem.children('.down');
    this.up = elem.children('.up');
    this.count = elem.children('.vote');
    var self = this;
    this.value = 0;
    this.setVote = function(){
        self.count.html(self.value);
    };
    this.minus = function(){
        self.value--;
        self.setVote();
    };
    this.plus = function(){
        self.value++;
        self.setVote();
    };
};

$(function () {
    var voter = new Voter($('#voter'));
    voter.value = +prompt("Укажите стартовое число");
    while(isNaN(voter.value)){
        voter.value = +prompt("Внимательно укажите стартовое ЧИСЛО");
    }
    voter.setVote();
    voter.down.click(function(){
        voter.minus();
    });
    voter.up.click(function(){
        voter.plus();
    });
});

