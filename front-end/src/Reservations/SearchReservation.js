import React, { useState } from "react";

// Import Utility Functions
import { searchByPhoneNumber } from "../utils/api";

// Import Components
import ReservationList from "./ReservationList";
import ErrorAlert from "../layout/ErrorAlert";

function SearchReservation() {
  const [number, setNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Submit handler function
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchSubmitted(true);
    const abortController = new AbortController();
    try {
      const searchResults = await searchByPhoneNumber(number);
      setReservations(searchResults);
      setNumber("");
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  };

  // Change handler function
  const handleChange = ({ target }) => {
    setNumber(target.value);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Search for Reservation</h1>
        <ErrorAlert error={error} />
        <div className="input-group mb-3 w-50">
          <input
            name="mobile_number"
            type="text"
            className="form-control"
            placeholder="Enter a customer's phone number"
            onChange={handleChange}
            value={reservations.mobile_number}
            required
          ></input>
          <div className="input-group-append">
            <button className="btn btn-secondary" type="submit">
              Find
            </button>
          </div>
        </div>
      </form>
      <div className="container-fluid col">
        <div className="row d-md-flex mb-3">
          <h4>Search Results</h4>
        </div>
        {searchSubmitted ? (
          reservations.length > 0 ? (
            <div className="row d-md-flex mb-3">
              <ReservationList reservations={reservations} />
            </div>
          ) : (
            <div className="row d-md-flex mb-3 text-center w-50">
              No reservations found
            </div>
          )
        ) : null}
      </div>
    </main>
  );
}

export default SearchReservation;
