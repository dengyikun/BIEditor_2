import React, {Component, PropTypes} from 'react'
import styles from './Button.less'

const Button = ({item, onEvent}) => {
  let option = {}
  try {
    eval(item.option)
  } catch (e) {
    console.error(e)
  }
  return <div className={styles.body} onClick={onEvent} onDoubleClick={onEvent}>
    <div className={styles.text}>
      {option.text}
    </div>
  </div>
}

export default Button
