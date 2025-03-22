import { currentUser } from "@clerk/nextjs/dist/types/server";
import Header from "../header";

const CommonLayout = async ({ children }) => {
  const user = await currentUser();
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      {/* Header component */}
      <Header user={JSON.parse(JSON.stringify(user))} />
      {/* Header component */}

      {/* main component */}
      <main>{children}</main>
      {/* main component */}
    </div>
  );
};
export default CommonLayout;
