import './style.css';
import geodata from './geoModule';
import render from './render';

window.addEventListener('load', function(e){
    render.landingPage();
    geodata.setInitialPosition();
})