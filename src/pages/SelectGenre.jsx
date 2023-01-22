import styled from "styled-components"
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store";

export default function SelectGenre({genres, type}) {
    const dispatch = useDispatch();

    return <Select className="flex" onChange={(e)=> dispatch(fetchDataByGenre({ genre: e.target.value, type}))}>
        {
            genres.map((genre, type) => {
                return <option value={genre.id} key={genre.id} >{genre.name}</option>
            })
        }
    </Select>
}

const Select = styled.select`
    margin-left: 50px;
    cursor: pointer;
    font-size: 1.3rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    color: white;
    text-align-last: center;`;