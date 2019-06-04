import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class CreateSighting extends Component {
  constructor () {
    super()

    this.state = {
      title: '',
      text: '',
      when: '',
      location: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/sightings`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        sighting: {
          title: this.state.title,
          text: this.state.text,
          when: this.state.when,
          location: this.state.location
        }
      }
    })
      .then(response => this.setState({
        sighting: response.data.sighting
      }))
      .then(() => this.props.alert(`${this.state.title} has been added to sightings!`, 'success'))
      .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your sighting. Please try again.', 'danger')
        this.setState({
          title: '',
          text: '',
          when: '',
          location: ''
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  resetForm = () => this.setState({
    title: '',
    text: '',
    when: '',
    location: ''
  })

  render () {
    const { title, text, when, location } = this.state

    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <h2>Create Sighting</h2>
        <Form.Group controlId="sightingTitle">
          <Form.Label>Sighting Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="title"
            required
            onChange={this.handleChange}
            placeholder="Enter the sighting title"
          />
        </Form.Group>

        <Form.Group controlId="sightingText">
          <Form.Label>Sighting Text</Form.Label>
          <Form.Control
            type="text"
            value={text}
            name="text"
            required
            placeholder="Enter the sighting details"
            onChange={this.handleChange}
          />
          </Form.Group>

          <Form.Group controlId="sightingDate">
            <Form.Label>Sighting Date</Form.Label>
            <Form.Control
              type="text"
              value={when}
              name="when"
              required
              placeholder="Enter the sighting date"
              onChange={this.handleChange}
            />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                name="location"
                required
                placeholder="Enter the location"
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

export default withRouter(CreateSighting)
