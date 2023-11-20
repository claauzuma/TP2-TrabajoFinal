import ModelFactory from "../model/DAO/clasesFactory.js"
import { validarClase } from "./validaciones/clases.js"



class Servicio {
    constructor(persistencia) {
        //this.model = new ModelMem()
        //this.model = new ModelFile()
        this.model = ModelFactory.get(persistencia)
    }

    obtenerClases = async id => {
        const clases = await this.model.obtenerClases(id)
        return clases
    }   

    agregarClase = async clase => {

        const res = validarClase(clase)
        if (res.result) {
            const claseAgregada = await this.model.guardarClase(clase)
            return claseAgregada

        }
        else {
            console.log(res.error)
            throw res.error


        }


    }  

    borrarClase = async id => {
        const claseBorrada = await this.model.borrarClase(id)
        return claseBorrada
    }   


   
}

export default Servicio