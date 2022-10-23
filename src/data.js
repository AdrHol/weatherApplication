import render from "./render";

const serverData = {
    fetchWeather: function([latitude, longitude]) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aeb5a5b9131ac1f1213c966761c4167e&units=metric`
        fetch(url, {mode: "cors"})
            .then(function(data){
                return data.json();
            })
            .then(function(data){
                currentData.current = data;
            })
            .then(function(){
                render.data();
            })
            .catch(function(err){
                console.log(err);
            })
    },
    fetchByCity(name){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=aeb5a5b9131ac1f1213c966761c4167e&units=metric`;
        fetch(url, {mode: "cors"})
            .then(function(response){
                if(response.status === 404){
                    throw alert('City not found');
                } 
                return response.json();  
            })
            .then(function(data){
                currentData.current = data;
            })
            .then(function(){
                render.data();
            })
            .catch(function(err){
                console.log(err);
            })
    }
}


const currentData = {
    current: undefined,
    currentUnit: 0,
    

    getData(){
      const temp = `${Math.round(this.current.main.temp)} \u2103`;
      const feel = `${Math.round(this.current.main["feels_like"])} \u2103`;
      const desc = this.current.weather[0].description;
      const wind = `${this.current.wind.speed} km/h`;
      const sunriseTimestamp = new Date(this.current.sys.sunrise * 1000);
      const sunsetTimestamp = new Date(this.current.sys.sunset * 1000);
      const sunrise = getTime(sunriseTimestamp);
      const sunset = getTime(sunsetTimestamp);
        
    function getTime(time){
        let result = '';
        if(time.getHours() < 10){
            result += '0';
            result += time.getHours();
            if(time.getMinutes() < 10){
                result += ':0';
                result += time.getMinutes()
            } else if(time.getMinutes() >= 10) {
                result += ':';
                result += time.getMinutes();
            }
        } else if (time.getHours() > 10){
            result += time.getHours();
            if(time.getMinutes() < 10){
                result += ':0';
                result += time.getMinutes()
            } else if(time.getMinutes() >= 10) {
                result += ':';
                result += time.getMinutes();
            };
        }
        return result;
    }
        return {
            temp,
            feel,
            desc,
            wind,
            sunrise,
            sunset
        }
    },

    unitChange(){
        const temp = document.querySelector('#temp-value');
        const feel = document.querySelector('#feels-value');
        const metricButton = document.querySelector('button#unit-change');
        let celTemp = this.current.main.temp;
        let celFeel = this.current.main.feels_like;
        if(this.currentUnit === 0){
            temp.textContent = Math.round(((celTemp * 9) / 5 ) + 35) + `\u2109`;
            feel.textContent = Math.round(((celFeel * 9) / 5 ) + 35) + `\u2109`;
            metricButton.textContent = "C";
            this.currentUnit = 1;
        } else if (this.currentUnit === 1 ){
            temp.textContent = Math.round(celTemp) + `\u2103`;
            feel.textContent = Math.round(celFeel) + `\u2103`;
            metricButton.textContent = 'F';
            this.currentUnit = 0;
        }
    }
}

export default {
    serverData: serverData,
    currentData: currentData,
}

