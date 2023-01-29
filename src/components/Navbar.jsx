import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function Navbar({isScrolled}) {
    const links = [
        {name: 'home', link: '/'},
        {name: 'Tv Shows', link: '/tv'},
        {name: 'Movies', link: '/movies'},
        {name: 'My List', link: '/mylist'},
    ];
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const navigate = useNavigate();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
    });

  return <Container>
    <nav className={`flex ${isScrolled ? 'scrolled' : ""}`}>
        <div className="left flex a-center">
            <div className="brand flex a-center j-center">
                <img src={logo} alt="logo"/>
            </div>
            <ul className="links flex">
                {
                    links.map(({name, link}) => {
                        return (
                            <li key={name}><Link to={link}>{name}</Link></li>
                        )
                    })
                }
            </ul>
        </div>
        <div className="right flex a-center">
            <div className={`search ${showSearch ? 'show-search' : ''}`}>
                <button onFocus={(e) => setShowSearch(true)} onBlur={() => { if(!inputHover) setShowSearch(false) }}>
                    <FaSearch />
                </button>
                <input type="text" placeholder="Search" onMouseEnter={(e)=> {setInputHover(true); e.target.value = ''}} onMouseLeave={()=> setInputHover(false)} onBlur={(e) => {setShowSearch(false); setInputHover(false);}} />
            </div>
            <button onClick={()=> signOut(firebaseAuth)}>
                <FaPowerOff></FaPowerOff>
            </button>
        </div>
    </nav>
  </Container>
}

const Container = styled.div`
    .scrolled {
        background-color: black;
    }
    nav {
        position: fixed;
        top: 0;
        width: 100%;
        height: 6.5rem;
        justify-content: space-between;
        align-item: center;
        z-index: 2;
        padding: 0 4rem;
        transition: 0.3s ease-in-out;
        .left {
            gap: 2rem;
            .brand {
                img{
                    height: 2.5rem;
                }
            }
            .links {
                gap: 2rem;
            }
        }
        .right {
            gap: 1rem;
            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                &focus: {
                    outline: none;
                }
                svg {
                    color: #f34242;
                    font-size: 1.2rem;
                }
            }
            .search {
                display: flex;
                gap: 0.4rem;
                justify-content: end;
                align-item: center;
                padding: 0.2rem;
                padding-left: 0.5rem;
                button {
                    background-color: transparent;
                    svg {
                        color: white;
                    }
                }    
                input {
                    width: 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.5s ease-in-out all;
                    background-color: transparent;
                    border: none;
                    color: white;
                    outline: none;
                    &focus: {
                        outline: none;
                    }
                }
            }
            .show-search {
                border: 1px solid white;
                background-color: rgba(0,0,0,0.6);
                input {
                    width: 100%;
                    opacity: 1;
                    visibility: visible;
                    padding: 0.3rem;
            }
        }
    }`;


export default Navbar;