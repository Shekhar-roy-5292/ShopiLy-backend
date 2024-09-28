import cors from "cors";
import cookieParser from "cookie-parser";

//Import dotenv 
import dotenv from "dotenv";
dotenv.config();

// connect to MongoDB database
import connectToMongoDB from "./config/dbConnection.js";
connectToMongoDB();

// Define the Express app
import express from "express";
import bodyParser from "body-parser";
import userRoute from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    // methods: "GET, POST, PUT, DELETE",
    // allowedHeaders: ["Content-Type", "Authorization"],
    // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// Routes
app.use("/api/auth", userRoute);
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});