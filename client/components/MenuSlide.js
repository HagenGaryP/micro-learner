import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { slide as Menu } from 'react-burger-menu';

export const MenuSlide = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showSettings = (event) => {
    // do something
  }

  return (
    <div
      className="menu-container"
      // onClick={setIsOpen(true)}
    >
      Menu
      <Menu right >
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="topics" className="menu-item" href="/topics">Products</a>
        <a id="scan" className="menu-item" href="/scan">Scan</a>
        <a onClick={ showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    </div>
  );
};
