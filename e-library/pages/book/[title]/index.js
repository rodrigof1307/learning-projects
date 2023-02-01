import data from '../../../data/books.json';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const book = () => {
  const router = useRouter();
  const { title } = router.query;
  const book = data.find(elem => elem.title === title);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center flex-auto">
        <div className="flex justify-center items-center max-w-4xl md:h-full">
              <div className="object-contain h-auto w-4/5">
                <div className="md:mt-10 mt-0">
                    <img 
                      src={book.img}
                      alt='Book Cover'
                    />
                </div>
              </div>
              <div className="flex justify-center text-center">
                <div>
                    <h2 className="text-sm font-semibold">{book.author}</h2>
                    <h1 className="mt-1 font-bold text-3xl">{book.title}</h1>
                    <h3 className="mt-3 text-sm">{book.genre}</h3>
                    <p className="mt-6 font-normal ml-9">{book.overview}</p>

                    <div className="mt-4"> 
                        <div className="flex gap-5 items-center justify-center">
                            <div className='py-2 px-2 rounded font-bold border border-solid border-1 border-gray-500 bg-blue-600 hover:bg-blue-700 text-white'>
                                <Link href='/'>Go Back</Link>
                            </div>
                            <button 
                                onClick={() => window.open(book.url)}
                                className="w-38 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Visit Website
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>  
     </div>
    </>
  )
}

export default book;