//javascript for the last created or last added word

var url = "http://localhost:3000/showLastCreated";

var germanWord = document.getElementById("germanWord");
var danishWord = document.getElementById("danishWord");
var englishWord = document.getElementById("englishWord");



$.getJSON(url, (last, status) => {
    
    germanWord.append(last.german); 
    danishWord.append(last.danish);
    englishWord.append(last.english);
   
});
