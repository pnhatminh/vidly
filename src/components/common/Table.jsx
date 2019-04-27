import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      {/* zencoding table.table>thead>tr>th*4 */}
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
