import currentData from './data';
import serverData from './data';

const render = {
    landingPage(){
        const body = document.querySelector('body');
        body.innerHTML = 
        `
        <div class="navbar"><div class="logo">Weather App</div></div>
        <div class="container">
        <div class="main">
        <img>
        <div class="location">
            <p class="location-name"></p>
        </div>
        <div class="input">
            <input type="text" class="text-input" name="location" id="location" placeholder="Specify your location" required>
            <button class="button" id="submit-button">Set</button>
        </div>
        <div class="data"></div>
        </div>
        </div>
        `;
        const button = document.querySelector('#submit-button');
        button.addEventListener('click', function(e){
            const input = document.querySelector('input').value;
            serverData.serverData.fetchByCity(input);
        })
        const input = document.querySelector('input');
        input.addEventListener('keypress', function(e){
            if(e.key === 'Enter'){
                button.click();
            }
        })
    },
    data(){
        const cityName = document.querySelector('.location-name');
            cityName.textContent = `${currentData.currentData.current.name}`;
        const background = document.querySelector('.container');
            background.classList = `container ${currentData.currentData.current.weather[0].main}`
        const img = document.querySelector('img');
            img.src = `http://openweathermap.org/img/wn/${currentData.currentData.current.weather[0].icon}@2x.png`
        const dataContainer = document.querySelector('.data');
        const getCurrent = currentData.currentData.getData(); 
            dataContainer.innerHTML = 
            `<ul class="data-params">
            <li class="param">
                <span class="description" id="temp-desc">Temperature:</span><span class="value" id="temp-value">${getCurrent.temp}</span><span>
                <button id="unit-change">F</button>
            </li>
            <li class="param">
                <span class="description" id="feels-desc">It feels like:</span><span class="value" id="feels-value">${getCurrent.feel}</span>
            </li>
            <li class="param">
                <span class="description" id="condition-desc">Condition:</span><span class="value" id="condition-value">${getCurrent.desc}</span>
            </li>
            <li class="param">
                <span class="description" id="wind-desc">Wind speed:</span><span class="value" id="wind-value">${getCurrent.wind}</span>
            </li>
            <li class="param">
                <span class="description" id="sunrise-desc">Sunrise:</span><span class="value" id="sunrise-value">${getCurrent.sunrise}</span>
            </li>
            <li class="param">
                <span class="description" id="sunset-desc">Sunset:</span><span class="value" id="sunset-value">${getCurrent.sunset}</span>
            </li>
            </ul>`
        const metricButton = document.querySelector('button#unit-change');
        metricButton.addEventListener('click', function(e){
            currentData.currentData.unitChange();
        })
    }
}

export default render;