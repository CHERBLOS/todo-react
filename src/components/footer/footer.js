import React from 'react'
import PropTypes from 'prop-types'

import STATUS from '../../constants'

import './footer.css'

function Footer({ tasks, deleteTask, toggleFilterState, filter }) {
  const buttons = Object.keys(STATUS).map((key) => {
    const isActive = filter === STATUS[key] ? 'selected' : ''
    return (
      <li key={key}>
        <button type="button" className={isActive} name={key} onClick={() => toggleFilterState(STATUS[key])}>
          {STATUS[key]}
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

Footer.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape),
  deleteTask: PropTypes.func,
  toggleFilterState: PropTypes.func,
  filter: PropTypes.string,
}

Footer.defaultProps = {
  tasks: {},
  deleteTask: () => {},
  toggleFilterState: () => {},
  filter: 'All',
}

export default Footer
