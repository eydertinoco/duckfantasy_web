import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth/login', () => {
    const token = ref(localStorage.getItem('token'));

    function setToken(tokenValue) {
        localStorage.setItem('token', tokenValue);
        token.value = tokenValue;
    }

    return { setToken }
})