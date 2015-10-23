/*
 * Script to load the data from users and display links
 *
 * @author: Armand (Tydax) BOUR
 */

var currentUser;
var userInfos = {};

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

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    } 

    if (mm < 10) {
        mm = '0' + mm
    } 

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}

function calculateAge(birthDate, todayDate) {
    var todayDate = getCurrentDate();
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

function generateUserInfoDiv(user) {
    var divNode = document.createElement("div");
    divNode.id = user.name;

    // Create title element
    var nameNode = document.createElement("h3");
    nameNode.className += " user_info_name"
    var nameText = document.createTextNode(user.name);
    nameNode.appendChild(nameText);
    divNode.appendChild(nameNode);


    // Create age element
    var birthDate = user.birthDate;
    var age = calculateAge(birthDate);
    var ageNode = document.createElement("p");
    var ageText = document.createTextNode(age + " ans");
    ageNode.className += " user_info_age";
    ageNode.appendChild(ageText);
    divNode.appendChild(ageNode);

    // Create quote element
    var quoteNode = document.createElement("p");
    var quoteText = document.createTextNode("“" + user.quote + "”");
    quoteNode.className += " user_info_quote";
    quoteNode.appendChild(quoteText);
    divNode.appendChild(quoteNode);

    return divNode;
}

/* Returns a generated li block from the specified "user" object */
function generateLinkLi(user) {
    var liNode = document.createElement("li");
    liNode.id = "list_users_"
    liNode.className = user.className;

    // Create title element
    var nameNode = document.createElement("h4");
    nameNode.className += " listUsers_name"
    var nameText = document.createTextNode(user.name);
    nameNode.appendChild(nameText);
    liNode.appendChild(nameNode);

    // Add function when hovering
    liNode.addEventListener("mouseover", function() {
        liNode.className = user.className;
        showUserInfo(user);
    }, false);

    liNode.addEventListener("mouseout", function() {
        liNode.className = "";

        if (currentUser) {
            showUserInfo(currentUser);
        }
        else {
            updateImage("../img/null.png");
        }
    }, false);

    // When clicking, keep it in focus
    liNode.addEventListener("click", function() {
        currentUser = user;
    }, false);

    return liNode;
}

function updateImage(src) {
    var imgNode = document.getElementById("info_user_pic");
    imgNode.src = src;
}

function showUserInfo(user) {
    updateImage(user.imgUrl);
    var baseInfo = document.getElementById("div_info_user_infos");

    // Cleaning base info div
    for (var i = 0; i < baseInfo.children.length; i++) {
        baseInfo.removeChild(baseInfo.children[i]);
    };

    baseInfo.appendChild(userInfos[user.name]);
}

/* Generates all the links loading the file */
function generateAllLinks() {
    var filename = "../javascript/list_of_users.json";
    var listId = "list_users";

    loadData(filename, function(response) {
        var users = JSON.parse(response);
        var listUsersNode = document.getElementById(listId);

        for (var i = 0; i < users.length; i++) {
            userInfos[users[i].name] = generateUserInfoDiv(users[i]);
            var userNode = generateLinkLi(users[i]);
            listUsersNode.appendChild(userNode); 
        };
    });
}

/* Main function */
(function() {
    generateAllLinks();
})();