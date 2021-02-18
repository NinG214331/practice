var ulLeft = document.getElementsByClassName('title-left')[0];
var ulMiddle = document.getElementsByClassName('title-middle')[0];
var ulRight = document.getElementsByClassName('title-right')[0];
var liLeft = ulLeft.children[0];
var liMiddle = ulMiddle.children;
var liRight = ulRight.children;
var hide = document.getElementsByClassName('hide-list');

var ul = document.getElementsByClassName('nav1')[0].children[0];


liLeft.onmousemove = function () {
    addClass(liLeft,"li-active");
    addClass(hide[0],"show-list");
}

liLeft.onmouseleave = function(){
    removeClass(liLeft,"li-active");
    removeClass(hide[0],"show-list");
}

for(var i = 0; i < 3; i++){
    (function(i){
        liMiddle[i].onmousemove = function () {
            addClass(hide[i+4],"show-list");
        }
        liMiddle[i].onmouseleave = function(){
            removeClass(hide[i+4],"show-list");
        }
    }(i))
}

for(var i = 0; i < 3; i++){
    (function(i){
        liRight[i].onmousemove = function () {
            addClass(hide[i+1],"show-list");
        }
        liRight[i].onmouseleave = function(){
            removeClass(hide[i+1],"show-list");
        }
    }(i))
}

ul.onmousemove = function (e) {
    for(var i = 0; i < e.path.length; i++){
        if(e.path[i].localName == "li"){
            addClass(hide[7],"show-list");
            // hide[7].style.display = 'block';
            addClass(e.path[i],'li-active');
            e.path[i].onmouseleave = function () {
                removeClass(e.path[i],'li-active');   
            }
            break;
        }
    }   
}

ul.onmouseleave = function () {
    removeClass(hide[7],'show-list');
}

//判断是否含有className
function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

//添加className
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
}
   
//删除className
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}