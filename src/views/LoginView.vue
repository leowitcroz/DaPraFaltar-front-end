<template>
    <div class="container" style="display: flex; justify-content: center">


        <div class="login_box" style="border: 1px solid red">
            <h1 style="margin-left: 20%;">Dá pra Faltar?</h1>
            <input class="input" type="text" placeholder="username" v-model="user">
            <input class="input" type="password" placeholder="password" v-model="passoword">
            <button @click="login(user, passoword)">LOGIN</button>
        </div>

    </div>
</template>
9

<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue';

const user = ref("")
const passoword = ref("")

const login = (user: string, passoword: string) => {
    console.log(user, passoword)
    router.push({ name: 'materia' });
    
}


</script>


<style>
.login_box {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.input {
    margin: 5%;
}
</style>