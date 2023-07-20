import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { editReservation, readReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";

import ReservationForm from "./ReservationForm";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [currentReservation, setCurrentReservation] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    readReservation(reservation_id, abortController.signal).then(setCurrentReservation);
    return () => abortController.abort();
  }, [reservation_id]);

  const handleChange = ({ target: { name, value } }) => {
    setCurrentReservation({
      ...currentReservation,
      [name]: value,
    });
  };

  async function handleSubmit(reservation) {
    await editReservation({
      ...reservation,
    });
    history.push(`/dashboard?date=${formatAsDate(reservation.reservation_date)}`);
  }

  return (
    <div>
      <h2>Edit Reservation</h2>
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={currentReservation}
      />
    </div>
  );
}

export default EditReservation;
