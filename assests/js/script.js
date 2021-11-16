//-----------------------------------------
//Variables
//-----------------------------------------
var currentDayEl = document.querySelector("#currentDay");

//-----------------------------------------
//Event Listeners
//-----------------------------------------


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
    console.log(currentHour);

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

        //color code 
        if (i=== currentHour) {
            //present
        } else if (i < currentHour) {
            //past
        } else {
            //future
        }

        //build divs
    }
}

currentDay();
buildCalendar;