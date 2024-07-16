import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getMovieCredits } from "../../service/themoviedbApi";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieCredits() {
      try {
        setError(false);
        setLoading(true);
        // console.log("Fetching movie credits for movieId:", movieId);
        const data = await getMovieCredits(movieId);
        setMovieCast(data.cast);
        // console.log("Fetched movie credits:", data.cast);
      } catch (error) {
        setError(true);
        // console.error("Error fetching movie credits:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieCredits();
  }, [movieId]);

  return (
    <div className={css.container}>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movieCast &&
        movieCast.length > 0 && ( //  не null і  більше 0
          <ul className={css.list}>
            {movieCast.map((actor) => (
              <li key={actor.id}>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className={css.actorImage}
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"
                    alt="My Picture"
                    className={css.actorImage}
                  />
                )}
                <h3>{actor.name}</h3>
                <p>{actor.character}</p>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
