import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="header__brand">HelpDesk AI</h1>
      <nav className="header__nav">
        <Link className="header__link" to="/">Home</Link>
        <Link className="header__link" to="/about">About</Link>
      </nav>
    </header>
  );
}

export default Header;