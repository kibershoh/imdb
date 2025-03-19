import React from "react";
import "./styles.scss";
import { FaPlay } from "react-icons/fa";
import img1 from '../../assets/carousel/img1.jpg'
import img2 from '../../assets/carousel/img2.jpg'
import img3 from '../../assets/carousel/img3.jpg'
import img4 from '../../assets/carousel/img4.jpg'
const VideoCard = ({ thumbnail, title, duration }) => {
  return (
    <div className="video-card">
      <div className="thumbnail">
        <img src={thumbnail} alt={title} />
        <div className="play-icon">
          <FaPlay />
        </div>
      </div>
      <p className="title">{title}</p>
      <span className="duration">{duration}</span>
    </div>
  );
};

const EditorialList = ({ title, items }) => {
  return (
    <div className="editorial-list">
      <h4>{title}</h4>
      {items.map((item, index) => (
        <div key={index} className="list-item">
          <img src={item.image} alt={item.title} />
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

const MoviesDetailsItem = () => {
  return (
    <div className="container">
      <h2 className="section-title">Videos</h2>
      <br />
      <div className="video-section">
        <VideoCard
          thumbnail={img1}
          title="The Boys Cast Answers Burning Questions"
          duration="4:29"
        />
        <VideoCard
          thumbnail={img2}
          title="Behind the Scenes of The Boys"
          duration="3:05"
        />
      </div>
      <div className="video-section2">
        <VideoCard
          thumbnail={img3}
          title="The Boys Cast Answers Burning Questions"
          duration="4:29"
        />
        <VideoCard
          thumbnail={img1}
          title="Behind the Scenes of The Boys"
          duration="3:05"
        />
        <VideoCard
          thumbnail={img4}
          title="Behind the Scenes of The Boys"
          duration="3:05"
        />
        <VideoCard
          thumbnail={img2}
          title="Behind the Scenes of The Boys"
          duration="3:05"
        />
      </div>
      
    </div>
  );
};

export default MoviesDetailsItem;