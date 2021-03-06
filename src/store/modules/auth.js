/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import auth from '../../lib/auth';

// Initial State
const state = {
    authenticated: false,
    phone_number: null,
    status: 0
};

// Getters
const getters = {
    authenticated: state => state.authenticated,
    authPhoneNumber: state => state.phone_number
};

// Actions
const actions = {
    authCodeRequested({ commit }, { phone_number }) {
        commit(types.AUTH_CODE_REQUESTED, phone_number);
    },
    setAuthenticated({ commit }, authenticated) {
        commit(types.SET_AUTHENTICATED, authenticated);
    }
};

// Mutations
const mutations = {
    [types.SET_AUTHENTICATED](state, authenticated) {
        state.authenticated = authenticated;
    },
    [types.AUTH_CODE_REQUESTED](state, phone_number) {
        state.phone_number = phone_number;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
