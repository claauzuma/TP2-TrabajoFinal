<script>
import { IonList, IonPage, IonContent, IonItem, IonLabel } from '@ionic/vue';
import axios from 'axios';

export default {
  components: { IonList, IonPage, IonContent, IonItem, IonLabel },
  data() {
    return {
      claseId: null,
      inscriptos: []
    };
  },
  mounted() {
    this.claseId = this.$route.params.id;
    this.fetchInscriptos();
  },
  methods: {
    async fetchInscriptos() {
      try {
        const response = await axios.get(`http://localhost:3000/admin/clases/${this.claseId}`);
        this.inscriptos = response.data;
      } catch (error) {
        console.error('Error al obtener inscriptos:', error);
      }
    }
  }
};
</script>

  

  <template>
    <ion-page>
      <ion-content class="ion-padding">
        <br><br><br>
        <h1>Inscriptos de la Clase {{ claseId }}</h1>
        <ion-list>
          <ion-item v-for="inscripto in inscriptos" :key="inscripto.id">
            <ion-label>Usuario ID {{ inscripto.idUsuario }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  