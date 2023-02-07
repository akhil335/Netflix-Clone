import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import WatchList from "./pages/WatchList";
import SearchResults from "./pages/SearchResults";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/tv" element={<TvShows />} />
        <Route exact path="/myList" element={<WatchList />} />
        <Route exact path="search" element={<SearchResults />} />
        <Route exact path="/" element={<Netflix />} />
      </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
