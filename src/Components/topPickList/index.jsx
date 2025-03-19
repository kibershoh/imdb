// fdf35d18b9mshb227647ea2222f3p140afdjsn732fba6802b6
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./styles.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const ActorInfo = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  const letters = ["a", "b", "w"]; // Qaysi harflar bo‘yicha qidiramiz

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const requests = letters.map((letter) =>
          axios.get("https://imdb146.p.rapidapi.com/v1/find/", {
            params: { query: letter, limit: "10" }, // Har bir harf uchun 20 ta natija
            headers: {
              "x-rapidapi-host": "imdb146.p.rapidapi.com",
              "x-rapidapi-key":
                "fdf35d18b9mshb227647ea2222f3p140afdjsn732fba6802b6", // API kalitni shu yerga qo‘ying
            },
          })
        );

        const responses = await Promise.all(requests); // Barcha so‘rovlarni parallel bajarish
        const allResults = responses.flatMap(
          (res) => res?.data.nameResults.results || []
        ); // Natijalarni bitta massivga yig‘ish
        setActors(allResults);
        console.log(allResults);

        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
    <div className="actors-carousel">
      <h1 className="title-f">
        <span>|</span> Most popular celebrities
      </h1>
      <div className="carousel-f">
        <button className="carousel__btn left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div ref={carouselRef} className="carousel__wrapper">
          <div className="carousel__item">
            {actors?.map((movie, idx) => (
              <div key={idx} className="movie">
                <a href={movie.avatarImageModel.url} target="_blank">
                  <img
                    src={movie.avatarImageModel.url}
                    alt={movie.avatarImageModel.caption}
                    className="movie__img"
                  />
                </a>

                <div>
                  <p className="movie__jop">{movie.knownForTitleText} </p>
                  <p className="movie__title">{movie.displayNameText}</p>
                </div>
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

export default ActorInfo;
