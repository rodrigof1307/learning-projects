import Book from '../components/Book';

const Books = ({data}) => {
    return (
        <>
            {data.map((book, index) => 
            {
                return (
                    <div key={index}>
                        <Book book={book}/>
                    </div>
                )
            })}
        </>
    );
}

export default Books;