const Blog = require('../models/blogs.model');

const createBlog = (req, res) => {
    console.log("body", req.body);

    const blog = new Blog(req.body)
    blog.save()
        .then(result => res.send(result))
        .catch(err => console.log('error: ', err));
}

const renderBlogsCreator = (req, res) => {
    res.render('create')
}

const deleteBlog = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(result => res.send(result))
}

const getAllBlogs = (req, res) => {
    Blog.find().then(data => {

        res.render("blogs", { adelShakalQuotes: data, title: "A wise Man Once Said" })
    })
}

module.exports = {
    createBlog,
    renderBlogsCreator,
    deleteBlog,
    getAllBlogs
}
