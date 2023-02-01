import Link from 'next/link';

const Book = ({ book }) => {
    return (
        <Link href={'/book/' + book.title}>
        <div className="flex flex-row border-black border-2 rounded-md mx-40 mt-6 dark:border-white">
            <img src={book.img} alt={book.title} className='w-1/5 my-4 ml-4 object-cover'/>
            <div className='flex flex-col justify-between items-center px-10 py-6 mr-4'>
                <h3 className='font-bold'>{book.title}</h3>
                <p>{book.author}</p>
                <p className='text-center'>{book.overview}</p>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={()=>window.open(book.url)}>
                    Visit website
                </button>
            </div>
        </div>
        </Link>
    )
}

export default Book;