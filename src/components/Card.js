import React, {Component} from 'react';
var abv = require('number-abbreviate');
export default class Card extends Component{
    constructor(props){
        super(props)
        this.format = this.props.formatter.bind(this);
    }

    render(){
        return(
            <div className="card">
                <div className="bubble">
                <span>{abv(this.props.item.qty)}</span>
                </div>
                <div className="text">
                <h3>Rp {this.format(this.props.item.value)}</h3>
                {this.props.item.qty > 999 ? <span className="card-desc">x {this.format(this.props.item.qty, 0)}</span>: ''}
                </div>
                
            </div>   
        )
    }
}