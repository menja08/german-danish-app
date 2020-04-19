// defines a schema and model slide 512
require('dotenv').config();
var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/german-danish",{useNewUrlParser:true, useUnifiedTopology:true});

//mongodb+srv://menja08:<password>@cluster0-busdh.mongodb.net/test?retryWrites=true&w=majority

//mongoose.connect(process.env."mongodb+srv://menja08:kakeeto88@cluster0-busdh.mongodb.net/german-danish?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true});

uriCloud = process.env.MONGODB_URI;

//uriCloud = "mongodb+srv://menja08:kakeeto88@cluster0-busdh.mongodb.net/german-danish";

// cluster0-shard-00-01-busdh.mongodb.net:27017
//uriCloud2 = "mongodb+srv://menja08:kakeeto88@cluster0-busdh.mongodb.net/test?retryWrites=true&w=majority";
//uriLocal = "mongodb://localhost:27017/german-danish";

mongoose.connect(uriCloud, {useNewUrlParser:true, useUnifiedTopology:true}, (err) => {
    if (err) {
	console.log("Encountered an error: " + err);
    } else {
	console.log("Successfully connected!");
    }
});

var Schema = mongoose.Schema;

var wordSchema = new Schema({
    german:String,
    danish:String,
    english:String
}, {collation : {locale : "en", strength : 1}});

module.exports = mongoose.model("Word", wordSchema);
