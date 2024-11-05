import React from "react";

export const SettingsMenu = ({ offset, onOffsetChange }) => {
  const handleOffsetInput = (e) => {
    const newOffset = parseInt(e.target.value, 10);
    onOffsetChange(newOffset);
  };

  return (
    <div className="settings-menu">
      <h3>Settings</h3>
      <label>
        Edge Offset:
        <input
          type="range"
          value={offset}
          onChange={handleOffsetInput}
          min="0"
          max="50"
          step="1"
          style={{ width: "100%" }}
        />
        <input
          type="number"
          value={offset}
          onChange={handleOffsetInput}
          min="0"
          max="50"
          style={{ marginLeft: "10px", width: "50px" }}
        />
      </label>
    </div>
  );
};
