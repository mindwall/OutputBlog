<template>
  <div>
    <!-- <h1>Output > Input</h1> -->
    <div class="blogs">
      <preview v-for="post in posts" :key="post.title" :post="post">
        <nuxt-link :to="post.attributes.slug"> </nuxt-link>
      </preview>
    </div>

    <!-- <ul>
      <li v-for="post in posts" :key="post.attributes.title">
        <nuxt-link :to="post.attributes.slug">{{
          post.attributes.title
        }}</nuxt-link>
      </li>
    </ul> -->
  </div>
</template>

<script>
import Preview from '~/components/BlogPreview.vue'

export default {
  props: {
    posts: {
      type: Array
    },
    mode: {
      type: String
    }
  },
  components: {
    Preview
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1em;
  margin-top: 1em;
}
.blogs {
  display: grid;
  width: 90%;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 10px;
  margin-bottom: 3em;
}
.subtitle {
  font-weight: 300;
  font-size: 1em;
  color: #526488;
  word-spacing: 5px;
  margin-top: 2em;
  padding-bottom: 15px;
}
@media only screen and (min-width: 768px) {
  .blogs {
    grid-template-columns: 1fr;
  }
}
@media only screen and (min-width: 1366px) {
  .blogs {
    grid-template-columns: 1fr 1fr;
  }
}
</style>