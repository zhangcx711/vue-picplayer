import Vue from "vue";
import VueRouter from "vue-router";

import discovery from "../views/discovery.vue";
import playlists from "../views/playlists.vue";
import songs from "../views/songs.vue";
import mvs from "../views/mvs.vue";
import result from "../views/result.vue";
import playlist from "../views/playlist.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/discovery" },
  { path: "/discovery", component: discovery },
  { path: "/playlists", component: playlists },
  { path: "/songs", component: songs },
  { path: "/mvs", component: mvs },
  { path: "/result", component: result },
  { path: "/playlist", component: playlist },
];

const router = new VueRouter({
  routes,
});

export default router;
