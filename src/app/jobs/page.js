import {
  fetchJobApplicationForCandidate,
  fetchJobApplicationForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/jobListing";
import { currentUser } from "@clerk/nextjs/server";

const JobsPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  const jobList =
    profileInfo?.role === "candidate"
      ? await fetchJobsForCandidateAction()
      : await fetchJobsForRecruiterAction(user?.id);

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationForCandidate(user?.id)
      : await fetchJobApplicationForRecruiter(user?.id);
  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={getJobApplicationList}
    />
  );
};

export default JobsPage;
