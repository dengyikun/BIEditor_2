import React, {Component, PropTypes} from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'
import styles from './Time.less'

const Time = props => {
  let option = {}
  try {
    eval(props.item.option)
    option.time = moment(option.time)
  } catch (e) {
    console.error(e)
  }
  return <div className={styles.body}>
    <DatePicker
      defaultValue={option.time}
      showTime
      format={option.format}/>
  </div>
}

export default Time
