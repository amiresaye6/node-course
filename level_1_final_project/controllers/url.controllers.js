const Url = require('../models/urls.model')

// rendr the home page
const homePageController = (req, res) => {
    res.status(200).render('home')
}


// create new url shortner
const urlPost = (req, res) => {
    const url = new Url(req.body)
    url.save()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
}
// update existing url shortner
const urlPut = (req, res) => {
    const url = req.body
    Url.updateOne({ _id: req.params.id }, url)
        .then(result => result ? res.status(200).json(result) : res.status(404).json({ message: "url not found" }))
        .catch(err => res.status(500).json(err))
}

// get shortend url
const urlGet = (req, res) => {
    const alias = req.params.alias
    Url.findOne({ alias })
        // .then(result => result ? res.status(200).json(result) : res.status(404).json({ message: "url not found" }))
        .then(result => result ? res.status(301).redirect(result.url) : res.status(404).json({ message: "url not found" }))
        .catch(err => res.status(500).json(err))
    // res.status(301).redirect('/');
}

const urlAllGet = (req, res) => {
    Url.find()
        .sort({ createdAt: 1 })
        .then(result => result ? res.status(200).json(result) : res.status(404).json({ message: "no urls found" }))
        .catch(err => res.status(500).json(err))
}

// delete shortend url
const urlDelete = (req, res) => {
    const _id = req.params.id
    Url.findByIdAndDelete(_id)
        .then(result => result ? res.status(200).json(result) : res.status(404).json({ message: "url not found" }))
        .catch(err => res.status(500).json(err))
}
// delete all urls
const urlDeleteAll = (req, res) => {
    Url.deleteMany({})
        .then(result => result ? res.status(200).json(result) : res.status(404).json({ message: "no urls found" }))
        .catch(err => res.status(500).json(err))
}

module.exports = {
    homePageController,
    urlPost,
    urlAllGet,
    urlGet,
    urlPut,
    urlDelete,
    urlDeleteAll
}
