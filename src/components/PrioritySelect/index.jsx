import React from "react";
import PropTypes from "prop-types";

function PrioritySelect({ value = "", ...rest }) {
  const priorities = [
    { label: "Please Choose", value: "" },
    { label: "Urgent", value: 1 },
    { label: "Regular", value: 2 },
    { label: "Trivial", value: 3 },
  ];

  const renderOptions = () => {
    return priorities.map((priority) => (
      <option value={priority.value} key={priority.value}>
        {priority.label}
      </option>
    ));
  };

  return (
    <select
      data-testid="select"
      {...rest}
      value={value}
      id="job-priority"
      type="select"
    >
      {renderOptions()}
    </select>
  );
}

PrioritySelect.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default PrioritySelect;
