export type Profile = {
  id: number
  firstName: string
  lastName: string
  gender: string
  token: string
  refreshToken: string
  username: string
  image: string
}

export type StatusReading = {
  status: 'listed' | 'read' | 'finished'
}

export type BooksData = {
  _id: string
  display_name: string
  updated: string
  list_name_encoded: string
  newest_published_date: string
} & StatusReading