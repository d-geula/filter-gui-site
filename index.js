const outputField = document.getElementById("output-field");
const addRule = document.getElementById("add-rule");
const resetRules = document.getElementById("reset-rules");
const exportRules = document.getElementById("export-rules");

// List of element IDs containing the data fields
const dataFields = [
    "character",
    "item",
    "blessing",
    "perk",
    "minStats",
    "minRating",
    "minBlessingRarity",
    "minPerkRarity",
    "store"
];

var rules = [];

// Button functions
function add_rules() {
    var rule = {};

    // Loop through id's in dataFields list to get the values from the input fields
    // If the value is not empty, add it to the rule object
    for (var i = 0; i < dataFields.length; i++) {
        if (document.getElementById(dataFields[i]).value != "") {
            var values = document.getElementById(dataFields[i]).value.split(", ");
        if (values.length > 1) {
            rule[dataFields[i]] = values;
        } else {
            rule[dataFields[i]] = document.getElementById(dataFields[i]).value;
        }
        }
    }

    // Add the object to the rules list
    rules.push(rule);

    // Clear the input fields
    for (var i = 0; i < dataFields.length; i++) {
        document.getElementById(dataFields[i]).value = "";
    }
    
    // Add the content of the rules list to the output field
    outputField.innerHTML = JSON.stringify(rules, null, 4);
}

function reset_rules() {
    // Ask for confirmation
    if (confirm("Are you sure you want to reset the rules?")) {
        // Clear contents of the entry fields
        for (var i = 0; i < dataFields.length; i++) {
            document.getElementById(dataFields[i]).value = "";
        }
        // Clear the rules list
        rules = [];
        // Clear the output field
        outputField.innerHTML = "";
    }
}

function export_rules() {
    if (outputField.innerHTML == "") {
        alert("You must add at least one rule before you can export");
        return;
    }

    // Get contents of the text widget
    var text = outputField.innerHTML;
    // Create a new blob with the contents of the output field
    var blob = new Blob([text], {type: "text/plain"});
    // Save the Blob object as a local file using FileSaver.js
    saveAs(blob, "filter_rules.txt");
}

// Event listeners
addRule.addEventListener("click", add_rules);
resetRules.addEventListener("click", reset_rules);
exportRules.addEventListener("click", export_rules);