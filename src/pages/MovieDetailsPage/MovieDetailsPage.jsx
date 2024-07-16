import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { getMovieDetails } from "../../service/themoviedbApi";
import css from "./MovieDetailsPage.module.css";
import defaultPicture from "../../service/picture.jpg";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  //   console.log("movieId:", movieId);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");
  //   console.log(goBackRef);

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieDetails(movieId);
        // console.log("Data loaded:", data);
        setMovieDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesById();
  }, [movieId]);

  return (
    <div className={css.container}>
      {
        <div>
          <NavLink to={goBackRef.current} className={css.back}>
            Go back
          </NavLink>
        </div>
      }
      {movieDetails && (
        <div className={css.details}>
          <div>
            {movieDetails.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt={movieDetails.overview}
              />
            ) : (
              <img src={defaultPicture} alt="My Picture" />
            )}
          </div>
          <div>
            <h1>{movieDetails.title}</h1>
            <h2 className={css.title}>User Score:</h2>{" "}
            <p className={css.text}>{movieDetails.vote_average}</p>
            <h2 className={css.title}>Overview: </h2>
            <p className={css.text}>{movieDetails.overview}</p>
            <h2 className={css.title}> Genres: </h2>
            <ul className={css.genres}>
              {movieDetails.genres.map((genre) => (
                <li className={css.text} key={genre.id}>
                  {" "}
                  {genre.name}{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <nav className={css.navigation}>
        <h2 className={css.title}>Additional Information: </h2>
        <NavLink className={css.link} to="cast">
          Cast
        </NavLink>
        <NavLink className={css.link} to="reviews">
          Reviews
        </NavLink>
      </nav>
      <Suspense fallback={<b>Loading...</b>}>
        <Outlet />
      </Suspense>

      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}
