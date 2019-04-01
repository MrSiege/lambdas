/**
 * Created by 陈威 on 2017/12/29.
 */
/*单元格对象,组成各种形状的基本单位*/
function CellObject() {
    this.x = 0;
    this.y = 0;
    this.setXY = function(x,y) {
        this.x = x;
        this.y = y;
    };
    /*取得当前单元格的索引*/
    this.getIndex = function () {
        return this.x * COL + this.y;
    };
}
/**
 * 图形对象的基类，定义了每个方块对象都共同拥有的属性
 * */
function Patterning(){
    //图形基点坐标
    this.x = 0;
    this.y = 0;
    //小单元格对象数组
    this.cellObject = [];
    //当前方块的方向
    this.direction = "";
}
//初始化方法
Patterning.prototype.init = function () {
    this.x = 2;
    this.y = 7;
    this.direction = "up";
    for(var i = 0 ;i < 4; i++){
        this.cellObject[i] = new CellObject();
    }
};
//以图形的基点计算出图形
Patterning.prototype.setCellXY = function (direction) {};

/*L方块对象,由多个单元格对象组成*/
function Shape1(){
    Patterning.call(this);
    //计算出组成该形状的各个小单元的坐标
    this.setCellXY = function (direction) {
        switch (direction){
            case "up":
                this.cellObject[0].setXY(this.x,this.y);
                this.cellObject[1].setXY(this.x,this.y+1);
                this.cellObject[2].setXY(this.x-1,this.y);
                this.cellObject[3].setXY(this.x-2,this.y);
                break;
            case "down":
                this.cellObject[0].setXY(this.x,this.y);
                this.cellObject[1].setXY(this.x,this.y-1);
                this.cellObject[2].setXY(this.x+1,this.y);
                this.cellObject[3].setXY(this.x+2,this.y);
                break;
            case "left":
                this.cellObject[0].setXY(this.x,this.y);
                this.cellObject[1].setXY(this.x-1,this.y);
                this.cellObject[2].setXY(this.x,this.y-1);
                this.cellObject[3].setXY(this.x,this.y-2);
                break;
            case "right":
                this.cellObject[0].setXY(this.x,this.y);
                this.cellObject[1].setXY(this.x+1,this.y);
                this.cellObject[2].setXY(this.x,this.y+1);
                this.cellObject[3].setXY(this.x,this.y+2);
                break;
        }
    };
}
Shape1.prototype = new Patterning();
function Shape2() {
    Patterning.call(this);
    this.setCellXY = function (direction) {
        this.cellObject[0].setXY(this.x,this.y);
        this.cellObject[1].setXY(this.x-1,this.y);
        this.cellObject[2].setXY(this.x-1,this.y+1);
        this.cellObject[3].setXY(this.x,this.y+1);

    };
}
Shape2.prototype = new Patterning();
function Shape3() {
    Patterning.call(this);
    this.setCellXY = function (direction) {
        if(direction == "up" || direction == "down"){
            this.cellObject[0].setXY(this.x,this.y);
            this.cellObject[1].setXY(this.x-1,this.y);
            this.cellObject[2].setXY(this.x+1,this.y);
            this.cellObject[3].setXY(this.x+2,this.y);
        }else{
            this.cellObject[0].setXY(this.x,this.y);
            this.cellObject[1].setXY(this.x,this.y-1);
            this.cellObject[2].setXY(this.x,this.y+1);
            this.cellObject[3].setXY(this.x,this.y+2);
        }
    };
}
Shape3.prototype = new Patterning();

function Shape4() {
    Patterning.call(this);
    this.setCellXY = function (direction) {
        if(direction == "up" || direction == "down") {
            this.cellObject[0].setXY(this.x, this.y);
            this.cellObject[1].setXY(this.x - 1, this.y);
            this.cellObject[2].setXY(this.x, this.y-1);
            this.cellObject[3].setXY(this.x + 1, this.y-1);
        }else{
            this.cellObject[0].setXY(this.x,this.y);
            this.cellObject[1].setXY(this.x,this.y+1);
            this.cellObject[2].setXY(this.x-1,this.y);
            this.cellObject[3].setXY(this.x-1,this.y-1);
        }
    };
}
Shape4.prototype = new Patterning();