import React from "react";
import { Link, useHistory } from "react-router-dom";
import { today } from "../utils/date-time";

function TableForm({ handleChange, handleSubmit, formData, path }) {
  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-4 form-group">
          <label htmlFor="first_name">Table Name</label>
          <input
            type="text"
            className="form-control"
            id="table_name"
            name="table_name"
            min="2"
            onChange={handleChange}
            value={formData.table_name}
            required
          />
        </div>
        <div className="col-4 form-group">
          <label htmlFor="last_name">Capacity</label>
          <input
            type="text"
            className="form-control"
            id="capacity"
            name="capacity"
            min="1"
            onChange={handleChange}
            value={formData.capacity}
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

export default TableForm;
