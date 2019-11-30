// shows all words
var allWords = document.getElementById("allWords");
//allWords.innerHTML = "ivan";
url = "http://localhost:3000/showAllWords";
/*$.getJSON(url, (words, status) => {

    allWords.append(words[0].german);
    var wordLength = words.length;
    allWords.append(wordLength);
    //var paragragh = allWords.createElement("p");//
    //paragragh.append(words[1].german);
});*/

var showAllWords = document.getElementById("showAllWords");
/*
$.getJSON(url, (words, status) => {

    var wordLength = words.length;
    //console.log(wordLength);
    //showAllWords.append(wordLength);
    for(i=0; i < wordLength; i++) {
	addWord(showAllWords, words);
	
    }

    console.log(showAllWords.childNodes);
    //showAllWords.childNodes[0].style.borderColor = "1px solid blue";
    //console.log(showAllWords.childNodes[0]);
    var lengthOfNode = showAllWords.childNodes.length;
    console.log(lengthOfNode);
    for(i=0; i < lengthOfNode; i++) {
	console.log(showAllWords.childNodes[i]);
    }

    
    
});
*/

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

function addWords2(words, ahowAllWords2) {
    var lengthOfWordsArray = words.length;

    for (i=0; i < lengthOfWordsArray; i++) {
	//console.log(Object.keys(words[i]))
	var germanWord = words[i].german;
	var danishWord = words[i].danish;
	var englishWord = words[i].english;
	
	var germanDiv = document.createElement("div");
	var danishDiv = document.createElement("div");
	var englishDiv = document.createElement("div");
	
	germanDiv.append(germanWord);
	showAllWords2.append(germanDiv);

	danishDiv.append(danishWord);
	showAllWords2.append(danishDiv);
	danishDiv.style.backgroundColor = "orange";

	englishDiv.append(englishWord);
	showAllWords2.append(englishDiv);
	
	console.log(showAllWords2)

    }
    
    /*words.forEach((word) => {
	var newDiv = document.createElement("div");

	var newGermanWord = words[i].german;
	var newDanishWord = words[i].danish;
	var newEnglishWord = words[i].english;
	
	var newTextNodeGerman = document.createTextNode();
    });*/
}

