<template>
  <v-content>
    <v-container>
      <v-img width="500px" height="200px" color="grey" tile class="mx-auto mt-12" src="../../images/logos/MoB-logo.png">
      </v-img>
      <v-container>
        <v-row justify="center">
          <v-col cols="9">
            <v-layout row class="mb-3">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn small text color="grey" class="ml-3" @click="sort('title')" v-on="on">
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
              <Popup/>
            </v-layout>
            <v-card @click="project.show = !project.show" flat v-for="project in newProjects" :key="project.title">
              <v-layout wrap :class="`pa-3 project ${project.status}`">
                <v-flex xs12 md6 xl6>
                  <div class="caption grey--text">Project Title</div>
                  <div>{{ project.title }}</div>
                </v-flex>
                <v-flex xs12 sm4 md2 xl2>
                  <div class="caption grey--text">Person</div>
                  <div>{{ project.person }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2 xl2>
                  <div class="caption grey--text">Due by</div>
                  <div>{{ project.due }}</div>
                </v-flex>
                <v-flex xs2 sm4 md2 xl1>
                  <div class="text-right">
                    <v-chip small :color="`${project.status}`" :class="`v-chip--active white--text caption my-2`">
                      {{ project.status }}</v-chip>
                  </div>
                </v-flex>
                <v-flex class="d-flex flex-row-reverse" xs2 sm4 md2 xl1>
                  <PopupDelete @postDelete="postDeleted = true" v-bind:inputId="project._id" />
                  <PopupEdit @snackbarOn="snackbarEdited = true" v-bind:inputId="project._id" />
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-slide-y-transition>
                <v-card-text v-show="project.show">
                  <div class="text-lg-right"><b>DOB: </b>{{ project.title }}</div>
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
  import PopupEdit from '../todoComponents/PopupEdit'
  import PopupDelete from '../todoComponents/PopupDelete'
  import Popup from '../todoComponents/Popup'

  export default {
    name: 'dashboard',
    components: { PopupEdit, PopupDelete, Popup },
    mounted() {
      this.addShow()
    },
    data() {
      return {
        searchToggle: true,
        newProjects: [],
        projects: [{
            status: 'ongoing',
            title: 'deneme 2',
            person: 'deneme 2',
            due: '02.01.2012'
          },
          {
            status: 'overdue',
            title: 'deneme 1',
            person: 'deneme 1',
            due: '01.01.2012'
          },
        ],
        snackbarEdited: false,
        postDeleted: false,
      }
    },
    methods: {
      addShow() {
        this.newProjects = this.projects.map(projects => ({
          ...projects,
          show: false
        }))
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