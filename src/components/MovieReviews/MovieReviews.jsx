import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieReviews } from "../../themoviedbApi";
import css from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMoviesById() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(true);
        toast.error("Error loading id");
      }
    }
    fetchMoviesById();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {movieReviews && movieReviews.length > 0 ? (
        <ul className={css.list}>
          {movieReviews.map((user) => {
            return (
              <li className={css.item} key={user.id}>
                <p className={css.username}>{user.author_details.username}:</p>
                <p>{user.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={css.notFound}>
          Sorry, but there are no reviews for this movie.
        </p>
      )}
      {error && <ErrorMessage />}
    </div>
  );
}
