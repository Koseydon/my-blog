<template>
  <v-content>
    <viewBlogPopup />
      <v-img width="500px" height="200px" color="grey" tile class="mx-auto mt-12"
                src="../../images/logos/MoB-logo.png"></v-img>
      <v-container>
        <v-row>
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 2" shaped class="mx-auto" width="1280px" @click="blogPopupToggle">
              <v-row no-gutters class="mt-0">
                <v-col class="d-flex" cols="8">
                  <v-img class="white--text align-end" height="300px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                  </v-img>
                </v-col>
                <v-col class="d-flex flex-column" cols="4">
                  <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>
                  <v-card-title class="py-0">Top 10 Australian beaches</v-card-title>
                  <v-card-text class="text--primary pb-0">
                    <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, esse debitis consectetur
                      doloribus voluptatibus sequi quo. Magni, dolore. Eaque, expedita. Officiis excepturi ipsam
                      inventore, nesciunt eligendi natus est odit nobis?</div>
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-avatar size="30">
                      <v-img :src="firstItem[0].avatar"></v-img>
                    </v-avatar>
                    <v-spacer></v-spacer>
                    <v-card-subtitle v-text="firstItem[0].date">
                    </v-card-subtitle>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex" cols="3" v-for="(item, i) in items" :key="i">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover ? 12 : 2" shaped width="400" class="flex-column d-flex mx-auto"
                @click="blogPopupToggle">
                <v-img class="white--text align-end" height="200px" max-height="200px"
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                </v-img>
                <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>
                <v-card-title class="py-0">Top 10 Australian beaches</v-card-title>
                <v-card-text v-text="item.text" class="text--primary pb-0">
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-avatar size="30">
                    <v-img :src="item.avatar"></v-img>
                  </v-avatar>
                  <v-spacer></v-spacer>
                  <v-card-subtitle v-text="item.date">
                  </v-card-subtitle>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
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
    },

    data: () => ({
      firstItem: [{
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
        avatar: 'http://localhost:8080/img/JINXED.337e981a.gif',
        date: '01.01.2020'
      }],
      items: [{
          color: '#cccccc',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
          text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, esse debitis consectetur doloribus voluptatibus sequi quo. Magni, dolore. Eaque, expedita. Officiis excepturi ipsam inventore, nesciunt eligendi natus est odit nobis?',
          avatar: 'http://localhost:8080/img/JINXED.337e981a.gif',
          date: '01.01.2020'
        },
        {
          color: '#cccccc',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
          text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, esse debitis consectetur doloribus voluptatibus sequi quo. Magni, dolore. Eaque, expedita. Officiis excepturi ipsam inventore, nesciunt eligendi natus est odit nobis?',
          avatar: 'http://localhost:8080/img/JINXED.337e981a.gif',
          date: '01.01.2020'
        },
        {
          color: '#cccccc',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
          text: '',
          avatar: 'http://localhost:8080/img/JINXED.337e981a.gif',
          date: '01.01.2020'
        },
        
      ],
    }),
  }
</script>