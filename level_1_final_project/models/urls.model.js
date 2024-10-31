const mongoose = require('mongoose');
const schema = mongoose.Schema;

const urlsSchema = new schema({
    url: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Url = mongoose.model('url', urlsSchema);
module.exports = Url;
