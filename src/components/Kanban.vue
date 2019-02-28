<template>
  <div class="hello">
    <div class="row">
      <!-- ==================TODO===================== -->
      <div class="col s12 m4 l4">
        <div class="card blue darken-1 borderRadius">
          <div id="inidia" class="card-title white-text">
            <div class="row">
              <div id="hmm" class="col s9 m10 l10">
                <h4 id="todotitle" style="text-align:center">Todo</h4>
              </div>
              <div id="hmm" class="col s3 m2 l2">
                <a @click="swal()" title="Add Another Project">
                  <i class="material-icons">add</i>
                </a>
              </div>
            </div>

          </div>
          <div class="card-content white-text" v-for="(todo,index) in todoAll" :key="index">
            <ul>
              <li id="todo-list">
                <div class="row">
                  <span class="col s10 m10 l10">
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
      <div class="col s12 m4 l4">
        <div class="card pink darken-1 borderRadius">
          <div id="inidia" class="card-title white-text">
            <div class="row">
              <div id="hmm" class="col s12 m12 l12">
                <h4 id="donetitle" style="text-align:center">Progress</h4>
              </div>
            </div>
          </div>
          <div class="card-content white-text" v-for="(progress,index) in progressAll" :key="index">
            <ul>
              <li id="todo-list">
                <div class="row">
                  <span class="col s10 m10 l10">
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
      <div class="col s12 m4 l4">
        <div class="card black darken-1 borderRadius">
          <div id="inidia" class="card-title white-text">
            <div class="row">
              <div id="hmm" class="col s12 m12 l12">
                <h4 id="progresstitle" style="text-align:center">Done</h4>
              </div>
            </div>
          </div>
          <div class="card-content white-text" v-for="(done,index) in doneAll" :key="index">
            <ul>
              <li id="todo-list">
                <div class="row">
                  <span class="col s10 m10 l10">
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
          const self = this
          let task = {
            name: value
          }
          todo.push(task).then(snapshot => {
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
    })
    progress.on('value', snapshot => {
      this.progressAll = snapshot.val()
    })
    done.on('value', snapshot => {
      this.doneAll = snapshot.val()
    })
  }
}
</script>


<style>
.borderRadius{
  border-radius: 5px;
}
a{
  cursor: pointer;
  color: white;
}

#todotitle{
  font-family: cursive;
}

#progresstitle{
  font-family: cursive;
}

#donetitle{
  font-family: cursive;
}
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
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
