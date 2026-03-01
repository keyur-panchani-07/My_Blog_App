const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
const authRouter = require('./routes/auth.routes');
const blogRouter = require('./routes/blog.routes');
const categoryRouter = require('./routes/category.routes');

// Routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/categories", categoryRouter);

// Standard error handler
app.use(errorHandler);

module.exports = app;
