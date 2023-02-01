import Footer from "./Footer";
import Header from "./Header";
import Head from 'next/head'

const Layout = ({children}) => (
    <>
        <Head>
            <title>E-Library</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="min-h-screen flex flex-col ">
            <Header/>
            {children}
            <Footer/>
        </main>
    </>
)

export default Layout