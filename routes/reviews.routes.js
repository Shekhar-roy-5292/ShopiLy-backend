import express from "express";
import {
  addReview,
  getReviewsByProduct,
  getReviewsCount,
  getReviewsByUserId,
  deleteReview
} from "../controllers/review.controller.js";
const ReviewRouter = express.Router();

// Import routes
ReviewRouter.post("/create_Review", addReview);
ReviewRouter.get("/reviews_Count", getReviewsCount);
ReviewRouter.get("/get_All_Review_Of_An_Product/:id", getReviewsByProduct);
ReviewRouter.get("/get_All_Review_Of_A_User/:id", getReviewsByUserId);
ReviewRouter.get("/delete_Review/:id", deleteReview);

export default ReviewRouter;
