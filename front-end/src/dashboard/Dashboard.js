import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Import Utility Functions
import { next, previous, today } from "../utils/date-time";
import { listReservations, listTable, finishReservation } from "../utils/api";

// Import Components
import ReservationList from "../Reservations/ReservationList";
import TableList from "../Tables/TableList";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    listTable(abortController.signal).then(setTables);
    return () => abortController.abort();
  }

  const handleFinishReservation = async (table_id) => {
    const abortController = new AbortController();
    const confirm = window.confirm(
      "Is this table ready to seat new guests?\nThis cannot be undone."
    );
    if (confirm) {
      try {
        await finishReservation(table_id, abortController.signal);
        loadDashboard();
        loadTables();
      } catch (error) {
        console.log(error);
      }
    }
    return () => abortController.abort();
  };

  function previousDay(date) {
    const previousDate = previous(date);
    history.push(`/dashboard?date=${previousDate}`);
  }

  function nextDay(date) {
    const nextDate = next(date);
    history.push(`/dashboard?date=${nextDate}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <h5>Today's Date: {date}</h5>

      <div className="btn-toolbar mb-2 mb-md-0">
        <div className="btn-group me-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn m-1 mt-2 float-right"
            onClick={() => previousDay(date)}
          >
            Previous Day
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn m-1 mt-2 float-right"
            onClick={() => history.push(`/dashboard?date=${today()}`)}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn m-1 mt-2 float-right"
            onClick={() => nextDay(date)}
          >
            Next Day
          </button>
        </div>
      </div>

      <ErrorAlert error={reservationsError} />
      <ReservationList reservations={reservations} loadDashboard={loadDashboard} />
      <TableList tables={tables} handleFinishReservation={handleFinishReservation} />
    </main>
  );
}

export default Dashboard;
