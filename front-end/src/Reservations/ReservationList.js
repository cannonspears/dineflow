import React from "react";

function ReservationList({ reservations }) {
  const reservationsRows = reservations.map((reservation) => (
    <tr key={reservation.reservation_id}>
      <td scope="row">{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
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
            </tr>
          </thead>
          <tbody className="table-group-divider">{reservationsRows}</tbody>
        </table>
      </div>
    </main>
  );
}

export default ReservationList;
