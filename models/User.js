const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: mongoose.Schema.Types.String,
    email:mongoose.Schema.Types.String,
    age:mongoose.Schema.Types.Number,
    job:mongoose.Schema.Types.String,
    activist:mongoose.Schema.Types.String,
    aspects:mongoose.Schema.Types.Mixed,
    contribution:mongoose.Schema.Types.Mixed,
    comment:{type:String},
    createdAt:{type:Date,default:Date.now()}
    
})

module.exports = mongoose.model('Users', UserSchema)