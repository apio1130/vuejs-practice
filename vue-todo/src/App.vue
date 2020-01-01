<template>
    <div id="app">
      <TodoHeader></TodoHeader>
      <TodoInput v-on:addTodo="addTodo"  @openModal="openModal"></TodoInput>
      <TodoList v-bind:propsdata="todoItems" @removeTodo="removeTodo"></TodoList>
      <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
      <Modal v-if="showModal" @close="closeModal">
        <h3 slot="header">{{ mdTitle }}</h3>
        <span slot="footer" @click="closeModal">
          {{ mdMsg }}
          <i class="closeModalBtn fa fa-times" aria-hidden="true"></i>
        </span>
      </Modal>
    </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';
import Modal from './components/common/Modal.vue';
export default {
  data() {
    return {
      todoItems : [],
      showModal : false,
      mdTitle : '',
      mdMsg : ''
    }
  },
  methods : {
    addTodo(todoItem) {
      if (!localStorage.getItem(todoItem)) {
        localStorage.setItem(todoItem, todoItem);
        this.todoItems.push(todoItem);
        if (this.showModal) {
          this.closeModal();
        }
      } else {
        this.openModal('경고', '중복 입력은 불가능합니다.');
      }
    },
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    },
    openModal(title, message) {
      this.mdTitle = title;
      this.mdMsg = message;
      this.showModal = true;
    },
    closeModal() {
      this.mdTitle = '';
      this.mdMsg = '';
      this.showModal = false;
    }
  },
  created() {
      if (localStorage.length > 0) {
          for (var i=0; i < localStorage.length; i++) {
              this.todoItems.push(localStorage.key(i));
          }

      }
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
    'Modal': Modal
  }    
}
</script>

<style>
    body {
        text-align: center;
        background-color: #f6f6f6;
    }
    input {
        border-style: groove;
        width: 200px;
    }
    button {
        border-style: groove;
    }
    .shadow {
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
    }
</style>