<template>
    <v-content>
        <viewBlogPopup />
        <v-container>
            <v-img width="500px" height="200px" color="grey" tile class="mx-auto mt-12"
                src="../../images/logos/MoB-logo.png"></v-img>
            <v-container>
                <v-row justify="center">
                    <v-col cols="9">
                        <v-layout class="mb-n3 ml-n3">
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-btn small text color="grey" class="ml-3" @click="sort('title')" v-on="on">
                                        <v-icon left small>mdi-folder</v-icon>
                                        <span class="caption text-lowercase">Post Title</span>
                                    </v-btn>
                                </template>
                                <span>sort by post title</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-btn small text color="grey" @click="sort('author')" v-on="on">
                                        <v-icon left small>mdi-account</v-icon>
                                        <span class="caption text-lowercase">By Author</span>
                                    </v-btn>
                                </template>
                                <span>sort by author</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-btn small text color="grey" @click="sort('date')" v-on="on">
                                        <v-icon left small>mdi-calendar-range</v-icon>
                                        <span class="caption text-lowercase">By Date</span>
                                    </v-btn>
                                </template>
                                <span>sort by date</span>
                            </v-tooltip>
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                            <v-text-field class="mb-n3 mt-n1 me-2" solo-inverted rounded flat hide-details dense
                                color="black" placeholder="search" v-model="search" append-icon="mdi-magnify">
                            </v-text-field>
                        </v-layout>
                    </v-col>
                    <v-col class="d-flex" cols="12" v-for="(item, i) in items" :key="i">
                        <v-hover v-slot:default="{ hover }">
                            <v-card :elevation="hover ? 12 : 2" shaped class="mx-auto" width="1280px"
                                @click="blogPopupToggle">
                                <v-row no-gutters class="mt-0">
                                    <v-col class="d-flex" cols="4">
                                        <v-img class="white--text align-end" height="300px" :src="item.src">
                                        </v-img>
                                    </v-col>
                                    <v-col class="d-flex flex-column" cols="8">
                                        <v-card-subtitle class="pb-0">{{ item.category }}</v-card-subtitle>
                                        <v-card-title class="py-0">{{ item.title }}</v-card-title>
                                        <v-card-text v-text="item.text" class="text--primary pb-0">
                                        </v-card-text>
                                        <v-spacer></v-spacer>
                                        <v-card-actions>
                                            <v-avatar size="30">
                                                <v-img src=""></v-img>
                                            </v-avatar>
                                            <v-spacer></v-spacer>
                                            <v-card-subtitle v-text="item.date">
                                            </v-card-subtitle>
                                        </v-card-actions>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
    </v-content>
</template>

<script>
    import viewBlogPopup from '../blogComponents/viewBlogPopup'
    import {
        bus
    } from '../../main';

    export default {
        name: 'blog',

        components: {
            viewBlogPopup
        },
        methods: {
            blogPopupToggle() {
                bus.$emit('blogpopuptoggle')
            },
            sort(prop) {
                if (this.searchToggle) {
                    this.items.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
                    this.searchToggle = !this.searchToggle
                } else {
                    this.items.sort((a, b) => b[prop] < a[prop] ? -1 : 1)
                    this.searchToggle = !this.searchToggle
                }

            }
        },
        computed: {
            filteredPosts() {
                return this.items.filter((item) => {
                    return item.text.match(this.search);
                });
            }
        },
        data: () => ({
            searchToggle: true,
            search: '',
            items: [{
                    src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                    category: 'Music',
                    title: 'Halcyon Days',
                    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, esse debitis consectetur doloribus voluptatibus sequi quo. Magni, dolore. Eaque, expedita. Officiis excepturi ipsam inventore, nesciunt eligendi natus est odit nobis?',
                    avatar: '../images/avatars/JINXED.gif',
                    date: '01.01.2020',
                    author: 'Kel'
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
                    category: 'Games',
                    title: 'AaaaOyunlarda bir hafta',
                    text: 'Sadece bir text olabilir mi? yoksa daha öteki birşeymi',
                    avatar: 'http://localhost:8080/img/JINXED.337e981a.gif',
                    date: '02.01.2020',
                    author: 'Dana'
                },
            ],
        }),
    }
</script>