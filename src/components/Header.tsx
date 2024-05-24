import { Link } from "react-router-dom"
import { useState } from "react"
import { BiMoon, BiSun, BiUser, BiSearch } from "react-icons/bi"
import useDarkTheme from "../hooks/useDarkTheme"
import "../styles/Header.css"

export default function Header() {
  const [toggleSearch, setToggleSearch] = useState<boolean>(false)
  const [darkTheme, setDarkTheme] = useState<boolean>(false)
  useDarkTheme(darkTheme)

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          Task<br />
          <span>Manager</span>
        </Link>

        <div className="nav__actions">
          <div className="nav__filter">
            <BiSearch className="nav__icon-search" onClick={() => setToggleSearch(!toggleSearch)} />
            <input type="text" placeholder="Search..." className={`nav__input-search ${toggleSearch && "nav__input-search-active"}`} />
          </div>
          {darkTheme ? (
            <BiSun
              className="nav__icon"
              onClick={() => {
                setDarkTheme(!darkTheme);
              }}
            />
          ) : (
            <BiMoon
              className="nav__icon"
              onClick={() => {
                setDarkTheme(!darkTheme);
              }}
            />
          )}
          <BiUser className="nav__icon" />
        </div>
      </nav>
    </header>
  )
}
