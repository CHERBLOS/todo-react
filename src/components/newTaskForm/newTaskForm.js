import React from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

class NewTaskForm extends React.Component {
  static propTypes = {
    addTask: PropTypes.func,
  }

  static defaultProps = {
    addTask: () => {},
  }

  constructor() {
    super()
    this.state = {
      label: '',
      min: '',
      sec: '',
    }
  }

  onLabelChange = (e) => {
    const { target } = e
    const { value, name } = target
    this.setState({
      [name]: value,
    })
  }

  onSubmitForm = (e, addTask, label, min, sec) => {
    e.preventDefault()
    addTask(label, min, sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { label, min, sec } = this.state
    const { addTask } = this.props
    return (
      <form className="new-todo-form" onSubmit={(e) => this.onSubmitForm(e, addTask, label, min, sec)}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          name="label"
          onChange={this.onLabelChange}
          value={label}
        />
        <input
          className="new-todo-form__timer"
          name="min"
          placeholder="Min"
          onChange={this.onLabelChange}
          value={min}
        />
        <input
          className="new-todo-form__timer"
          name="sec"
          placeholder="Sec"
          onChange={this.onLabelChange}
          value={sec}
        />
        <input className="form-submit-button" type="submit" value="💾" />
      </form>
    )
  }
}

export default NewTaskForm
