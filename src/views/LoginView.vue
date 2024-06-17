<template>
    <div class="container" style="display: flex; justify-content: center">
        <div class="login_box">
            <h1 class="logo">Dá pra Faltar?</h1>
            <input class="input" type="text" placeholder="username" v-model="user">
            <input class="input" type="password" placeholder="password" v-model="passoword">
            <button class="button" @click="login(user, passoword)">Login</button>
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
@import url('https://fonts.googleapis.com/css2?family=Playwrite+IS:wght@100..400&display=swap');

.logo {
    font-family: "Playwrite IS", cursive;
    text-align: center;
    margin-bottom: 10%;
}

.login_box {
    border-radius: 15px;
    padding: 5%;
    display: flex;
    flex-direction: column;
    width: 40%;
    background-color: var(--background-color)
}

.input {
    margin: 5%;
    width: 85%;
    padding: 2%;
    border-radius: 5px;
    margin-left: 7%;
}

.input::-webkit-input-placeholder {
    font-size: 20px;
}

.button {
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 5%;
    box-shadow: 0px 10px 14px -7px #276873;
    background: linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
    background-color: var(--secondary-color);
    border-radius: 20px;
    display: inline-block;
    cursor: pointer;
    color: var(--primary-color);
    font-weight: 600;
    text-decoration: none;
    text-shadow: 0px 1px 0px #276873;
    font-size: 20px;
    padding: 2px
}

.button:hover {
    background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
    background-color: #408c99;
}
</style>