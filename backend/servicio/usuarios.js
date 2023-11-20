//import ModelMem from '../model/DAO/productosMem.js'
//import ModelFile from '../model/DAO/productosFile.js'

import ModelFactory from "../model/DAO/usuariosFactory.js"
import { validarAlumno } from "./validaciones/alumnos.js"
import { validarProfesor } from "./validaciones/profesores.js"


class Servicio {
    constructor(persistencia) {
        //this.model = new ModelMem()
        //this.model = new ModelFile()
        this.model = ModelFactory.get(persistencia)
    }

    obtenerUsuarios = async id => {
        const usuarios = await this.model.obtenerUsuarios(id)
        return usuarios
    }   

    obtenerProfes = async id => {
        const usuarios = await this.model.obtenerUsuarios(id)
        const profes = usuarios.filter(u => u.rol =="profe")
        return profes
    }   

    obtenerAlumnos = async id => {
        const usuarios = await this.model.obtenerUsuarios(id)
        const alumnos = usuarios.filter(u => u.rol =="alumno")
        return alumnos
    }   

    obtenerUsuariosDeClase = async idClase => {
        const inscriptos = await this.obtenerAlumnos()
        const usuariosDeClase = inscriptos.filter(alumno => alumno.idClase === idClase)
        return usuariosDeClase
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
            const usuarios = this.obtenerUsuarios();
            alumno.id = parseInt(usuarios[usuarios.length - 1]?.id || 0) + 1;
            
            const alumnoAgregado = await this.model.agregarUsuario(alumno)
            return alumnoAgregado

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

            const profeAgregado = await this.model.agregarUsuario(profesor)
            return profeAgregado

        }
        else {
            console.log(res.error)
            throw res.error

        }

    }


    inscribirAClase = async (idClase, usuario) => {
 
        //busco la clase
        const clases = this.obtenerClases()
        const clase = clases.find(c=>c.id == idClase)

        const inscriptosAClases = this.obtenerInscriptosAClases()
        const usuarioInscripto = inscriptosAClases.filter(i=>i.idClase==idClase&&i.idUsuario==usuario.id)
        
        if (clase.anotados < clase.capacidad && usuarioInscripto == null)
        {
              //Creo objeto clase y usuario
            const claseYUsuario = {idClase: idClase, idUsuario: usuario.id}
            inscriptosAClases.push(claseYUsuario)
            clase.anotados++
            res.status(200).json({message:'bien'})

        }
        else {
            throw new Error('Error')
        }

        return usuarioActualizado
    }
 
    modificarUsuario = async (id, usuario) => {
        const usuarioActualizado = await this.model.actualizarUsuario(id,usuario)
        return usuarioActualizado
    }

    borrarUsuario = async id => {
        const usuarioBorrado = await this.model.borrarUsuario(id)
        return usuarioBorrado
    }
}

export default Servicio