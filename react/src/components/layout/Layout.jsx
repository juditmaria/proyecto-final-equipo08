// Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from 'react-bootstrap';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
        <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
