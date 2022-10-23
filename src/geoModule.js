import serverData from './data';

const geodata = {
    setInitialPosition() {

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.returnCords, this.defaultCords);
        } else {
            alert('Cant reach user position');
        }
    },
    returnCords(position) {
        serverData.serverData.fetchWeather([position.coords.latitude, position.coords.longitude]);
    },
    defaultCords(){
        alert("You didn't allow us to check your coords. We have settled them for Mumbai.");
        serverData.serverData.fetchWeather(['19.076090', '72.877426']);
    },
}

export default geodata;