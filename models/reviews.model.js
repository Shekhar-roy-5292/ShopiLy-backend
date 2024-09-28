import { model, Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
  },
  {
    timestamps: true,
  }
);
const Review = model("Review", ReviewSchema);

export default Review;
