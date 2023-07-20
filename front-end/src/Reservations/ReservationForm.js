import React from "react";
import { useHistory } from "react-router-dom";
import { today } from "../utils/date-time";

function ReservationForm({ handleChange, handleSubmit, formData }) {
  const history = useHistory();
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
            required
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
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-6 form-group">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="xxx-xxx-xxxx"
            onChange={handleChange}
            value={formData.mobile_number}
            required
          />
        </div>
        <div className="col-6 form-group">
          <label htmlFor="people">People in Party</label>
          <input
            type="number"
            className="form-control"
            id="people"
            name="people"
            min="1"
            onChange={handleChange}
            value={formData.people}
            required
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
            min={today()}
            onChange={handleChange}
            value={formData.reservation_date}
            required
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
            required
          />
        </div>
      </div>

      <button type="button" className="btn btn-secondary mr-2" onClick={() => history.goBack()}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default ReservationForm;
