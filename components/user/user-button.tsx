"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/user/user-avatar"
import { Profile } from "@/types/types"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

interface UserButtonProps {
  user?: Profile
  side?: "top" | "right" | "bottom" | "left" | undefined
  align?: "center" | "start" | "end" | undefined
}

const UserButton = ({ user, side, align }: UserButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <UserAvatar src={user?.image || ""} initialName={`${user?.firstName} ${user?.lastName}`} className="border p-1 shadow" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" side={side} align={align}>
        <DropdownMenuItem className="space-x-2" onSelect={e => e.preventDefault()}>
          <div className="relative line-clamp-2">
            <p className="font-semibold tracking-wide">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-zinc-400">{user?.username}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-rose-500 focus:text-rose-500" onClick={() => signOut()}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserButton