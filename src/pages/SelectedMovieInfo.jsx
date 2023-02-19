import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar"
import { Rating } from "@mui/material";
import Stack from '@mui/material/Stack';
import YouTube from "react-youtube";
import { getRecommendedMovies, getSelectedCardInfo } from "../store";
import Card from "../components/Card";


export default function SearchResults() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const { state: {movieData: movie}  } = location;
    const recommendMovie = useSelector(state => state.netflix.recommendedMoviesData)
    const bookmarkedMovies = useSelector(state => state.netflix.bookmarkedMovies)
    const cardVideoUrl = useSelector(state => state.netflix.selectedCardVideoData)

    useEffect(()=> {
        dispatch((getRecommendedMovies({type: 'movie', id: movie.id})))
        dispatch((getSelectedCardInfo({type: 'movie', id: movie.id})))
    }, [dispatch, movie])

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    return (
    <Container>
        <Navbar isScrolled={isScrolled}></Navbar>
        <MovieInfo>
            <div className="movie-details-container">
                <div className="movie-img">
                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.image}`} alt={movie.name} loading="lazy" /> 
                </div>
                <div className="movie-info">
                        <h2>{movie.name}</h2>
                        <p>{movie.overview}</p>
                        <div className="genre">
                        {
                            movie?.genres.map((genre) => {
                                return <span key={genre}>{genre}</span>
                            })
                        }
                    </div>
                    <div className="ratings flex">
                        Ratings:
                        <Stack spacing={1} className="d-flex">
                            <Rating name="half-rating-read" defaultValue={4.7} precision={0.5} readOnly /><span>4.7</span>
                        </Stack>
                    </div>
                    <div className="release-info">
                        <span>Release Date</span>: 2022
                    </div>
                </div>
            </div>
        </MovieInfo>
        <div className="trailer-section">
            <h2>Watch Latest Trailer</h2>
            <div className="youtube-player">
                <YouTube videoId={cardVideoUrl[0]?.key} className="video" />
            </div>
        </div>
        <div className="recommendation-section">
            <h2>Recommendation For You</h2>
            <div className="recommend-card flex">
            {
                recommendMovie?.map((movie, index) => {
                   return <Card movieData={movie} index={index} key={movie.id} isLiked={bookmarkedMovies?.some(({id}) => id === movie.id)} />
                })
            }
            </div>
        </div>
    </Container>
    )
}

const Container = styled.div`
.trailer-section {
    margin: 2rem;

    .youtube-player {
        margin-top: 2rem;

        .video {

            iframe {
                display: block;
                margin: auto;
            }
        }
    }
}
.recommendation-section {
    margin: 2rem;
    h2 {
        margin-bottom: 1rem;
    }
    .recommend-card {
        flex-wrap: wrap;
        gap: 1rem;

        .card {   
            width: calc(100% / 5 - 16px);
            min-width: 200px;
        }
    }
}

    @media (max-width: 540px) {
        .trailer-section {
            margin: 1rem;

            .youtube-player {
                margin-top: 0rem;
                .video {

                    iframe {
                        width: 100%;
                    }
                }
            }
        }
        .recommendation-section {
            margin: 1rem;
        
            .recommend-card {
                flex-wrap: wrap;
                gap: 1rem;
        
                .card {   
                    width: calc(100% / 2 - 16px);
                    min-width: 163px;
                }
            }
        }
    }
`
const MovieInfo = styled.div`
    .movie-details-container {
        display: grid;
        grid-template-columns: 5fr 5fr;
        margin-top: 7rem;
        gap: 1rem;
        padding: 1rem;

        .movie-img {
            img {
                border-radius: 10px;
                width: 400px;
                margin: auto;
                display: block;
            }
        }
        .movie-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            h2{
                font-size: 3rem;
            }
        
            .genre {
                display: flex;
                gap: 1rem;

                span {
                    color: red;
                }
            }
            .ratings {
                gap: 0.5rem;
                align-items: center;

                div {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.5rem;

                    span {
                        margin: 0;
                    }
                }
            }
        }
    }
    
    @media (max-width: 540px) {
        .movie-details-container {
            grid-template-columns: 1fr;
            margin-top: 4rem;

            .movie-img {
                img {
                    width: 250px;
                    margin: unset;
                }
            }
            .movie-info {
                h2 {
                    font-size: 1.5rem;
                }
                p {
                    font-size: 1rem;
                }
            }
        }
    }
    `