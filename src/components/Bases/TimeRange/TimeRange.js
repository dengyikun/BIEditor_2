import React, {Component, PropTypes} from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'
import styles from './TimeRange.less'
const {RangePicker} = DatePicker;

const TimeRange = props => {
  let option = {}
  try {
    eval(props.item.option)
    option.startTime = option.startTime ? moment(option.startTime) : null
    option.endTime = option.endTime ? moment(option.endTime) : null
  } catch (e) {
    console.error(e)
  }
  return <div className={styles.body}>
    <RangePicker
      defaultValue={[option.startTime, option.endTime]}
      showTime
      format={option.format}/>
  </div>
}

export default TimeRange
