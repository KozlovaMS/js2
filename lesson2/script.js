//Меню в ДЗ к первому уроку

var Phones = function(fileName)
{
    this.fileName = fileName;
    this.fileContent = "";
    var self = this;
    
    this.fileGet = function()
    {
        var file = new XMLHttpRequest();
        file.open('GET', this.fileName, true);
        file.onreadystatechange = function()
        {
            if (file.readyState == 4 && file.status == 200){
                self.fileContent = JSON.parse(file.responseText);
                var task = document.getElementById('task1');
                task.innerHTML = self.render();
            }
        }
        file.send(null);
        return false;
    }
    
    this.render = function()
    {
        var result = "";
        for(var i in this.fileContent){
            result += '<div id="' + this.fileContent[i]['age'] + '">'
            if ('carrier' in this.fileContent[i]){
                result += '<p>' + this.fileContent[i]['carrier'] + '</p>';
            }
            result += '<img src="' + this.fileContent[i]['imageUrl'] + '" title="' + this.fileContent[i]['id'] + '"><p>Название: ' + this.fileContent[i]['name'] + '</p><p>Описание: ' + this.fileContent[i]['snippet'] + '</p>';
            result += '</div>';
        }
        return result;
    }
}

var Gallery = function(fileName)
{
    this.fileName = fileName;
    this.fileContent = "";
    var self = this;
    
    this.fileGet = function()
    {
        var file = new XMLHttpRequest();
        file.open('GET', this.fileName, true);
        file.onreadystatechange = function()
        {
            if (file.readyState == 4 && file.status == 200){
                self.fileContent = JSON.parse(file.responseText);
                var task = document.getElementById('task2');
                task.innerHTML = self.render();
            }
        }
        file.send(null);
        return false;
    }
    
    this.render = function()
    {
        var result = "";
        for(var i in this.fileContent){
            result += '<a style="padding: 10px; display: inline-block;"href="' + this.fileContent[i]['big'] + '" target="_blank"><img src="' + this.fileContent[i]['small'] + '" title="' + this.fileContent[i]['title'] + '"></a>';
        }
        return result;
    }
}