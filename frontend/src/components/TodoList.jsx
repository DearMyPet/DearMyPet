import React from "react"
import ReactDOM from "react-dom"
import _ from "lodash"
import '../css/TodoList.css';


function PreventTodoList(){


const initItems = [{value: '6월 4일 13시 동물병원 예약', todo: true}, {value: '7월 5일 심장사상충 접종', todo: true}, {value: '7월 dear my pet box 구매', todo: false}];

class Todo extends React.Component {
  
  state = {items: initItems}

  handleValue = (value, index) => {
    let items = this.state.items;
    let upperCaseValue = value.charAt(0).toUpperCase() + value.slice(1);
    items[index].value = upperCaseValue;
    this.setState({items});
  }

  handleAddItem = (event) => {
	this.setState({items: [{value:'', todo: true}, ...this.state.items]});	
}

  handleClose = (index) => {
	let items = this.state.items;
	items.splice(index,1);
	this.setState({items});
}

  handleClear = (event) => {
	let items = this.state.items;
	items = items.filter(item => item.todo);
	this.setState({items});
}
  
  handleToggle = (index) => {
    let items = this.state.items;
    let item = items.splice(index,1)[0];
    item.todo = !item.todo;
    items.unshift(item);
    this.setState({items});
  }
  
 render(){
  return (
    <div class='main-wrap'>
      <TodoList 
        value={this.handleValue} 
        close={this.handleClose}   
        items={this.state.items}
        toggle={this.handleToggle}
        onClick={this.handleAddItem} 
        done={false}
        // textHeader={'Todo List'}
        textIcon={'+'}
        textButton={'Add List'}
        />
      <TodoList
        close={this.handleClose} 
        items={this.state.items}
        toggle={this.handleToggle}
        onClick={this.handleClear}
        done={true}
        // textHeader={'completed'}
        textIcon={'-'}
        textButton={'Remove All'}
        />
    </div>  
      );
  }
}

class TodoList extends React.Component { 

  render() {
    let items = this.props.items;
    items = items.map((item, index) => [
      <TodoItem 
        value={this.props.value} 
        close={this.props.close} 
        index={index} 
        item={item}
        toggle={this.props.toggle}
        />, item.todo]);
    items = items.filter(item => (item[1] + this.props.done) == 1);
    items = items.map(item => item[0]);
    
    return(
      <div class='wrap'>
        <div class='header'>
          {/* <span class='todo-title'>{this.props.textHeader}</span> */}
          <span className="todo-icon">
            {this.props.textIcon}
          </span>
          <span 
            className='todo-title'
            onClick={this.props.onClick} >{this.props.textButton}</span>
        </div> 
        <ul>
        {items}
        </ul>
      </div>  
    ); 
  }
}

class TodoItem extends React.Component {
  
  handleChange = (event) => {
   this.props.value(event.target.value, this.props.index);
 }  
  handleClose = (event) => {
   this.props.close(this.props.index);
 }
  
  handleToggle = (event) => {
   this.props.toggle(this.props.index);
 }
 
  render() {
    
    const done = this.props.item.todo ? '' : 'done'
    
    return(
       <li>
        <span 
          class='toggle' 
          onClick={this.handleToggle}>◯ </span>
         <input 
            class={done}
            value={this.props.item.value} 
            size='30'
            onChange={this.handleChange}
            onFocus={this.props.focus}
           />
         <span 
           class='close' 
           onClick={this.handleClose}>✕</span></li>       
      );    
  }
}

// ReactDOM.render(<Todo />, document.getElementById('root'));
//     return(
//         <div id="root"/>
//     )

 }

//  import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


export default PreventTodoList; 