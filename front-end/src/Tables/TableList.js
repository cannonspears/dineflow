import React from "react";

function TableList({}) {
  const tablesRows = tables.map((table) => (
    <tr key={table.table_id}>
      <td scope="row">{table.table_name}</td>
      <td>{table.capacity}</td>
    </tr>
  ));
  return (
    <main>
      <div className="d-md-flex mt-3">
        <h4>Tables</h4>
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

export default TableList;
