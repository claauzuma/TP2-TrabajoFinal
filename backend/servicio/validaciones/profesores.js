import Joi from 'joi'

export const validarProfesor = profesor => {

    const profesorSchema = Joi.object({
        nombre: Joi.string().alphanum().required(),
        apellido: Joi.string().alphanum().required(),
        dni: Joi.string().alphanum().required(),
        email: Joi.string().email().required(), 
        contraseña: Joi.string().alphanum().required()
   
    });
    

    const {error} = profesorSchema.validate(profesor)
    if(error) {
        return { result : false, error }
    } 
    return {result: true}




}