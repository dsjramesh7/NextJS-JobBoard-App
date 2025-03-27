import { fetchUserAction } from "@/actions";
import JobListing from "@/components/jobListing";
import { currentUser } from "@clerk/nextjs/server";

const JobsPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchUserAction(user?.id);
  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
    />
  );
};

export default JobsPage;
