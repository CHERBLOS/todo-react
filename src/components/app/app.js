import React from 'react'

import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList/taskList'
import Footer from '../footer/footer'

import './app.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.maxId = 10
    this.state = {
      tasks: [
        this.createTaskItem('Completed task'),
        this.createTaskItem('Editing task'),
        this.createTaskItem('Active task'),
      ],
      filter: 'all',
    }
  }

  completeTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = this.idxSearch(id)
      const newItem = { ...tasks[idx], isCompleted: !tasks[idx].isCompleted }
      return {
        tasks: [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)],
      }
    })
  }

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = this.idxSearch(id)
      return {
        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
      }
    })
  }

  deleteCompleted = () => {
    this.setState(({ tasks }) => {
      const newItems = tasks.filter((item) => !item.isCompleted)
      return {
        tasks: newItems,
      }
    })
  }

  idxSearch = (id) => {
    const { tasks } = this.state
    return tasks.findIndex((item) => item.id === id)
  }

  addTask = (label) => {
    this.setState(({ tasks }) => ({ tasks: [...tasks, this.createTaskItem(label)] }))
  }

  editTaskLabel = (id, label) => {
    this.setState(({ tasks }) => {
      const idx = this.idxSearch(id)
      const newItem = { ...tasks[idx], label }
      return {
        tasks: [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)],
      }
    })
  }

  toggleFilterState = (value) => {
    this.setState(() => ({ filter: value }))
  }

  filterItems(filter) {
    const { tasks } = this.state
    switch (filter) {
      case 'all':
        return tasks
      case 'active':
        return tasks.filter((item) => !item.isCompleted)
      case 'completed':
        return tasks.filter((item) => item.isCompleted)
      default:
        return tasks
    }
  }

  createTaskItem(label) {
    return {
      label,
      isCompleted: false,
      dateCreated: new Date(),
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
    }
  }

  render() {
    const { tasks, filter } = this.state
    const visibleItems = this.filterItems(filter)
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={visibleItems}
            completeTask={this.completeTask}
            deleteTask={this.deleteTask}
            editTaskLabel={this.editTaskLabel}
          />
        </section>
        <Footer
          tasks={tasks}
          deleteTask={this.deleteCompleted}
          toggleFilterState={this.toggleFilterState}
          filter={filter}
        />
      </section>
    )
  }
}

export default App
