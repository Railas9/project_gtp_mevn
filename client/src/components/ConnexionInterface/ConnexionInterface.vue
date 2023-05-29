<script setup lang="ts">
</script>

<template>
  <div class="parent">
    <div class="card container">
      <h2>Connexion</h2>
      <form>
          <label>Saisissez le nom d'utilisateurs</label><br>
          <input type='text'><br>
          <label>Saisissez le mot de passe</label><br>
          <input type='password'><br>
          <button class="btn btn-primary">Valider</button>
      </form>
      <router-link to="/inscription">
          <button class="btn btn-reverse-primary">Inscription</button>
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
