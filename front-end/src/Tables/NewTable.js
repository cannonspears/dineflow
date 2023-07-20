import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Import Utility Functions
import { createTable } from "../utils/api";

// Import Components
import TableForm from "./TableForm.js";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const history = useHistory();

  const initialFormData = {
    table_name: "",
    capacity: "",
  };

  const [tableForm, setTableForm] = useState({ ...initialFormData });
  const [error, setError] = useState(null);

  // Change handler function
  const handleChange = ({ target: { name, value } }) => {
    setTableForm({
      ...tableForm,
      [name]: value,
    });
  };

  // Submit handler function
  const handleSubmit = (event) => {
    event.preventDefault();
    tableForm.capacity = Number(tableForm.capacity);
    createTable(tableForm)
      .then(() => {
        history.push(`/`);
      })
      .catch(setError);
  };

  return (
    <main>
      <h1>New Table</h1>
      <ErrorAlert error={error} />
      <TableForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={tableForm}
        path={"/"}
      />
    </main>
  );
}

export default NewTable;
