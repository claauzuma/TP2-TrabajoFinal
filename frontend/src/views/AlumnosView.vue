<script>
import {IonList,IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonList,IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const {eliminarObjeto, cargarDatos,agregarUsuario, editarUsuario } = store;
    return {eliminarObjeto,cargarDatos,agregarUsuario, editarUsuario, estaLogeado };
  },
  data() {
    return {
      user: { rol: "alumno"},
      lista:[],
      mostrarFormularioFlag: false, // Inicialmente oculto
      showPassword: false,
      editMode: false, // Bandera para saber si estamos en modo de edición
      editingUser: {}, // Almacena los datos del usuario que está siendo editado

    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.lista = await this.cargarDatos("alumnos")
        console.log("Se cargo correctamente todoooo")


      } catch(e) {
        this.errorMessage = "Se produjo un error"
      }
    },
    async addUser() {
      console.log('User object:', this.user);
      await this.agregarUsuario(this.user);
      alert("Se agrego correctamente")
      await this.loadData()
      this.$router.push("/alumnos")

    },
    mostrarFormulario() {
      this.mostrarFormularioFlag = !this.mostrarFormularioFlag; // Mostrar el formulario al hacer clic
    },
    mostrarContraseña(item) {
      item.showPassword = !item.showPassword;
    },
    editUser(user) {
      this.editingUser = { ...user }; // Almacena una copia del usuario seleccionado para edición
      this.user = { ...user }; // Rellena el formulario con los datos del usuario
      this.editMode = true; // Activa el modo de edición
      this.mostrarFormulario(); // Muestra el formulario flotante
    },
    cancelEdit() {
      // Cerrar formulario y limpiar datos de edición
      this.mostrarFormularioFlag = false; // Ocultar el formulario flotante
      this.editingUser = {}; // Limpiar datos de edición
      this.editMode = false; // Desactivar modo de edición

    },
    async updateUser() {
      await this.editarUsuario(this.editingUser.id, this.user);
      await this.loadData()
      alert("Se edito correctamente")
      this.$router.push("/alumnos")
      this.editingUser = {};
      this.editMode = false;
      this.mostrarFormulario();
    }
    ,
    async eliminar(id) {
      console.log("Pasa primer metodo")
      await this.eliminarObjeto("alumnos",id);
      await this.loadData()
      alert("Se eliminó correctamente")
      this.$router.push("/alumnos")
    }

  }
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2>Alumnos</h2>
      <br>
      <br>
        <!-- Lista de usuarios -->
        <div class="login-text">Alumnos agregados</div><br>
        <!-- Botón para abrir el formulario -->
        <ion-button @click="mostrarFormulario">Agregar Alumno</ion-button><br><br>

        <ion-item v-for="e in lista" :key="e.id">
          <ion-label>Id: {{ e.id }}</ion-label>
          <ion-label>Nombre: {{ e.nombre }} {{ e.apellido }}</ion-label>
          <ion-label>Email: {{ e.email }}</ion-label>
          <ion-label>
            Password:
            <span v-if="!e.showPassword">********</span>
            <span v-else>{{ e.password }}</span>
          </ion-label>
          <ion-label>Plan: {{ e.plan }}</ion-label>
          <ion-label>Rutina: {{ e.nombreRutina }}</ion-label>
          <ion-label>Tipo de Rutina: {{ e.tipoRutina }}</ion-label>
          <ion-button @click="editUser(e)" >Editar</ion-button>
          <ion-button @click="eliminar(e.id)">Borrar</ion-button>
          <ion-button @click="mostrarContraseña(e)">Mostrar/Ocultar Contraseña</ion-button>
        </ion-item>
      <!-- Formulario flotante -->
      <div class="floating-form" v-if="mostrarFormularioFlag">
        <button @click="cancelEdit" class="close-button">X</button>
        <div class="login-text">{{ editMode ? 'Editar alumno' : 'Agregar alumno' }}</div>
        <ion-input class="input" v-model="user.nombre" placeholder="Nombre" type="text" required></ion-input>
        <ion-input class="input" v-model="user.apellido" placeholder="Apellido" type="text" required></ion-input>
        <ion-input class="input" v-model="user.dni" placeholder="DNI" type="text" required></ion-input>
        <ion-input class="input" v-model="user.email" placeholder="E-mail" type="email" required></ion-input>
        <ion-input class="input" v-model="user.password" placeholder="Contraseña" type="password" required></ion-input>
        <ion-input class="input" v-model="user.inicio" placeholder="Inicio" type="date" required></ion-input>
        <ion-input class="input custom-select" v-model="user.plan" placeholder="Seleccionar plan" required></ion-input>
        <!--<ion-item>
          <ion-select class="input custom-select" v-model="user.plan" placeholder="Seleccionar plan" required>
          <ion-select-option value="Basico">Basico</ion-select-option>
          <ion-select-option value="Platino">Platino</ion-select-option>
          <ion-select-option value="Oro">Oro</ion-select-option>
        </ion-select>
        </ion-item>     No quería andar -->
        
        <ion-button @click="editMode ? updateUser() : addUser()">{{ editMode ? 'Guardar cambios' : 'Agregar' }}</ion-button>
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