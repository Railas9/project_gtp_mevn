<script setup lang="ts">
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import axios from 'axios';

const router = useRouter()

// creation d'un objet user reactif

const user = reactive({
  name: "",
  password: "",
  occupied: false
})

const validFrom = async () => {
await axios.post('http://localhost:8000/user', user)
router.push({
    path: '/task'
  })
}
</script>

<template>
  <div class="parent">
    <div class="card container">
      <h2>Inscription</h2>
      <form>
          <label>Saisissez un nom d'utilisateurs</label><br>
          <input type='text' v-model='user.name'><br>
          <label>Saisissez un mot de passe</label><br>
          <input type='password' v-model='user.password'><br>
          <label>Confirmez le mot de passe</label><br>
          <input type='password'><br>
          <button class="btn btn-primary" @click.prevent="validFrom()">Valider</button>
      </form>
      <router-link to="/connexion">
          <button class="btn btn-reverse-primary">Se connecter</button>
      </router-link>
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
