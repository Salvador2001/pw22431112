const url = 'https://randomuser.me/api/?results=12';
let boton=document.querySelector("button");
let lista=document.querySelector("#lista-personas");
/*let foto=document.querySelector("#foto");
let nombre=document.querySelector("#nombre");
let direccion=document.querySelector("#direccion");
let telefono=document.querySelector("#telefono");*/

const agregarPersonasLista = (persona) =>{
	lista.classList.add("lista-personas");
	const tarjeta = document.createElement("article");
	tarjeta.classList.add("tarjeta");

	const foto = document.createElement("img");
	foto.setAttribute("src",persona.picture.large);

	const nombre = document.createElement("article");
	nombre.textContent=persona.name.first+" "+persona.name.last;

	const direccion = document.createElement("article");
	direccion.textContent=persona.location.street.name+" "+persona.location.street.number;

	const telefono = document.createElement("article");
	telefono.textContent=persona.phone;

	tarjeta.appendChild(foto);
	tarjeta.appendChild(nombre);
	tarjeta.appendChild(direccion);
	tarjeta.appendChild(telefono);

	lista.appendChild(tarjeta);
}

const obtenerPersona = () =>{
	//	Limpiar lista de personas
	lista.innerHTML = "";
	fetch(url)
		.then(respuesta => respuesta.json())
		.then(respuesta => {
			//console.log(respuesta);
			respuesta.results.forEach(persona => {
				agregarPersonasLista(persona);
				/*nombre.textContent=persona.name.first+" "+persona.name.last;
				foto.setAttribute("src",persona.picture.large);
				direccion.textContent=persona.location.street.name+" "+persona.location.street.number;
				telefono.textContent=persona.phone;*/
			})
		})
}

boton.addEventListener("click",() => {
	obtenerPersona();
})

obtenerPersona();