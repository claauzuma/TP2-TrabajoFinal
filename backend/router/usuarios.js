import express from 'express'
import ControladorUsuarios from '../controlador/usuarios.js'


class Router {
    constructor(persistencia) {
        this.router = express.Router()
        this.controladorUsuarios = new ControladorUsuarios(persistencia)
        
    }

    start() {
      

        this.router.get('/profesores', this.controladorUsuarios.obtenerProfes)
        this.router.get('/alumnos', this.controladorUsuarios.obtenerAlumnos)
        this.router.get('/admin/clases/:id', this.controladorUsuarios.obtenerUsuariosDeClase)

        this.router.post('/login', this.controladorUsuarios.logearUsuario)
        this.router.post('/alumnos/agregar', this.controladorUsuarios.agregarAlumno)
        this.router.post('/profesores/agregar', this.controladorUsuarios.agregarProfesor)
        this.router.post('/clases/agregar/:id', this.controladorUsuarios.inscribirAClase)

        this.router.put('/:id', this.controladorUsuarios.modificarUsuario)

        this.router.delete('/clases/desuscribir/:id', this.controladorUsuarios.desuscribirseDeClase)
        this.router.delete('/:id', this.controladorUsuarios.borrarUsuario)
    


        return this.router
    }
}

export default Router
