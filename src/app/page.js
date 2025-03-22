import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
async function Home() {
  const user = await currentUser();
  console.log("user", user);

  const profileInfo = null;

  if (user && !profileInfo?.id) redirect("/onboard");
  return <section>safsadf</section>;
}
export default Home;
