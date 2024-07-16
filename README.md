Створіть компонент MovieReviewsContainer:
Створіть новий компонент, який містить ваш код для відображення відгуків фільму в прокручуваному контейнері.
jsx
Копировать код
// MovieReviewsContainer.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { getMovieReviews } from '../../service/themoviedbApi';
import css from './MovieReviews.module.css';

const MovieReviewsContainer = () => {
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

<div className={css.container}>
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

export default MovieReviewsContainer;
Імпортуйте MovieReviewsContainer у ваш основний компонент:
Тепер імпортуйте MovieReviewsContainer у ваш основний компонент, де ви вже використовуєте прокрутний контейнер.
jsx
Копировать код
// Ваш основний компонент, наприклад, App.jsx або інший де ви вже використовуєте прокручувальний контейнер
import React from 'react';
import ScrollableContainer from './ScrollableContainer'; // Імпорт вашого прокручувального контейнера
import MovieReviewsContainer from './MovieReviewsContainer'; // Імпорт нового компонента для відгуків про фільм

const App = () => {
return (

<div>
<h1>Movie Reviews</h1>
<ScrollableContainer> {/_ Ваш прокручувальний контейнер _/}
<MovieReviewsContainer /> {/_ Компонент для відгуків про фільм _/}
</ScrollableContainer>
</div>
);
}

export default App;
Таким чином, ви можете використовувати компонент MovieReviewsContainer, щоб отримувати та відображати відгуки про фільм всередині вашого прокручувального контейнера, який ви створили раніше. Зміст вашого основного компонента залишається чистим і організованим, з розділенням відповідальностей між компонентами.

Додайте компонент ScrollableContainer в ваш App.jsx:
jsx
Копировать код
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.module.css';
import Navigation from '../../components/Navigation/Navigation';
import ScrollableContainer from '../../components/ScrollableContainer/ScrollableContainer'; // Імпортуйте ваш прокручувальний контейнер

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() =>
import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx')
);
const MovieCast = lazy(() =>
import('../../components/MovieCast/MovieCast.jsx')
);
const MovieReviews = lazy(() =>
import('../../components/MovieReviews/MovieReviews.jsx')
);
const NotFoundPage = lazy(() =>
import('../../pages/NotFoundPage/NotFoundPage.jsx')
);

const App = () => {
return (
<div>
<Navigation /> {/_ Компонент навігації _/}
<Suspense fallback={<div>Loading page code...</div>}>
<Routes>
<Route path="/" element={<HomePage />} /> {/_ Домашня сторінка _/}
<Route path="/movies" element={<MoviesPage />} /> {/_ Сторінка фільмів _/}
<Route path="/movies/:movieId" element={<MovieDetailsPage />}> {/_ Сторінка деталей фільму _/}
<Route path="cast" element={<ScrollableContainer><MovieCast /></ScrollableContainer>} /> {/_ Вкладений маршрут для акторів _/}
<Route path="reviews" element={<ScrollableContainer><MovieReviews /></ScrollableContainer>} /> {/_ Вкладений маршрут для відгуків _/}
</Route>
<Route path="_" element={<NotFoundPage />} /> {/_ Сторінка помилки 404 \*/}
</Routes>
</Suspense>
</div>
);
}

export default App;
