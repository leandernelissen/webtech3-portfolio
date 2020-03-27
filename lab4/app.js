class App {
	constructor() {
		this.getLocation();
		this.lat;
		this.lng;
	}

	getLocation() {
		navigator.geolocation.getCurrentPosition(this.gotLocation.bind(this), this.errorLocation.bind(this));
	}

	gotLocation(result) {
		this.lat = result.coords.latitude;
		this.lng = result.coords.longitude;
		this.getWeather();
	}

	getWeather() {
		let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ebe8961327ad25f2c6d12e63fb3976bc/${this
			.lat},${this.lng}?units=si`;
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.currently.temperature < 20) {
					document.getElementById('temperatuur').innerHTML = data.currently.temperature;
					document.getElementById('status').innerHTML = data.currently.summary;
					document.getElementById('wrapper').style.backgroundImage = "url('regenjas.png')";
					document.getElementById('wrapper').style.color = 'white';
					document.getElementById('header').style.color = 'white';
					document.getElementById('header').innerHTML =
						'Het lijkt erop dat het slecht weer bij u is. Regenjas nodig?';
				} else {
					document.getElementById('temperatuur').innerHTML = data.currently.temperature;
					document.getElementById('status').innerHTML = data.currently.summary;
					document.getElementById('wrapper').style.backgroundImage = "url('zwembroek.jpg')";
					document.getElementById('header').innerHTML =
						'Het lijkt erop dat het goed weer bij u is. Zwembroek nodig?';
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	errorLocation(err) {
		console.log(err);
	}
}

let app = new App();
