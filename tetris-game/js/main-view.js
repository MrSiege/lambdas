import React from "react";

export default class MainView extends React.Component{
    /**
     * constructor function
     * @constructor
     * @param {object} props constructor function parameter list
     * @return {void}
     * */
    constructor(props){
        super(props);
        this.col = 16;
        this.row = 20;
        this.cellArray = [];
        this.currentShape = undefined;
        this.checkShape = undefined;
    }
    /**
     * react life cycle
     * @return {void}
     * */
    componentDidMount(){

    }
    /**
     * react life cycle
     * @return {void}
     * */
    componentWillMount(){

    }
    /**
     * react life cycle
     * @param {object} nextProps new properties passed by the parent
     * @return {void}
     * */
    componentWillReceiveProps(nextProps){

    }
    /**
     * Rendering function
     * @return {jsx} react components
     */
    render() {
        return <div id="mainFrom" className="">
        </div>
    }
}