// shows all words
var allWords = document.getElementById("allWords");
allWords.innerHTML = "ivan";
url = "http://localhost:3000/showAllWords";
$.getJSON(url, (words, status) => {

    allWords.append(words[0].german);
    var wordLength = words.length;
    allWords.append(wordLength);
    var paragragh = allWords.createElement("p");//
    paragragh.append(words[1].german);
});
