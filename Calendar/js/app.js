var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();
var calendar = document.getElementById('calendar');
var monthSelectElement = document.getElementById('select-month');
var yearSelectElement = document.getElementById('select-year');
var weekElement = document.getElementsByClassName('week')[0];
var birthdays = {
    "1" : {
        "3" : ["Shubham Katariya"],
        "15" : ["Darshana Shrivastava", "Shikha Shakarwar", "Vipin Sir"],
        "31" : ["Sagar Mishra"]
    },
    "2" : {
        "" : []
    },
    "3" : {
        "" : []
    },
    "4" : {
        "2" : ["Gurpreet Chhabra"],
        "22" : ["Sonam Ravi Gupta"],
        "30" : ["Ram Bhaiya"]
    },
    "5" : {
        "3" : ["Siyaram Patidar"],
        "8" : ["Shubham Choubey"],
        "9" : ["Mayur Vaidya"],
        "10" : ["Amit Nagar", "Deepak Patidar"],
        "28" : ["Rahul Kulmi"]
    },
    "6" : {
        "20" : ["Vishal Patidar"]
    },
    "7" : {
        "6" : ["Awanish Tiwari"],
        "21" : ["Surendra Patidar"],
        "24" : ["Anjana Singh"]
    },
    "8" : {
        "8" : ["Aaditya Paliwal"]
    },
    "9" : {
        "" : [""]
    },
    "10" : {
        "16" : ["Piyush Chandak"],
        "19" : ["Rashmi Soni"]
    },
    "11" : {
        "19" : ["Priyanshi Asawara"]
    },
    "12" : {
        "3" : ["Abhijeet Bhowmik"],
        "7" : ["Gourav Agrawal"],
        "11" : ["Shashank Saxena"],
        "12" : ["Nitesh Thakur", "Satya Narayan patidar"]
    }
}

function setCalendar(date, month, year) {
    var startNumber = 1;
    var lastDateOfPreviousMonth;
    var totalRows;
    var dayOnFirst = (new Date(year, month, 1)).getDay();
    var lastDateOfCurrentMonth = (new Date(year, month + 1, 0)).getDate();
    var lastDayOnLastDate = (new Date(year, month, lastDateOfCurrentMonth)).getDay();
    var weekOnFirst = calculateWeekNo();
    var weekOnLast;
    console.log(weekOnFirst);
    calendar.innerHTML = "";
    weekElement.innerHTML = "";
    monthSelectElement.value = month;
    yearSelectElement.value = year;


    if (dayOnFirst != 0) {
        lastDateOfPreviousMonth = (new Date(year, month, 0)).getDate();
        startNumber = lastDateOfPreviousMonth - dayOnFirst + 1;
    }

    totalRows = Math.floor(((dayOnFirst + lastDateOfCurrentMonth - 1) / 7) + 1);
    weekOnLast = weekOnFirst + totalRows - 1;

    for (var i = startNumber; i <= lastDateOfPreviousMonth; i++) {
        calendar.innerHTML += '<div class="dates prev-next-date"><span>' + i + '</span><div>';
    }

    for (var i = 1; i <= lastDateOfCurrentMonth; i++) {
        calendar.innerHTML += '<div data-month-date="' + (month + 1) + '-' + i + '" class="dates">' + i + '</div>';
    }

    // lastRowRemBlocks = ( totalDateElementNo <= 35) ? (35 - totalDateElementNo) : (42 - totalDateElementNo);
    // lastRowRemBlocks = noOfBlocksInRow - ( (lastDateOfCurrentMonth + dayOnFirst + dateBlockDiff) % noOfBlocksInRow);

    for (var i = 1; i <= (6 - lastDayOnLastDate); i++) {
        calendar.innerHTML += '<div class="dates prev-next-date">' + i + '<div>';
    }

    for (var i = weekOnFirst; i <= weekOnLast; i++) {
        if (i < 53) {
            weekElement.innerHTML += '<div class="week-block">' + i + '</div>';
        }
        else {
            weekElement.innerHTML += '<div class="week-block"></div>';
        }
    }

    generateBirthdays(lastDateOfCurrentMonth);

    if ((year == date.getFullYear()) && (month == date.getMonth())) {
        showCurrentDate();
    }
}

 function showCurrentDate() {
     var currentDateElement = document.querySelector('[data-month-date="' + (month + 1) + '-' + date.getDate() + '"]');
     currentDateElement.style.color = "Blue";
     currentDateElement.style.fontWeight = "600";
}

function generateYearOptions(firstYear, lastYear) {
    for (var i = firstYear; i <= lastYear; i++){
        yearSelectElement.innerHTML += '<option value="' + i + '">' + i + '</option>';
    }
}

function calculateWeekNo(){
    var firstDateOfMonth = new Date(year, month, 1);
    var firstDateOfYear = new Date(year, 0, 1);
    if (firstDateOfMonth.getDay() == 0) {
        firstDateOfMonth = new Date(year, month, 2);
    }
    var weekNoOnFirst = Math.floor((firstDateOfMonth.getTime() - firstDateOfYear.getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1;
    return weekNoOnFirst;
}

//Event Listeners
document.getElementById('prev-click').addEventListener('click', function() {
    if (month == 0) {
        year -= 1;
        month = 11;
    }
    else {
        month -= 1;
    }
    setCalendar(date, month, year);
});

document.getElementById('next-click').addEventListener('click', function() {
    if (month == 11) {
        year += 1;
        month = 0;
    }
    else{
        month += 1;
    }
    setCalendar(date, month, year);
});

yearSelectElement.addEventListener('change', function() {
    year = Number(yearSelectElement.value);
    setCalendar(date, month, year);
});

monthSelectElement.addEventListener('change', function() {
    month = Number(monthSelectElement.value);
    setCalendar(date, month, year);
});

function generateBirthdays(lastDate) {
    var birthdaysOnDate;
    var currentDateElement;
    var birthdayElement;
    var birthdayBlockInnerHTML;
    console.log('check');

    for (var i = 1; i <= lastDate; i++) {
        birthdaysOnDate = birthdays[String(month + 1)][String(i)];
        console.log(birthdaysOnDate);
        birthdayBlockInnerHTML = '';
        if (birthdaysOnDate != undefined) {
            currentDateElement = document.querySelector('[data-month-date="' + (month + 1) + '-' + i + '"]');
            for (var j = 0; j < birthdaysOnDate.length; j++) {
                birthdayBlockInnerHTML += '<p>' + birthdaysOnDate[j] + '</p>';
                console.log(j);
            }
            currentDateElement.innerHTML = '<div id="bb" class="birthdayBlock" onmouseover="onBirthdayHover()">' + birthdayBlockInnerHTML + '</div>';
            currentDateElement.innerHTML += i + ' <i class="fa fa-birthday-cake"></i>';
            currentDateElement.style.color = "#F96120" //"#A5DE60"; //"#D01315"
        }
    }
}

function onBirthdayHover() {
        window.setInterval(function() {
            var elem = document.getElementById('bb');
            elem.scrollTop = elem.scrollHeight;
        }, 1000);
}

(function() {
    generateYearOptions(2000, 2025);
    setCalendar(date, month, year);
})();
