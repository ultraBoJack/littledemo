<template>
  <div class="container">
    <header>
      <h1>Tasks</h1>
    </header>

    <article>
      <input type="text" name="taskTitle" ref="taskTitle" id="taskTitle" placeholder="task title" autofocus>
      <textarea name="taskContent" ref="taskContent" id="taskContent" cols="30" rows="10"></textarea>
      <button @click="addTask" class="btn btn-default btn-lg btn-primary btnAdd"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>add</button>
      <button @click="reset" class="btn btn-default btn-lg btn-warning btnReset"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>reset</button>
    </article>

    <aside>
      <button class="btnClearAll" @click="clearAll">clear all tasks</button>
      <ul class="task-list" ref="taskList">
        <li class="taskItem" v-for="(item, index) in DB_DATA" :key="index">
          <span>{{item.id}}</span>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </aside>

    <footer><p>by J</p></footer>
  </div>
</template>

<script>

export default {
  data() {
    return {
      DB_NAME: 'IndexedDatabase',
      DB_VERSION: 2,
      DB_STORE_NAME: 'tasks',
      DB: {},
      DB_DATA: [],
    }
  },
  created() {
    this.initDb()
  },
  methods: {

    initDb() {
      let request = indexedDB.open(this.DB_NAME, this.DB_VERSION)
      let that = this
      
      request.onsuccess = function(evt) {
        that.DB = request.result
        let store = that.DB.transaction(that.DB_STORE_NAME, 'readonly').objectStore(that.DB_STORE_NAME)
        let _that = that
        store.openCursor().onsuccess = function (e) {
          let cursor = e.target.result
          if (cursor) {
            _that.DB_DATA.push(cursor.value)
            cursor.continue()
          }
        }
      }

      request.onerror = this.errorHanler
      // 该事件仅在较新的浏览器中被实现
      request.onupgradeneeded = function(evt){
        // 更新对象存储空间和索引 ......
        evt.currentTarget.result.createObjectStore(that.DB_STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    },

    addTask() {
      let title = this.$refs.taskTitle.value
      let content = this.$refs.taskContent.value
      let db = this.DB
      let transaction = db.transaction(this.DB_STORE_NAME, 'readwrite')
      let store = transaction.objectStore(this.DB_STORE_NAME)
      let task ={title: title, content: content}
      let request = store.add(task)

      request.onsuccess = function(e) {
        console.log('add a task completely...')
      }
    },

    reset() {
      this.$refs.taskTitle.value = ''
      this.$refs.taskContent.value = ''
    },

    clearAll(){
      let db = this.DB
      let transaction = db.transaction(this.DB_STORE_NAME, 'readwrite')
      let store = transaction.objectStore(this.DB_STORE_NAME)
    },
    errorHanler(e) {
      window.alert(`dbInstancebase error: ${e.target.errorCode}`)
    }
  },

  wacth: {
    data(newVal, oldVal) {
      this.initDb()
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  position: relative;
}
header{
  text-align: center;
}

article{
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-bottom: 30px;
  width: 200px;
  height: 240px;
  #taskTitle{
    width: 200px;
    position: absolute;
    left: 10px;
    top: 5px;
    height: 24px;
  }
  #taskContent{
    position: absolute;
    width: 200px;
    height: 120px;
    left: 10px;
    top: 60px;
  }
  button{
    width: 60px;
    height: 24px;
    background: rgba(15, 251, 216, 0.5);
    box-shadow: 0 0 10px black;
    border: 2px solid rgba(15, 251, 216, 0.5);
    border-radius: 24px;
  }
  .btnAdd{
    position: absolute;
    bottom: 0;
    left: 10px;
  }
  .btnReset{
    position: absolute;
    bottom: 0;
    left: 160px;
  }
}
aside{
  position: absolute;
  left: 50%;
  top: 320px;
  text-align: center;
  transform: translate(-50%, 0);
  .task-list{
    text-align: left;
    height: 200px;
    overflow-y: scroll;
  }
}
footer{
  position: absolute;
  width: 100%;
  margin-bottom: -600px;
  bottom: 20px;
  text-align: center;
}
</style>
