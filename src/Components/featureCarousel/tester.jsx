// fdf35d18b9mshb227647ea2222f3p140afdjsn732fba6802b6
import React, { useEffect, useState } from "react";
import axios from "axios";

const ActorInfo = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const letters = ["a", "b", "w"]; // Qaysi harflar bo‘yicha qidiramiz

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const requests = letters.map(letter =>
          axios.get("https://imdb146.p.rapidapi.com/v1/find/", {
            params: { query: letter, limit: "10" }, // Har bir harf uchun 20 ta natija
            headers: {
              "x-rapidapi-host": "imdb146.p.rapidapi.com",
              "x-rapidapi-key": "fdf35d18b9mshb227647ea2222f3p140afdjsn732fba6802b6", // API kalitni shu yerga qo‘ying
            },
          })
        );

        const responses = await Promise.all(requests); // Barcha so‘rovlarni parallel bajarish
        const allResults = responses.flatMap(res => res?.data.nameResults.results || []); // Natijalarni bitta massivga yig‘ish
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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Actors List (A, B, W)</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {actors?.map((actor, index) => (
          <div key={index} style={{ width: "200px", textAlign: "center" }}>
            {actor.avatarImageModel?.url ? (
              <img
                src={actor.avatarImageModel.url}
                alt={actor.avatarImageModel.displayNameText || "Actor Image"}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
                }}
              />
            ) : (
              <p>No image</p>
            )}
            <h3 style={{ fontSize: "16px", marginTop: "10px", color: "#333" }}>
              {actor.displayNameText || "Unknown"}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorInfo;
