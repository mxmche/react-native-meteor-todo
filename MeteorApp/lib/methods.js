Meteor.methods({
  'addTodo': (todo) => {
    return Todos.insert(todo)
  },

  'checkTodo': (id, query) => {
    // return Todos.update(id, { query })
    return Todos.update(id, {
      $set: query
    })
  }
})
