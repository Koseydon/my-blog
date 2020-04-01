<template>
    <v-content>
        <v-img width="500px" height="200px" color="grey" tile class="mx-auto mt-12"
            src="http://dreamforge.space:3000/logos/MoB-logo.png"></v-img>
        <v-container>
            <v-row justify="center">
                <v-col cols="9">
                    <v-layout class="mb-n3 mx-2">
                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <v-btn small text color="grey" class="ml-3" @click="sort('blogTitle')" v-on="on">
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
                <v-col class="d-flex" cols="12" v-for="(item, i) in filteredPosts" :key="i">
                    <v-hover v-slot:default="{ hover }">
                        <v-card v-bind:to="'/' + item._id" :elevation="hover ? 12 : 2" shaped class="mx-auto"
                            width="1280px">
                            <v-row no-gutters class="mt-0">
                                <v-col class="d-flex" cols="3">
                                    <v-img class="white--text align-end" height="200px" :src="item.image">
                                    </v-img>
                                </v-col>
                                <v-col class="d-flex flex-column" cols="9">
                                    <v-card-subtitle id="itemCategory" class="pb-0">{{ item.blogCategory }}
                                    </v-card-subtitle>
                                    <v-card-title id="itemTitle" class="py-0">{{ item.blogTitle }}</v-card-title>
                                    <v-card-text id="itemSubtitle" v-text="item.blogSubTitle"
                                        class="text--primary pb-0">
                                    </v-card-text>
                                    <v-spacer></v-spacer>
                                    <v-card-actions>
                                        <v-avatar size="30">
                                            <v-img :src="item.avatar"></v-img>
                                        </v-avatar>
                                        <v-spacer></v-spacer>
                                        <v-card-subtitle v-text="item.newDate">
                                        </v-card-subtitle>
                                    </v-card-actions>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
    import Endpoints from '../../data/Endpoints'
    import format from 'date-fns/format'
    import parseISO from 'date-fns/parseISO'

    export default {
        name: 'blog',

        methods: {

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
                    return item.blogText.match(this.search);
                });
            }
        },

        async created() {
            let response = await this.$http.get(Endpoints.blogItemGet)
            this.items = response.body
            this.items.forEach(element => {
                element.newDate = element.date ? format(parseISO(element.date), 'do MMM yyyy') : ''
            });
            this.items.reverse()
        },

        data: () => ({
            fab: true,
            searchToggle: false,
            search: '',
            items: [],
        }),
    }
</script>

<style>
    #itemTitle {
        font-size: 36px;
        line-height: 1;
    }

    #itemSubtitle {
        font-size: 20px;
        line-height: 1;
    }
</style>