import express from 'express'
import ControladorUsuarios from '../controlador/usuarios.js'
import ControladorClases from '../controlador/clases.js'
import ControladorRutinas from '../controlador/rutinas.js'
import ControladorNutritionix from '../controlador/nutritionixAPI.js';



class Router {
    constructor(persistencia) {
        this.router = express.Router()
        this.controladorUsuarios = new ControladorUsuarios(persistencia)
        this.controladorClases = new ControladorClases(persistencia)
        this.controladorRutinas = new ControladorRutinas(persistencia)
        this.controladorNutritionix = new ControladorNutritionix()
        
    }

    start() {
      

        this.router.get('/profesores', this.controladorUsuarios.obtenerProfes)
        this.router.get('/alumnos', this.controladorUsuarios.obtenerAlumnos)
        this.router.get('/clases/:id?', this.controladorClases.obtenerClases) 
        this.router.get('/rutinas', this.controladorRutinas.obtenerRutinas)
        this.router.get('/admin/clases/:id', this.controladorUsuarios.obtenerUsuariosDeClase)

        this.router.post('/login', this.controladorUsuarios.logearUsuario)
        this.router.post('/alumnos/agregar', this.controladorUsuarios.agregarAlumno)
        this.router.post('/profesores/agregar', this.controladorUsuarios.agregarProfesor)
        this.router.post('/clases', this.controladorClases.agregarClase)
        this.router.post('/rutinas/agregar', this.controladorRutinas.agregarRutina)
        this.router.post('/clases/agregar/:id', this.controladorUsuarios.inscribirAClase)
        this.router.post('/calorias', this.controladorNutritionix.obtenerEjercicio);

        this.router.put('/:id', this.controladorUsuarios.modificarUsuario)
     /*    this.router.put('/rutinas/:id', this.controladorRutinas.modificarRutina) */

        this.router.delete('/clases/desuscribir/:id', this.controladorUsuarios.desuscribirseDeClase)
        this.router.delete('/usuarios/:id', this.controladorUsuarios.borrarUsuario)
        this.router.delete('/clases/:id', this.controladorClases.borrarClase)
   /*      this.router.delete('/rutinas/:id', this.controladorRutinas.eliminarRutina) */


        return this.router
    }
}

export default Router
