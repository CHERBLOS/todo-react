import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import TimeCreated from '../timeCreated'
import Timer from '../timer'
import './task.css'

class Task extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool,
    completeTask: PropTypes.func,
    deleteTask: PropTypes.func,
    editTaskLabel: PropTypes.func,
    timeLeft: PropTypes.number,
    isActiveTimer: PropTypes.bool,
    onTimer: PropTypes.func,
    offTimer: PropTypes.func,
  }

  static defaultProps = {
    completeTask: () => {},
    deleteTask: () => {},
    isCompleted: false,
    editTaskLabel: () => {},
    timeLeft: 0,
    isActiveTimer: false,
    onTimer: () => {},
    offTimer: () => {},
  }

  constructor() {
    super()
    this.state = {
      editing: false,
      newLabel: '',
    }
  }

  editToggle = () => {
    this.setState((state) => ({ editing: !state.editing }))
  }

  onChangeLabel = (e) => {
    this.setState(() => ({ newLabel: e.target.value }))
  }

  setNewLabel = (e, editTaskLabel, newLabel) => {
    e.preventDefault()
    editTaskLabel(newLabel)
    this.editToggle()
  }

  render() {
    const {
      label,
      timeLeft,
      isActiveTimer,
      isCompleted,
      dateCreated,
      completeTask,
      deleteTask,
      editTaskLabel,
      onTimer,
      offTimer,
    } = this.props
    const { editing, newLabel } = this.state

    const itemClasses = classNames({
      completed: isCompleted,
      editing,
    })

    let timer
    if (timeLeft === 'x') {
      timer = <Timer timeLeft={1} countdown={false} />
    } else if (timeLeft) {
      timer = (
        <Timer timeLeft={timeLeft} countdown={isActiveTimer} onTimer={onTimer} offTimer={(date) => offTimer(date)} />
      )
    }

    return (
      <li className={itemClasses}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={isCompleted} onChange={completeTask} />
          <label htmlFor="span">
            <span className="description">{label}</span>
            {timer}
            <TimeCreated dateCreated={dateCreated} />
          </label>
          <button type="button" aria-label="Mute volume" className="icon icon-edit" onClick={this.editToggle} />
          <button type="button" aria-label="Mute volume" className="icon icon-destroy" onClick={deleteTask} />
        </div>
        {editing && (
          <form onSubmit={(e) => this.setNewLabel(e, editTaskLabel, newLabel)}>
            <input
              type="text"
              className="edit"
              defaultValue={label}
              onChange={this.onChangeLabel}
              onClick={this.onChangeLabel}
            />
          </form>
        )}
      </li>
    )
  }
}

export default Task
