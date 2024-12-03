module.exports.getHomePage = (req, res) => {
    const local = {
        title: "Home",
        description: "simple website for posting blogs, using node, express, mongodb, and ejs"
    }
    res.render('index', { local })
}
