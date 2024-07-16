import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <>
      <ul className={css.list}>
        {movies.map((movie) => {
          return (
            <li key={movie.id} className={css.item}>
              <Link
                to={{
                  pathname: `/movies/${movie.id.toString()}`,
                  state: { from: location.pathname },
                }}
              >
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
