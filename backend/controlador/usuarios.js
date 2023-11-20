import Servicio from '../servicio/usuarios.js'


class Controlador {
    constructor(persistencia) {
        this.servicio = new Servicio(persistencia)
    }

    obtenerProfes = async (req,res) => {
        const { id } = req.params
        const profes = await this.servicio.obtenerProfes(id)
        res.json(profes)
    }

    obtenerAlumnos = async (req,res) => {
        const { id } = req.params
        const alumnos = await this.servicio.obtenerAlumnos(id)
        res.json(alumnos)
    }

    logearUsuario = async (req, res) => {
        const usuario = req.body
        if (req.body) {
            const usuarioLogeado = await this.servicio.logearUsuario(usuario)
            res.json(usuarioLogeado)
            //res.redirect('/')
        }
        else {
            res.status(400).json({ message: 'error' })
        }

    }

    
    agregarUsuario = async (req,res) => {
        const usuario = req.params
        const usuarioAgregado = await this.servicio.agregarUsuario(usuario)
        res.json(usuarioAgregado)
    }


    modificarAlumno = async (req,res) => {
        const { id } = req.params
        const usuario = req.body
        const usuarioModificado = await this.servicio.modificarUsuario(id, usuario)
        res.json(usuarioModificado)
    }

    modificarProfesor = async (req,res) => {
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
