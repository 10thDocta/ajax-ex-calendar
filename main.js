/* global $ */
var DateTime = luxon.DateTime;

// funzione per la chiamata AJAX
const ajaxCall = () => {
	$.ajax(
		{
			url: "https://flynn.boolean.careers/exercises/api/holidays",
			method: "GET",
			success: function (data) {
				//render(data);
			},
			error: function (richiesta, stato, errori) {
				alert("E' avvenuto un errore.", errori);
			}
		}
	);
};


//funzione per popolare il calendario e iniettarlo nel html
const render = (year, month, day) => {

	var obj = DateTime.local(year, month, day);

	$("#year > .anno").text(obj.year);
	$("#month").attr("data-month", obj.month)
	$("#month > .mese").text(obj.monthLong);
	$(".calendar-container .calendar > ul").html("");

	for (let i = 1; i <= obj.daysInMonth; i++) {

		obj = DateTime.local(year, month, day);
		let html = `<li class="giorno">${obj.day} ${obj.weekdayLong}</li>`;
		$(".calendar-container .calendar > ul").append(html);
		day++;
	}

}





$(document).ready(function () {

	render(2018, 1, 1);

	$(".arr-left").click(function () {
		var year = parseInt($(".calendar-container .anno").text(), 10);
		var month = parseInt($(".calendar-container #month").attr("data-month"), 10);
		month--;

		console.log(year);
		console.log(month);

		if (month < 1) {
			year--;
			month = 12;
		}

		render(year, month, 1)
	});


	$(".arr-right").click(function () {
		var year = parseInt($(".calendar-container .anno").text(), 10);
		var month = parseInt($(".calendar-container #month").attr("data-month"), 10);
		month++;

		console.log(year);
		console.log(month);

		if (month > 12) {
			year++;
			month = 1;
		}

		render(year, month, 1)
	});



	//ajaxCall();
























});