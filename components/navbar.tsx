"use client"

import { BookCopy, SquareLibrary } from "lucide-react"
import UserButton from "./user/user-button"
import { Profile } from "@/types/types"
import { useAppSelector } from "@/store/hooks"
import { useRouter } from "next/navigation"

interface NavbarProps {
  profile?: Profile
}

const Navbar = ({ profile }: NavbarProps) => {
  const router = useRouter()
  const { bookmark } = useAppSelector(state => state.bookmarks)

  return (
    <div className="flex items-center justify-between">
      <button className="rounded-lg p-2 border flex items-center space-x-1 shadow-sm" onClick={() => router.push("/home")}>
        <SquareLibrary className="text-main-primary" />
        <h1 className="text-lg text-main-primary font-semibold md:block hidden">
          Book Tracker
        </h1>
      </button>
      <div className="py-1 px-4 border rounded-lg flex items-center space-x-2 shadow-sm">
        <button className="relative border rounded-md py-1 px-4 bg-slate-100 space-x-1 flex items-center" onClick={() => router.push("/my-book")}>
          <BookCopy size={16} />
          <span className="text-sm">My book</span>
          {bookmark.length > 0 && (
            <p className="absolute -top-1.5 -left-3 p-px rounded-full bg-red-500 text-[10px] h-3.5 w-3.5 flex items-center justify-center text-white">{bookmark.length}</p>
          )}
        </button>
        <UserButton user={profile} align="end" />
      </div>
    </div>
  )
}
export default Navbar