<template>
  <div>
    <header>
      <h1>Tasks</h1>
    </header>

    <nav>
      <ul>
        <li class="navItem" v-for="(item, index) in 5" :key="index">Nav{{item}}</li>
      </ul>
    </nav>

    <article>
      <input type="text" name="taskTitle" ref="taskTitle" id="taskTitle" placeholder="task title" autofocus>
      <textarea name="taskContent" ref="taskContent" id="taskContent" cols="30" rows="10"></textarea>
      <button @click="addTask" class="btn btn-default btn-lg btn-primary btnAdd"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> add a task</button>
      <button @click="reset" class="btn btn-default btn-lg btn-warning btnReset"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> reset the filed</button>
    </article>

    <aside>
      <button class="btnClearAll">clear all tasks</button>
      <ul>
        <li class="taskItem" v-for="(item, index) in db.data" :key="index">
          <span>{{item.id}}</span>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </aside>

    <footer><p>by J</p></footer>
  </div>
</template>

<script>
// // In the following line, you should include the prefixes of implementations you want to test.
// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
// // DON'T use "var indexedDB = ..." if you're not in a function.
// // Moreover, you may need references to some window.IDB* objects:
// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
// // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

export default {
  data() {
    return {
      db: {
        name: 'IDBTest',
        version: 1,
        dbInstance: {},
        data: []
      },
      id: parseInt(window.localStorage.getItem('idbid')) || 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      
      let request = window.indexedDB.open(this.db.name, this.db.version)

      request.onerror = this.errorHanler
      // 该事件仅在较新的浏览器中被实现
      request.onupgradeneeded = function(e) { 
        // 更新对象存储空间和索引 ......
        let _db = e.target.result
        let names = _db.objectStoreNames
        let name = this.db.name
        if (!names.contains(name)) {
          let objectStore = _db.createObjectStore(name, {
            keyPath: 'id',
            autoIncrement: true
          })
          for (let i in this.db.data) {
            objectStore.add(this.db.data[i])
          }
          console.log('objectStore: ' + objectStore.toString())
        }
      }
      request.onsuccess = (e) => {
        this.db.dbInstance = request.result
        console.log(this.db.dbInstance)
        let objectStore = this.db.dbInstance.transaction(this.db.name).objectStore(this.db.name)
        let data = this.db.data
        console.log(data)
        objectStore.openCursor().onsuccess = (e) => {
          let cursor = e.target.result
          if (cursor) {
            data.push(cursor.value)
            cursor.continue()
          }
          console.log(`got all data: ${data}`)
        }
      }
    },
    addTask() {
      let title = this.$refs.taskTitle.value
      let content = this.$refs.taskContent.value
      console.log(title, content)
      this.id += 1
      window.localStorage.setItem('idbid', this.id)
      console.log(this.id)
      let transaction = this.db.dbInstance.transaction([this.db.name], 'readwrite')
      // transaction.oncomplete = function (e) {
      //   console.log('add a task completely.')
      // }
      // transaction.onerror = function (e) {
      //   this.errorHanler(e)
      // }
      let objectStore = transaction.objectStore(this.db.name)
      console.log(objectStore.indexNames)
      console.log(objectStore.keyPath)
      console.log(objectStore.name)
      console.log(objectStore.transaction)
      console.log(objectStore.autoIncrement)
      let task ={id: this.id, title: title, content: content}
      let request = objectStore.add(task)
      request.onsuccess = function(e) {
        console.log('add a task completely...')
      }
    },
    reset() {
      this.$refs.taskTitle.value = ''
      this.$refs.taskContent.value = ''
    },
    errorHanler(e) {
      window.alert(`dbInstancebase error: ${e.target.errorCode}`)
    }
  },
  wacth: {
    data(newVal, oldVal) {
      this.getData()
      window.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
nav{
  display: block;
  // float: left;
  text-align: left;
  margin: 60px 0;
  .navItem{
    display: inline-block;
    margin-right: 15px;
    padding: 12px 36px;
    border: 2px solid orangered;
    border-radius: 6px 36px 36px 6px;
    background: orangered;
  }
}
article{
  position: relative;
  float: right;
  display: block;
  width: 75%;
  height: 240px;
  #taskTitle{
    padding: 10px 10px 0 10px;
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
  // button{
  //   width: 200px;
  //   height: 24px;
  //   background: rgba(15, 251, 216, 0.5);
  //   box-shadow: 0 0 10px black;
  //   border: 2px solid rgba(15, 251, 216, 0.5);
  //   border-radius: 24px;
  // }
  // .btnAdd{
  //   position: absolute;
  //   bottom: 10px;
  //   right: 5px;
  // }
  // .btnReset{
  //   position: absolute;
  //   bottom: 10px;
  //   right: 240px;
  // }
}
aside{
  float: left;
}
footer{
  position: absolute;
  width: 100%;
  bottom: 20px;
  text-align: center;
}
</style>
