// Steps To Follow:
// 1) Add Event Listener And Get The Searched Text 
// 2) Make HTTP Request and get the search results
// 3) Display Search results


// Steps To Add Spinner Element For Loading Purpose
// 1) Add Spinner Statically in html and hide it 
// 2) Display spinner dynamically just before fetching the information 
// 3) Hide spinner dynamically just before displaying results 

let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    // Creating Result Item Container
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);
    // Creating Title Element 
    let {
        link,
        title,
        description
    } = result;
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);
    // Creating Break Element
    let breakEl1 = document.createElement("br");
    resultItemEl.appendChild(breakEl1);
    // Creating URL Element 
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);
    // Creating Break Element
    let breakEl2 = document.createElement("br");
    resultItemEl.appendChild(breakEl2);
    // Creating Description Element 
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function wikiSearch(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", wikiSearch);