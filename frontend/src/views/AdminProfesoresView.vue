<script>
import {IonList,IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore"

export default {
  components: {IonList,IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const { eliminarObjeto,cargarDatos,agregarUsuario } = store;
    return { eliminarObjeto,cargarDatos,agregarUsuario, estaLogeado };
  },
  data() {
    return {
      user: {rol: "profe"},
      lista:[],
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
        this.lista = await this.cargarDatos("profes")
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
    async addUser() {
      console.log("Hasta aca perfecto")
      await this.agregarUsuario(this.user);
      alert("Se agrego correctamente")
      await this.loadData()
      this.$router.push("/admin/profesores")

    },
    mostrarFormulario() {
      this.mostrarFormularioFlag = !this.mostrarFormularioFlag; // Mostrar el formulario al hacer clic
    },
    mostrarContraseña(item) {
      item.showPassword = !item.showPassword;
    }
    ,
    async eliminar(id) {
      console.log("Pasa primer metodo")
      await this.eliminarObjeto("profesores",id);
      await this.loadData()
      alert("Se eliminó correctamente el profe")
      this.$router.push("/profes")
    }

  }
}
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding"><br><br><br>

      <h2 class="login-text">Profesores</h2>
      <!-- Botón para abrir el formulario -->
      <ion-button @click="mostrarFormulario">Agregar Profe</ion-button>
      <!-- Lista de usuarios -->
      
      <ion-item v-for="e in lista" :key="e.id">
          <ion-label>Email: {{ e.email }}</ion-label>
          <ion-label>
            Password:
            <span v-if="!e.showPassword">********</span>
            <span v-else>{{ e.password }}</span>
          </ion-label>
          <ion-button @click="agregarClase">Editar</ion-button>
          <ion-button @click="eliminar(e.id)">Borrar</ion-button>
          <ion-button @click="mostrarContraseña(e)">Mostrar/Ocultar Contraseña</ion-button>
      
        </ion-item>
      <!-- Formulario flotante -->
      <div class="floating-form" v-if="mostrarFormularioFlag">
          <button @click="mostrarFormulario" class="close-button">X</button>
          <div class="login-text">Agregar profesor</div>
          <ion-input class="input" v-model="user.nombre" placeholder="Nombre" type="text" required></ion-input>
          <ion-input class="input" v-model="user.apellido" placeholder="Apellido" type="text" required></ion-input>
          <ion-input class="input" v-model="user.dni" placeholder="DNI" type="text" required></ion-input>
          <ion-input class="input" v-model="user.email" placeholder="E-mail" type="email" required></ion-input>
          <ion-input class="input" v-model="user.password" placeholder="Contraseña" type="password" required></ion-input>
          <ion-button @click="addUser">Agregar</ion-button>
        </div>
    </ion-content>
  </ion-page>
</template>

<style>
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

.floating-form {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  gap: 11px;
  transform: translate(-50%, -50%);
  background-color: white; /* Fondo transparente */
  padding: 20px;
  border: 2px solid rgba(0, 0, 0, 0.25); /* Borde del formulario */
  border-radius: 12px; /* Mayor radio para la figura circular */
  box-shadow: 0px 0px 21px 2px rgba(0, 0, 0, 0.25);
  z-index: 1; /* Para que aparezca por encima del contenido */
}

</style>