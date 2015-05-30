/*
 * Script to load the data from users and display links
 * @author: Armand (Tydax) BOUR
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

function calculateAge(birthDate, todayDate) {
    return 20;
}

/* Returns a generated li block from the specified "user" object */
function generateLinkLi(user) {
    var liNode = document.createElement("li");
    liNode.className = user.className;

    // Create img element
    var imgNode = document.createElement("img");
    imgNode.src = user.imgUrl;
    imgNode.width = 75;
    imgNode.className += " listUsers_img invisible";
    liNode.appendChild(imgNode);

    // Create title element
    var nameNode = document.createElement("h4");
    nameNode.className += " listUsers_name"
    var nameText = document.createTextNode(user.name);
    nameNode.appendChild(nameText);
    liNode.appendChild(nameNode);

    // Create quote element
    var quoteNode = document.createElement("p");
    var quoteText = document.createTextNode("“" + user.quote + "”");
    quoteNode.className += " listUsers_quote invisible";
    quoteNode.appendChild(quoteText);
    liNode.appendChild(quoteNode);

    // Create age element
    var birthDate = user.birthDate;
    var todayDate;
    var age = calculateAge(birthDate, todayDate);
    var ageNode = document.createElement("p");
    var ageText = document.createTextNode("" + age + " ans");
    ageNode.className += " listUsers_age invisible";
    ageNode.appendChild(ageText);
    liNode.appendChild(ageNode);

    // Add function when hovering
    liNode.addEventListener("mouseover", function() {
        liNode.className = user.className;

        imgNode.className = "listUsers_img";
        quoteNode.className = "listUsers_quote";
        ageNode.className = "listUsers_age";

    }, false);

    liNode.addEventListener("mouseout", function() {
        liNode.className = "";

        imgNode.className += " invisible";
        quoteNode.className += " invisible";
        ageNode.className += " invisible";

    }, false);

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