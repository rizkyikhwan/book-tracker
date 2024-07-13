import { getAuthSession } from "./nextAuth";

export default async function auth() {
  let isAuthenticated = false

  const data = await getAuthSession();


  if (data?.user) {
    isAuthenticated = true
  }
  console.log(isAuthenticated)

  return isAuthenticated
}