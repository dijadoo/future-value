"use strict";

// Store getElementById() method of the document object as a function
var $ = function(id) {
    return document.getElementById(id);  // get element object of specified HTML id
};

// Process user entries, validate data
var processEntries = function(){
	
	// Get user entries from form, assign to variables, convert to decimal values
	var investment = parseFloat($("investment").value);  
    var rate = parseFloat($("rate").value);
	var years = parseFloat($("years").value);	
	
	// Data validation - test for valid user entry, return error message if required
	var errorMessage = "";   // set error message to empty
	if (isNaN(investment) || investment <= 0 || investment > 100000){
		errorMessage = "Investment must be greater than 0 and not more than 100,000";
		$("investment").focus();   // focus cursor in text box if error detected
	} else if (isNaN(rate) || rate <= 0 || rate > 15) {
		errorMessage = "Interest rate must be greater than 0 and not more than 15";
		$("rate").focus();
	} else if (isNaN(years) || years <= 0 || years > 50) {
		errorMessage = "Years must be greater than 0 and not more than 50";
		$("years").focus();
	} 
	// If no error message, call calculateFV function and store result in Future Value text box
	if (errorMessage == ""){    
		$("future_value").value = calculateFV(investment, rate, years);
	} else {
		alert(errorMessage);    // display appropriate alert message if error detected
	}
};

// Calculate Future Value
var calculateFV = function(investment, rate, years){  
    var futureValue = investment;   // set variable to investment amount input by user
	for (var i = 1; i <= years; i++ ){
		futureValue = futureValue + ((futureValue * rate) / 100);  // interest calculation - add each year's interest to original investment
	}
	futureValue = parseFloat(futureValue).toFixed(2);  // round result to two decimal places
	return futureValue;   // return result
};

// Event handler
window.onload = function() {  // execute after page is loaded
	$("calculate").onclick = processEntries;  // run processEntries function when Calculate button is clicked
	$("investment").focus();  // place focus on Investment text box
};