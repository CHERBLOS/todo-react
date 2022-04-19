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
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmitForm = (e, addTask, label) => {
    e.preventDefault()
    addTask(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state
    const { addTask } = this.props
    return (
      <form onSubmit={(e) => this.onSubmitForm(e, addTask, label)}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} value={label} />
      </form>
    )
  }
}

export default NewTaskForm
