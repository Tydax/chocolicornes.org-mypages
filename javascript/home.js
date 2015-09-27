/*
 * Script to load the data from users and display links
 * @author: Armand (Tydax) BOUR
 */

var currentUser;

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
    var dataBirth = birthDate.split("/"),
        dataToday = todayDate.split("/"),
        age = dataToday[2] - dataBirth[2];

    if (dataToday[1] <= dataBirth[1]) {
        if (dataToday[1] < dataBirth[1] || dataToday[0] < dataBirth[0]) {
            return age - 1;
        }
    }

    return age;
}

/* Returns a generated li block from the specified "user" object */
function generateLinkLi(user) {
    var liNode = document.createElement("li");
    liNode.className = user.className;

    // Create title element
    var nameNode = document.createElement("h4");
    nameNode.className += " listUsers_name"
    var nameText = document.createTextNode(user.name);
    nameNode.appendChild(nameText);
    liNode.appendChild(nameNode);

    // Create age element
    var birthDate = user.birthDate;
    var todayDate = "28/07/2015";
    var age = calculateAge(birthDate, todayDate);
    var ageNode = document.createElement("span");
    var ageText = document.createTextNode(" (" + age + " ans)");
    ageNode.className += " listUsers_age invisible";
    ageNode.appendChild(ageText);
    nameNode.appendChild(ageNode);

    // Create quote element
    var quoteNode = document.createElement("p");
    var quoteText = document.createTextNode("“" + user.quote + "”");
    quoteNode.className += " listUsers_quote invisible";
    quoteNode.appendChild(quoteText);
    liNode.appendChild(quoteNode);


    // Add function when hovering
    liNode.addEventListener("mouseover", function() {
        liNode.className = user.className;
        updateImage(user.imgUrl);
        quoteNode.className = "listUsers_quote";
        ageNode.className = "listUsers_age";

    }, false);

    liNode.addEventListener("mouseout", function() {
        liNode.className = "";
        updateImage(currentUser
                  ? currentUser.imgUrl
                  : "../img/null.png");
        quoteNode.className += " invisible";
        ageNode.className += " invisible";

    }, false);

    // When clicking, keep it in focus
    liNode.addEventListener("mouseclick", function() {
        currentUser = user;
    }, false);


    return liNode;
}

function updateImage(src) {
    var imgNode = document.getElementById("info_user_pic");
    imgNode.src = src;
}

/* Generates all the links loading the file */
function generateAllLinks() {
    var filename = "../javascript/list_of_users.json";
    var listId = "list_users";

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