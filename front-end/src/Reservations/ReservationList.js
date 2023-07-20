import React, { Fragment } from "react";

// Import Components
import CancelReservation from "./CancelReservation";

function ReservationList({ reservations, loadDashboard }) {
  const reservationsRows = reservations.map((reservation) => (
    <tr key={reservation.reservation_id}>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      {reservation.status === "booked" ? (
        <Fragment>
          <td>
            <a
              href={`/reservations/${reservation.reservation_id}/seat`}
              className="btn btn-primary btn-sm ml-3"
            >
              Seat
            </a>
          </td>
          <td>
            <a
              href={`/reservations/${reservation.reservation_id}/edit`}
              className="btn btn-secondary btn-sm"
            >
              Edit
            </a>
          </td>
          <td>
            <CancelReservation
              reservation_id={reservation.reservation_id}
              loadDashboard={loadDashboard}
            />
          </td>
        </Fragment>
      ) : null}
    </tr>
  ));

  return (
    <main>
      <div className="d-md-flex mt-3">
        <h4>Reservations</h4>
      </div>
      <div className="table-responsive">
        <table className="table table-sm w-75 text-center mb-5">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Reservation Date</th>
              <th scope="col">Reservation Time</th>
              <th scope="col">People</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">{reservationsRows}</tbody>
        </table>
      </div>
    </main>
  );
}

export default ReservationList;
