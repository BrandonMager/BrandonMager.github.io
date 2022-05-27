var date = new Date()
var hours = date.getHours();
var minutes = date.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0'+minutes : minutes;
var strTime = hours + ':' + minutes + ' ' + ampm;

let weather = {
    apiKey : "b95b2f591dc9ac992cf7b24942b18383",
    fetchWeather: function() {
        fetch('https://api.openweathermap.org/data/2.5/weather?id=5370542&appid=b95b2f591dc9ac992cf7b24942b18383&units=imperial') 
        .then((response)=> response.json())
        .then((data)=> this.displayWeather(data));
    },
        
    displayWeather: function(data) {

    const { name } = data;
    const {icon, description } = data.weather[0];
    const { temp, temp_min, humidity } = data.main;
    const { speed } = data.wind;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Semptember', 'October', 'November', 'December']

    console.log(name, description, temp, humidity, speed);
    document.querySelector(".weather-place").innerHTML = "Weather Station for Marina Del Rey";
    document.querySelector(".temp").innerHTML = Math.round(temp_min) + "°F";
    document.querySelector(".icon").src = "http://openweathermap.org/img/w2/" + icon + ".png";
    document.querySelector(".description").innerHTML = "Description: " + description;
    document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind Speed: " + speed + " mph";
    //document.querySelector("min").innerHTML = Math.round(temp_min) + "°F"; 
    //document.querySelector(".day-forecast").innerHTML = day;
    document.querySelector(".update").innerHTML = "Last Updated: " + strTime;
    document.querySelector(".venice-date").innerHTML = months[(date.getMonth())] + " " + date.getDate() + " " + date.getFullYear();
}
}

let forecast = {
    fetchForecast: function() {
        fetch('https://api.openweathermap.org/data/2.5/forecast?id=5370542&cnt=5&appid=b95b2f591dc9ac992cf7b24942b18383&units=imperial')
        .then((daily)=> daily.json())
        .then((forecast)=>this.displayForecast(forecast));
},
displayForecast: function(forecast) {
    var date = new Date()
    var d = date.getDay();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    document.querySelector('.first-forecast').innerHTML = Math.round(forecast.list[0].main.temp) + "°F" + " for " + days[d];
    document.querySelector('.second-forecast').innerHTML = Math.round(forecast.list[1].main.temp) + "°F" + " for " + days[d+1];
    document.querySelector('.third-forecast').innerHTML = Math.round(forecast.list[2].main.temp) + "°F" + " for " + days[d+2];
    document.querySelector('.fourth-forecast').innerHTML = Math.round(forecast.list[3].main.temp) + "°F" + " for " + days[d+3];
    document.querySelector('.fifth-forecast').innerHTML = Math.round(forecast.list[4].main.temp) + "°F" + " for " + days[d+4];

}
}

let air = {
    fetchPurple: function (){
        fetch('https://www.purpleair.com/data.json?show=113678&key=6JJ4D8BYWMM0PVCE')
        .then((air)=>air.json())
        .then((purpleair)=>this.displayAir(purpleair));
    },
    displayAir: function (purpleair){
        document.querySelector(".p-temp").innerHTML = "Temperature: Feels Like " + purpleair.data[0][22] + "°F (Outdoor Readings)";
        document.querySelector(".p-hum").innerHTML = "Humidity: " + purpleair.data[0][21] + "%";
        document.querySelector(".p-update").innerHTML = "Last Updated: " + strTime;
    }
}

let indoor = {
    fetchIndoor: function (){
        fetch('https://www.purpleair.com/data.json?show=124315&key=S185W2XKDFZTHXLG').then((indoor)=>indoor.json()).then((pindoor)=>this.displayIndoor(pindoor));
    },
    displayIndoor: function(pindoor){
        document.querySelector(".i-temp").innerHTML = "Temperature: Feels Like " + pindoor.data[0][22] + "°F (Indoor Readings from Mr.Rojo's Room)";
        document.querySelector(".i-hum").innerHTML = "Humidity: " + pindoor.data[0][21] + "%";
        document.querySelector(".i-update").innerHTML = "Last Updated: " + strTime;

    }
}
window.onload = function() {
    weather.fetchWeather();
    forecast.fetchForecast();
    air.fetchPurple();
    indoor.fetchIndoor();

   /* let content = document.getElementById('PurpleAirWidget_113678_module_AQI_conversion_C0_average_10_layer_standard')
    setTimeout(() => {(
            content.firstChild.style.color = "white"),
            (content.firstChild.style.backgroundColor = "#28148c"
            )},2000)
    */
    
    //air.fetchPurple();
}


//https://openweathermap.org/current
//https://home.openweathermap.org/api_keys