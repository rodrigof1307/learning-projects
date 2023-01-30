import React from 'react';
import Slider from './Slider.js'
import Header from './Header.js'
import { Outlet } from 'react-router-dom';

const Layout = ({children}) => {
    return (
        <>
            <Slider />
            <Header />
            <main>{children}</main>
            <Outlet />
        </>
    )
}

export default Layout