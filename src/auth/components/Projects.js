import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'

class Books extends Component {
  constructor () {
    super()

    this.state = {
      books: [],
      edit: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/books`)
      .then(res => {
        this.setState({ books: res.data.books })
      })
      .catch(console.error)
  }

 handleDelete = (id) => {
    axios({
      url: `${apiUrl}/books/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        axios(`${apiUrl}/books`)
          .then(res => {
            this.setState({ books: res.data.books })
          })
          .catch(console.error)
      })
  }

  render () {
    const { user } = this.props
    const { books } = this.state

    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">Books currently in the Library</h3>
          {!user && <p className="m-0">Sign in to edit books</p>}
          {user && <Button variant="success" href="#create-book">Add A Book</Button>}
        </div>
        <ListGroup>
          { user && books.map(book => (
            <ListGroup.Item key={book.id}>
              <span className="h5 d-block">{book.title}</span>
              <span className="d-block">{book.author.first_name} {book.author.last_name}</span>
              <Button variant="danger" onClick={() => this.handleDelete(book.id)}>Delete Book</Button>
            </ListGroup.Item>
          )) }
          { !user && books.map(book => (
            <ListGroup.Item key={book.id}>
              <span className="h5 d-block">{book.title}</span>
              <span>{book.author.first_name} {book.author.last_name}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Fragment>
    )
  }
}

export default Books
