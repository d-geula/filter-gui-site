// initialize bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// initialize bootstrap popovers
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

// initialize clipboard.js
var clipboard = new ClipboardJS(".copy-btn");


const addRule = document.getElementById("addRule");
const resetRules = document.getElementById("resetRules");
const importRules = document.getElementById("importButton");
const exportRules = document.getElementById("exportRules");
const copyRules = document.querySelector(".copy-btn");

const importCancel = document.getElementById("importButtonCancel");
const importField = document.getElementById("importFilter");
const outputField = document.getElementById("output");
const label = document.querySelector("label[for='output']");
const modal = new bootstrap.Modal("#importModal");
const tooltip = new bootstrap.Tooltip("#copyButton");
const image = document.getElementById("clipboardImg");

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
  "store",
];

var rules = [];

// Button functions
function add_rules() {
  var rule = {};

  // Loop through id's in dataFields list to get the values from the input fields
  // If the value is not empty, add it to the rule object
  for (var i = 0; i < dataFields.length; i++) {
    if (document.getElementById(dataFields[i]).value) {
      var values = document.getElementById(dataFields[i]).value.split(", ");
      if (isNaN(values)) {
        if (values.length > 1) {
          rule[dataFields[i]] = values;
        } else {
          rule[dataFields[i]] = values[0];
        }
      } else {
        rule[dataFields[i]] = parseInt(values);
      }
    }
  }

  if (Object.keys(rule).length > 0) {
    // Add the object to the rules list
    rules.push(rule);

    // Clear the input fields
    for (var i = 0; i < dataFields.length; i++) {
      document.getElementById(dataFields[i]).value = "";
    }

    // Add the content of the rules list to the output field
    outputField.innerHTML = JSON.stringify(rules, null, 4);
  }
}

function reset_rules() {
  if (outputField.innerHTML) {
    if (confirm("This will clear all rules. Are you sure?")) {
      // Clear contents of the entry fields
      for (var i = 0; i < dataFields.length; i++) {
        document.getElementById(dataFields[i]).value = "";
      }
    }
    // Clear the rules list
    rules = [];
    // Clear the output field
    outputField.innerHTML = "";
  }
}

function import_rules() {
  // Get the contents of the import field
  var text = importField.value;

  // Parse the text as JSON
  try {
    var json = JSON.parse(text);
  } catch (e) {
    alert(e);
    return;
  }

  // Add the JSON to the rules list
  rulesNew = json;
  // merge imported rules with existing rules
  rules = rules.concat(rulesNew);

  // Add the content of the rules list to the output field
  outputField.innerHTML = JSON.stringify(rules, null, 4);

  // Clear the import field
  modal.hide();
  importField.value = "";
}

function export_rules() {
  if (!outputField.innerHTML) {
    alert("You must add at least one rule before you can export");
    return;
  }

  // Get contents of the text widget
  var text = outputField.innerHTML;
  // Create a new blob with the contents of the output field
  var blob = new Blob([text], { type: "text/plain" });
  // Save the Blob object as a local file using FileSaver.js
  saveAs(blob, "filter_rules.txt");
}

// misc functions
function import_cancel() {
  // Clear the import field
  importField.value = "";
}

function tooltip_copied() {
  tooltip.show();
  image.src = "clipboard-check.svg";

  // reset tooltip title
  setTimeout(function () {
    tooltip.hide();
    image.src = "clipboard.svg";
  }, 1000);
}

function hide_label_scroll() {
  let scrollTop = outputField.scrollTop;
  if (scrollTop > 0) {
    label.style.visibility = "hidden";
  } else {
    label.style.visibility = "visible";
  }
}

// Event listeners
addRule.addEventListener("click", add_rules);
resetRules.addEventListener("click", reset_rules);
importRules.addEventListener("click", import_rules);
importCancel.addEventListener("click", import_cancel);
exportRules.addEventListener("click", export_rules);
copyRules.addEventListener("click", tooltip_copied);
outputField.addEventListener("scroll", hide_label_scroll);
