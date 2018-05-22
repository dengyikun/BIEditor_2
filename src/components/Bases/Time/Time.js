import React, {Component, PropTypes} from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'
import styles from './Time.less'

const Time = props => {
  let option = {}
  try {
    eval(props.item.option)
    option.value = moment(option.time)
  } catch (e) {
    console.error(e)
  }

  const onChange = (time, timeString) => {
    const {item, onChange} = props
    item.option = item.option.replace(/time: ["|'|`].*?["|'|`],/, `time: "${timeString}",`)
    onChange(item)
  }

  const onEvent = e => {
    props.onEvent(e, {
      time: option.time
    })
  }

  return <div className={styles.body} onClick={onEvent} onDoubleClick={onEvent}>
    <DatePicker
      value={option.value}
      onChange={onChange}
      showTime
      format={option.format}/>
  </div>
}

export default Time
