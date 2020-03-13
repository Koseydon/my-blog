<template>
    <nav>
        <v-app-bar dark>
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="grey--text">
                <span class="text-lowercase">my</span>
                <span class="font-weight-light text-uppercase">Blog</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-speed-dial direction="left">
                <template v-slot:activator>
                    <v-btn small text fab color="grey">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <loginPopup />
                <signupPopup />
            </v-speed-dial>
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
                <v-icon class="grey--text" left>{{ link.icon }}</v-icon>
                <v-list-item-title class="grey--text text-left">{{ link.text }}</v-list-item-title>
            </v-list-item>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    import signupPopup from './signupPopup'
    import loginPopup from './loginPopup'

    export default {
        name: 'navbar',

        components: {
            signupPopup,
            loginPopup
        },

        data() {
            return {
                drawer: false,
                links: [{
                        icon: 'mdi-view-dashboard',
                        text: 'Home',
                        route: '/'
                    },
                    {
                        icon: 'mdi-folder',
                        text: 'Blog',
                        route: '/blog'
                    },
                    {
                        icon: 'mdi-account-multiple',
                        text: 'To Do List admin',
                        route: '/todo'
                    },
                    {
                        icon: 'mdi-account-multiple',
                        text: 'blog admin',
                        route: '/adminBlog'
                    },
                ],
            }

        }
    };
</script>

<style>

</style>