import { createStore } from 'vuex'

const user = JSON.parse(localStorage.getItem('user'));
const secondMarket = JSON.parse(localStorage.getItem('secondMarket'));

let initialState = {
    auth: false,
    user: null,
    secondMarket: {
        tasaPeriodica: null,
        bondPrice: null,
        numberOfPeriods: null,
        cashFlow: null,
        formSecondMarket: null,
        bond: null,
    }
};

if (secondMarket != null) {
    initialState.secondMarket.tasaPeriodica = secondMarket.tasaPeriodica;
    initialState.secondMarket.bondPrice = secondMarket.bondPrice;
    initialState.secondMarket.numberOfPeriods = secondMarket.numberOfPeriods;
    initialState.secondMarket.cashFlow = secondMarket.cashFlow;
    initialState.secondMarket.formSecondMarket = secondMarket.formSecondMarket;
    initialState.secondMarket.formSecondMarket = secondMarket.bond;
}

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