import React from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

const CandidateJobCard = ({ jobItem, profileInfo }) => {
  return (
    <>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        description={jobItem?.companyName}
        footerContent={
          <Button className="flex h-11 justify-center items-center px-5 mt-4">
            View Details
          </Button>
        }
      />
    </>
  );
};

export default CandidateJobCard;
