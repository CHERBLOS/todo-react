import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './taskList.css'

function TaskList({ tasks, completeTask, deleteTask, editTaskLabel }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          label={task.label}
          isCompleted={task.isCompleted}
          dateCreated={task.dateCreated}
          id={tasks.id}
          completeTask={() => completeTask(task.id)}
          deleteTask={() => deleteTask(task.id)}
          editTaskLabel={(value) => editTaskLabel(task.id, value)}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape),
  completeTask: PropTypes.func,
  deleteTask: PropTypes.func,
  editTaskLabel: PropTypes.func,
}

TaskList.defaultProps = {
  tasks: {},
  completeTask: () => {},
  deleteTask: () => {},
  editTaskLabel: () => {},
}

export default TaskList
