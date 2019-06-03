import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'

class Projects extends Component {
  constructor () {
    super()

    this.state = {
      projects: [],
      edit: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/projects`)
      .then(res => {
        this.setState({ projects: res.data.projects })
      })
      .catch(console.error)
  }

  componentDidUpdate () {
    axios(`${apiUrl}/projects`)
      .then(res => {
        this.setState({ projects: res.data.projects })
      })
      .catch(console.error)
  }

  destroy = id => {
    axios.delete(`${apiUrl}/projects/${id}`)
      .then(() => this.props.alert('You deleted a project!', 'success'))
      .catch(console.error)
  }

  render () {
    const { user } = this.props
    const { projects } = this.state

    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">Projects currently open</h3>
          {!user && <p className="m-0">Sign in to edit your projects</p>}
          {user && <Button variant="success" href="#create-project">Add A Project</Button>}
        </div>
        <ListGroup>
          { user && projects.map(project => (
            <ListGroup.Item key={project.id} action>
              <span className="h5 d-block">{project.title}</span>
              <span className="d-block">{project.data} </span>
              <span className="d-block">{project.description} </span>
              <span className="d-block">{project.teamNeeds} </span>
              <span className="d-block">{project.contactEmail} </span>
              <Button variant="danger" onClick={() => this.destroy(project.id)}>Delete Project</Button>
            </ListGroup.Item>
          )) }
          { !user && projects.map(project => (
            <ListGroup.Item key={project.id}>
              <span className="h5 d-block">{project.title}</span>
              <span className="d-block">{project.data} </span>
              <span className="d-block">{project.description} </span>
              <span className="d-block">{project.teamNeeds} </span>
              <span className="d-block">{project.contactEmail} </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Fragment>
    )
  }
}

export default Projects
