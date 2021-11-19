//-----------------------------------------
//Variables
//-----------------------------------------
var currentDayEl = document.querySelector("#currentDay");
var rowContainerEl = document.querySelector("#container");

//-----------------------------------------
//Event Listeners
//-----------------------------------------
$(document).on("click", ".saveBtn", function() {
    console.log("button clicked")
});

$(document).on("click", ".description", function() {
    console.log("description clicked")
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
        saveButtonEl.id = "saveBtn"+i;

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
        document.getElementById("saveBtn"+i).appendChild(btnSpan);

        //color code time slots
        if (i > currentHour) {
            //future
            descriptionEl.className = "description col-9 future row";
        } else if (i < currentHour) {
            //past
            descriptionEl.className = "description col-9 past row";
        } else {
            //present
            descriptionEl.className = "description col-9 present row";
        }
    }
}

currentDay();
buildCalendar();