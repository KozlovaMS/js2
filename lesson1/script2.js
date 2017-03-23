function Hamburger(size = "", stuffing = [], topping = [])
{
    const SIZE_SMALL_PRICE = 50;
    const SIZE_SMALL_CALORIE = 20;
    const SIZE_LARGE_PRICE = 100;
    const SIZE_LARGE_CALORIE = 40;
    const STUFFING_CHEESE_PRICE = 10;
    const STUFFING_CHEESE_CALORIE = 20;
    const STUFFING_SALAD_PRICE = 20;
    const STUFFING_SALAD_CALORIE = 5;
    const STUFFING_POTATO_PRICE = 15;
    const STUFFING_POTATO_CALORIE = 10;
    const TOPPING_MAYO_PRICE = 20;
    const TOPPING_MAYO_CALORIE = 5;
    const TOPPING_SPICE_PRICE = 15;
    const TOPPING_SPICE_CALORIE = 0;
    
    this.size = size;
    this.stuffing = stuffing;
    this.topping = topping;
    this.price = "";
    this.calorie = "";
    this.description = "";
    this.error = false;
    this.message = {};
    
    this.calcPrice = function()
    {
        var result = 0;
        //добавляем размер гамбургера
        if (this.size == 'small'){
            result += SIZE_SMALL_PRICE;
        } else if (this.size == 'large'){
            result += SIZE_LARGE_PRICE;
        } else {
            this.error = true;
            this.message['size'] = 'Пожалуйста, выберите размер гамбургера!';
        }
        //добавляем выбранные начинки
        if (this.stuffing.length > 0){
            for (var i in this.stuffing){
                if (i == 'cheese'){
                    result += STUFFING_CHEESE_PRICE;
                } else if (i == 'salad'){
                    result += STUFFING_SALAD_PRICE;
                } else if (i == 'potato'){
                    result += STUFFING_POTATO_PRICE;
                } else {
                    this.message['otherStuffing'] = 'Вы указали неизвестную начинку: ' + i + '!';
                }
            }
        } else {
            this.error = true;
            this.message['stuffing'] = 'Пожалуйста, выберите начинку для гамбургера!';
        }
        //добавляем выбранные топпинги
        if (this.topping.length > 0){
            for (var i in this.topping){
                if (i == 'mayo'){
                    result += TOPPING_MAYO_PRICE;
                } else if (i == 'spice'){
                    result += TOPPING_SPICE_PRICE;
                } else {
                    this.message['otherTopping'] = 'Вы указали неизвестный топпинг: ' + i + '!';
                }
            }
        }
        return result;
    }
    
    this.calcCalorie = function()
    {
        var result = 0;
        //добавляем размер гамбургера
        if (this.size == 'маленький'){
            result += SIZE_SMALL_CALORIE;
        } else if (this.size == 'большой'){
            result += SIZE_LARGE_CALORIE;
        } else {
            this.error = true;
            this.message['size'] = 'Пожалуйста, выберите размер гамбургера!';
        }
        //добавляем выбранные начинки
        if (this.stuffing.length > 0){
            for (var i in this.stuffing){
                if (i == 'сыр'){
                    result += STUFFING_CHEESE_CALORIE;
                } else if (i == 'салат'){
                    result += STUFFING_SALAD_CALORIE;
                } else if (i == 'картофель'){
                    result += STUFFING_POTATO_CALORIE;
                } else {
                    this.message['otherStuffing'] = 'Вы указали неизвестную начинку: ' + i + '!';
                }
            }
        } else {
            this.error = true;
            this.message['stuffing'] = 'Пожалуйста, выберите начинку для гамбургера!';
        }
        //добавляем выбранные топпинги
        if (this.topping.length > 0){
            for (var i in this.topping){
                if (i == 'майонез'){
                    result += TOPPING_MAYO_CALORIE;
                } else if (i == 'приправа'){
                    result += TOPPING_SPICE_CALORIE;
                } else {
                    this.message['otherTopping'] = 'Вы указали неизвестный топпинг: ' + i + '!';
                }
            }
        }
        return result;
    }
    
    this.descAdd = function()
    {
        return '<p>Размер гамбургера: ' + this.size + '</p><p>Выбранные начинки: ' + this.stuffing.join(', ') + '</p><p>Выбранные топпинги: ' + this.topping.join(', ') + '</p>';
        return result;
    }
    
    this.render = function()
    {
        var result = ""
        this.price = this.calcPrice();
        this.calorie = this.calcCalorie();
        if (this.error){
            for (var i in this.message){
                result += '<p style="color: red;">' + this.message[i] + '</p>';
            }
        } else {
            this.description = this.descAdd();
            result += '<p>Цена гамбургера: ' + this.price + ' руб.</p><p>Калорийность гамбургера: ' + this.calorie + ' калорий.</p>' + this.description;
            for (var i in this.message){
                result += '<p style="color: red;">' + this.message[i] + '</p>';
            }
        }
        return result;
    }
}