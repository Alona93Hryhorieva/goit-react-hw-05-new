import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../MovieCast/MovieCast";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import defaultPicture from "../../img/picture.jpg";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieCredits(movieId);
        setMovieCast(data.cast);
      } catch (error) {
        setError(true);
        toast.error("Error loading id");
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesById();
  }, [movieId]);

  //   if (!cast) return <h3>Loading...</h3>;
  return (
    <div className={css.contaner}>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movieCast.length > 0 && (
        <ul className={css.list}>
          {movieCast.map((actor) => {
            return (
              <li key={actor.id} className={css.item}>
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w92${actorprofile_path}`}
                  alt={actor.name}
                  title={actor.name}
                />
                <p className={css.character}>{actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
