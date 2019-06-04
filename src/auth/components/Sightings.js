import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

class Sightings extends Component {
  constructor () {
    super()

    this.state = {
      sightings: [],
      edit: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/sightings`)
      .then(res => {
        this.setState({ sightings: res.data.sightings })
      })
      .catch(console.error)
  }

 handleDelete = (id) => {
    axios({
      url: `${apiUrl}/sightings/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        axios(`${apiUrl}/sightings`)
          .then(res => {
            this.setState({ sightings: res.data.sightings })
          })
          .catch(console.error)
      })
  }

  render () {
    const { user } = this.props
    const { sightings } = this.state

    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">All recent sightings</h3>
          {!user && <p className="m-0">Sign in to edit your sightings</p>}
          {user && <Button variant="success" href="#create-book">Add A Sighting</Button>}
        </div>
        <ListGroup>
          { user && sightings.map(sighting => (
            <ListGroup.Item key={sighting.id}>
              <span className="h5 d-block">{sighting.title}</span>
              <span className="d-block">{sighting.text}</span>
              <span className="d-block">{sighting.date}</span>
              <span className="d-block">{sighting.location}</span>
              <Button variant="danger" onClick={() => this.handleDelete(sighting.id)}>Delete Sighting</Button>
            </ListGroup.Item>
          )) }
          { !user && sightings.map(sighting => (
            <ListGroup.Item key={sighting.id}>
              <span className="h5 d-block">{sighting.title}</span>
              <span>{sighting.location}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Fragment>
    )
  }
}

export default Sightings
