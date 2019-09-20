import React, {
    Component
  } from 'react';
  
  class SourcesList extends Component {
  
    constructor(props) {
      super(props);
      this.sources_available = this.sources_available.bind(this)
    }

    sources_available(){
      return this.props.sources.length > 0 ? true : false
    }

    render() {
      // I will limit the sources to 7
      const sources = this.props.sources.slice(0,7)
      let sources_list = []

      if(this.sources_available()){
        sources_list = sources.map((source, i) => {
          return (
            <li 
              onClick={this.props.sendDataToApp.bind(this, source.id)} 
              className="source fa-icon fa-newspaper fa-arrow-right" 
              key={i}>
              {source.name}
            </li>
          )
        });
      }

      return (
        <div className="sources_list">
          <div className='header'>
            Available Sources
          </div>
          <div className="body">
              {  
                this.sources_available() ? <ul>{sources_list}</ul> : <div className="no-sources-available">No sources available</div> 
              }
          </div>
        </div>
      )
    }

  }
  
  export default SourcesList;
  