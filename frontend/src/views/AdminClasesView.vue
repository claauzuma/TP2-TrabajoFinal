<script>
import {IonList,IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonList,IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const {eliminarObjeto,addObject, cargarDatos,verInscriptos,agregarUsuario } = store;
    return {eliminarObjeto,addObject, cargarDatos,verInscriptos,agregarUsuario, estaLogeado };
  },
  data() {
    return {
      user: {rol : "alumno"},
      lista: [],
      clase: {},
      profes:[],
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
        this.profes = await this.cargarDatos("profes")
        this.lista = await this.cargarDatos("clases")
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
  
    async agregarClase() {
      await this.addObject(this.clase,"clases");
      alert("Se agrego correctamente")
      await this.loadData()
      this.$router.push("/admin/clases")

    },
    mostrarFormulario() {
      console.log("Se abre el form")
      this.mostrarFormularioFlag = !this.mostrarFormularioFlag; // Mostrar el formulario al hacer clic
    },
    mostrarContraseña(item) {
      item.showPassword = !item.showPassword;
    },
    verInscriptos(clase) {
      this.$router.push("/admin/clases/"+clase)
    }
    ,
    async eliminar(id) {
      console.log("Pasa primer metodo")
      await this.eliminarObjeto("clases",id);
      await this.loadData()
      alert("Se eliminó correctamente la clase")
      this.$router.push("/clases")
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
        <div class="login-text">Clases agregadas</div><br>
        <!-- Botón para abrir el formulario -->
        <ion-button @click="mostrarFormulario">Agregar clase</ion-button><br><br>

        <ion-item v-for="e in lista" :key="e.id">
          <ion-label>Nombre clase: {{ e.nombre }}</ion-label>
          <ion-label>Nombre profe: {{ e.nombreProfe }}</ion-label>
          <ion-label>Horario: {{ e.horario }}</ion-label>
          <ion-label>Capacidad: {{ e.capacidad }}</ion-label>
          <ion-label>Anotados: {{ e.anotados }}</ion-label>
          <ion-button @click="verInscriptos(e.id)">Ver inscriptos</ion-button>
          <ion-button @click="agregarClase">Editar</ion-button>
          <ion-button @click="eliminar(e.id)">Borrar</ion-button>
        </ion-item>
      <!-- Formulario flotante -->
      <div class="floating-form" v-if="mostrarFormularioFlag">
        <button @click="mostrarFormulario" class="close-button">X</button>
        <div class="login-text">Agregar clase</div>
        <ion-input class="input" v-model="clase.nombre" placeholder="Nombre de actividad/clase" type="text" required></ion-input>

        <ion-select class="input custom-select" v-model="clase.nombreProfe" placeholder="Selecciona profe" required>
        <ion-item v-for="e in profes" :key="e.id">
          <ion-select-option :value="e.nombre"> {{ e.nombre }} </ion-select-option>
        </ion-item>

         
        
        </ion-select>
        <ion-input class="input" v-model="clase.limitePersonas" placeholder="Limite de gente" type="text" required></ion-input>
        <ion-input class="input" v-model="clase.horario" placeholder="Horario de inicio" type="number" required></ion-input>
        <ion-input class="input" v-model="clase.duracion" placeholder="Duracion" type="password" required></ion-input>
        <ion-button @click="agregarClase">Agregar</ion-button>
      </div>
      <br>

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