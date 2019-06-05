import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import { Link  } from 'react-router-dom'

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
      <div id="hero">
      <div id="hero-overlay">
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">All recent sightings</h3>
          {!user && <p className="m-0">Sign in to edit your sightings</p>}
          {user && <Button variant="success" href="#create-sighting">Add A Sighting</Button>}
        </div>
        <ListGroup>
          { user && sightings.map(sighting => (
            <ListGroup.Item key={sighting._id}>
            <div className="listingHolder">
              <span className="h5 d-block">{sighting.title}</span>
              <span className="d-block">{sighting.text}</span>
              <span className="d-block">{sighting.when}</span>
              <span className="d-block">{sighting.location}</span>
              <Link to={'/sightings/'+ sighting._id + '/edit'}>
              <Button variant="success" className="updateButton"> Update Sighting </Button>
              </Link>
              <Button variant="danger" onClick={() => this.handleDelete(sighting._id)}>Delete Sighting</Button>
              </div>
            </ListGroup.Item>
          )) }
          { !user && sightings.map(sighting => (
            <ListGroup.Item key={sighting._id}>
            <div className="listingHolder">
              <span className="h5 d-block">{sighting.title}</span>
              <span>{sighting.location}</span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        </div>
        </div>
      </Fragment>
    )
  }
}



export default Sightings
