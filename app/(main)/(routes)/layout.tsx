import { getAuthSession } from "@/lib/nextAuth";
import { redirect } from "next/navigation";

const LayoutMain = async ({ children }: { children: React.ReactNode }) => {
  const data = await getAuthSession();

  if (!data?.user) {
    redirect("/")
  }

  return (
    <>
      {children}
    </>
  )
}
export default LayoutMain