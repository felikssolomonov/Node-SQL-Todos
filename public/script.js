new Vue({
  el: "#app",
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: "",
      todos: [],
    };
  },
  created() {
    fetch("/api/todo", {
      method: "get",
    })
      .then((res) => res.json())
      .then((todos) => {
        this.todos = todos;
      })
      .catch((err) => console.log("error get", err));
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim();
      if (!title) {
        return;
      }
      fetch("/api/todo", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.todos.push(res.todo);
          this.todoTitle = "";
        })
        .catch((err) => console.log("error post", err));
    },
    removeTodo(id) {
      fetch("/api/todo/"+id, {
        method: "delete",
      })
        .then(() => {
          this.todos = this.todos.filter((t) => t.id !== id);
        })
        .catch((err) => console.log("error post", err));
    },
    completeTodo(id) {
      fetch("/api/todo/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: true }),
      })
        .then((res) => res.json())
        .then(({ todo }) => {
          const idt = this.todos.findIndex((item) => item.id === todo.id);
          this.todos[idt].updatedAt = todo.updatedAt;
        })
        .catch((err) => console.log("error put", err));
    },
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1);
    },
    date(value, withTime) {
      const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };
      if (withTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
      }
      return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
    },
  },
});
