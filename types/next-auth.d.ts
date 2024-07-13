import { DefaultSession } from "next-auth"

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: number
      profile: {
        id: number
        firstName: string
        lastName: string
        gender: string
        token: string
        refreshToken: string
        username: string
      }
    } & DefaultSession['user']
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number
    user: {
      id: number
      firstName: string
      lastName: string
      gender: string
      token: string
      refreshToken: string
      username: string
    } & DefaultSession['user']
  }
}