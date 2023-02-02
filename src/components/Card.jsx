import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import { BsBookmarkCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import video from "../assets/videos/stranger-things-trailer.mp4";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUseLikesMovies } from "../store";

export default function Card({ movieData, isLiked = false}) {
    console.log(isLiked)
    const [isHovered, setIsHovered] = useState(false);
    const [bookmarked, setBookMarked] = useState(isLiked);
    
    const [email, setEmail] = useState(undefined);
    const userInfo = useSelector((state) => state.netflix.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // User email saving in email state
    useEffect(() => {
        setEmail(userInfo);
        setBookMarked(isLiked);
      }, [userInfo, isLiked]);
    
    // Adding user Watchlist in db
    const addToList = async () => {
        setBookMarked(true);
        try {
            await axios.post("https://netflix-clone-api-znfj.onrender.com/api/user/addWatchList", { email, data: movieData });
        } catch (error) {
            return error;
        }
    }

    return <Container onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt={movieData.name} />

        { isHovered && (
            <div className="hover">
                <div className="image-video-container">
                    <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt={movieData.name} onClick={ ()=> navigate("/player") } />
                    <video src={ video } autoPlay muted loop onClick={ ()=> navigate("/player") } />
                </div>
                <div className="info-container flex-column">
                    <h3 className="name" onClick={()=> navigate("/player")}>
                    {movieData.name}
                    </h3>
                    <div className="icon flex j-between">
                        <div className="controls flex">
                            <IoPlayCircleSharp title="play" onClick={()=> navigate("/player")}/>
                            <RiThumbUpFill title="Like" />
                            <RiThumbDownFill title="Dislike" />
                            {
                                bookmarked ? 
                                    <BsBookmarkCheck color="red" title="Remove to my list" onClick={ ()=> dispatch(removeUseLikesMovies({ email, movieId: movieData.id }), setBookMarked(false)) } /> :
                                    <AiOutlinePlus title="Add to my list" onClick={ ()=> addToList() } />
                            }
                        </div>
                        <div className="info">
                            <BiChevronDown title="More Info" />
                        </div>
                    </div>
                    <div className="genres flex">
                        <ul className="flex">
                            {
                                movieData.genres.map((genre) =>
                                    <li key={genre}>{genre}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )}
    </Container>
}

const Container = styled.div`
    max-width: 230px;
    width: 230px;
    height: 100%;
    cursor: pointer;
    position: relative;
    img {
        border-radius: 0.2rem;
        width: 100%;
        height: 100%;
        z-index: 10;
        display: block;
    }
    .hover {
        z-index: 90;
        height: 100%;
        width: 100%;
        position: absolute;
        bottom: 13vh;
        left: 0;
        border-radius: 0.3rem;
        box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
        transition: 0.3s ease-in-out;
        .image-video-container {
            position: relative;
            height: 140px; 
            img {
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                z-index: 4;
                position: absolute;
            }
            video {
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                z-index: 4;
                position: absolute;
            }
        }
        .info-container {
            padding: 1rem;
            gap: 1rem;
            background: black;
            .icon {
                .controls {
                    display: flex;
                    gap: 1rem;
                }
                svg {
                    font-size: 2rem;
                    cursor: pointer;
                    transition: 0.3s ease-in-out;
                    &:hover {
                        color: #b8b8b8
                    }
                }
            }
            .genres {
                ul {
                    gap: 1rem;
                    li {
                        padding-right: 0.7rem;
                        list-style: disc;
                        &:first-of-type {
                            list-style-type: none; 
                        }
                    }
                }
            }
        }
    }
    @media (max-width: 480px) {
        width: 7.4%;
    }`;