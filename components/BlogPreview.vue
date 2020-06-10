<template>
  <nuxt-link :to="post.attributes.slug">
    <div class="card">
      <img class="image" :src="imgSrc" v-if="post.attributes.image" />
      <h1 class="title">
        {{ post.attributes.title }}
      </h1>

      <div>
        <div class="date">Published: {{ post.attributes.dateDisplay }}</div>
        <img class="thumbnail" src="../assets/images/me.png" />
        <div class="author">By {{ post.attributes.author }}</div>
        <div class="spreader">
          <span
            v-for="tag in post.attributes.tags"
            :key="tag.tag"
            class="tagss"
          >
            #{{ tag.toUpperCase() }}
          </span>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  },
  computed: {
    imgSrc() {
      return require(`~/assets/images/blog/${this.post.attributes.image}`)
    }
  },
  created() {
    console.log(this.post)
  }
}
</script>

<style scoped >
.card {
  width: 350px;
  height: 300px;
  position: relative;
  font-size: 0.7em;
  color: white;
  background-color: #12131b;
  border-radius: 6px;
  margin: 10px auto;
  filter: brightness(0.85);
  border-left: 6px solid rgb(20, 172, 152);
}
a {
  text-decoration: none;
}
.title {
  position: relative;
  z-index: 1;
  font-weight: 700;
  font-size: 3em;
  text-align: left;
  padding: 10px;
}

.date {
  position: relative;
  z-index: 1;
  left: 10px;
  font-weight: 500;
  color: rgb(255, 127, 212);
}
.author {
  position: absolute;
  z-index: 1;
  bottom: 10px;
  right: 10px;
  font-weight: 500;
}
.tagss {
  margin-right: 10px;
  position: relative;
  bottom: -18px;
  left: 5px;
  font-weight: 800;
  font-family: 'Lato';
}
.spreader {
  display: flex;
  position: absolute;
  bottom: 30px;
  left: 5px;
}
.image {
  width: 0;
}
.thumbnail {
  width: 40px;
  position: absolute;
  right: 12px;
  bottom: 26px;
}
.card:hover {
  filter: brightness(1);
  transition: filter 0.3s ease-in-out;
}

@media only screen and (min-width: 768px) {
  .image {
    width: 42%;
    height: 100%;
    max-height: 100%;
    filter: brightness(0.45);
    object-fit: cover;
  }
  .card {
    width: 90%;
    max-width: 700px;
    margin: 10px auto;
  }
  .title {
    left: 44%;
    top: 0;
    position: absolute;
  }
  .date {
    left: 46%;
    bottom: 10px;
    position: absolute;
    font-size: 1.2em;
  }
  .author {
    font-size: 1.2em;
  }
}
</style>