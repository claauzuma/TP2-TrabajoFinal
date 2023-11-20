import Joi from 'joi'

export const validar = profesor => {

    const profesorSchema = Joi.object({
        //se le pasa el objeto validador
        nombre: Joi.string().alphanum().required(), 
        apellido: Joi.string().alphanum().required(), 
        dni: Joi.string().alphanum().required(), 
        email: Joi.string().alphanum().required(), 
        contraseña: Joi.string().alphanum().required(), 
    })

    const {error} = profesorSchema.validate(profesor)
    if(error) {
        return { result : false, error }
    } 
    return {result: true}




}