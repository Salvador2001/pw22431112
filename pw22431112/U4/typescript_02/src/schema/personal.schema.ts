import { z } from 'zod';

const telefonoRegEx = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)
// const nombreRegEx = new RegExp(
//     /^(A-Z|a-z{200})+$/
// )

//  Validaciones con zod - construir schema
export const personalSchema = z.object({
    nombre: z.string().min(2, "Mínimo 2 caracteres").max(200, "Máximo 200 caracteres"),
    direccion: z.string().min(2).max(300),
    //telefono: z.string().min(10).max(15),
    telefono: z.string().regex(telefonoRegEx),
    estatus: z.number().int().positive()
    //estatus: z.number().int().positive().min(1).max(2, "Los valores correctos son 1 y 2")
}).refine(data => data.direccion == "TEC DE CULIACAN", {
    message: "La dirección debe ser del Tec de Culiacán",
    path: ["direccion"]
}).refine(data => data.estatus <=2, {
    message: "Los valores correctos son 1(vigente) y 2(baja)",
    path: ["estatus"]
}).or(
    z.object({
        telefono: z.string().min(10).max(15)
    })
).or(
    z.object({
        id: z.number().int().positive().min(1).max(9999)
    })
)