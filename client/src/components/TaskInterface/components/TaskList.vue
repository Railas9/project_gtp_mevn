<script setup lang="ts">
import { reactive, onUpdated, computed, ref} from "vue";
import type {Task} from '@/Interfaces/taskInterface'
import axios from 'axios';


const baseURI: string = "https://to-do-vue-server.onrender.com"

//récupération des props du composant parent TaskInterface

const {tasks, users} = defineProps(['tasks', 'users'])

//évenement permettant d'envoyé les données reactive mis a jour au composant parent TaskInterface

let emit = defineEmits(['onUpdateAll'])

// variable reactive permettant de filtrer les tasks

const searchQuery = ref('');

// suppression d'une task

const deleteTask = async (id : String) => {
  const {data} = await axios.delete(`${baseURI}/task/${id}`)
  emit('onUpdateAll', data)
}

// renvoie un nouveau tableau filtré grace à searchQuery

const sortedTasks = computed(() => {
  return tasks.filter((task : Task) => task.info.toLowerCase().includes(searchQuery.value.toLowerCase().trim()));
})

// assignation d'une task

const addUserToTask = async (taskId : String, e: Event) => {
  const target = event!.target as HTMLButtonElement;
  const {data} = await axios.patch(`${baseURI}/user/${taskId}/${target.value}`)
  emit('onUpdateAll', data)
}

// tri des tasks en fonction des heures de debut et de fin

const sortArray = (e : Event) => {

  
  const target = event!.target as HTMLButtonElement;


  // recupération de l'attribut name de la balise bouton afin de reconnaitre quel bouton a été appuyé
  
  // le name contient ":" puis est splité afin de connaitre chaque bouton

  const [startOrEnd, recentOrLatest] = target.name.split(':')

  // les données sont mis en format Date afin de pouvoir les comparer puis sont trié

  tasks.sort((a : Task, b: Task) =>{

  let hour = [];

    switch (startOrEnd) {
      case "start":
        hour[0] = a.startHour
        hour[1] = b.startHour
        break;
      default:
        hour[0] = a.endHour
        hour[1] = b.endHour
        break;
    }


    const heure1 = new Date(`2020-01-01T${hour[0]}:00`)
    const heure2 = new Date(`2020-01-01T${hour[1]}:00`)

        
    switch (recentOrLatest) {
      case "recent":
        if (heure1 < heure2) {
          return -1;
        } else if (heure1 > heure2) {
          return 1;
        }
        return 0;
        break;
        
      default:

        if (heure1 > heure2) {
          return -1;
        } else if (heure1 < heure2) {
          return 1;
        }
        return 0;
        break;
    }


})

}
</script>

<template>
    <div v-if='tasks.length' class="card container" style="flex: 1 1 auto">
      <div class="searchHeader">
        <input type="text" placeholder="Rechercher" id="search_task" v-model='searchQuery'>
        <div>
            <p style="text-align: center">Heure debut</p>
            <div>
              <button class='btn btn-primary' style="margin-right: 5px" name="start:recent" @click="sortArray($event)">Plus récent</button>
              <button class='btn btn-reverse-primary' name="start:latest" @click="sortArray($event)">Moins récent</button>
            </div>  
        </div> 
        <div>
            <p style="text-align: center">Heure fin</p>
            <div>
              <button class='btn btn-primary' style="margin-right: 5px" name="end:recent" @click="sortArray($event)">Plus récent</button>
              <button class='btn btn-reverse-primary' name="end:latest" @click="sortArray($event)">Moins récent</button>
            </div>  
        </div> 
      </div>
      
      <!-- affichage dynamique des tasks filtrées -->

      <div v-for='task in sortedTasks' class="card container task" :key="task._id">
        <div>
          <p class='hours'>Heure de debut: {{task.startHour}} &#x2192; Heure de fin: {{task.endHour}}</p>
          <p>{{task.info}}</p>
        </div>
        <select @change='addUserToTask(task._id, $event)'>
          <option value=""> -- </option>

      <!-- affichage dynamique des users dans un select, si le user n'est pas occupé 
                    ou qu'il assigné à la tache courante, il sera affiché. Un attribut select 
                        est mis a true si le user est assigné à la tâche-->

          <template v-for='user in users'>
            <option v-if="!user.occupied || user._id == task.user?._id" :selected="user._id == task.user?._id" :value="user._id">{{ user.name }}</option> 
          </template>
        </select>
        <button class='btn btn-reverse-primary' @click='deleteTask(task._id)'>Supprimer</button>
      </div>
    </div>
</template>

<style scoped>
  .container{
    padding: 20px;
    margin: 20px;
  }
  select{
    margin-right: 30px;
  }
  .task{
    border: 2px solid var(--primary);
    display: flex;
    align-items: center;
  }
  .searchHeader{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .task div{
    flex: 1 1 auto;
  }
  .hours{
    margin:0;
    font-size: 10px;
  }
</style>
