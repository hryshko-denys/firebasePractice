import Vue from "vue";
import Vuex from "vuex";
import { DB } from "../firebase/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collection: []
  },
  mutations: {
    setCollection(state, currentCollection) {
      state.collection = currentCollection;
    }
  },
  getters: {
    getCollection: state => state.collection,
  },
  actions: {
    async getCollection() {
      return (await DB.collection("cafes").orderBy("city", ).get()).docs;
    },
    async setCollection({dispatch}, cafe) {
      return await DB.collection("cafes").add(cafe);
    },
    async deleteCollection({dispatch}, id) {
      return await DB.collection("cafes").doc(id).delete();
    }
  },
  modules: {}
});
