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

  const handleChange = ({ target: { name, value } }) => {
    setTableForm({
      ...tableForm,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTable(tableForm)
      .then(() => {
        history.push(`/`);
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
        formData={tableForm}
        path={"/"}
      />
    </main>
  );
}

export default NewTable;
