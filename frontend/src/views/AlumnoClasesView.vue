<script>
import {IonList,IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonList,IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const {suscritoAClase,insicribirseAClase, desuscribirseAClase,addObject, cargarDatos,agregarUsuario } = store;
    return {suscritoAClase,insicribirseAClase, desuscribirseAClase,addObject, cargarDatos,agregarUsuario, estaLogeado };
  },
  data() {
    return {

      lista: [],
      clase: {},
      profes:[{nombre: "Claudio",id:1},{nombre: "Maria",id:2},{nombre: "Sebastian",id:3}],
      mostrarFormularioFlag: false, // Inicialmente oculto
      showPassword: false
    }
  },
  mounted() {
    this.loadData()
  },
  
  methods: {
    async loadData() {
      try {
        this.lista = await this.cargarDatos("clases")
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
  
        async inscribirse(idClase) {
            try {
                await this.insicribirseAClase(idClase, this.usuario);
                alert("Se agrego correctamente")
                await this.loadData()
                this.$router.push("/alumno/clases")

            }
            catch (ex) {
              alert("Hola")
                alert(ex)
            }


        },

        async desuscribirseAClase(idClase) {
            try {
                await this.desuscribirseAClase(idClase, this.usuario);
                alert("Se desuscribió correctamente")
                await this.loadData()
                this.$router.push("/alumno/clases")
            }
            catch (ex) {
              alert("Error al desuscribirse!")
             
            }
        },

        suscritoAClase(idClase){
        const claseEncontrada = this.suscritoAClase(idClase)
        if(claseEncontrada){
          return false
        }
        return true
        }
        


  }
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <br>
      <br>
      <br>
      <br>
        <!-- Lista de usuarios -->
        <div class="login-text">Grilla de clases</div><br>

        <ion-item v-for="e in lista" :key="e.id">
          <ion-label>Nombre clase: {{ e.nombre }}</ion-label>
          <ion-label>Nombre profe: {{ e.nombreProfe }}</ion-label>
          <ion-label>Horario: {{ e.horario }}</ion-label>
          <ion-label>Capacidad: {{ e.capacidad }}</ion-label>
          <ion-label>Anotados: {{ e.anotados }}</ion-label>
          <ion-button @click="desuscribirseAClase(e.id)">Desuscribirse</ion-button>
          <ion-button @click="inscribirse(e.id)">Incribirse</ion-button>
    
        </ion-item>

    </ion-content>
  </ion-page>
</template>


<style>

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 11px;
  font-size: 24px;
  font-weight: bold;
  color: rgb(78, 78, 78);
  background-color: transparent;
  border: none;
}	

.floating-form {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 520px;
  gap: 11px;
  transform: translate(-50%, -50%);
  background-color: white; /* Fondo transparente */
  padding: 20px;
  border: 2px solid rgba(0, 0, 0, 0.25); /* Borde del formulario */
  border-radius: 12px; /* Mayor radio para la figura circular */
  box-shadow: 0px 0px 21px 2px rgba(0, 0, 0, 0.25);
  z-index: 1; /* Para que aparezca por encima del contenido */
}

.login-text{
  font-weight: bold;
  color: rgb(78, 78, 78);
  font-size: 32px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  min-height: 400px;
  background-color: rgb(235, 235, 235);
  margin: auto;
  margin-top: 120px;
  gap: 22px;
  padding: 42px;
  border-radius: 30px;
  box-shadow: 0px 0px 21px 2px rgba(0,0,0,0.25);
}

.input {
  background-color: white;
  border-radius: 8px;
  border: 3px solid rgb(199, 199, 199);
  transition: 0.3s;
}

.input:hover{
  background-color: rgb(247, 247, 247);
}


.native-input.sc-ion-input-md {
  padding-left: 8px;
}

.custom-select {
  border: 2px solid rgb(199, 199, 199);
  border-radius: 8px;
  transition: 0.3s;
  padding-left: 8px;
}

.custom-select::part(icon) {
  display: none; /* Oculta el icono del desplegable */
}

.custom-select:hover {
  background-color: rgb(247, 247, 247);
}

.custom-select {
  --placeholder-color: rgb(199, 199, 199);
}


.user-list ion-item {
  border: 1px solid #ccc;
  border-radius: 8px;
}

.user-list ion-label {
  font-weight: bold;
}

.user-list ion-button {
  margin-left: 10px;
}

</style>