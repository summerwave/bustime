/*
*
*	Bus Time Plugin Script
*	for showing Seian school bus time.
*	2016 Programmed by T.Mashimo
*	ver1.6, 2021 version.
*
*/

// Automatically setup after loaded. //
window.addEventListener("load", setup, false);

// The timetables (2021) //
var toUniversity = new Object();
toUniversity.diagram = [];
toUniversity.diagram[8] = [20, 40, 47, 55];
toUniversity.diagram[9] = [12, 27, 44];
toUniversity.diagram[10] = [6, 36, 52];
toUniversity.diagram[11] = [20, 37, 52];
toUniversity.diagram[12] = [20, 37, 52];
toUniversity.diagram[13] = [20, 37, 53];
toUniversity.diagram[14] = [20, 35, 52];
toUniversity.diagram[15] = [11, 27, 54];
toUniversity.diagram[16] = [10, 26, 53];
toUniversity.diagram[17] = [11, 38, 54];
toUniversity.diagram[18] = [11, 38, 54];
toUniversity.diagram[19] = [11, 12, 43, 53];// 12分以降から最終までは94系統のバス時刻 //
toUniversity.diagram[20] = [6, 22, 37];
toUniversity.diagram[21] = [6, 21, 51];


var toUniversitySat = new Object();
toUniversitySat.diagram = [];
toUniversitySat.diagram[8] = [45, 58];
toUniversitySat.diagram[9] = [5, 14, 30, 46];
toUniversitySat.diagram[10] = [6, 36, 52];
toUniversitySat.diagram[11] = [21, 37, 52];
toUniversitySat.diagram[12] = [21, 37, 52];
toUniversitySat.diagram[13] = [21, 37, 53];
toUniversitySat.diagram[14] = [20, 35, 52];
toUniversitySat.diagram[15] = [11, 27, 54];
toUniversitySat.diagram[16] = [10, 26, 53];
toUniversitySat.diagram[17] = [11, 38, 54];
toUniversitySat.diagram[18] = [11, 38, 54];
toUniversitySat.diagram[19] = [11, 13, 44];// 13分以降から最終までは97系統のバス時刻 //
toUniversitySat.diagram[20] = [7, 38];

var toStation = new Object();
toStation.diagram = [];
toStation.diagram[8] = [28,48];
toStation.diagram[9] = [3,20,35,50];
toStation.diagram[10] = [12,45];
toStation.diagram[11] = [0,26,45];
toStation.diagram[12] = [5,26,45];
toStation.diagram[13] = [0,26,45];
toStation.diagram[14] = [1,25,41];
toStation.diagram[15] = [0,19,35];
toStation.diagram[16] = [2,18,34];
toStation.diagram[17] = [1,19,46];
toStation.diagram[18] = [3,19,46];
toStation.diagram[19] = [2,19, 20, 51];// 20分以降から最終までは94系統のバス時刻 //
toStation.diagram[20] = [1, 14, 30, 45];
toStation.diagram[21] = [14, 29, 59];

var toStationSat = new Object();
toStationSat.diagram = [];
toStationSat.diagram[8] = [53];
toStationSat.diagram[9] = [6,22,38,52];
toStationSat.diagram[10] = [12,45];
toStationSat.diagram[11] = [0,29,45];
toStationSat.diagram[12] = [5,29,45];
toStationSat.diagram[13] = [0,29,45];
toStationSat.diagram[14] = [1,25,41];
toStationSat.diagram[15] = [0,19,35];
toStationSat.diagram[16] = [2,18,34];
toStationSat.diagram[17] = [1,19,46];
toStationSat.diagram[18] = [3,19,46];
toStationSat.diagram[19] = [2,19, 21, 52];// 21分以降から最終までは97系統のバス時刻 //
toStationSat.diagram[20] = [15,46];


// Make minutes array //
var toUniversityDiagram;
var toStationDiagram;
/*
toUniversity.minutes = makeMinutesFromDiagram(toUniversity.diagram);
toUniversitySat.minutes = makeMinutesFromDiagram(toUniversitySat.diagram);
toStationSat.minutes = makeMinutesFromDiagram(toStationSat.diagram);
toStation.minutes = makeMinutesFromDiagram(toStation.diagram);
*/

function setup()
{
	var date = new Date();
	var week = date.getDay();
	
	// Set diagrams //
	toUniversityDiagram = new Object();
	toUniversityDiagram.minutes = makeMinutesFromDiagram((week==0||week==6) ? toUniversitySat.diagram : toUniversity.diagram);
	toStationDiagram = new Object();
	toStationDiagram.minutes = makeMinutesFromDiagram((week==0||week==6) ? toStationSat.diagram : toStation.diagram);
	
	update();
	setInterval(update, 1000.0);
	
	var busWeekElements = window.document.querySelectorAll("[data-type=service]");
	for (var i=0; i<busWeekElements.length; i++) {
		var busWeekElement = busWeekElements[i];
		var weekdayString = busWeekElement.getAttribute("data-weekday");
		
		var holidayString = busWeekElement.getAttribute("data-holiday");
		busWeekElement.innerHTML = (week==0||week==6) ? holidayString : weekdayString;
	}
}


//var busWeekElement.style.backgroundColor ^//
	
	
function update()
{
	var date = new Date();
	
	// Showing current clock //
	var clockElements = window.document.querySelectorAll("[data-type=clock]");
	for  (var i=0; i<clockElements.length; i++) {
		var clockElement = clockElements[i];
		var format = clockElement.getAttribute("data-format");
		var useImage = clockElement.getAttribute("data-useimage");
		if (format!=undefined) {
			var text = format;
			text = text.replace("hh", padding(date.getHours(), 2));
			text = text.replace("mm", padding(date.getMinutes(), 2));
			text = text.replace("ss", padding(date.getSeconds(), 2));
			if (useImage) text = replaceNumberToImage(text);
			clockElement.innerHTML = text;
		}
	}
	
	// Showing next bus departure times //
	var week = date.getDay();
	var toUniversityElements = window.document.querySelectorAll("[data-type=to-seian]");
	for (var i=0; i < toUniversityElements.length; i++) {
		var toUniversityElement = toUniversityElements[i];
		var dataOffset = toUniversityElement.hasAttribute("data-offset") ? parseInt(toUniversityElement.getAttribute("data-offset")) : 0;
		var dataFormat = toUniversityElement.getAttribute("data-format");
		var useImage = toUniversityElement.getAttribute("data-useimage");
		var busTime = getBusTimeAtOffset(toUniversityDiagram, dataOffset, dataFormat);
		if (useImage) busTime.text = replaceNumberToImage(busTime.text);
		if (busTime.isAvailable) toUniversityElement.innerHTML = busTime.text;
		if (toUniversityElement.hasAttribute("data-service")) toUniversityElement.setAttribute("data-service", busTime.service);
	}
	
	var toStationElements = window.document.querySelectorAll("[data-type=to-ogoto]");
	for (var i=0; i < toStationElements.length; i++) {
		var toStationElement = toStationElements[i];
		var dataOffset = toStationElement.hasAttribute("data-offset") ? parseInt(toStationElement.getAttribute("data-offset")) : 0;
		var dataFormat = toStationElement.getAttribute("data-format");
		var useImage = toStationElement.getAttribute("data-useimage");
		var busTime = getBusTimeAtOffset(toStationDiagram, dataOffset, dataFormat);
		if (useImage) busTime.text = replaceNumberToImage(busTime.text);
		if (busTime.isAvailable) toStationElement.innerHTML = busTime.text;
		if (toStationElement.hasAttribute("data-service")) toStationElement.setAttribute("data-service", busTime.service);
		//if (toStationElement.hasAttribute("data-order")) toStationElement.setAttribute("data-order", busTime.order);
	}
}

var box = document.getElementById('box')
box.innerHTML = '<p>kiki</p>'

function padding(number, figure)
{
	number += "";
	while (number.length < figure)
		number = "0" + number;
	return number;
}

function makeMinutesFromDiagram(diagram)
{
	var allMinutes = new Array();
	for (var hours=0; hours<24; hours++) {
		var minutes = diagram[hours];
		if (minutes==undefined) continue;
		for (var i=0; i<minutes.length; i++) 
			allMinutes.push(hours * 60 + minutes[i]);
	}
	console.log(allMinutes);
	return allMinutes;
}

// The offset means to offset from the next bus time オフセットとは、次のバス時刻からのオフセットを意味します。// 
function getBusTimeAtOffset(datasource, offset, format)
{
	// Return bus time data //
	var busTime = new Object();
	busTime.offset = offset;
	busTime.text = "";
	busTime.hours = 0;
	busTime.minutes = 0;
	busTime.seconds = 0;
	busTime.leftHours = 0;
	busTime.leftMinutes = 0;
	busTime.leftSeconds = 0;
	busTime.leftMinutesOnly = 0;
	busTime.isAvailable = false;
	busTime.service = "out-of-service";
	
	var nowDate = new Date();
	var currentHours = nowDate.getHours();
	var currentMinutes = (currentHours * 60) + nowDate.getMinutes();
	var currentSeconds = nowDate.getSeconds();
	
	for (var i=0; i<datasource.minutes.length; i++) {
		var minutes = datasource.minutes[i];
		if (minutes < currentMinutes) continue;
		
		
		var index = i + offset;
		minutes = (index < datasource.minutes.length) ? datasource.minutes[index] : 0;
		busTime.hours =Math.floor(minutes / 60) % 24;
		busTime.minutes = Math.floor(minutes % 60);
		busTime.seconds = 0;
		busTime.leftHours = Math.floor((minutes - currentMinutes) / 60.0) % 24;
		busTime.leftMinutes = (minutes - currentMinutes) % 60;
		busTime.leftMinutesOnly = minutes - currentMinutes;
		busTime.leftSeconds = 60 - (currentSeconds + 1);
		busTime.isAvailable = true;
		busTime.service = "in-service";
		if (i==0) busTime.service = "first";
		if (i==(datasource.minutes.length - 1)) busTime.service = "last";
		break;
	}

	
	if (busTime.isAvailable) {
		var text = format;
		text = text.replace("hh", padding(busTime.hours, 2));
		text = text.replace("h", padding(busTime.hours, 1));
		text = text.replace("mm", padding(busTime.minutes, 2));
		text = text.replace("m", padding(busTime.minutes, 1));
		text = text.replace("ss", padding(busTime.seconds, 2));
		text = text.replace("s", padding(busTime.seconds, 1));
		text = text.replace("lll", padding(busTime.leftMinutesOnly, 3));
		text = text.replace("ll", padding(busTime.leftMinutesOnly, 2));
		text = text.replace("l", padding(busTime.leftMinutesOnly, 1));
		if (busTime.leftHours > 0){
			text = text.replace("HH", padding(busTime.leftHours, 2)+ "時間");
			text = text.replace("H", padding(busTime.leftHours, 1));
		} else {
			text = text.replace("HH", "");
			text = text.replace("H", "");
		}

		if (busTime.leftMinutes > 0){
		text = text.replace("MM", padding(busTime.leftMinutes, 2)+ "分");
		text = text.replace("M", padding(busTime.leftMinutes, 1));
		} else {
				text = text.replace("MM", "");
				text = text.replace("M", "");
		}
		text = text.replace("SS", padding(busTime.leftSeconds, 2));
		text = text.replace("S", padding(busTime.leftSeconds, 1));
		busTime.text = text;
	}
	return busTime;
}

function replaceNumberToImage(text)
{
	text = text.replace(/0/g, "<img src='images/0.png' />");
	text = text.replace(/1/g, "<img src='images/1.png' />");
	text = text.replace(/2/g, "<img src='images/2.png' />");
	text = text.replace(/3/g, "<img src='images/3.png' />");
	text = text.replace(/4/g, "<img src='images/4.png' />");
	text = text.replace(/5/g, "<img src='images/5.png' />");
	text = text.replace(/6/g, "<img src='images/6.png' />");
	text = text.replace(/7/g, "<img src='images/7.png' />");
	text = text.replace(/8/g, "<img src='images/8.png' />");
	text = text.replace(/9/g, "<img src='images/9.png' />");
	text = text.replace(/:/g, "<img src='images/delimiter.png' />");
	return text;
}



