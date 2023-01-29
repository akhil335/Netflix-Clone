const { addToLikedMovies, getLikedMovies, removeLikedMovies } = require('../controllers/userController');

const router = require('express').Router();

router.post("/addWatchList", addToLikedMovies);
router.put("/deleteWatchListMovie/", removeLikedMovies);
router.get("/likedmovies/:email", getLikedMovies);

module.exports = router;