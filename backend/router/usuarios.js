import express from 'express'
import Controlador from '../controlador/usuarios.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
      
        this.router.get('/lista/:id?', this.controlador.obtenerUsuarios)
        this.router.put('/:id', this.controlador.modificarUsuario)
        this.router.post('/login', this.controlador.logearUsuario)
        this.router.post('/', this.controlador.agregarUsuario) //Por parte del admin
        this.router.delete('/:id', this.controlador.borrarUsuario)
        return this.router
    }
}

export default Router
