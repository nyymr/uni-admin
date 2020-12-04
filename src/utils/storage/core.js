export default {

    setLocalStorage(key, value) {
        if (!value) return;
        localStorage.setItem(key, JSON.stringify(value))
    },
    setLocal(key, value) {
        if (!value) return;
        localStorage.setItem(key, value)
    },
    getLocalStorage(key) {
        if (!localStorage.getItem(key)) return;
        return JSON.parse(localStorage.getItem(key))
    },
    getLocal(key) {
        if (!localStorage.getItem(key)) return;
        return localStorage.getItem(key)
    },
    removeLocalStorage(key) {
        localStorage.removeItem(key)
    },
    clearLocalStorage() {
        localStorage.clearItem()
    },

    setSessionStorage(key, value) {
        if (!value) return;
        sessionStorage.setItem(key, JSON.stringify(value))
    },
    getSessionStorage(key) {
        if (!sessionStorage.getItem(key)) return;
        return JSON.parse(sessionStorage.getItem(key))
    },
    getSession(key) {
        if (!sessionStorage.getItem(key)) return;
        return sessionStorage.getItem(key)
    },
    setSession(key, value) {
        if (!value) return;
        sessionStorage.setItem(key, value)
    },
    removeSessionStorage(key) {
        sessionStorage.removeItem(key)
    },
    clearSessionStorage() {
        sessionStorage.clearItem()
    },

}