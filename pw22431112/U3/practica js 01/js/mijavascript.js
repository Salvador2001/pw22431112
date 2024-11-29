let variable = "valor";
const CONSTANTE = "VALOR";
function miFuncion(){
	return 2*2;
}
console.log(miFuncion());
const functionFlecha = (a = 10) => {	// funcion anónima
	return 2*a;
}
console.log(functionFlecha(7));

//	Destructuring - destructurar
//	Objetos
const usuarios = {
	nombre: 'Martin',
	apellido 'Nevarez'
}
//let nombre = usuarios.nombre;
//let apellido = usuarios.apellido;
const { nombre, apellido } = usuarios;
console.log(nombre+" "+apellido);
//	Otro objeto
const usuarios2 = {
	nombre: 'Martin',
	apellido 'Nevarez',
	redes: {
		sociales: {
			twx = '@miusuario',
			face: '@miface'
		}
	}
}

//const face = usuarios2.redes.sociales.face;
//const {twx,face} = usuarios2.redes.sociales;
//console.log(twx+" "+face);
const { redes:{sociales:{twx}} } = usuarios2;
console.log(twx);

// Arreglos
const arregloNombres=['Juan', 'Ernesto', 'Omar'];
//let nombre1 = arregloNombres[0];
//let nombre3 = arregloNombres[2];
const [ nombre1, ,nombre3 ] = arregloNombres;
console.log(nombre1+" "+nombre3);

//	Combinaciones
//	Objetos
const usuarios3 = {
	direccion: 'conocida',
	numerocasa: '300'
}
// propagación de campos, los tres puntos combina todos los objetos.
const nuevoObjeto = {...usuarios2, ...usuarios3};
console.log(nuevoObjeto);

//	Arreglos
const arregloApellidos = ['Perez','Lopez','Gomez'];
//const nuevoArreglo = [arregloNombres,arregloApellidos];
const nuevoArreglo = [...arregloNombres,...arregloApellidos];
console.log(nuevoArreglo);
const otroNuevoArreglo = arregloNombres.concat(arregloApellidos);
console.log(otroNuevoArreglo);

//	foreach, for, map, reduce <--- iterar arreglos
for(let i=0; i<nuevoArreglo.length; i++){
	console.log(nuevoArreglo[i]);
}

nuevoArreglo.forEach(function(nombre){
	console.log(nombre)
})

let numeros = [1,2,3,4,5];
let suma = 0;
numeros.forEach(function(numero){
	suma += numero;
})
console.log(suma);

// Map <--- recorre todos los elementos para regresar un arreglo
let precios=[10,20,30,40,50];
const conversion = 0.85;
let preciosnuevos = precios.map(function(precio){
	return precio * conversion;
});
console.log(preciosnuevos);

//	Reduce <-- Recorre todos los elementos para regresar un resultado
let sumaPrecios = precios.reduce(function(suma,precio){
	return suma + precio;
},0);
console.log(sumaPrecios);

//	Clases
class Animal{
	constructor(nombre){
		this.nombre = nombre;
	}
	habla(){
		console.log(`Este ${this.nombre} hace ruido`);
	}
}
class Perro extends Animal{
	habla(){
		console.log(`Mi perro ${this.nombre} ladra`);
	}
}
const perro = new Perro('Hunter');
perro.habla();

//	comentar arriba todo

//	Clousures
const variablefuncion = function(){
	return "¡Hola!";
}
console.log(variablefuncion());

const saludo = "¡Hola";
function externa(){
	const persona = ' Martin ';
	function interna(){
		const fin = 'Nevarez!';
		return saludo+persona+fin;
	}
	return interna;
}

//console.log(externa);
console.log(externa()());
const clousure = externa();
console.log(clousure());

//	Otro ejemplo
const miContador = (function(){	//	clase, pero no es una clase
	let contador = 0;
	function incrementar(){
		return ++contador;
	}
	function decrementar(){
		return --contador;
	}
	function valor(){
		return contador;
	}
	return{
		incrementar,
		decrementar,
		valor
	}
})(); //	<--- ejecutar la función principal
console.log(miContador);
miContador.incrementar();
miContador.incrementar();
miContador.incrementar();
miContador.incrementar();
miContador.decrementar();
conole.log(miContador.valor());

//	Promesas
//	Páginas Dinámicas <--- acceso a datos (internos, externos)
//	Kb <----- externas, internas -----> MB or GB
let datos = [
	{
		id: 1,
		materia:'PW',
		semestre: 6
	},
	{
		id: 2,
		materia: 'POO',
		semestre: 1
	},
	{
		id: 3,
		materia: 'Estructura de datos',
		semestre: 2
	}
];

// datos = [];
//console.log(datos);

//	función que simula obtener datos de un servidor remoto
const obtenerDatos = () => { //	arrow function
	return new Promise((resolve, reject) => {
		if (datos.length === 0){
			reject(new Error("Datos está vacío"));
		}

		setTimeout(() => {
			resolve(datos);
		},1500);	//milisegundos
	})
}
//	Función async debe esperar a que termine de obtener la información
async function procesarDatos(){
	try{
		const misdatos = await obtenerDatos();
		console.log(misdatos);
	}catch(err){
		console.log(err.message);
	}
}
procesarDatos();
//console.log(obtenerDatos());

