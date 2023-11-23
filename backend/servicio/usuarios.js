//import ModelMem from '../model/DAO/productosMem.js'
//import ModelFile from '../model/DAO/productosFile.js'

import ModelFactoryUsuarios from "../model/DAO/usuariosFactory.js"
import ModelFactoryRutinas from "../model/DAO/rutinasFactory.js"
import ModelFactoryClases from "../model/DAO/clasesFactory.js"

import { validarAlumno } from "./validaciones/alumnos.js"
import { validarProfesor } from "./validaciones/profesores.js"


class Servicio {
    constructor(persistencia) {
        //this.model = new ModelMem()
        //this.model = new ModelFile()
        this.model = ModelFactoryUsuarios.get(persistencia)
        this.modelRutinas = ModelFactoryRutinas.get(persistencia)
        this.modelClases = ModelFactoryClases.get(persistencia)
    }

    obtenerUsuarios = async id => {
        if (id) {	
        return await this.model.obtenerUsuarios(id)
        } else{
            const usuarios = await this.model.obtenerUsuarios(id)
            return usuarios
        }
    }   

    obtenerProfes = async id => {
        if (id) {	
            return await this.model.obtenerUsuarios(id)
        } else {
            const usuarios = await this.model.obtenerUsuarios(id)
            const profes = usuarios.filter(u => u.rol =="profe")
            return profes
        }
        
    }   

    obtenerAlumnos = async id => {
        if (id) {	
        return await this.model.obtenerUsuarios(id)
        } else {
            const usuarios = await this.model.obtenerUsuarios(id)
            const alumnos = usuarios.filter(u => u.rol =="alumno")
            return alumnos
        }
        
    }   

    
    obtenerInscriptos = async idClase => {
        const alumnos = this.obtenerAlumnos()
        const inscriptos = [] ;
        
        alumnos.array.forEach(alumno => {

            claseExistente = alumno.clasesInscriptas.find(idClase)
            if(claseExistente != null) {
                inscriptos.push(alumno)
            }
              
    
            });
       
            
        return inscriptos
    }   


    logearUsuario = async usuarioIngresado => {
        const usuarios = await this.model.obtenerUsuarios()
        const userDb = usuarios.find(u => u.email == usuarioIngresado.email && u.password == usuarioIngresado.password)
        if (userDb) {
            const token = jsonwebtoken.sign({
                email: userDb.email, rol: userDb.rol, plan: userDb.plan,
                id: userDb.id
            }, 'clave_secreta')
            res.json({ token: token })
        } else {
            res.status(401).json({ message: 'error' })
        }



    }   

    agregarAlumno = async alumno => {
        const res = validarAlumno(alumno)
        if (res.result) {
            const usuarios = await this.obtenerUsuarios();
            const usuarioExistente = usuarios.find(u => u.email == alumno.email)
            if (usuarioExistente == null) {
                console.log("El email no esta repetido asi que todo ok")
                alumno.rol = "alumno"
                alumno.tieneRutina = false;
                alumno.clasesInscriptas =[]

                const alumnoAgregado = await this.model.guardarUsuario(alumno)
                return alumnoAgregado

            }
            else {
                console.log("El mail ya existe")
            }



        }
        else {
            console.log(res.error)
            throw res.error

        }

    }

    agregarProfesor = async profesor => {
        const res = validarProfesor(profesor)
        if (res.result) {
            const usuarios = this.obtenerUsuarios();
            profesor.id = parseInt(usuarios[usuarios.length - 1]?.id || 0) + 1;
            profesor.rol = "profe"

            const profeAgregado = await this.model.guardarUsuario(profesor)
            return profeAgregado

        }
        else {
            console.log(res.error)
            throw res.error

        }

    }


    inscribirAClase = async (idClase, usuario) => {

       const claseDeUsuario = -1;
       claseDeUsuario = usuario.clasesInscriptas.find(IDclaseInscripta => IDclaseInscripta == idClase)
       if(claseDeUsuario == -1) {
        //busco la clase
        const clases = this.modelClases.obtenerClases();
        const clase = clases.find(c=> c.id == idClase)

        if(clase.anotados < clase.capacidad) {
        usuario.clasesInscriptas.push(clase._id)
        clase.anotados++
        res.status(200).json({message:'bien'})
        }
        else {
            throw new Error('Error en capacidad de clase')

        }

       } else {
        throw new Error('Error, el alumno ya esta inscripto a dicha clase')
    }
}

    desuscribirseDeClase = async (idClase, usuario) => {

    const claseDeUsuario = -1;
    claseDeUsuario = usuario.clasesInscriptas.find(IDclaseInscripta => IDclaseInscripta == idClase)
    if(claseDeUsuario != -1) {
     //Si el id de la clase existe, entonces procedo y busco la clase
     const clases = this.modelClases.obtenerClases();
     const clase = clases.find(c=> c.id == idClase)
     usuario.clasesInscriptas.splice(clase._id,1)
     //a la clase le resto un inscripto
     clase.anotados--
     res.status(200).json({message:'bien'})
     

    } else {
     throw new Error('Error, el alumno no se encuentra inscripto a la clase')
 }
}

 
    modificarUsuario = async (id, usuario) => {
        const usuarioActualizado = await this.model.actualizarUsuario(id,usuario)
        return usuarioActualizado
    }

    modificarEmail = async (id, array) => {
        const nuevoEmail = array[0]
        const contraseñaAComparar = array[1]
        const usuario = this.model.obtenerUsuarios(id)
        const contraseñaCorrecta = usuario.contraseña == contraseñaAComparar
        if (contraseñaCorrecta) {
            usuario.email = nuevoEmail
            return usuario

        }
        else {
            return {}
        }

    }

    modificarContraseña = async (id, array) => {
        const nuevaContraseña = array[0]
        const contraseñaAComparar = array[1]
        const usuario = this.model.obtenerUsuarios(id)
        const contraseñaCorrecta = usuario.contraseña == contraseñaAComparar
        if (contraseñaCorrecta) {
            usuario.contraseña = nuevaContraseña
            return usuario

        }
        else {
            return {}
        }

    }

    borrarUsuario = async id => {
        const usuarioBorrado = await this.model.borrarUsuario(id)
        console.log("Eliminando a " + usuarioBorrado.nombre)

        if(usuarioBorrado.rol == "alumno" && usuarioBorrado.tieneRutina) {
            console.log("Ojo el dibu tiene una rutina ")
            const rutinas = await this.modelRutinas.obtenerRutinas()
            const rutinaABorrar = rutinas.find(r => r.nombreAlumno == usuarioBorrado.nombre && r.dniAlumno == usuarioBorrado.dni)
            if(rutinaABorrar != null) {
                console.log("Eliminamos su rutina tambien entonces")
                await this.modelRutinas.borrarRutina(rutinaABorrar._id)
            }    
        }

        if(usuarioBorrado.rol =="profe") {
            console.log("El usuario borrado es un probe")
            const clases = await this.modelClases.obtenerClases()
            const claseABorrar = clases.find(c=> c.nombreProfesor = usuarioBorrado.nombre && c.emailProfesor == usuarioBorrado.email)
            if(claseABorrar != null) {
                console.log("Borramos la clase de dicho profe")
                await this.modelClases.borrarClase(claseABorrar._id)

            }


        }
         return usuarioBorrado
    }
}

export default Servicio