import express from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductRecommendations,
} from "../controllers/product.controller.js";
import verifyToken from "../middleware/verifyToken.js";
createProduct;
const Router = express.Router();

// Import routes
Router.post("/create-product", createProduct);
Router.get("/", getAllProducts);
Router.get("/:id", getProduct);
Router.patch("/update-product/:id", verifyToken, updateProduct);
Router.delete("/delete-product/:id", deleteProduct);
Router.get("/related-products/:id", getProductRecommendations);

export default Router;
