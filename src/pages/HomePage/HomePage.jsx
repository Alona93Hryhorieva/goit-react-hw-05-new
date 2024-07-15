import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../service/themoviedbApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";
export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
        console.log(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMovies();
  }, []);
  return (
    <div>
      <h1 className={css.title}>Trending Today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}
//  {movies.length === 0 && searchParams.get("query") ? (
//           <p className={s.errorSearch}>No movies found. Please try again.</p>
//         ) :( {movies.length > 0 && <MovieList movies={movies} />})
