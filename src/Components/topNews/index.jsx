import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./styles.scss";
import axios from "axios";
import moment from "moment";

const TopNews = () => {
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
  // "fdf35d18b9mshb227647ea2222f3p140afdjsn732fba6802b6",

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://imdb231.p.rapidapi.com/api/imdb/news-by-category-query/v1",
          {
            params: { category: "TOP", languageCountry: "en_US" },
            headers: {
              "x-rapidapi-host": "imdb231.p.rapidapi.com",
              "x-rapidapi-key":
                "fdf35d18b9mshb227647ea2222f3p140afdjsn732fba6802b6",
            },
          }
        );

        setMovies(response.data.data.news.edges || []);
        console.log(response.data.data.news.edges);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
    movies.map((item) => {
      console.log(item.node.text.plainText);
    });
  }, []);

  console.log(movies);

  return (
    <div className="featured-carousel">
      <h1 className="title-f">News Today</h1>
      <div className="carousel-f">
        <button className="carousel__btn left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div ref={carouselRef} className="carousel__wrapper">
          <div className="carousel__item">
            <div className="top-news">
              <div className="top-news-header">
                <h2>
                  <span className="highlight">|</span> Top news
                </h2>
              </div>
              <div className="news-cards">
                {movies &&
                  movies?.map((news) => (
                    <a
                      href={news.node.externalUrl}
                      key={news.id}
                      target="_blank"
                    >
                      <div className="news-card">
                        <img
                          src={news.node.image.url}
                          width={250}
                          height={150}
                          alt={"nb"}
                        />
                        <div className="news-content">
                          <h3>
                            {news?.node.articleTitle?.plainText || "No Title"}
                          </h3>
                          <p className="news-meta">
                            {moment(news.node.date).format("MMMM D, YYYY")}{" "}
                            {news.node.byline}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
              </div>
              <div className="news-buttons">
                <button>Top news</button>
                <button>Movie news</button>
                <button>TV news</button>
                <button>Celebrity news</button>
              </div>
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

export default TopNews;
