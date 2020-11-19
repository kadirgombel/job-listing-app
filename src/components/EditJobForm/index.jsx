import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PrioritySelect from "../PrioritySelect";
import Button from "../Button";
import "./EditJobForm.scss";

function EditJobForm({ job = {}, onEdit }) {
  const [jobPriority, setJobPriority] = useState();
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    setJobPriority(job.priority);
  }, [job]);

  useEffect(() => {
    setIsValid(jobPriority > 0);
  }, [jobPriority]);

  const handlePriorityChange = ({ target }) => {
    setJobPriority(Number(target.value));
  };

  return (
    <div className="edit-job-form">
      <div className="edit-job-form__item edit-job-form__job-name">
        {job.name}
      </div>
      <PrioritySelect
        value={jobPriority}
        className="edit-job-form__item edit-job-form__select"
        onChange={handlePriorityChange}
        id="job-priority"
      ></PrioritySelect>
      <Button
        disabled={!isValid}
        className="edit-job-form__item"
        onClick={() => {
          onEdit({ ...job, priority: jobPriority });
        }}
        type="button"
      >
        Update
      </Button>
    </div>
  );
}

EditJobForm.propTypes = {
  job: PropTypes.object,
};

export default EditJobForm;
