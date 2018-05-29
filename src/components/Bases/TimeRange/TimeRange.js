import React from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'
import styles from './TimeRange.less'
const {RangePicker} = DatePicker;

const TimeRange = props => {
  const option = props.item.option
  const value = [
    option.startTime ? moment(option.startTime) : null,
    option.endTime ? moment(option.endTime) : null,
  ]

  const onChange = (time, timeString) => {
    const {onChange} = props
    const item = JSON.parse(JSON.stringify(props.item))
    item.option.startTime = timeString[0]
    item.option.endTime = timeString[1]
    onChange(item)
  }

  const onEvent = e => {
    props.onEvent(e, {
      startTime: option.startTime,
      endTime: option.endTime,
    })
  }

  return <div className={styles.body} onClick={onEvent} onDoubleClick={onEvent}>
    <RangePicker
      className={styles.time}
      value={value}
      onChange={onChange}
      showTime
      format={option.format}/>
  </div>
}

export default TimeRange
