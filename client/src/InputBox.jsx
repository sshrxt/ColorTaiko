import React from "react";

const InputBox = ({ rows, setRows, columns, setColumns, onSubmit }) => {
  const handleRowChange = (e) => {
    const value = e.target.value;
    // Prevent leading zeros
    setRows(value === '' ? '' : parseInt(value, 10));
  };

  const handleColumnChange = (e) => {
    const value = e.target.value;
    // Prevent leading zeros
    setColumns(value === '' ? '' : parseInt(value, 10));
  };

  return (
    <form onSubmit={onSubmit} className="GameForm">
      <div className="GameQuestion">
        <div>
          <label>Top: </label>
          <input
            type="number"
            value={rows}
            onChange={handleRowChange}
          />
        </div>
        <div>
          <label>Bottom: </label>
          <input
            type="number"
            value={columns}
            onChange={handleColumnChange}
          />
        </div>
      </div>
    </form>
  );
};

export default InputBox;
