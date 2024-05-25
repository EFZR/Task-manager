import { Link } from "react-router-dom"
import { BiMoon, BiSun, BiUser, BiSearch } from "react-icons/bi"
import useDarkTheme from "../hooks/useDarkTheme"
import "../styles/Header.css"
import useTask from "../hooks/useTask"

export default function Header() {
  const { toggleFilter, switchToggleFilter, theme, switchTheme } = useTask()
  useDarkTheme(theme)

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          Task<br />
          <span>Master</span>
        </Link>

        <div className="nav__actions">
          <div className="nav__filter">
            <BiSearch className="nav__icon-search" onClick={switchToggleFilter} />
            <input type="text" placeholder="Search..." className={`nav__input-search ${toggleFilter && "nav__input-search-active"}`} />
          </div>
          <BiUser className="nav__icon" />
          {theme ? (
            <BiSun
              className="nav__icon"
              onClick={switchTheme}
            />
          ) : (
            <BiMoon
              className="nav__icon"
              onClick={switchTheme}
            />
          )}
        </div>
      </nav>
    </header>
  )
}
