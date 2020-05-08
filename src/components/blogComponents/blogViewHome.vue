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
      <v-row justify="center" v-for="(item, i) in firstItem" :key="i">
        <v-col sm="9" md="12">
          <v-hover v-slot:default="{ hover }">
            <v-card
              id="first-card"
              :elevation="hover ? 12 : 2"
              shaped
              class="flex-column d-flex mx-auto"
              width="1280px"
              v-bind:to="'/' + item._id"
            >
              <v-row no-gutters class="mt-0">
                <v-col class="d-flex" md="8">
                  <v-img
                    id="first-card-image"
                    class="white--text align-end"
                    height="400px"
                    :src="item.image"
                  >
                  </v-img>
                </v-col>
                <v-col class="d-flex flex-column" md="4">
                  <v-card-subtitle class="pb-0">{{
                    item.blogCategory
                  }}</v-card-subtitle>
                  <v-card-title id="first-card-blog-title" class="py-0">{{
                    item.blogTitle
                  }}</v-card-title>
                  <v-card-text
                    id="first-card-blog-subtitle"
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
      <v-row justify="center">
        <v-col
          sm="9"
          md="6"
          lg="4"
          xl="3"
          class="d-flex"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              shaped
              width="400"
              class="flex-column d-flex mx-auto"
              v-bind:to="'/' + item._id"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                max-height="200px"
                :src="item.image"
              >
              </v-img>
              <v-card-subtitle class="pb-0">{{
                item.blogCategory
              }}</v-card-subtitle>
              <v-card-title class="py-0">{{ item.blogTitle }}</v-card-title>
              <v-card-text
                v-text="item.blogSubTitle"
                class="text--primary pb-0"
              ></v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-avatar size="30">
                  <v-img :src="item.avatar"></v-img>
                </v-avatar>
                <v-spacer></v-spacer>
                <v-card-subtitle v-text="item.newDate"> </v-card-subtitle>
              </v-card-actions>
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
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  name: "blogViewHome",

  data: () => ({
    siteLogo: ImageLinks.images.Logo,
    firstItem: [],
    items: [],
  }),

  async created() {
    let response = await this.$http.get(Endpoints.blogItemGet);
    if (response.body.length > 4) {
      this.items = response.body.slice(response.body.length - 4);
    } else {
      this.items = response.body;
    }

    this.items.forEach((element) => {
      element.newDate = element.date
        ? format(parseISO(element.date), "do MMM yyyy")
        : "";
    });

    this.firstItem.push(this.items.pop());
    this.items = this.items.reverse();
  },
};
</script>

<style>
#first-card-blog-title {
  font-size: 36px;
  line-height: 1.3;
}
#first-card-blog-subtitle {
  font-size: 24px;
  line-height: 1;
}
@media screen and (max-width: 960px) {
  #first-card {
    max-width: 400px;
  }
  #first-card-image {
    height: 200px !important;
  }
  #first-card-blog-title {
    font-size: inherit;
    line-height: inherit;
  }
  #first-card-blog-subtitle {
    font-size: inherit;
    line-height: inherit;
  }
}
@media screen and (max-width: 470px) {
  #first-card {
    max-width: inherit;
  }
}
</style>
