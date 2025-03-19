import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/footer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";

function App() {
  return (
    <div className="app-main">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
