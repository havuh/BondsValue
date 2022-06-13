import { createStore } from 'vuex'

const user = JSON.parse(localStorage.getItem('user'));

let initialState = {
    auth: false,
    user: null
};

if (user != null) {
    initialState.user = user;
    initialState.auth = true;
}

export const store = createStore({
    namespaced: true,
    state: initialState,
    actions: {

    },
    mutations: {

    }
})