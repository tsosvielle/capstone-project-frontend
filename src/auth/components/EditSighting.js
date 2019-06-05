import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import SightingForm from '../shared/SightingForm'

class EditSighting extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sighting: {
        title: '',
        text: '',
        when: '',
        location: ''
      },
      updated: false
    }
  }

  async componentDidMount () {
    const response = await
    axios(`${apiUrl}/sightings/${this.props.match.params.id}`)
    this.setState({ sighting: response.data.sighting })
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedSighting = Object.assign(this.state.sighting, updatedField)

    this.setState({ sighting: editedSighting })
  }

  handleSubmit = async event => {
    event.preventDefault()

    await axios({
      url: `${apiUrl}/sightings/${this.props.match.params.id}`,
      method: 'PATCH',
      data: {
        sighting: this.state.sighting
      }
    })
    this.setState({ updated: true })
  }

  render () {
    const { sighting, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/sightings/${this.props.match.params.id}`} />
    }

    return (
        <SightingForm
          sighting={sighting}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/`}
        />

    )
  }
}

export default withRouter(EditSighting)
