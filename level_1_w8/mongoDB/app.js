const express = require('express')
const { connectToDb, getDb } = require("./db")
const { ObjectId } = require('mongodb')


// init app and middleware
const app = express()
app.use(express.json())

// db connection
let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log("server listening on port 3000");
        })
        db = getDb()
    }
})

// routes
app.get("/books", (req, res) => {
    let books = [];

    db.collection('books')
        .find()
        .sort({ author: 1 })
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(err => res.status(500).json({ message: 'could not fetch' }))
})

app.get('/books/:id', (req, res) => {
    const _id = req.params.id;
    try {
        if (ObjectId.isValid(_id)) {
            console.log(_id);
            db.collection('books')
                .findOne({ _id: new ObjectId(_id) })
                .then(book => {
                    book ? res.status(200).json(book) : res.status(404).json({ message: 'boject not found in the db' })
                })
                .catch(err => console.log(err))
        } else {
            res.status(500).json({ message: "invalid id" })
        }

    } catch {
        res.status(404).json({ message: "object not found" })
    }
})


app.post('/books', (req, res) => {
    const body = req.body;
    db.collection('books')
        .insertOne(body)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ message: err }))
})


app.delete('/books/:id', (req, res) => {
    const _id = req.params.id;
    if (ObjectId.isValid(_id)) {
        db.collection('books')
            .deleteOne({ _id: new ObjectId(_id) })
            .then(result => result ? res.status(200).json(result) : res.status(404).json({message: "book not found"}))
            .catch(err => res.status(500).json({ message: err }))
    } else {
        res.status(500).json({message: 'id is not valid'})
    }
})



app.put('/books/:id', (req, res) => {
    const book = req.body;
    const _id = req.params.id;
    if (ObjectId.isValid(_id)) {
        db.collection('books')
            .updateOne({ _id: new ObjectId(_id) }, {$set: book})
            .then(result => result ? res.status(200).json(result) : res.status(404).json({message: "failed to update the book"}))
            .catch(err => res.status(500).json({ message: "err:" + err }))
    } else {
        res.status(500).json({message: 'id is not valid'})
    }
})
