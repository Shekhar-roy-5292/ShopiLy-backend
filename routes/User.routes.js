import express from "express";
const userRoute = express.Router();

userRoute.get('/get', function(req, res) {
    res.send('GET request to /users');
});


export default userRoute;