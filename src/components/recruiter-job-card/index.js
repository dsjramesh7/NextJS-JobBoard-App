"use client";
import React, { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

const RecruiterJobCard = ({ jobItem, jobApplications }) => {
  // console.log("recruiter job application", jobApplications);
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        footerContent={
          <Button className="flex h-11 justify-center items-center px-5 mt-4">
            {
              jobApplications.filter((item) => item.jobID === jobItem?._id)
                .length
            }{" "}
            Applicants
          </Button>
        }
      />
      <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        jobItem={jobItem}
        jobApplications={jobApplications.filter(
          (jobApplicantItem) => jobApplicantItem.jobID === jobItem?._id
        )}
      />
    </div>
  );
};

export default RecruiterJobCard;
