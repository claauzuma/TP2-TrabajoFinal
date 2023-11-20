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

    obtenerUsuariosDeClase = async (req,res) => {
        const { id } = req.params
        const usuariosDeClase = await this.servicio.obtenerUsuariosDeClase(id)
        res.json(usuariosDeClase)
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

    
    agregarAlumno = async (req,res) => {
        const alumno = req.params
        const alumnoAgregado = await this.servicio.agregarUsuario(alumno)
        res.json(alumnoAgregado)
    }

    agregarProfesor = async (req,res) => {
        const profesor = req.params
        const profesorAgregado = await this.servicio.agregarUsuario(profesor)
        res.json(profesorAgregado)
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

    desuscribirseDeClase = async (req,res) => {
        const { id } = req.params
        const usuarioBorrado = await this.servicio.borrarUsuario(id)
        res.json(estado)
    }


}

export default Controlador
