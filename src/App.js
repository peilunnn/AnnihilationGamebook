import React, { useEffect, useState } from 'react';
import "./App.css";
import Paper from "./components/Paper"
import PaperButtons from "./components/PaperButtons"
import Page from "./backend/Page"
import Choice from "./backend/Choice"
import Parser from "./backend/Parser"

class App extends React.Component {
  constructor() {
    super()
    this.handler = this.handler.bind(this)
    this.state = {
      book: null,
      page: null
    }
  }

  handler(e) {
    // GET A LIST OF THE NO. OF WORDS IN EACH CHOICE
    const targetInnerHtml = e.target.innerHTML.split(" → ");

    // GET THE NEXT PAGE NO. FROM THE LAST ELEMENT OF THE LIST
    const nextPageNumber = parseInt(targetInnerHtml[1]);

    // GET THE NEXT PAGE OBJECT BY USING THE BOOK DICTIONARY
    const targetPage = this.state.book[nextPageNumber];

    this.setState({
      page: targetPage
    })
  }

  componentDidMount() {
    const parser = new Parser()
    const book = parser.main()
    this.setState({
      page: book[1],
      book: book
    })
  }


  render() {
    if (this.state.book && this.state.page) {
      return (
        <div>
          <Paper page={this.state.page} />
          <PaperButtons choices={this.state.page.choices} handler={this.handler} />
        </div>
      );
    }
    return null
  }
}

export default App;