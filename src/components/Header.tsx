import { Link } from "react-router-dom"
import { BiMoon, BiSun, BiUser, BiSearch } from "react-icons/bi"
import useUI from "../hooks/useUI"
import useDarkTheme from "../hooks/useDarkTheme"
import "../styles/Header.css"

export default function Header() {
  const { toggle, switchToggle, theme, switchTheme } = useUI()
  useDarkTheme(theme)

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          Task<br />
          <span>Manager</span>
        </Link>

        <div className="nav__actions">
          <div className="nav__filter">
            <BiSearch className="nav__icon-search" onClick={switchToggle} />
            <input type="text" placeholder="Search..." className={`nav__input-search ${toggle && "nav__input-search-active"}`} />
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
