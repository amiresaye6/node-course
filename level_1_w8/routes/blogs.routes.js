const express = require('express');
const BlogsController = require("../controllers/blogs.controller")

const router = express.Router()

router.post("/", BlogsController.createBlog)

router.get("/create", BlogsController.renderBlogsCreator)

router.delete('/:id', BlogsController.deleteBlog)

router.get('/', BlogsController.getAllBlogs)


module.exports = router;
