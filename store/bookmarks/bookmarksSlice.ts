import { BooksData } from "@/types/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: { bookmark: BooksData[] } = {
  bookmark: [],
}

export const bookmarksSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearBookmark: (state) => {
      state.bookmark = initialState.bookmark
    },
    setBookmark: (state, action: PayloadAction<BooksData[]>) => {
      state.bookmark = action.payload
    },
    setNewBookmark: (state, action) => {
      if (!state.bookmark.find(book => book.list_name_encoded === action.payload.list_name_encoded)) {
        state.bookmark.push(action.payload)
      } else {
        state.bookmark = state.bookmark.filter(book => book.list_name_encoded !== action.payload.list_name_encoded)
      }
    },
  }
})

export const { setBookmark, setNewBookmark, clearBookmark } = bookmarksSlice.actions

export default bookmarksSlice.reducer