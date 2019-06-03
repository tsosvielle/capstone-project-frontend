import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../apiConfig'

class CreateProject extends Component {
  constructor () {
    super()

    this.state = {
      title: '',
      authorId: '',
      date: '',
      decription: '',
      teamNeed: '',
      contactEmail: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/projects`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        project: {
          title: this.state.title,
          date: this.state.date,
          description: this.state.description,
          teamNeeds: this.state.teamNeeds,
          contactEmail: this.state.contactEmail,
          author_id: this.state.authorId
        }
      }
    })
      .then(response => this.setState({
        project: response.data.project
      }))
      .then(() => this.props.alert(`${this.state.title} has been added to the project list!`, 'success'))
      .then(() => this.props.history.push('/'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your book. Please try again.', 'danger')
        this.setState({
          title: '',
          authorId: '',
          data: '',
          description: '',
          teamNeeds: '',
          contactEmail: ''
        })
      })
  }


  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  resetForm = () => this.setState({
    title: '',
    authorId: '',
    data: '',
    description: '',
    teamNeeds: '',
    contactEmail: ''
  })

  render () {
    const { title, authorId, data, description, teamNeeds, contactEmail } = this.state

    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <h2>Create Project</h2>
        <Form.Group controlId="projectTitle">
          <Form.Label>Project Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="title"
            required
            onChange={this.handleChange}
            placeholder="Enter the project title"
          />

        </Form.Group>
        <Form.Group controlId="projectAuthor">
          <Form.Label>Project Id</Form.Label>
          <Form.Control
            type="number"
            value={authorId}
            name="authorId"
            required
            placeholder="Enter the author's id"
            onChange={this.handleChange}
          />

        </Form.Group>

        <Form className="form" onSubmit={this.handleSubmit}>
          <h2>What's it about?</h2>
          <Form.Group controlId="projectTitle">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              name="description"
              required
              onChange={this.handleChange}
              placeholder="Enter the project description"
            />
          </Form.Group>
          <Form className="form" onSubmit={this.handleSubmit}>
            <h2>What does your team need?</h2>
            <Form.Group controlId="projectTeam">
              <Form.Label>Team needs</Form.Label>
              <Form.Control
                type="text"
                value={teamNeeds}
                name="team needs"
                onChange={this.handleChange}
                placeholder="Enter the project's team needs"
              />
            </Form.Group>
            <Form className="form" onSubmit={this.handleSubmit}>
              <h2>How can we contact you?</h2>
              <Form.Group controlId="projectEmail">
                <Form.Label>Project Email</Form.Label>
                <Form.Control
                  type="text"
                  value={contactEmail}
                  name="contact email"
                  required
                  onChange={this.handleChange}
                  placeholder="Enter the contact email"
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

export default withRouter(CreateProject)
