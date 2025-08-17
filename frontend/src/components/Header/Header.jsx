import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header({ user, onLogout }) {
  const linkClass = ({ isActive }) =>
    `siteHeader__link${isActive ? " siteHeader__link--active" : ""}`;

  return (
    <header className="siteHeader" role="banner">
      <div className="container siteHeader__bar">
        <Link to="/" className="siteHeader__brand" aria-label="Go to Home">
          Helpdesk AI
        </Link>

        <nav className="siteHeader__nav" aria-label="Primary">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/snippets" className={linkClass}>
            Snippets
          </NavLink>
        </nav>

        <div className="siteHeader__auth">
          {user ? (
            <>
              <span className="siteHeader__user" title={user.email || ""}>
                {user.name || "Account"}
              </span>
              <button
                type="button"
                className="button button--ghost"
                onClick={onLogout}
                aria-label="Log out"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className="button button--ghost">
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
