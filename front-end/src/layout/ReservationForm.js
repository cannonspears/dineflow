import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ReservationForm({ handleChange, handleSubmit, formData, path }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
          />
        </div>
        <div className="col-6 form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            onChange={handleChange}
            value={formData.mobile_number}
          />
        </div>
        <div className="col-6 form-group">
          <label htmlFor="people">Number in Party</label>
          <input
            type="number"
            className="form-control"
            id="people"
            name="people"
            onChange={handleChange}
            value={formData.people}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            onChange={handleChange}
            value={formData.reservation_date}
          />
        </div>
        <div className="col-6 form-group">
          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            type="time"
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            onChange={handleChange}
            value={formData.reservation_time}
          />
        </div>
      </div>

      <Link to={path} type="button" className="btn btn-secondary mr-2" role="button">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default ReservationForm;
