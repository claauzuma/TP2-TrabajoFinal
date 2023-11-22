import ModelFactory from "../model/DAO/clasesFactory.js"
import ModelFactoryUsuarios from "../model/DAO/usuariosFactory.js"
import { validarClase } from "./validaciones/clases.js"



class Servicio {
    constructor(persistencia) {
        //this.model = new ModelMem()
        //this.model = new ModelFile()
        this.model = ModelFactory.get(persistencia)
        this.modelUsuarios = ModelFactoryUsuarios.get(persistencia)
    }

    obtenerClases = async id => {
        const clases = await this.model.obtenerClases(id)
        return clases
    }   

    agregarClase = async clase => {

        const res = validarClase(clase)
        try{
            if (res.result) {
                const usuarios = await this.modelUsuarios.obtenerUsuarios();
                const profesorExistente = usuarios.find(u => u.rol == "profe" && u.nombre == clase.nombreProfesor && u.email == clase.emailProfesor)
                if(profesorExistente != null) {
                clase.anotados = 0;
                 
                 const claseAgregada = await this.model.guardarClase(clase)
                 console.log("Se guardo la clase correctamente")
                 return claseAgregada
     
                }
                else {
                 throw "El profesor no existe"
     
                }
     
     
     
             }
             else {
                 console.log(res.error)
                 throw res.error
     
     
             }

        }
        catch(error){
            console.log(error)

        }
      


    }  

    borrarClase = async id => {
        const claseBorrada = await this.model.borrarClase(id)
        return claseBorrada
    }   


   
}

export default Servicio