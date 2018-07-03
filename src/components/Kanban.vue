<template>
  <div class="kanban">

    <div id="title" class="row">

      <div id="titleplan" class="col s3">

        <h4>Plan</h4>

        <div v-if="todo.data.status === 'plan'" id="titleplan" v-for="(todo,index) in todos" :key="index" class="card blue darken-1">

          <div class="card-content white-text">
            <span class="card-title">{{todo.data.title}}</span>
            <p>{{todo.data.body}}</p>

          </div>
          <div class="card-action">
            <a @click="deleteTodo(todo.key)">Delete</a>
            <a @click="changeStatus(todo.key, 'todo')">Next</a>
          </div>

        </div>

      </div>

      <div id="titleplan" class="col s3">

        <h4>Todo</h4>

        <div v-if="todo.data.status === 'todo'" id="titleplan" v-for="todo in todos" :key="todo.key" class="card pink darken-1">
          <div class="card-content white-text">
            <span class="card-title">{{todo.data.title}}</span>
            <p>{{todo.data.body}}</p>

          </div>
          <div class="card-action">
            <a @click="deleteTodo(todo.key)">Delete</a>
            <a @click="backStatus(todo.key,'plan')"> Back</a>
            <a @click="changeStatus(todo.key, 'doing')">Next</a>
          </div>
        </div>

      </div>

      <div id="titleplan" class="col s3">
        <h4>Doing</h4>

        <div v-if="todo.data.status === 'doing'" id="titleplan" v-for="todo in todos" :key="todo.key" class="card black darken-1">
          <div class="card-content white-text">
            <span class="card-title">{{todo.data.title}}</span>
            <p>{{todo.data.body}}</p>

          </div>
          <div class="card-action">
            <a @click="deleteTodo(todo.key)">Delete</a>
            <a @click="backStatus(todo.key,'todo')"> Back</a>
            <a @click="changeStatus(todo.key, 'done')">Next</a>
          </div>
        </div>

      </div>

      <div class="col s3">

        <h4>Done</h4>

        <div v-if="todo.data.status === 'done'" id="titleplan" v-for="todo in todos" :key="todo.key" class="card green darken-1">
          <div class="card-content white-text">
            <span class="card-title">{{todo.data.title}}</span>
            <p>{{todo.data.body}}</p>

          </div>
          <div class="card-action">
            <a @click="deleteTodo(todo.key)">Delete</a>
            <a @click="backStatus(todo.key,'doing')"> Back</a>
          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import { db } from '../firebase.js'

export default {
  data() {
    return {
      todos: []
    }
  },
  methods: {
    backStatus(key, status) {
      // console.log(key);
      let regUser = db.ref(`users/${key}`)

      regUser.update({ status: status })
      
    },
    changeStatus(key, status) {
      // console.log(key);
      let regUser = db.ref(`users/${key}`)

      regUser.update({ status: status })
      
    },

    swal() {
      let regUser = db.ref('users')
      let obj = {
        title: this.title,
        status: this.status,
        body: this.body
      }
      // localStorage.setItem('kanban', this.kanban)

      regUser
        .push(obj)
        .then(snapshot => {
          console.log('todo added to database')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getdata() {
      const self = this
      let regUser = db.ref('users')

      // localStorage.setItem('kanban', this.kanban)

      regUser.on('value', function(snapshot) {
        snapshot.forEach(todo => {
          // console.log(todo.key)
          self.todos.push({
            key: todo.key,
            data: todo.val()
          })
        })
      })
    },
    deleteTodo(key) {
      let regUser = db.ref(`users/${key}`)
      regUser.remove(status)
    }
  },
  mounted() {
    this.getdata()
  }
}
</script>


<style>
#inidia {
  /* border: 1px solid black; */
  margin-top: -20px;
}

#title {
  /* border: 1px solid black; */
  margin-top: -20px;
}

#titleplan {
  /* border: 1px solid black; */
  height: auto;
}
</style>
