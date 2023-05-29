<script setup lang="ts">
import { reactive, ref } from "vue";
import axios from 'axios';
import {onMounted} from 'vue'

//évenement permettant d'envoyé les données reactive mis a jour au composant parent TaskInterface

let emit = defineEmits(['onUpdateAll'])

//horaire par défaut

const date = ref([ { hours: 8, minutes: 0 }, { hours: 15, minutes: 0 }]);

//tableau reactif d'erreur lors de la validation du formulaire

const errors = reactive([])

//mise en place d'un objet task reactive

const task = reactive<Task>({
  info: "",
  startHour: date.value[0],
  endHour: date.value[1],
  done: false,
  user: null
})

//ajoute les données des horaires da la balise VueDatePicker à l'objet task reactive

const handleDate = (modelData) => {
  date.value = modelData;
  task.startHour = date.value[0]
  task.endHour = date.value[1]
}

const sendData = async (task) => {

//vide le tableau d'erreur

  errors.splice(0,errors.length)

//heures mis en format "00:00"

  let hour1 = date.value[0].hours
  let hour2 = date.value[1].hours
  let minute1 = date.value[0].minutes
  let minute2 = date.value[1].minutes
 
  if (hour1 < 10) hour1 = "0"+ hour1;
  if (hour2 < 10) hour2 = "0"+ hour2;
  if (minute1 < 10) minute1 = "0"+ minute1;
  if (minute2 < 10) minute2 = "0"+ minute2;

//recupére le temps en minute entre chaque heure debut et fin

  const heure1 = new Date(`2020-01-01T${hour1}:${minute1}:00`)
  const heure2 = new Date(`2020-01-01T${hour2}:${minute2}:00`)
  
  let diff = heure2.getTime() - heure1.getTime()

  var minutes = Math.floor((diff/1000)/60);

//ajoute une erreur si l'utilisateur n'a rien mis dans l'input

  if(!task.info) {
    errors.push('Indiquez une tâche')
  }

//ajoute une erreur si la tâche fait plus de 8 heures (480 minutes)

  if(minutes > 480) {
    errors.push('La tâche ne peut etre supérieur à 8h')
  }

// si il y'a une erreur, la fonction est términé

  if (errors.length) return

  const {data} = await axios.post('http://localhost:8000/task/', task)
  emit('onUpdateAll', data)
}

</script>

<template>
<h3>Ajouter une tâche</h3>

<!--affichage des erreurs si il y'en a-->

<template v-if="errors">
  <p v-for="error in errors" class="errors" >{{error}}</p>
</template>
<div>
  <form class="container">
    <input type="text" placeholder="Réaliser la partie front" id="task" v-model="task.info" required>
    <label for="start">Horaires</label>
    <VueDatePicker time-picker range placeholder="Choisir horaire" :model-value="date" @update:model-value="handleDate" :min-time="{ hours: 8, minutes: 0 }" :max-time="{ hours: 20, minutes: 0 }" />
    <button class="btn btn-primary" @click.prevent="sendData(task)">Ajouter</button>
  </form>
</div>
</template>

<style scoped>
.container{
  display: flex;
  align-items: center;
}
#task{
  flex:1 1 auto;
}

form *{
  margin: 0 20px 0;
}

.errors{
  color: red;
}
</style>
