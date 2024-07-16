import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getMovieCredits } from "../../service/themoviedbApi";
// import defaultPicture from "../../img/picture.jpg";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieCredits(movieId);
        console.log(data);
        setMovieCast(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesById();
  }, [movieId]);

  return (
    <div className={css.container}>
      {loading && <Loader />}
      {error && <ErrorMessage />}

      {movieCast.length > 0 && (
        <ul className={css.list}>
          {movieCast.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
                    : defaultPicture
                }
                alt={actor.name}
              />
              <h3>{actor.name}</h3>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
