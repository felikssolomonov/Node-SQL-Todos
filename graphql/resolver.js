const Todo = require("../models/todo");

module.exports = {
  async getTodos() {
    try {
      return await Todo.findAll();
    } catch (error) {
      throw new Error("error");
    }
  },
  async createTodo({ todo: { title } }) {
    try {
      const todoObj = await Todo.create({
        title: title,
        done: false,
      });
      return todoObj;
    } catch (error) {
      throw new Error("error");
    }
  },
  async completeTodo({ id }) {
    try {
      const todo = await Todo.findByPk(id);
      todo.done = !todo.done;
      // todo.done = true;
      await todo.save();
      return todo;
    } catch (error) {
      throw new Error("error");
    }
  },
  async removeTodo({ id }) {
    try {
      const todos = await Todo.findAll({
        where: {
          id: +id,
        },
      });
      await todos[0].destroy();
      return true;
    } catch (error) {
      return false;
    }
  },
};

// const users = [
//   { name: "qw", age: 1 },
//   { name: "we", age: 2 },
//   { name: "er", age: 3 },
//   { name: "rt", age: 4 },
// ];

// module.exports = {
//   test() {
//     return { count: users.length, users };
//   },
//   random({ min, max, count }) {
//     const arr = [];
//     for (let i = 0; i < count; i++) {
//       const random = Math.random() * (max - min) + min;
//       arr.push(random);
//     }
//     return arr;
//   },
//   addTestUser({ user: { name } }) {
//     const user = {
//       name: name,
//       age: Math.ceil(Math.random() * (120 - 0) + 0),
//     };
//     users.push(user);
//     return user;
//   },
// };
