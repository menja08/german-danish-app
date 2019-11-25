var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var Word = require("./js/Word.js");

app.use("/create", (req, res) => {
    //get Schema and Model and save to database, slides 512,538
    console.log(req.body);
    var newWord = new Word(req.body);
    newWord.save((err, word) => {// word is a json object
	//console.log("saved1")
	if (err) {
	    console.log(err);
	    res.json({});
	} else {
	    res.json(word);
	    //console.log("saved2")
	}
    });
    //return next();
});

app.use("/showLastCreated", (req, res) => {
    //get info from database
    Word.find((err, word) => {
	if(err) {
	    res.type().status(500);
	    res.send("Error " + err);
	} else {
	    //console.log(word[word.length-1]);
	    last = word[word.length-1];
	    //res.json(word);
	    res.json(last);
	}
	});
    //res.redirect("/files/lastCreated.html");
});

app.use("/showAllWords", (req, res) => {
    //get info from database
    //res.redirect("/files/showAll.html")
    Word.find((err, word) => {
	if(err) {
	    res.type().status(500);
	    res.send("Err " + err);
	} else {
	    res.json(word);
	}
    });
});

app.use(express.static(__dirname));
app.use("/public", express.static("files"));
//app.use('/favicon.ico', express.static('files/images/favicon.ico'));

// javascript redirect
app.use("/js", express.static('js'));


//home redirect
app.use("/", (req, res) => {
    res.redirect("/files/enterWords.html");
});

//app.use();


app.listen(3000, () => {
    console.log("Listening on port 3000");
});
