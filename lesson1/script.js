function Container()
{
    this.id = "";
    this.className = "";
    this.htmlCode = "";
    
    this.render = function()
    {
        return this.htmlCode;
    }
    
    this.remove = function()
    {
        this.id = "";
        this.className = "";
        this.htmlCode = "";
        return true;
    }
}

function Menu(elId, elClass, items)
{
    Container.call(this);
    this.id = elId;
    this.className = elClass;
    this.items = items;
    
    this.render = function()
    {
        var result = '<ul class="' + this.className + '" id="' + this.id + '">';
        result += items.map(function(item){
            return item.render();
        }).join('');
        result += '</ul>';
        return result;
    }
}

function MenuItem(elHref, elName)
{
    Container.call(this);
    this.href = elHref;
    this.name = elName;
    
    this.render = function()
    {
        return '<li class="' + this.className + '"><a href="' + this.href + '">' + this.name + '</a></li>';
    }
}

/*

//Мне кажется, что для построения всего меню достаточно одного класса
//Класс NewMenu принимает в качестве параметра item массив объектов такого вида:
var items = [
    {href: '/', name: 'Главная'},
    {href: '/gal', name: 'Галерея'},
    {href: '/cat', name: 'Каталог', subitems: [
        {href: '/cat/category1', name: 'Категория 1'},
        {href: '/cat/category2', name: 'Категория 2'},
        {href: '/cat/category3', name: 'Категория 3'}
    ]}
];

*/

function NewMenu(elClass, elChildClass, items)
{
    Container.call(this);
    this.className = elClass;
    this.classChildName = elChildClass;
    this.items = items;
    
    this.render = function()
    {
        var result = '<ul class="' + this.className + '">';
        result += items.map(function(item){
            if ('subitem' in item){
                var submenu = new NewMenu(elClass, elChildClass, item.subitem);
                return '<li class="' + this.classChildName + '"><a href="' + item.href + '">' + item.name + '</a>' + submenu.render() + '</li>';
            } else {
                return '<li class="' + this.classChildName + '"><a href="' + item.href + '">' + item.name + '</a></li>';
            }
        }).join('');
        result += '</ul>';
        return result;
    }
}