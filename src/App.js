import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// data
import { todos } from './todos.json';
// subcomponents
import TodoForm from './components/TodoForm';

class App extends Component {

  constructor() {
    super();
    this.state = {
      todos
    }
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  removeTodo(index) {
    this.setState({
      todos: this.state.todos.filter((e, i) => {
        return i !== index
      })
    });
  }

  handleAddTodo(todo) {
    this.setState({
      todos: [...this.state.todos, todo]
    })
  }

  returnPriorityColor(priority) {
    switch (priority) {
      case "low":
        return ("success")
      case "medium":
        return ("warning")
      case "high":
        return ("danger")
      default:
        return ("success")
    }
  }

  doTodo(index) {
    this.setState({
      
    })
  }

  render() {
    const todos = this.state.todos.map((todo, i) => {
      return (
        <div className="col-md-4" key={i}>
          <div className="card mt-4 border-0">
            <div className={"card-header text-center bg-"+this.returnPriorityColor(todo.priority)+" text-white"}>
              <h4>{todo.title}</h4>
              <span className={"badge badge-pill badge-light ml-2"}>
                {todo.priority}
              </span>
            </div>
            <div className="card-body">
              {todo.description}
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger btn btn-block fa-icon fa-delete"
                onClick={this.removeTodo.bind(this, i)}>
                Delete
              </button>
              <button
                className="btn btn-success btn btn-block fa-icon fa-done"
                onClick={this.doTodo.bind(this, i)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )
    });

    // RETURN THE COMPONENT
    return (
      <div className="App">

        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
              <img src={logo} className="App-logo" alt="logo" />
          </a>
            <ul className="task-number mb-0" style={{listStyleType: "none"}}>
              <li>
                Tasks
                <span className="badge badge-pill badge-dark ml-2">
                  {this.state.todos.length}
                </span>
              </li>
            </ul>
        </nav>

        <div className="container">
          <div className="row mt-4">
          
            <div className="col-md-4 text-center">
              <TodoForm onAddTodo={this.handleAddTodo}></TodoForm>
            </div>

            <div className="col-md-8">
              <div className="row">
                {todos}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
