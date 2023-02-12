import React, { useRef } from "react";
import Card from "./Card";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";
import NotAvailable from "../pages/NotAvailable";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function CardSlider({ type, data }) {
    const bookmarkedMovies = useSelector((state) => state.netflix.bookmarkedMovies);
    const listRef = useRef();
    const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)); 

    return (
        <Container ref={listRef} className="flex column">
        <h1>{type}</h1>
        <div className="wrapper">
        <Swiper
          // slidesPerView= {6}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          modules={[Navigation]}
          navigation = {{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints = {{
            280: {
              slidesPerView: 2,
               // width: perCardsDimension[0],
              // spaceBetween: 30
            },
            600: {
              slidesPerView: 3,
            },
            820: {
              slidesPerView: 4,
            },
            1180: {
              slidesPerView: 5,
            },
            1420: {
              slidesPerView: 6,
            }
          }}
        >
        {!data.length ? <NotAvailable alert={"Data not available"} />  :
          data.map((movie, index) => {
              return (
              <SwiperSlide key={movie.id}>
                <Card movieData={movie} index={index} key={movie.id} isLiked={bookmarkedMovies?.some(({id}) => id === movie.id)} />
              </SwiperSlide>
          )}
        )}
        {!isTouch && <div className="swiper-button-prev"><AiOutlineLeft /></div>}
        {!isTouch && <div className="swiper-button-next"><AiOutlineRight /></div>}
        </Swiper>
        </div>
      </Container>
    )
}

const Container = styled.div`
user-select: none;
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  width: 100%;
  h1 {
    margin-left: 10px;
  }
  .wrapper {
    position: relative;
    overflow-x: clip;
    margin-left: 1rem;

    .swiper {
      width: 100%;
      height: 100%;
      overflow: visible;

      .swiper-button-prev {
        left: 0px;
        color: red;
      }
      .swiper-button-next {
        color: red;
      }
    }
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
      width: max-content;
      min-width: 100%;
      min-height: 100px;
      height: fit-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s transform ease-in-out;
      margin-left: 50px;
    }
  }

  @media (max-width: 540px) {
    h1 {
      font-size: 1.2rem;
      margin-left: 0px;
    }
    .wrapper {
        margin-left: 0px;
        .swiper-wrapper {
          margin-left: 0.5rem;
          .swiper-slide {
            .card {
              width: 90%;
            }
          }
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