<template>
  <div class="wrapper">
    <h1>Cloud Cafe</h1>

    <div class="content">
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          placeholder="cafe name"
          name="name"
          v-model="currentName"
        />
        <input
          type="text"
          placeholder="city"
          name="city"
          v-model="currentCity"
        />
        <button type="submit">Add new cafe</button>
      </form>

      <ul>
        <li v-for="category in categories" :key="category.id">
          <span>{{ category.name }}</span>
          <span>{{ category.city }}</span>
          <button @click="onDelete(category.id)">x</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data: () => ({
    categories: [],
    currentName: "",
    currentCity: ""
  }),
  // components: {

  // }
  async mounted() {
    const categories = await this.$store.dispatch("getCollection");
    categories.forEach(doc => {
      const category = {
        id: null,
        name: "",
        city: ""
      };
      category.id = doc.id;
      category.name = doc.data().name;
      category.city = doc.data().city;
      this.categories.push(category);
    });
    console.log(this.categories[0]);
  },
  methods: {
    async handleSubmit() {
      const cafe = {
        name: this.currentName,
        city: this.currentCity
      };

      await this.$store.dispatch("setCollection", cafe);

      this.currentName = "";
      this.currentCity = "";
    },
    async onDelete(id) {
      await this.$store.dispatch("deleteCollection", id);
    }
  }
};
</script>

<style scoped>
.wrapper {
  background: #eab0dc;
  font-family: ubuntu;
  height: 100vw;
}

h1 {
  color: #fff;
  font-size: 64px;
  letter-spacing: 2px;
  margin: 0;
  padding: 0;
  text-align: center;
}

.content {
  background: #fff;
  max-width: 960px;
  margin: 30px auto;
  padding: 20px 30px;
  border-radius: 10px 120px 10px 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 20px;
  background: #f6f6f6;
  font-size: 20px;
  color: #555;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  height: 46px;
}

li:nth-child(even) {
  padding: 20px;
  background: #f2f2f2;
}

li span {
  display: block;
}

li span:nth-child(2) {
  font-size: 16px;
  margin-top: 6px;
  color: #999;
}

li button {
  position: absolute;
  top: 0;
  right: 0px;
  background: rgba(255, 255, 255, 0.6);
  width: 40px;
  text-align: center;
  padding: 10px 0;
  font-weight: bold;
  cursor: pointer;
}

form input {
  float: left;
  width: 38%;
  margin: 0;
  border: 0;
  border-bottom: 1px solid #eee;
  margin: 0 1%;
  padding: 10px;
  display: block;
  box-sizing: border-box;
  font-size: 18px;
}

form input:focus {
  outline: none;
  border-bottom: 3px solid #88236f;
  padding-bottom: 8px;
  transition: all ease 0.2s;
}

form:after {
  content: "";
  clear: both;
  display: block;
}

button {
  border: 0;
  background: #fff;
  border-radius: 10px;
  padding: 13px;
  width: 14%;
  box-shadow: -1px 0px 1px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  font-family: ubuntu;
  letter-spacing: 1px;
  color: #999;
}
</style>
