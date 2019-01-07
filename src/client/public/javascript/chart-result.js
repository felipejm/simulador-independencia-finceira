'use strict';

function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomBarNoTime(lastClose) {
	var open = randomNumber(lastClose * .95, lastClose * 1.05);
	var close = randomNumber(open * .95, open * 1.05);
	var high = randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
	var low = randomNumber(Math.min(open, close) * .9, Math.min(open, close));
	return {
		o: open,
		h: high,
		l: low,
		c: close,
	};
}

function randomBar(date, lastClose) {
	var bar = getRandomBarNoTime(lastClose);
	bar.t = date.valueOf();
	return bar;
}

function getRandomData(date, count) {
	var dateFormat = 'MMMM DD YYYY';
	var date = moment(date, dateFormat);
	var data = [randomBar(date, 30)];
	while (data.length < count) {
		date = date.clone().add(1, 'd');
		if (date.isoWeekday() <= 5) {
			data.push(randomBar(date, data[data.length - 1].c));
		}
	}
	return data;
}

		var data = getRandomData('April 01 2017', 60);
		// Candlestick
		var ctx = document.getElementById("result-chart").getContext("2d");
		ctx.canvas.width = 1000;
		ctx.canvas.height = 250;
		new Chart(ctx, {
			type: 'candlestick',
			data: {
				datasets: [{
					label: "CHRT - Chart.js Corporation",
					data: data,
					fractionalDigitsCount: 2,
				}]
			},
			options: {
				tooltips: {
					position: 'nearest',
					mode: 'index',
				},
			},
		});
		
		