import express from "express";
import { addReview, getReviewsByProduct,getReviewsCount, getReviewsByUserId } from "../controllers/review.controller.js";
const ReviewRouter = express.Router();

// Import routes
ReviewRouter.post("/addReview", addReview);
ReviewRouter.get("/reviews-count", getReviewsCount);
ReviewRouter.get("/getAllReviewOfAProduct", getReviewsByProduct);
ReviewRouter.get("/getAllUserReview", getReviewsByUserId);

export default ReviewRouter;
