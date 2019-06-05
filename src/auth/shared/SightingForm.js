import React from 'react'
import { Link } from 'react-router-dom'

const SightingForm = ({ sighting, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      name="title"
      placeholder="title"
      value={sighting.title}
      onChange={handleChange}
    />
    <label>Description</label>
    <input
      name="text"
      placeholder="description"
      value={sighting.text}
      onChange={handleChange}
    />
    <label>Date </label>
    <input
      name="when"
      placeholder="YYYY-MM-DD"
      value={sighting.when}
      onChange={handleChange}
    />
    <label>Location</label>
    <input
      name="location"
      placeholder="location"
      value={sighting.location}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default SightingForm
