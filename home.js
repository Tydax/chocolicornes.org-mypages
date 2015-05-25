/*
 * Script to load the data from users and display links
 */

/* Load the data contained in the specified "filename" file and calls the specified function "callback" */
function loadData(filename, callback) {
    // Load file
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', filename, true);

    // When given a response, interact with data
    xhr.addEventListener('readystatechange', function() {
        // Operation successful
        if (xhr.readyState === 4 && xhr.status === "200") {
           callback(xhr.responseText); 
        }

    }, false);

    // Send request
    xhr.send(null);
}

/* Returns a generated li block from the specified data object */
function generateLinkLi(data) {

}

/* Function generating all the links */
function generateAllLinks() {
    var filename = "list_of_users.json";

    loadData(filename, function(response) {
        var users = JSON.parse(response);

        for (var i = 0; i < Things.length; i++) {
            Things[i]
        };
    });
}

/* Main function */
(function() {
    generateAllLinks();
})();

