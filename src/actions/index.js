"use server";

import connectToDB from "@/database";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

// create profile action
export const createProfileAction = async (formData, pathToRevalidate) => {
  await connectToDB();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
};

//fetch User
export const fetchProfileAction = async (id) => {
  await connectToDB();
  const result = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(result));
};

// create job action
export async function postNewJobAction(formData, pathToRevalidate) {
  await connectToDB();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}

//fetch job action
//recruiter
export const fetchJobsForRecruiterAction = async (id) => {
  await connectToDB();
  const result = await Job.find({ recruiterId: id });
  return JSON.parse(JSON.stringify(result));
};
//candidate
export const fetchJobsForCandidateAction = async () => {
  await connectToDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
};

//create Job application
export async function createJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}
//fetch job application - candidate
export const fetchJobApplicationForCandidate = async (candidateID) => {
  await connectToDB();
  const result = await Application.find({ candidateUserID: candidateID });
  return JSON.parse(JSON.stringify(result));
};
//fetch job application - recruiter
export const fetchJobApplicationForRecruiter = async (recruiterID) => {
  await connectToDB();
  const result = await Application.find({ recruiterUserID: recruiterID });
  return JSON.parse(JSON.stringify(result));
};
//update job application
export async function updateJobApplicationAction(data, pathToRevalidate) {
  await connectToDB();
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jobAppliedDate,
  } = data;
  await Application.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

//get candidate details by candidate ID
export const getCandidateDetailsByIDAction = async (currentCandidateID) => {
  await connectToDB();
  const result = await Profile.findOne({ userId: currentCandidateID });
  return JSON.parse(JSON.stringify(result));
};

//create filter categories
export const createFilterCategoryAction = async () => {
  await connectToDB();
  const result = await Job.find({});
  return JSON.parse(JSON.stringify(result));
};
