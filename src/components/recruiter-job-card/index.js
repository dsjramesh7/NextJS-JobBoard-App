"use client";
import React from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

const RecruiterJobCard = ({ jobItem }) => {
  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        footerContent={
          <Button className="flex h-11 justify-center items-center px-5 mt-4">
            10 applicant
          </Button>
        }
      />
    </div>
  );
};

export default RecruiterJobCard;
