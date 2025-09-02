const Base_url=`https://api.openweathermap.org/data/2.5/weather?q=&appid=c88d0aa7c794bd3a7092be9b6cddf88e`

const inputCity=document.querySelector("input")

const searchBtn=document.querySelector(".search-logo")

const tempLogo=document.querySelector(".WeatherLogo")
const temp=document.querySelector(".temperature")
const city=document.querySelector(".city")
const humidity=document.querySelector("#humidity")
const wind=document.querySelector("#wind")


const weatherimg =(present)=>{
    tempLogo.innerHTML=`<img src="weather-app-img/images/${present}.png" alt=""></img>`

}

const getDetails= async (e)=>{
    e.preventDefault()
    
    let cityName=inputCity.value
    console.log(cityName)
    if(inputCity.value===""){
        alert("enter any city name")
    }
    else{
        
        try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c88d0aa7c794bd3a7092be9b6cddf88e`)
        if (response.status>=100 && response.status<200){
            throw new Error("informational response (100-199), please try again later.")
        }
        else if (response.status>=400 && response.status<500){
            throw new Error(`client error (${response.status}) - check city name`)
        }
        else if (response.status>=500 && response.status<600){
            throw new Error(`server error (${response.status}) - try again later`)
        }

        let data= await response.json()
        let temperature=(data.main.temp-273).toFixed(2)
        temp.innerText=`${temperature}°C`
        city.innerText=cityName
        let humid= data.main.humidity
        humidity.innerText=`${humid}%`
        let windSeepd=(data.wind.speed*3.6).toFixed(2)
        wind.innerText=`${windSeepd} kmph`
        let present = data.weather[0].main.toLowerCase()
        weatherimg(present)
    }
    catch(error){
        //console.error('Error fetching weather:', error.message)
        alert(error.message)
    }

    }
}

searchBtn.addEventListener("click", (e)=>{
    getDetails(e)
})
inputCity.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){
        getDetails(e)
    }
})
