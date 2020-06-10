<template>
  <div class="tags">
    <div
      v-for="tag in tags"
      :key="tag.key"
      :style="{ backgroundColor: tag.color }"
      class="tag"
    >
      <nuxt-link :to="'/tag/' + tag.tag">#{{ tag.tag }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array
    }
  },
  data() {
    return {
      tags: [
        { tag: 'javascript', color: '#90C53F' },
        { tag: 'python', color: '#09C372' },
        { tag: 'vue', color: '#E10097' },
        { tag: 'html', color: '#FFCB2B' },
        { tag: 'markdown', color: '#FF3E00' },
        { tag: 'angular', color: '#DC0530' },
        { tag: 'css', color: '#029E74' }
      ]
    }
  }
}
</script>

<style scoped>
.tags {
  width: 90%;
  border-radius: 15px;
  background-color: #12131b;
  margin: 30px auto;
  display: flex;
  min-width: 350px;
  flex-wrap: wrap;
  padding: 10px;
  text-align: center;
  margin-top: 20px;
}
.tag {
  height: 26px;
  font-size: 1.2em;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding-left: 4px;
  padding-right: 4px;
  margin-right: 5px;
  border-radius: 10px;
  margin-bottom: 3px;
  margin-top: 3px;
}
.tag a {
  color: white;
  font-weight: 700;
  text-decoration: none;
}
</style>