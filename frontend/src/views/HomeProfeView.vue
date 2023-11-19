<script>
import {IonPage, IonContent, IonInput, IonButton} from '@ionic/vue'


export default {
  components: {IonPage, IonContent, IonInput, IonButton},

  
  data() {
    return {
      rutina: {}
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
   <h2>Agregar rutina</h2>

   <ion-page>
    <ion-content class="ion-padding">
      <div class="container">
        <div class="login-text">Agregar rutina</div>
        <ion-input class="input" v-model="rutina.descripcion" placeholder="E-mail" type="email"></ion-input>
        <ion-input class="input" v-model="rutina.nivel" placeholder="Password" type="password"></ion-input>
        <ion-input class="input" v-model="rutina.alumnoId" placeholder="Password" type="password"></ion-input>
        <ion-button @click="loginForm">Agregar</ion-button>
      </div>
    </ion-content>
  </ion-page>


    </ion-content>

  </ion-page>

</template>
