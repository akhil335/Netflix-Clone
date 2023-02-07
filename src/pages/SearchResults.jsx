import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../store";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import NotAvailable from "./NotAvailable";
import { PageTitle } from "../components/Helmet";

export default function SearchResults() {
    const [isScrolled, setIsScrolled] = useState(false);
    const bookmarkedMovies = useSelector((state) => state.netflix.bookmarkedMovies);
    const searchData = useSelector((state) => state.netflix.searchedData)
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getGenres())
      console.log(searchData, 'search')
    }, [dispatch, searchData]);
    
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return ()=> (window.onscroll = null);
    }

    return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <PageTitle title={"Netflix Clone | Search"} />
        <div className="content flex column">
            <div className="grid flex">
            { searchData.map((movie, index) => {
              return <Card movieData={movie} index={movie.id} key={index} isLiked={bookmarkedMovies?.some(({id}) => id === movie.id)} />
            })}
            </div>
        </div>
    </Container>
    )
}

const Container = styled.div`
    .content {
        margin: 2.3rem;
        margin-top: 8rem;
        gap: 3rem;

        .grid {
            gap: 1rem;
            display: grid;
            grid-template-columns: repeat(5, 1fr);

            div {
                max-width: 100%;
                width: 100%;
            }
        }
    }
    @media (max-width: 912px) {
        .content {
            margin: 0;
            padding: 2rem;
            margin-top: 6rem;
            gap: 1rem;
    
           & > h1 {
                margin-left: 0rem;
                font-size: 2.7rem;
                font-weight: 400;
            }
    
            .grid {
                grid-template-columns: repeat(3,1fr);
            }
        }
    }
    @media (max-width: 540px) {
        .content {
            margin: 0;
            padding: 1rem;
            margin-top: 6rem;
            gap: 1rem;
    
           & > h1 {
                margin-left: 0rem;
                font-size: 1.7rem;
                font-weight: 400;
            }
    
            .grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    }
    `;