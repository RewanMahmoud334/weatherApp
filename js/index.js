
let days=["sunday","Monday","Tuesday","Wednesday","Thursday","Friday","saturday"]
let months=["Jan","Feb","March","April","May","June","July","Aug","Spet","Octoper","Dec"]
let currentDayName=document.getElementById("currentDayName")
let currentDate=document.getElementById("currentDate")
let currentCity=document.getElementById("currentCity")
let currentTemp=document.getElementById("currentTemp")
let currentIcon=document.getElementById("currentIcon")
let currentCondition=document.getElementById("currentCondition")
let humidity=document.getElementById("humidity")
let wind=document.getElementById("wind")
let compass=document.getElementById("compass")
let nextDayName=document.getElementsByClassName("nextDayName")
let nextDayIcon=document.getElementsByClassName("nextDayIcon")
let maxTemp=document.getElementsByClassName("maxTemp")
let minTemp=document.getElementsByClassName("minTemp")
let nextDayCondition=document.getElementsByClassName("nextDayCondition")
let searchCity=document.getElementById("searchCity")





async function weatherApi(city){
let api=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2091499dfabe41ae88a02819232202&q=${city}&days=5`)
   let response=await api.json()
     displayCurrentWeather(response)
     displayNextWeather(response)
}
weatherApi("cairo")




function displayCurrentWeather(response){
    let date =new Date()
    currentDayName.innerHTML=days[date.getDay()]
    currentDate.innerHTML=date.getDate()+ months[date.getMonth()]
    currentCity.innerHTML=response.location.name
    currentTemp.innerHTML=response.current.temp_c +'°c'
    currentIcon.setAttribute("src",`https:${response.current.condition.icon}`)
    currentCondition.innerHTML=response.current.condition.text
    humidity.innerHTML=response.current.humidity;
    wind.innerHTML=response.current.wind_kph
    compass.innerHTML=response.current.wind_dir


}



 function displayNextWeather(response){
    for(let i=0;i<nextDayName.length;i++){
        nextDayName[i].innerHTML=days[new Date(response.forecast.forecastday[i+1].date).getDay()]
        nextDayIcon[i].setAttribute("src",`https:${response.forecast.forecastday[i+1].day.condition.icon}`)
        maxTemp[i].innerHTML=response.forecast.forecastday[i+1].day.maxtemp_c
        minTemp[i].innerHTML=response.forecast.forecastday[i+1].day.mintemp_c
        nextDayCondition[i].innerHTML=response.forecast.forecastday[i+1].day.condition.text
    }

}

searchCity.addEventListener("keyup",function(){
   city= searchCity.value;
   weatherApi(city)
})