import _ from "./gracefully";
const DIRECTION = {
    UP:"up",
    DOWN:"down",
    LEFT:"left",
    RIGHT:"right"
};
/**
 * 单元格
 * @param {number} x坐标系
 * @param {number} y坐标系
 * @param {function} setXY 设置 [x,y] 直角坐标系坐标
 * */
class Cell{
    x = 0;
    y = 0;
    setXY({x, y}){
        this.x = x;
        this.y = y;
    }
}
class Patterning{
    x = 0;
    y = 0;
    direction = "up";
    cells = [];
    /**
     * 构造函数
     * @constructor
     * */
    constructor(){
        this.cells = _.initialArray(()=>new Cell(), {numberSquares:4}.numberSquares);
    }

    /**
     * 以图形的基点计算出图形
     * @param {string} direction
     * @return {void}
     * */
    setCellXY({direction}){

    }
}
class Shape1 extends Patterning{
    /**
     * 构造函数
     * @constructor
     * @param {object} props construction parameter list
     * */
    constructor(props){
        super(props);
    }
    /**
     * 以图形的基点计算出图形
     * @param {string} direction
     * @return {void}
     * */
    setCellXY({direction}){
        switch (direction){
            case DIRECTION.UP:
                this.cellObject[0].setXY(this.x,this.y);
                this.cellObject[1].setXY(this.x,this.y+1);
                this.cellObject[2].setXY(this.x-1,this.y);
                this.cellObject[3].setXY(this.x-2,this.y);
                break;
            case DIRECTION.DOWN:
                this.cellObject[0].setXY(this.x,this.y);
                this.cellObject[1].setXY(this.x,this.y-1);
                this.cellObject[2].setXY(this.x+1,this.y);
                this.cellObject[3].setXY(this.x+2,this.y);
                break;
            case DIRECTION.LEFT:
                this.cellObject[0].setXY(this.x,this.y);
                this.cellObject[1].setXY(this.x-1,this.y);
                this.cellObject[2].setXY(this.x,this.y-1);
                this.cellObject[3].setXY(this.x,this.y-2);
                break;
            case DIRECTION.RIGHT:
                this.cellObject[0].setXY(this.x,this.y);
                this.cellObject[1].setXY(this.x+1,this.y);
                this.cellObject[2].setXY(this.x,this.y+1);
                this.cellObject[3].setXY(this.x,this.y+2);
                break;
        }
    };
}
class Shape2 extends Patterning{
    /**
     * 以图形的基点计算出图形
     * @param {string} direction
     * @return {void}
     * */
    setCellXY({direction}){
        if(direction === DIRECTION.UP || direction === DIRECTION.DOWN){
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
class Shape3 extends Patterning{
    /**
     * 以图形的基点计算出图形
     * @param {string} direction
     * @return {void}
     * */
    setCellXY({direction}){
        if(direction === DIRECTION.UP || direction === DIRECTION.DOWN) {
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
class Shape4 extends Patterning{
    /**
     * 以图形的基点计算出图形
     * @param {string} direction
     * @return {void}
     * */
    setCellXY({direction}){
        this.cellObject[0].setXY(this.x,this.y);
        this.cellObject[1].setXY(this.x-1,this.y);
        this.cellObject[2].setXY(this.x-1,this.y+1);
        this.cellObject[3].setXY(this.x,this.y+1);
    };
}