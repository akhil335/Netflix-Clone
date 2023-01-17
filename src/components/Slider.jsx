import React from "react";
import CardSlider from "../components/CardSlider";

export default function Slider({movies}) {

    const getMoviesFromRange = (from, to) => {
        // console.log(movies)
        return movies.slice(from, to);
    }
    return <div>
        <CardSlider type="Trending Now" data={getMoviesFromRange(0, 9)} />
        <CardSlider type="New Releases" data={getMoviesFromRange(10, 19)} />
        <CardSlider type="Blockbuster Movies" data={getMoviesFromRange(20, 29)} />
        <CardSlider type="Popular On Netflix" data={getMoviesFromRange(30, 39)} />
        <CardSlider type="Action Movies" data={getMoviesFromRange(40, 49)} />
        <CardSlider type="Epics" data={getMoviesFromRange(50, 59)} />
    </div>
}
