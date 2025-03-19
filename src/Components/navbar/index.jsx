import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import {
  FaBars,
  FaSearch,
  FaUser,
  FaBookmark,
  FaGlobe,
  FaCaretDown,
  FaUserCircle,
} from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchbarOpen, setSearchbarOpen] = useState(false);
  const [categoryBarOpen, setCategoryBarOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
const navigate = useNavigate()
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSidebarOpen(false);
        setSearchbarOpen(false);
        setCategoryBarOpen(false);
        setIsProfileOpen(false);
        setIsLanguageOpen(false);
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <nav className="navbar" ref={containerRef}>
        <div className="navbar__left">
          <button
            className="navbar__menu-icon"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars /> <span>Menu</span>
          </button>
          <a className="navbar__logo" onClick={()=>navigate('/')}>IMDb

          <button
            className="navbar__category-icon"
            onClick={() => setCategoryBarOpen(true)}
          >
            <FaBars /> <span>Menu</span>
          </button>
          </a>
             
          <div className="navbar__dropdown">
            <button
              className="navbar__dropdown-category_btn"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              All <FaCaretDown />
            </button>
            {isCategoryOpen && (
              <ul className="navbar__dropdown-menu">
                <li>Movies</li>
                <li>TV Shows</li>
                <li>Documentaries</li>
                <li>Animation</li>
              </ul>
            )}
          </div>

          {/* Search bar */}
          <div className="navbar__search">
            <input
              type="text"
              placeholder="Search IMDb"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="navbar__search-icon" />
          </div>
        </div>

        {/* Right section */}
        <div className="navbar__right">
          <div className="navbar__imdb_pro">
            <a href="#" className="navbar__link navbar__pro">
              IMDb<span>Pro</span> |
            </a>
            <a href="#" className="navbar__link navbar__watchlist">
              <FaBookmark /> Watchlist 
            </a>
          </div>
          {/* Profile Dropdown */}
          <div className="navbar__dropdown">
            <button
              onClick={() => setSearchbarOpen(true)}
              className="navbar__dropdown-search"
            >
              <ImSearch size={20} />
            </button>
            <button
              className="navbar__dropdown-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <FaUserCircle size={22} />{" "}
              <span>
                Oybek <FaCaretDown />
              </span>
            </button>
            {isProfileOpen && (
              <ul className="navbar__dropdown-menu">
                <li>My Profile</li>
                <li>Settings</li>
                <li>Logout</li>
              </ul>
            )}
            <button className="navbar__dropdown-useapp">Use App</button>
           <div className="languages">
           <div className="navbar__dropdown">
          <button
            className="navbar__dropdown-btn"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <FaGlobe /> EN <FaCaretDown />
          </button>
          {isLanguageOpen && (
            <ul className="navbar__dropdown-menu">
              <li>English</li>
              <li>Français</li>
              <li>Español</li>
              <li>Deutsch</li>
            </ul>
          )}
        </div>
           </div>
          </div>

          {/* Language Dropdown */}
        </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <button
          className="sidebar__close"
          onClick={() => setSidebarOpen(false)}
        >
          ✖
        </button>
        <ul>
          <li>Home</li>
          <li>Movies</li>
          <li>TV Shows</li>
          <li>Watchlist</li>
        </ul>
        <div className="navbar__dropdown">
          <button
            className="navbar__dropdown-btn"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <FaGlobe /> EN <FaCaretDown />
          </button>
          {isLanguageOpen && (
            <ul className="navbar__dropdown-menu">
              <li>English</li>
              <li>Français</li>
              <li>Español</li>
              <li>Deutsch</li>
            </ul>
          )}
        </div>
      </div>
      {/* Searchbar */}
      <div className={`searchbar ${searchbarOpen ? "searchbar--open" : ""}`}>
        <div className="close_input">
         
          <div className="searchbar_input">
            <input
              type="text"
              placeholder="Search IMDb"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="searchbar__close"
            onClick={() => setSearchbarOpen(false)}
          >
            ✖
          </button>
        </div>
      </div>
      {/* Category bar */}
      <div className={`categoryBar ${categoryBarOpen ? "categoryBar--open" : ""}`}>
         
          <div className="categoryBar_input">
         <div className="categories">
         <button
            className="categoryBar__close"
            onClick={() => setCategoryBarOpen(false)}
          >
            ✖
          </button>
         <ul>
              <li>English</li>
              <li>Français</li>
              <li>Español</li>
              <li>Deutsch</li>
            </ul>
         </div>
        
        </div>
      </div>
      </nav>
      
    </>
  );
};

export default Navbar;


 
