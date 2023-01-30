import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUserLikedMovies, userInfo } from "../store";
import Card from "../components/Card";
import NotAvailable from "./NotAvailable";

export default function WatchList() {
    const [isScrolled, setIsScrolled] = useState(false);
    const email = useSelector((state) => state.netflix.user);
    const bookmarkedMovies = useSelector((state) => state.netflix.bookmarkedMovies);
    const dispatch = useDispatch();
  
    // Get user email
    useEffect(()=> {
        dispatch(userInfo());
    }, [dispatch])

    // Calling userLikedMovies function from redux store
    useEffect(()=> {
      if(email) dispatch(getUserLikedMovies(email));
    }, [dispatch, email]);
    
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return ()=> (window.onscroll = null);
    }

    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {!bookmarkedMovies?.length ? <NotAvailable alert={"Not bookmarked anything.."} /> :
                        bookmarkedMovies?.map((movie, index) => {
                            return <Card movieData={ movie } index={ index } key={ movie.id} isLiked={true} />
                        })
                    }
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

        h1 {
            margin-left:3rem;
        }

        .grid {
            gap: 1rem;
            display: grid;
            grid-template-columns: repeat(auto-fit,minmax(15rem, 1rem));

            .not-available {
                width: 28rem;
            }
            div {
                max-width: 100%;
                width: 100%;
            }
        }
    }`;