/* eslint no-shadow: 0 */
import * as types from '../mutation-types';
import statuses from '../status-types';
import api from '../../lib/api';

// Initial State
const state = {
    pushManager: null,
    clientPushSubscription: null,
    serverPushSubscriptionId: null // TODO: Persist this value in local storage?
};

// Getters
const getters = {
    pushManager: state => state.pushManager,
    clientPushSubscription: state => state.clientPushSubscription,
    serverPushSubscriptionId: state => state.serverPushSubscriptionId
};

// Actions
const actions = {
    setClientPushManager({ commit }, pushManager) {
        commit(types.RECEIVE_PUSH_MANAGER, pushManager);
    },
    setClientPushSubscription({ commit }, subscription) {
        console.log('push subscription', JSON.stringify(subscription));
        commit(types.RECEIVE_CLIENT_PUSH_SUBSCRIPTION, subscription);
    },
    subscribeToServerPushNotifications( { commit, state, getters }) {
        const { id } = getters.currentUser;
        const { endpoint, keys } = state.clientPushSubscription;
        api
            .post('push-subscriptions', {}, {
                service: 'gcm',
                user_id: id,
                p256dh: keys.p256dh,
                endpoint: endpoint,
                auth: keys.auth
            })
            .then(subscription => commit(types.RECEIVE_SERVER_PUSH_SUBSCRIPTION, subscription.id))
            .catch((e) => {
                console.log('server push subscription failed', e);
            });
    },
    unsubscribeToServerPushNotifications({ commit }) {
        // TODO: actually unsubscribe from server notifications
        commit(types.RECEIVE_SERVER_PUSH_SUBSCRIPTION, null)
    }
};

// Mutations
const mutations = {
    [types.RECEIVE_PUSH_MANAGER](state, pushManager) {
        state.pushManager = pushManager;
    },
    [types.RECEIVE_CLIENT_PUSH_SUBSCRIPTION](state, subscription) {
        state.clientPushSubscription = subscription;
    },
    [types.RECEIVE_SERVER_PUSH_SUBSCRIPTION](state, id) {
        state.serverPushSubscriptionId = id;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
