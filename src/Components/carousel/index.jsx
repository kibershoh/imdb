// "fdf35d18b9mshb227647ea2222f3p140afdjsn732fba6802b6",
import { useState, useEffect } from "react";
import {
  FaPlay,
  FaHeart,
  FaArrowLeft,
  FaArrowRight,
  FaThumbsUp,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import "./styles.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import like_icon from "../../assets/carousel/like_icon2.png";
function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const goToDetails = (id) => {
    navigate(`/movie/${id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://imdb236.p.rapidapi.com/imdb/top-box-office ",
          {
            headers: {
              "x-rapidapi-key":
                "fdf35d18b9mshb227647ea2222f3p140afdjsn732fba6802b6",
              "x-rapidapi-host": "imdb236.p.rapidapi.com",
            },
          }
        );
        setMovies(response.data.movies || response.data || []);
      } catch (error) {
        console.error("Error:", error.response || error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [movies]);
  const handleNavigate = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movies || movies.length === 0) return <p>No movies found.</p>;

  return (
    <div className="slider">
      <div className="slider-content">
        {/* <a href={movies[currentIndex]?.url} target="_blank"> */}
        <img
          className="slider-background"
          src={movies[currentIndex]?.primaryImage}
          alt="Background"
          onClick={() => navigate(`/movie/${movies[currentIndex]?.id}`)}
        />
        {/* </a> */}
        <div className="slider-overlay"></div>

        <button className="slider-btn slider-btn-left" onClick={prevSlide}>
          <FaAngleLeft size={25} />
        </button>

        <div className="slider-info">
          <a href={movies[currentIndex?.url]} target="_blank">
            <img
              className="slider-poster"
              src={movies[currentIndex]?.primaryImage}
              onClick={() => handleNavigate(movies[currentIndex]?.url)}
              alt="Poster"
            />
          </a>
          <div className="slider-text">
            {movies[currentIndex]?.externalLinks?.length > 0 ? (
              <a
                className="slider-play"
                href={movies[currentIndex].externalLinks[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPlay className="up-next-play-icon" />
              </a>
            ) : (
              <button className="slider-play">
                <FaPlay className="up-next-play-icon disabled" />
              </button>
            )}
            <h2>{movies[currentIndex]?.primaryTitle}</h2>
            <p>{movies[currentIndex]?.originalTitle}</p>
            <div className="slider-stats">
              <span>
                <img src={like_icon} width={25} height={25} alt="" />
                {movies[currentIndex]?.averageRating}
              </span>
              <span>😎 {movies[currentIndex]?.numVotes}</span>
            </div>
          </div>
        </div>

        <button className="slider-btn slider-btn-right" onClick={nextSlide}>
          <FaAngleRight size={25} />
        </button>
      </div>

      <div className="up-next">
        <h2 className="up-next-title">Up next</h2>
        {movies?.slice(currentIndex + 1, currentIndex + 4).map((movie) => (
          <div key={movie.id} className="up-next-item">
            <img
              onClick={() => navigate(`/movie/${movie.id}`)}
              src={movie.primaryImage}
              className="up-next-thumbnail"
            />
            <div className="up-next-content">
              <div className="up-next-duration">
                {movie?.externalLinks?.length > 0 ? (
                  <a
                    href={movie.externalLinks[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaPlay className="up-next-play-icon" />
                  </a>
                ) : (
                  <FaPlay className="up-next-play-icon disabled" />
                )}
                <span>{movie.primaryTitle}</span>
              </div>
              <p className="up-next-subtitle">{movie.description}</p>
              <div className="up-next-likes">
                ❤️ {movie.averageRating} 😎 {movie.numVotes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
