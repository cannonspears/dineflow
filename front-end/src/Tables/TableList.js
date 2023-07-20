import React from "react";

function TableList({ tables, handleFinishReservation }) {
  const tablesRows = tables.map((table) => (
    <tr key={table.table_id}>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
      {table.reservation_id !== null ? (
        <td>
          <button
            typ="button"
            className="btn btn-secondary btn-sm"
            data-table-id-finish={table.table_id}
            onClick={() =>
              handleFinishReservation(table.table_id, table.reservation_id)
            }
          >
            Finish
          </button>
        </td>
      ) : null}
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
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">{tablesRows}</tbody>
        </table>
      </div>
    </main>
  );
}

export default TableList;
