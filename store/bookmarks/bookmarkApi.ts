import { BooksData, StatusReading } from "@/types/types";
import { apiSlice } from "../api/apiSlice";

interface Books {
  books: BooksData[]
}

export const bookmarkApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBookmark: builder.query<Books, void>({
      query: () => ({
        url: "/books",
        method: 'GET'
      }),
      providesTags: ["Bookmark"]
    }),
    postBook: builder.mutation<any, object>({
      query: ({ data, status }: { data: BooksData, status: StatusReading }) => ({
        url: "/books",
        method: 'POST',
        data: {
          ...data,
          status
        }
      }),
      invalidatesTags: ["Bookmark"]
    }),
    changeStatus: builder.mutation<any, object>({
      query: ({ id, status }: { id: string, status: StatusReading }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        data: {
          status
        }
      }),
      invalidatesTags: ["Bookmark"]
    }),
    deleteBook: builder.mutation<any, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Bookmark"]
    }),
  })
})

export const { useGetBookmarkQuery, usePostBookMutation, useChangeStatusMutation, useDeleteBookMutation } = bookmarkApi