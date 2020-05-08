<template>
  <v-content>
    <v-img
      width="600px"
      height="200px"
      color="grey"
      tile
      class="mx-auto mt-12"
      :src="siteLogo"
    ></v-img>
    <v-container>
      <v-row justify="center">
        <v-col class="d-flex" cols="9">
          <v-layout class="mb-n5 me-5">
            <v-row>
              <v-col class="d-flex" lg="6" cols="12">
                <v-tooltip v-for="n in sortItems.length" :key="n" top>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      small
                      text
                      color="grey"
                      class="ml-3"
                      @click="sort(n)"
                      v-on="on"
                    >
                      <v-icon left small>{{
                        sortItems[n - 1].sortIcon
                      }}</v-icon>
                      <span class="caption text-lowercase">{{
                        sortItems[n - 1].sortType
                      }}</span>
                    </v-btn>
                  </template>
                  <span>{{ sortItems[n - 1].sortTooltip }}</span>
                </v-tooltip>
              </v-col>
              <v-col class="d-flex flex-column" lg="6" cols="12">
                <v-text-field
                  class="mt-n2"
                  solo-inverted
                  rounded
                  flat
                  hide-details
                  dense
                  color="black"
                  placeholder="search"
                  v-model="search"
                  append-icon="mdi-magnify"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-layout>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          v-for="(item, i) in filteredPosts"
          :key="i"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              v-bind:to="'/' + item._id"
              :elevation="hover ? 12 : 2"
              shaped
              class="mx-auto"
              width="1280px"
            >
              <v-row no-gutters class="mt-0">
                <v-col class="d-flex" sm="6" md="4">
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    min-height="212px"
                    :src="item.image"
                  >
                  </v-img>
                </v-col>
                <v-col class="d-flex flex-column" sm="6" md="8">
                  <v-card-subtitle id="itemCategory" class="pb-0"
                    >{{ item.blogCategory }}
                  </v-card-subtitle>
                  <v-card-title id="itemTitle" class="py-0">{{
                    item.blogTitle
                  }}</v-card-title>
                  <v-card-text
                    id="itemSubtitle"
                    v-text="item.blogSubTitle"
                    class="text--primary pb-0"
                  >
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-avatar size="30">
                      <v-img :src="item.avatar"></v-img>
                    </v-avatar>
                    <v-spacer></v-spacer>
                    <v-card-subtitle v-text="item.newDate"> </v-card-subtitle>
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
import ImageLinks from "../../data/ImageLinks";
import Endpoints from "../../data/Endpoints";
import { sortKeyword } from "../../data/Funcs";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  name: "blog",

  methods: {
    sort(prop) {
      let keyword = sortKeyword(prop);
      if (this.searchToggle) {
        this.items.sort((a, b) => (a[keyword] < b[keyword] ? -1 : 1));
        this.searchToggle = !this.searchToggle;
      } else {
        this.items.sort((a, b) => (b[keyword] < a[keyword] ? -1 : 1));
        this.searchToggle = !this.searchToggle;
      }
    },
  },

  computed: {
    filteredPosts() {
      return this.items.filter((item) => {
        return item.blogText.match(this.search);
      });
    },
  },

  async created() {
    let response = await this.$http.get(Endpoints.blogItemGet);
    this.items = response.body;
    this.items.forEach((element) => {
      element.newDate = element.date
        ? format(parseISO(element.date), "do MMM yyyy")
        : "";
    });
    this.items.reverse();
  },

  data: () => ({
    sortItems: [
      {
        sortIcon: "mdi-folder",
        sortType: "by post title",
        sortTooltip: "sort by post title",
      },
      {
        sortIcon: "mdi-account",
        sortType: "by author",
        sortTooltip: "sort by author",
      },
      {
        sortIcon: "mdi-calendar-range",
        sortType: "by date",
        sortTooltip: "sort by date",
      },
    ],
    siteLogo: ImageLinks.images.Logo,
    fab: true,
    searchToggle: false,
    search: "",
    items: [],
  }),
};
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

@media screen and (max-width: 960px) {
  #itemTitle {
    font-size: 24px;
  }
  #itemSubtitle {
    font-size: 16px;
  }
}
</style>
