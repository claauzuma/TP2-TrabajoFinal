import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDB {
    obtenerObjetos = async (id,lista) => {   
        if (!CnxMongoDB.connection) {
            // Si no hay conexión, podrías manejar esto de manera más explícita.
            throw new Error('No hay conexión a la base de datos');
        }
        if(id) {
            const objeto = await CnxMongoDB.db.collection(lista).findOne({_id: new ObjectId(id)})
            return objeto
        }
        else {
            const objetos = await CnxMongoDB.db.collection(lista).find({}).toArray()
            return objetos
        }
    }

    guardarObjeto = async (objeto,lista) => {
        if(!CnxMongoDB.connection) return {}

        await CnxMongoDB.db.collection(lista).insertOne(objeto)
        return objeto
    }

    actualizarObjeto = async (id, objeto, lista) => {
        if(!CnxMongoDB.connection) return {}

        await CnxMongoDB.db.collection(lista).updateOne(
            { _id: new ObjectId(id) },
            { $set: objeto }
        )

        const objetosActualizados = await this.obtenerObjetos(id,lista)
        return objetosActualizados
    }

    borrarObjeto = async (id,lista) => {
        if(!CnxMongoDB.connection) return {}

        const objetoABorrar = await this.obtenerClases(id)
        await CnxMongoDB.db.collection(lista).deleteOne( { _id: new ObjectId(id) })
        return objetoABorrar
    }
}

export default ModelMongoDB