/*
 * Script to load the data from users and display links
 */

/* Load the data contained in the specified "filename" file and calls the specified function "callback" */
function loadData(filename, callback) {
    // Load file
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", filename, true);

    // When given a response, interact with data
    xhr.addEventListener("readystatechange", function() {
        // Operation successful
        if (xhr.readyState === 4 && xhr.status === 200) {
           callback(xhr.responseText); 
        }

    }, false);

    // Send request
    xhr.send(null);
}

/* Returns a generated li block from the specified "user" object */
function generateLinkLi(user) {
    var liNode = document.createElement("li");
    liNode.style.clear = "both";
    liNode.style.padding = "5px";

    // Create title element
    var nameNode = document.createElement("h3");
    var nameText = document.createTextNode(user.name);
    nameNode.appendChild(nameText);
    liNode.appendChild(nameNode);

    // Create img element
    var imgNode = document.createElement("img");
    imgNode.src = user.imgUrl;
    imgNode.width = 50;
    imgNode.style.float = "left";
    imgNode.style.padding = "5px";
    liNode.appendChild(imgNode);

    var quoteNode = document.createElement("p");
    var quoteText = document.createTextNode("“" + user.quote + "”");
    quoteNode.appendChild(quoteText);
    liNode.appendChild(quoteNode);

    return liNode;
}

/* Generates all the links loading the file */
function generateAllLinks() {
    var filename = "list_of_users.json";
    var listId = "listUsers";

    loadData(filename, function(response) {
        var users = JSON.parse(response);
        var listUsersNode = document.getElementById(listId);

        for (var i = 0; i < users.length; i++) {
            var userNode = generateLinkLi(users[i]);
            listUsersNode.appendChild(userNode); 
        };
    });
}

/* Main function */
(function() {
    generateAllLinks();
})();