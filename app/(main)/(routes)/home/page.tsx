import ListBook from "@/components/list-book";
import axios from "axios";

const Home = async () => {
  const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/books`)
  const bookmark = res.data

  return (
    <ListBook bookmark={bookmark.books} />
  )
}
export default Home