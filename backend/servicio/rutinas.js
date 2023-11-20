import ModelFactory from "../model/DAO/clasesFactory.js"
import { validarRutina } from "./validaciones/rutinas.js"



class Servicio {
    constructor(persistencia) {
        //this.model = new ModelMem()
        //this.model = new ModelFile()
        this.model = ModelFactory.get(persistencia)
    }

    obtenerRutinas = async id => {
        const rutinas = await this.model.obtenerRutinas(id)
        return rutinas
    }   

    agregarRutina = async rutina => {

        const res = validarRutina(rutina)
        if (res.result) {
            const rutinaAgregada = await this.model.guardarRutina(rutina)
            return rutinaAgregada

        }
        else {
            console.log(res.error)
            throw res.error


        }


    }  

    borrarRutina = async id => {
        const rutinaBorrada = await this.model.borrarRutina(id)
        return rutinaBorrada
    }   


   
}

export default Servicio