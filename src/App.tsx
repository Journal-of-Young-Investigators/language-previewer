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

type MyProps = {

}

type MyState = {
  article: inputArticleContentFormat;
}

class LanguagePreviewer extends React.Component <MyProps, MyState> {
  state: MyState = {
    article: new inputArticleContentFormat()
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

  render() {
    return (
      <div className="container">
        <div className="input-area">
          <form>
            <div className="input-item">Language
              <input name="langCode" type="text" value={this.state.article.langCode} onChange={this.handleChange}/>
            </div>

          </form>
        </div>  





      </div>
    )
  }
}

export default LanguagePreviewer;