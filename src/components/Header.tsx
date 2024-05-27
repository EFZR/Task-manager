import { Link } from "react-router-dom";
import { BiMoon, BiSun, BiUser, BiSearch } from "react-icons/bi";
import useDarkTheme from "../hooks/useDarkTheme";
import "../styles/Header.css";
import useTask from "../hooks/useTask";

export default function Header() {
  const { toggleFilter, switchToggleFilter, theme, switchTheme, clean } =
    useTask();
  useDarkTheme(theme);

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo" onClick={clean}>
          Task
          <br />
          <span>Master</span>
        </Link>

        <div className="nav__actions">
          <div className="nav__filter">
            <BiSearch
              className="nav__icon-search"
              onClick={switchToggleFilter}
            />
            <input
              type="text"
              placeholder="Search..."
              id="filter"
              name="filter"
              className={`nav__input-search ${
                toggleFilter && "nav__input-search-active"
              }`}
            />
          </div>
          {theme ? (
            <BiSun className="nav__icon" onClick={switchTheme} />
          ) : (
            <BiMoon className="nav__icon" onClick={switchTheme} />
          )}
          {/* TODO: Implement user authentication and profile features */}
          {/* <BiUser className="nav__icon" /> */}
        </div>
      </nav>
    </header>
  );
}
