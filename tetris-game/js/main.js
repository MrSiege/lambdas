/**
 * Created by 陈威 on 2017/12/27.
 */
var COL = 16,ROW = 20;
var cellArray;
var shape;  //当前玩家操控的方块对象
var check_shape;//用于碰撞检测的方块对象
window.onload = Start; //游戏开始
function Start(){
    gameInit();
    setInterval(function () {
        shiftDown(shape);
    },1000);
}
//启动游戏时的初始化操作
function gameInit() {
    var mainDiv = document.getElementById("mainFrom");
    for(var row =0; row < ROW; row++){
        for(var col = 0; col < COL; col++){
            var div = document.createElement("div");
            div.setAttribute("fill", "false");
            div.setAttribute("class", "cell");
            div.setAttribute("name", "cell");
            mainDiv.appendChild(div);
        }
    }
    /*绑定按键事件 上 = 38 下 = 40  左 = 37 右 = 39 */
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        switch (e && event.keyCode){
            case 40:
                while(!shiftDown(shape)){}
                break;
            case 37:
                shiftLeft(shape);
                break;
            case 39:
                shiftRight(shape);
                break;
            case 90:    //转向
                turnTo(shape);
                break;
        }
    };
    cellArray = document.getElementsByName("cell");
    shape = new Shape1();
    shape.init();
    shape.setCellXY(shape.direction);
    check_shape = new Shape1();
    check_shape.init();
    fill(shape);
}
/*根据图形对象的数据填充指定索引的cell*/
function  fill(shape) {
    for (var i=0;i < shape.cellObject.length;i++){
        cellArray[shape.cellObject[i].getIndex()].setAttribute("class","fill");
        cellArray[shape.cellObject[i].getIndex()].setAttribute("fill","true");
    }
}
/*根据图形对象移除指定索引的cell*/
function removeFill(shape){
    for (var i=0;i < shape.cellObject.length;i++){
        cellArray[shape.cellObject[i].getIndex()].setAttribute("class","cell");
        cellArray[shape.cellObject[i].getIndex()].setAttribute("fill","false");
    }
}
/**
 * 下移一格
 * @return {boolean}  到底了
 * */
function shiftDown(shape) {
    if(CollisionDetection(shape,"down")) {immobilization(shape);return true;}
    removeFill(shape);
    shape.x++;
    shape.setCellXY(shape.direction);
    fill(shape);
}
//左移一格
function shiftLeft(shape) {
    if(CollisionDetection(shape,"left"))return;
    removeFill(shape);
    shape.y--;
    shape.setCellXY(shape.direction);
    fill(shape);
}
//右移一格
function shiftRight(shape) {
    if(CollisionDetection(shape,"right"))return;
    removeFill(shape);
    shape.y++;
    shape.setCellXY(shape.direction);
    fill(shape);
}
/** 碰撞检查
 * @param shape 检查对象
 * @return {boolean} 是否碰撞到物体 false = 未碰撞到  true 已碰撞到物体
 * */
function check(shape){
    var check = false;
    for(var i = 0 ;i < shape.cellObject.length ; i++){
        if(shape.cellObject[i].x > ROW - 1 || shape.cellObject[i].y < 0 || shape.cellObject[i].y > COL-1 || cellArray[shape.cellObject[i].getIndex()].getAttribute("fill") == "true"){
            check = true;
        }
    }
    return check;
}

/**
 * 碰撞检测，返回true则说明碰到了墙壁
 * @param shape 方块对象
 * @param direction 检测方向
 * @return {boolean}
 */
function CollisionDetection(shape,direction) {
    removeFill(shape);
    //这里需要完整的复制一个对象，而不是获得原对象的引用地址。
    cloneShape(shape);
    switch(direction){
        case "left":
            check_shape.y--;
            break;
        case "right":
            check_shape.y++;
            break;
        case "down":
            check_shape.x++;
            break;
    }
    check_shape.setCellXY(check_shape.direction);
    if(check(check_shape)){
        fill(shape);
        return true;
    }else{
        return false;
    }
}
/**
 * 使传入的方块(shape)对象固定,并生成新的方块
 * @param shape 需要固定的方块对象
 * */
function immobilization(shape) {
    fill(shape);
    eliminateBlock();//检查是否有消除的行
    //随机新建一个shape对象
    var num = parseInt(Math.random()*(4-1+1) + 1);
    switch (num){
        case 1:
            this.shape = new Shape1();
            check_shape = new Shape1();
            break;
        case 2:
            this.shape = new Shape2();
            check_shape = new Shape2();
            break;
        case 3:
            this.shape = new Shape3();
            check_shape = new Shape3();
            break;
        case 4:
            this.shape = new Shape4();
            check_shape = new Shape4();
            break;
    }
    this.shape.init();
    check_shape.init();
    this.shape.setCellXY(this.shape.direction);
}
/**
 * 消除已填充满的行
 *
 * */
function eliminateBlock(){
    /*var mess_1 = "",mess_2 = "";*/
    var x,y;
    for(x = 0; x < ROW ; x++){
        var bool = true;//假设每行都能消除
        var index = 0;
        for(y = 0; y < COL ; y++){
            //如果一行有一个空位则无法消除
            if("false" === cellArray[x*COL+y].getAttribute("fill")){
                bool = false;
                break;
            }
        }
        if(bool){
            var shape_1 = new Shape1();
            var shape_2 = new Shape1();
            for(y = 0 ; y < COL ; y++){
                shape_1.cellObject[y] = new CellObject();
                shape_1.cellObject[y].setXY(x,y);
                /*mess_1+=" ["+x+","+y+"] ";*/
            }
            for(var i = 0 ;i <  x ; i++){
                for(y = 0; y < COL ; y++){
                    if("true" === cellArray[i*COL+y].getAttribute("fill")){
                        shape_2.cellObject[index++] = new CellObject();
                        shape_2.cellObject[index-1].setXY(i,y);
                       /* mess_2+=" ["+i+","+y+"] "*/
                    }
                }
            }
          /*  console.log("需要消除的方块"+mess_1);
            console.log("需要向下移动的方块"+mess_2);*/
            window.setInterval(removeFill(shape_1),300); //移除方块
            window.setInterval(removeFill(shape_2),300);
            for(var k = 0 ; k < shape_2.cellObject.length ; k++){
                shape_2.cellObject[k].x++;
            }
            fill(shape_2);//重新绘制
        }
    }
}
function turnTo(shape) {
    //复制一个对象
    cloneShape(shape);
    //预测转向后是否有碰撞
    switch (shape.direction){
        case "up":
            check_shape.direction = "right";
            break;
        case "down":
            check_shape.direction = "left";
            break;
        case "left":
            check_shape.direction = "up";
            break;
        case "right":
            check_shape.direction = "down";
            break;
    }
    check_shape.setCellXY(check_shape.direction);
    removeFill(shape);
    //如果未碰撞到物体
    if(!check(check_shape)){
        removeFill(shape);
        shape.direction = check_shape.direction;
        shape.setCellXY(shape.direction);
    }
    fill(shape);
}
/** 深拷贝一个Shape对象，一个全新的对象，而不是被拷贝对象的引用。
 *  @param shape 需要拷贝的对象
 * */
function cloneShape(shape) {
    check_shape.x = shape.x;
    check_shape.y = shape.y;
    check_shape.direction = shape.direction;
    check_shape.setCellXY(check_shape.direction);
}