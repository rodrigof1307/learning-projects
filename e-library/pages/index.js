import Books from "../components/Books";
import SearchBooks from "../components/SearchBooks";
import booksList from '../data/books.json';
import { useState } from "react";

const Home = () => {

  const [search, setSearch] = useState("");

  return (
    <div className="flex-auto">   
      <SearchBooks setSearch={setSearch} />
      <Books data={booksList.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))}/>
    </div>
  );
}

export default Home;