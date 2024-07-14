import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

export default function Navigation() {
  const activeNavLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <header className={css.wrapper}>
        <nav className={css.nav}>
          <ul className={css.list}>
            <li>
              <NavLink to="/" className={activeNavLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={activeNavLink}>
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
