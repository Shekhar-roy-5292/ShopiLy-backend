import Product from "../models/products.model.js";
import Review from "../models/reviews.model.js";

export const addReview = async (req, res) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    // Validate required fields
    if (!userId || !productId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the rating is valid
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    // Check if the user has already reviewed this product
    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
      await existingReview.save();
    } else {
      const review = new Review({ userId, productId, rating, comment });
      await review.save();
    }

    // Calculate average rating for the product
    const reviews = await Review.find({ productId });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avgRating = totalRating / reviews.length;

      // Find the product and update its rating
      const product = await Product.findById(productId);
      if (product) {
        product.rating = avgRating;
        await product.save({ validateBeforeSave: true });
        return res.status(201).json({
          message: "Review added and product rating updated.",
          product,
        });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "No reviews found for this product" });
    }
  } catch (err) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

export const getReviewsCount = async (req, res) => {
  try {
    // const productId = req.params.id;
    // const reviewsCount = await Review.countDocuments({ productId });
    const reviewsCount = await Review.countDocuments({});
    return res.status(200).json({ reviewsCount });
  } catch (err) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to get reviews count", error: err.message });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await Review.find({ productId }).populate("userId", "name");
    if (reviews.length > 0) {
      return res.status(200).json({ reviews });
    } else {
      return res
        .status(404)
        .json({ message: "No reviews found for this product" });
    }
  } catch (err) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to get reviews", error: err.message });
  }
};

export const getReviewsByUserId = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    // const reviews = await Review.find({ userId }).populate("productId", "name");
    const reviews = await Review.find({ userId }).sort({ createAt: -1 });
    if (reviews.length > 0) {
      return res.status(200).json({ reviews });
    } else {
      return res
        .status(404)
        .json({ message: "No reviews found for this user" });
    }
  } catch (err) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to get reviews", error: err.message });
  }
};
