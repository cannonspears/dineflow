import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

// Import Utility Functions
import { listTable, seatReservationAtTable } from "../utils/api";

// Import Components
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();

  const [tableId, setTableId] = useState();
  const [tables, setTables] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      const response = await listTable(abortController.signal);
      const tableFromAPI = response;
      setTables(() => tableFromAPI);
    }
    loadTables();
    return () => abortController.abort();
  }, [reservation_id]);

  // Change handler function
  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  // Submit handler function
  const handleSubmit = async () => {
    const abortController = new AbortController();
    try {
      await seatReservationAtTable(reservation_id, tableId);
      history.push(`/`);
    } catch (error) {
      setErrorMessage(error);
    }
    return () => abortController;
  };

  const tableOptions = tables.map((table, index) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <div>
      <ErrorAlert error={errorMessage} />
      <h2>Select a Table:</h2>
      <select
        className="custom-select w-25 mb-2"
        name="table_id"
        aria-label="Default select example"
        required
        onChange={handleChange}
      >
        <option defaultValue={0}>Select a table:</option>

        {tableOptions}
      </select>
      <div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={history.goBack}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SeatReservation;
