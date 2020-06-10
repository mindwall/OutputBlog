<template>
  <div class="app">
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
    <blog :posts="posts" />
  </div>
</template>

<script>
import Tags from '~/components/Tags.vue'
import Blog from '~/components/Blog.vue'
import moment from 'moment'

export default {
  components: {
    Tags,
    Blog
  },

  async asyncData() {
    const resolve = await require.context('~/content/posts/', true, /\.md$/)
    let imports = resolve.keys().map(key => resolve(key))
    // filter out page type
    imports = imports.filter(post => !post.attributes.type)
    // sort by date
    imports.sort((a, b) =>
      moment(b.attributes.date, 'DD/MM/YYYY').diff(
        moment(a.attributes.date, 'DD/MM/YYYY')
      )
    )
    return {
      posts: imports
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');

html {
  background-color: #171922;
  color: white;
  font-size: 16px;
}
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.maintitle {
  font-family: 'Lato', sans-serif;
  /* font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; */
  display: block;
  font-weight: 700;
  font-size: 3em;
  letter-spacing: 1px;
  margin-top: 1em;
}
a {
  text-decoration: none;
  color: white;
}
.mainsubtitle {
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
  font-weight: 300;
  color: rgb(255, 127, 212);
}
</style>
