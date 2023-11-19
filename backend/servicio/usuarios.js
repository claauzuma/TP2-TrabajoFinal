//import ModelMem from '../model/DAO/productosMem.js'
//import ModelFile from '../model/DAO/productosFile.js'


class Servicio {
    constructor() {
        //this.model = new ModelMem()
        //this.model = new ModelFile()
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    obtenerUsuarios = async id => {
        const usuarios = await this.model.obtenerUsuarios(id)
        return usuarios
    }   

    agregarUsuario = async usuario => {
        const usuarioAgregado = await this.model.agregarUsuario(usuario)
        return usuarioAgregado
    }

    modificarUsuario = async (id, usuario) => {
        const usuarioActualizado = await this.model.modificarUsuario(id,usuario)
        return usuarioActualizado
    }

    borrarUsuario = async id => {
        const usuarioBorrado = await this.model.borrarUsuario(id)
        return usuarioBorrado
    }
}

export default Servicio