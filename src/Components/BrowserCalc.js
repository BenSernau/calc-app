import React from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";

class BrowserCalc extends React.Component {
	constructor() {
		super();
		this.state = {
			currNum: null,
			operator: null,
			prevNum: null
		}

		this.clearField = this.clearField.bind(this);
		this.evaluate = this.evaluate.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.typeInNumber = this.typeInNumber.bind(this);
		this.typeInOperator = this.typeInOperator.bind(this);
	}

	clearField() {
		this.setState({
			currNum: null,
			operator: null,
			prevNum: null
		})
	}

	handleKeyPress(key) {
		if (key === "enter" || key === "=")
		{
			this.evaluate();
		}

		else if (key === "c")
		{
			this.clearField();
		}

		else if (parseInt(key, 10) >= 0)
		{
			this.typeInNumber(parseInt(key, 10));
		}

		else
		{
			this.typeInOperator(key);
		}
	}

	typeInNumber(num) {
		this.setState(prevState => {
			return ({currNum: parseInt(("" + (prevState.currNum === null ? "" : prevState.currNum) + num), 10)})
		})
	}

	typeInOperator(op) {
		if (this.state.operator !== null) {
			this.evaluate();
		}

		this.setState(prevState => {
			return({
				currNum: null,
				operator: op,
				prevNum: parseInt(prevState.currNum, 10)
			})
		})
	}

	evaluate() {
		switch(this.state.operator) {

			case "*":
				this.setState(prevState => {
					return({
						currNum: prevState.prevNum * prevState.currNum,
						operator: null,
						prevNum: null
					})
				});
				break;

			case "/":
				this.setState(prevState => {
					return({
						currNum: Math.round(prevState.prevNum / prevState.currNum),
						operator: null,
						prevNum: null
					})
				});			
				break;

			case "+":
				this.setState(prevState => {
					return({
						currNum: prevState.prevNum + prevState.currNum,
						operator: null,
						prevNum: null
						
					})
				});			
				break;

			case "-":
				this.setState(prevState => {
					return({
						currNum: prevState.prevNum - prevState.currNum,
						operator: null,
						prevNum: null
					})
				});			
				break;

			default:
				break;
		}
	}

	render() {
		return (
			<div>
				<KeyboardEventHandler handleKeys = {['c', 'numeric', '/', '+', '*', '-', 'enter', '=']} onKeyEvent={(key) => this.handleKeyPress(key)}/>
				<form className = "calcCanvas">
					<h1 className = "title">Ben's Browser Calculator</h1>
					<p className = "numField">{this.state.currNum}</p>
					<button className = "clearButton" type = "button" onClick = {this.clearField}>Clear</button>
					<button className = "smallButton" type = "button" onClick = {() => ("" + this.state.currNum).length < 5 ? this.typeInNumber(0) : null}>0</button>
					<button className = "smallButton" type = "button" onClick = {() => this.state.currNum === null ? null : this.typeInOperator("*")}>*</button>
					<br/>
					<button className = "smallButton" type = "button" onClick = {() => ("" + this.state.currNum).length < 5 ? this.typeInNumber(1) : null}>1</button>
					<button className = "smallButton" type = "button" onClick = {() => ("" + this.state.currNum).length < 5 ? this.typeInNumber(2) : null}>2</button>
					<button className = "smallButton" type = "button" onClick = {() => ("" + this.state.currNum).length < 5 ? this.typeInNumber(3) : null}>3</button>
					<button className = "smallButton" type = "button" onClick = {() => this.state.currNum === null ? null : this.typeInOperator("/")}>/</button>
					<br/> 
					<button className = "smallButton" type = "button" onClick = {() => ("" + this.state.currNum).length < 5 ? this.typeInNumber(4) : null}>4</button>
					<button className = "smallButton" type = "button" onClick = {() => ("" + this.state.currNum).length < 5 ? this.typeInNumber(5) : null}>5</button>
					<button className = "smallButton" type = "button" onClick = {() => ("" + this.state.currNum).length < 5 ? this.typeInNumber(6) : null}>6</button>
					<button className = "smallButton" type = "button" onClick = {() => this.state.currNum === null ? null : this.typeInOperator("+")}>+</button>
					<br/>
					<button className = "smallButton" type = "button" onClick = {() => ("" + this.state.currNum).length < 5 ? this.typeInNumber(7) : null}>7</button>
					<button className = "smallButton" type = "button" onClick = {() => ("" + this.state.currNum).length < 5 ? this.typeInNumber(8) : null}>8</button>
					<button className = "smallButton" type = "button" onClick = {() => ("" + this.state.currNum).length < 5 ? this.typeInNumber(9) : null}>9</button>
					<button className = "smallButton" type = "button" onClick = {() => this.state.currNum === null ? null : this.typeInOperator("-")}>-</button>
					<br/>
					<button className = "equalButton" type = "button" onClick = {this.state.currNum === null || this.state.prevNum === null ? null : this.evaluate}>=</button>
					<p>*Decimal numbers will be rounded...</p>
				</form>
			</div>
		);
	}
}

export default BrowserCalc;