// import axios from "axios";
// import { ref, type Ref } from "vue";

import axios from "axios";


export async function findAll(data: any, url: any) {
    try {
        const response = await axios.get(url);
        data.value = response.data;
        return data
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
};

export async function create(data: any, url: any, formulario: any) {
    try {
        const response = await axios.post(url, formulario.value);
        console.log('Entrada criada com sucesso:', response.data);
        await findAll(data, url)
    } catch (error) {
        console.error('Erro ao criar entrada:', error);
    }
}
