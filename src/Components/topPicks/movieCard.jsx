import { BsBookmarkPlusFill } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({ originalTitle, averageRating, primaryImage,id }) => {
  const navigate = useNavigate()
  return (
    <div className="movie-card">
      {/* Saqlash tugmasi */}
      <div className="save-btn">
        <BsBookmarkPlusFill size={25} />
      </div>

      <img
        onClick={() => navigate(`/movie/${id}`)}
        src={primaryImage}
        alt={originalTitle}
        className="movie-image"
      />

      <div className="movie-info">
        <div className="rating">
          <button>
            <IoStarSharp size={18} /> {averageRating}
          </button>
          <button>
            <MdOutlineStarBorderPurple500 size={18} />
          </button>
        </div>
        <p className="title">{originalTitle}</p>
        <button className="watchlist-btn">+ Watchlist</button>
      </div>

      {/* Pastki info tugmasi */}
      <div className="info-btn">
        <button className="trailer-btn">▶ Trailer</button>
        <FaInfoCircle />
      </div>
    </div>
  );
};
