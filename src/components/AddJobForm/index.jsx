import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AddJobForm.scss";
import PrioritySelect from "../PrioritySelect";
import Button from "../Button";

function AddJobForm({ onAdd }) {
  const [jobName, setJobName] = useState("");
  const [jobPriority, setJobPriority] = useState();
  const [canCreate, setCanCreate] = useState(false);
  const [validFields, setValidFields] = useState({
    name: true,
    priority: true,
  });

  useEffect(() => {
    const isNameValid = checkJobNameValid(jobName);
    const isPriorityValid = jobPriority > 0;
    setValidFields({
      name: isNameValid,
      priority: isPriorityValid,
    });
    setCanCreate(isNameValid && isPriorityValid);
  }, [jobName, jobPriority]);

  const handleFormSubmit = () => {
    if (checkJobNameValid(jobName) && jobPriority) {
      onAdd({
        id: Math.floor(Math.random() * 100000),
        name: jobName,
        priority: jobPriority,
      });
    }
  };

  const checkJobNameValid = (name) => {
    return name && name.length <= 70 && /^[A-Za-z0-9 ]*$/.test(name);
  };

  const handleJobNameChange = ({ target }) => {
    setJobName(target.value);
  };

  const handlePriorityChange = ({ target }) => {
    setJobPriority(Number(target.value));
  };

  return (
    <div>
      <form className="add-job-form">
        <div className="add-job-form__section">
          <label className="add-job-form__label" htmlFor="job-name">
            Job:*
          </label>

          <input
            onChange={handleJobNameChange}
            className={`add-job-form__input ${
              !validFields.name && "add-job-form__input--error"
            }`}
            id="job-name"
            value={jobName}
            placeholder="Job"
          ></input>
        </div>

        <div className="add-job-form__section">
          <label className="add-job-form__label" htmlFor="job-priority">
            Priority:*
          </label>
          <PrioritySelect
            value={jobPriority}
            onChange={handlePriorityChange}
            className={`add-job-form__select ${
              !validFields.priority && "add-job-form__select--error"
            }`}
            id="job-priority"
          ></PrioritySelect>
        </div>

        <Button disabled={!canCreate} onClick={handleFormSubmit} type="button">
          Create
        </Button>
      </form>
    </div>
  );
}

AddJobForm.propTypes = {
  onAdd: PropTypes.func,
};

export default AddJobForm;
