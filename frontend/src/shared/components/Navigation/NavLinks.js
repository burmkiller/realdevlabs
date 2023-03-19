import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './css/NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Search
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/books/reservations">My Reservation</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/books/shortlist">My Shortlist</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
