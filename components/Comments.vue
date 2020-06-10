<template>
  <div>
    <p class="Commentstitle">Comments ({{ comments.length - 1 }})</p>
    <div class="bor" v-for="comment in comments" :key="comment.id">
      <template v-if="comment.id == 0">
        <div class="bodytwo style " v-show="comments.length <= 1">
          <span class="first">Be the first to say something</span>
        </div>
      </template>
      <template v-else>
        <div class="body style">
          <span class="sub">
            <span class="nam">{{ comment.name }}</span>
            says on
            {{ comment.created }}
          </span>
          <br />
          <span class="main">{{ comment.body }} </span>
        </div>
      </template>
    </div>
    <div class="err" v-if="empty">Oh oh, please type a comment first</div>
    <form class="inputs">
      <input
        type="text"
        class="name width"
        placeholder="Who you wanna be today ?"
        v-model="data.name"
      />
      <textarea
        v-model="data.body"
        rows="5"
        placeholder="Are you thinking about Ice Cream too ?"
        class="comment width"
        required
      ></textarea>

      <button type="button" class="submit width" @click="submit">
        COMMENT
      </button>
    </form>
  </div>
</template>

<script>
import moment from 'moment'
import { fireDb } from '~/plugins/firebase.js'
import * as firebase from 'firebase/app'

export default {
  props: ['slug'],
  data() {
    return {
      empty: false,
      comments: '',
      data: {
        body: '',
        name: ''
      }
    }
  },

  created() {
    /* this.saveComment() */
    /* this.updateArray() */
    this.initComments()
    this.getComments()
    console.log(this.slug)
  },
  methods: {
    validate() {
      if (this.data.body === '') this.empty = true
      if (this.data.name === '') this.data.name = 'Anonymus'
    },
    async getComments() {
      const ref = fireDb.collection('Posts').doc(this.slug)
      try {
        /* await ref.get().then(doc => (this.cool = doc.data().cools)) */
        await ref.get().then(doc => console.log(doc.data()))
        await ref.get().then(doc => (this.comments = doc.data().comments))
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
    },
    async initComments() {
      const ref = fireDb.collection('Posts').doc(this.slug)
      const document = {
        comments: [{ id: 0, name: 'mw', body: 'hello' }],
        cools: 0
      }
      ref.get().then(doc => {
        if (doc.exists) {
          console.log('whats up doc?')
        } else {
          ref.set(document)
          console.log('doc created')
        }
      })
    },
    submit() {
      this.validate()
      if (this.empty == false) {
        let newComment = {
          id: this.comments[this.comments.length - 1].id + 1,
          body: this.data.body,
          edited: false,
          created: moment(new Date()).format('MMM Do YY'),
          name: this.data.name
        }
        fireDb
          .collection('Posts')
          .doc(this.slug)
          .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
              ...newComment
            })
          })
        this.comments.push(newComment)
        this.data.body = ''
        this.data.name = ''
      }
    }
  }
}
</script>

<style >
.body {
  margin: 0 auto;
  width: 65%;
  margin-bottom: 1em;
  position: relative;
}
.bodytwo {
  margin: 0 auto;
  width: 65%;
  margin-bottom: 1em;
  position: relative;
  text-align: center;
}
.Commentstitle {
  text-align: center;
  font-size: 1.7em;
  margin-bottom: 0.5em;
  color: aquamarine;
}
.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 5em;
}
.first {
  color: rgb(137, 122, 170);
  padding: 5px;
  font-size: 1em;
  font-weight: 700;
}
.width {
  width: 65%;
  margin: 0 auto;
}
.style {
  background-color: rgb(50, 47, 78);
  color: aliceblue;
  border-radius: 10px;
  padding: 5px;
  padding-left: 10px;
}
.err {
  width: 50%;
  margin: 0 auto;
  color: #ff0077;
  font-weight: 700;
  text-align: center;
  line-height: 2em;
  font-family: 'Lato';
}
.sub {
  font-size: 0.75em;
  color: #a5a5a5;
}
.main {
  font-size: 1.3em;
  line-height: 1.7em;
  padding-left: 10px;
}
.nam {
  font-size: 1.1em;
  color: aquamarine;
}
.name {
  background-color: rgb(31, 27, 53);
  border: 0;
  border-radius: 10px;
  height: 30px;
  color: aliceblue;
  margin-bottom: 5px;
  padding: 10px;
  margin-top: 1em;
  color: rgb(137, 122, 170);
  font-size: 0.81em;
}
.name::placeholder {
  color: rgb(118, 102, 156);
  font-size: 1.25em;
}
.comment {
  background-color: rgb(31, 27, 53);
  border: 0;
  border-radius: 10px;
  margin-bottom: 5px;
  color: aliceblue;
  padding: 10px;
  color: rgb(137, 122, 170);
  font-size: 1em;
  line-height: 1.2em;
}
.comment::placeholder {
  color: rgb(118, 102, 156);
  font-size: 1.35em;
}
.submit {
  background-color: #ff0077;
  color: aliceblue;
  border: 0;
  border-radius: 10px;
  height: 35px;
  font-weight: 800;
  font-size: 1.2em;
}
</style>