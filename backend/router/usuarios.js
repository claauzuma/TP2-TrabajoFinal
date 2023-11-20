import express from 'express'
import Controlador from '../controlador/usuarios.js'


class Router {
    constructor(persistencia) {
        this.router = express.Router()
        this.controlador = new Controlador(persistencia)
    }

    start() {
      
        this.router.get('/profes', this.controlador.obtenerProfes)
        this.router.get('/alumnos', this.controlador.obtenerAlumnos)
      /*   this.router.get('/clases', this.controlador.obtenerClases)
        this.router.get('/rutinas', this.controlador.obtenerRutinas) */
        this.router.get('/admin/clases/:id', this.controlador.obtenerUsuariosDeClase)

        this.router.post('/login', this.controlador.logearUsuario)
        this.router.post('/alumnos/agregar', this.controlador.agregarAlumno)
        this.router.post('/profesores/agregar', this.controlador.agregarProfesor)
      /*   this.router.post('/clases/agregar', this.controlador.agregarClase)
        this.router.post('/rutinas/agregar', this.controlador.agregarRutina) */
        this.router.post('/clases/agregar/:id', this.controlador.inscribirAClase)

        this.router.put('/usuarios/:id', this.controlador.modificarUsuario)
       /*  this.router.put('/rutinas/:id', this.controlador.modificarRutina) */

        this.router.delete('/clases/desuscribir/:id', this.controlador.desuscribirseDeClase)
        this.router.delete('/usuarios/:id', this.controlador.borrarUsuario)
      /*   this.router.delete('/clases/:id', this.controlador.eliminarClase)
        this.router.delete('/rutinas/:id', this.controlador.eliminarRutina) */


        return this.router
    }
}

export default Router
