import React from "react";

function ControlsBar({ showGreasedOnly, onToggleGreased, sortBy, onSortChange }) {
  return (
    <div className="ui segment">
      <div className="ui form">
        <div className="two fields">
          <div className="field">
            <div className="ui checkbox">
              <input
                id="greased-filter"
                type="checkbox"
                checked={showGreasedOnly}
                onChange={onToggleGreased}
              />
              <label htmlFor="greased-filter">Greased</label>
            </div>
          </div>

          <div className="field">
            <label htmlFor="sort-hogs">Sort</label>
            <select
              id="sort-hogs"
              className="ui dropdown"
              value={sortBy}
              onChange={onSortChange}
            >
              <option value="name">Name</option>
              <option value="weight">Weight</option>
            </select>
          </div>
        </div>
      </div>git 
    </div>
  );
}

export default ControlsBar;
