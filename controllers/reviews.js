const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  let newReview = new Review(req.body.review); // ✅ FIX
  newReview.author = req.user._id;

  await newReview.save();

  listing.reviews.push(newReview._id); // sirf id push
  await listing.save();

  req.flash("success", "New Review created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  // Listing se review remove
  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId }
  });

  // Review delete
  await Review.findByIdAndDelete(reviewId); // ✅ FIX

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
