import OnBoard from "@/components/on-board";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const OnBoardPage = async () => {
  // get the user from auth clerk
  const user = await currentUser();

  // fetch the profile info => either the user is candidate/ the user is recruiter
  const profileInfo = await fetchUserAction(user?.id);
  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo.isPremiumUser) {
      redirect("/membership");
    } else {
      redirect("/");
    }
  } else {
    return <OnBoard />;
  }
};

export default OnBoardPage;
