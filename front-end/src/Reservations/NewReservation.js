import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Import Utility Functions
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";

// Import Components
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();

  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservationForm, setReservationForm] = useState({
    ...initialFormData,
  });
  const [error, setError] = useState(null);

  // Change handler function
  const handleChange = ({ target: { name, value } }) => {
    setReservationForm({
      ...reservationForm,
      [name]: value,
    });
  };

  // Submit handler function
  const handleSubmit = (event) => {
    event.preventDefault();
    reservationForm.people = Number(reservationForm.people);
    createReservation(reservationForm)
      .then(() => {
        history.push(
          `/dashboard?date=${formatAsDate(reservationForm.reservation_date)}`
        );
      })
      .catch(setError);
  };

  return (
    <main>
      <h1>New Reservation</h1>
      <ErrorAlert error={error} />
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={reservationForm}
      />
    </main>
  );
}

export default NewReservation;
