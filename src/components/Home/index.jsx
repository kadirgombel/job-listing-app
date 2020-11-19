import React, { useState } from "react";
import "./Home.scss";
import AddJobForm from "../AddJobForm";
import JobList from "../JobList";
import Modal from "../Modal";
import EditJobForm from "../EditJobForm";

function Home() {
  const [jobs, setJobs] = useState([
    { name: "Example post", priority: 2, id: 123456 },
  ]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});

  const selectJobAndOpenEdit = (job) => {
    setSelectedJob(job);
    setShowEdit(true);
  };

  const handleDelete = (id) => {
    const filteredJobs = jobs.filter((job) => job.id !== id);
    setJobs(filteredJobs);
  };

  const handleEdit = (editedJob) => {
    const editedJobs = jobs.map((job) => {
      if (job.id === editedJob.id) {
        return editedJob;
      }
      return job;
    });
    setJobs(editedJobs);
    setShowEdit(false);
  };

  return (
    <div className="home">
      <div className="home__container">
        <AddJobForm
          job={{ name: "kadir", priority: 2 }}
          mode="EDIT"
          onAdd={(job) => {
            setJobs([job, ...jobs]);
          }}
        />
        <JobList
          onDelete={handleDelete}
          className="home__job-list"
          onEdit={selectJobAndOpenEdit}
          jobs={jobs}
        ></JobList>
      </div>
      {showEdit && (
        <Modal headerText="Edit Job" onClose={() => setShowEdit(false)}>
          <EditJobForm job={selectedJob} onEdit={handleEdit} />
        </Modal>
      )}
    </div>
  );
}

Home.propTypes = {};

export default Home;
