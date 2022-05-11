import React, { Component } from 'react'
import PropTypes from 'prop-types'
import lightFormat from 'date-fns/lightFormat'

export default class Timer extends Component {
  static defaultProps = {
    onTimer: () => {},
    offTimer: () => {},
    timeLeft: 0,
    countdown: false,
  }

  static propTypes = {
    onTimer: PropTypes.func,
    offTimer: PropTypes.func,
    timeLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    countdown: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    const { timeLeft } = this.props
    this.state = {
      endOfTimerDate: Date.now() + timeLeft,
      date: timeLeft,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  timerOff = () => {
    const { date } = this.state
    const { offTimer } = this.props
    offTimer(date)
  }

  timerOn = () => {
    const { onTimer, timeLeft, countdown } = this.props
    if (countdown) return
    this.setState({
      endOfTimerDate: Date.now() + timeLeft,
    })
    onTimer()
  }

  tick() {
    const { countdown, offTimer } = this.props
    if (!countdown) return
    const { endOfTimerDate } = this.state
    const timeLeft = endOfTimerDate - Date.now()
    if (timeLeft <= 1000) {
      offTimer('x')
    }
    this.setState({
      date: timeLeft,
    })
  }

  render() {
    const { date } = this.state
    return (
      <span className="created">
        <button type="button" className="icon icon-play" onClick={this.timerOn} aria-label="start countdown" />{' '}
        <button type="button" className="icon icon-pause" onClick={this.timerOff} aria-label="stop countdown" />
        {lightFormat(new Date(date), ' mm-ss')}
      </span>
    )
  }
}
