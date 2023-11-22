import Joi from 'joi'

export const validarRutina = rutina => {

    const rutinaSchema = Joi.object({

        descripcion: Joi.string().alphanum().required(),
        nombreAlumno: Joi.string().alphanum().required(),
        dniAlumno: Joi.string().alphanum().required(),
        nivel: Joi.string().alphanum().required(),
       
    });
    

    const {error} = rutinaSchema.validate(rutina)
    if(error) {
        return { result : false, error }
    } 
    return {result: true}




}