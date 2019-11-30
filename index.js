var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var Word = require("./js/Word.js");

// create (CRUD)
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
	    //res.json(word);
	    //console.log("saved2")
	    res.redirect("/files/home.html");
	}
    });
    //return next();
});

// read (CRUD) 1 of 2
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

// read (CRUD) 2 of 2
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

// update (CRUD)

// delete (CRUD)
app.use("/deleteWord", (req, res) => {
    var query = req.body.german;
    console.log("query in 1: " + query)

    // check if word is in database anyway
    Word.find({german: query}, (err, word) => {
	if (err) {
	    console.log(err);
	    res.type().status(500);
	} else {
	    //var germanWord = res.json(word);
	    //console.log(germanWord);
	    
	    Word.deleteOne({german: query}, (err) => {
		if (err) {
		    res.type().status(500);
		    res.send("Error " + err);
		} else {
		    // search the word (again)
		    Word.findOne({german:query}, (err, word) => {
			console.log("query in 2:" + query);
			if (err) {
			    console.log(err);
			    res.type().status(500);
			    res.send("Err " + err);
			} else {
			    res.json(word);
			}
		    });
		}
	    });
	}
    });
    /*
    Word.deleteOne({german: query}, (err) => {
	if (err) {
	    res.type().status(500);
	    res.send("Error " + err);
	} else {
	    // search the word (again)
	    Word.findOne({german:query}, (err, word) => {
		console.log("query in 2:" + query);
		if (err) {
		    console.log(err);
		    res.type().status(500);
		    res.send("Err " + err);
		} else {
		    res.json(word);
		}
	    });
	}
    });
    */
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
