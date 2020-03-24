<template>
    <v-flex xs12 :class="classes">
        <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 2" shaped width="400" class="flex-column d-flex mx-auto"
                v-bind:to="'/' + item._id" :size="layout[i]">
                <v-img class="white--text align-end" height="200px" max-height="200px" src="">
                </v-img>
                <v-card-subtitle class="pb-0">{{ item.blogCategory }}</v-card-subtitle>
                <v-card-title class="py-0">{{ item.blogTitle }}</v-card-title>
                <v-card-text v-text="item.blogSubTitle" class="text--primary pb-0"></v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions>
                    <v-avatar size="30">
                        <v-img src=""></v-img>
                    </v-avatar>
                    <v-spacer></v-spacer>
                    <v-card-subtitle v-text="item.newDate">
                    </v-card-subtitle>
                </v-card-actions>
            </v-card>
        </v-hover>
    </v-flex>
</template>

<script>
    export default {
        props: {
            size: {
                type: Number,
                required: true
            },
            item: {
                type: Object,
                default: () => ({})
            }
        },

        computed: {
            classes() {
                return {
                    'md6': this.size === 2,
                    'md4': this.size === 3
                }
            }
        }
    }
</script>

<style>
    .v-image__image {
        transition: .3s linear;
    }
</style>