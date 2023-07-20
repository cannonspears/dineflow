import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

// Import Utility Functions
import { editReservation, readReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";

// Import Components
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [currentReservation, setCurrentReservation] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal).then(
      setCurrentReservation
    );
    return () => abortController.abort();
  }, [reservation_id]);

  // Change handler function
  const handleChange = ({ target: { name, value } }) => {
    setCurrentReservation({
      ...currentReservation,
      [name]: value,
    });
  };

  // Submit handler function
  const handleSubmit = (event) => {
    event.preventDefault();
    currentReservation.people = Number(currentReservation.people);
    editReservation(currentReservation)
      .then(() => {
        history.push(
          `/dashboard?date=${formatAsDate(currentReservation.reservation_date)}`
        );
      })
      .catch(setError);
  };

  return (
    <div>
      <h2>Edit Reservation</h2>
      <ErrorAlert error={error} />
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={currentReservation}
      />
    </div>
  );
}

export default EditReservation;
