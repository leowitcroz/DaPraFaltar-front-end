<template>
    <div class="container" style="padding: 3%; border-radius: 15px;background-color: var(--background-color)">
        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add materia
        </button>
        <div class="row">
            <div class="col-4" v-for="(materia, key) in data" :key="key">
                <div style="display: flex; justify-content: center;">
                    <div class="card" style="margin: 3%;">
                        <div style="width: 100%; display: flex;justify-content: space-between;">
                            <button class="btn_close" @click="del(materia.id)">
                                <span class="material-icons">close</span></button>
                            <button class="btn_close ">
                                <span class="material-icons">more_vert</span>
                            </button>
                        </div>

                        <h2 class="card-title">{{ materia.nome }}</h2>

                        <img :src="imageSrc" alt="Card Image" class="card-image" />

                        <p class="card-caption">
                            Essa materia tem <span class="span">{{ materia.horas }}
                                horas </span>
                            <span class="span" v-if="Math.floor(materia.horas * 0.25) - materia.faltas > 0">então voce
                                pode faltar {{
                                    Math.floor(materia.horas * 0.25) - materia.faltas }}
                            </span>
                            <span class="span" v-if="Math.floor(materia.horas * 0.25) - materia.faltas == 0"> você não
                                pode mais faltar
                            </span>
                            <span class="span" v-if="Math.floor(materia.horas * 0.25) - materia.faltas < 0"> esta
                                reprovado por falta
                            </span>
                            e você tem <span class="span">{{
                                materia.faltas
                            }}
                                faltas</span>
                        </p>

                        <div style="display: flex;">
                            <button @click="addFaltas(materia.faltas, materia.id)" class="card-button">+</button>
                            <button @click="removeFaltas(materia.faltas, materia.id)" class="card-button">-</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true" ref="exampleModal">
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
                            <button type="button" class="btn " @click="createMateria" data-bs-dismiss="modal">Save
                                changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>


<script lang="ts" setup>
import type { Materias } from '@/interface/interface';
import { ApiRequests } from '@/utils/utils';
import { onMounted, ref } from 'vue';
import $ from 'jquery';
import { request_ } from '../stores/store';

const api = new ApiRequests('http://localhost:3000/')

const imageSrc = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8vX8l-a_UXn6T-uhn-rGHFhIi_A2gczd4zA&s');



const data = ref()

const formulario = ref({
    name: '',
    horas: '',
    faltas: '',
})

async function addFaltas(faltas: string, id: string) {
    let info = Number(faltas)
    info = info + 1
    formulario.value.faltas = info.toString()


    await update(id)
    await getAll()

};

async function removeFaltas(faltas: string, id: string) {
    let info = Number(faltas)
    info = info - 1
    formulario.value.faltas = info.toString()


    await update(id)
    await getAll()

};



async function getAll() {
    try {
        const materias: Materias = await api.get('materia')
        data.value = materias;
        return data
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

async function createMateria() {
    try {
        await api.post('materia', formulario.value)
        await getAll()
    } catch (error) {
        console.error('Erro ao criar entrada:', error);
    }
}


async function del(id: string) {
    try {
        await api.delete('materia', id);
        await getAll();
    } catch (error) {
        console.error('Erro ao criar entrada:', error);
    }
}

async function update(id: string) {
    try {
        await api.update('materia', id, formulario.value)
        await getAll();
    } catch (e) {
        console.log(e)
    }
}

onMounted(async () => {
    await getAll()
    console.log(data.value)
}
);




</script>


<style scoped>
.span {
    color: #ff1f4c;
}


.btn_close {
    display: flex;
    align-items: center;
    border: none;
    background-color: #f3f0f5;
    border-radius: 10px;
    padding: 5px;
}

.btn_close:hover {
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
    margin-left: 3%;
    margin-bottom: 2%;
    padding: 10px;
}

.btn:hover {
    background: linear-gradient(to bottom, #a4d3f7 5%, #91cfff 100%);
    background-color: #b2d9f7;
}
</style>