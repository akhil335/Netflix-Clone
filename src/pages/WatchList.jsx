import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUserLikedMovies, userInfo } from "../store";
import Card from "../components/Card";
import NotAvailable from "./NotAvailable";
import { PageTitle } from "../components/Helmet";

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
            <PageTitle title={"Netflix Clone | MyList"} />
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

        .grid {
            gap: 1rem;
            display: grid;
            grid-template-columns: repeat(6, 1fr);

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