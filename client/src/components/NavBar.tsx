import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

  return (
    <nav className="mainNav">
      <ul>
        <li>
          {/* removed exact added end */}
          <NavLink to="/" className={location.pathname === '/' ? 'activeLink' : ''} end>
            MyBatch
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory" className={location.pathname === '/inventory' ? 'activeLink' : ''}>
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/our-recipes" className={location.pathname === '/our-recipes' ? 'activeLink' : ''}>
            Our recipes
          </NavLink>
        </li>

        <li>
          <NavLink to="/my-recipes" className={location.pathname === '/my-recipes' ? 'activeLink' : ''}>
            My recipes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
