// defines a schema and model
require('dotenv').config();
var mongoose = require('mongoose');

uriCloud = process.env.MONGODB_URI;
uriLocal = "mongodb://localhost:27017/german-danish";

mongoose.connect(uriCloud || uriLocal, {useNewUrlParser:true, useUnifiedTopology:true}, (err) => {
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
