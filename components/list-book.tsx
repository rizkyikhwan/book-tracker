"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

const ListBook = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>logout</Button>
    </div>
  )
}
export default ListBook