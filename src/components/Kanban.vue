<template>
  <div class="hello">
    <div class="row">
      <!-- ==================TODO===================== -->
      <div class="col s4">
        <div class="card blue darken-1">
          <div id="inidia" class="card-title white-text">
            <div class="row">
              <div id="hmm" class="col s9">
                <h4 style="text-align:center">Todo</h4>
              </div>
              <div id="hmm" class="col s3">
                <a @click="swal()" class="btn-floating btn-large waves-effect waves-light magenta right">
                  <i class="material-icons">add</i>
                </a>
              </div>
            </div>

          </div>
          <div class="card-content white-text" v-for="(todo,index) in todoAll" :key="index">
            <ul>
              <li id="todo-list">
                <div class="row">
                  <span class="col s10">
                    {{todo.name}}
                  </span>
                  <button class="btn-floating btn-small waves-effect waves-light red" @click="doTask(index)">
                    <i class="material-icons">arrow_forward</i>
                  </button>
                </div>
                <hr>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ==================progress===================== -->
      <div class="col s4">
        <div class="card pink darken-1">
          <div id="inidia" class="card-title white-text">
            <div class="row">
              <div id="hmm" class="col s12">
                <h4 style="text-align:center">Progress</h4>
              </div>
            </div>
          </div>
          <div class="card-content white-text" v-for="(progress,index) in progressAll" :key="index">
            <ul>
              <li id="todo-list">
                <div class="row">
                  <span class="col s10">
                    {{progress.name}}
                  </span>
                  <button class="btn-floating btn-small waves-effect waves-light red" @click="completeTask(index)">
                    <i class="material-icons">arrow_forward</i>
                  </button>
                </div>
                <hr>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- ==================DONE===================== -->
      <div class="col s4">
        <div class="card black darken-1">
          <div id="inidia" class="card-title white-text">
            <div class="row">
              <div id="hmm" class="col s12">
                <h4 style="text-align:center">Done</h4>
              </div>
            </div>
          </div>
          <div class="card-content white-text" v-for="(done,index) in doneAll" :key="index">
            <ul>
              <li id="todo-list">
                <div class="row">
                  <span class="col s10">
                    {{done.name}}
                  </span>
                  <button class="btn-floating btn-small waves-effect waves-light red" @click="deleteTask(index)">
                    <i class="material-icons">clear</i>
                  </button>
                </div>
                <hr>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { todo, progress, done } from '../firebase.js'
export default {
  data() {
    return {
      taskName: '',
      todoAll: {},
      progressAll: {},
      doneAll: {}
    }
  },
  methods: {
    swal() {
      swal('Write Task here:', {
        content: 'input'
      }).then(value => {
        if (!value) {
          swal(`Cannot post empty task`)
        } else {
          swal(`You typed: ${value}`)
          console.log('masuk addtask')
          const self = this
          let task = {
            name: value
          }
          todo.push(task).then(snapshot => {
            console.log('push===', snapshot)
            self.taskName = ''
          })
        }
      })
    },
    doTask(index) {
      let progressTask = {}
      todo
        .child(index)
        .once('value')
        .then(snapshot => {
          progressTask = snapshot.val()
          progress
            .child(index)
            .set(progressTask)
            .then(snapshot => {})
        })
      todo.child(index).remove()
    },
    completeTask(index) {
      let doneTask = {}
      progress
        .child(index)
        .once('value')
        .then(snapshot => {
          doneTask = snapshot.val()
          done
            .child(index)
            .set(doneTask)
            .then(snapshot => {})
        })
      progress.child(index).remove()
    },
    deleteTask(index) {
      done.child(index).remove()
    }
  },
  created() {
    todo.on('value', snapshot => {
      this.todoAll = snapshot.val()
      console.log(this.todoAll)
    })
    progress.on('value', snapshot => {
      this.progressAll = snapshot.val()
      console.log(this.progressAll)
    })
    done.on('value', snapshot => {
      this.doneAll = snapshot.val()
      console.log(this.doneAll)
    })
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

.btn-floating {
  align-content: right;
}

#inidia {
  height: 60px;
}

#hmm {
  /* border: 1px solid black; */
  height: 60px;
}
</style>
