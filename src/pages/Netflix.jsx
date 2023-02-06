import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import movieLogo from "../assets/stranger-thing-title.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres, userInfo, getUserLikedMovies } from "../store";
import Slider from "../components/Slider";
import { PageTitle } from "../components/Helmet";

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const email = useSelector((state) => state.netflix.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userInfo());
    dispatch(getGenres());
    console.log()
  }, [dispatch]);

  useEffect(()=> {
    if (genresLoaded) dispatch(fetchMovies({ type: "all"}));
  }, [dispatch, genresLoaded]);

    // Get user email
    useEffect(()=> {
      dispatch(userInfo());
  }, [dispatch])

  // Calling userLikedMovies function from redux store
  useEffect(() => {
    if (email) dispatch(getUserLikedMovies(email));
  }, [dispatch, email]);
  
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return ()=> (window.onscroll = null);
  }

  return (
   <Container>
    <PageTitle title={"Netflix Clone | Home"} />
    <Navbar isScrolled={isScrolled}></Navbar>
    <div className="hero">
      <img src={backgroundImage} alt="background" className="background-image" loading="lazy" />
      <div className="container">
        <div className="logo">
          <img src={movieLogo} alt="Movie Logo" loading="lazy" />
        </div>
        <div className="buttons flex">
          <button className="flex j-center a-center">
            <FaPlay onClick={()=> navigate("/player")}/> play 
          </button>
          <button className="flex j-center a-center">
            <AiOutlineInfoCircle /> more info 
          </button>
        </div>
      </div>
    </div>
    <Slider movies={movies} />
   </Container>
  );
}
const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
      object-fit: cover;
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          transition: 0.3s ease-in-out opacity;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
  @media (max-width: 480px) {
    .hero .container {
      width: 100%;
      .logo {
        img {
          width: 90%;
          height: 100%;
          margin-left: 0rem;
          padding-left: 1rem;
        }
      }
      .buttons {
        margin: 1rem;
        button {
          gap: 0rem;
          padding: 3% 5%;
          svg {
            margin-right: 1rem;
          }
        }
      }
    }
  }`;

export default Netflix;
