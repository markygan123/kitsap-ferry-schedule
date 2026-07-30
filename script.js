const FerrySchedule = (function () {
	'use strict';
	
	const ferrySchedule = {
		weekdays: {
			portOrchardToBremerton: {
				direction: "Port Orchard → Bremerton",
				departures: [
				"04:25", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
				"08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
				"11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
				"15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
				"18:30", "19:00", "19:30", "20:00", "20:30"
				]
			},
			bremertonToPortOrchard: {
				direction: "Bremerton → Port Orchard",
				departures: [
				"04:45", "05:15", "05:45", "06:15", "06:45", "07:15", "07:45",
				"08:15", "08:45", "09:15", "09:45", "10:15", "10:45", "11:15",
				"11:45", "12:15", "12:45", "13:15", "13:45", "14:15", "14:45",
				"15:15", "15:45", "16:15", "16:45", "17:15", "17:45", "18:15",
				"18:45", "19:15", "19:45", "20:15", "21:00"
				]
			},
			annapolisToBremerton: {
				direction: "Annapolis → Bremerton",
				departures: [
				"05:15", "05:30", "05:45", "06:00", "06:15", "06:30", "06:45",
				"07:00", "07:15", "15:02", "15:17", "15:32", "15:47", "16:02",
				"16:17", "16:35", "16:50", "17:05", "17:27"
				]
			},
			bremertonToAnnapolis: {
				direction: "Bremerton → Annapolis",
				departures: [
				"05:22", "05:37", "05:52", "06:07", "06:22", "06:37", "06:52",
				"07:07", "14:55", "15:10", "15:25", "15:40", "15:55", "16:10",
				"16:28", "16:43", "16:58", "17:20", "17:37"
				]
			},
			bremertonToSeattle: {
				direction: "Bremerton → Seattle",
				departures: [
				"04:40", "05:25", "06:05", "06:45", "07:25", "08:05",
				"08:35", "09:15", "09:50", "10:25",
				"13:50", "15:05", "15:45", "16:25", "17:00", "17:45",
				"18:20", "19:05", "19:40", "21:00"
				]
			},
			seattleToBremerton: {
				direction: "Seattle → Bremerton",
				departures: [
				"05:20", "06:05", "06:45", "07:25", "08:00", "08:40",
				"09:10", "09:50", "10:25", "11:00",
				"14:25", "15:45", "16:25", "17:05", "17:40", "18:25",
				"19:00", "19:40", "20:20", "21:40"
				]
			}
		},
		saturdays: {
			portOrchardToBremerton: {
				direction: "Port Orchard → Bremerton",
				departures: [
				"08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
				"12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
				"15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
				"19:00", "19:30"
				]
			},
			bremertonToPortOrchard: {
				direction: "Bremerton → Port Orchard",
				departures: [
				"08:45", "09:15", "09:45", "10:15", "10:45", "11:15", "11:45",
				"12:15", "12:45", "13:15", "13:45", "14:15", "14:45", "15:15",
				"15:45", "16:15", "16:45", "17:15", "17:45", "18:15", "18:45",
				"19:15", "19:45"
				]
			},
			bremertonToSeattle: {
				direction: "Bremerton → Seattle",
				departures: [
				"09:20", "10:50", "12:15", "14:00", "15:30",
				"17:30", "18:50", "20:10", "21:30", "22:50"
				]
			},
			seattleToBremerton: {
				direction: "Seattle → Bremerton",
				departures: [
				"10:05", "11:30", "13:00", "14:45", "16:10",
				"18:10", "19:30", "20:50", "22:10", "23:30"
				]
			}
		},
		sundays: {
			portOrchardToBremerton: {
				direction: "Port Orchard → Bremerton",
				departures: [
				"09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
				"12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
				"15:00", "15:30", "16:00", "16:30"
				]
			},
			bremertonToPortOrchard: {
				direction: "Bremerton → Port Orchard",
				departures: [
				"09:15", "09:45", "10:15", "10:45", "11:15", "11:45",
				"12:15", "12:45", "13:15", "13:45", "14:15", "14:45",
				"15:15", "15:45", "16:15", "16:45"
				]
			}
		}
	};
	
	// RENDER FUNCTIONS
	
	function parseTimeStamp(timeStamp) {
		var arr = timeStamp.split(':');
		var dec = Math.floor(parseFloat(arr[1]) / 6 * 10);

		return parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec;
	}
	
	function addRouteToDropdown(route) {
		let routeDropdown = document.querySelector('select');
		const option = new Option(route, route);
		
		return routeDropdown.add(option, undefined);		
	}
    
	function displayRouteSchedule (tripsList, partOfWeekTitle) {
		let html = '';	
		
		Object.entries(tripsList).forEach(([route, times], index) => {
			let dateToday = new Date().toString().split(' ')[1] + "-" +	new Date().toString().split(' ')[2] + "-" + new Date().toString().split(' ')[3]
			let currentTime = new Date(dateToday + " " + new Date().toString().split(' ')[4]);
			let lastDepartureTime = new Date(dateToday + " " + times.departures.at(times.length));
			let nextDepartureTimeFound = 0;
			
			if (new Date().getHours() >= 0) {
				html += `
					<div class='schedule'>
						<h4>${times.direction}</h4>
						<p>Next departure</p>
						<div class='times'>
						${times.departures.map(function (time) {
							if ((new Date(dateToday + ' ' + time) - currentTime) > 0) {
								nextDepartureTimeFound += 1;								
								if (nextDepartureTimeFound == 1) {
									if (parseInt(time.split(':')[0]) < 12) {										
										return `<span class='time next-departure'>${time} AM</span>`;
									} else {
										return `<span class='time next-departure'>${
											(parseInt(time.split(':')[0])-12) == 0 ? '12:' + time.split(':')[1] : time
											} PM</span>`;
									}
								} else {
									if (parseInt(time.split(':')[0]) < 12 ) {
										return `<span class='time'>${time} AM</span>`;					
									} else {
										return `<span class='time'>${
											(parseInt(time.split(':')[0])-12) == 0 ? '12:' + time.split(':')[1] : time
											} PM</span>`;
									}
								}	
							} 			
						})
						.join('')}
						</div>
					</div>
				`;
			} else {
				console.log(currentTime);
				html += `
					<div class='schedule'>
						<h4>${times.direction}</h4>
						<p>Service for today</p>
						<div class='last-trip'>
							<span>Last departure was ${times.departures.at(-1)} PM<span>
						</div>
						<div class='time first-departure'>
							<span>
								<p>First departure tomorrow</p>
								<p>${times.departures[0]} AM</p>
							</span>
							<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M304 99.9L304 448L80 448C71.2 448 64 455.2 64 464C64 525.9 114.1 576 176 576L464 576C525.9 576 576 525.9 576 464C576 455.2 568.8 448 560 448L352 448L352 400L513.7 400C526.6 400 534.2 385.6 526.9 375L333.2 90.9C324.3 77.9 304 84.2 304 99.9zM256 384L256 199.8C256 183.7 235 177.7 226.4 191.3L111.3 375.5C104.6 386.2 112.3 400 124.9 400L240 400C248.8 400 256 392.8 256 384z"/></svg></span>
						</div>
					</div>
				`;
			}
			
			
			addRouteToDropdown(times.direction);			
		});	
		
		return html;
	}
	
	function renderSchedule() {
		const container = document.getElementById('schedule-container');
		const dayOfWeek = new Date().getDay();
		
		let html = '';
		
		if (dayOfWeek >= 1 && dayOfWeek <= 5) {
			html += displayRouteSchedule(ferrySchedule.weekdays, 'Weekdays');			
		} else if (dayOfWeek == 6) {
			html += displayRouteSchedule(ferrySchedule.saturdays, 'Saturdays');
		} else {
			html += displayRouteSchedule(ferrySchedule.sundays, 'Sundays');
		}	
		
		container.innerHTML = html;
	}

	// EVENT HANDLERS

	function getEventHandlers() {
		const routeDropdown = document.querySelector('select');
		let getRoute = document.querySelectorAll('.schedule > h4');
		
		
		routeDropdown.addEventListener('change', e => {
			const selectedRoute = e.target.value;
			
			getRoute.forEach(route => {
				route.parentElement.classList.remove('hide-route');
				route.parentElement.classList.remove('selected-route');
			});			
			
			getRoute.forEach(route => {
				if (selectedRoute == "" || route.textContent == selectedRoute) {
					route.parentElement.classList.add('selected-route');					
				} else {
					route.parentElement.classList.add('hide-route');		
				}
			});
		});
		
	}	

	
	return {
		render: renderSchedule,
		eventHandling: getEventHandlers
	}
})();

document.addEventListener('DOMContentLoaded', () => {
	FerrySchedule.render(); 
	FerrySchedule.eventHandling();
});
