import axios from "axios";
import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const login = async (credentials: any) => {
  try {
    const response = await axios.post("https://dummyjson.com/auth/login", credentials)
    const data = response.data

    return data
  } catch (error) {
    throw new Error("Something went wrong", { cause: error })
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) {
          throw new Error("Invalid Credentials")
        }

        try {
          return login(credentials)
        } catch (error) {
          return {}
        }
      },
    })
  ],
  callbacks: {
    async jwt({ user, token }: any) {
      if (user) {
        token.user = user
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.profile = token.user
      }

      return session
    }
  },
  secret: process.env.NEXTAUTH_URL
}

export const getAuthSession = () => {
  return getServerSession(authOptions)
}