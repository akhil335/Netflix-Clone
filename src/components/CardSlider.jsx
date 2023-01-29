import React, { useRef, useState } from "react";
import Card from "./Card";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";

export default function CardSlider({ type, data }) {
    // console.log(data, 'data')
    const [showControls, setShowControls] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(0);
    const listRef = useRef();

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

    return (
        <Container className="flex column" onMouseEnter={()=> setShowControls(true)} onMouseLeave={()=> setShowControls(false)}>
            <h1>{type}</h1>

            <div className="wrapper">
                <div className={`slider-action left ${ !showControls ? "none" : ""} flex j-center a-center`}>
                    <AiOutlineLeft onClick={()=> handleDirection("left")} />
                </div>
                <div className="flex slider" ref={listRef}>
                {
                data.map((movie, index) => {
                    return <Card movieData={movie} index={index} key={movie.id}></Card>
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
    gap: 1rem;
    position: relative;
    padding: 2rem 0;
    h1 {
        margin-left: 50px;
    }
    .wrapper {
        .slider {
            width: max-content;
            gap: 1rem;
            transform: translateX(0px);
            transition: 0.3s ease-in-out;
            margin-left: 50px;
        }
        .slider-action {
            position: absolute;
            height: 100%;
            top: 0;
            bottom: 0;
            width: 50px;
            transition: 0.3s ease-in-out;
            z-index: 10;
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
    }`;