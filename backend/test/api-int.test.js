import { expect } from 'chai';
import supertest from 'supertest';
import { generarAlumno } from './generador/alumnos.js';
import { generarRutina } from './generador/rutinas.js';
import Server from '../server.js'; 

describe('Test API para agregar usuarios y rutinas', () => {
  describe('POST para agregar usuario', () => {
    it('debería incorporar un usuario', async () => {
      const server = new Server(8081, 'MONGODB');
      const app = await server.start();
      const request = supertest(app);

      const usuario = generarAlumno(); 

      const response = await request.post('/api/usuarios/alumnos').send(usuario);
      expect(response.status).to.eql(200);

      const usuarioAgregado = response.body;
      expect(usuarioAgregado).to.include.keys(
        'nombre',
        'apellido',
        'dni',
        'email',
        'contraseña',
        'ingreso',
        'plan'
      );
      

      await server.stop();
    });
  });

  describe('POST para agregar rutina', () => {
    it('debería incorporar una rutina', async () => {
      const server = new Server(8081, 'MONGODB');
      const app = await server.start();
      const request = supertest(app);

      const rutina = generarRutina();

      const response = await request.post('/api/rutinas/agregar').send(rutina);
      expect(response.status).to.eql(200);

      const rutinaAgregada = response.body;
      expect(rutinaAgregada).to.include.keys(
        'descripcion',
        'nombreAlumno',
        'dniAlumno',
        'nivel'
      );
      

      await server.stop();
    });
  });

  describe('Test API para agregar usuarios y rutinas', () => {
    describe('POST para agregar usuario', () => {
      it('debería manejar un caso "no feliz"', async () => {
        const server = new Server(8081, 'MONGODB');
        const app = await server.start();
        const request = supertest(app);
  
        const usuario = {
          // omitimos el campo 'email'
          nombre: 'NombreEjemplo',
          apellido: 'ApellidoEjemplo',
          dni: '12345678',
          contraseña: 'contraseña123',
          ingreso: 'ingreso123',
          plan: 'plan123'
        };
  
        const response = await request.post('/api/usuarios').send(usuario);
        expect(response.status).to.not.eql(200); // Esperamos un estado diferente a 200
  
        await server.stop();
      });
    });
  });  
});
