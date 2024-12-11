import { Personal, PersonalNuevo } from '../typesPersonal';
import mysql from 'mysql2/promise';
import { personalSchema } from '../schema/personal.schema';

const conexion = mysql.createPool({
    host: "localhost",
    user:"pw",
    password: "pw123456",
    database: "pw2024",
    port: 3306,
    multipleStatements: false
});

export const obtienePersonal = async () =>{
    try{
        const [results] = await conexion.query('SELECT * FROM personal');
        return results;
    }catch(err){
        return {error: "No se puede obtener el personal"};
    }
}

export const encuentraPersonal = async (id:number) =>{
    try{
        const identificador = {id: id}
        const validacion = personalSchema.safeParse(identificador);
        if (!validacion.success){
            return {error: validacion.error}
        }
        const [results] = await conexion.query('SELECT * FROM personal WHERE id = ? LIMIT 1', id);
        return results;
    }catch(err){
        return {error: "No se encuentra ese personal"};
    }
}

//  RECOMENDACIONES API
//  1. No permitir múltiples ejecuciones de consultas
//  http://localhost:3001/api/personal/telefono/1234567890';delete from personal--
//  'SELECT * FROM personal WHERE telefono='1234567890';delete from personal-- AND estatus=1'
//
//  2. No usar interpolación de variables, usar el código que viene por defecto en la
//  documentación de la ejecución de las consultas.
//  SELECT * FROM personal WHERE telefono='${telefono}' AND estatus=1
//  
//  3. Validar los input: Zod está bien, pero mejorarlo con refine y con RegEx
//  RegEx = expresiones regulares -> fórmulas para validar entradas
//  
//  4. Permitir una lista blanca
//  Valores que sí son permitidos
export const encuentraPersonalTelefono = async (telefono:string) =>{
    try{    
        // const consulta = `SELECT * FROM personal WHERE telefono=${telefono} AND estatus=1`;
        // "select * from personal where telefono='"+telefono+"'"
        // const [results] = await conexion.query(consulta);
        const tel = {telefono: telefono}
        const validacion = personalSchema.safeParse(tel);
        if (!validacion.success){
            return {error: validacion.error}
        }
        const [results] = await conexion.query('SELECT * FROM personal WHERE telefono = ? AND estatus=1', telefono);
        return results;
    }catch(err){
        return {error: "No se puede encontrar al personal con ese número de teléfono"}
    }
}

export const agregarPersonal = async (nuevo:PersonalNuevo) =>{
    try{
        const validacion = personalSchema.safeParse(nuevo);
        if (!validacion.success){
            return {error: validacion.error}
        }
        const [results] = await conexion.query('INSERT INTO personal(nombre, direccion, telefono, estatus) values (?,?,?,?)', [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.estatus]);
        return results;
    }catch(err){
        return {error: "No se puede agregar al personal"}
    }
}

export const modificarPersonal = async (modificado: Personal) =>{
    try{
        // const validacion = personalSchema.safeParse(modificado);
        // if (!validacion.success){
        //     return {error: validacion.error}
        // } ^^ falta validar id
        const [results] = await conexion.query('UPDATE personal SET nombre=?, direccion=?, telefono=?, estatus=? WHERE id=?', [modificado.nombre, modificado.direccion, modificado.telefono, modificado.estatus, modificado.id]);
        return results;
    }catch(err){
        return {error: "No se puede modificar"}
    }
}

export const borrarPersonal = async (id: Number) =>{
    try{
        const [results] = await conexion.query('DELETE FROM personal WHERE id=?', [id]);
        return results;
    }catch(err){
        return {error: "No se puede borrar el personal"}
    }
}