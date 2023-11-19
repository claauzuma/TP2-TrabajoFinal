<script>
import {IonPage, IonContent, IonInput, IonButton} from '@ionic/vue'
import { inject } from 'vue';

export default {
  components: {IonPage, IonContent, IonInput, IonButton},

  setup() {
    // Accede a 'user' proporcionado desde el componente 'LoginView'
    const user = inject('user', null);

    // Ahora puedes acceder a 'user' en este componente
    if (user) {
      console.log(user.username);
      console.log(user.password);
    }

    return { user };
  }
}
</script>

<template>

  <ion-page>
    <ion-content class="ion-padding">
    <h2>Home</h2>
    </ion-content>

  </ion-page>

</template>
