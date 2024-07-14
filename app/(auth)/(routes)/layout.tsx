import { getAuthSession } from "@/lib/nextAuth";
import Head from "next/head";
import { redirect } from "next/navigation";

const LayoutAuth = async ({ children }: { children: React.ReactNode }) => {
  const data = await getAuthSession();

  if (data?.user) {
    redirect("/home")
  }

  return (
    <>
      {children}
    </>
  )
}
export default LayoutAuth