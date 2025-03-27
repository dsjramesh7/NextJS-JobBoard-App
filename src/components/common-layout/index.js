import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchUserAction } from "@/actions";

const CommonLayout = async ({ children }) => {
  const user = await currentUser();
  const profileInfo = await fetchUserAction(user?.id);
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      {/* Header component */}
      <Header
        profileInfo={profileInfo}
        user={JSON.parse(JSON.stringify(user))}
      />
      {/* Header component */}

      {/* main component */}
      <main>{children}</main>
      {/* main component */}
    </div>
  );
};
export default CommonLayout;
