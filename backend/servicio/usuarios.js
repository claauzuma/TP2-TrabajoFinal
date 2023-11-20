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

    agregarAlumno = async usuario => {
        const res = validarAlumno(usuario)
        if (res.result) {
            const usuarioAgregado = await this.model.agregarUsuario(usuario)
            return usuarioAgregado

        }
        else {
            console.log(res.error)
            throw res.error

        }

    }

    agregarProfesor = async usuario => {
        const res = validarProfesor(usuario)
        if (res.result) {
            const usuarioAgregado = await this.model.agregarUsuario(usuario)
            return usuarioAgregado

        }
        else {
            console.log(res.error)
            throw res.error

        }

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