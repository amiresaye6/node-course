const mongoose = require("mongoose");

const schema = mongoose.Schema;

const blogsSchema = new schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const Blog = mongoose.model("Blog", blogsSchema);

module.exports = Blog;
