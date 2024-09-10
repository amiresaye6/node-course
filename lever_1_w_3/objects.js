let user = {
    name: "amir alsayed",
    age: 22,
    email: "amiralsayed.work@gmail.com",
    blogs: ['blog one any text', 'blog two any text'],
    blogsObj: [
        {
            title: "blog one",
            likes: 50
        },
        {
            title: "blog two",
            likes: 65
        }
    ],
    login: function() {
        // in this function 'this' keyword is refaring to the user object 
        console.log('the user logged in');
    },
    logout: () => {
        // in this function 'this' keyword is refaring to  the global window object
        // not the user because it is an arrow function
        console.log('the user logged out');
    },
    logBlogs: function(){
        // 'this' her refares to the user object not the window object.
        this.blogs.forEach(blog => console.log(blog));
    },
    // short hadn version of a regular function not an arrow one
    logRegularBlogs() {
        this.blogs.forEach((blog, index) => console.log(`bloge: ${index + 1}: ${blog}`));
    },
    logBlogsObj() {
        this.blogsObj.forEach(blog => console.log(blog.title, blog.likes));
    }
}

user.logBlogs();
user.logRegularBlogs();
user.logBlogsObj();
