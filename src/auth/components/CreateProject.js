import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../apiConfig'

class CreateBook extends Component {
  constructor () {
    super()

    this.state = {
      title: '',
      authorId: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/books`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        book: {
          title: this.state.title,
          author_id: this.state.authorId
        }
      }
    })
      .then(response => this.setState({
        book: response.data.book
      }))
      .then(() => this.props.alert(`${this.state.title} has been added to the library!`, 'success'))
      .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your book. Please try again.', 'danger')
        this.setState({
          title: '',
          authorId: ''
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  resetForm = () => this.setState({
    title: '',
    authorId: ''
  })

  render () {
    const { title, authorId } = this.state

    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <h2>Create Book</h2>
        <Form.Group controlId="bookTitle">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="title"
            required
            onChange={this.handleChange}
            placeholder="Enter the book title"
          />
        </Form.Group>
        <Form.Group controlId="bookAuthor">
          <Form.Label>Book Id</Form.Label>
          <Form.Control
            type="number"
            value={authorId}
            name="authorId"
            required
            placeholder="Enter the author's id"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="m-1"
        >
          Submit
        </Button>
        <Button
          variant="danger"
          type="button"
          className="m-1"
          onClick={this.resetForm}
        >
          Reset
        </Button>
      </Form>
    )
  }
}

export default withRouter(CreateBook)
