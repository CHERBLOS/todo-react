import React from 'react'
import PropTypes from 'prop-types'

import './footer.css'

class Footer extends React.Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape),
    deleteTask: PropTypes.func,
    toggleFilterState: PropTypes.func,
    filter: PropTypes.string,
  }

  static defaultProps = {
    tasks: {},
    deleteTask: () => {},
    toggleFilterState: () => {},
    filter: 'all',
  }

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const { tasks, deleteTask, toggleFilterState, filter } = this.props
    const buttons = this.buttons.map((button) => {
      const isActive = filter === button.name ? 'selected' : ''
      return (
        <li key={button.name}>
          <button
            type="button"
            className={isActive}
            name={button.name}
            onClick={(e) => toggleFilterState(e.target.innerText.toLowerCase())}
          >
            {button.label}
          </button>
        </li>
      )
    })
    return (
      <footer className="footer">
        <span className="todo-count">{tasks.filter((task) => !task.isCompleted).length} items left</span>
        <ul className="filters">{buttons}</ul>
        <button type="button" className="clear-completed" onClick={deleteTask}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default Footer
