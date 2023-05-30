<script setup lang="ts">
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import axios from 'axios';

const router = useRouter()

// creation d'un objet user reactif

const user = reactive({
  name: "",
  password: ""
})

//tableau reactif d'erreur lors de la validation du formulaire

const errors = reactive([])

const confirmPassword = ref('')

const validFrom = async () => {

  errors.splice(0,errors.length)

  if(!user.name){
    errors.push('Veuillez saisir un nom d\'utilisateur')
  }

  if(!user.password){
    errors.push('Veuillez saisir un mot de passe')
  }

  if(errors.length) return

  console.log(user)  
  
  const {data} = await axios.post('http://localhost:8000/user/connexion', user)

  if(data.error){
      errors.push(data.error)
      return
  }
  router.push({
      path: '/task'
    })

}
</script>

<template>
  <div class="parent">
    <div class="card container">
      <h2>Connexion</h2>
        <template v-if="errors">
          <p v-for="error in errors" class="errors" >{{error}}</p>
        </template>
      <form>
          <label>Saisissez le nom d'utilisateurs</label><br>
          <input type='text' v-model='user.name'><br>
          <label>Saisissez le mot de passe</label><br>
          <input type='password' v-model='user.password'><br>
          <button class="btn btn-primary" @click.prevent="validFrom()">Valider</button>
      </form>
          <button class="btn btn-reverse-primary">Inscription</button>
    </div>
  </div>
</template>

<style scoped>
    .container{
        padding:30px;
        width: 40%;
        position: absolute;
        top: 20%;
        margin:auto;
        box-shadow: 18px 18px 6px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    .parent{
        display:flex;
        align-items: center;
        justify-content:center;
    }
    h2{
        text-align:center;
    }
    form{
        padding-top:40px;
    }
    .container *{
        margin-top: 10px;
    }
</style>
