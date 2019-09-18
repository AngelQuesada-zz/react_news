import React, {
  Component
} from 'react';

class TodoForm extends Component {

  constructor() {

    super();
    this.state = {
      title: '',
      responsible: '',
      description: '',
      priority: 'low'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  is_empty(element) {

    if (element === null || element === "undefined" || element === "") {
      return true
    } else {
      return false
    }

  }

  check_form() {

    if (this.is_empty(this.state.title) ||
      this.is_empty(this.state.responsible) ||
      this.is_empty(this.state.description) ||
      this.is_empty(this.state.priority)) {
      alert("You must fill all the fields")
      return false
    } else {
      return true
    }

  }

  set_empty() {

    this.setState({
      title: '',
      responsible: '',
      description: '',
      priority: 'low'
    });

  }

  handleSubmit(e) {

    e.preventDefault();
    if (!this.check_form()) {
      return false;
    }
    this.props.onAddTodo(this.state);
    this.set_empty();

  }

  handleInputChange(e) {

    const {value,name} = e.target;
    console.log(value, name);
    this.setState({
      [name]: value
    });

  }

  render() {
    return (
      <div className="card news-form">
        <div className='card-header'>
          Busca tus noticias
        </div>
        <form onSubmit={this.handleSubmit} className="card-body">
          <div className="form-group">
            <input
              type="text"
              name="title"
              className="form-control"
              value={this.state.title}
              onChange={this.handleInputChange}
              placeholder="Title"
              />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="responsible"
              className="form-control"
              value={this.state.responsible}
              onChange={this.handleInputChange}
              placeholder="Responsible"
              />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="description"
              className="form-control"
              value={this.state.description}
              onChange={this.handleInputChange}
              placeholder="Description"
              />
          </div>
          <div className="form-group">
            <select
                name="priority"
                className="form-control"
                value={this.state.priority}
                onChange={this.handleInputChange}
              >
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
          </div>
          <button type="submit" className="btn bg-dark text-white fa-icon fa-search">
            Buscar noticias
          </button>
        </form>
      </div>
    )
  }

}

export default TodoForm;
