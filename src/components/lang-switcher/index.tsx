import React from 'react';
import './lang-switcher.css'

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
    zh='中文'
}

type MyProps = {
    article: jyiArticle
}

type MyState = {
    article: jyiArticle,
    currentLang: string,
}


export class LanguageSwitcher extends React.Component<MyProps, MyState> {

    state: MyState = {
      article: this.props.article,
      currentLang: this.props.article.content[0].langCode,
    };
  
    handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      this.setState({ currentLang: event.currentTarget.lang });
    };
  
    formatAuthorsOrTranslators = (names: string[]) => {
      let formatted = '';
      for (let i = 0; i < names.length; i++) {
        formatted += names[i];
        if (i !== names.length-1) formatted += ', ';
      }
      
      return formatted;
    }
    
    render() {
      return (
        <div>
          <div className="lang-options">
            {
              this.state.article.content.map( (content: jyiArticleContent) => {
                return (
                <div className="lang-option" lang={content.langCode} onClick={this.handleClick} current-lang={this.state.currentLang === content.langCode ? "true" : "false"}>
                  {Language[content.langCode]}
                </div>
                )
              })
            }
          </div>
          <div className="article-content">
            {this.state.article.content.map( ( content: jyiArticleContent ) => {
              if (this.state.currentLang === content.langCode) {
                return (
                  <>
                    <h2>{content.title}</h2>
                    <div className="date">{content.date}</div>
                    <h3>{this.formatAuthorsOrTranslators(content.authors)}</h3>
                    <h3>{content.translators != null ? this.formatAuthorsOrTranslators(content.translators): 'No translator'}</h3>
                    <p>{content.body}</p>
                  </>
                );
              }
              else return "";
            })}
          </div>
        </div>
      );
    }
  };