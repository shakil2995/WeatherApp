function errorHandler(errorCode){
    switch (errorCode){
        case "hideElem":
            console.log("hideElem")
            document.getElementById("weather").style.display = "none";
            console.log('hidden called');
            break;
        case "showElem":
            console.log("showElem")
            document.getElementById("weather").style.display = "block";
            console.log('error show called');
            break;
        case "showError":
            console.log("showError")
            document.getElementById("weather").style.display = "none";
            document.getElementById("error").style.display = "block";
            document.getElementById("error").textContent = "Location not found. Please search again";
            break;
        case "hideError":
            console.log("hideError")
            document.getElementById("error").style.display = "none";
            break;
        case "showUnavailable":
            console.log("showUnavailable")
            document.getElementById("weather").style.display = "block";
            document.getElementById('setLocation').textContent="Weather for "+document.getElementById("get_location").value;
            document.getElementById('temp').textContent="Temperature : unavailable";
            document.getElementById('feelsLike').textContent="Feels Like : unavailable";
            document.getElementById('locationName').textContent= "Location : unavailable";
            document.getElementById('windSpeed').textContent= "Wind speed : unavailable";
            document.getElementById('condition').textContent="Condition : unavailable";
            changeBackgroundUsingApiData("sunny");
        }
}
    async function getWeather(status){
        let location=status;
        if(status!="dhaka")
        {
            location = document.getElementById("get_location").value;
        }
        errorHandler("hideError");
        if(!isNaN(location))
        {
            console.log('returning')
            errorHandler("hideElem")
            errorHandler("showError")
            return 0; 
        }
        const weatherApi_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=398e310b24f291b753fabdb60b31cc14`
        const response = await fetch (weatherApi_url);
        const data = await response.json();
        console.log(typeof(data.name))
        try{
            if(data.cod=="401")
                {errorHandler("showUnavailable")
                throw new SyntaxError("Api not working");
             }
            else if (data.cod=="404"){
                errorHandler("showError")
                throw new SyntaxError("location not found");
            }
            
        }
        catch(err){
            console.log("json error " + err)
            errorHandler("showError")
        }
        let locationIcon = document.querySelector('.weather-icon');
        locationIcon.innerHTML =`<img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png>`;
        document.getElementById('setLocation').textContent="Weather for "+data.name;
        document.getElementById('temp').textContent="Temperature : "+Math.round(data.main.temp)+'°C';
        document.getElementById('feelsLike').textContent="Feels Like : "+Math.round(data.main.feels_like)+'°C';
        document.getElementById('locationName').textContent="Location : "+ data.name;
        document.getElementById('windSpeed').textContent="Wind speed : " +data.wind.speed+' Km/h';
        document.getElementById('condition').textContent="Condition : " + data.weather[0].main;
        changeBackgroundUsingApiData(data.weather[0].id);
        errorHandler("showElem")
    }
    function changeBackgroundUsingApiData(weatherStatus){

        if (weatherStatus>=200 && weatherStatus<300){
            document.body.style.backgroundImage = "url('img/thunderstorm.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus>=300 && weatherStatus<400){
            document.body.style.backgroundImage = "url('img/drizzle.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus>=500 && weatherStatus<600){
            document.body.style.backgroundImage = "url('img/drizzle.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus>=600 && weatherStatus<700){
            document.body.style.backgroundImage = "url('img/snow.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus>=700 && weatherStatus<800){
            document.body.style.backgroundImage = "url('img/haze.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus==800){
            document.body.style.backgroundImage = "url('img/clear.jpg')";
            document.body.style.color = "white"
            }
        else if (weatherStatus>800 && weatherStatus<=900){
            document.body.style.backgroundImage = "url('img/clouds.jpg')";
            document.body.style.color = "white"
            }
        else {
            console.log("default")
            document.body.style.backgroundImage = "url(img/sunny.jpg)";
            document.body.style.color = "white"
        }
           
    }
    getWeather("dhaka");