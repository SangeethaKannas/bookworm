import React from 'react'
import { Segment } from "semantic-ui-react";
import SearchBookForm from "../forms/SearchBookForm";

class NewBookPage extends React.Component {
  state = {
     book: null
  }

  onBookSelect= book => this.setState({ book })

  render() {
      return (
        <Segment>
           <h1>Add new book to your collection</h1>
           <SearchBookForm onBookSelect={this.onBookSelect} />
        </Segment>
      )
  }

}

export default NewBookPage