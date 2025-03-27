"use client";

import PostNewJobs from "../post-new-jobs";

const JobListing = ({ user, profileInfo }) => {
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {profileInfo?.role === "candidate"
              ? "Explore All Jobs"
              : "Jobs Dashboard"}
          </h1>
          <div>
            {profileInfo?.role === "candidate" ? (
              <p>filter</p>
            ) : (
              <PostNewJobs />
            )}
          </div>
        </div>
        <div>job listing</div>
      </div>
    </div>
  );
};

export default JobListing;
