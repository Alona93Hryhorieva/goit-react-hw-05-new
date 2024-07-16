import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getMovieReviews } from "../../service/themoviedbApi";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMovieReviews(movieId);
        // console.log(data);
        setMovieReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movieReviews && movieReviews.length > 0 ? (
        <ul className={css.list}>
          {movieReviews.map((review) => (
            <li key={review.id} className={css.item}>
              <h3 className={css.name}>{review.author}</h3>
              <p className={css.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.notFound}>Sorry, we can not find any reviews.</p>
      )}
    </div>
  );
}
