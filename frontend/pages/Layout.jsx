import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
const Layout = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <div className="content bg-black" style={{ margin: "0" }}>
        <Outlet />  {/* This is where nested routes will be rendered */}
      </div>
      <Footer />
    </ScrollToTop>
  );
};

export default Layout;