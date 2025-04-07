"use client";

import { filterMenuDataArray, formUrlQuery } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Label } from "../ui/label";
import PostNewJobs from "../post-new-jobs";
import CandidateJobCard from "../candidate-job-card";
import RecruiterJobCard from "../recruiter-job-card";

function JobListing({
  user,
  profileInfo,
  jobList,
  jobApplications,
  filterCategories,
}) {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (getSectionID, getCurrentOption) => {
    let cpyFilterParams = { ...filterParams };
    const indexOfCurrentSection =
      Object.keys(cpyFilterParams).indexOf(getSectionID);

    if (indexOfCurrentSection === -1) {
      cpyFilterParams = {
        ...cpyFilterParams,
        [getSectionID]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilterParams[getSectionID].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilterParams[getSectionID].push(getCurrentOption);
      } else {
        cpyFilterParams[getSectionID].splice(indexOfCurrentOption, 1);
      }
    }

    setFilterParams(cpyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));
  };

  useEffect(() => {
    const savedFilters = sessionStorage.getItem("filterParams");
    if (savedFilters) {
      setFilterParams(JSON.parse(savedFilters));
    }
  }, []);

  useEffect(() => {
    if (filterParams && Object.keys(filterParams).length > 0) {
      const url = formUrlQuery({
        params: searchParams.toString(),
        dataToAdd: filterParams,
      });

      router.push(url, { scroll: false });
    }
  }, [filterParams, searchParams]);

  const filterMenus = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    options: [
      ...new Set(filterCategories.map((listItem) => listItem[item.id])),
    ],
  }));

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 dark:border-gray-700 pb-6 pt-16">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {profileInfo?.role === "candidate"
              ? "Explore All Jobs"
              : "Jobs Dashboard"}
          </h1>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            {profileInfo?.role === "candidate" ? (
              <Menubar className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm px-2 py-1">
                {filterMenus.map((filterMenu) => (
                  <MenubarMenu key={filterMenu.name}>
                    <MenubarTrigger className="text-sm font-medium text-gray-700 dark:text-gray-200 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                      {filterMenu.name}
                    </MenubarTrigger>
                    <MenubarContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-md p-2">
                      {filterMenu.options.map((option, optionIdx) => (
                        <MenubarItem
                          key={optionIdx}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-2 py-1"
                          onClick={() => handleFilter(filterMenu.id, option)}
                        >
                          <div
                            className={`h-4 w-4 border rounded transition-all duration-200 ${
                              filterParams &&
                              filterParams[filterMenu.id]?.includes(option)
                                ? "bg-black dark:bg-white border-black dark:border-white"
                                : "border-gray-300 dark:border-gray-500"
                            }`}
                          />
                          <Label className="ml-1 text-sm text-gray-700 dark:text-gray-200">
                            {option}
                          </Label>
                        </MenubarItem>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                ))}
              </Menubar>
            ) : (
              <PostNewJobs
                jobList={jobList}
                user={user}
                profileInfo={profileInfo}
              />
            )}
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="pt-10 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobList && jobList.length > 0 ? (
              jobList.map((jobItem) =>
                profileInfo?.role === "candidate" ? (
                  <CandidateJobCard
                    key={jobItem.name}
                    profileInfo={profileInfo}
                    jobItem={jobItem}
                    jobApplications={jobApplications}
                  />
                ) : (
                  <RecruiterJobCard
                    key={jobItem.name}
                    profileInfo={profileInfo}
                    jobItem={jobItem}
                    jobApplications={jobApplications}
                  />
                )
              )
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No jobs found. Try adjusting your filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListing;
