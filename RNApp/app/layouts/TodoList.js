import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor'
import Button from '../components/Button'

import squareIcon from '../images/fa-square-o.png'

const styles = StyleSheet.create({
  rightIconContainer: {
    position: 'absolute',
    right: 15
  },
  leftIcon: {
    marginRight: 10,
    tintColor: 'rgba(0, 0, 0, 0.25)'
  },
  row: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  }
})

class TodoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todo: ''
    }
  }

  toggleState(todo) {
    Meteor.call('checkTodo', todo._id, { done: true }, function (error) {
      if (error) {
        console.log(error)
      } else {
        console.log('Check todo')
      }
    })
  }

  renderRow(todo) {
    const toggleState = this.toggleState.bind(this)

    return (
      <View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleState(todo)}>
            <Image
              source={squareIcon}
              style={styles.leftIcon}
              />
          </TouchableOpacity>
          <Text>{todo.title}</Text>
        </View>
      </View>
    )
  }

  render() {
    const updateState = this.setState.bind(this)
    const addItem = this.addItem.bind(this)
    const { todosReady } = this.props

    return (
      <View>
        <TextInput onChangeText={(todo) => updateState({ todo })} />
        <Button text="Add" onPress={addItem} />

        <MeteorListView
          collection="todos"
          selector={{done: false}}
          options={{sort: {createdAt: -1}}}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
        />
      </View>
    )
  }

  addItem() {
    const todo = {
      done: false,
      title: this.state.todo
    }

    Meteor.call('addTodo', todo, function (error) {
      if (error) {
        console.log(error)
      } else {
        console.log('Add todo')
      }
    })
  }
}

export default createContainer(params => {
  const handle = Meteor.subscribe('todos')

  return {
    todosReady: handle.ready()
  }
}, TodoList)
