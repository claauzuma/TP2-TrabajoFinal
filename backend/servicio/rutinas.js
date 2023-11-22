
import ModelFactoryRutinas from "../model/DAO/rutinasFactory.js"
import ModelFactoryUsuarios from "../model/DAO/usuariosFactory.js"

import { validarRutina } from "./validaciones/rutinas.js"



class Servicio {
    constructor(persistencia) {
        //this.model = new ModelMem()
        //this.model = new ModelFile()
        this.model = ModelFactoryRutinas.get(persistencia)
        this.modelUsuarios = ModelFactoryUsuarios.get(persistencia)
    }

    obtenerRutinas = async id => {
        const rutinas = await this.model.obtenerRutinas(id)
        return rutinas
    }   

    agregarRutina = async rutina => {
        try {
            const res = validarRutina(rutina)
            if (res.result) {
                const usuarios = await this.modelUsuarios.obtenerUsuarios()
                const alumnoExistente = usuarios.find(a => a.rol == "alumno" && a.nombre == rutina.nombreAlumno && a.dni == rutina.dniAlumno)
                const alumnoConRutina = alumnoExistente.tieneRutina
                if (alumnoExistente != null && !alumnoConRutina) {
                    const rutinaAgregada = await this.model.guardarRutina(rutina)
                    alumnoExistente.rutina = rutina.descripcion
                    alumnoExistente.tieneRutina = true;
                    console.log("Se guardo correctamente la rutina del alumno  "+alumnoExistente.nombre)
                    return rutinaAgregada

                }
                else {
                    console.log("No se guardo la rutina")
                    throw "El alumno no existe"
                }



            }
            else {
                console.log(res.error)
                throw res.error


            }

        }
        catch(error) {
            console.log(error)
        }

     


    }  

    modificarRutina = async (id,rutina) => {
        const rutinaActualizada = await this.model.actualizarRutina(id,rutina)
        return rutinaActualizada
    }   

    borrarRutina = async id => {
        const rutinaABorrar = await this.model.obtenerRutinas(id);
        const alumnos = await this.modelUsuarios.obtenerUsuarios();
        const alumnoBuscado = alumnos.find(a => a.nombre == rutinaABorrar.nombreAlumno && a.dni == rutinaABorrar.dniAlumno)
        if (alumnoBuscado != null) {
           alumnoBuscado.rutina =""
           alumnoBuscado.tieneRutina = false;
        }
        const rutinaBorrada = await this.model.borrarRutina(id)

        return rutinaBorrada
    }   


   
}

export default Servicio