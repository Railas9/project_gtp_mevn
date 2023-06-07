<script setup lang="ts">

import AddTask from '@/components/TaskInterface/components/AddTask.vue';
import TaskList from '@/components/TaskInterface/components/TaskList.vue';
import UserList from '@/components/TaskInterface/components/UserList.vue';
import { reactive, onMounted } from "vue";
import type {Task} from '@/Interfaces/taskInterface'
import type {User} from '@/Interfaces/userInterface'
import axios from 'axios';

const baseURI: string = "https://to-do-vue-server.onrender.com"


// creation des variables reactive users  et tasks

const tasks = reactive<Task[]>([])
const users = reactive<User[]>([])

// récupération de l'ensembles des données users et tasks lors de la mise en place du composant

onMounted( async () => { 
  const {data : taskData} = await axios.get(`${baseURI}/task`)
  tasks.push(...taskData)
  const {data : userData} = await axios.get(`${baseURI}/user`)
  users.push(...userData)
})

// met à jour les données lors des évenements des composants enfants

const getAll = (data: { users : User[], tasks : Task[]}) => {
  if(data.users){
    users.splice(0,users.length, ...data.users)
    tasks.splice(0,tasks.length, ...data.tasks)
  }else{
    tasks.splice(0,tasks.length, ...data.tasks)
  }

}


</script>

<template>
  <div class="card container">
    <h1>Liste des missions</h1>
    <AddTask @onUpdateAll='data => getAll(data)'/>
  </div>

  <main>

    <TaskList :tasks='tasks' :users='users' @onUpdateAll='data => getAll(data)'/>

    <UserList :users='users'/>

  </main>
</template>

<style scoped>
  .container{
    padding: 20px;
    margin: 20px;
  }
  h1{
    margin-bottom: 1rem;
  }
  .users{
    width:30%;
    margin-left: 0;
  }
  main{
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }
  .task{
    border: 2px solid var(--primary);
    display: flex;
    align-items: center;
  }
  .task div{
    flex: 1 1 auto;
  }
  .hours{
    margin:0;
    font-size: 10px;
  }
</style>
