const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    groupName: {type:String, required:true},
    title: {type:String, required:true},
    description: String,
    imgUrl: String,
    url: String,
    requester: {type:String, required:true},
    purchased: Boolean,
    price: Number,
})

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item