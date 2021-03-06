import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import config from '../../config';
import auth from './modules/auth';
import serviceWorker from './modules/service-worker';
import notifications from './modules/notifications';
import conversations from './modules/conversations';
import messages from './modules/messages';
import users from './modules/users';
import podcasts from './modules/podcasts';

Vue.use(Vuex);

export default new Store({
    modules: {
        auth,
        serviceWorker,
        notifications,
        conversations,
        messages,
        users,
        podcasts
    },
    strict: config.nodeEnv !== 'production'
});
