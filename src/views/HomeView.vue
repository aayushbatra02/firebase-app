<template>
  <div class="text-xl">
    Home Page
    <div v-for="{ id, content, done } in todos" :key="id">
      content: {{ content }} <br />
      <div @click="toggleTodo(id)">Done: {{ done }}</div>
      <button class="border p-1" @click="deleteTodo(id)">DEL</button>
    </div>
    <button @click="addTodo" class="border border-black m-4 p-2">ADD</button>
  </div>
</template>

<script setup>
import { todoRef } from "@/firebase/index";
import {
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { onMounted, ref } from "vue";

const todoCollectionOrderedRef = query(todoRef, orderBy("date"));
const todos = ref([]);
const count = ref(1);
onMounted(async () => {
  onSnapshot(todoCollectionOrderedRef, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

const addTodo = () => {
  addDoc(todoRef, {
    content: `added todo ${count.value}`,
    done: false,
    date: Date.now(),
  });
  count.value++;
};

const deleteTodo = (id) => {
  console.log(`deleted ${id}`);
  deleteDoc(doc(todoRef, id));
};

const toggleTodo = (todoId) => {
  console.log("Toggle");
  const todo = todos.value.find(({ id }) => todoId === id);
  updateDoc(doc(todoRef, todoId), {
    done: !todo.done,
  });
};
</script>
