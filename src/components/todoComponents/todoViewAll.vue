<template>
  <v-content>
    <v-container>
      <v-img width="500px" height="200px" color="grey" tile class="mx-auto mt-12" src="/backend/logos/MoB-logo.png">
      </v-img>
      <v-container>
        <v-row justify="center">
          <v-col cols="9">
            <v-layout row class="mb-3">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn small text color="grey" class="ml-3" @click="sort('todoTitle')" v-on="on">
                    <v-icon left small>mdi-folder</v-icon>
                    <span class="caption text-lowercase">By project name</span>
                  </v-btn>
                </template>
                <span>sort by project name</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn small text color="grey" @click="sort('person')" v-on="on">
                    <v-icon left small>mdi-account</v-icon>
                    <span class="caption text-lowercase">By Person</span>
                  </v-btn>
                </template>
                <span>sort by person</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn small text color="grey" @click="sort('due')" v-on="on">
                    <v-icon left small>mdi-calendar</v-icon>
                    <span class="caption text-lowercase">By Due Date</span>
                  </v-btn>
                </template>
                <span>sort by due date</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn small text color="grey" @click="sort('status')" v-on="on">
                    <v-icon left small>mdi-check</v-icon>
                    <span class="caption text-lowercase">By Status</span>
                  </v-btn>
                </template>
                <span>sort by status</span>
              </v-tooltip>
              <v-spacer></v-spacer>
            </v-layout>
            <v-card flat v-for="project in newProjects" :key="project.todoTitle">
              <v-layout @click="project.show = !project.show" wrap :class="`pa-3 project ${project.status}`">
                <v-flex xs12 md6 xl6>
                  <div class="caption grey--text">Project Title</div>
                  <div>{{ project.todoTitle }}</div>
                </v-flex>
                <v-flex xs12 sm4 md2 xl2>
                  <div class="caption grey--text">Person</div>
                  <div>{{ project.person }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2 xl2>
                  <div class="caption grey--text">Due by</div>
                  <div>{{ project.newDate }}</div>
                </v-flex>
                <v-flex xs2 sm4 md2 xl1>
                  <div class="text-right">
                    <v-chip small :color="`${project.status}`" :class="`v-chip--active white--text caption my-2`">
                      {{ project.status }}</v-chip>
                  </div>
                </v-flex>
                <v-flex class="d-flex flex-row-reverse" xs2 sm4 md2 xl1>
                  <v-speed-dial v-if="toggleUserSignin" @click.native.stop direction="right">
                    <template v-slot:activator>
                      <v-btn fab text left small color="grey">
                        <v-icon small>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <v-btn fab dark small text color="grey">
                      <v-icon>mdi-close-thick</v-icon>
                    </v-btn>
                    <v-btn @click="deleteTodoPost(project._id)" fab dark small text color="grey">
                      <v-icon>mdi-check-bold</v-icon>
                    </v-btn>
                  </v-speed-dial>
                  <todoPopupEdit v-if="toggleUserSignin" v-bind:inputId="project._id" />
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-slide-y-transition>
                <v-card-text v-show="project.show">
                  <b>INFO: </b>
                  <div class="text-lg-left">{{ project.todoTitle }}</div>
                </v-card-text>
              </v-slide-y-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-content>
</template>

<script>
  import todoPopupEdit from '../todoComponents/todoPopupEdit'
  import format from 'date-fns/format'
  import parseISO from 'date-fns/parseISO'
  import Endpoints from '../../data/Endpoints'

  export default {
    name: 'dashboard',
    components: {
      todoPopupEdit,
    },

    data() {
      return {
        searchToggle: true,
        newProjects: [],
        projects: [],
        snackbarEdited: false,
        postDeleted: false,
        toggleUserSignin: true,
      }
    },
    methods: {
      async deleteTodoPost(id) {
        await this.$http.delete(Endpoints.todoSingleItemDelete + id, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
        location.reload();
      },
      addShow() {
        this.newProjects = this.projects.map(projects => ({
          ...projects,
          show: false
        }));
      },
      sort(prop) {
        if (this.searchToggle) {
          this.newProjects.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
          this.searchToggle = !this.searchToggle
        } else {
          this.newProjects.sort((a, b) => b[prop] < a[prop] ? -1 : 1)
          this.searchToggle = !this.searchToggle
        }
      }
    },
    async created() {
      let response = await this.$http.get(Endpoints.todoItemGet)
      this.projects = response.body;
      this.projects.forEach(element => {
        element.newDate = element.due ? format(parseISO(element.due), 'do MMM yyyy') : ''
      });
      this.addShow()
      let responseToken = await this.$http.get(Endpoints.validateToken, {
        headers: {
          'token': localStorage.getItem('token')
        }
      });
      if (responseToken.status === 200) {
        this.toggleUserSignin = true
      }

      // this.addShow()
      // this.$http.get(Endpoints.validateToken, {
      //   headers: {
      //     'token': localStorage.getItem('token')
      //   }
      // }).then(response => {
      //   if (response.status === 200) {
      //     this.toggleUserSignin = true
      //   }
      // });
    },
  }
</script>

<style>
  .project.complete {
    border-left: 4px solid #3CD1C2;
  }

  .project.ongoing {
    border-left: 4px solid orange
  }

  .project.overdue {
    border-left: 4px solid tomato;
  }

  .v-chip.complete {
    background: #3CD1C2;
  }

  .v-chip.ongoing {
    background: orange
  }

  .v-chip.overdue {
    background: tomato;
  }
</style>