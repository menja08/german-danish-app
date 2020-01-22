var wordSearch = document.getElementById("wordSearch");

url = "http://localhost:3000/search";
console.log("url = " + url)


$.getJSON(url, (word, status) => {
    console.log("expected JSON" + word);
    if (word.length === 0) {
	wordSearch.append("Sorry, the word you searched is not yet in the database!");
    } else {
	wordSearch.append(word.german);
    }
});
