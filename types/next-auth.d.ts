import { DefaultSession } from "next-auth"
import { Profile } from "./types"

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: number
      profile: Profile
    } & DefaultSession['user']
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number
    user: Profile & DefaultSession['user']
  }
}