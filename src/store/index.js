import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TMBD_BASE_URL, API_KEY } from "../utils/constants"
import { firebaseAuth } from "../utils/firebase-config";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
    user: null,
    bookmarkedMovies: []
}

export const getGenres = createAsyncThunk("netflix/genres", async ()=> {
    const { data: {genres} } = await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
})

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
});
};
const getRawData = async (api, genres, paging) => {
    const moviesArray = [];
    for(let i=1; moviesArray.length < 60 && i < 10; i++) {
        const { data: { results }} = await axios.get(
            `${api}${paging ? `&page=${i}`: ""}`
        )
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

export const fetchMovies = createAsyncThunk("netflix/trending", async ({type}, thunkApi) => {
    const { netflix: { genres }} = thunkApi.getState();
    const data =  getRawData(`${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
    return data;
});

export const fetchCategory = createAsyncThunk("netflix/movies", async ({category, type}, thunkApi) => {
    const { netflix: { genres }} = thunkApi.getState();
    const data =  getRawData(`${TMBD_BASE_URL}/${category}/${type}?api_key=${API_KEY}`, genres, true);
    return data;
});

export const fetchDataByGenre = createAsyncThunk("netflix/moviesByGenre", async ({genre, type}, thunkApi) => {
    const { netflix: { genres }} = thunkApi.getState();
    const data =  getRawData(`${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, genres, true);
    return data;
});

// Fetch user details from from firebase
export const userInfo = createAsyncThunk("netflix/userInfo", async () => {
    return await new Promise(resolve => {
        firebaseAuth.onAuthStateChanged(currentUser => {
            if (currentUser) {
                resolve(currentUser.email);
            }
        });
    });
    // return firebaseAuth.currentUser.email;
});

// Fetch watchList from db
export const getUserLikedMovies = createAsyncThunk("netflix/LikedMovies", async (email) => {
    const { data: { bookmarkedMovies }} = await axios.get(`https://netflix-clone-api-znfj.onrender.com/api/user/likedmovies/${email}`);
    return bookmarkedMovies;
}); 

// deleting watchList movie from db
export const removeUseLikesMovies = createAsyncThunk("netflix/removeLikedMovies", async ({ email, movieId }) => {
    const { data: { bookmarkedMovies }} = await axios.put(`https://netflix-clone-api-znfj.onrender.com/api/user/deleteWatchListMovie`, {
        email,
        movieId
    });
    return bookmarkedMovies;
}); 


const NeflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(userInfo.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
            state.bookmarkedMovies = action.payload;
        })
        builder.addCase(removeUseLikesMovies.fulfilled, (state, action) => {
            state.bookmarkedMovies = action.payload;
        })
    }
})

export const store = configureStore({
    reducer: {
        netflix: NeflixSlice.reducer,
    }
})