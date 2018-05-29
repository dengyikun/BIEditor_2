import React from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'
import styles from './Time.less'

const Time = props => {
  const option = props.item.option
  const value = option.time ? moment(option.time) : null

  const onChange = (time, timeString) => {
    const {onChange} = props
    const item = JSON.parse(JSON.stringify(props.item))
    item.option.time = timeString
    onChange(item)
  }

  const onEvent = e => {
    props.onEvent(e, {
      time: option.time
    })
  }

  return <div className={styles.body} onClick={onEvent} onDoubleClick={onEvent}>
    <DatePicker
      className={styles.time}
      value={value}
      onChange={onChange}
      showTime
      format={option.format}/>
  </div>
}

export default Time
