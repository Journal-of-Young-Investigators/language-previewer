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
    formattedHTML: {__html: ''}
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

  handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({
      formattedHTML: {__html: '<h1>This is a test</h1>'}
    });
  }

  preview = () => {
    return this.state.formattedHTML;
  }

  render() {
    return (
      <div>
        <div className="input-area">
          <form>
            <div className="input-item">
              <label htmlFor="langCode">Language</label>
              <input name="langCode" type="text" value={this.state.article.langCode} onChange={this.handleChange}/>
            </div>
            <div className="input-item">
              <label htmlFor="title">Title</label>
              <input name="title" type="text" value={this.state.article.title} onChange={this.handleChange}/>
            </div>
            <div className="input-item">
              <label htmlFor="date">Date</label>
              <input name="date" type="text" value={this.state.article.date} onChange={this.handleChange}/>
            </div>
            <div className="input-item">
              <label htmlFor="authors">Authors</label>
              <input name="authors" type="text" value={this.state.article.authors} onChange={this.handleChange}/>
            </div>
            <div className="input-item">
              <label htmlFor="translators">Translators</label>
              <input name="translators" type="text" value={this.state.article.translators} onChange={this.handleChange}/>
            </div>
            <div className="input-item">
              <label htmlFor="body">Body</label>
              <input name="body" type="text" value={this.state.article.body} onChange={this.handleChange}/>
            </div>
            <div className="input-item">
              <div className="button">
                <button type="submit" onClick={this.handleSubmit}>Show Preview</button>
              </div>
            </div>
          </form>
        </div>

        <div className="output-area">
          <div className="output" dangerouslySetInnerHTML={this.preview()}></div>
        </div>  
      </div>
    )
  }
}

export default LanguagePreviewer;