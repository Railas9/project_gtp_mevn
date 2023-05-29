<script setup lang="ts">

const {users} = defineProps(['users']);
</script>
<template>
    <div class="card container users">
      <h3>Utilisateurs</h3>
      <div class="list">
        <div v-for='user in users' class="card user" :class=" { 'occupied' : user.occupied, 'available' : !user.occupied, }">{{ user.name }}</div>
      </div>
    </div>
</template>

<style scoped>
  .users{
    width:30%;
    margin-left: 0;
  }

  .occupied{
    background-color: #2e2e44;
  }

  .available{
    background-color: var(--primary);
  }

  h3{
    margin-bottom: 20px;
  }
  .list{
    display: flex;
    flex-wrap:wrap;
    gap: 10px 20px;
  }
  .container{
    padding: 20px;
    margin: 20px;
  }
  .user{
    color: #ffffff;
    width: fit-content;
    padding: 5px 10px 5px;
  }
</style>