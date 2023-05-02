import { ref } from 'vue';
import { defineStore } from 'pinia';
import server from '@/services/config';

export const useAuthStore = defineStore('auth/login', () => {
    const token = ref(localStorage.getItem('token'));

    function setToken(tokenValue) {
        localStorage.setItem('token', tokenValue);
        token.value = tokenValue;
    }

    function getToken() {
        return token.value;
    }

    async function checkToken() {
        try {
            const tokenAuth = 'Bearer ' + token.value;
            const {data} = await server.get('auth/verify', {
                headers: {
                    Authorization: tokenAuth,
                }
            });
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    return { token, setToken, checkToken }
})