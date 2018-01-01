var ceilingProducts = [
	["Cocoon Polyester Blanket",["1.8",	["1200mm",		"17.5"]], ["2.2",	["1200mm",	"15"]],[ "2.9",	["1200mm",		"11.4"]], ["3.2",	["1200mm",		"9"]]],
	["Pink Batts Biscuit",	["1.8",	["432mm",	"13.7"]],["2.2",	["432mm",	"12.6"]],["2.6",	["432mm",	"10.5"]],["3.2",	["432mm",	"8.4"]],
		["3.6",	["432mm",	"7.4"]],["4.0",	["432mm",	"6.3"]],["4.6",	["432mm",	"5.3"]],["5.0",	["432mm",	"4.2"]]],
	["Pink Batts Blanket",	["1.8",	["1200mm",		"7.2"]], ["2.8",	["1200mm",		"7.2"]]],
	["Greenstuf Polyester Pads",	["2.9",	["430mm",	"6.82"]],["3.2",	["430mm",	"6.82"]],["3.4", ["430mm",  "5.25"]]],
	["Greenstuf Polyester Blanket",["1.8",	["870mm",	"25"]],["2.9",	["870mm",	"17"]],["3.2",	["870mm",	"17"]],["3.4",	["870mm",	"17"]],["3.6",	["870mm",	"14"]]],
	["Mammoth Polyester Blanket",["3.6",	["870mm",	"6.5"]]],
	["Terra Lana Wool Blanket",["3.2",	["870mm",		"7"]]]];

var underfloorProducts = [
	["Cocoon Max Polyester", ["1.8", ["450mm", "17.5"],["500mm", "17.5"],["600mm", "17.5"]]],
	["Cocoon Max 1200mm Blanket", ["1.8", ["1200mm", "17.5"]]],
	["Cocoon Super Polyester", ["2.6", ["450mm", "18"],["500mm", "14.4"],["600mm", "18"]]],
	["Greenstuf Polyester", ["1.5", ["450mm", "20"],["500mm", "20"],["600mm", "20"]],["1.8", ["450mm", "17.5"],["500mm", "17.5"],["600mm", "17.5"]]],
	["Silverzone Foil", ["2.3", ["1200mm", "36"]]],
	["Chill Guard Polystyrene 60mm", ["1.5", ["360mm", "0.432"],["410mm", "0.492"],["440mm", "0.528"],["470mm", "0.564"],["560mm", "0.672"]]],
	["Chill Guard Polystyrene 80mm", ["2.1", ["360mm", "0.432"],["410mm", "0.492"],["440mm", "0.528"],["470mm", "0.564"],["560mm", "0.672"]]]
];

function calculateArea() {
	var lengthFields = ["aLength", "bLength", "cLength", "dLength", "eLength", "fLength", "gLength"];
	var widthFields = ["aWidth", "bWidth", "cWidth", "dWidth", "eWidth", "fWidth", "gWidth"];
	var totalFields = ["aTotal", "bTotal", "cTotal", "dTotal", "eTotal", "fTotal", "gTotal"];
	var totalSqm = 0;

	for(var i = 0; i < lengthFields.length; i++) {
		if(document.getElementById(widthFields[i]).value > 0 && document.getElementById(lengthFields[i]).value > 0){
			document.getElementById(totalFields[i]).value = document.getElementById(widthFields[i]).value * document.getElementById(lengthFields[i]).value;
			totalSqm = parseInt(totalSqm) + parseInt(document.getElementById(totalFields[i]).value);
		}
	}

	document.getElementById("totalSqm").value = totalSqm;
}

function populateProducts() {
	var currentSelection = document.getElementById("insulationSelect");
	var prodSelect = document.getElementById("productSelect");
	var currentProductArray;

	document.getElementById("calculateRequired").disabled = true;
	disableAndResetElement("rValueSelect");
	disableAndResetElement("productSelect");
	disableAndResetElement("areaTxtBox");
	disableAndResetElement("widthSelect");

	addPleaseSelect(prodSelect);

	if (currentSelection.value !== "Please Select") {
		currentProductArray = getCurrentProduct(currentSelection.value);
		for (var i = 0; i < currentProductArray.length; i++) {
			var option = document.createElement("option");
			option.text = currentProductArray[i][0];
			prodSelect.add(option);
		}
		document.getElementById("productSelect").disabled = false;
	}
}

function addPleaseSelect(id) {
	id.innerHTML = "";
	var defaultOption = document.createElement("option");
	defaultOption.text = "Please select";
	id.add(defaultOption);
}

function getCurrentProduct(currentProductType) {
	if (currentProductType === "Ceiling") {
		return ceilingProducts;
	} else if (currentProductType === "Underfloor") {
		return underfloorProducts;
	}
}

function populateRValues() {
	disableAndResetElement("areaTxtBox");
	disableAndResetElement("rValueSelect");
	disableAndResetElement("widthSelect");
	document.getElementById("calculateRequired").disabled = true;

	var rSelect = document.getElementById("rValueSelect");
	var currentProductType = document.getElementById("insulationSelect").value;
	var productIndex = document.getElementById("productSelect").selectedIndex - 1;
	var currentProductArray;

	if (document.getElementById("productSelect").value !== "Please select") {
		addPleaseSelect(rSelect);
		currentProductArray = getCurrentProduct(currentProductType);

		for (var i = 1; i < currentProductArray[productIndex].length; i++) {
			var option = document.createElement("option");
			option.text = currentProductArray[productIndex][i][0];
			rSelect.add(option);
		}

		rSelect.disabled = false;
	}
}

function disableAndResetElement(id) {
	document.getElementById(id).disabled = true;
	document.getElementById(id).innerHTML = "";
}

function populateWidths() {
	var currentProductType = document.getElementById("insulationSelect").value;
	var productIndex = document.getElementById("productSelect").selectedIndex - 1;
	var rValueIndex = document.getElementById("rValueSelect").selectedIndex;
	var width = document.getElementById("widthSelect");

	document.getElementById("calculateRequired").disabled = true;

	if (document.getElementById("rValueSelect").value !== "Please select") {
		addPleaseSelect(width);
		var currentProductArray = getCurrentProduct(currentProductType);

		for (var i = 1; i < currentProductArray[productIndex][rValueIndex].length; i++) {
			var option = document.createElement("option");
			option.text = currentProductArray[productIndex][rValueIndex][i][0];
			option.value = currentProductArray[productIndex][rValueIndex][i][1];
			width.add(option);
		}

		width.disabled = false;
	} else {
		disableAndResetElement("areaTxtBox");
		disableAndResetElement("widthSelect");
	}
}

function transferArea() {
	document.getElementById("areaTxtBox").value = document.getElementById("totalSqm").value;
}

function setupArea() {
	document.getElementById("areaTxtBox").disabled = false;
	document.getElementById("calculateRequired").disabled = false;

	if (document.getElementById("widthSelect").value !== "Please select" && document.getElementById("totalSqm").value !== "") {
			document.getElementById("areaTxtBox").value = document.getElementById("totalSqm").value;
	}
}

function calculateReq() {
	var sqmPerBale = document.getElementById("widthSelect").value;
	document.getElementById("requiredTxt").value = Math.ceil(document.getElementById("areaTxtBox").value / sqmPerBale);
}
