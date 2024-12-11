import { ref } from "vue"
import type { Personal } from "../interfaces/personal-interface"
import personalApi from "../api/personalAPI"

export const usePersonal = () =>{
    const personal = ref<Personal[]>([])
    
    const traePersonal = async () =>{
        const respuesta = await personalApi.get<Personal[]>('/');
        personal.value = respuesta.data
        //personal.value = []
        //console.log(personal.value)
    }

    return{
        personal,
        traePersonal
    }
}