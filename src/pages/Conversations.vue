<template>
    <md-layout md-column>
        <md-toolbar class="md-dense">
            <md-button class="md-icon-button" @click="$router.push({ name: 'profile' })">
                <md-icon>account_circle</md-icon>
            </md-button>
            <h2 class="md-title" style="flex: 1">Conversations</h2>
            <md-button class="md-icon-button">
                <md-icon>search</md-icon>
            </md-button>
        </md-toolbar>
        <md-layout>
            <md-list v-if="status === 'success'">
                <md-list-item v-for="convo in convos" :key="convo.id" @click="convoSelected(convo)">
                    <md-icon class="md-primary">face</md-icon>
                    <div class="md-list-text-container">
                        {{ conversationLabel(convo.participants, currentUser.id) }}
                        <!-- <span>at {{ convo.created_at }}</span> -->
                    </div>
                    <md-button class="md-icon-button md-list-action">
                        <md-icon class="md-primary">keyboard_arrow_right</md-icon>
                    </md-button>
                    <md-divider class="md-inset"></md-divider>
                </md-list-item>
                <md-list-item v-if="!convos.length">
                    No Conversations
                </md-list-item>
            </md-list>
            <md-layout v-if="status === 'pending'" md-align="center" md-vertical-align="center">
                <md-spinner md-indeterminate />
            </md-layout>
            <h2 v-if="status === 'reject'">Error Retrieving Conversations</h2>
            <new-conversation/>
        </md-layout>
    </md-layout>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { conversationLabel } from '../lib/helpers';

    export default {
        mounted() {
            this.getAllConversations();
        },
        computed: {
            ...mapGetters({
                convos: 'allConversations',
                status: 'allConversationsStatus',
                currentUser: 'currentUser'
            })
        },
        methods: {
            ...mapActions([
                'getAllConversations',
                'setActiveConversation'
            ]),
            conversationLabel: conversationLabel,
            convoSelected(conversation) {
                this.setActiveConversation(conversation);
                this.$router.push({ name: 'conversation', params: { convoId: conversation.id } })
            }
        }
    };
</script>
