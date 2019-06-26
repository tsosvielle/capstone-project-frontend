import React from 'react'
import { Link } from 'react-router-dom'

const SightingForm = ({ sighting, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label className="label">Name</label>
    <input
      className="h5 d-block"
      name="title"
      placeholder="title"
      value={sighting.title}
      onChange={handleChange}
    />
    <label className="label">Description</label>
    <input
      className="d-block"
      name="text"
      placeholder="description"
      value={sighting.text}
      onChange={handleChange}
    />
    <label className="label">Date </label>
    <input
      className="d-block"
      name="when"
      placeholder="YYYY-MM-DD"
      value={sighting.when}
      onChange={handleChange}
    />
    <label className="label">Location</label>
    <input
      className="d-block"
      name="location"
      placeholder="location"
      value={sighting.location}
      onChange={handleChange}
    />
    <div className="form-buttons">
    <button className="form-submit-button" type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
    </div>
  </form>
)

export default SightingForm
