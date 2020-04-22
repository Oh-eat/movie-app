const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.get("/:userFrom", (req, res) => {
  const { userFrom } = req.params;

  Favorite.find({ userFrom })
    .sort({ createdAt: -1 })
    .exec((err, favoriteMovies) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, favoriteMovies });
    });
});

router.get("/:userFrom/:movieId", (req, res) => {
  const { movieId, userFrom } = req.params;

  Favorite.findOne({ movieId, userFrom })
    .countDocuments()
    .exec((err, count) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, status: count > 0 ? true : false });
    });
});

router.post("/:userFrom/:movieId", (req, res) => {
  const { movieId, userFrom } = req.params;
  const { movieTitle, moviePosterPath } = req.body;

  const favorite = new Favorite({
    movieId,
    userFrom,
    movieTitle,
    moviePosterPath,
  });
  favorite.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.delete("/:userFrom/:movieId", (req, res) => {
  const { movieId, userFrom } = req.params;

  Favorite.findOneAndDelete({ movieId, userFrom }).exec((err) => {
    if (err) return res.status(400).json({ success: false });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
