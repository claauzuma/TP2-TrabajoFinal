import Joi from 'joi'

export const validarClase = clase => {

    const claseSchema = Joi.object({

        descripcion: Joi.string().alphanum().required(),
        profesor: Joi.string().alphanum().required(),
        horario: Joi.string().alphanum().required(),
       
    });
    

    const {error} = claseSchema.validate(clase)
    if(error) {
        return { result : false, error }
    } 
    return {result: true}




}