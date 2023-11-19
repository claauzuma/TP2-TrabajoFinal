import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
export const loginStore = defineStore('login', {
    state: () => {
        return {
            usuario: {},
            estaLogeado: false,
            esAdmin: false,
            esAlumno: true,
            esAlumnoBasico: false,
            esAlumnoPlatino: false,
            esAlumnoOro: false,
            esProfe: false,
            idLogeado: 0
        }
    },
    actions: {
        async login(usuario) {
            try {
                const datos = await axios.post("http://localhost:3000/login", usuario);
                console.log(datos.data.email);
                if (datos.status == 200) {
                    const decryptedToken = jwtDecode(datos.data.token)
                    this.esAdmin = decryptedToken.rol == 'admin';
                    this.esProfe = decryptedToken.rol == 'profe';
                    this.esAlumno = decryptedToken.rol == 'alumno';
                    this.idLogeado = decryptedToken.id;
                    this.esAlumnoBasico = decryptedToken.plan == 'basico';
                    this.esAlumnoPlatino = decryptedToken.plan == 'platino';
                    this.esAlumnoOro = decryptedToken.plan == 'oro';
                    this.estaLogeado = true;
                    this.usuario.email = usuario.email;
                    this.usuario.password = usuario.password;
                    this.usuario.id = decryptedToken.id;
                    this.usuario.plan = decryptedToken.plan;

                    localStorage.setItem('usuario', JSON.stringify(
                        { email: usuario.email, token: datos.data.token }))
                } else {
                    this.estaLogeado = false;
                }
            } catch (e) {
                console.log(e);
            }
        },
       

        logout() {
            try {
                this.estaLogeado = false;
                this.idLogeado = 0;
                this.usuario = {};
            } catch (e) {
                console.log(e);
            }
        },

        async agregarUsuario(usuario) {
            try {
            console.log("2da parte hecha")
            const datos = await axios.post("http://localhost:3000/usuarios/agregar", usuario);
            } catch (e) {
                console.log(e);
            }
        },
        async editarUsuario(id, usuario) {
            try {
            console.log("editando usuario")
            const datos = await axios.put("http://localhost:3000/alumnos/"+id, usuario);
            } catch (e) {
                console.log(e);
            }
        },
        async editarRutina(id, rutina) {
            try {
            console.log("editando rutina")
            const datos = await axios.put("http://localhost:3000/rutinas/"+id, rutina);
            console.log(" rutina editada - user store")
            } catch (e) {
                console.log(e);
            }
        },
        async cargarDatos(objetos) {
            try {
            const response = await axios.get("http://localhost:3000/"+objetos);
            return response.data;
            } catch (e) {
                console.log(e);
            }
        },
        async addObject(objeto,objetos) {
            try {
            const datos = await axios.post("http://localhost:3000/"+objetos+"/agregar",objeto);
            } catch (e) {
                console.log(e);
            }
        },
        async insicribirseAClase(idClase, usuario) {
        
            console.log("Hasta aca va bien " +idClase + this.usuario.id)
            const datos = await axios.post("http://localhost:3000/clases/agregar/"+idClase,this.usuario);
           
        },
        async desuscribirseAClase(idClase) {
        
            console.log("desuscribirse " +idClase + this.usuario.id)
            const datos = await axios.delete("http://localhost:3000/clases/desuscribir/"+idClase, this.usuario);
            
           
        },

        suscritoAClase(idClase){
        const datos = axios.get("http://localhost:3000/clase/"+idClase,this.usuario.id)
        return datos.data
        },

        async eliminarObjeto(objeto,id) {
        console.log("Segunda parte esta bien" +objeto+id)
        const datos = await axios.delete("http://localhost:3000/"+objeto+"/"+id);


        },

        

    }
})
