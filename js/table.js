/* 
    Course: COMP.4610 GUI Programming I
    Name: William Zouzas
    Email: william_zouzas@student.uml.edu
    Date Created: 10/24/2021

    File: table.js
    GUI Assignment: HW4 Part 2 jQuery UI Slider and Tab Widgets
    File Description: This file contains functions that take user input from the form created in index.html and then create a multiplication table with those values. The function in this file both displays the values and also calculates the result by multiplying the entered range of numbers. There are three for-loops in this function. The first will display the column header numbers. The next is for adding rows to the multiplication table. Finally, the nested for-loop inside this for-loop calculates and writes the data by multiplying the column and row values. The content is cleared each time the user presses the button on the form. In order to start this JavaScript code, the user must press the button "Save Multiplication Table". This was achieved by using the "onclick" functionality of JavaScript. The beginning part of this JavaScript file validates the user input by checking if there is missing data from the form, if the values are indeed numbers, if those numbers are integers, if the numbers are within the correct range, and a final check to make sure the minimum values are less than the maximum values entered in the form. The jQuery plugin which was implemented in Part 1 of this assignment is used in this file for validating the form.

    Copyright (c) 2021 by William. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
    Updated by WZ on 11/21/21
*/

// Validation using jQuery plug-in
// https://jsfiddle.net/mcu9sgtj/
$(document).ready(function () {

    // Sliders for number entry
    // Two way binding: https://infoheap.com/jquery-ui-slider-and-input-text-box-two-way-binding/
    // Slider: https://www.tutorialspoint.com/jqueryui/jqueryui_slider.htm#slider_options
    // Slider: https://api.jquerymobile.com/slider/
    // Using bind and change: https://api.jquery.com/bind/

    // Slider for minimum column value entry
    $("#sliderColumnMin").slider({
        animate: true,
        min: -50, 
        max: 50, 
        step: 1, 
        value: 0,
        slide: function( event, ui ) {
            $("#columnMin").val(ui.value);
            generateTable();
        }
    });
    var initialValue = $("#sliderColumnMin").slider("option", "value");
    $("#columnMin").val(initialValue);
    $("#columnMin").bind('keyup change', function() {
        var oldVal = $("#sliderColumnMin").slider("option", "value");
        var newVal = $(this).val();
        
        if (!isNaN(newVal) && newVal >= -50 && newVal <= 50) {
            $("#sliderColumnMin").slider("option", "value", newVal);
            generateTable();
        } 
    });

    // Slider for maximum column value entry
    $("#sliderColumnMax").slider({
        animate: true,
        min: -50, 
        max: 50, 
        step: 1, 
        value: 0,
        slide: function( event, ui ) {
            $("#columnMax").val(ui.value);
            generateTable();
        }
    });
    var initialValue = $("#sliderColumnMax").slider("option", "value");
    $("#columnMax").val(initialValue);
    $("#columnMax").bind('keyup change', function() {
        var oldVal = $("#sliderColumnMax").slider("option", "value");
        var newVal = $(this).val();
       
        if (!isNaN(newVal) && newVal >= -50 && newVal <= 50) {
            $("#sliderColumnMax").slider("option", "value", newVal);
            generateTable();
        } 
    });

    // Slider for minimum row value entry
    $("#sliderRowMin").slider({
        animate: true,
        min: -50, 
        max: 50, 
        step: 1, 
        value: 0,
        slide: function( event, ui ) {
            $("#rowMin").val(ui.value);
            generateTable();
        }
    });
    var initialValue = $("#sliderRowMin").slider("option", "value");
    $("#rowMin").val(initialValue);
    $("#rowMin").change(function() {
        var oldVal = $("#sliderRowMin").slider("option", "value");
        var newVal = $(this).val();
        
        if (!isNaN(newVal) && newVal >= -50 && newVal <= 50) {
            $("#sliderRowMin").slider("option", "value", newVal);
            generateTable();
        } 
    });

    // Slider for maximum row value entry
    $("#sliderRowMax").slider({
        animate: true,
        min: -50, 
        max: 50, 
        step: 1, 
        value: 0,
        slide: function( event, ui ) {
            $("#rowMax").val(ui.value);
            generateTable();
        }
    });
    var initialValue = $("#sliderRowMax").slider("option", "value");
    $("#rowMax").val(initialValue);
    $("#rowMax").bind('keyup change', function() {
        var oldVal = $("#sliderRowMax").slider("option", "value");
        var newVal = $(this).val();
        
        if (!isNaN(newVal) && newVal >= -50 && newVal <= 50) {
            $("#sliderRowMax").slider("option", "value", newVal);
            generateTable();
        } 
    });
});
      
function validateForm() {
    
    // https://coderedirect.com/questions/267573/jquery-validate-less-than
    $.validator.addMethod('lessThanEqual', function(value, element, param) {    
        var i = parseInt(value);
        var j = parseInt(document.getElementById(param[0]).value);
        console.log(i<=j);
        return i <= j;
    });

    $('#myForm').validate({
        // Validation rules for form data entry
        rules: {
            columnMin: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThanEqual: ['columnMax'],
            },
            columnMax: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            rowMin: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThanEqual: ['rowMax']
            },
            rowMax: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        // Display an error message to the user based on their input
        messages: {
            columnMin: {
                required: 'MISSING VALUE: No number was entered. Please enter a number between -50 and 50 for the minimum column value.',
                number: 'INVALID ENTRY: No number was entered. Please enter a number between -50 and 50 for the minimum column value.',
                range: 'OUT OF RANGE: The number entered is out of range. Please enter a number between -50 and 50 for the minimum column value.',
                lessThanEqual: 'ERROR: The minimum column value must be less than the maximum column value. Please make sure the minimum is less than the maximum to create a valid table.'
            },
            columnMax: {
                required: 'MISSING VALUE: No number was entered. Please enter a number between -50 and 50 for the maximum column value.',
                number: 'INVALID ENTRY: No number was entered. Please enter a number between -50 and 50 for the maximum column value.',
                range: 'OUT OF RANGE: The number entered is out of range. Please enter a number between -50 and 50 for the maximum column value.'
            },
            rowMin: {
                required: 'MISSING VALUE: No number was entered. Please enter a number between -50 and 50 for the minimum row value.',
                number: 'INVALID ENTRY: No number was entered. Please enter a number between -50 and 50 for the minimum row value.',
                range: 'OUT OF RANGE: The number entered is out of range. Please enter a number between -50 and 50 for the minimum row value.',
                lessThanEqual: 'ERROR: The minimum row value must be less than the maximum row value. Please make sure the minimum is less than the maximum to create a valid table.'
            },
            rowMax: {
                required: 'MISSING VALUE: No number was entered. Please enter a number between -50 and 50 for the maximum row value.',
                number: 'INVALID ENTRY: No number was entered. Please enter a number between -50 and 50 for the maximum row value.',
                range: 'OUT OF RANGE: The number entered is out of range. Please enter a number between -50 and 50 for the maximum row value.'
            }
        }
    });

    return $("#myForm").valid();
};

// JavaScript function used to create multiplication table
//document.getElementById("clickMe").onclick = function () { 
function generateTable() {

    // Clear content of multiplication table to make room for new table generated by user input
    clearContent();

    // If the form is invalid, do not create a multiplication table
    // For example, if the form contains characters or a value out of range, do not proceed with the multiplication table generation
    if(!validateForm()) {
        return;
    }

    // Initialize values entered by user
    var columnMin = document.getElementById("columnMin").value;
    var columnMax = document.getElementById("columnMax").value;
    var rowMin = document.getElementById("rowMin").value;
    var rowMax = document.getElementById("rowMax").value;

    // Check if the numbers are decimals and round the decimals to the nearest integer
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    if (!(Number.isInteger(columnMin))) {
        columnMin = Math.round(columnMin);
    }
    if (!(Number.isInteger(columnMax))) {
        columnMax = Math.round(columnMax);
    }
    if (!(Number.isInteger(rowMin))) {
        rowMin = Math.round(rowMin);
    }
    if (!(Number.isInteger(rowMax))) {
        rowMax = Math.round(rowMax);
    }

    // Create the elements needed to display the table on the webpage
    var tableDisplaySection = document.getElementById("result");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    // Display column header values above table
    var tr = document.createElement('TR');
    var td = document.createElement('TD');
    td.width = '75';
    tr.appendChild(td);
    for(var j = columnMin; j <= columnMax; j++) {
        td = document.createElement('TD');
        td.width = '75'; 
        td.appendChild(document.createTextNode(j));
        tr.appendChild(td);
    }
    tableBody.appendChild(tr);

    // Calculate values and display table body using two for-loops
    var value;
    for (var i = rowMin; i <= rowMax; i++) {
        
        // Create a new row element to display the data
        tr = document.createElement('TR');
        td = document.createElement('TD');
        
        // Set width for space between columns
        td.width = '75';
        
        // Add new row element in table
        td.appendChild(document.createTextNode(i));
        tr.appendChild(td);
        tableBody.appendChild(tr);
        
        // Display and calculate the data values in the table
        for (var j = columnMin; j <= columnMax; j++) {
            td = document.createElement('TD');
            td.width = '75';
            value = i * j;
            td.appendChild(document.createTextNode(value));
            tr.appendChild(td);
        }
    }
    // Add the resulting table to the appriopriate section in HTML
    tableDisplaySection.appendChild(table);
}

/*  
Save multiplication table in tabs
In this function, the user is able to save a multiplication table when they click the button "Save Multiplication Table" right below the form. Before saving the table, an if-statement makes sure that the form was validated properly. Then, the labels for the tabs are created and the HTML of the table is accessed in the #result section of the HTML so that it can be displayed again and saved in the tab. The user can also remove a tab by clicking the "x" in the top right corner.
https://stackoverflow.com/questions/2416547/how-to-add-and-remove-jquery-tabs-dynamically/2430311
*/
$("#tabs").tabs();
function saveTable() {

    // Do not create new tab if the form is invalid
    document.getElementById("errorMessage").innerHTML = "";
    if (!validateForm()) {
        var errorMessage = document.getElementById("errorMessage");
        var p = document.createElement('p');
        
        p.innerHTML = 'ERROR: The multiplication table cannot be generated due to invalid input. Check the form above to make sure valid numbers have been chosen.';
        errorMessage.appendChild(p);
        return;
    }
    
    var tabs = $("#tabs").tabs();
    var ul = tabs.find("ul");
    var num_tabs = $('#tabs li').length + 1;

    // Properly label the tabs for each multiplication table using their column values and row values
    var columnMin = parseInt(document.getElementById("columnMin").value);
    var columnMax = parseInt(document.getElementById("columnMax").value);
    var rowMin = parseInt(document.getElementById("rowMin").value);
    var rowMax = parseInt(document.getElementById("rowMax").value);
    var tabLabel = columnMin + " to " + columnMax + " by " + rowMin + " to " + rowMax;

    // Creating a new tab label: https://www.jquery-az.com/jquery/demo.php?ex=3.0_4
    // Add a checkbox to a tab: https://www.lidorsystems.com/support/articles/jquery/tabstrip/tab-with-check-box.aspx
    newTab = "<li><a href='#tab-" + num_tabs + "'>" + tabLabel + "</a><span class='ui-icon ui-icon-close' role='presentation'></span>" + "<input class='tab-checkbox' type='checkbox' />" + "</li>"
    $(newTab).appendTo(ul);

    data = "<div id='tab-" + num_tabs + "'>" + $("#result").html() + "</div>";
    $(data).appendTo(tabs);

    tabs.tabs("refresh");

    // Remove tabs when "x" is clicked by user
    // https://jqueryui.com/tabs/#manipulation
    tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    });
}

// Delete multiple tabs that are selected by user
// Using remove() to delete HTML element: https://www.w3schools.com/jsref/met_element_remove.asp
function deleteMultipleTabs () {
    
    // Iterate through the tabs and delete tabs if they are selected by user 
    // Check if each checkbox is selected or not
    var selectedTab = document.getElementById("tabs").querySelectorAll("li");
    //var x = document.getElementsById("savedTabs");

    for(var i=0; i<selectedTab.length; i++){
        if ($("input[type=checkbox]").is(":checked")) {
            selectedTab[i].remove();
        }
    }
}

/* 
Function used to clear the multiplication table when a new table is generated
Source: https://www.geeksforgeeks.org/how-to-clear-the-content-of-a-div-using-javascript/
*/
function clearContent() {
    document.getElementById("result").innerHTML = "";
    document.getElementById("errorMessage").innerHTML = "";
}

