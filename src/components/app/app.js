import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList/taskList'
import Footer from '../footer/footer'
import STATUS from '../../constants'

import './app.css'

class App extends React.Component {
  static createTaskItem(label, timeLeft) {
    return {
      label,
      isCompleted: false,
      dateCreated: Number(Date.now()),
      timeLeft,
      isActiveTimer: false,
      id: uuidv4(),
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      filter: 'All',
    }
  }

  componentDidMount() {
    let tasks
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'))
    } else {
      tasks = []
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    this.setState({ tasks })
  }

  completeTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = this.idxSearch(id)
      const newItem = { ...tasks[idx], isCompleted: !tasks[idx].isCompleted }
      const newArr = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
      localStorage.setItem('tasks', JSON.stringify(newArr))
      return {
        tasks: newArr,
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = this.idxSearch(id)
      const newArr = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)]
      localStorage.setItem('tasks', JSON.stringify(newArr))
      return {
        tasks: newArr,
      }
    })
  }

  deleteCompleted = () => {
    this.setState(({ tasks }) => {
      const newItems = tasks.filter((item) => !item.isCompleted)
      localStorage.setItem('tasks', JSON.stringify(newItems))
      return {
        tasks: newItems,
      }
    })
  }

  idxSearch = (id) => {
    const { tasks } = this.state
    return tasks.findIndex((item) => item.id === id)
  }

  addTask = (label, min, sec) => {
    if (!label) return
    this.setState(({ tasks }) => {
      const timeLeft = (Number(min) * 60 + Number(sec)) * 1000
      const newArr = [...tasks, App.createTaskItem(label, timeLeft)]
      localStorage.setItem('tasks', JSON.stringify(newArr))
      return {
        tasks: newArr,
      }
    })
  }

  editTaskLabel = (id, label) => {
    this.setState(({ tasks }) => {
      const idx = this.idxSearch(id)
      const newItem = { ...tasks[idx], label }
      const newArr = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
      localStorage.setItem('tasks', JSON.stringify(newArr))
      return {
        tasks: newArr,
      }
    })
  }

  toggleFilterState = (value) => {
    this.setState(() => ({ filter: value }))
  }

  turnOnTimer = (id) => {
    this.setState(({ tasks }) => {
      const idx = this.idxSearch(id)
      const newItem = { ...tasks[idx], isActiveTimer: true }
      const newArr = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
      localStorage.setItem('tasks', JSON.stringify(newArr))
      return {
        tasks: newArr,
      }
    })
  }

  turnOffTimer = (id, date) => {
    this.setState(({ tasks }) => {
      const idx = this.idxSearch(id)
      const newItem = { ...tasks[idx], timeLeft: date, isActiveTimer: false }
      const newArr = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)]
      localStorage.setItem('tasks', JSON.stringify(newArr))
      return {
        tasks: newArr,
      }
    })
  }

  filterItems(filter) {
    const { tasks } = this.state
    switch (filter) {
      case STATUS.ALL:
        return tasks
      case STATUS.ACTIVE:
        return tasks.filter((item) => !item.isCompleted)
      case STATUS.COMPLETED:
        return tasks.filter((item) => item.isCompleted)
      default:
        return tasks
    }
  }

  render() {
    const { tasks, filter } = this.state
    const visibleItems = this.filterItems(filter)
    const taskList = tasks && tasks.length > 0 && (
      <TaskList
        tasks={visibleItems}
        completeTask={this.completeTask}
        deleteTask={this.deleteTask}
        editTaskLabel={this.editTaskLabel}
        turnOnTimer={this.turnOnTimer}
        turnOffTimer={this.turnOffTimer}
      />
    )
    const isEmpty = !taskList && <p>Time to add Todo!</p>
    const footer = tasks && (
      <Footer
        tasks={tasks}
        deleteTask={this.deleteCompleted}
        toggleFilterState={this.toggleFilterState}
        filter={filter}
      />
    )
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          {isEmpty}
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">{taskList}</section>
        {footer}
      </section>
    )
  }
}

export default App
