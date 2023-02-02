import packageJson from "../../package.json";
import { __ } from "@wordpress/i18n";

const Header = (props) => {
  const { page, pages, setPage } = props;
  return (
    <header>
      <div className="container">
        <div className="top">
          <h1 className="heading">
            {__("Настройки Custom", packageJson.name)}
          </h1>
          <span className="version">v{packageJson.version}</span>
          <img
            src={`${window.location.origin}/wp-content/themes/custom/assets/admin/Signature.svg`}
            alt={__("Логотип темы", packageJson.name)}
          />
        </div>
        <nav className="navigation">
          {pages.map((item, index) => (
            <li
              className={`${page === index ? "activ" : ""}`}
              key={index}
              onClick={() => setPage(index)}
            >
              {item.name}
            </li>
          ))}
        </nav>
      </div>
    </header>
  );
};
export default Header;
