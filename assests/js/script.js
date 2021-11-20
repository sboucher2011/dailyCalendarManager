//-----------------------------------------
//Variables
//-----------------------------------------
var currentDayEl = document.querySelector("#currentDay");
var rowContainerEl = document.querySelector("#container");
const taskDescriptions = JSON.parse(localStorage.getItem("taskDescriptions")) || [];

//-----------------------------------------
//Event Listeners
//-----------------------------------------
$(document).on("click", ".saveBtn", function(event) {

    var btnName = $(this).attr('id').split('-')[1];

    var text = $("#description-" + btnName).text();

    console.log(btnName)

    saveRow(text, btnName);
});

$(document).on("click", ".future", function() {
    var text = $(this)
        .text()
        .trim();
    
    var rowName = $(this).attr('id')+"-future";

    var textInput = $("<textarea>")
        .attr('id', rowName)
        .addClass("description col-9 future row")
        .val(text);
  
    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

$(document).on("click", ".past", function() {
    var text = $(this)
        .text()
        .trim();
    
    var rowName = $(this).attr('id')+"-past";

    var textInput = $("<textarea>")
        .attr('id', rowName)
        .addClass("description col-9 past row")
        .val(text);
  
    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

$(document).on("click", ".present", function() {
    var text = $(this)
        .text()
        .trim();
    
    var rowName = $(this).attr('id')+"-present";

    var textInput = $("<textarea>")
        .attr('id', rowName)
        .addClass("description col-9 present row")
        .val(text);
  
    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

$(document).on("blur", "textarea", function() {
    var text = $(this)
        .val()
        .trim();
    

    var rowName = "description-" + $(this).attr('id').split('-')[1];   
    var timeTense = $(this).attr('id').split('-')[2];

    console.log(rowName);

    var classInfo = "";

    if (timeTense === "future") {
        classInfo = "description col-9 future row"
    } else if (timeTense === "past") {
        classInfo = "description col-9 past row"
    } else {
        classInfo = "description col-9 present row"
    }

    // recreate p element
    var descriptionP = $("<p>")
        .attr('id', rowName)
        .addClass(classInfo)
        .text(text);

    $(this).replaceWith(descriptionP);
});

//-----------------------------------------
//Functions
//-----------------------------------------
var currentDay = function() {
    var mydate = moment();
    var weekDayName =  moment(mydate).format('dddd');
    var todaysDate = moment(mydate).format('Do');
    var todaysMonth = moment(mydate).format('MMMM');

    currentDayEl.textContent = weekDayName + ", " + todaysMonth + " " + todaysDate
}

var buildCalendar = function() {
    //deterime current hour
    var currentHour = moment(moment()).format('HH');

    for (var i = 8; i<18; i++) {

        var timeSlot
        //time conversion & coloring
        if (i < 12) {
            timeSlot = i + "AM"
        } else if (i === 12) {
            timeSlot = i + "PM"
        } else {
            var newTime = i - 12;
            timeSlot = newTime + "PM"
        }

        //build rows
        var rowEl = document.createElement("div");
        var timeEl = document.createElement("p");
        var descriptionEl = document.createElement("p");
        var saveButtonEl = document.createElement("button");
        saveButtonEl.id = "saveBtn-"+i;
        descriptionEl.id = "description-"+i;

        rowEl.className = "row";
        timeEl.className = "hour col-2 row";
        
        saveButtonEl.className = "saveBtn col-1 row";

        rowContainerEl.append(rowEl);

        rowEl.append(timeEl);
        rowEl.append(descriptionEl);
        rowEl.append(saveButtonEl);

        timeEl.textContent = timeSlot;

        //add icon to Save Button
        var btnSpan = document.createElement("span");
        btnSpan.className = "oi oi-lock-locked";
        btnSpan.id = "icon"
        document.getElementById("saveBtn-"+i).appendChild(btnSpan);

        //color code time slots
        if (i > currentHour) {
            //future
            descriptionEl.className = "future row description col-9";
        } else if (i < currentHour) {
            //past
            descriptionEl.className = "description col-9 past row";
        } else {
            //present
            descriptionEl.className = "description col-9 present row";
        }

        //populate with data if exists
        if (taskDescriptions.length > 0) {
            for (var j = 0; j < taskDescriptions.length; j++) {
                if (i === parseInt(taskDescriptions[j].rowNumber)) {
                    if (currentDayEl.textContent === taskDescriptions[j].day) {
                        descriptionEl.textContent = taskDescriptions[j].task;
                    }
                }
            }
        }
    }
}

var saveRow = function(text, row) {

    const taskDescription = {
        task: text,
        rowNumber: row,
        day: currentDayEl.textContent,
    }

    taskDescriptions.push(taskDescription);

    localStorage.setItem("taskDescriptions", JSON.stringify(taskDescriptions));
}

currentDay();
buildCalendar();