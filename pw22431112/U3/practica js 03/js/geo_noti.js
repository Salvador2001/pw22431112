let info=document.querySelector("#info")
function obtenerUbicacion(){
	navigator.geolocation.getCurrentPosition(function(posicion){
		const lat=posicion.coords.latitude
		const lon=posicion.coords.longitude;
		info.textContent = `Latitud: ${lat} - longitud ${lon}`;
	},function(error){
		console.log(error.message);
	});
}
let boton = document.querySelector("#ubicacion");
boton.addEventListener("click", () => {
	obtenerUbicacion();
})

//	Notificación
const notificar = () => {
	Notification.requestPermission()
	.then(permission =>{
		//	Si permitió las notificaciones
		if(permission == 'granted'){
			new Notification("Coordenadas obtenidas");
		}
	})
}