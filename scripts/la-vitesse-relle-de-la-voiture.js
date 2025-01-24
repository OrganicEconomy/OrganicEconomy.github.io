// Filling the 1st form
// must be filling the 2nd form
$("#km-per-year-1").on("keyup", function(event) {
	$("#km-per-year-2").val($(this).val());
});
$("#days-home-work-1").on("keyup", function(event) {
	$("#days-home-work-2").val($(this).val());
});
$("#average-base-speed-1").on("keyup", function(event) {
	$("#average-base-speed-2").val($(this).val());
});
$("#km-home-work-1").on("keyup", function(event) {
	$("#km-home-work-2").val($(this).val());
});
$("#euros-per-year-1").on("keyup", function(event) {
	$("#euros-per-year-2").val($(this).val());
});
$("#time-work-per-week-1").on("keyup", function(event) {
	$("#time-work-per-week-2").val($(this).val());
});
$("#car-price-1").on("keyup", function(event) {
	$("#car-price-2").val($(this).val());
});
$("#permis-price-1").on("keyup", function(event) {
	$("#permis-price-2").val($(this).val());
});
$("#gaz-price-per-liter-1").on("keyup", function(event) {
	$("#gaz-price-per-liter-2").val($(this).val());
});
$("#gaz-consumption-1").on("keyup", function(event) {
	$("#gaz-consumption-2").val($(this).val());
});
$("#insurance-price-per-year-1").on("keyup", function(event) {
	$("#insurance-price-per-year-2").val($(this).val());
});
$("#maintenance-price-per-year-1").on("keyup", function(event) {
	$("#maintenance-price-per-year-2").val($(this).val());
});
$("#parking-price-per-year-1").on("keyup", function(event) {
	$("#parking-price-per-year-2").val($(this).val());
});
$("#control-price-per-year-1").on("keyup", function(event) {
	$("#control-price-per-year-2").val($(this).val());
});
$("#wash-price-per-year-1").on("keyup", function(event) {
	$("#wash-price-per-year-2").val($(this).val());
});
$("#traffic-jam-time-per-year-1").on("keyup", function(event) {
	$("#traffic-jam-time-per-year-2").val($(this).val());
});
$("#gaz-fill-time-per-year-1").on("keyup", function(event) {
	$("#gaz-fill-time-per-year-2").val($(this).val());
});
$("#maintenance-time-per-year-1").on("keyup", function(event) {
	$("#maintenance-time-per-year-2").val($(this).val());
});
$("#maintenance-budget-year-1").on("keyup", function(event) {
	$("#maintenance-budget-year-2").val($(this).val());
});
$("#health-budget-year-1").on("keyup", function(event) {
	$("#health-budget-year-2").val($(this).val());
});
$("#auto-budget-year-1").on("keyup", function(event) {
	$("#auto-budget-year-2").val($(this).val());
});
// Specifis functions
$(".gaz-consumption").on("keyup", function(event) {
	$(".gaz-fill-time-per-year").val(getTimeToFill().toFixed(2));
});

$(".typology-city").on("click", function() {
	$(".average-base-speed").val(18);
});
$(".typology-medium").on("click", function() {
	$(".average-base-speed").val(26);
});
$(".typology-campaign").on("click", function() {
	$(".average-base-speed").val(35);
});

function getTimeToFill () {
	var distance = getDistance();
	var gaz_consumption = customRound($("#gaz-consumption-2"));
	var total_liter_consumed = distance * gaz_consumption / 100;

	// Time to fill : /45 (1 fill per 45L) and /3 (1/3 hour per fill)
	return total_liter_consumed / 45 / 3;
}

// Clicking on calculate
$("#calculate").on("click", function(event) {
	var distance, t, t1, t2, t3, t4, speed;

	distance = getDistance();

	var hourly_fee = getHourlyFee();

	var car_worktime_per_year = getCarPricePerYear(distance)/hourly_fee;
	var car_taxetime_per_year = getCarTaxesPerYear()/hourly_fee;

	t1 = getDriveTimePerYear(distance);
	t2 = car_worktime_per_year;
	t3 = getTimeSpendForCarPerYear();
	t4 = car_taxetime_per_year;

	speed = distance / (t1 + t2 + t3 + t4);

	// Details
	$(".distance-d").text(distance.toFixed(0));
	$(".hourly-fee").text(hourly_fee.toFixed(2));
	$(".time-t1").text(t1.toFixed(0));
	$(".time-t2").text(t2.toFixed(0));
	$(".time-t3").text(t3.toFixed(0));
	$(".time-t4").text(t4.toFixed(0));

	// Results
	$(".time-notaxe").text((t1+t2+t3).toFixed(0));
	$(".time-t").text((t1+t2+t3+t4).toFixed(0));
	$(".resulting-speed").text(speed.toFixed(2));
	$(".resulting-time").text(((t1+t2+t3+t4) / 365).toFixed(0));
	$(".resulting-comparison").text(getComparison(speed));

	// Results CO2
	$(".resulting-CO2").text(getResultingCO2(distance).toFixed(0));
	$(".resulting-CO2-cost").text((distance * 0,85).toFixed(0));

	// Infos about bike
	$(".bike-time").text(getBikeTime(distance).toFixed(0));
	$(".resulting-bike-time-notaxe").text(((t1+t2+t3) - getBikeTime(distance)).toFixed(0));
	$(".resulting-bike-workless-notaxe").text(((t2+t3) / 52).toFixed(0));
	$(".resulting-bike-time").text((t1+t2+t3+t4).toFixed(0));
	$(".resulting-bike-workless").text(((t1+t2+t3+t4) / 52).toFixed(0));
});

function getResultingCO2(distance) {
	var gaz_consumption = customRound($("#gaz-consumption-2"));
	var total_liter_consumed = distance * gaz_consumption / 100;
	return 3 * total_liter_consumed;
}

function getBikeTime(distance) {
	/* basic bike speed is 15 km/h */
	return distance / 15;
}

function getComparison(speed) {
	if (speed < 7) {
		return "comme un piéton en promenade";
	}
	if (speed <= 10) {
		return "moins vite qu'une poule";
	}
	if (speed > 25) {
		return "plutôt vite, la voiture semble adaptée";
	}
	if (speed >= 17) {
		return "aussi vite qu'en VAE";
	}
	switch (Math.round(speed)) {
		case 10 :
		case 11 :
			return "aussi vite qu'une poule";
		case 12 :
			return "comme un cycliste débutant en promenade";
		case 13 :
			return "à la vitesse d'un crabe";
		case 14 :
		case 15 :
		case 16 :
			return "aussi vite qu'à vélo";
	}
}

function customRound(field) {
	return parseFloat(field.val().replace(",", ".") || 0);
}

function getDistance() {
	var km_per_year = customRound($("#km-per-year-2"));
	if (km_per_year > 0) {
		return km_per_year;
	}
	return 0;
}

function getHourlyFee() {
	var euros_per_year = customRound($("#euros-per-year-2"));
	var time_work_per_week = customRound($("#time-work-per-week-2"));
	var result;
	if (time_work_per_week <= 0) {
		result = 0;
	}
	if (euros_per_year > 0) {
		result = euros_per_year / 52 / time_work_per_week;
	}
	return result;
}


function getCarPricePerYear(distance) {
	var result = 0;

	// Car price is divided into 10 years (average use of a car)
	var car_price = customRound($("#car-price-2"));
	result += car_price / 10;

	// Permit is divided into 30 years (estimated of use)
	var permis_price = customRound($("#permis-price-2"));
	result += permis_price / 30;

	// Gaz price is consumtion per 100L / 100 then multiplicated by km/year
	var gaz_price_per_liter = customRound($("#gaz-price-per-liter-2"));
	var gaz_consumption = customRound($("#gaz-consumption-2"));
	result += ((gaz_consumption / 100) * distance) * gaz_price_per_liter;

	var insurance_price_per_year = customRound($("#insurance-price-per-year-2"));
	var maintenance_price_per_year = customRound($("#maintenance-price-per-year-2"));
	var parking_price_per_year = customRound($("#parking-price-per-year-2"));
	var control_price_per_year = customRound($("#control-price-per-year-2"));
	var wash_price_per_year = customRound($("#wash-price-per-year-2"));

	result += insurance_price_per_year + maintenance_price_per_year + parking_price_per_year + control_price_per_year + wash_price_per_year;

	return result;
}

function getTimeSpendForCarPerYear() {
	var traffic_jam_time_per_year = customRound($("#traffic-jam-time-per-year-2"));
	var gaz_fill_time_per_year = customRound($("#gaz-fill-time-per-year-2"));
	var maintenance_time_per_year = customRound($("#maintenance-time-per-year-2"));

	return traffic_jam_time_per_year + gaz_fill_time_per_year + maintenance_time_per_year;
}

function getDriveTimePerYear(distance) {
	var average_speed = customRound($("#average-base-speed-2"));

	return distance / average_speed;
}

function getCarTaxesPerYear() {
	/**
	 * The total budget is in millions euros, so we just have to divide it
	 * by 40 (40 millions of taxable franchies).
	 */
	var maintenance_budget_year = customRound($("#maintenance-budget-year-2"));
	var health_budget_year = customRound($("#health-budget-year-2"));
	var auto_budget_year = customRound($("#auto-budget-year-2"));

	return (maintenance_budget_year + health_budget_year + auto_budget_year) / 38.7;
}

/*
km-per-year-2
km-home-work-2
days-home-work-2
euros-per-year-2
time-work-per-week-2
car-price-2
permis-price-2
gaz-price-per-liter-2
gaz-consumption-2
insurance-price-per-year-2
maintenance-price-per-year-2
parking-price-per-year-2
control-price-per-year-2
wash-price-per-year-2
traffic-jam-time-per-year-2
gaz-fill-time-per-year-2
maintenance-time-per-year-2
maintenance-budget-year-2
health-budget-year-2
auto-budget-year-2
*/
