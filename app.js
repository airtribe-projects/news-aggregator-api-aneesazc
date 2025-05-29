require('dotenv').config();
const express = require('express');
const usersRoutes = require('./routes/usersRoute');
const newsRoute = require('./routes/newsRoute');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.use("/news", newsRoute);

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;