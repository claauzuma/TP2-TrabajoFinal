<script>
import {IonList,IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonList,IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const {eliminarObjeto,addObject,agregarRutina, cargarDatos,agregarUsuario, editarRutina } = store;
    return {eliminarObjeto,addObject,agregarRutina, cargarDatos,agregarUsuario, estaLogeado, editarRutina };
  },
  data() {
    return {
      rutina: {},
      lista:[],
      mostrarFormularioFlag: false, // Inicialmente oculto
      showPassword: false,
      editMode: false, // Bandera para saber si estamos en modo de edición
      editingRoutine: {}, // Almacena los datos del usuario que está siendo editado

    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.lista = await this.cargarDatos("rutinas")
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
    async addRutina() {
      console.log("Hasta aca perfecto")
      await this.addObject(this.rutina,"rutinas");
      await this.loadData()
      alert("Se agrego correctamente")
      this.$router.push("/rutinas")

    },
    mostrarFormulario() {
      this.mostrarFormularioFlag = !this.mostrarFormularioFlag; // Mostrar el formulario al hacer clic
    },
    
    async eliminarRutina(id) {
      console.log("Hasta aca perfecto")
      await this.eliminarObjeto("rutinas",id);
      alert("Se elimno la rutina correctamente")
      await this.loadData()
      this.$router.push("/rutinas")

    },
    editarRutina(rutina) {
      console.log("Rutina recibida para edición:", rutina);
      this.editingRoutine = { ...rutina }; // Almacena una copia del usuario seleccionado para edición
      console.log("Rutina recibida para edición:", this.editingRoutine);
      this.rutina = { ...rutina }; // Rellena el formulario con los datos del usuario
      this.editMode = true; // Activa el modo de edición
      this.mostrarFormulario(); // Muestra el formulario flotante
    },
    cancelEdit() {
      // Cerrar formulario y limpiar datos de edición
      this.mostrarFormularioFlag = false; // Ocultar el formulario flotante
      this.editingRoutine = {}; // Limpiar datos de edición
      this.editMode = false; // Desactivar modo de edición

    },
    async updateRutina() {
      console.log(this.editingRoutine)
      console.log(this.rutina)
      await this.editarRutina(this.editingRoutine.id, this.rutina);
      
      await this.loadData()
      console.log("estoy aca")
      alert("Se edito correctamente")
      this.$router.push("/rutinas")
      this.editingRoutine = {};
      this.editMode = false;
      this.mostrarFormulario();
    }
    
  }
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2>Rutinas</h2>
      <br>
      <br>
      <!-- Lista de usuarios -->
      <div class="login-text">Rutinas</div><br>
      <!-- Botón para abrir el formulario -->
      <ion-button @click="mostrarFormulario">Agregar Rutina</ion-button><br><br>

      <ion-item v-for="e in lista" :key="e.id">
        <ion-label>Descripcion: {{ e.nombre }}</ion-label>
        <ion-label>Alumno: {{ e.nombreAlumno }}</ion-label>
        <ion-label>Nivel: {{ e.nivel }}</ion-label>
        <ion-button @click="eliminarRutina(e.id)">Eliminar</ion-button>
        <ion-button @click="editarRutina(e)">Modificar</ion-button>
      </ion-item>
  
      <div class="floating-form" v-if="mostrarFormularioFlag">
        <button @click="cancelEdit" class="close-button">X</button>
        <div class="login-text">{{ editMode ? 'Editar rutina' : 'Agregar rutina' }}</div>
        <ion-input class="input" v-model="rutina.nombre" placeholder="Nombre rutina" type="text" required></ion-input>
        <ion-input class="input" v-model="rutina.nombreAlumno" placeholder="Alumno" type="text" required></ion-input>
        <ion-input class="input" v-model="rutina.nivel" placeholder="Nivel" type="text" required></ion-input>

        <ion-button @click="editMode ? updateRutina() : addRutina()">{{ editMode ? 'Guardar cambios' : 'Agregar' }}</ion-button>
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