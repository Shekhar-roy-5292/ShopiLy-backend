import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  image: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number }, // Included quantity as required
  rating: { type: Number, default: 0 }, // Default value is 0, so not required explicitly
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
