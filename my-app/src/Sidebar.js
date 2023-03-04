import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item">
        Home
      </a>
      <a className="menu-item">
        Salads
      </a>
      <a className="menu-item">
        Pizzas
      </a>
      <a className="menu-item">
        Otra cosa
      </a>
    </Menu>
  );
};