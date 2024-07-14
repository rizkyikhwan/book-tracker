"use client"

import { setBookmark, setNewBookmark } from "@/store/bookmarks/bookmarksSlice"
import { useAppDispatch } from "@/store/hooks"
import { BooksData } from "@/types/types"
import axios from "axios"
import { useEffect, useState } from "react"
import Card from "./card"
import SkeletonCard from "./skeleton-card"
import { usePostBookMutation } from "@/store/bookmarks/bookmarkApi"

const ListBook = ({ bookmark }: { bookmark: BooksData[] }) => {
  const dispatch = useAppDispatch()
  const [postBook] = usePostBookMutation()

  const [books, setBooks] = useState<BooksData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getListBook = async () => {
    setIsLoading(true)

    try {
      const res = await axios(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.NEXT_PUBLIC_API_KEY}`)
      const data = res.data

      setBooks(data.results)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getListBook()

    dispatch(setBookmark(bookmark))
  }, [bookmark, dispatch])

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2.5">
      {!isLoading ? (
        books.map((book, index) => (
          <Card
            key={index}
            data={book}
            typeClick="bookmark"
            onClick={() => {
              postBook({ data: book, status: "listed" })
              dispatch(setNewBookmark(book))
            }}
          />
        ))
      ) : (
        [...Array(21)].map((_, index) => (
          <SkeletonCard key={index} />
        ))
      )}
    </div>
  )
}
export default ListBook