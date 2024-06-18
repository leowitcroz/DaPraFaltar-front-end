<template>
    <div class="container" style="padding: 3%; border-radius: 15px;background-color: var(--background-color)">
        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add materia
        </button>
        <div class="row">
            <div class="col-4" v-for="(materia, key) in data" :key="key">
                <div class="card" style="margin: 3%;">
                    <div style="width: 100%;"> <button class="btn_close">X</button></div>
                    <h2 class="card-title">{{ materia.name }}</h2>
                    <img :src="imageSrc" alt="Card Image" class="card-image" />

                    <p class="card-caption">
                        Essa materia tem <span class="span">{{ materia.horas }}
                            horas</span> então voce pode <span class="span"> faltar {{
                                Math.floor(materia.horas * 0.25) }}</span> e você tem <span class="span">{{ materia.faltas
                            }}
                            faltas</span>
                    </p>

                    <div style="display: flex;">
                        <button @click="addFaltas(materia.faltas)" class="card-button">+</button>
                        <button @click="removeFaltas(materia.faltas)" class="card-button">-</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Materias</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style="display: flex; flex-direction: column;width: 70%; padding: 5%;">

                        <input class="input_modal" type="text" placeholder="nome" v-model="formulario.name">
                        <input class="input_modal" type="text" placeholder="horas" v-model="formulario.horas">
                        <input class="input_modal" type="text" placeholder="faltas" v-model="formulario.faltas">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn " data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn " @click="createMateria">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { Materias } from '@/interface/interface';
import { ApiRequests } from '@/utils/utils';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const api = new ApiRequests('http://localhost:3000/')

const materias = ref([
    {
        name: 'fisica',
        horas: 60,
        faltas: 2
    },
    {
        name: 'fisica2',
        horas: 30,
        faltas: 2
    },
    {
        name: 'fisica3',
        horas: 30,
        faltas: 5
    },
    {
        name: 'fisica4',
        horas: 30,
        faltas: 2
    },
])

const imageSrc = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8vX8l-a_UXn6T-uhn-rGHFhIi_A2gczd4zA&s');

const addFaltas = (faltas: number) => {
    faltas = faltas + 1;
    return faltas

};
const removeFaltas = (faltas: number) => {
    faltas = faltas - 1;
    return faltas
};

const data = ref()

const formulario = ref({
    name: '',
    horas: '',
    faltas: '',
})

async function getAll() {
    try {
        const materias: Materias = await api.get('materia')
        data.value = materias;
        return data
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}


const createMateria = async () => {
    try {
        await api.post('materia', formulario.value)
        await getAll()
    } catch (error) {
        console.error('Erro ao criar entrada:', error);
    }
}

onMounted(async () => {
    getAll()
});




</script>


<style scoped>
.span {
    color: #ff1f4c;
}

.btn_close {
    border: none;
    background-color: #f3f0f5;
    border-radius: 10px;
}

.btn_close:hover{
    
    background-color: #e7e6e6;
}

.modal-content {
    font-family: "Playwrite IS", cursive;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    background-color: var(--background-color)
}

.modal-header {
    border-bottom: 2px solid var(--primary-color);
}

.modal-footer {
    border-top: 2px solid var(--primary-color);
}

.input_modal {
    margin: 5%;
    width: 85%;
    padding: 2%;
    border-radius: 5px;
    margin-left: 7%;
}

.input_modal::-webkit-input-placeholder {
    font-size: 16px;
}

.card {
    border: 1px solid #dddddd;
    font-family: "Playwrite IS", cursive;
    border-radius: 8px;
    padding: 16px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #b2d9f7;
    margin-bottom: 6% !important;
}

.card-title {
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
}

.card-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
}

.card-caption {
    margin: 16px 0;
    font-size: 17px;
    color: var(--primary-color);
    text-align: center;
    font-weight: 600;
}

.card-button {
    padding: 8px 16px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 1%;
}

.card-button:hover {
    background-color: #0056b3;
}

.input_modal {
    margin: 5%;
    ;
}

.btn {
    font-family: "Playwrite IS", cursive;
    box-shadow: inset 0px 1px 0px 0px #dcecfb;
    background-color: #b2d9f7;
    border-radius: 6px;
    display: inline-block;
    cursor: pointer;
    color: var(--primary-color);
    font-size: 15px;
    font-weight: bold;
    padding: 6px 24px;
    text-decoration: none;
    margin-left: 1%;
    margin-bottom: 2%;
    padding: 10px;
}

.btn:hover {
    background: linear-gradient(to bottom, #a4d3f7 5%, #91cfff 100%);
    background-color: #b2d9f7;
}
</style>