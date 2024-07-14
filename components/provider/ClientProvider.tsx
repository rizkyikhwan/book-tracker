"use client"

import { store } from "@/store"
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  )
}
export default ClientProvider