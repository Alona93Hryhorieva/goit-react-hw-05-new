import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchMovie } from "../../service/themoviedbApi";
import css from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const newQuery = searchParams.get("query") ?? "";

  useEffect(() => {
    async function fetchMovies() {
      try {
        if (!newQuery) return;
        console.log(newQuery);

        setError(false);
        setLoading(true);
        const data = await getSearchMovie(newQuery, page);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [searchParams, page]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputQuery = event.target.elements.query.value.trim();
    // console.log(inputQuery);

    if (!inputQuery) return alert("Error, enter movies");

    setMovies([]);
    setPage(1);
    searchParams.set("query", inputQuery);
    setSearchParams(searchParams);
    event.target.reset();
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Enter movie..."
        />
        <button className={css.formBtn} type="submit">
          Search
        </button>
      </form>
      {loading && <Loader />}
      <MovieList movies={movies} />
      {movies.length === 0 && !loading && newQuery && !error && (
        <ErrorMessage />
      )}
      {error && <ErrorMessage />}
    </div>
  );
}
// {
//   movies.length === 0 && searchParams.get("query") ? (
//     <p className={s.errorSearch}>No movies found. Please try again.</p>
//   ) : (
//     movies.length > 0 && <MovieList movies={movies} />
//   );
// }
