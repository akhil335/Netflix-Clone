import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, getGenres } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "./NotAvailable";
import SelectGenre from "./SelectGenre";

export default function Movies() {
    const [isScrolled, setIsScrolled] = useState(false);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    const genre = useSelector((state) => state.netflix.genres);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getGenres())
    }, [dispatch]);
  
    useEffect(()=> {
      if (genresLoaded) dispatch(fetchCategory({ category: 'movie', type: "popular"}));
    }, [dispatch, genresLoaded]);
    
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return ()=> (window.onscroll = null);
    }

    return (
        <Container>
         <Navbar isScrolled={isScrolled}></Navbar>
         <div className="data">
         <SelectGenre genres={genre} type="movie" />
            {
                movies.length ? <Slider movies={movies} /> : <NotAvailable />
            }
         </div>
        </Container>
    )
}

const Container = styled.div`
    .data {
        margin-top: 8rem;
        .not-availble {
            text-align: center;
            color: white;
            margin-top: 4rem;
        }
    }`;
