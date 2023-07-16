import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import TableForm from "./TableForm.js";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const history = useHistory();

  const initialFormData = {
    table_name: "",
    capacity: "",
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
    createTable(formData)
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch(setError);
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <main>
      <h1>New Table</h1>
      <ErrorAlert error={error} />
      <TableForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        formData={formData}
        path={"/"}
      />
    </main>
  );
}

export default NewTable;
