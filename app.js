window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");




    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat  = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/b11db367b973c7b1df5a1d38acf671c5/${lat},${long}`;
        

        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const { temperature, summary, icon } = data.currently;
            //Set DOM elements from the API
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            //Formular for celcius
            let celsius = (temperature - 32) * (5/9);
            //Set Icon
            setIcons(icon, document.querySelector(".icon"));

            //Change temperature to Celsius/Farenheit
            temperatureSection.addEventListener('click', () => {
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                }
                else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            })


        });
    });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});