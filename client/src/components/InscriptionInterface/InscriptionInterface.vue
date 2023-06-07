<script setup lang="ts">
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import axios from 'axios';

const baseURI: string = "https://to-do-vue-server.onrender.com"

const router = useRouter()

// creation d'un objet user reactif

const user = reactive({
  name: "",
  password: "",
  occupied: false
})

//tableau reactif d'erreur lors de la validation du formulaire

const errors = reactive<String[]>([])

const confirmPassword = ref('')

const validFrom = async () => {

  errors.splice(0,errors.length)

  if(!user.name){ errors.push('Veuillez saisir un nom d\'utilisateur') }

  if(!user.password){ errors.push('Veuillez saisir un mot de passe') }

  if(errors.length) return

  if(user.password != confirmPassword.value) { errors.push('Les mots de passes ne correspondent pas') }

  if(errors.length) return

  const {data} = await axios.post(`${baseURI}/user/inscription`, user)

  if(data.error){ errors.push(data.error) }

  if(errors.length) return

  router.push({
      path: '/connexion'
    })

}
</script>

<template>
  <div class="parent">
    <div class="card container">
      <h2>Inscription</h2>
        <template v-if="errors">
          <p v-for="error in errors" class="errors" >{{error}}</p>
        </template>
      <form>
          <label>Saisissez un nom d'utilisateurs</label><br>
          <input type='text' v-model='user.name'><br>
          <label>Saisissez un mot de passe</label><br>
          <input type='password' v-model='user.password'><br>
          <label>Confirmez le mot de passe</label><br>
          <input type='password' v-model='confirmPassword'><br>
          <button class="btn btn-primary" @click.prevent="validFrom()">Valider</button>
      </form>
          <button class="btn btn-reverse-primary" @click="router.push({path: '/connexion'})">Se connecter</button>
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
