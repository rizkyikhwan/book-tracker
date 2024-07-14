"use client"

import Card from "@/components/card"
import SkeletonCard from "@/components/skeleton-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetBookmarkQuery } from "@/store/bookmarks/bookmarkApi"
import { BooksData } from "@/types/types"
import { useEffect, useState } from "react"

interface MyBooksList extends BooksData {
  _id: string
}

const MyBook = () => {
  const [listed, setListed] = useState<MyBooksList[]>([])
  const [read, setRead] = useState<MyBooksList[]>([])
  const [finished, setFinished] = useState<MyBooksList[]>([])

  const { data: listBookmark, isLoading, isSuccess } = useGetBookmarkQuery()

  useEffect(() => {
    if (isSuccess) {
      setListed(listBookmark.books.filter((book: MyBooksList) => book.status === "listed"))
      setRead(listBookmark.books.filter((book: MyBooksList) => book.status === "read"))
      setFinished(listBookmark.books.filter((book: MyBooksList) => book.status === "finished"))
    }
  }, [isSuccess, isLoading])

  return (
    <>
      {isLoading ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2.5">
          {[...Array(21)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : isSuccess && listBookmark.books.length > 0 ? (
        <Tabs defaultValue="listed">
          <TabsList>
            <TabsTrigger value="listed">Listed</TabsTrigger>
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="finished">Finished</TabsTrigger>
          </TabsList>
          <TabsContent value="listed">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2.5">
              {listed.map((book: MyBooksList, index: number) => (
                <Card key={index} data={book} typeClick="status" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reading">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2.5">
              {read.map((book: MyBooksList, index: number) => (
                <Card key={index} data={book} typeClick="status" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="finished">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2.5">
              {finished.map((book: MyBooksList, index: number) => (
                <Card key={index} data={book} typeClick="status" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-slate-500">
          There are no books you have bookmarked
        </div>
      )}
    </>
  )
}
export default MyBook