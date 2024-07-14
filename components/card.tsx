"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { capitalizeLetter, cn, parseDateString } from "@/lib/utils"
import { useChangeStatusMutation, useDeleteBookMutation } from "@/store/bookmarks/bookmarkApi"
import { BooksData } from "@/types/types"
import { X } from "lucide-react"
import { usePathname } from "next/navigation"
import BtnBookmark from "./btn-bookmark"
import { Button } from "./ui/button"

interface CardProps {
  data: BooksData
  onClick?: () => void
  typeClick?: "bookmark" | "status"
}

const Card = ({ data, onClick, typeClick }: CardProps) => {
  const pathname = usePathname()
  const [changeStatus] = useChangeStatusMutation()
  const [deleteBook] = useDeleteBookMutation()

  return (
    <div className="border rounded-lg p-2 flex flex-col space-y-4 justify-between shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-semibold text-main-primary">{data.display_name}</p>
          <p className="text-xs text-main-primary">{parseDateString(data.newest_published_date)}</p>
        </div>
        {onClick &&
          typeClick === "bookmark" &&
          (
            <BtnBookmark listNameEncoded={data.list_name_encoded} onClick={() => onClick()} />
          )}
        {typeClick === "status" && (
          <Select defaultValue={data.status} onValueChange={val => changeStatus({ id: data._id, status: val })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="listed">Listed</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="finished">Finished</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      <div className={cn("flex justify-end items-end", pathname === "/my-book" && "justify-between")}>
        {pathname === "/my-book" && (
          <Button variant="delete" className="h-7 w-8 p-0" type="button" onClick={() => deleteBook(data._id)}>
            <X size={16} />
          </Button>
        )}
        <p className="text-xs text-main-secondary">Update on: {capitalizeLetter(data.updated)}</p>
      </div>
    </div>
  )
}
export default Card