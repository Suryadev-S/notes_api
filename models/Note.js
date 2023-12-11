const {Schema, model} = require("mongoose");

const noteSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    notePic: {
        type: String,
        required: false
    },
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date
    },
    private: {
        type: Boolean,
        default: true
    }
})

module.exports = model("Note", noteSchema); 