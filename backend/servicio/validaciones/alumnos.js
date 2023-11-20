import Joi from 'joi'

export const validarAlumno = alumno => {

    const alumnoSchema = Joi.object({
        //se le pasa el objeto validador
        nombre: Joi.string().alphanum().required(), 
        apellido: Joi.string().alphanum().required(), 
        dni: Joi.string().alphanum().required(), 
        email: Joi.string().alphanum().required(), 
        contraseña: Joi.string().alphanum().required(), 
        ingreso: Joi.string().alphanum().required(), 
        plan: Joi.string().alphanum().required(), 
        
    })

   
    const {error} = alumnoSchema.validate(alumno)
    if(error) {
        return { result : false, error }
    } 
    return {result: true}




}