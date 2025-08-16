import "./Footer.css";
import { OWNER_NAME, APP_NAME } from "../../utils/constants.js";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__inner">
        <div className="footer__left">
          © {year} {OWNER_NAME}
        </div>
        <div className="footer__sep" aria-hidden="true">
          •
        </div>
        <div className="footer__right">{APP_NAME}</div>
      </div>
    </footer>
  );
}

export default Footer;
