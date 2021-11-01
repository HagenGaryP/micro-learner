import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export const MenuSlide = () => {

  const showSettings = (event) => {
    // do something
  }

  return (
    <div
      className="menu-container"
      // onClick={setIsOpen(true)}
    >
      <div className="menu-icon">
        &#8801;
      </div>
      <Menu right >
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="searchStores" className="menu-item" href="/stores">Search Stores</a>
        <a id="products" className="menu-item" href="/products">Products</a>
        <a id="scan" className="menu-item" href="/scan">Scan</a>
        <a onClick={ showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    </div>
  );
};
