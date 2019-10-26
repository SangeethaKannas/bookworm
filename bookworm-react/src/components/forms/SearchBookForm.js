import React from 'react'
import PropTypes from 'prop-types'
import { Form, Dropdown } from 'semantic-ui-react'
import axios from 'axios'

class SearchBookForm extends React.Component {

  state = {
      query: '',
      loading: false,
      options: [],
      books: {}
  }

  onSearchChange = (event) => {
    clearTimeout(this.timer)    
    this.setState({
      query: event.target.value
    })
    this.timer=setTimeout(this.fetchOptions, 1000)
  }

  fetchOptions = () => {
    if(!this.state.query) return
    this.setState({loading: true})

    axios.get(`/api/books/search?q=${this.state.query}`)
    .then(response => response.data.books)
    .then(books => {
      const options =[]
      const booksHash = []
      books.forEach(book => {
          booksHash[book.goodReadsId] = book
          options.push({
            key: book.goodReadsId,
            value: book.goodReadsId,
            text: book.title
          })
      })
      this.setState({loading: false, options, books: booksHash})
    }) 
  }

  onChange = (e, data) => {
    this.setState({query: data.value})
    this.props.onBookSelect( this.state.books[data.value] )
  }

  addBook = () => console.log('Adding Book')

  render() {
      return (
        <Form>
          <Dropdown search fluid placeholder="Search for book by title" 
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          onChange={this.onChange}
          options={this.state.options}
          loading={this.state.loading}          
          />
        </Form>
      )
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired
}

export default SearchBookForm