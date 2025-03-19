import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./styles.scss";
import img1 from "../../assets/carousel/img1.jpg";
import img2 from "../../assets/carousel/img2.jpg";
import img3 from "../../assets/carousel/img3.jpg";
import img4 from "../../assets/carousel/img4.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const moviesa = [
  [
    { title: "The Summer I Turned Pretty", image: img1 },
    { title: "SWAT", image: img2 },
  ],
  [
    { title: "The Summer I Turned Pretty", image: img1 },
    { title: "SWAT", image: img2 },
  ],
  [
    { title: "The Summer I Turned Pretty", image: img1 },
    { title: "SWAT", image: img2 },
  ],
  [
    { title: "Cruel Intentions", image: img3 },
    { title: "21st Century Scream Queens", image: img4 },
  ],
];
 
const FeatureCarousel = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };


  const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const navigate = useNavigate();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://imdb236.p.rapidapi.com/imdb/india/top-rated-malayalam-movies",
        {
          headers: {
            "x-rapidapi-key":
              "fdf35d18b9mshb227647ea2222f3p140afdjsn732fba6802b6",
            "x-rapidapi-host": "imdb236.p.rapidapi.com",
          },
        }
      );
      setMovies(response.data.movies || response.data || []);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error:", error.response || error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

  return (
    <div className="featured-carousel">
      <h1 className="title-f">Featured Today</h1>
      <div className="carousel-f">
        <button className="carousel__btn left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div ref={carouselRef} className="carousel__wrapper">
            <div  className="carousel__item">
              {movies.map((movie, idx) => (
                <div key={idx} className="movie">
                  <a href={ ''}>
                  <img
                    src={movie.primaryImage}
                    alt={movie.primaryTitle}
                    className="movie__img"
                    onClick={() => navigate(`/movie/${movie.id}`)}

                  />
                  </a>
                  <p className="movie__title">{movie.primaryTitle}</p>
                   
                  
                   {movie.externalLinks?.length > 0 ? (
                    <a className="slider-play" href={movie.externalLinks[0]} target="_blank" rel="noopener noreferrer">
                     See More...
                    </a>
                  ) : (
                    <button className="slider-play">See More...</button>
                  )}
                </div>
              ))}
            </div>
        </div>

        <button className="carousel__btn right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default FeatureCarousel;
