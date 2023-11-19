import Servicio from '../servicio/usuarios.js'


class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerUsuarios = async (req,res) => {
        const { id } = req.params
        const usuarios = await this.servicio.obtenerUsuarios(id)
        res.json(usuarios)
    }

    agregarUsuario = async (req,res) => {
        const usuario = req.params
        const usuarioAgregado = await this.servicio.agregarUsuario(usuario)
        res.json(usuarioAgregado)
    }


    logearUsuario = async (req,res) => {
        const usuario = req.body
        const usuarioLogeado = await this.servicio.logearUsuario(usuario)
        res.json(usuarioLogeado)
        //res.redirect('/')
    }

    modificarUsuario = async (req,res) => {
        const { id } = req.params
        const usuario = req.body
        const usuarioModificado = await this.servicio.modificarUsuario(id, usuario)
        res.json(usuarioModificado)
    }

    borrarUsuario = async (req,res) => {
        const { id } = req.params
        const usuarioBorrado = await this.servicio.borrarUsuario(id)
        res.json(usuarioBorrado)
    }
}

export default Controlador
