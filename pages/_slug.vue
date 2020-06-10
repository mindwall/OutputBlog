<template>
  <div class="blog">
    <nuxt-link to="/">
      <div class="container">
        <h1 class="maintitle">{ Output }</h1>
        <h2 class="mainsubtitle">
          by mindwall
        </h2>
      </div>
    </nuxt-link>
    <div class="post-head">
      <img class="image" :src="imgSrc" v-if="post.attributes.image" />
      <h1 class="title">{{ post.attributes.title }}</h1>

      <div class="infos">
        <span class="author">By {{ post.attributes.author }}</span>
        <span class="date">on {{ post.attributes.dateDisplay }}</span>
        <span class="tags">
          <span v-for="tag in post.attributes.tags" :key="tag.tag">
            <nuxt-link :to="'/tag/' + tag">#{{ tag }}</nuxt-link>
          </span>
        </span>
      </div>
    </div>
    <div class="content" v-html="post.html"></div>
    <div class="share">
      <span class="text">
        Sharing is caring
      </span>
      <ShareNetwork
        class="shareble"
        network="facebook"
        :url="url"
        :title="post.attributes.title"
        :description="post.attributes.short"
      >
        <img src="../assets/images/facebook-32.png" alt="facebook logo" />
      </ShareNetwork>
      <ShareNetwork
        class="shareble"
        network="twitter"
        :url="url"
        :title="post.attributes.title"
        :description="post.attributes.short"
      >
        <img src="../assets/images/twitter-32.png" alt="tweeter logo" />
      </ShareNetwork>
      <ShareNetwork
        class="shareble"
        network="Email"
        :url="url"
        :title="post.attributes.title"
        :description="post.attributes.short"
      >
        <img src="../assets/images/email-12-32.png" alt="email logo" />
      </ShareNetwork>
      <ShareNetwork
        class="shareble"
        network="WhatsApp"
        :url="url"
        :title="post.attributes.title"
        :description="post.attributes.short"
      >
        <img src="../assets/images/whatsapp-32.png" alt="whatsapp logo" />
      </ShareNetwork>
      <span class="counter">
        <span class="meter">cool</span>
        <span class="count"> {{ this.cool }} </span>
        <button class="cool" @click="cooler()" :disabled="clicked">
          cool story, bro
        </button>
      </span>
    </div>
    <div class="comments">
      <comments :slug="slug" />
    </div>
  </div>
</template>
<script>
import Comments from '~/components/Comments.vue'
import { fireDb } from '~/plugins/firebase.js'

export default {
  async asyncData({ params }) {
    let post = await import(`~/content/posts/${params.slug}.md`)
    return { post }
  },
  components: { Comments },
  created() {
    this.getCools()
    console.log(this.url)
  },

  computed: {
    imgSrc() {
      return require(`~/assets/images/blog/${this.post.attributes.image}`)
    },
    url() {
      return `http://blog.ivantonev.com${this.post.attributes.slug}`
    },
    slug() {
      const slug = this.post.attributes.slug
      const dbslug = slug.substring(1)
      return dbslug
    }
  },
  data() {
    return {
      cool: '',
      clicked: false
    }
  },
  methods: {
    async getCools() {
      const ref = fireDb.collection('Posts').doc(this.slug)
      try {
        /* await ref.get().then(doc => (this.cool = doc.data().cools)) */
        await ref.get().then(doc => console.log(doc.data()))
        await ref.get().then(doc => (this.cool = doc.data().cools))
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
    },
    cooler() {
      this.cool++
      fireDb
        .collection('Posts')
        .doc(this.slug)
        .update({ cools: this.cool })
      this.clicked = true
    }
  },
  head() {
    return {
      title: this.post.attributes.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.attributes.short
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'http://blog.ivantonev.com' + this.post.attributes.slug
        }
      ]
    }
  }
}
</script>
<style scoped>
.blog {
  width: 100%;
  margin: 0 auto;
}
.post-head {
  text-align: center;
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 2em;
  margin-bottom: 1em;
}
.title {
  font-size: 2em;
  max-width: 65%;
  margin: 0 auto;
}
.infos {
  width: 65%;
  border-radius: 10px;
  background-color: #12131b;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  min-width: 350px;
  padding: 10px;
  padding-bottom: 14px;
  margin-top: 30px;
  font-size: 0.8em;
}

.image {
  width: 100%;
  height: 45vh;
  margin-bottom: 1em;
  object-fit: cover;
}
.date {
  margin-left: 5px;
  padding-top: 4px;
}
.author {
  padding-top: 4px;
}
.tags {
  position: relative;
  margin-left: auto;
}
.tags span {
  margin-right: 10px;
  background-color: #ff0077;
  height: 26px;
  font-size: 1.1em;
  padding-left: 3px;
  padding-right: 3px;
  padding-bottom: 3px;
  margin-right: 5px;
  border-radius: 10px;
  margin-bottom: 3px;
  margin-top: 3px;
}
.tags span a {
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-family: 'Lato', sans-serif;
}
.content {
  width: 55%;
  margin: 3em auto;
  word-spacing: 1px;
  font-size: 1.3em;
  line-height: 1.7em;
}
.share {
  display: flex;
  cursor: pointer;
  width: 65%;
  margin: 0 auto;
  margin-bottom: 2.5em;
}
.share .text {
  padding-top: 9px;
  margin-right: 15px;
}
.shareble {
  margin-right: 10px;
  padding-top: 7px;
}
.shareble img {
  width: 24px;
}
.cool {
  /*  margin-left: auto; */
  background-color: rgb(0, 174, 255);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 700;
}
.counter {
  margin-left: auto;
}
.count {
  margin-right: 20px;
  font-weight: 600;
  font-size: 0.8em;
  position: relative;
  top: -7px;
  left: -3px;
}
.meter {
  font-weight: 600;
  font-size: 1.1em;
}
.comments {
  margin: 0 auto;
}
</style>