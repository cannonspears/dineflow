import React from "react";

function TableList({}) {
  const tablesRows = tables.map((table) => (
    <tr key={table.table_id}>
      <td scope="row">{table.table_name}</td>
      <td>{table.capacity}</td>
    </tr>
  ));
  return <h1>Table List</h1>;
}

export default TableList;
