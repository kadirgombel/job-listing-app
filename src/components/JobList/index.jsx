import React, { useState } from "react";
import "./JobList.scss";
import PropTypes from "prop-types";
import JobListItem from "../JobListItem/index";

function JobList({ jobs = [], onEdit, onDelete, ...rest }) {
  const [searchInput, setSearchInput] = useState("");
  const renderListItems = (jobs) => {
    if (!jobs.length) {
      return <div>Currently no job postings. Please add one.</div>;
    }
    return jobs
      .filter(includesSearchInput)
      .sort(sortByPriority)
      .map((job) => (
        <JobListItem
          onEdit={onEdit}
          onDelete={onDelete}
          job={job}
          key={job.id}
        ></JobListItem>
      ));
  };
  const includesSearchInput = (job) =>
    job.name?.toLowerCase().includes(searchInput.toLowerCase());
  const sortByPriority = (job1, job2) => job1.priority - job2.priority;

  return (
    <div className={`job-list ${rest.className}`}>
      <div className="job-list__header">
        <span>JOB LIST</span>
        <input
          className="job-list__search"
          onChange={({ target: { value } }) => {
            // Input can be debounced for performance improvement when using API
            setSearchInput(value);
          }}
          type="input"
          placeholder="Search Job"
        ></input>
      </div>
      <hr className="job-list__seperator" />
      <div className="job-list__items">{renderListItems(jobs)}</div>
    </div>
  );
}

JobList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object),
};

export default JobList;
