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
        if (req.body) {
            const usuario = req.body
            const usuarioLogeado = await this.servicio.logearUsuario(usuario)
            res.json(usuarioLogeado)
            //res.redirect('/')
        }
        else {
            res.status(400).json({ message: 'error' })
        }

    }


    agregarAlumno = async (req, res) => {
        if (req.body) {
            const alumno = req.body
            const alumnoAgregado = await this.servicio.agregarAlumno(alumno)
            res.json(alumnoAgregado)

        }
        else {
            res.status(404).json({ message: 'falta el body' })
        }

    }

    agregarProfesor = async (req,res) => {
        if (req.body) {
        const profesor = req.body
        const profesorAgregado = await this.servicio.agregarProfesor(profesor)
        res.json(profesorAgregado)
        }
        else {
          res.status(404).json({ message: 'falta el body' })

        }
    }


    inscribirAClase = async (req, res) => {
        if (req.body) {
            const { id: idClase } = req.params
            const usuario = req.body;
            const usuarioInscripto = await this.servicio.inscribirAClase(idClase,usuario)
            res.json(usuarioInscripto)
        }
        else 
        {
            res.status(400).json({message:'error'})
        }

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
        const estado = await this.servicio.borrarUsuario(id)
        res.json(estado)
    }


}

export default Controlador
