import React, {
  Component
} from 'react';
// Images
import logo from './media/images/bs_logo.svg';
import logo_horizontal from './media/images/bs_logo_horizontal.svg';
// CSS
import './css/App.css';
// JS
import './js/custom'
// subcomponents
import SourcesForm from './components/SourcesForm';
import SourcesList from './components/SourcesList';

console.log(process.env.NETLIFY)

if (process.env.NETLIFY === 'true') {
  console.log('Parece que esa variable está en TRUE')
}else{
  console.log('Parece que esa variable está en FALSE o no está');
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      news: [],
      selected_language: "",
      selected_source: "",
      first_load: true,
      close_sidebar: true,
      loadingDataFromSourcesForm: false,
    }
    this.handleDataFromSourcesForm = this.handleDataFromSourcesForm.bind(this);
    this.handleDataFromSourcesList = this.handleDataFromSourcesList.bind(this);
    this.getNewsFromSource = this.getNewsFromSource.bind(this);
    this.truncateString = this.truncateString.bind(this);
    this.addThreeDots = this.addThreeDots.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
  }

  async handleDataFromSourcesForm(data) {
    this.setState({
      loadingDataFromSourcesForm: true
    })
    this.getSourcesFromUrl(data.category, data.language).then((sources) => {
      this.setState({
        selected_category: data.category,
        selected_language: data.language,
        sources: sources,
        close_sidebar: false,
        loadingDataFromSourcesForm: false
      })
    })

  }

  async handleDataFromSourcesList(source) {
    this.getNewsFromSource(source, this.state.selected_language)
      .then((news) => {
        this.setState({
          news: news,
          close_sidebar: true,
          first_load: false,
          selected_source: source
        })
      })
  }

  closeSidebar() {
    const sidebar = document.getElementById('sidebar')
    if (sidebar.classList.contains("show")) {
      const menu_button = document.getElementById('menu-button')
      menu_button.click()
    }
    this.setState({
      close_sidebar: false
    })
  }

  truncateString(str, n_words) {
    if (str.split(" ").length > n_words) {
      return this.addThreeDots(str.split(" ").splice(0, n_words).join(" "))
    }
    return false
  }

  addThreeDots(str) {
    return str + " [...]"
  }

  async getSourcesFromUrl(category, language) {

    const apikey = "1884b8edb96c4d66885c7c6c52481459"

    const url = "https://newsapi.org/v2/sources?" +
      "language=" + language + "&" +
      "category=" + category + "&" +
      "apiKey=" + apikey

    var req = new Request(url)
    const response = await fetch(req)
    const json = await response.json()

    return json.sources

  }

  async getNewsFromSource(source, language) {
    const apikey = "1884b8edb96c4d66885c7c6c52481459"

    const url = "https://newsapi.org/v2/everything?" +
      "sources=" + source + "&" +
      "language=" + language + "&" +
      "pageSize=10&" +
      "apiKey=" + apikey

    var req = new Request(url)
    const response = await fetch(req)
    const json = await response.json()

    return json.articles
  }

  render() {

    let news = []

    if (this.state.news.length > 0) {

      // If the state close_sidebar is true it will be closed
      if (this.state.close_sidebar) {
        this.closeSidebar()
      }

      //Here I create all the "news" items
      news = this.state.news.map((NewsItem, i) => {
        return ( 
        <div className = "news-item-container"key = {i} >
          <div className = "news-item" >
          <div style = {
            {
              backgroundImage: "url(" + NewsItem.urlToImage + ")"
            }
          }
          className = "header" >
          <div className = "title" > {
            NewsItem.title
          } <div className = "subtitle-container" >
          <span className = "author" > {
            NewsItem.author
          } </span> <span className = "source" > {
            NewsItem.source.name
          } </span> 
          </div> 
          </div> 
          </div> 
          <div className = "body" >
          <div className = "description" > {
            this.truncateString(NewsItem.description, 25) ?
            this.truncateString(NewsItem.description, 25) : NewsItem.description
          } </div> </div> <div className = "footer" >
          <a className = "btn-go-news fa-icon fa-link" href = {NewsItem.url}target = "_blank" >
          Bring me there!
          </a> </div> </div> </div>
        )
      });

    } else {

      news = <div className = "no-news" >
         {
          this.state.first_load ? "Choose a language and a category" : "No news available"
          } 
        </div>
    
  }


    return ( 
    <div className = "App" >
      <nav className = "navbar" >
        <div id = "menu-button" className = "fa-icon"> </div> 
        <a className = "navbar-brand" href = "/" >
          <img src = {logo_horizontal} className = "App-logo large"alt = "logo" / >
          <img src = {logo} className = "App-logo small" alt = "logo" / >
        </a> 
      </nav>

      <div id = "sidebar" className = "show" >
        <SourcesForm 
          loading = {
            this.state.loadingDataFromSourcesForm
          }
          sendDataToApp = {
            this.handleDataFromSourcesForm
          } 
        /> 
        <SourcesList 
          sendDataToApp = {this.handleDataFromSourcesList}
          sources = {this.state.sources}
        />
      </div> 
      <div className = "container" >
      <div className = "news" > {news} </div> 
      </div> 
    </div>
    );
  }

}

export default App;