import React from 'react'
import PropTypes from 'prop-types'

import TimeCreated from '../timeCreated'
import './task.css'

class Task extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool,
    completeTask: PropTypes.func,
    deleteTask: PropTypes.func,
    editTaskLabel: PropTypes.func,
  }

  static defaultProps = {
    completeTask: () => {},
    deleteTask: () => {},
    isCompleted: false,
    editTaskLabel: () => {},
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
    const { label, isCompleted, dateCreated, completeTask, deleteTask, editTaskLabel } = this.props
    const { editing, newLabel } = this.state
    let classNames = ''

    if (isCompleted) {
      classNames += 'completed'
    }

    if (editing) {
      classNames += ' editing'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={isCompleted} onChange={completeTask} />
          <label htmlFor="span">
            <span className="description">{label}</span>
            <TimeCreated dateCreated={dateCreated} />
          </label>
          <button type="button" aria-label="Mute volume" className="icon icon-edit" onClick={this.editToggle} />
          <button type="button" aria-label="Mute volume" className="icon icon-destroy" onClick={deleteTask} />
        </div>
        {editing ? (
          <form onSubmit={(e) => this.setNewLabel(e, editTaskLabel, newLabel)}>
            <input
              type="text"
              className="edit"
              defaultValue={label}
              onChange={this.onChangeLabel}
              onClick={this.onChangeLabel}
            />
          </form>
        ) : null}
      </li>
    )
  }
}

export default Task
