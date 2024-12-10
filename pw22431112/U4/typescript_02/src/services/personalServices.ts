import { Personal, PersonalNuevo } from '../typesPersonal';
import mysql from 'mysql2/promise';

const conexion = mysql.createPool({
    host: "localhost",
    user:"pw",
    password: "pw123456",
    database: "pw2024"
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
        const [results] = await conexion.query('SELECT * FROM personal WHERE id = ? LIMIT 1', id);
        return results;
    }catch(err){
        return {error: "No se encuentra ese personal"};
    }
}

export const agregarPersonal = async (nuevo:PersonalNuevo) =>{
    try{
        const [results] = await conexion.query('INSERT INTO personal(nombre, direccion, telefono, estatus) values (?,?,?,?)', [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.estatus]);
        return results;
    }catch(err){
        return {error: "No se puede agregar al personal"}
    }
}

export const modificarPersonal = async (modificado: Personal) =>{
    try{
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