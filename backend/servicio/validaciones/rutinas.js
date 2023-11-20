import Joi from 'joi'

export const validarRutina = rutina => {

    const rutinaSchema = Joi.object({

        nombre: Joi.string().alphanum().required(),
        alumno: Joi.string().alphanum().required(),
        nivel: Joi.string().alphanum().required(),
       
    });
    

    const {error} = rutinaSchema.validate(rutina)
    if(error) {
        return { result : false, error }
    } 
    return {result: true}




}