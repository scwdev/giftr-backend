const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    groupName: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    members: [String]
})

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group