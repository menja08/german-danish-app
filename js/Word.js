// defines a schema and model slide 512
var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost:27017/german-danish",{useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connect("mongodb://menja08:kakeeto88@ds259878.mlab.com:59878/heroku_fzg6t17", {useNewUrlParser:true, useUnifiedTopology:true});

var Schema = mongoose.Schema;

var wordSchema = new Schema({
    german:String,
    danish:String,
    english:String
}, {collation : {locale : "en", strength : 1}});

module.exports = mongoose.model("Word", wordSchema);
