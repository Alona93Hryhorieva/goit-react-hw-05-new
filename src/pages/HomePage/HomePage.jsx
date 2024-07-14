export default function HomePage() {
    return (

    )
}


import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/apiMovies';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

// export default function HomePage() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     async function fetchMovies() {
//       try {
//         setError(false);
//         setIsLoading(true);
//         const data = await getTrendingMovies();
//         setMovies(data);
//       } catch (error) {
//         setError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchMovies();
//   }, []);

//   return (
//     <div className={css.container}>
//       {movies.length > 0 && <MovieList movies={movies} />}
//       {isLoading && <Loader />}
//       {error && <ErrorMessage />}
//     </div>
//   );
// }