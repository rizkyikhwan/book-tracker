// "use client"

import { useSession } from "next-auth/react"
import { authOptions, getAuthSession } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import Image from "next/image"
import ListBook from "@/components/list-book";

const Home = async () => {
  // const Home = () => {
  // const { data } = useSession()
  // console.log(session?.user.profile)
  const data = await getAuthSession();

  console.log("home", data);

  return (
    // <div>Name: {session?.user.profile.gender}</div>
    <div>
      {/* <Image src={session?.user.image || ""} alt="tes" width={100} height={100} /> */}
      <p>tes {data?.user.profile.gender || "woi"}</p>
      <ListBook />
    </div>
  )
}
export default Home