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

					const pokeData = {
						url: 'https://pokeapi.co/api/v2/',
						type: 'pokemon',
						id: '25'
					};
					const { url, type, id } = pokeData;
					const pokeUrl = `${url}${type}/${id}`;

					fetch(pokeUrl).then((data) => data.json()).then((pokemon) => generateHtml(pokemon));

					const generateHtml = (data) => {
						console.log(data);
						const html = `
							<div class="name">Het is koud bij je, heb je de warmte van ${data.name} nodig?</div>
							<img src=${data.sprites.front_default}>
							
						`;
						const pokemonDiv = document.querySelector('#header');
						pokemonDiv.innerHTML = html;
					};
				} else {
					document.getElementById('temperatuur').innerHTML = data.currently.temperature;
					document.getElementById('status').innerHTML = data.currently.summary;

					const pokeData = {
						url: 'https://pokeapi.co/api/v2/',
						type: 'pokemon',
						id: '7'
					};
					const { url, type, id } = pokeData;
					const pokeUrl = `${url}${type}/${id}`;

					fetch(pokeUrl).then((data) => data.json()).then((pokemon) => generateHtml(pokemon));

					const generateHtml = (data) => {
						console.log(data);
						const html = `
							<div class="name">Het is warm bij je, heb je verkoeling van ${data.name} nodig?</div>
							<img src=${data.sprites.front_default}>
							
						`;
						const pokemonDiv = document.querySelector('#header');
						pokemonDiv.innerHTML = html;
					};
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
