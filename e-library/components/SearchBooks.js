import { BsSearch } from "react-icons/bs";
import { useRef } from "react";

const SearchBooks = ({ setSearch }) => {
    const inputRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(inputRef.current.value);
    };

    return (
        <form className="w-1/2 h-12 border-black border-2 rounded-md mx-auto flex justify-between items-center px-2 dark:border-white" onSubmit={handleSearch}>
            <input
                className="flex-auto focus:outline-none mr-2"
                type="text"
                placeholder="Search for Books"
                ref={inputRef}
            />
            <button
                className="w-8 h-8 bg-blue-400 rounded-md justify-center items-center flex text-white"
                type="submit"
            >
                <BsSearch />
            </button>
        </form>
    );
};

export default SearchBooks;