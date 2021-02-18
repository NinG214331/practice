//获取图片列表，小圆点以及左右按钮
var ul = document.getElementsByClassName("img-list")[0];
var div = document.getElementsByClassName("top")[0];
var a = document.getElementsByClassName("circle")
var len = a.length;
var bl = document.getElementsByClassName('btn-left')[0];
var br = document.getElementsByClassName('btn-right')[0];

var count = 0;//表示当前显示到第几张图片
var key = true;//设定锁


var cli = ul.firstElementChild.cloneNode(true);//克隆第一张图片
ul.appendChild(cli);//将克隆的图片放在末尾

div.onmousemove = function () {
    bl.style.display = 'block';
    br.style.display = 'block';
}
div.onmouseleave = function () {
    bl.style.display = 'none';
    br.style.display = 'none';
}

//左按钮点击事件
bl.onclick = leftMove;

function leftMove() {
    if(!key) {return;}//判断按钮是否锁定

    if(count === 0){//判断是否是第一张图片
        ul.style.transition = "none";//去掉过度
        ul.style.left = -5 * 520 + "px";//跳转到最后一张图片
        count = 4;

        //利用定时器，跳转后直接加上过度
        setTimeout(function(){ 
            ul.style.transition = "0.5s ease";
            ul.style.left = -count * 520 + 'px';
        },0) 
    }else{
        count --;
        ul.style.left = -count * 520 + 'px';
    }
    
    key = false;//关锁

    //0.5秒后开锁
    setTimeout(function () {
        key = true;
    }, 500);

    setCircle();//设置小圆点的位置
}

//右按钮点击事件
br.onclick = rightMove;

function rightMove() {
    if(!key) {return;}//判断按钮是否锁定

    count ++;
    ul.style.transition = "0.5s ease";//由于最后一张图片会去掉过度，所以添加过度
    if(count === 5){//判断是否是最后一张图片
        //由于设置过度时间为0.5秒，所以等待0.5秒后跳转到第一张图片
        setTimeout(function(){
            ul.style.left = "0px";
            count = 0;
            ul.style.transition = "none";
        },500) 
    }

    ul.style.left = -count * 520 + 'px';

    key = false;//关锁

    //0.5秒后开锁
    setTimeout(function () {
        key = true;
    }, 500);

    setCircle();//设置小圆点的位置
}

//事件委托 监听小圆点点击事件
const circles = document.getElementsByClassName("content")[0];//获取事件委托的对象
circles.onclick = function (e) {
    if(e.target.nodeName.toLowerCase() == "a"){
        count = parseInt(e.target.innerHTML) - 1;
        ul.style.left = -count * 520 + 'px';

        setCircle();//设置小圆点的位置
    }
}

//设置小圆点
function setCircle() {
    for(var i = 0; i < len; i++){
        if(i == count % 5){
            a[i].classList.add("select");                  
        }else{
            a[i].classList.remove("select");
        }
    }
}


//自动轮播
let timer = setInterval(() => {
    rightMove();
}, 5000);