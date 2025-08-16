import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ user, onLogout }) {
  const nav = useNavigate();
  const linkClass = ({ isActive }) =>
    `siteHeader__link${isActive ? " siteHeader__link--active" : ""}`;

  return (
    <header className="siteHeader" role="banner">
      <div className="container siteHeader__bar">
        <button
          className="siteHeader__brand"
          type="button"
          onClick={() => nav("/")}
        >
          <span className="siteHeader__name">HelpDesk&nbsp;AI</span>
        </button>

        <nav className="siteHeader__nav" aria-label="Primary">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/snippets" className={linkClass}>
            Snippets
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </nav>

        <div className="siteHeader__auth">
          {user ? (
            <>
              <span className="siteHeader__user">Hi, {user.name}</span>
              <button
                className="button siteHeader__logout"
                type="button"
                onClick={() => {
                  onLogout();
                  nav("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className={linkClass}>
                Sign in
              </NavLink>
              <NavLink to="/signup" className="button siteHeader__cta">
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
