const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const path = require("path");
// const todoRoutes = require("./routes/todo");
const sequelize = require("./utils/database");
const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
// app.use("/api/todo", todoRoutes);

app.use(graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
  })
);

app.use((req, res, next) => {
  res.sendFile("/index.html");
});

const start = async () => {
  try {
    // await sequelize.sync({force: true});
    // удаляет отсутствующие поля в таблицах
    // await sequelize.sync();
    app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
};

start();
