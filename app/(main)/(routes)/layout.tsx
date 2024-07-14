import Navbar from "@/components/navbar";
import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";

const LayoutMain = async ({ children }: { children: React.ReactNode }) => {
  const data = await getAuthSession();

  if (!data?.user) {
    redirect("/")
  }

  return (
    <main className="max-w-7xl py-5 px-5 md:px-8 mx-auto space-y-4 overflow-x-hidden">
      <Navbar profile={data?.user.profile} />
      {children}
    </main>
  )
}
export default LayoutMain