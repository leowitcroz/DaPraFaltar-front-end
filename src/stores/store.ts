import { ref, watch, type Ref } from 'vue'

// export const request_: Ref<any | null> = ref(null)


const savedData = JSON.parse(localStorage.getItem('data') || '[]');
export const data: Ref<any> = ref(savedData);

// Observa mudanças no estado 'data' e atualiza o localStorage
watch(data, (newValue) => {
    localStorage.setItem('data', JSON.stringify(newValue));
});