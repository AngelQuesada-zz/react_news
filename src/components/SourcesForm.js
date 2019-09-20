import React, {Component} from 'react';

class SourcesForm extends Component {

  constructor() {
    super();
    this.state = {
      category: 'general',
      language: 'en',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getSourcesFromUrl = this.getSourcesFromUrl.bind(this);
  }

  async getSourcesFromUrl() {

    const apikey = "1884b8edb96c4d66885c7c6c52481459"
    const category = this.state.category
    const language = this.state.language

    const url = "https://newsapi.org/v2/sources?"
    +"language="+language+"&"
    +"category="+category+"&"
    +"apiKey="+apikey

    var req = new Request(url)
    const response = await fetch(req)
    const json = await response.json()
    
    return json.sources

  }

  async handleSubmit(e) {

    e.preventDefault();
    const data = {
      category:this.state.category,
      language:this.state.language
    }
    this.props.sendDataToApp(data)

  }

  handleInputChange(e) {

    const {value,name} = e.target;
    this.setState({
      [name]: value
    });

  }

  render() {

    const search_button_icon = this.props.loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-search"></i>

    return (
      <div className="news-form">
        <div className='header'>
          Search for news
        </div>
        <form onSubmit={this.handleSubmit} className="body">
          <div className="form-group">
            <select
                name="category"
                value={this.state.category}
                onChange={this.handleInputChange}
              >
              <option value="general">General</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
            </select>
          </div>
          <div>
            <select
                name="language"
                value={this.state.language}
                onChange={this.handleInputChange}
              >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
            </select>
          </div>
          <button type="submit">
            Search {search_button_icon}
          </button>
        </form>
      </div>
    )
  }

}

export default SourcesForm;
