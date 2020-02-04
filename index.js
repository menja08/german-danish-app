var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var Word = require("./js/Word.js");

// create (CRUD)
app.use("/create", (req, res) => {
    //get Schema and Model and save to database, slides 512,538
    console.log(req.body.german);
    
    if (req.body.german === undefined) {
	res.redirect("/files/errorPage.html");
    } else {
	var newWord = new Word(req.body);

	// if the request body is empty {}
	var wordsToBeSaved = Object.values(req.body);
	//console.log("wordsToBeSaved is the Array = " + wordsToBeSaved);

	// before saving, check inputs
	if ((wordsToBeSaved.includes("")) || (wordsToBeSaved.includes(null)) || (wordsToBeSaved.includes(undefined))) {
	res.redirect("/files/errorPage.html");
	} else if ((/[^äöüßa-z]/i).test(req.body.german)) {// german regex
	    res.redirect("/files/errorPage.html");
	} else if ((/[^æøåa-z]/i).test(req.body.danish)) {// danish regex
	    res.redirect("/files/errorPage.html");
	} else if ((/[^a-z]/i).test(req.body.english)) {// english regex
	    res.redirect("/files/errorPage.html");
	} else {
	    // read from database to avoid duplicates
	    Word.find({german : req.body.german}, (err) => {
		if (err) {
		    // err if the word is not in database
		    // then save
		    newWord.save((err, word) => {
			if (err) {
			    console.log(err);
			    res.json({});
			} else {
			    // saved successfully
			    res.redirect("/files/home.html");
			}
		    });
		} else {
		    res.redirect("/files/errorPage.html");
		}
	    });
	}
    }
    
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
app.use("/update", (req, res) => {
    var oldGermanWord = req.body.oldGermanWord;
    var newGermanWord = req.body.newGermanWord;
    Word.findOne({german:oldGermanWord}, (err, word) => {
	if (err) {
	    res.type('html').status(500);
	    res.send("Error: " + err);
	} else if (!word) {
	    res.type('html').status(200);
	    res.send("No person named " + oldGermanWord);
	} else {
	    //res.json(word);
	    Word.updateOne({german:oldGermanWord}, {german:newGermanWord}, (err, word) => {
		if (err) {
		    res.type('html').status(500);
		    res.send('No person named' + err);
		} else {
		    res.json(word);
		}
	    });
	}
    });
});

// delete (CRUD) 1 of 2
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
			    //res.json(word);
			    res.redirect("/files/home.html");
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

app.use("/search", (req, res) => {
    // takes a query
    console.log("the request is = " + req.body.german);
    Word.find({german: req.body.german}, (err, words) => {
	if (err) {
	    res.type().status(500);
	    res.send("Error " + err);
	} else {
	    console.log("words array = " + words);
	    
	    var mywords = words[0];
	    console.log("mywords object = " + mywords);
	    if (mywords === undefined) {
		res.redirect("/files/errorPage.html");
	    } else {
		res.render('search', {
		german: mywords.german,
		danish: mywords.danish,
		english: mywords.english
		});}
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
    //res.redirect("/files/enterWords.html");
    res.redirect("/files/home.html");
});

//app.use();


app.listen(3000, () => {
    console.log("Listening on port 3000");
});
