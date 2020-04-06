<template>
    <nav>
        <todoPopupAdd />
        <v-app-bar dark>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="grey--text">
                <span class="text-lowercase">dream</span>
                <span class="font-weight-light text-uppercase">Forge</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-speed-dial v-show="!toggleUserSignin" direction="left">
                <template v-slot:activator>
                    <v-btn small text fab color="grey">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <loginPopup />
                <signupPopup />
            </v-speed-dial>
            <v-btn v-show="toggleUserSignin" @click="logout" small text fab color="red">
                <v-icon>mdi-account-remove</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer color="grey darken-3" temporary app v-model="drawer">
            <v-flex class="mt-4 mb-3">
            </v-flex>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title grey--text">
                        Application
                    </v-list-item-title>
                    <v-list-item-subtitle class="grey--text">
                        subtext
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item color="grey darken-2" v-for="link in links" :key="link.text" router :to="link.route">
                <v-icon class="grey--text" left>{{ link.icon }}
                </v-icon>
                <v-list-item-title class="grey--text text-left">{{ link.text }}</v-list-item-title>
                <v-list-item-action v-if="link.add">
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-icon v-show="toggleUserSignin" color="grey darken-2"
                                @click.prevent="popupToggle(link.add)" v-on="on">
                                mdi-plus</v-icon>
                        </template>
                        <span>{{ link.ttip }}</span>
                    </v-tooltip>
                </v-list-item-action>
            </v-list-item>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    import Endpoints from '../data/Endpoints'
    import signupPopup from './signupPopup'
    import loginPopup from './loginPopup'
    import todoPopupAdd from '../components/todoComponents/todoPopupAdd'
    import navbarLinks from '../data/navbarLinks'
    import {
        bus
    } from '../main';

    export default {
        name: 'navbar',

        components: {
            signupPopup,
            loginPopup,
            todoPopupAdd
        },

        methods: {
            logout() {
                localStorage.setItem('token', '');
                window.location.href = '/';
            },
            popupToggle(popup) {
                if (popup === 'addblog') {
                    window.location.href = '../' + popup;
                } else {
                    bus.$emit('addtodopopuptoggle')
                }
            },
            toRoute(rname) {
                this.$router.push(rname)
            }
        },

        data() {
            return {
                drawer: false,
                links: [],
                toggleUserSignin: false
            }
        },

        async created() {
            this.links = navbarLinks.links
            let responseToken = await this.$http.get(Endpoints.validateToken, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            });
            if (responseToken.status === 200) {
                this.toggleUserSignin = true
            }
        },
    };
</script>