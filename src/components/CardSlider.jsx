import React, { useRef, useState } from "react";
import Card from "./Card";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";
import NotAvailable from "../pages/NotAvailable";
import { useSelector } from "react-redux";

export default function CardSlider({ type, data }) {
    const [showControls, setShowControls] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const bookmarkedMovies = useSelector((state) => state.netflix.bookmarkedMovies);
    const listRef = useRef();

    // Slider change in window's
    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70;
        if(direction === "left" && sliderPosition > 0) {
              listRef.current.style.transform = `translateX(${230 + distance + 40}px)`;
              setSliderPosition(sliderPosition - 1)
            }
            if(direction === "right" && sliderPosition < 3) {
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
            setSliderPosition(prevState => prevState + 1)
        }
    };

 // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50 

  const onTouchStart = (e) => {
      setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
      setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if(isLeftSwipe) {
      listRef.current.style.transform = `translateX(${touchStart - distance}px)`;
    }
    if(isRightSwipe) {
      listRef.current.style.transform = `translateX(${touchStart + distance}}px)`;
    }
    // add your conditional logic here
  }

    return (
        <Container className="flex column" onMouseEnter={()=> setShowControls(true)} onMouseLeave={()=> setShowControls(true)}>
            <h1>{type}</h1>

            <div className="wrapper">
                <div className={`slider-action left ${ !showControls ? "none" : ""} flex j-center a-center`}>
                    <AiOutlineLeft onClick={()=> handleDirection("left")} />
                </div>
                <div className="flex slider" ref={listRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} >
                {!data.length ? <NotAvailable alert={"Data not available"} />  :
                data.map((movie, index) => {
                    return <Card movieData={movie} index={index} key={movie.id} isLiked={bookmarkedMovies?.some(({id}) => id === movie.id)} />
                })
                }
                </div>
                <div className={`slider-action right ${ !showControls ? "none" : ""} flex j-center a-center`}>
                    <AiOutlineRight onClick={()=> handleDirection("right")} />
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
user-select: none;
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    position: relative;
    width: 100%;
    overflow-x: clip;
    .slider-action {
      position: absolute;
      display: flex;
      justify-content: flex-end;
      height: fit-content;
      top: 30%;
      width: 50px;
      transition: 0.3s transform ease-in-out;
      z-index: 1;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
    .slider {
      width: calc(100% / 0.17);
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s transform ease-in-out;
      margin-left: 50px;
    }
  }

  @media (max-width: 540px) {
    h1 {
      font-size: 1.2rem;
      margin-left: 20px;
    }
    .wrapper {
      .slider {
        margin-left: 20px;
      }
    }
  }

  @media (max-width: 912px) {
    h1 {
      font-size: 1.2rem;
      margin-left: 20px;
    }
    .wrapper {
      .slider {
        margin-left: 20px;
      }
    }
  }
`;