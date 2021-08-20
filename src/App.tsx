import React from 'react';
import './App.css';

class inputArticleContentFormat {
  langCode = '';
  title = '';
  date = '';
  authors = '';
  translators= '';
  body = '';
};

interface htmlFormat {
  __html: string
}

type MyProps = {

}

type MyState = {
  article: inputArticleContentFormat,
  formattedHTML: htmlFormat
}

class LanguagePreviewer extends React.Component <MyProps, MyState> {
  state: MyState = {
    article: new inputArticleContentFormat(),
    formattedHTML: {__html: '<em>Input text to the left and click show preview</em>'}
  }
  
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      article: {
        ...prevState.article,
        [name]: value
      }
    }));
  }

  handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      article: {
        ...prevState.article,
        [name]: value
      }
    }));
  }

  format = () => {
    let data = '<h2>' + this.state.article.title + '</h2>';
    data += '<div class="date">' + this.state.article.date + '</div>';
    data += '<h3>' + this.formatAuthorsOrTranslators(this.state.article.authors.split(',')) + '</h3>';
    data += '<h3>' + this.formatAuthorsOrTranslators(this.state.article.translators.split(',')) +'</h3>';
    data += '<p>' + this.state.article.body + '</p>';
    
    return data;
  }

  formatAuthorsOrTranslators = (names: string[]) => {
    let formatted = '';
    for (let i = 0; i < names.length; i++) {
      formatted += names[i];
      if (i !== names.length-1) formatted += ', ';
    }
    
    return formatted;
  }

  handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const data = this.format();
    this.setState({
      formattedHTML: {__html: data}
    });
  }

  render() {
    return (
      <div>
        <div className="input-area">
            <div className="input-row">
              <div className="input-item">
                <label htmlFor="langCode">Language</label>
                <input name="langCode" type="text" placeholder="'en' for English..." value={this.state.article.langCode} onChange={this.handleChange}/>
              </div>
              <div className="input-item">
                <label htmlFor="title">Title</label>
                <input name="title" type="text" value={this.state.article.title} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="input-row">
              <div className="input-item">
                <label htmlFor="date">Date</label>
                <input name="date" type="text" placeholder="1 January 1990..." value={this.state.article.date} onChange={this.handleChange}/>
              </div>
              <div className="input-item">
                <label htmlFor="authors">Authors</label>
                <input name="authors" type="text" value={this.state.article.authors} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="input-item">
              <label htmlFor="translators">Translators</label>
              <input name="translators" type="text" value={this.state.article.translators} onChange={this.handleChange}/>
            </div>
            <div className="input-item">
              <label htmlFor="body">Body</label>
              <textarea className="body" name="body" value={this.state.article.body} onChange={this.handleTextChange}></textarea>
            </div>
            <div className="input-item">
              <div className="button">
                <button type="submit" onClick={this.handleSubmit}>Show Preview</button>
              </div>
            </div>
        </div>

        <div className="output-area">
          <div className="output" dangerouslySetInnerHTML={this.state.formattedHTML}></div>
        </div>  
      </div>
    )
  }
}

export default LanguagePreviewer;