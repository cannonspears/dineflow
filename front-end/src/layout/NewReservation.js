import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import ReservationForm from "./ReservationForm";

function NewReservation() {
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main>
      <h1>New Reservation</h1>
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        path={"/"}
      />
    </main>
  );
}

export default NewReservation;