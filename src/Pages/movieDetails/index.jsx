import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.scss";
import FeatureCarousel from "../../Components/featureCarousel";
import TopPick from "../../Components/topPicks";
import MoviesDetailsItem from "../../Components/MovieDetailsItems";

const API_URLS = [
    "https://imdb236.p.rapidapi.com/imdb/top-box-office",
    "https://imdb236.p.rapidapi.com/imdb/india/top-rated-malayalam-movies"
];

const API_HEADERS = {
    headers: {
      "x-rapidapi-key": "fdf35d18b9mshb227647ea2222f3p140afdjsn732fba6802b6",
      "x-rapidapi-host": "imdb236.p.rapidapi.com",
    },
};

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          API_URLS.map((url) => axios.get(url, API_HEADERS))
        );

        const allMovies = responses.flatMap((res) => res.data || []);
        setMovies(allMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const selectedMovie = movies.find((movie) => movie.id === id);
      setMovie(selectedMovie || null);
    }
  }, [movies, id]);
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-details">
     <div className="rating">
     <h1>{movie?.originalTitle}</h1>
      <div className="extra-info">
        <div className="stats">
          <p>IMDb RATING
            <span>{movie?.averageRating || "N/A"} ⭐</span>
          </p>
          <p>Likes <span>{formatNumber(movie?.numVotes) || 0}</span></p>
          <p>Reviews <span>
          {formatNumber(movie?.grossWorldwide) || 0}</span></p>
        </div>
      </div>
     </div>
      <div className="movie-header">
        <img 
          className="poster" 
          src={movie?.primaryImage || "/placeholder.jpg"} 
          alt={movie?.title || "Movie"} 
        />
        <div className="trailer-container">
          <iframe
            
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
      </div>
      <div className="info">
          <p className="meta">{movie.releaseDate}</p>
          <p className="genres">
            {movie?.genres?.length > 0
              ? movie.genres.map((genre) => <span key={genre} className="genre">{genre}</span>)
              : "No genres available"}
          </p>
          <p className="description">{movie?.description || "No description available."}</p>
        </div>
      
      <TopPick/>
      <MoviesDetailsItem/>
    </div>
  );
}

export default MovieDetails;