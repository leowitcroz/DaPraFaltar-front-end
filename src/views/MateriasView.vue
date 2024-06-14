<template>
    <div class="container" style="padding: 2%; border: 1px solid red; background-color: antiquewhite;">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add materia
        </button>
        <div class="row">
            <div class="col-4" v-for="(materia, key) in data" :key="key">
                <div class="card" style="margin: 3%;">
                    <h2 class="card-title">{{ materia.name }}</h2>
                    <img :src="imageSrc" alt="Card Image" class="card-image" />
                    <p class="card-caption">Essa materia tem {{ materia.horas }} então voce pode faltar {{
                        Math.floor(materia.horas * 0.25) }} e você tem {{ materia.faltas }} faltas</p>
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
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="createMateria">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { findAll } from '@/utils/utils';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const url = 'http://localhost:3000/materia'

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

const imageSrc = ref('http://localhost:3000/materia');

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

const createMateria = async () => {
    try {
        const response = await axios.post(url, formulario.value);
        console.log('Entrada criada com sucesso:', response.data);
        await findAll(data,url)
    } catch (error) {
        console.error('Erro ao criar entrada:', error);
    }
}

onMounted(async () => {
    await findAll(data,url)
});




</script>


<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
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
    font-size: 14px;
    color: #555;
    text-align: center;
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
</style>