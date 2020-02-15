// shows all words
var allWords = document.getElementById("allWords");

url = "http://localhost:3000/showAllWords";


var showAllWords = document.getElementById("showAllWords");


// create element
function addWord(showAllWords, words) {
    var newDivGerman = document.createElement("p");
    var newDivDanish = document.createElement("div");
    var newDivEnglish = document.createElement("div");
    var breakElement = document.createElement("br");
    
    var newGermanWord = words[i].german;
    var newDanishWord = words[i].danish;
    var newEnglishWord = words[i].english;

    newDivGerman = document.createTextNode(newGermanWord);
    newDivDanish = document.createTextNode(newDanishWord);
    newDivEnglish = document.createTextNode(newEnglishWord);

    // add style
    //newDivGerman.style.borderColor = "1px solid blue";

    //appendChild();
    showAllWords.append(newDivGerman);
    //showAllWords.append(breakElement);
    showAllWords.append(newDivDanish);
    //showAllWords.append(breakElement);
    showAllWords.append(newDivEnglish);
    showAllWords.append(breakElement);
    
}

// addWords2
// for each key in words, create an element
var showAllWords2 = document.getElementById("showAllWords2");

$.getJSON(url, (words, status) => {
    addWords2(words, showAllWords2);
});

function addWords2(words, showAllWords2) {
    var lengthOfWordsArray = words.length;

    for (i=0; i < lengthOfWordsArray; i++) {
	//console.log(Object.keys(words[i]))
	var germanWord = words[i].german;
	var danishWord = words[i].danish;
	var englishWord = words[i].english;

	var boxDiv = document.createElement("div");
	boxDiv.style.border = "1px solid green";
	
	var germanDiv = document.createElement("div");
	var danishDiv = document.createElement("div");
	var englishDiv = document.createElement("div");
	
	germanDiv.append(germanWord);
	//showAllWords2.append(germanDiv);
	boxDiv.append(germanDiv);
	showAllWords2.append(boxDiv);

	danishDiv.append(danishWord);
	//showAllWords2.append(danishDiv);
	boxDiv.append(danishDiv);
	showAllWords2.append(boxDiv);
	danishDiv.style.backgroundColor = "orange";

	englishDiv.append(englishWord);
	//showAllWords2.append(englishDiv);
	boxDiv.append(englishDiv);
	showAllWords2.append(boxDiv);
	
	// console.log(showAllWords2)

    }

    console.log(showAllWords2);
    
}

