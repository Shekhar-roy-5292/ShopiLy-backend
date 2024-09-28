import mongoose from "mongoose";
import Product from "../models/products.model.js";
import Review from "../models/reviews.model.js";

// Create product endpoint
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      oldPrice,
      image,
      color,
      quantity,
      author,
    } = req.body;

    // Check for all required fields
    if (
      !name ||
      !category ||
      !description ||
      !price ||
      !oldPrice ||
      !image ||
      !color ||
      !author
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const product = new Product({ ...req.body });
    const savedProduct = await product.save();

    const reviews = await Review.find({ productId: savedProduct._id });

    if (reviews.length > 0) {
      // Calculate the average rating if there are reviews
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const avgRating = totalRating / reviews.length;

      // Update the product's rating
      savedProduct.rating = avgRating;
      await savedProduct.save();
    }

    // Respond with the saved product
    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get all product by query string
export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;
    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    if (color && color !== "all") {
      filter.color = color;
    }
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });
    res.status(200).json({ products, totalPages, totalProducts });
  } catch (error) {
    console.error("Error getting products:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get Single Product
export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate(
      "author",
      "email username"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const reviews = await Review.find({ productId }).populate(
      "userId",
      "username email"
    );
    res.status(200).json({ product, reviews });
  } catch (error) {
    console.error("Error getting product:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(
      productId,
      { ...req.body },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Delete reviews related to the product
    await Review.deleteMany({ productId });
    // Delete related comments
    // await Comment.deleteMany({ productId });

    // Delete related orders
    // await Order.deleteMany({ productId });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Get product recommendations
export const getProductRecommendations = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );
    const relatedProducts = await Product.find({
      _id: { $ne: productId },
      $or: [{ name: { $regex: titleRegex } }, { category: product.category }],
    });
    res.status(200).send(relatedProducts);
  } catch (error) {
    console.error("Error getting product recommendations:", error);
    return res.status(500).json({ message: error.message });
  }
};
