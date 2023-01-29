const User = require("../models/UserModel");

 const addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });

         if(user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => (id == data.id));

            if(!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data]
                    },
                    { new: true }
                )
            }else return res.json({ msg: "Movie already added to the liked list." });
        }else await User.create({ email, likedMovies: [data] });
        return res.json({ msg: "Movie added succesfully." })
    } catch (error) {
        return res.json({ msg: "Error adding movie"});
    }
}

const getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if(user) {
            return res.json({ msg: "Success", bookmarkedMovies: user.likedMovies });
        }else res.json({ msg: "User with given email not found." });
    } catch (error) {
        return res.json({ msg: "Error fetching bookmarked movie"});
    }
}

const removeLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        console.log(email, movieId)
        const user = await User.findOne({ email });

         if(user) {
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => (id == movieId));
            console.log(movieIndex)
            if(movieIndex < 0) res.status(400).send({ msg: "Movie not found"});
            likedMovies.splice(movieIndex, 1);

                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies
                    },
                    { new: true }
                )
        return res.json({ msg: "Liked movie deleted from list.", bookmarkedMovies: likedMovies });
        }
    } catch (error) {
        return res.json({ msg: "Error deleting bookmarked movie"});
    }
}

module.exports = { addToLikedMovies, getLikedMovies, removeLikedMovies }