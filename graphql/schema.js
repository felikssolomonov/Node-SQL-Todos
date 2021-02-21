const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Todo {
        id: ID!
        title: String!
        done: Boolean!
        createdAt: String
        updatedAt: String
    }
    input TodoInput {
        title: String!
    }
    type Query {
        getTodos: [Todo!]!
    }
    type Mutation {
        createTodo(todo: TodoInput!): Todo!
        completeTodo(id: ID!): Todo!
        removeTodo(id: ID!): Boolean!
    }
`);

// module.exports = buildSchema(`
//     type User {
//         name: String!
//         age: Int!
//     }
//     type TestType {
//         count: Int!
//         users: [User!]!
//     }
//     type Query {
//         test: TestType!
//         random(min: Int!, max: Int!, count: Int!): [Float!]!
//     }

//     input UserInput {
//         name: String!
//     }
//     type Mutation {
//         addTestUser(user: UserInput!): User!
//     }
// `);

// mutation {
//     addTestUser(user: {name: "Vasya"}) {
//       name
//       age
//     }
//   }

//   query {
//     test {
//       count
//       users {
//         name
//       }
//     }

//     random(min: 2, max: 10, count: 4)
//   }
