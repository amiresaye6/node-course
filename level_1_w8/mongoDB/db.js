const { MongoClient } = require('mongodb')

let dbConnection;

const connectToDb = (cb) => {
    MongoClient.connect('mongodb://localhost:27017/bookStore')
        .then(client => {
            dbConnection = client.db()
            return cb();
        })
        .catch(err => {
            console.log("error: ", err);

            return cb(err)
        })
}

const getDb = () => dbConnection;


module.exports = {
    connectToDb,
    getDb
}
