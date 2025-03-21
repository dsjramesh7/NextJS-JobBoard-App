import { currentUser } from "@clerk/nextjs/server";
async function Home() {
  const user = await currentUser();
  console.log("user", user);
  return <section>safsadf</section>;
}
export default Home;
