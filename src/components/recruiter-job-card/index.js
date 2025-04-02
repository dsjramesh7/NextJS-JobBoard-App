"use client";
import React from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

const RecruiterJobCard = ({ jobItem, jobApplications }) => {
  console.log("recu", jobApplications);
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
    </div>
  );
};

export default RecruiterJobCard;
