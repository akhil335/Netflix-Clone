import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { RxHamburgerMenu } from "react-icons/rx"
import {AiOutlineCloseSquare} from "react-icons/ai"
import { useDispatch } from "react-redux";
import { fetchSearchData } from "../store";

function Navbar({isScrolled}) {
    const links = [
        {name: 'home', link: '/'},
        {name: 'Tv Shows', link: '/tv'},
        {name: 'Movies', link: '/movies'},
        {name: 'My List', link: '/mylist'},
    ];
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuTransitionClass, setMenuTransitionClass] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Checking if user is autherize if not naviagting to login page
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
    });

    // Dispatching search input to redux store and getting results
    const searchMovies = async(searchInput) => {
      dispatch(fetchSearchData(searchInput))
      setSearchInput('');
      navigate("/search");
    }

  return <Container>
    <nav className={`flex ${isScrolled ? 'scrolled' : ""}`}>
        <div className="left flex a-center">
            <div className="brand flex a-center j-center">
                <img src={logo} alt="logo" loading="lazy" />
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
            <div className={`menu-overlay ${menuTransitionClass}`}>
                { menuOpen && <div className="close-menu">
                    <button onClick={()=> {setMenuOpen(false); setMenuTransitionClass("menu-overlay_close"); setTimeout(() => {
                      setMenuTransitionClass(""); 
                    }, 300);}}>
                        <AiOutlineCloseSquare />
                    </button>
                </div>}
                <form onSubmit={e => {e.preventDefault(); searchMovies(searchInput); setMenuOpen(false);  setMenuTransitionClass("menu-overlay_close"); setTimeout(() => {
                      setMenuTransitionClass("")
                    }, 300)}}>
                    <div className={`search ${showSearch ? 'show-search' : ''}`}>
                    <button type="button" onFocus={() => setShowSearch(true)} onBlur={() => { if(!inputHover) setShowSearch(false)}}>
                        <FaSearch onClick={(e)=> {searchMovies(searchInput); setMenuOpen(false); setMenuTransitionClass("menu-overlay_close"); setTimeout(() => {
                      setMenuTransitionClass(""); 
                    }, 300)}}/>
                    </button>
                    <input type="text" placeholder="Search" onFocus={()=> {setInputHover(true)}} onBlur={() =>
                    {
                      setShowSearch(false); 
                      setInputHover(false); 
                    }} onMouseDown={()=>setInputHover(true)}
                    value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                </form>
                <button className="sign-out" onClick={()=> signOut(firebaseAuth)}>
                   { menuOpen && "Log Out" }<FaPowerOff></FaPowerOff>
                </button>
              { menuOpen && <div className="mobile-menus">
                   <ul className="links flex">
                {
                    links.map(({name, link}) => {
                        return (
                            <li key={name}><Link to={link}>{name}</Link></li>
                        )
                    })
                }
                </ul>
              </div>}
            </div>
           { !menuOpen && <button className="hamburgar" onClick={()=> {setMenuOpen(true); setMenuTransitionClass("menu-overlay_open")}}>
                <RxHamburgerMenu />
            </button>}
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
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 2.5rem;
        }
      }
      .links {
        gap: 2rem;
      }
    }
    .right {
      .menu-overlay {
        display: flex;
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
            transition: 0.5s width ease-in-out;
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
          background-color: rgba(0, 0, 0, 0.6);
          input {
            width: 100%;
            opacity: 1;
            visibility: visible;
            padding: 0.3rem;
          }
        }
            // svg {
            //     display: block;
            //     width: 45px;
            //     height: 45px;
            //     background: black;
            //     color: red;
            // }
      }
      .hamburgar {
        display: none;
        svg {
          color: white;
          font-size: 2.5rem;
        }
      }
    }
  }

  @media (max-width: 540px) {
    nav {
      height: 4.5rem;
      padding: 0px 1rem;
      .left {
        .brand {
          img {
            height: 2rem;
          }
        }
        .links {
          display: none;
          //   background: black;
          //   width: 90%;
          //   position: absolute;
          //   top: 0;
          //   right: 0;
          //   height: 100vh;
          //   text-align: end;
          //   padding: 1rem;
        }
      }
      .right {
        .menu-overlay {
          position: absolute;
          visibility: hidden;
          width: 0;
          height: 100vh;
          background: #000000eb;
          top: 0;
          right: 0;
          z-index: 100;

          .close-menu {
            display: flex;
            align-items: end;
            justify-content: end;
            button {
              display: block;
              padding: 0.5rem 0.5rem 0 0;
              svg {
                display: block;
                width: 50px;
                height: 50px;
              }
            }
          }
          .search,
          .sign-out {
            display: none;
          }
          .search {
            border: 1px solid white;
            background-color: rgba(0, 0, 0, 0.6);
            input {
              width: 100%;
              opacity: 1;
              visibility: visible;
              padding: 0.3rem;
            }
          }
        }
        .menu-overlay_close {
          animation: menu_close 0.3s ease-in-out forwards;
          @keyframes menu_close {
            from {
              width: 80%;
              opacity: 1;
              visibility: visible;
            }
            to {
              width: 0%;
              opacity: 0;
              visibility: hidden;
            }
          }
        }
        .menu-overlay_open {
          display: block;
          animation: menu_open 0.3s ease-in-out forwards;
          @keyframes menu_open {
            from {
              width: 0%;
              opacity: 0;
              display: block;
              visibility: hidden;
            }
            to {
              opacity: 1;
              width: 80%;
              visibility: visible;
            }
          }
          .search,
          .sign-out {
            display: block;
          }
          .search {
            display: flex;
            height: 3rem;
            margin: 1rem;
          }
          .sign-out {
            position: absolute;
            top: 0.8rem;
            left: 1rem;
            color: white;
            display: flex;
            align-items: center;
            font-weight: 600;
            font-size: 1.3rem;

             svg {
              font-size: 1.7rem;         
              margin-left: 1rem;
            }
          }
          .mobile-menus {
            padding: 1rem;
            .links {
              display: block;
              text-align: start;
              li {
                padding: 1rem;
                font-size: 1.2rem;    
              }
            }
          }
        }
        .hamburgar {
          display: block;
          border: none;
          background: transparent;
        }
      }
    }
  }
  @media (max-width: 912px) {
    nav {
      padding: 2rem;
    }
  }
`;


export default Navbar;
