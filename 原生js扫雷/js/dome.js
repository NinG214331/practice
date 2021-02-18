function Mine(tr,td,mineNum) {
    this.tr = tr; //行数
    this.td = td; //列数
    this.mineNum = mineNum; //雷的数量

    this.squares = []; //储存所有方块的信息
    this.tds = []; // 储存所有的单元格dom
    this.surplusMine; //剩余雷的数量
    this.allRight = false; //判断标记的是否全是雷

    this.parent = document.querySelector(".gameBox");

}

//随机确定雷的位置
Mine.prototype.randomNum = function(){
    var square = new Array(this.tr*this.td);
    for(var i = 0; i < square.length; i++){
        square[i] = i;
    }
    square.sort(function(){return 0.5 - Math.random()});
    return square.splice(0,this.mineNum);
}

//初始化 
Mine.prototype.init = function(){
    var rn = this.randomNum();
    var n = 0;
    this.span = document.getElementsByClassName('mineNum')[0];
    this.surplusMine = this.mineNum;
    this.span.innerHTML = this.surplusMine;

    this.parent.oncontextmenu = function () {return false;}

    //存储方格信息
    for(var i = 0; i < this.tr; i++){
        this.squares[i] = [];
        for(var j = 0; j < this.td; j++){
            n++;
            if(rn.indexOf(n) != -1){
                this.squares[i][j] = {type:'mine', x:j, y:i};
            }else{
                this.squares[i][j] = {type:'number', x:j, y:i, value:0}
            }
        }
    }
    // console.log(this.squares);


    this.updateNum();
    this.createDom();


}

//生成表格
Mine.prototype.createDom = function () {
    var table = document.createElement('table');
    var This = this;

    for(var i = 0; i < this.tr; i++){
        var domTr = document.createElement('tr');
        this.tds[i] = [];

        for(var j = 0; j < this.td; j++){
            var domTd = document.createElement('td');
            
            domTd.pos = [i,j];
            domTd.onmousedown = function(){
                This.play(event,this)
            }

            this.tds[i][j] = domTd;

            // if(this.squares[i][j].type == 'mine'){
            //     domTd.className = "mine";
            // }
            // if(this.squares[i][j].type == 'number'){
            //     domTd.innerHTML = this.squares[i][j].value;
            // }

            domTr.appendChild(domTd);
        }

        table.appendChild(domTr);
    }

    this.parent.innerHTML = '';
    this.parent.appendChild(table);
}

//获取雷周围的格子
Mine.prototype.getAround = function(square){

    var x = square.x;
    var y = square.y;
    var result = [];

    for(var i = x - 1; i <= x + 1; i++){
        for(var j = y - 1; j <= y + 1; j++){
            if(
                i < 0 ||
                j < 0 ||
                i > this.td - 1 ||
                j > this.tr - 1 ||
                (i == x && j == y) ||
                this.squares[j][i].type == 'mine'
            ){
                continue;
            }
            result.push([j,i]);
        }
    }
    return result;
}

//更新数字
Mine.prototype.updateNum = function () {
    var n = 0;
    for(var i = 0; i < this.tr; i++){
        for(var j = 0; j < this.td; j++){
            
            if(this.squares[i][j].type == 'number'){
                continue;
            }
            n++;
            // console.log(n);
            var num = this.getAround(this.squares[i][j]);
            // console.log(num);
            for(var k = 0; k < num.length; k++){
                this.squares[num[k][0]][num[k][1]].value += 1;
            }
        }
    }
    // console.log(this.squares);
}

//点击事件
Mine.prototype.play = function (e,obj) {
    var This = this;
    // console.log(e);
    if(e.which == 1 && obj.className != 'flag'){
        var curSqu = this.squares[obj.pos[0]][obj.pos[1]];
        var cl = ['zero','one','two','three','four','five','six','seven','eight'];

        if(curSqu.type == 'number'){
            obj.innerHTML = curSqu.value;
            obj.className = cl[curSqu.value];

            if(curSqu.value == 0){
                obj.innerHTML = '';
               
                function getAllZero(square) {
                    var all = This.getAround(square);

                    for(var i = 0; i < all.length; i++){
                        var x = all[i][0];
                        var y = all[i][1];

                        if(This.tds[x][y].className != 'flag'){
                            This.tds[x][y].className = cl[This.squares[x][y].value];

                            if(This.squares[x][y].value == 0){
                                if(!This.tds[x][y].check){
                                    This.tds[x][y].check = true;
                                    getAllZero(This.squares[x][y]);
                                }
                            }else{
                                This.tds[x][y].innerHTML = This.squares[x][y].value;
                            }
                        }
                        
                    }
                }
                getAllZero(curSqu);
            }

        }else if(curSqu.type == 'mine'){
            // obj.className = 'mine';
            this.gameOver(obj);
        }
    }else if(e.which == 3){
        if(obj.className && obj.className != 'flag'){
            return;
        }
        obj.className = obj.className == 'flag' ? '' : 'flag';

        if(obj.className == 'flag'){
            this.span.innerHTML = --this.surplusMine;
        }else{
            this.span.innerHTML = ++this.surplusMine;
        }

        if(this.surplusMine == 0){
            this.allRight = true;
            for(var i = 0; i < this.tr; i++){
                for(var j = 0; j < this.td; j++){
                    if(this.tds[i][j].className == 'flag'){
                        if(this.squares[i][j].type != 'mine'){
                            // console.log(this.squares[i][j].value);
                            this.allRight = false;
                            break;
                        }
                    }else{
                        continue;
                    }
                }
            }

            if(this.allRight == true){
                alert('游戏胜利');
                this.gameOver();
            }else{
                alert('游戏失败');
                this.gameOver();
            }
        }
    }
}

//点击到雷游戏结束
Mine.prototype.gameOver = function (clickTd) {
    clickTd = clickTd || {}  
    for(var i = 0; i < this.tr; i++){
        for(var j = 0; j < this.td; j++){
            if(this.squares[i][j].type == 'mine'){
                this.tds[i][j].className = "mine";
                // console.log(this.squares[i][j]);
            }
            
            this.tds[i][j].onmousedown = null;
        }
    }
    clickTd.style.backgroundColor = '#f00';

}

// var mine = new Mine(9,9,10);
// mine.init();

var btn = document.getElementsByTagName('button');
var ln = 0;
var mine = null;
var arr = [[9,9,10],[16,16,40],[16,30,99]];

for(var i = 0; i < btn.length - 1; i++){
    (function (i) {
        btn[i].onclick = function () {
            btn[ln].className = '';
            this.className = 'active';

            mine = new Mine(...arr[i]);
            mine.init();

            ln = i; 
        }
        
    } (i))
}

btn[0].onclick();
btn[3].onclick = function () {
    mine.init();
}

