<template>
  <div>
    <nuxt-link to="/">
      <div class="container">
        <h1 class="maintitle">{ Output }</h1>
        <h2 class="mainsubtitle">
          by mindwall
        </h2>
      </div>
    </nuxt-link>
    <h3 class="desc">The journey of teaching myself to code</h3>
    <tags :posts="posts" />
    <div class="blogs">
      <preview v-for="post in posts" :key="post.title" :post="post">
        <nuxt-link :to="post.attributes.slug"> </nuxt-link>
      </preview>
    </div>
  </div>
</template>

<script>
import Preview from '~/components/BlogPreview.vue'
import moment from 'moment'
import Tags from '~/components/Tags.vue'

export default {
  async asyncData({ params }) {
    const resolve = await require.context('~/content/posts/', true, /\.md$/)
    let imports = resolve.keys().map(key => resolve(key))
    // filter out page type
    imports = imports.filter(post => !post.attributes.type)
    imports = imports.filter(
      post => post.attributes.tags.filter(tag => tag === params.slug).length
    )
    // sort by date
    imports.sort((a, b) =>
      moment(b.attributes.date, 'DD/MM/YYYY').diff(
        moment(a.attributes.date, 'DD/MM/YYYY')
      )
    )
    return {
      posts: imports
    }
  },
  components: {
    Preview,
    Tags
  }
}
</script>

<style scoped>
.blogs {
  display: grid;
  width: 90%;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(350px, 2fr));
  grid-gap: 10px;
  margin-bottom: 3em;
}
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Lato', sans-serif;
  /* font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; */
  display: block;
  font-weight: 700;
  font-size: 3em;
  letter-spacing: 1px;
  margin-top: 1em;
}

.subtitle {
  font-weight: 300;
  font-size: 1em;
  color: #526488;
  word-spacing: 5px;
  margin-top: 2em;
  padding-bottom: 15px;
}
.desc {
  text-align: center;
  margin: 1em 0;
  font-weight: 200;
  color: rgb(255, 127, 212);
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