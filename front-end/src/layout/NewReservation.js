import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();

  const initialFormData = {
    first_name: "Test",
    last_name: "Test",
    mobile_number: "111-111-1111",
    reservation_date: "2020-12-31",
    reservation_time: "20:00:00",
    people: 1,
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [error, setError] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createReservation(formData)
      .then(() => {
        history.push("/");
      })
      .catch(setError);
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <main>
      <h1>New Reservation</h1>
      <ErrorAlert error={error} />
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        formData={formData}
        path={"/"}
      />
    </main>
  );
}

export default NewReservation;
