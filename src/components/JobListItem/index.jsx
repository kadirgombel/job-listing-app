import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./JobListItem.scss";
import Button from "../Button";

function JobListItem({ job = {}, onEdit, onDelete }) {
  const [priority, setPriority] = useState();
  useEffect(() => {
    if (job.priority === 1) {
      setPriority("urgent");
    } else if (job.priority === 2) {
      setPriority("regular");
    } else if (job.priority === 3) {
      setPriority("trivial");
    }
  }, [job]);

  const capitalize = (str) => {
    return str && str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div
      data-testid="jobListItem"
      className={`job-list-item job-list-item--${priority}`}
    >
      <span className="job-list-item__job-name">{job.name}</span>
      <span>{capitalize(priority)}</span>
      <div>
        <Button
          className="job-list-item__operation"
          onClick={() => onEdit(job)}
        >
          Edit
        </Button>
        <Button
          className="job-list-item__operation"
          onClick={() => onDelete(job.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

JobListItem.propTypes = {
  job: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default JobListItem;
