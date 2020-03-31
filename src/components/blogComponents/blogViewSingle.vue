<template>
  <v-container>
    <v-row justify="center">
      <v-card outlined flat width="1000px">
        <v-col>
          <v-card-title>
            <span class="blogTitle">
              {{ item.blogTitle }}
            </span>
          </v-card-title>
          <v-card-subtitle>
            <span class="blogSubtitle">
              {{ item.blogSubTitle }}
            </span>
          </v-card-subtitle>
        </v-col>
        <v-row justify="center">
          <v-col cols="9">
            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img class="elevation-6" :src="item.avatar">
                  </v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title> {{ item.author }} </v-list-item-title>
                </v-list-item-content>
                <v-row align="center" justify="end">
                  <v-card-subtitle v-text="item.newDate">
                  </v-card-subtitle>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-col>
          <v-img class="white--text align-end" :src="item.image" contain max-height="400px"></v-img>
        </v-col>
        <v-row justify="center">
          <v-col cols="8">
            <v-card-subtitle>{{ item.blogCategory }}</v-card-subtitle>
            <v-card-text>
              <span class="blogText">
                {{ item.blogText }}
              </span>
            </v-card-text>
            <v-flex class="d-flex justify-space-between">
              <v-btn v-show="toggleUserSignin" @click="blogEdit" fab dark small text color="grey">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-speed-dial v-show="toggleUserSignin" direction="right">
                <template v-slot:activator>
                  <v-btn fab text left small color="grey">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <v-btn fab dark small text color="grey">
                  <v-icon>mdi-close-thick</v-icon>
                </v-btn>
                <v-btn @click="deleteBlogPost(item._id)" fab dark small text color="grey">
                  <v-icon>mdi-check-bold</v-icon>
                </v-btn>
              </v-speed-dial>
            </v-flex>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  import Endpoints from '../../data/Endpoints'
  import format from 'date-fns/format'
  import parseISO from 'date-fns/parseISO'

  export default {
    data() {
      return {
        toggleUserSignin: false,
        id: this.$route.params.id,
        item: [],
      }
    },
    async created() {
      let response = await this.$http.get(Endpoints.blogSingleView + this.id)
      this.item = response.body;
      this.item.newDate = this.item.date ? format(parseISO(this.item.date), 'do MMM yyyy') : ''
      let responseToken = await this.$http.get(Endpoints.validateToken, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            });
            if (responseToken.status === 200) {
                this.toggleUserSignin = true
            }
    },
    computed: {
      formatedDate() {
        return this.due ? format(parseISO(this.due), 'do MMM yyyy') : ''
      }
    },
    methods: {
      blogEdit() {
        window.location.href = '/editblog/' + this.$route.params.id
      },
      async deleteBlogPost(id) {
        await this.$http.delete(Endpoints.blogSingleItemDelete + id, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        window.location.href = '/blog'
      }
    }
  }
</script>

<style>
  .blogTitle {
    font-size: 5.5rem;
    line-height: 1;
    text-align: center;
    display: flex;
    padding-bottom: 20px;
  }

  .blogSubtitle {
    line-height: 1;
    text-align: center;
    font-size: 32px;
    display: flex;
  }

  .blogText {
    font-size: 20px;
  }
</style>