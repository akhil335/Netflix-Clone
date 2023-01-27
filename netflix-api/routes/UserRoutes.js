const { addToLikedMovies, getLikedMovies } = require('../controllers/userController');

const router = require('express').Router();

router.post("/add", addToLikedMovies);
router.get("/likedmovies/:email", getLikedMovies);

module.exports = router;