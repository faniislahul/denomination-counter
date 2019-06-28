import React, {Component} from 'react';
import Card from './components/Card';
import './assets/css/main.scss';

const denomination = [100000, 50000, 20000, 10000, 5000, 1000, 500, 200, 100, 50]
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      initInput: false,
      amount: '',
      result: [],
      leftover: 0,
      valid: true
    }
  }

  format(amount, decPlace) {
    const decimalCount = decPlace !== undefined ? decPlace : 2;
    const decimal = ",";
    const thousands = ".";
    
    try {
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount > 0 ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };


  doCalculate = () =>{
    if(!this.state.initInput){
      this.setState({
        initInput: true, 
      })

      this.refs['amountInput'].focus()
      return;
    }

    if(!this.state.valid){
      return;
    }

    let i = 0;
    let amount = this.state.amount.replace('Rp', '').replace(/\./g, '').replace(/,[0-9]/, '').replace(/ /g, '');
    let min = Math.min(...denomination);
    let result = [];

    while(amount >= min){
      let qty = (amount/denomination[i]>>0);
      amount = amount % denomination[i]
      if(qty > 0){
        result.push({
          value: denomination[i],
          qty: qty
        })
      }
      i++
    }

    this.setState({
      result: result,
      leftover: amount
    })

  }

  onAmountChange = (value)=>{
    let re = /^(Rp )?([0-9]?(Rp){1,3}(\.[0-9]{3})*)?([0-9]{1,})?(,\d{1,2})*\d$/g
    let valid = re.test(value) 

    this.setState({
      amount: value,
      valid: valid
    })
  }

  

  render(){
    return(
      <div className="main">
        <h1>Denomination Counter</h1>

        <div className="input-bar">
          <input ref="amountInput" onChange={(e)=>{this.onAmountChange(e.target.value)}} value={this.state.amount} className={this.state.initInput ? 'input' : 'input collapsed'} placeholder="Input nominal"></input>
          <div className={!this.state.initInput ? 'button' : this.state.valid ? 'button extend' : 'button extend error'} onClick={()=>{this.doCalculate()}}>{!this.state.initInput ? 'Start' : 'Calculate'}</div>
        </div>
        {!this.state.valid ? <span className="error-message">Please input valid nominal e.g. 'Rp 35.000,00', '50000', or '12.000,00'</span> : ''}
        { 
          this.state.initInput && this.state.result.length > 0 ? 
        <h3 className="sub-header">What you got: </h3>
        : ''
        }
        <div className="result-box">
          {this.state.result.map((item, index)=>{
            return(
              <Card item={item} key={index} formatter={this.format}/>
            )
          })}
        </div>
        { 
          this.state.initInput && this.state.result.length > 0 && this.state.leftover > 0? 
            <h3>You have Rp {this.format(this.state.leftover)} left</h3>
          :''
        }
      </div>
    )
  }


}

export default App;
