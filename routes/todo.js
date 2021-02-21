const { Router } = require("express");
const router = Router();
const Todo = require("../models/todo");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    // Todo.create() === Todo.build().save()
    const todo = await Todo.create({
      title: req.body.title,
      done: false,
    });
    res.status(201).json({ todo });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(+req.params.id);
    todo.done = !todo.done;
    // todo.done = req.body.done;
    await todo.save();
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        id: +req.params.id,
      },
    });
    await todos[0].destroy();
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
