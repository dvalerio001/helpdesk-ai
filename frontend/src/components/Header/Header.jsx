import { Link, useNavigate  } from "react-router-dom";
import "./Header.css";

function Header({ user, onLogout }) {
  const nav = useNavigate();

  function handleLogoutClick() {
    onLogout();
    nav("/", { replace: true });
  }

  return (
    <header className="header">
      <h1 className="header__brand">HelpDesk AI</h1>
      <nav className="header__nav">
        <Link className="header__link" to="/">Home</Link>
        <Link className="header__link" to="/snippets">Snippets</Link>
        <Link className="header__link" to="/about">About</Link>

        {user ? (
          <>
            <span className="header__user">Hi, {user.name}</span>
            <button className="header__logout button" type="button" onClick={handleLogoutClick}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="header__link" to="/signin">Sign in</Link>
            <Link className="header__link" to="/signup">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}


export default Header;