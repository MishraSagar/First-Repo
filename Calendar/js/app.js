var _date = new Date();
var _month = _date.getMonth();
var _year = _date.getFullYear();
var _calendar = document.getElementById('calendar');
var _selectedMonthElement = document.getElementById('select-month');
var _selectedYearElement = document.getElementById('select-year');
var _weekElement = document.getElementsByClassName('week')[0];
var _startYear;
var _endYear;
var _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

function createCalendar() {
    var startNumber = 1;
    var lastDateOfPreviousMonth;
    var totalRows;
    var classString;
    var dayOnFirstOfMonth = (new Date(_year, _month, 1)).getDay();
    var lastDateOfCurrentMonth = (new Date(_year, _month + 1, 0)).getDate();
    var lastDayOnLastDate = (new Date(_year, _month, lastDateOfCurrentMonth)).getDay();
    var weekOnFirst = calculateWeekNo();
    var weekOnLast;
    console.log(weekOnFirst);
    _calendar.innerHTML = "";
    _weekElement.innerHTML = "";
    _selectedMonthElement.value = _month;
    _selectedYearElement.value = _year;



    if (dayOnFirstOfMonth != 0) {
        lastDateOfPreviousMonth = (new Date(_year, _month, 0)).getDate();
        startNumber = lastDateOfPreviousMonth - dayOnFirstOfMonth + 1;
    }

    totalRows = Math.floor(((dayOnFirstOfMonth + lastDateOfCurrentMonth - 1) / 7) + 1);
    weekOnLast = weekOnFirst + totalRows - 1;
    dayOnFirstSaturday = 7 - dayOnFirstOfMonth;

    for (var i = startNumber; i <= lastDateOfPreviousMonth; i++) {
        _calendar.innerHTML += '<div class="dates prev-next-date"><span>' + i + '</span><div>';
    }

    for (var i = 1; i <= lastDateOfCurrentMonth; i++) {
        if ((dayOnFirstOfMonth + i) % 7 == 0) {
            classString = 'dates saturday';
        }
        else if ( (dayOnFirstOfMonth + i) % 7 == 1) {
            classString = 'dates sunday';
        }
        else {
            classString = 'dates';
        }
        if ((i == _date.getDate()) && (_year == _date.getFullYear()) && (_month == _date.getMonth())) {
            classString = classString.concat(' current-date');
            console.log(classString);
        }
        _calendar.innerHTML += '<div data-month-date="' + (_month + 1) + '-' + i + '" class="' + classString + '">' + i + '</div>';
    }

    for (var i = 1; i <= (6 - lastDayOnLastDate); i++) {
        _calendar.innerHTML += '<div class="dates prev-next-date">' + i + '<div>';
    }

    for (var i = weekOnFirst; i <= weekOnLast; i++) {
        if (i < 53) {
            _weekElement.innerHTML += '<div class="week-block">' + i + '</div>';
        }
        else {
            _weekElement.innerHTML += '<div class="week-block"></div>';
        }
    }

    generateBirthdays(lastDateOfCurrentMonth);
}

function generateMonthAndYearOptions(startYear, endYear) {
    _startYear = startYear;
    _endYear = endYear;
    for (var i = startYear; i <= endYear; i++){
        _selectedYearElement.innerHTML += '<option value="' + i + '">' + i + '</option>';
    }

    for (var i = 0; i < 12; i++) {
        _selectedMonthElement.innerHTML += '<option value="' + i + '">' + _months[i].toUpperCase() + '</option>';
    }
}

function generateWeekDays() {
    var weekHeader = document.getElementsByClassName('week-days')[0];
    var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for(var i = 0; i < 7; i++) {
        weekHeader.innerHTML += '<div class="day">' + dayNames[i] + '</div>';
    }
}

function calculateWeekNo() {
    var firstDateOfMonth = new Date(_year, _month, 1);
    var firstDateOfYear = new Date(_year, 0, 1);
    if (firstDateOfMonth.getDay() == 0) {
        firstDateOfMonth = new Date(_year, _month, 2);
    }
    return (Math.floor((firstDateOfMonth.getTime() - firstDateOfYear.getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1);
}

//Event Listeners
document.getElementById('prev-click').addEventListener('click', function() {
    if (_month == 0) {
        if (_year == _startYear) {
            alert('You can not see previous year');
            return ;
        }
        _year -= 1;
        _month = 11;
    }
    else {
        _month -= 1;
    }
    createCalendar();
});

document.getElementById('next-click').addEventListener('click', function() {
    if (_month == 11) {
        if (_year == _endYear) {
            alert('You can not see next year');
            return ;
        }
        _year += 1;
        _month = 0;
    }
    else{
        _month += 1;
    }
    createCalendar();
});

_selectedYearElement.addEventListener('change', function() {
    _year = Number(_selectedYearElement.value);
    createCalendar();
});

_selectedMonthElement.addEventListener('change', function() {
    _month = Number(_selectedMonthElement.value);
    createCalendar();
});

function generateBirthdays(lastDate) {
    var birthdaysOnDate;
    var currentDateElement;
    var birthdayElement;
    var birthdayBlockInnerHTML;
    console.log('check');

    for (var i = 1; i <= lastDate; i++) {
        birthdaysOnDate = birthdays[String(_month + 1)][String(i)];
        console.log(birthdaysOnDate);
        birthdayBlockInnerHTML = '';
        if (typeof(birthdaysOnDate) != "undefined") {
            currentDateElement = document.querySelector('[data-month-date="' + (_month + 1) + '-' + i + '"]');
            birthdayBlockInnerHTML += '<p>' + birthdaysOnDate.join(", ") + '</p>';
            currentDateElement.innerHTML = '<div class="birthdayBlock">' + birthdayBlockInnerHTML + '</div>';
            currentDateElement.innerHTML += i + ' <i class="fa fa-birthday-cake"></i>';
            currentDateElement.classList.add('birthday');
        }
    }
}


(function() {
    generateMonthAndYearOptions(1970, 2048);
    createCalendar();
    generateWeekDays();
})();
