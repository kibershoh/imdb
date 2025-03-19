import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import {   FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "./movieCard";

const TopPick = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        setMovies(response.data || response.data || []);
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

  return (
   
    <div className="movie-carousel">
      <h1 className="title-f"><span>|</span> Top picks</h1>
      <div className="carousel-f">
        <button className="carousel__btn left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div ref={carouselRef} className="carousel__wrapper">
          <div className="carousel__item">
            <div className="movie-list">
              {movies.map((movie, index) => (
                <MovieCard key={index} {...movie} />
              ))}
            </div>
          </div>
        </div>

        <button className="carousel__btn right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TopPick;
