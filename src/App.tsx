import React from 'react';
import './App.css';
import {LanguageSwitcher} from './components/lang-switcher'

interface jyiArticleContent {
  // ISO 639 code to identify language; 'en' for English, 'es' for Spanish, etc.
  // See list here: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
  // You don't have to store display name of language ('English' for 'en' for example), get it using this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames
  langCode: keyof typeof Language;
  title: string;
  date: string;
  authors: string[];
  translators?: string[];
  body: string;
};

interface jyiArticle {
  id: string;
  content: jyiArticleContent[];
};

enum Language {
  en='English',
  es='Español',
  fr='Français',
  zh='中國人'
};

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
  inputArticle: inputArticleContentFormat;
  previewArticle: jyiArticle;
  showPreview: boolean;
}

class LanguagePreviewer extends React.Component <MyProps, MyState> {
  state: MyState = {
    inputArticle: new inputArticleContentFormat(),
    previewArticle: {
      id: '1',
      content: []
    },
    showPreview: false
  }
  
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      inputArticle: {
        ...prevState.inputArticle,
        [name]: value
      }
    }));
  }

  handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      inputArticle: {
        ...prevState.inputArticle,
        [name]: value
      }
    }));
  }

  preview = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const inputAuthors = this.state.inputArticle.authors.split(','); 
    const inputTranslators = this.state.inputArticle.translators.split(',');

    const newArticleContent: jyiArticleContent = {
      langCode: this.state.inputArticle.langCode as keyof typeof Language,
      title: this.state.inputArticle.title,
      date: this.state.inputArticle.date,
      authors: inputAuthors,
      translators: inputTranslators,
      body: this.state.inputArticle.body
    }

    const added = this.state.previewArticle.content.concat(newArticleContent);
    
    this.setState(prevState => ({
      previewArticle: {
        ...prevState.previewArticle,
        content: added
      },
      showPreview: true
    }));
  }

  render() {
    return (
      <div>
        <div className="input-area">
            <div className="input-row">
              <div className="input-item">
                <label htmlFor="langCode">Language</label>
                <input name="langCode" type="text" placeholder="'en' for English..." value={this.state.inputArticle.langCode} onChange={this.handleChange}/>
              </div>
              <div className="input-item">
                <label htmlFor="title">Title</label>
                <input name="title" type="text" value={this.state.inputArticle.title} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="input-row">
              <div className="input-item">
                <label htmlFor="date">Date</label>
                <input name="date" type="text" placeholder="1 January 1990..." value={this.state.inputArticle.date} onChange={this.handleChange}/>
              </div>
              <div className="input-item">
                <label htmlFor="authors">Authors</label>
                <input name="authors" type="text" value={this.state.inputArticle.authors} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="input-item">
              <label htmlFor="translators">Translators</label>
              <input name="translators" type="text" value={this.state.inputArticle.translators} onChange={this.handleChange}/>
            </div>
            <div className="input-item">
              <label htmlFor="body">Body</label>
              <textarea className="text-area" name="body" value={this.state.inputArticle.body} onChange={this.handleTextChange}></textarea>
            </div>
            <div className="input-item">
              <div className="button">
                <button type="submit" onClick={this.preview}>Show Preview</button>
              </div>
            </div>
        </div>

        <div className="output-area">
          {
            this.state.showPreview &&
            <LanguageSwitcher article={this.state.previewArticle}/>
          }
        </div>  
      </div>
    )
  }
}

export default LanguagePreviewer;