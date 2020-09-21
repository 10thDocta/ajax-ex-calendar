/* global $ */
var DateTime = luxon.DateTime;

// funzione per la chiamata AJAX
const ajaxCall = (year, month) => {
	$.ajax(
		{
			url: "https://flynn.boolean.careers/exercises/api/holidays",
			data: {
				year: year,
				month: month
			},
			method: "GET",
			success: function (data) {

				data.response.forEach(e => {
					var el = e.date.slice(-2);

					$(`ul li:contains(${el})`).addClass("red").append(`<span><br/>${e.name}</span>`);

				});

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
	$("#month").attr("data-month", obj.month);
	$("#month > .mese").text(obj.monthLong);
	$(".calendar-container .calendar > ul").html("");

	console.log(obj.day + 1);

	for (let i = 1; i <= obj.daysInMonth; i++) {

		obj = DateTime.local(year, month, day);

		if (obj.day <= 9) {
			let html = `<li class="giorno">0${obj.day} ${obj.weekdayLong}</li>`;
			$(".calendar-container .calendar > ul").append(html);
		} else {
			let html = `<li class="giorno">${obj.day} ${obj.weekdayLong}</li>`;
			$(".calendar-container .calendar > ul").append(html);
		}

		day++;
	}
}




$(document).ready(function () {

	render(2018, 1, 1);
	ajaxCall(2018, 0);
	$(".fa-angle-double-left").addClass("disable");

	$(".arr-left").click(function () {
		var year = parseInt($(".calendar-container .anno").text(), 10);
		var month = parseInt($(".calendar-container #month").attr("data-month"), 10);

		// if (month < 1) {
		// 	year--;
		// 	month = 12;
		// }

		if (month > 1) {
			month--;
			render(year, month, 1);
			ajaxCall(year, --month);
			$(".fa-angle-double-right").removeClass("disable");
		}

		if (month == 0) {
			$(".fa-angle-double-left").addClass("disable");
		}

	});


	$(".arr-right").click(function () {
		var year = parseInt($(".calendar-container .anno").text(), 10);
		var month = parseInt($(".calendar-container #month").attr("data-month"), 10);

		// if (month > 12) {
		// 	year++;
		// 	month = 1;
		// }

		if (month < 12) {
			month++;
			render(year, month, 1);
			ajaxCall(year, --month);
			$(".fa-angle-double-left").removeClass("disable");
		}

		if (month == 11) {
			$(".fa-angle-double-right").addClass("disable");
		}

	});
























});