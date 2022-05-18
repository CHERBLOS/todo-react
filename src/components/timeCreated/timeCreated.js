import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

class Clock extends React.Component {
  static propTypes = {
    dateCreated: PropTypes.objectOf(PropTypes.string),
  }

  static defaultProps = {
    dateCreated: new Date(),
  }

  constructor() {
    super()
    this.state = {
      date: new Date(),
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    this.setState({
      date: new Date(),
    })
  }

  render() {
    const { dateCreated } = this.props
    // eslint-disable-next-line no-console
    // console.log(dateCreated)
    const { date } = this.state
    return (
      <span className="created">
        created{' '}
        {formatDistanceToNow(dateCreated, date, {
          includeSeconds: true,
        })}{' '}
        ago
      </span>
    )
  }
}

export default Clock
