// number of words in database
var numberOfWordsId = document.getElementById("numberOfWords");

// shows all words

// addWords2
// for each key in words, create an element
var showAllWords2 = document.getElementById("showAllWords2");

//url = "http://localhost:3000/showAllWords";
let url = window.location.origin + "showAllWords";

$.getJSON(url, (words, status) => {

    var numberOfWords = words.length;
    console.log(numberOfWords);
    numberOfWordsId.innerHTML = numberOfWords;
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

