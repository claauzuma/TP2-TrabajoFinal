import { faker } from '@faker-js/faker/locale/en'

function generarAlumno() {
  const alumno = {
    nombre: faker.name.firstName(),
    apellido: faker.name.lastName(),
    dni: faker.random.alphaNumeric(8),
    email: faker.internet.email(),
    contraseña: faker.internet.password(),
    ingreso: faker.random.alphaNumeric(6),
    plan: faker.random.alphaNumeric(10),
  };

  return alumno;
}
export { generarAlumno };