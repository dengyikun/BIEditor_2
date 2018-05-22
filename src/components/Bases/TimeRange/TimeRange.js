import React, {Component, PropTypes} from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'
import styles from './TimeRange.less'
const {RangePicker} = DatePicker;

const TimeRange = props => {
  let option = {}
  try {
    eval(props.item.option)
    option.value = [moment(option.startTime), moment(option.endTime)]
  } catch (e) {
    console.error(e)
  }

  const onChange = (time, timeString) => {
    const {item, onChange} = props
    item.option = item.option.replace(/startTime: ["|'|`].*?["|'|`],/, `startTime: "${timeString[0]}",`)
    item.option = item.option.replace(/endTime: ["|'|`].*?["|'|`],/, `endTime: "${timeString[1]}",`)
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
      value={option.value}
      onChange={onChange}
      showTime
      format={option.format}/>
  </div>
}

export default TimeRange
